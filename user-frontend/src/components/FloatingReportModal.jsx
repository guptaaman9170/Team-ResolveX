import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Video, X } from "lucide-react";

const FloatingReportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (recording) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setCapturedImage(URL.createObjectURL(blob));
      setCapturedVideo(null); // Disable video if photo is captured
    }, "image/jpeg");
  };

  const startRecording = () => {
    if (capturedImage) return; // Disable recording if photo exists

    setRecording(true);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(e.data));
      }
    };
    mediaRecorder.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);

    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
    setCapturedVideo(URL.createObjectURL(videoBlob));
    setCapturedImage(null); // Disable photo if video is recorded
    setRecordedChunks([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted with captured media!");
    setIsOpen(false);
    setCapturedImage(null);
    setCapturedVideo(null);
    stopCamera();
  };

  const openModal = () => {
    setIsOpen(true);
    startCamera();
  };

  const closeModal = () => {
    setIsOpen(false);
    stopCamera();
    setCapturedImage(null);
    setCapturedVideo(null);
  };

  return (
    <>
      {/* Floating Camera Button */}
      <Button
        size="lg"
        className="w-16 h-16 rounded-full btn-civic shadow-float"
        aria-label="Quick Report"
        onClick={openModal}
      >
        <Camera className="w-6 h-6" />
      </Button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          
          <div className="bg-white/30 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 w-full max-w-lg relative transform animate-float-3d border border-white/40">
            
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeModal}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Real-Time Photo & Video Capture
            </h2>

            {/* Live Camera Preview */}
            <div className="mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg border border-white/40"
              />
            </div>

            <div className="flex gap-4 mb-4 justify-center">
              <Button
                onClick={capturePhoto}
                className={`bg-primary text-white ${capturedVideo ? "opacity-50 pointer-events-none" : ""}`}
              >
                📸 Capture Photo
              </Button>

              {recording ? (
                <Button
                  onClick={stopRecording}
                  className="bg-destructive text-white"
                >
                  ⏹ Stop Recording
                </Button>
              ) : (
                <Button
                  onClick={startRecording}
                  className={`bg-secondary text-white ${capturedImage ? "opacity-50 pointer-events-none" : ""}`}
                >
                  🎥 Start Recording
                </Button>
              )}
            </div>

            {/* Preview */}
            {capturedImage && (
              <div className="mb-4">
                <p className="text-white text-sm mb-2">📸 Photo Preview:</p>
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full rounded-lg border border-white/40"
                />
              </div>
            )}

            {capturedVideo && (
              <div className="mb-4">
                <p className="text-white text-sm mb-2">🎥 Video Preview:</p>
                <video
                  controls
                  src={capturedVideo}
                  className="w-full rounded-lg border border-white/40"
                />
              </div>
            )}

            <Button type="submit" className="w-full bg-primary text-white" onClick={handleSubmit}>
              Submit Report
            </Button>

          </div>
        </div>
      )}
    </>
  );
};

export default FloatingReportModal;

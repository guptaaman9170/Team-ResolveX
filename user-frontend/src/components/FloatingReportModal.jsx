import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

// Simple in-app store to pass extracted report to ReportPage
const reportBus = {
  data: null,
  set(d) { this.data = d; },
  get() { return this.data; }
};
export { reportBus };

const API_BASE = import.meta.env.VITE_API_BASE;

const FloatingReportModal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [capturedVideo, setCapturedVideo] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [submitting, setSubmitting] = useState(false);

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
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      setCapturedImage(URL.createObjectURL(blob));
      setCapturedVideo(null);
      // Keep the blob on the element for upload if needed later
      canvas.fileBlob = blob;
    }, "image/jpeg", 0.92);
  };

  const startRecording = () => {
    if (capturedImage) return;
    if (!stream) return;
    setRecording(true);
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;
    setRecordedChunks([]);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) setRecordedChunks((prev) => prev.concat(e.data));
    };
    mediaRecorder.start(1000);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
    mediaRecorderRef.current.onstop = () => {
      const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
      setCapturedVideo(URL.createObjectURL(videoBlob));
      setCapturedImage(null);
      // keep a copy of the blob on the ref (optional)
      mediaRecorderRef.current.blob = videoBlob;
      setRecordedChunks([]);
    };
  };

  // Save to bus + sessionStorage and navigate via react-router (preserves SPA behavior)
  const finishAndNavigateWith = (payload) => {
    // Normalize payload keys to what ReportPage expects
    const reportObj = {
      title: payload.issue_title || payload.title || "",
      description: payload.detailed_description || payload.description || "",
      category: payload.issue_category || payload.category || "Other",
      priority: payload.priority || "medium",
      mediaUrl: payload.media_url || "",
      mediaKind: payload.mediaKind || payload.kind || "image",
    };

    // set in in-memory bus for backward compatibility
    reportBus.set(reportObj);

    // set in sessionStorage so a refresh on /report still has data
    try {
      sessionStorage.setItem("reportData", JSON.stringify(reportObj));
    } catch (e) {
      console.warn("Could not save reportData to sessionStorage:", e);
    }

    // cleanup local camera/ui state BEFORE navigation
    setSubmitting(false);
    setIsOpen(false);
    stopCamera();

    // Navigate with router state (preferred)
    navigate("/report", { state: { reportData: reportObj } });
  };

  const uploadToBackend = async (file, kind) => {
    const fd = new FormData();
    fd.append("file", file, kind === "image" ? "capture.jpg" : "capture.webm");
    fd.append("kind", kind);
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/process`, { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      const data = await res.json();

      // If backend returns final payload already normalized, we can pass it directly
      finishAndNavigateWith(data);
    } catch (e) {
      console.error(e);
      alert("Failed to analyze media.");
      // ensure cleanup on error
      setSubmitting(false);
      setIsOpen(false);
      stopCamera();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recording) return;
    // Determine source blob
    if (capturedVideo && recordedChunks.length === 0) {
      // Get blob from object URL by refetching
      try {
        const resp = await fetch(capturedVideo);
        const blob = await resp.blob();
        await uploadToBackend(blob, "video");
      } catch (err) {
        console.error("Failed to fetch capturedVideo blob:", err);
        alert("Failed to prepare video for upload.");
      }
    } else if (capturedImage) {
      try {
        const resp = await fetch(capturedImage);
        const blob = await resp.blob();
        await uploadToBackend(blob, "image");
      } catch (err) {
        console.error("Failed to fetch capturedImage blob:", err);
        alert("Failed to prepare image for upload.");
      }
    } else {
      alert("Capture a photo or record a video first.");
    }
  };

  const openModal = () => { setIsOpen(true); startCamera(); };
  const closeModal = () => { setIsOpen(false); stopCamera(); setCapturedImage(null); setCapturedVideo(null); };

  return (
    <>
      <Button size="lg" className="w-16 h-16 rounded-full btn-civic shadow-float" aria-label="Quick Report" onClick={openModal}>
        <Camera className="w-6 h-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white/30 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 w-full max-w-lg relative transform animate-float-3d border border-white/40">
            <button className="absolute top-4 right-4 text-white" onClick={closeModal} aria-label="Close">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Real-Time Photo & Video Capture</h2>

            <div className="mb-4">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border border-white/40" />
            </div>

            <div className="flex gap-4 mb-4 justify-center">
              <Button onClick={capturePhoto} className={`bg-primary text-white ${capturedVideo ? "opacity-50 pointer-events-none" : ""}`}>📸 Capture Photo</Button>
              {recording ? (
                <Button onClick={stopRecording} className="bg-destructive text-white">⏹ Stop Recording</Button>
              ) : (
                <Button onClick={startRecording} className={`bg-secondary text-white ${capturedImage ? "opacity-50 pointer-events-none" : ""}`}>🎥 Start Recording</Button>
              )}
            </div>

            {capturedImage && (
              <div className="mb-4">
                <p className="text-white text-sm mb-2">📸 Photo Preview:</p>
                <img src={capturedImage} alt="Captured" className="w-full rounded-lg border border-white/40" />
              </div>
            )}

            {capturedVideo && (
              <div className="mb-4">
                <p className="text-white text-sm mb-2">🎥 Video Preview:</p>
                <video controls src={capturedVideo} className="w-full rounded-lg border border-white/40" />
              </div>
            )}

            <Button type="submit" className="w-full bg-primary text-white" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Analyzing..." : "Submit Report"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingReportModal;

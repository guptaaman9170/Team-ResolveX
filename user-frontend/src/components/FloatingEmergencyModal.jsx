import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X, MapPin, Clock, User, Phone } from "lucide-react";

const FloatingEmergencyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, address: "Fetching address..." });
  const [description, setDescription] = useState("");
  const [incidentType, setIncidentType] = useState("Medical Emergency");
  const [timestamp, setTimestamp] = useState("");
  const [userId] = useState("user123");
  const [contactNumber] = useState("+91 9876543210");

 const openModal = () => {
  setIsOpen(true);
  setTimestamp(new Date().toISOString());

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      try {
        const res = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
);

        const data = await res.json();

        setLocation({
          latitude,
          longitude,
          address: data.display_name || "Address not available"
        });
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
        setLocation({
          latitude,
          longitude,
          address: "Address not available"
        });
      }
    },
    () => {
      setLocation({
        latitude: 0,
        longitude: 0,
        address: "Location not available"
      });
    }
  );
};


  const closeModal = () => {
    setIsOpen(false);
    setDescription("");
    setIncidentType("Medical Emergency");
  };

  const sendEmergencyAlert = () => {
    setSending(true);

    const payload = {
      userId,
      contactNumber,
      location,
      incidentType,
      timestamp,
      description,
      priority: "High"
    };

    console.log("Sending SOS payload:", payload);

    setTimeout(() => {
      alert("🚨 Emergency alert sent successfully!");
      setSending(false);
      closeModal();
    }, 2000);
  };

  return (
    <>
      {/* Floating Emergency Button */}
      <Button
        size="lg"
        className="fixed bottom-24 right-8 w-16 h-16 rounded-full bg-red-600 shadow-lg z-50"
        aria-label="Send Emergency Alert"
        onClick={openModal}
      >
        <AlertTriangle className="w-6 h-6 text-white" />
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-[400px] h-[500px] p-6 flex flex-col justify-between relative">

            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold text-center text-red-600 mb-4">🚨 Emergency SOS</h2>

            <div className="flex flex-col space-y-3">

              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" />
                <span><strong>User ID:</strong> {userId}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5" />
                <span><strong>Contact:</strong> {contactNumber}</span>
              </div>

              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <strong>Location:</strong><br />
                  Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}<br />
                  {location.address}
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Clock className="w-5 h-5" />
                <span><strong>Timestamp:</strong><br />{new Date(timestamp).toLocaleString()}</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Incident Type</label>
                <select
  value={incidentType}
  onChange={(e) => setIncidentType(e.target.value)}
  className="w-full p-2 border rounded bg-gray-100"
>
  <option>Medical Emergency</option>
  <option>Fire</option>
  <option>Crime</option>
  <option>Road Accident</option>
  <option>Natural Disaster</option>
  <option>Other</option> {/* ✅ Added Other Option */}
</select>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Description (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Briefly describe the situation..."
                  className="w-full p-2 border rounded bg-gray-100"
                />
              </div>

            </div>

            <Button
              className="mt-4 bg-red-600 text-white font-semibold"
              disabled={sending}
              onClick={sendEmergencyAlert}
            >
              {sending ? "Sending..." : "Send SOS Alert"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingEmergencyModal;
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { CameraCard } from "./CameraCard";

interface CameraData {
  id: number;
  name: string;
  lane: string;
  status: "Active" | "Inactive";
  alerts: number;
  capacity: number;
  imageUrl?: string;
  timestamp?: string;
}

export const CameraGrid = () => {
  const [cameras, setCameras] = useState<CameraData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCameras = async () => {
  try {
    setIsLoading(true);
    const res = await fetch("http://localhost:5000/api/frames");
    const data = await res.json();

    // Normalize fields
    const formatted = data.map((item: any, index: number) => ({
      id: item.id ?? index,
      name: item.name ?? `Camera ${index + 1}`,
      lane: item.lane ?? "Unknown",
      status: item.status ?? "Active",
      alerts: item.alerts ?? 0,
      capacity: item.capacity ?? 0,
      imageUrl: item.imageUrl || item.url || item.frame || "", // 👈 important
      timestamp: item.timestamp,
    }));

    setCameras(formatted);
  } catch (error) {
    console.error("Error fetching camera feeds:", error);
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
    fetchCameras();
  }, []);

  return (
    <div className="bg-surface rounded-xl p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
        <button
          onClick={fetchCameras}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-light transition-colors duration-200 disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <div className="text-center">
            <RefreshCw size={48} className="mx-auto mb-4 animate-spin" />
            <p className="text-lg">Loading camera feeds...</p>
          </div>
        </div>
      ) : (
        /* Camera Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cameras.map((camera) => (
            <CameraCard key={camera.id} camera={camera} />
          ))}
        </div>
      )}
    </div>
  );
};

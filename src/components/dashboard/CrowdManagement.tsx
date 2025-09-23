import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { CrowdCard } from "./CrowdCard";

interface CrowdData {
  id: number;
  area: string;
  density: number;
  trend: string;
  imageUrl?: string;
}

export const CrowdManagement = () => {
  const [crowdData, setCrowdData] = useState<CrowdData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCrowdData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:5000/api/stampede");
      const data = await res.json();

      // Normalize response in case API field names differ
      const formatted = data.map((item: any, index: number) => ({
        id: item.id ?? index,
        area: item.area ?? `Zone ${index + 1}`,
        density: item.density ?? 0,
        trend: item.trend ?? "Stable",
        imageUrl: item.imageUrl || item.url || item.frame || "", // 👈 map to imageUrl
      }));

      setCrowdData(formatted);
    } catch (error) {
      console.error("Error fetching crowd data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCrowdData();
  }, []);

  return (
    <div className="bg-surface rounded-xl shadow-soft p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">
          Crowd Density Analysis
        </h2>
        <button
          onClick={fetchCrowdData}
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
            <p className="text-lg">Loading crowd analysis...</p>
          </div>
        </div>
      ) : (
        /* Crowd Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {crowdData.map((crowd) => (
            <CrowdCard key={crowd.id} crowd={crowd} />
          ))}
        </div>
      )}
    </div>
  );
};

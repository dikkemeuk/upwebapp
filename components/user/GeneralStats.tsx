import { GenericStats } from "@lib/types";
import apiFetch from "@lib/utils/api";
import { useEffect, useState } from "react";

interface GeneralStatsProps {
  id: string;
}

export default function GeneralStats({ id }: GeneralStatsProps) {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<GenericStats>({} as GenericStats);

  useEffect(() => {
    const fetch = async () => {
      const response = await apiFetch<{ message: string; data: GenericStats }>(
        `/api/stats/${id}`
      );
      if (response.data) {
        setData(response.data);
      }
      setLoading(false);
    };

    fetch();
  }, [id]);

  const ToText = (string: string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    const fixed = result.split("_").join(" ");
    const finalResult = fixed.charAt(0).toUpperCase() + fixed.slice(1);
    return finalResult;
  };

  if (loading) {
    return (
      <div>
        <div className="divider">Stats</div>
        <div className="flex flex-col m-auto h-auto w-auto">
          <div className="w-full">
            <div className="card lg:m-auto lg:w-1/2 max-h-80 shadow bg-gray-800 m-2 animate-pulse">
              <div className="card-body">
                <div className="card-title grid grid-cols-2 w-full">
                  <span>Loading...</span>
                  <div className="w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin"></div>
                </div>
                <span>The stats are loading, be patient please.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="divider">Stats</div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          
            <div key={key} className="px-1 py-2 rounded-lg bg-gray-800">
              <div className="stat-title">{ToText(key)}</div>
              <div className="stat-value text-lg md:text-lg">
                {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
              </div>
            </div>
          
        ))}
      </div>
    </>
  );
}

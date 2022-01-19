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
  });

  const ToText = (string: string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    const fixed = result.replaceAll("_", " ");
    const finalResult = fixed.charAt(0).toUpperCase() + fixed.slice(1);
    return finalResult;
  };

  return (
    <>
        <div className="divider">Stats</div>
    
    <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
    
    {Object.entries(data).map(([key, value]) => (
    <>
        <div className="px-1 py-2 rounded-lg bg-gray-800">
        <div className="stat-title">{ToText(key)}</div>
        <div className="stat-value text-lg md:text-lg">{typeof value === "boolean" ? value ? "Yes" : "No" : value}</div>
        </div>
    </>
    ))}
    </div>
    </>
  );
}

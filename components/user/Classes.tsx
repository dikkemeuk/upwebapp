import { ClassInterface, NonAdminData } from "@lib/types";
import apiFetch from "@lib/utils/api";
import Loading from "components/misc/Loading";
import Skeleton from "components/Skeleton";
import Class from "components/user/Class";
import { useEffect, useState } from "react";

interface ClassData {
  id: number;
}

export default function Classes({ id }: ClassData) {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<ClassInterface[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = (await apiFetch(`/api/classes/${id}`)) as {
        data?: ClassInterface[];
        message: string;
      };
      if (response.data && !data.length) {
        setData(response.data);
      }
      setLoading(false);
    };

    fetch();
  }, [data, id]);

  if (loading || !data.length) {
    return (
      <>
      <div className="divider">Classes</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            
              <div key={`class${i}`} className="flex flex-col items-center justify-center h-auto w-auto">
                <div className="w-full max-w-md">
                  <div className="card w-auto h-auto shadow bg-gray-800 m-2">
                    <div className="card-body">
                      <div className="card-title grid grid-cols-2 w-full">
                        <span>Loading...</span>
                        <div className="w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin"></div>
                      </div>
                      <span>The classes are loading, be patient please.</span>
                    </div>
                  </div>
                </div>
              </div>
            
          ))}
      </div>
      </>
    );
  }

  return (
    <>
    <div className="divider">Classes</div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {data.map((x, i) => (
        <Class key={`class-${i}`} data={x.class} className={x.className} />
      ))}
    </div>
    </>
  );
}

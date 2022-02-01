import apiFetch from "@lib/utils/api";
import Loading from "components/misc/Loading";
import { useEffect, useState } from "react";

interface Props {
  id: string
}

export default function AliasPart({ id }: Props) {
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
        const fetch = async () => {
            const response = await apiFetch<{ message: string; data?: string[] }>(
                `/api/aliases/${id}`
            );
            if (response.data) {
                const box = document.getElementById("aliasbox");
                if (box) {
                    box.innerHTML = `${response.data.join(", ")}`;
                }
            }
            setLoading(false);
        };

        fetch();
    }, [loading, id])

    if (loading) {
        return (
          <div id="aliases-container" className="m-2">
           <div className="divider">Aliases</div>
           <div className="flex flex-col m-auto h-auto w-auto">
            <div className="w-full">
              <div className="card lg:m-auto lg:w-1/2 max-h-80 shadow bg-gray-800 m-2 animate-pulse">
                <div className="card-body">
                  <div className="card-title grid grid-cols-2 w-full">
                    <span>Loading...</span>
                    <div className="w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin"></div>
                  </div>
                  <span>The Aliases are loading, be patient please.</span>
                </div>
              </div>
            </div>
          </div>
          </ div>
        );
      }

    return (
        <div id="aliases-container">
            <div className="divider">Aliases</div>
            <p  id="aliasbox" className="w-full p-3 rounded-lg bg-gray-800" />
        </div>
    );
}

import type{ AdminData } from "@lib/types";
import apiFetch from "@lib/utils/api";

import { useUserState } from "context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface AdminPageProps {
    id: string
}

export default function AdminPage({id}: AdminPageProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<AdminData | undefined>();
    const user = useUserState();
    const router = useRouter();

    const ToText = (string: string) => {
        const result = string.replace(/([A-Z])/g, " $1");
        const fixed = result.split("_").join(" ");
        const finalResult = fixed.charAt(0).toUpperCase() + fixed.slice(1);
        return finalResult;
      };

    useEffect(() => {

        if(user && user.rights >= 60|| user?.id == parseInt(id)) {
            const fetch = async () => {
                const response = await apiFetch<{message: string, data: AdminData}>(`/api/admin/${id}`);
                if (response.data) {
                    setData(response.data);
                }
                setLoading(false);
            };
            fetch();
        } else {
            setData({ip: "Nice try!", username: "You cannot see this", email: " Better luck next time"});
            setLoading(false)
        }

        
    }
    , [loading, id, user, router]);

    if (loading) {
        return (
            <>
                <div className="divider">Sensitive details</div>
                <div className="flex flex-col m-auto h-auto w-auto">
                    <div className="w-full">
                        <div className="card lg:m-auto lg:w-1/2 max-h-80 shadow bg-gray-800 m-2 animate-pulse">
                            <div className="card-body">
                                <div className="card-title grid grid-cols-2 w-full">
                                    <span>Loading...</span>
                                    <div className="w-8 h-8 border-4 border-white border-r-transparent rounded-full animate-spin"></div>
                                </div>
                                
                                <span>This section is loading, be patient please.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="divider">Sensitive details</div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {
                Object.entries(data ?? {}).length !== 0 ? (
                    Object.entries(data!).map(([key, value]) => (
            
                        <div key={key} className="px-1 py-2 rounded-lg bg-gray-800">
                        <div className="stat-title">{ToText(key)}</div>
                        <div className="stat-value text-lg md:text-lg">
                            {typeof value === "boolean" ? (value ? "Yes" : "No") : value && value.length ? value : "None"}
                        </div>
                        </div>
                    
                    ))
                ) : (
                    <div className="px-1 py-2 rounded-lg bg-gray-800">
                        <div className="stat-title">No information found</div>
                        <div className="stat-value text-lg md:text-lg">
                            None
                        </div>
                    </div>
                )
            }
      </div>
        </div>
    )


}
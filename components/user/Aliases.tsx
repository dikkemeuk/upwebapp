import apiFetch from "@lib/utils/api";
import Loading from "components/misc/Loading";
import { useEffect, useState } from "react";

interface Props {
  id: string
}

export default function AliasPart({ id }: Props) {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState<string[]>([]);
  
    useEffect(() => {
        const fetch = async () => {
            const response = await apiFetch<{ message: string; data?: string[] }>(
                `/api/aliases/${id}`
            );
            if (response.data) {
                setData(response.data);
            }
            setLoading(false);
        };

        fetch();
    }, [loading, id])

    return (
        <div>
            <div className="divider">Aliases</div>
            <div className="w-full p-3 text-white rounded-lg bg-gray-800">
            {
                data.map((alias, index) => alias).join(", ")          
            }
            </div>
        </div>
    );
}

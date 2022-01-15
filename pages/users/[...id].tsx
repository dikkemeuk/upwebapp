import apiFetch from "@lib/utils/api";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MePage() {

  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    console.log(id);

    const Fetch = async () => {
      const response = await apiFetch<{message: string, data: any}>(`/api/users/${router.query.id}`);
      if(response.data) {
        setUser(response.data);
      }
      setLoading(false);
    }

    Fetch()

  }, [router, id])


  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md">
          <div className="card shadow bg-gray-800 m-2">
            <div className="card-body">
              <div className="card-title">ToDo { loading ? "Loading.." : user ? user.id : "nein"}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

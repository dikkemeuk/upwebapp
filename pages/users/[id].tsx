import apiFetch from "@lib/utils/api";
import Layout from "components/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PlayerPageProps {
  id: string;
}

const PlayerPage: NextPage<PlayerPageProps> = ({id}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const Fetch = async () => {

      if(!id) {
        setLoading(false);
        return router.push("/");
      }

      const parsedId = parseInt(id);

      if(isNaN(parsedId)) {
        setLoading(false);
        return router.push("/");
      }

      const response = await apiFetch<{message: string, data: any}>(`/api/users/${id}`);
      if(response.data) {
        setUser(response.data);
      }
      setLoading(false);
    }

    Fetch()

  }, [id, router])


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

PlayerPage.getInitialProps = async (ctx) => {
  const id = ctx?.query.id as string;
  return { id };
}

export default PlayerPage

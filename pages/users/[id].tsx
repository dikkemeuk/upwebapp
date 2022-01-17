import { useUserState } from "context/AuthContext";
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
  
  const userState = useUserState()

  useEffect(() => {

    const Fetch = async () => {
      
      if(!id) {
        setLoading(false);
        return router.push("/");
      }

      if(!userState || userState.rights < 20 && userState?.id !== Number(id)) {
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

  }, [id, router, userState])


  if(loading) {
    
  }

  return (
    <Layout loading={loading}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-md">
          <div className="card shadow bg-gray-800 m-2">
            <div className="card-body">
              <div className="card-title">ToDo { user ? user.id : "nein"}</div>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface PlayerDataProps {
  id: number
  rights: number
  username: string
  experience: number
  kills: number
  assists: number
  deaths: number
  rank: number
  killstreak: number
  time: Date
  register_time: Date
  time_played: number
  melee_kills: number
  headshots: number
  class1: number
  class2: number
  class3: number
  class4: number
  class5: number
  class6: number
  class7: number
  class8: number
  auth: string | null
  class1_name: string
  class2_name: string
  class3_name: string
  class4_name: string
  class5_name: string
  class6_name: string
  class7_name: string
  class8_name: string
  prestige: number
  zom_kills: number
  email: string | null
  points: number
  hat: number
  times_joined: number
  last_visit: Date
}

const PlayerData = (data: PlayerPageProps) => {

}

PlayerPage.getInitialProps = async (ctx) => {
  const id = ctx?.query.id as string;
  return { id };
}

export default PlayerPage

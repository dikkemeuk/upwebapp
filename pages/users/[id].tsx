import { useUserState } from "context/AuthContext";
import apiFetch from "@lib/utils/api";
import Layout from "components/Layout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Tooltip from "components/misc/ToolTip";
import { NonAdminData } from "@lib/types";
import Classes from "components/user/Classes";
import dynamic from "next/dynamic";

interface PlayerPageProps {
  id: string;
}

const ClassSection = dynamic(() => import("components/user/Classes"))
const GeneralStats = dynamic(() => import("components/user/GeneralStats"))
const AliasPart = dynamic(() => import("components/user/Aliases"))

const PlayerPage: NextPage<PlayerPageProps> = ({id}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<NonAdminData | null>(null);
  
  const userState = useUserState()
  const isAdmin = userState? userState.rights >= 20 : false;

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

  return (
    <Layout loading={loading}>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full">
          <AliasPart id={id} />
          
          <GeneralStats id={id} />

        
          
          {
            userState?.id === Number(id) && (
            <>
              <div className="divider"><Tooltip tip="View your classes, the ability to change them will come soon!">Classes</Tooltip></div>
              <ClassSection id={parseInt(id)} />
            </>
            )
          }

          <h1>{user?.username}</h1>
        </div>
      </div>
    </Layout>
  );
}



interface Props {
  data: NonAdminData
}

PlayerPage.getInitialProps = async (ctx) => {
  const id = ctx?.query.id as string;
  return { id };
}

export default PlayerPage

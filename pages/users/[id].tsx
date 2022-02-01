import { useUserState } from "context/AuthContext";
import Layout from "components/Layout";
import { NextPage } from "next";
import Tooltip from "components/misc/ToolTip";
import dynamic from "next/dynamic";
import ChatLog from "components/user/Messages";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface PlayerPageProps {
  id: string;
}


const ClassSection = dynamic(() => import("components/user/Classes"))
const GeneralStats = dynamic(() => import("components/user/GeneralStats"))
const AliasPart = dynamic(() => import("components/user/Aliases"))
const AdminPage = dynamic(() => import("components/user/AdminData")) 

const PlayerPage: NextPage<PlayerPageProps> = ({id}) => {

  const userState = useUserState()
  const isAdmin = userState && userState.rights >= 20
  const router = useRouter()

  useEffect(() => {
    if (!userState || (userState.id !== parseInt(id) && !isAdmin)) {
      router.push("/errors/401")
    }
  }, [userState, id, isAdmin, router])

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full">
          <AdminPage id={id} />
          <AliasPart id={id} />
          
          <GeneralStats id={id} />

          <ChatLog id={id}/>
          
          {
            userState?.id === Number(id) && (
            <>
              <ClassSection id={parseInt(id)} />
            </>
            )
          }

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

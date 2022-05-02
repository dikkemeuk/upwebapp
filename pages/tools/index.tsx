import Layout from "components/Layout";
import Section from "components/Section";
import { useUserState } from "context/AuthContext";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LinkComponent from "components/elements/Link";


export default function Tools() {
  const userState = useUserState();
  const isMember = userState && userState.rights >= 10;
  const router = useRouter();

  useEffect(() => {
    if (!userState || !isMember) {
      router.push("/errors/401");
    }
  });

  return (
    <Layout head={{ title: "Admin Tools" }}>
      <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <Section pretitle="">
            <h1 className="text-white">Admin Tools</h1>
            <p>
              This is the admin tools page.
              <br />
              This page is only accessible to members of the Uniting People
              team!
              <br />
              <br />
            </p>
            <div className="divider" />
            <div className="grid grid-cols-1 gap-y-2">
              <div className="btn bg-red-800">
                <LinkComponent href="/tools/users" text="Search users" />  
              </div>
              <div className="btn bg-red-800">
                  <LinkComponent href="/tools/bans" text="Banlog" />
              </div>
              <div className="btn bg-red-800">
                <LinkComponent href="/tools/logs" text="Chatlog (in development)" />
              </div >
              
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
}

import Layout from "components/Layout";

import Section from "components/Section";
import { useUserState } from "context/AuthContext";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
            <h1>Admin Tools</h1>
            <p>
              This is the admin tools page.
              <br />
              This page is only accessible to members of the Uniting People
              team!
              <br />
              <br />
            </p>
            <div className="divider" />
            <ul>
              <li>
                <a href="/tools/users">Find players</a>
              </li>
              <li>
                <a href="/tools/bans">Banlog</a>
              </li>
              <li>
                <a href="/tools/logs">Chatlog (work in progress)</a>
              </li>

              {userState && userState.rights >= 80 && (
                <li>
                  <a href="/tools/manager">Manage server settings</a>
                </li>
              )}
            </ul>
          </Section>
        </div>
      </div>
    </Layout>
  );
}

Tools.getServersideProps = async function ({
  req,
  res,
  query,
}: NextPageContext) {};

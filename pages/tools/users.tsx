import apiFetch from "@lib/utils/api";
import { coloredText } from "@lib/utils/textColor";
import Layout from "components/Layout";
import Section from "components/Section";
import { useUserState } from "context/AuthContext";
import { useRouter } from "next/router";
import { AliasQueryResult } from "pages/api/finduser";
import { useEffect, useState } from "react";

export default function Users() {
  const userState = useUserState();
  const isMember = userState && userState.rights >= 10;
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<AliasQueryResult[]>([]);

  useEffect(() => {
    if (!userState || !isMember) {
      router.push("/errors/401");
    }
  });

  const findPlayers = async () => {
    const res = await apiFetch<{
      message: string;
      matches?: AliasQueryResult[]
    }>("/api/finduser", {
      method: "POST",
      body: JSON.stringify({
        search
      }),
    });

    if(res.matches) {
        setUsers(res.matches);
    }
  };

  return (
    <Layout>
      <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <Section pretitle="">
            <h1>Users</h1>

            <div className="divider"></div>

            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search for a player"
                  className="input input-bordered"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => findPlayers()} className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            
            
          </Section>

          {
                users.length > 0 && (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>UID</th>
                                <th>Times used</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr onDoubleClick={() => router.push(`/users/${user.uid}`)} key={`${user.alias}-${user.uid}-${user.used}-row`}>
                                    <td dangerouslySetInnerHTML={{__html: coloredText(user.alias)}} id={`${user.alias}-${user.uid}-${user.used}-name`}></td>
                                    <td key={`${user.alias}-${user.uid}-${user.used}-uid`}>{user.uid}</td>
                                    <td key={`${user.alias}-${user.uid}-${user.used}-used`}>{user.used}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
      </div>
    </Layout>
  );
}

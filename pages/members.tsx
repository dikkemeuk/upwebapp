import apiFetch from "@lib/utils/api";
import { stripColors } from "@lib/utils/textColor";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function MembersPage() {
  const [mems, setMems] = useState<
    { uid: Number; name: string; rights: number }[]
  >([] as { uid: Number; name: string; rights: number }[]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const Fetch = async () => {
      const response = await apiFetch<
        { uid: Number; name: string; rights: number }[]
      >("/api/members");
      if (response) {
        setMems(response);
      }
      setLoading(false);
    };
    Fetch();
  }, []);

  return (
    <Layout loading={loading}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>UID</th>
              <th>Rights</th>
            </tr>
          </thead>
          <tbody>
            {
              mems.map((member) => (
                <tr
                  className="hover"
                  key={member.uid?.toString()}
                  onClick={() =>
                    router.push(`/users/${member.uid?.toString()}`)
                  }
                >
                  <td><p>{stripColors(member.name)}</p></td>
                  <td>{member.uid}</td>
                  <td>{member.rights}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

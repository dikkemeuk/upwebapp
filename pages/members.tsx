import apiFetch from "@lib/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function MembersPage({mems}: {mems: {uid: Number, name: string, rights: number}[]}) {
  const [members, setMems] = useState<{ uid: Number; name: string; rights: number }[]>(mems);
  const router = useRouter();
  
  useEffect(() => {

  const buildText = () => {
    for(let i = 0; i < members.length; i++) {
      const box = document.getElementById(`member-${members[i].uid}`)
      if (box) {
        box.innerHTML = `${mems[i].name}`
      }
    }
  }

  buildText()
  }, [members, mems])
  

  return (
    <Layout head={{title: "Members"}}>
      <div className="h-[80%]">
        <table className="table bg-slate-600 w-full">
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
                  <td><p id={`member-${member.uid}`}></p></td>
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

MembersPage.getInitialProps = async () => {
  const response = await apiFetch<
    { uid: Number; name: string; rights: number }[]
  >("/api/members");
  return {
    mems: response,
  };
}

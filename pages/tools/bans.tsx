import apiFetch from "@lib/utils/api";
import Layout from "components/Layout";
import Section from "components/Section";
import { Ban } from "pages/api/bans";
import { useEffect, useState } from "react";

export default function BanPage() {

    const [bans, setBans] = useState<Ban[]>([]);

    useEffect(() => {
        apiFetch<Ban[]>("/api/bans").then((res) => {
            setBans(res);
        });
    })

  return (
    <Layout head={{ title: "Banlog" }}>
      <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <Section pretitle="">
            <h1>Banlog</h1>
            <div className="overflow-x-auto">
              <table className="table bg-slate-600 w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Banned</th>
                    <th>Banned by</th>
                    <th>Reason</th>
                    <th>Date of ban</th>
                    <th>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    bans.map((ban, i) => (
                        <tr key={`ban-${i}`}>
                            <th>{ban.id}</th>
                            <td dangerouslySetInnerHTML={{__html: ban.banned}}></td>
                            <td dangerouslySetInnerHTML={{__html: ban.admin}}></td>
                            <td>{ban.reason}</td>
                            <td>{ban.dateString}</td>
                            <td>{ban.expirationString}</td>
                        </tr>
                    ))
                  }

                  
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
}

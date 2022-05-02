import type { NextPage } from "next";
import Layout from "../components/Layout";
import apiFetch from "@lib/utils/api";
import SectionTitle from "components/Section";
import Videos from "components/misc/Videos";
import { useEffect, useState } from "react";

interface RestData {
  totalPlayers: number;
  totalAliases: number;
  totalMessages: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
  totalExperience: number;
  totalTimePlayed: string;
}

const Home: NextPage = () => {

  const ToText = (string: string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  const videos = [
    { id: 'X57rluee5xM' }, { id: 'GYoo4J3GqYA' },
    { id: 'JJloM1g_AT4' }, { id: '5-t0KXuJ5dE' },
    { id: 'P98-nAXzcVs' }, { id: 'm2D1H8_jNbM' },
    { id: 'QCOPNnaERTs' }, { id: 'dEtvPyHSV-A' },
    { id: 'xospMXrg7Ig' }, { id: 'rCQl3ui8CB4' },
    { id: 'Ijrw6-DI9U0' }, { id: '8PS_kX8FpjA' },
    { id: 'hUqz6iDXmW0' }, { id: 'stVWK43Jc-k' },
    { id: 'oc6CDLVeDDA' }, { id: 'Wr23bXwL-34' },
    { id: 'CMsSRxb2yZ4' }, { id: 'CYtyv2_5a6g' },
    { id: 'F8iyW7Mh2M4' }, { id: 'a1HYUWvY2kk' },
    { id: 'VB2WlvX26J8' }, { id: 'tl33Ob9xUxs' },
    { id: '8QO4vk_o5d0' }, { id: 'uk-fifyBBos' },
    { id: 'RTkSSGiShec' }, { id: '-UoIavSL-_4' },
    { id: 'IpxvQLsNGxw' }, { id: 't764rO0povE' },
    { id: 'yYvoeTKZJ10' }, { id: 'rNByK-Iyp4I' },
    { id: '1TSQsRWwQTg' }, { id: 'O2_q6AJBRSQ' },
    { id: 'nXPnqX_b3o4' }
  ]

  const calculateMove = (i: number, moveTo: "next" | "previous") => {
    if (i === 1 && moveTo === "previous") return videos.length;
    if (i === videos.length && moveTo === "next") return 1;
    return moveTo === "next" ? i + 1 : i - 1;

}

  const [data, setData] = useState<RestData>({} as RestData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const Fetch = async () => {
      const response = await apiFetch<RestData>("/api/stats");
      if (response) {
        setData(response);
      }
      setLoading(false);
    };
    Fetch();
  }, []);

  return (
    <Layout loading={loading}>
      <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <div className="card-title">
            <SectionTitle
              pretitle="About us"
              title="Here's a little bit about us"
              align="center"
            ><p className="text-white">
              Uniting People is a vibrant Zombies Server for Call of Duty 2 and
              was founded back in 2009 by leal. Four years later *|UP|* had then
              come to an end. <br /> After two years, in september 2015, it was
              revived and was being led by php and k1R@.
              <br />
              Right now it&apos;s being led by ScreaM, Fjozek is helping with
              development.
              <br />
              Uniting People does not only provide a fun and helpful environment
              for its players but is also a nice way to get to know other
              people. <br />
              Our elite members (admins) and infantry members will do anything
              to help your gaming experience, all you need to do is ask.
            </p>
              
            </SectionTitle>
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold text-white">About the Mod</h1>
            <p>
              Our zombie mod sustains the more classic zombie overhaul, in which
              the hunters try to kill all the zombies that they can with one
              life, while the zombies try to kill all hunters with unlimited
              lives.
              <br />
              The first zombie has an immunity towards bullets. He or she
              becomes susceptible to them when the first hunter dies, and from
              here on out, these two zombies will have to try to kill all the
              hunters within the round time limit.
              <br /> This infecting type of game lasts until either the round
              countdown time or the hunters run out, after which a new round
              starts. The game is only over when the full time limit has been
              reached or when a player reaches the maximum score of 1500.
              <br />
              <br />{" "}
            </p>
            <h1 className="text-lg font-bold text-white">
              Create-a-Class System{" "}
            </h1>
            <p>
              The Create-A-Class system allows a player to create 5 personal and
              individual classes, available after rank 4.
              <br />
              As the player progresses through the ranks, new guns, perks,
              characters and hats are unlocked. A custom class includes one
              primary weapon slot and one pistol slot, a perk with special
              advantages, customizable player characters and hats where you can
              choose from ordinary berets to fancy baseball caps.
              <br />
              <br />
              Have we sparked your interest? Then feel free to visit us. Use
              /connect up-zombies.eu in the console to connect to our server or
              find us on the CoD2 v1.3 list.
            </p>

            <h1 className="text-lg font-bold text-white">
              See you on the server!
            </h1>
          </div>
        </div>
      </div>
      <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <div className="card-title">
            <SectionTitle
              pretitle="Some Stats"
              title="View our lifetime stats here!"
              align="left"
            >
              Over the course of more than 5.5 years we have seen an incredible
              amount of players join our server.
              <br />
              We are so incredibly grateful to all of our players for choosing
              to spend time on our server. View some of our stats below!
            </SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => (
              <div className="shadow stats" key={`${key}-${value}`}>
                <div className="stat w-auto bg-slate-700">
                  <div className="stat-title text-white">{ToText(key)}</div>
                  <div className="stat-value text-lg md:text-lg text-white">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <div className="card-title">
            <SectionTitle pretitle="Our videos" align="center">
              <span className="text-white">Subscribe to our YouTube to stay updated with our latest videos!</span>
            </SectionTitle>
          </div>
          <div className="w-full md:w-[75%] carousel self-center">
            {videos.map((vid, i) => (
              <div
                key={vid.id}
                className="relative w-full pt-20 carousel-item"
                id={`video${i + 1}`}
              >
                <div className="w-full grid place-items-center aspect-h-9 aspect-w-16">
                <iframe
                  key={vid.id}
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                  //loading='lazy'
                > </iframe>
                </div>
                
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#video${calculateMove(i + 1, "previous")}`} className="btn bg-red-800 btn-circle">❮</a> 
                  <a href={`#video${calculateMove(i + 1, "next")}`} className="btn bg-red-800 btn-circle">❯</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
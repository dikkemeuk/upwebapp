import type { NextPage } from "next";
import Layout from "../components/Layout";
import apiFetch from "@lib/utils/api";
import SectionTitle from "components/Section";
import dynamic from "next/dynamic";
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


const Vids = dynamic(() => import("components/misc/Videos"));

const Home: NextPage = () => {

  const ToText = (string: string) => {
    const result = string.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  const [data, setData] = useState<RestData>({} as RestData);

  useEffect(() => {
    const Fetch = async () => {
      const response = await apiFetch<RestData>("/api/stats");
      if (response) {
        setData(response);
      }
    };
    Fetch();
  }, []);

  return (
    <Layout>
      <div className="card shadow bg-gray-800 m-2">
        <div className="card-body">
          <div className="card-title">
            <SectionTitle
              pretitle="About us"
              title="Here's a little bit about us"
              align="center"
            >
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
                <div className="stat w-auto">
                  <div className="stat-title">{ToText(key)}</div>
                  <div className="stat-value text-lg md:text-lg">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Vids />
    </Layout>
  );
};

export default Home;
import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import { Grommet, Spinner } from "grommet";

import Dash from "./components/Dash/Dash";
import Matchups from "./components/Matchups/Matchups";
import LiveMedian from "./components/LiveMedian/LiveMedian";
import ProjectedMedian from "./components/ProjectedMedian/ProjectedMedian";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  const [leagueId, setLeagueId] = useState("904421449396326400");
  const [managers, setManagers] = useState([]);
  const [rosters, setRosters] = useState([]);
  const [combined, setCombined] = useState([]);
  const [matchups, setMatchups] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCurrentWeek() {
      let res = await fetch(`https://api.sleeper.app/v1/state/nfl`);
      let json = await res.json();
      // console.log(json.display_week);
      setCurrentWeek(json.display_week);
    }

    getCurrentWeek();
  }, []);

  useEffect(() => { 

    async function getData() {
      Promise.all([
        fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`),
        fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`),
        fetch(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${currentWeek}`)
      ])
        .then(([resManagers, resRosters, resMatchups]) => {
          return Promise.all([resManagers.json(), resRosters.json(), resMatchups.json()]);
        })
        .then(([dataManagers, dataRosters, dataMatchups]) => {
          // console.log(dataMatchups);
          setManagers(dataManagers);
          setRosters(dataRosters);
          setMatchups(dataMatchups)
          setCombined(dataManagers.concat(dataRosters));
        });
    }

    if (currentWeek !== 0) {
      getData();
    }
  }, [currentWeek]);

  useEffect(() => {
    async function mergeData() {
      let mergeArr = [];
  
      await managers.map((team) => {
        let result = rosters.filter((roster) => team.user_id === roster.owner_id);
        let resultObj = result[0];
        if (resultObj.owner_id === team.user_id) {
          // mergeArr = [...mergeArr, [team, resultObj, resultObj.starters]]
          mergeArr.push({
            user_id: team.user_id,
            display_name: team.display_name,
            team_name: team.metadata.team_name,
            roster_id: resultObj.roster_id,
            record: resultObj.metadata.record,
            streak: resultObj.metadata.streak,
            players: resultObj.players,
            starters: resultObj.starters,
            avatar: team.avatar,
          });
        }
      });
  
      setTeams(mergeArr);
      setLoading(true);
    }

    mergeData();
  }, [combined]);

  return (
    <Grommet theme={theme} full>
      <div className="App">
        {/* <Header background="dark-1" pad="medium">
          <ResponsiveContext.Consumer>
            {(responsive) =>
              responsive === "small" ? (
                <Menu
                  label="Menu"
                  items={[
                    { label: "Home", onClick: () => {} },
                    { label: "Matchups", onClick: () => {} },
                  ]}
                />
              ) : (
                <Nav direction="row">
                  <Link className="navLink" to="/">
                    Home
                  </Link>
                  <Link className="navLink" to="matchups">
                    Standings
                  </Link>
                  <Link className="navLink" to="matchups">
                    Matchups
                  </Link>
                </Nav>
              )
            }
          </ResponsiveContext.Consumer>
        </Header> */}
       
        <Matchups teams={teams} matchups={matchups} currentWeek={currentWeek} setCurrentWeek={setCurrentWeek} loading={loading} setLoading={setLoading} />
        {/* <LiveMedian matchups={matchups} loading={loading} teams={teams}/> */}
        {/* <ProjectedMedian teams={teams} /> */}
        
        {/* <Routes>
          <Route element={<Dash teams={teams} />} path="/" />
          <Route
            element={<Matchups teams={teams} matchups={matchups} currentWeek={currentWeek} setCurrentWeek={setCurrentWeek} />}
            path="/matchups"
          />
        </Routes> */}
      </div>
    </Grommet>
  );
}

export default App;

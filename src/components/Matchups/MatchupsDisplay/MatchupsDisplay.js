import React, { useState, useEffect } from "react";
import "./MatchupDisplay.css";

import { Spinner } from "grommet";

const MatchupDisplay = (props) => {
  console.log(props);

  const [m1, setM1] = useState([]);
  const [m2, setM2] = useState([]);
  const [m3, setM3] = useState([]);
  const [m4, setM4] = useState([]);
  const [m5, setM5] = useState([]);
  const [m6, setM6] = useState([]);
  // const [projScores, setProjScores] = useState([]);

  useEffect(() => {
    const m1 = [];
    const m2 = [];
    const m3 = [];
    const m4 = [];
    const m5 = [];
    const m6 = [];

    props.teams.map((team) => (
      // console.log(team),
      team.matchup.matchup_id === 1
        ? m1.push(team)
        : team.matchup.matchup_id === 2
        ? m2.push(team)
        : team.matchup.matchup_id === 3
        ? m3.push(team)
        : team.matchup.matchup_id === 4
        ? m4.push(team)
        : team.matchup.matchup_id === 5
        ? m5.push(team)
        : team.matchup.matchup_id === 6
        ? m6.push(team)
        : console.log("v")
    ));

    setM1(m1);
    setM2(m2);
    setM3(m3);
    setM4(m4);
    setM5(m5);
    setM6(m6);
  }, [props.teams]);

  // console.log(m1, m2, m3, m4, m5, m6);

  return (
    <div className="">
      {props.loading ? (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5em'}}>
          <Spinner size="medium" color="#00cab7" />
        </div>
      ) : (
        <div>
          <div className="matchup-container">
            {m1.map((team, index) => (
              console.log(team),
              <>
                {index === 0 ? (
                  <div className="team-container">
                    <p style={{ marginRight: "2.5em" }}>{team.team_name}</p>
                    <h4>{team.matchup.points}</h4>
                  </div>
                ) : index === 1 ? (
                  <div className="team-container">
                    <h4>{team.matchup.points}</h4>
                    <p style={{ marginLeft: "2.5em" }}>{team.team_name}</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
          <div className="matchup-container">
            {m2.map((team, index) => (
              <>
                {index === 0 ? (
                  <div className="team-container">
                    <p style={{ marginRight: "2.5em" }}>{team.team_name}</p>
                    <h4>{team.matchup.points}</h4>
                  </div>
                ) : index === 1 ? (
                  <div className="team-container">
                    <h4>{team.matchup.points}</h4>
                    <p style={{ marginLeft: "2.5em" }}>{team.team_name}</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
          <div className="matchup-container">
            {m3.map((team, index) => (
              <>
                {index === 0 ? (
                  <div className="team-container">
                    <p style={{ marginRight: "2.5em" }}>{team.team_name}</p>
                    <h4>{team.matchup.points}</h4>
                  </div>
                ) : index === 1 ? (
                  <div className="team-container">
                    <h4>{team.matchup.points}</h4>
                    <p style={{ marginLeft: "2.5em" }}>{team.team_name}</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
          <div className="matchup-container">
            {m4.map((team, index) => (
              <>
                {index === 0 ? (
                  <div className="team-container">
                    <p style={{ marginRight: "2.5em" }}>{team.team_name}</p>
                    <h4>{team.matchup.points}</h4>
                  </div>
                ) : index === 1 ? (
                  <div className="team-container">
                    <h4>{team.matchup.points}</h4>
                    <p style={{ marginLeft: "2.5em" }}>{team.team_name}</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
          <div className="matchup-container">
            {m5.map((team, index) => (
              <>
                {index === 0 ? (
                  <div className="team-container">
                    <p style={{ marginRight: "2.5em" }}>{team.team_name}</p>
                    <h4>{team.matchup.points}</h4>
                  </div>
                ) : index === 1 ? (
                  <div className="team-container">
                    <h4>{team.matchup.points}</h4>
                    <p style={{ marginLeft: "2.5em" }}>{team.team_name}</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
          <div className="matchup-container">
            {m6.map((team, index) => (
              <>
                {index === 0 ? (
                  <div className="team-container">
                    <p style={{ marginRight: "2.5em" }}>{team.team_name}</p>
                    <h4>{team.matchup.points}</h4>
                  </div>
                ) : index === 1 ? (
                  <div className="team-container">
                    <h4>{team.matchup.points}</h4>
                    <p style={{ marginLeft: "2.5em" }}>{team.team_name}</p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchupDisplay;

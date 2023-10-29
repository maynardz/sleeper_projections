import React, {useState, useEffect} from 'react';
import { Grommet, Main, Pagination, Text } from 'grommet';

import MatchupDisplay from './MatchupsDisplay/MatchupsDisplay'; 
import LiveMedian from '../LiveMedian/LiveMedian';
import ProjectedMedian from '../ProjectedMedian/ProjectedMedian';

const Matchups = (props) => {
  // console.log(props);
  
  const [teamsFull, setTeamsFull] = useState([]);

  const handleChange = ({startIndex, endIndex}) => {
    // console.log(startIndex, endIndex);
    props.setCurrentWeek(endIndex);
  }

  async function getPlayerData() {
    let t = [];

    for await (let team of props.teams) {
      const playerReq = await team.starters.map(async (player_id) => fetch(`https://api.sleeper.com/projections/nfl/player/${player_id}?season_type=regular&season=2023`));

      const playerRes = await Promise.all(playerReq);
      
      const playerJson = await playerRes.map((response) => response.json());

      const playerData = await Promise.all(playerJson);
      
      const projectionReq = await team.starters.map(async (player_id) => fetch(`https://api.sleeper.com/projections/nfl/player/${player_id}?season_type=regular&season=2023&grouping=week`));

      const projectionRes = await Promise.all(projectionReq);

      const projectionJson = await projectionRes.map((response) => response.json());

      const projectionData = await Promise.all(projectionJson);
      // console.log(projectionData);
      const starters = await playerData.map((player, index) => ({
        ...player,
        proj: projectionData[index][props.currentWeek]
      }));

      let matchup;

      await props.matchups.map((match) => {
        // console.log(match);
        // let assignMatchup; 
        if (match.roster_id === team.roster_id) {
          // console.log('match found');
          matchup = match;
        } 
      })

      const teamObj = {
        user_id: team.user_id,
        display_name: team.display_name,
        team_name: team.team_name,
        roster_id: team.roster_id,
        record: team.record,
        streak: team.streak,
        players: team.players,
        starters: starters,
        matchup: matchup,
        avatar: team.avatar
      }
      t.push(teamObj);
    }
    setTeamsFull(t);
    props.setLoading(false);
  };

  useEffect(() => {
    getPlayerData();
  }, [props.teams]);

  return(
    <Grommet theme={props.theme}>

      <Main pad="large">
        <h3 style={{textAlign: 'center'}}>Matchups</h3>
        <Pagination page={props.currentWeek} step={1} numberItems={14} numberMiddlePages={3} onChange={handleChange} alignSelf='center'/>
        <Text alignSelf='center'>
          Showing Week {props.currentWeek} of 14
        </Text>
        {/* <img src={'https://sleepercdn.com/avatars/e7b75593c493cfe055b1d2ba72339b57'} /> */}
        <MatchupDisplay teams={teamsFull} loading={props.loading} setLoading={props.setLoading} />
        <LiveMedian teams={teamsFull} matchups={props.matchups} />
        <ProjectedMedian teams={teamsFull} />
      </Main>
    </Grommet>
  )
}

export default Matchups;
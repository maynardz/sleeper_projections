import React, {useEffect, useState} from 'react';
import { Main } from 'grommet';

const Dash = (props) => {

  // console.log(props);

  // const [teams, setTeams] = useState([]);

  // async function mergeData() {
  //   let mergeArr = [];

  //   props.test.managers.map((team) => {
  //     let result = props.test.rosters.filter((roster) => team.user_id === roster.owner_id);
  //     // console.log(result);
  //     // let resultObj = result;
  //     if (result.owner_id === team.user_id) {
  //       mergeArr.push({
  //         team: team,
  //         roster: result
  //       })
  //     }
  //   })

  //   // console.log(mergeArr);
  //   setTeams(mergeArr);
  // }

  // useEffect(() => {
  //   mergeData();
  // }, []);

  // console.log(teams);

  return(
    <div>
      <Main pad="large">
        Dash
      </Main>
    </div>
  )
}

export default Dash;
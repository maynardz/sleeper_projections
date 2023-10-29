import React, {useState, useEffect} from 'react';

const LiveMedian = (props) => {
  console.log(props);

  const [scores, setScores] = useState([]);
  const [median, setMedian] = useState(0);
  // const [projScores, setProjScores] = useState([]);

  useEffect(() => {
    let scoresArr = [];

    props.matchups.map((matchup) => {
      // console.log(matchup);
      scoresArr.push(matchup.points);
    })

    setScores(scoresArr);
  }, [props.matchups]);

  useEffect(() => {
    let sorted = scores.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
    // console.log(sorted);

    let sliced = sorted.slice(5, 7);
    // console.log(sliced);

    let added = 0;
    sliced.forEach((num) => {
      added += num;
    });

    let divided = added / 2;
    // console.log(divided);

    setMedian(divided);
  }, [scores]);

  // console.log(scores);

  return (
    <div style={{textAlign: 'center'}}>
      {
        props.loading ? <></> : (
          <div>
            <h4>Live Median</h4>
            <h2>{median.toFixed(2)}</h2>
          </div>
        )
      }
    </div>
  )
}

export default LiveMedian;
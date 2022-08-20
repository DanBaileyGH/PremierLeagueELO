import './App.css';
import React from "react";

function PredictGame(props) {
    const [result, setResult] = React.useState(null);
    if (!props.homeTeam || props.homeTeam === "Select Team") return;
    if (!props.awayTeam || props.awayTeam === "Select Team") return;
    console.log(props.homeTeam, props.awayTeam);

    async function fetchPrediction(props) {
        let response = await fetch(`/predict/${[props.homeTeam, "-", props.awayTeam]}`);
        response = await response.json();
        console.log(response.data);
        setResult(response.data);
    }

    if (!result || result.home !== props.homeTeam || result.away !== props.awayTeam) {
        fetchPrediction(props);
    }

    if(!result) return;

    return (
        <div>
            {Object.keys(result).map((stat) => <p key={stat}>{stat} - {["homewinchance", "awaywinchance"].includes(stat) ? (result[stat] + "%") : result[stat]}</p>)}
        </div>
    );
}
export default PredictGame;
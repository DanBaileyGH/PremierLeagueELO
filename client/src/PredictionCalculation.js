import './App.css';
import React from "react";

function PredictGame(props) {
    if (!props.homeTeam || props.homeTeam === "Select Team") return;
    if (!props.awayTeam || props.awayTeam === "Select Team") return;
    console.log(props.homeTeam, props.awayTeam);

    async function fetchPrediction(props) {
        let response = await fetch(`/predict/${[props.homeTeam, "-", props.awayTeam]}`);
        response = await response.json();
        console.log(response.data);
    }
    fetchPrediction(props);
}
export default PredictGame;
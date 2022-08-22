import './App.css';
import React from "react";

function PredictionCalculation(props) {
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

    if(!result) return <p>Loading...</p>;

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th className="empty-th"></th>
                        <th>Home</th>
                        <th>Away</th>
                    </tr>
                    <tr>
                        <th>Team</th>
                        <th>{result.home}</th>
                        <th>{result.away}</th>
                    </tr>
                    <tr>
                        <th>ELO Rating</th>
                        <th>{result.homeelo}</th>
                        <th>{result.awayelo}</th>
                    </tr>
                    <tr>
                        <th>Win %</th>
                        <th>{result.homewinchance}</th>
                        <th>{result.awaywinchance}</th>
                    </tr>
                    <tr>
                        <th>Decimal Odds</th>
                        <th>{result.homeodds}</th>
                        <th>{result.awayodds}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default PredictionCalculation;
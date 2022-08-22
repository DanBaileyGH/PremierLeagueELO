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
                        <td>{result.home}</td>
                        <td>{result.away}</td>
                    </tr>
                    <tr>
                        <th>ELO Rating</th>
                        <td>{result.homeelo}</td>
                        <td>{result.awayelo}</td>
                    </tr>
                    <tr>
                        <th>Win %</th>
                        <td>{result.homewinchance}</td>
                        <td>{result.awaywinchance}</td>
                    </tr>
                    <tr>
                        <td>Decimal Odds</td>
                        <td>{result.homeodds}</td>
                        <td>{result.awayodds}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default PredictionCalculation;
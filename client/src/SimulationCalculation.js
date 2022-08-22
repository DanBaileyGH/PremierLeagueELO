import './App.css';
import React from "react";

function SimulationCalculation(props) {
    const [result, setResult] = React.useState(null);
    if (!props.homeTeam || props.homeTeam === "Select Team") return;
    if (!props.awayTeam || props.awayTeam === "Select Team") return;
    if (!props.homeScore || props.homeScore === "Home Score") return;
    if (!props.awayScore || props.awayScore === "Away Score") return;
    console.log(props.homeTeam, props.awayTeam);

    async function fetchPrediction(props) {
        let response = await fetch(`/simulate/${[props.homeTeam, "-", props.awayTeam, "-", props.homeScore, "-", props.awayScore]}`);
        response = await response.json();
        console.log(response.data);
        setResult(response.data);
    }

    if (!result || [props.homeTeam, props.awayTeam, props.homeScore, props.awayScore].toString() !== [result.home, result.away, result.homescore, result.awayscore].toString()) {
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
                        <th>Score</th>
                        <th>{result.homescore}</th>
                        <th>{result.awayscore}</th>
                    </tr>
                    <tr>
                        <th>Initial ELO Rating</th>
                        <th>{result.homeinit}</th>
                        <th>{result.awayinit}</th>
                    </tr>
                    <tr>
                        <th>New ELO Rating</th>
                        <th>{result.homenew}</th>
                        <th>{result.awaynew}</th>
                    </tr>
                    <tr>
                        <th>ELO Change</th>
                        <th>{result.homechange}</th>
                        <th>{result.awaychange}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default SimulationCalculation;
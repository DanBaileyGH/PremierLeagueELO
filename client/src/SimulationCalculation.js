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
                        <td>{result.home}</td>
                        <td>{result.away}</td>
                    </tr>
                    <tr>
                        <th>Score</th>
                        <td>{result.homescore}</td>
                        <td>{result.awayscore}</td>
                    </tr>
                    <tr>
                        <th>Initial ELO Rating</th>
                        <td>{result.homeinit}</td>
                        <td>{result.awayinit}</td>
                    </tr>
                    <tr>
                        <th>New ELO Rating</th>
                        <td>{result.homenew}</td>
                        <td>{result.awaynew}</td>
                    </tr>
                    <tr>
                        <th>ELO Change</th>
                        <td>{result.homechange}</td>
                        <td>{result.awaychange}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default SimulationCalculation;
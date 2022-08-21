import './App.css';
import React from "react";

function PredictGame() {
    const [sortingStat, setSortingStat] = React.useState("ELO");
    const [teams, setTeams] = React.useState(null);

    React.useEffect(() => {   
        async function getAllTeams() {
            let response = await fetch("/sorted/ELO");
            response = await response.json();
            setTeams(response.data);
        }
        getAllTeams();
    }, []);

    if (!teams) return <p>Loading...</p>; //if api data hasnt loaded yet dont send component

    console.log(teams);

    return (
        <div>
            <h2>Sorted by {sortingStat}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Elo</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>Goals Scored</th>
                        <th>Goals Conceded</th>
                    </tr>
                    {teams.map((team, index) => <tr key={team.Team}>
                        <th>{index + 1}</th>
                        {Object.keys(team).map((stat) => <th>{stat === "ELO" ? team[stat].toFixed(2) : team[stat]}</th>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}
export default PredictGame;
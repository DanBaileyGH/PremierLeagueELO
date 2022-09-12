import './App.css';
import React from "react";

function TeamStats(props) {
    const [teamName, setTeamName] = React.useState(props.team);
    const [teamStats, setTeamStats] = React.useState(null);
    
    if (!props.team || props.team === "Select Team") return;

    async function handleTeam(team, index){
        await setTeamName(team.team);
        fetchTeamDetails(team);
    }

    if (teamName !== props.team) {
        handleTeam(props);
    }

    async function fetchTeamDetails(teamName) {
        let response = await fetch(`/team/${teamName.team}`);
        response = await response.json();
        console.log(response.data);
        await setTeamStats(response.data);
    }

    if (!teamStats) return <p>Loading...</p>; //if api data hasnt loaded yet dont send component

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Team</th>
                        <th>{teamStats.Team}</th>
                    </tr>
                    <tr>
                        <th>ELO Rating</th>
                        <td>{teamStats.ELO.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <th>Wins</th>
                        <td>{teamStats.Wins}</td>
                    </tr>
                    <tr>
                        <th>Losses</th>
                        <td>{teamStats.Losses}</td>
                    </tr>
                    <tr>
                        <th>Draws</th>
                        <td>{teamStats.Draws}</td>
                    </tr>
                    <tr>
                        <th>Goals Scored</th>
                        <td>{teamStats.GoalsFor}</td>
                    </tr>
                    <tr>
                        <th>Goals Conceded</th>
                        <td>{teamStats.GoalsAgainst}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default TeamStats;
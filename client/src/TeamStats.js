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

    if (!teamStats) return <p>Loading...</p>;

    return(
        <div>
            <br />
            <table>
                <tbody>
                    <tr>
                        <th>Team</th>
                        <th>{teamStats.Team}</th>
                    </tr>
                    <tr>
                        <th>ELO Rating</th>
                        <th>{teamStats.ELO.toFixed(2)}</th>
                    </tr>
                    <tr>
                        <th>Wins</th>
                        <th>{teamStats.Wins}</th>
                    </tr>
                    <tr>
                        <th>Draws</th>
                        <th>{teamStats.Draws}</th>
                    </tr>
                    <tr>
                        <th>Losses</th>
                        <th>{teamStats.Losses}</th>
                    </tr>
                    <tr>
                        <th>Goals Scored</th>
                        <th>{teamStats.GoalsFor}</th>
                    </tr>
                    <tr>
                        <th>Goals Conceded</th>
                        <th>{teamStats.GoalsAgainst}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default TeamStats;
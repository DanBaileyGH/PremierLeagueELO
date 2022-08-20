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

    if (!teamStats) return;

    return(
        <div>
            {Object.keys(teamStats).map((stat) => <p key={stat}>{stat} - {stat === "ELO"? teamStats[stat].toFixed(2) : teamStats[stat]}</p>)}
        </div>
    );
}
export default TeamStats;
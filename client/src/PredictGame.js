import './App.css';
import React from "react";

function PredictGame() {
    const [teams, setTeams] = React.useState(null);
    const [homeTeamName, setHomeTeamName] = React.useState(null);
    const [homeTeamStats, setHomeTeamStats] = React.useState(null);
    const [awayTeamName, setAwayTeamName] = React.useState(null);
    const [awayTeamStats, setAwayTeamStats] = React.useState(null);

    function handleHomeTeam(team) {
        setHomeTeamName(team.target.value);
    }
    function handleAwayTeam(team) {
        setAwayTeamName(team.target.value);
    }

    React.useEffect(() => {   
        async function getAllTeams() {
            let response = await fetch("/allTeamsList");
            response = await response.json();
            setTeams(response.data);
        }
        getAllTeams();
    }, []);

    if (!teams) return; //if api data hasnt loaded yet dont send component

    return (
        <div>
            <select onChange={handleHomeTeam}>
                <option key="Select Home Team" value="Select Home Team">Select Home Team</option>
                {teams.map((team) => <option key={team.Team} value={team.Team}>{team.Team}</option>)}
            </select>
            
            <select onChange={handleAwayTeam}>
                <option key="Select Away Team" value="Select Away Team">Select Away Team</option>
                {teams.map((team) => <option key={team.Team} value={team.Team}>{team.Team}</option>)}
            </select>
        </div>
    )
}
export default PredictGame;
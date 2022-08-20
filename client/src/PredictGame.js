import './App.css';
import React from "react";
import PredictionCalculation from './PredictionCalculation';

function PredictGame() {
    const [teams, setTeams] = React.useState(null);
    const [homeTeamName, setHomeTeamName] = React.useState(null);
    const [awayTeamName, setAwayTeamName] = React.useState(null);

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

    if (!teams) return <p>Loading...</p>; //if api data hasnt loaded yet dont send component

    return (
        <div>
            <select onChange={handleHomeTeam} class="dropdown">
                <option key="Select Home Team" value="Select Home Team">Select Home Team</option>
                {teams.map((team) => <option key={team.Team} value={team.Team}>{team.Team}</option>)}
            </select>
            <select onChange={handleAwayTeam} class="dropdown">
                <option key="Select Away Team" value="Select Away Team">Select Away Team</option>
                {teams.map((team) => <option key={team.Team} value={team.Team}>{team.Team}</option>)}
            </select>
            <PredictionCalculation homeTeam={homeTeamName} awayTeam={awayTeamName}/>
        </div>
    )
}
export default PredictGame;
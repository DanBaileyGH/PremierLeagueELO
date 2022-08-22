import './App.css';
import React from "react";
import SimulationCalculation from './SimulationCalculation';

function PredictGame() {
    const [teams, setTeams] = React.useState(null);
    const [homeTeamName, setHomeTeamName] = React.useState(null);
    const [awayTeamName, setAwayTeamName] = React.useState(null);
    const [homeScore, setHomeScore] = React.useState(null);
    const [awayScore, setAwayScore] = React.useState(null);

    function handleHomeTeam(team) {
        setHomeTeamName(team.target.value);
    }
    function handleAwayTeam(team) {
        setAwayTeamName(team.target.value);
    }
    function handleHomeScore(score) {
        setHomeScore(score.target.value);
    }
    function handleAwayScore(score) {
        setAwayScore(score.target.value);
    }

    React.useEffect(() => {   
        async function getAllTeams() {
            let response = await fetch("/sorted/Team");
            response = await response.json();
            setTeams(response.data.reverse());
        }
        getAllTeams();
    }, []);

    if (!teams) return <p>Loading...</p>;

    return (
        <div>
            <select onChange={handleHomeTeam} className="dropdown">
                <option key="Select Home Team" value="Select Home Team">Select Home Team</option>
                {teams.map((team) => <option key={team.Team} value={team.Team}>{team.Team}</option>)}
            </select>
            <select onChange={handleAwayTeam} className="dropdown">
                <option key="Select Away Team" value="Select Away Team">Select Away Team</option>
                {teams.map((team) => <option key={team.Team} value={team.Team}>{team.Team}</option>)}
            </select>
            <br />
            <select onChange={handleHomeScore} className="score-dropdown">
                <option key="Home Score" value="Home Score">Home Score</option>
                {Array(11).fill().map((option, index) => <option key={index} value={index}>{index}</option>) /*Populates the dropdown with options 1-10*/}
            </select>
            <select onChange={handleAwayScore} className="score-dropdown">
                <option key="Away Score" value="Away Score">Away Score</option>
                {Array(11).fill().map((option, index) => <option key={index} value={index}>{index}</option>)}
            </select>
            <SimulationCalculation homeTeam={homeTeamName} awayTeam={awayTeamName} homeScore={homeScore} awayScore={awayScore}/>
        </div>
    );
}
export default PredictGame;
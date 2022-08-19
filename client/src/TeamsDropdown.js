import './App.css';
import React from "react";
import TeamStats from './TeamStats';

function TeamsDropdown() {
    const [currentTeam, setCurrentTeam] = React.useState("Select Team");
    const [teams, setTeams] = React.useState(null);

    function handleTeam(team, index){
        setCurrentTeam(team.target.value);
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

    return(
        <div>
            <select onChange={handleTeam}>
                <option key="Select Team" value="Select Team">Select Team</option>
                {teams.map((team) => <option key={team.Team} value={team.Team}>{team.Team}</option>)}
            </select>
            <br />
            {(currentTeam && currentTeam !== "Select Team") ? currentTeam + " Team Stats" : "Select a Team"}
            <TeamStats team={currentTeam} />
        </div>
    );
}
export default TeamsDropdown;

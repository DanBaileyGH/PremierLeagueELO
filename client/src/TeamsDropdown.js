import './App.css';
import React from "react";

function TeamsDropdown() {
    const [currentTeam, setCurrentTeam] = React.useState(null);
    const [teams, setTeams] = React.useState(null);

    function handleTeam(team, index){
        setCurrentTeam(team.target.value);
    }

    React.useEffect(() => {   
        async function getAllTeams() {
            let response = await fetch("/allTeamsList");
            console.log(response);
            response = await response.json();
            console.log(response.data);
            console.log(response.data[0].Team);
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
            {currentTeam ? currentTeam : "Select a Team"}
        </div>
    );
}
export default TeamsDropdown;

import './App.css';
import React from "react";

function NewComponent() {
    const [teams, setTeams] = React.useState(null);

    React.useEffect(() => {   
        async function getAllTeams() {
            let response = await fetch("/allTeamsList");
            console.log(response);
            response = await response.json();
            console.log(response.data);
            console.log(response.data[0].Team);
            let teamParagraph = response.data.map((team, index) => 
                <li key={index}>
                    {team.Team} - {team.ELO.toFixed(2)}
                </li>
            );
            setTeams(teamParagraph);
        }
        getAllTeams();
    }, []);

    return(
        <p>{!teams ? "Loading..." : teams}</p>
    );
}
export default NewComponent;

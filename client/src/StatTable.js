import './App.css';
import React from "react";

function PredictGame() {
    const [sortingStat, setSortingStat] = React.useState("ELO");
    const [teams, setTeams] = React.useState(null);

    React.useEffect(() => {   
        async function getAllTeams() {
            let response = await fetch(`/sorted/ELO`);
            response = await response.json();
            setTeams(response.data);
        }
        getAllTeams();
    }, []);

    async function sortBy(stat) {
        if (stat === sortingStat) {
            reverseTable();
            return;
        }
        setSortingStat(stat);
        let response = await fetch(`/sorted/${stat}`);
        response = await response.json();
        setTeams(response.data);
    }

    async function reverseTable() {
        let teamsArray = [...teams]; //create new array instead of mutating old one to force re render
        let teamsReversed = await teamsArray.reverse();
        console.log(teamsReversed);
        setTeams(teamsReversed);
    }

    if (!teams) return <p>Loading...</p>; //if api data hasnt loaded yet dont send component

    return (
        <div>
            <h2>Sorted by {sortingStat}</h2> 
            <button onClick={reverseTable}>Reverse Order</button>
            <table>
                <tbody>
                    <tr>
                        <th>Position</th>
                        <th onClick={() => sortBy("Team")}>Team</th>
                        <th onClick={() => sortBy("ELO")}>Elo</th>
                        <th onClick={() => sortBy("Wins")}>Wins</th>
                        <th onClick={() => sortBy("Losses")}>Losses</th>
                        <th onClick={() => sortBy("Draws")}>Draws</th>
                        <th onClick={() => sortBy("GoalsFor")}>Goals Scored</th>
                        <th onClick={() => sortBy("GoalsAgainst")}>Goals Conceded</th>
                    </tr>
                    {teams.map((team, index) => <tr key={team.Team}>
                        <th>{index + 1}</th>
                        {Object.keys(team).map((stat) => <td key={stat}>{stat === "ELO" ? team[stat].toFixed(2) : team[stat]}</td>)}
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}
export default PredictGame;
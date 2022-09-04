import './App.css';
import React from "react";
import TeamStatsSelect from './TeamStatsSelect';
import PredictGame from './PredictGame';
import StatTable from './StatTable';
import SimulateGame from './SimulateGame';

function App() {
  const [page, setPage] = React.useState(null);

  function teamStatsClicked(){
    setPage("viewTeamStats")
  }
  function predictGameClicked(){
    setPage("viewPredictGame");
  }
  function statTableClicked(){
    setPage("viewStatTable");
  }
  function simulateGameClicked(){
    setPage("viewSimulateGame");
  }

  const topNavBar = (
    <div className="topnav">
      <button onClick={teamStatsClicked}>View a Team's Stats</button>
      <button onClick={predictGameClicked}>Predict a Game Result</button>
      <button onClick={statTableClicked}>View Full Stats Table</button>
      <button onClick={simulateGameClicked}>Simulate a Game</button>
    </div>
  );

  console.log(page);

  if (page === "viewTeamStats") {
    return (
      <div className="App">     
        <header className="App-header">
          {topNavBar}
          <h1> Full Team Stats </h1>
          <TeamStatsSelect />
        </header>
      </div>
    );
  } else if (page === "viewPredictGame"){
    return(
      <div className="App">     
        <header className="App-header">
          {topNavBar}
          <h1>Predict A Game</h1>
          <PredictGame />
        </header>
      </div>
    );
  } else if (page === "viewStatTable") {
    return(
      <div className="App">     
        <header className="App-header">
          {topNavBar}
          <br />
          <h1>Full League Table</h1>
          <StatTable />
        </header>
      </div>
    );
  } else if (page === "viewSimulateGame") {
    return(
      <div className="App">     
        <header className="App-header">
          {topNavBar}
          <h1>Simulate a Game</h1>
          <SimulateGame />
        </header>
      </div>
    );
  } else {
    return (
      <div className="app">
        <header className="App-header">
          {topNavBar}
          <h1>Home Page</h1>
        </header>
      </div>
    );
  }
}
export default App;


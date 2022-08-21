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

  const menuButtonGroup = (
    <div className="btn-group">
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
          {menuButtonGroup}
          <TeamStatsSelect />
        </header>
      </div>
    );
  } else if (page === "viewPredictGame"){
    return(
      <div className="App">     
        <header className="App-header">
          {menuButtonGroup}
          <PredictGame />
        </header>
      </div>
    );
  } else if (page === "viewStatTable") {
    return(
      <div className="App">     
        <header className="App-header">
          {menuButtonGroup}
          <StatTable />
        </header>
      </div>
    );
  } else if (page === "viewSimulateGame") {
    return(
      <div className="App">     
        <header className="App-header">
          {menuButtonGroup}
          <SimulateGame />
        </header>
      </div>
    );
  } else {
    return (
      <div className="app">
        <header className="App-header">
          <h1>Home Page</h1>
          {menuButtonGroup}
        </header>
      </div>
    );
  }
}
export default App;


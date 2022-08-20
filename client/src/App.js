import './App.css';
import React from "react";
import TeamStatsSelect from './TeamStatsSelect';
import PredictGame from './PredictGame';

function App() {
  const [page, setPage] = React.useState(null);

  function teamStatsClicked(){
    setPage("viewTeamStats")
  }
  function predictGameClicked(){
    setPage("viewPredictGame");
  }

  console.log(page);

  if (page === "viewTeamStats") {
    return (
      <div className="App">     
        <header className="App-header">
          <div class="btn-group">
            <button onClick={teamStatsClicked}>View a Team's Stats</button>
            <button onClick={predictGameClicked}>Predict a Game Result</button>
          </div>
          <TeamStatsSelect />
        </header>
      </div>
    );
  } else if (page === "viewPredictGame"){
    return(
      <div className="App">     
        <header className="App-header">
          <div class="btn-group">
            <button onClick={teamStatsClicked}>View a Team's Stats</button>
            <button onClick={predictGameClicked}>Predict a Game Result</button>
          </div>
          <PredictGame />
        </header>
      </div>
    )
  } else {
    return (
      <div className="app">
        <header className="App-header">
          <h1>Home Page</h1>
          <div class="btn-group">
            <button onClick={teamStatsClicked}>View a Team's Stats</button>
            <button onClick={predictGameClicked}>Predict a Game Result</button>
          </div>
        </header>
      </div>
    )
  }
}
export default App;


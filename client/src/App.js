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
          <button onClick={teamStatsClicked}>View A Team's Stats</button>
          <br></br>
          <button onClick={predictGameClicked}>Predict A Game Result</button>
          <br></br>
          <TeamStatsSelect />
        </header>
      </div>
    );
  } else if (page === "viewPredictGame"){
    return(
      <div className="App">     
        <header className="App-header">
          <button onClick={teamStatsClicked}>View A Team's Stats</button>
          <br></br>
          <button onClick={predictGameClicked}>Predict A Game Result</button>
          <br></br>
          <PredictGame />
        </header>
      </div>
    )
  } else {
    return (
      <div className="app">
        <header className="App-header">
          <h1>Home Page</h1>
          <button onClick={teamStatsClicked}>View A Team's Stats</button>
          <br></br>
          <button onClick={predictGameClicked}>Predict A Game Result</button>
          <br></br>
        </header>
      </div>
    )
  }
  
}
export default App;


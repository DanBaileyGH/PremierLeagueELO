import './App.css';
import React from "react";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {   
    async function getData() {
      let response = await fetch("/team/tottenham");
      response = await response.json();
      console.log(response.data);
      setData(response.data.Team);
    }
    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}
export default App;

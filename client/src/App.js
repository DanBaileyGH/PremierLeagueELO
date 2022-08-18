import './App.css';
import React from "react";
import NewComponent from './NewComponent';

function App() {
  const [data, setData] = React.useState(null);
  const [count, setCount] = React.useState(0);

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
        <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
        <NewComponent />
      </header>
    </div>
  );
}
export default App;


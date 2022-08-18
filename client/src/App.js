import './App.css';
import React from "react";
import TeamsDropdown from './TeamsDropdown';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
        <TeamsDropdown />
      </header>
    </div>
  );
}
export default App;


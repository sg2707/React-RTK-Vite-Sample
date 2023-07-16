import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LaunchesList from "./redux/components/launches/launch-list";

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Launch Info board</h1>
      <p className="read-the-docs">Click on the tile to learn more</p>
      <div className="card">
        <LaunchesList />
      </div>
    </>
  );
}

export default App;

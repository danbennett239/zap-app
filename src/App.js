import logo from './logo.svg';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';

function App() {
  const { location } = useGeoLocation();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lat: {location?.lat || "No value"}
          <br></br>
          Long: {location?.lng || "No value"}
        </a>
      </header>
    </div>
  );
}

export default App;

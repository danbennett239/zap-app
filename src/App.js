import logo from './logo.svg';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import SightingForm from './components/SightingForm'

function App() {
  const { location } = useGeoLocation();
  return (
    <div className="App">
      <SightingForm></SightingForm>
    </div>
  );
}

export default App;

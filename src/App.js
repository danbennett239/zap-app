import logo from './logo.svg';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import SightingForm from './components/SightingForm'
import ListView from './components/ListView/ListView';

function App() {
  const { location } = useGeoLocation();
  return (
    <div className="App">
      <ListView></ListView>
      <SightingForm></SightingForm>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import SightingForm from './components/SightingForm'
import ListView from './components/ListView/ListView';
import Home from './components/Home/Home';

function App() {
  const { location, locationError } = useGeoLocation();
  return (
    <div className="App">
      {/* <ListView></ListView> */}
      <SightingForm></SightingForm>
      {/* <Home></Home> */}
    </div>
  );
}

export default App;

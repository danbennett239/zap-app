import logo from './logo.svg';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import ListView from './components/ListView/ListView';
import Home from './components/Home/Home';
import Banner from './components/Banner/Banner';

function App() {
  const { location, locationError } = useGeoLocation();
  return (
    <div className="App">
      {/* <ListView></ListView> */}
      <Banner></Banner>
      <Home></Home>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import ListView from './components/ListView/ListView';
import Home from './components/Home/Home';
import Banner from './components/Banner/Banner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const { location, locationError } = useGeoLocation();
  return (
    <div className="App">
      <BrowserRouter>
        <Banner/>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
      {/* <ListView></ListView> */}
    </div>
  );
}

export default App;

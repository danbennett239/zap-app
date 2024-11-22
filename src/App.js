import logo from './logo.svg';
import './App.css';
import useGeoLocation from './hooks/useGeoLocation';
import ListView from './components/ListView/ListView';
import Home from './components/Home/Home';
import Banner from './components/Banner/Banner';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApiDocs from './components/ApiDocs/ApiDocs';

function App() {
  const { location, locationError } = useGeoLocation();
  return (
    <div className="App">
      <BrowserRouter>
        <Banner/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/api-docs" element={<ApiDocs />}/>
        </Routes>
      </BrowserRouter>
      {/* <ListView></ListView> */}
    </div>
  );
}

export default App;

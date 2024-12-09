import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import Banner from './components/Banner/Banner';
import ApiDocs from './components/ApiDocs/ApiDocs';
import AboutPangolins from './components/AboutPangolins/AboutPangolins';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Banner />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="about" element={<AboutPangolins />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

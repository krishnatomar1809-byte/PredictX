import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predictors from './pages/Predictors';
import HeartPredictor from './pages/HeartPredictor';
import DiabetesPredictor from './pages/DiabetesPredictor';
import BreastPredictor from './pages/BreastPredictor';
import LungPredictor from './pages/LungPredictor';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predictors" element={<Predictors />} />
            <Route path="/predictors/heart" element={<HeartPredictor />} />
            <Route path="/predictors/diabetes" element={<DiabetesPredictor />} />
            <Route path="/predictors/breast" element={<BreastPredictor />} />
            <Route path="/predictors/lung" element={<LungPredictor />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

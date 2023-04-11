import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import Verify from './components/verify';
import Upload from './components/upload';
import Details from './components/details';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route path="/verifyemail" element={<Verify />} />
      <Route path="/home" element={<Upload />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
}

export default App;

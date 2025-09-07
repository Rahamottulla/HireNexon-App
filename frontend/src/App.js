import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import CreateJob from "./pages/CreateJob";
import UpdateJob from "./pages/UpdateJob";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/update-job/:id" element={<UpdateJob />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


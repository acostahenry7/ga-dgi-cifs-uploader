import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login/Login";
import Summary from "./components/Summary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/test" element={<Summary />} />
          </Routes>
        </Router>
      </AuthProvider>

      {/* <div className="nav">
        <div className="nav-banner">
          <img src={LogoGA} width="50px" height="50" />
          <h3>GRUPO AVANT</h3>
        </div>

        <div className="menu"></div>
      </div> */}
    </div>
  );
}

export default App;

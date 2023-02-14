import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import CreateProfile from "./pages/CreateProfile";
import UpdateProfile from "./pages/UpdateProfile";
import Dashboard from "./pages/Dashboard";
import CreateForum from "./pages/CreateForum";
import Forum from "./pages/Forum";
import { Route, Routes } from "react-router-dom";
import "./styles/Home.css";

const App = () => {
  return (
    <div className="container">
      <div className="container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-forum" element={<CreateForum />} />
          <Route path="/forum/:id" element={<Forum />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ForgotPassword from "./components/auth/ForgotPassword";
import Home from "./components/app/Home";

function App() {
  return (
    <div className="App">
      <Routes
        element={
          <div>
            <h1>Layout</h1>
            <Outlet />
          </div>
        }
      >
        <Route path="/" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="reset" element={<ForgotPassword />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

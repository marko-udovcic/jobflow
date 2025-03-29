import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  const [message, setMessage] = useState("hello");

  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

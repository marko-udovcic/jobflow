import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [message, setMessage] = useState("Empty message");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <>
      <p>{message}</p>
    </>
  );
}

export default App;

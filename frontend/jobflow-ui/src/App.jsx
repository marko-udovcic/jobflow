import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/hello")
      .then((response) => {
        console.log("Axios response:", response.data);
        setMessage(response.data.message);
      })
      .catch((error) => console.error("Axios Error:", error));
  }, []);
  console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
  return (
    <div className="App">
      <header className="App-header">
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;

import React, {useState,useEffect} from 'react';
import Main from "./Containers/Main";
import Loader from "./Components/Loader/Loader";

function App() {

  const styles = {
    height: "100vh",
  }

  const [completed, setCompleted] = useState(false);

   useEffect(() => {
    setTimeout(() => {
      setCompleted(true);
    }, 1500);
  });

  return (
    <div style={styles}>
    {completed ? <Main /> : <Loader />}
    </div>
  );
}

export default App;

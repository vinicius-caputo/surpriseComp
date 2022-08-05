import "./App.css";
import { useEffect, useState } from "react";


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  

  function getRandomIntX() {
    let min = Math.ceil(0);
    let max = Math.floor(windowSize.innerWidth);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomIntY() {
    let min = Math.ceil(0);
    let max = Math.floor(windowSize.innerHeight);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const [action, setAction] = useState(0);
  const [globalCoords, setGlobalCoords] = useState({ x: getRandomIntX(), y: getRandomIntY() });

  
  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = (event) => {

      setGlobalCoords({
        x: event.pageX ,
        y: event.pageY ,
      });
    };
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);
    window.addEventListener("mousemove", handleWindowMouseMove);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

 

  return (
    <div className="App" >
      <div className="fundo">
        <div className="nav-bar"></div>
        <div
          className="pomo"
          style={{ top: globalCoords.y , left: globalCoords.x }}
        ></div>

        <h2>
          Global coords: {globalCoords.x} {globalCoords.y}
        </h2>
      </div>

      {action === 0 && (
        <div className="modal-apresentacao">
          <h1 className="titulo"> Eai Trainee!!! Ansioso Pelo resultado? </h1>
          <p className="paragrafo">
            {" "}
            Antes de tudo, vamos jogar quadribol? <br /> Se você conseguir pegar
            o <span className="gold">pomo de ouro</span> te conto se passou ou
            não!{" "}
          </p>
          <div className="botao" onClick={() => setAction(1)}> Começar </div>
        </div>
      )}
    </div>
  );
}




export default App;

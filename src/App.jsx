import "./App.css";
import { useEffect, useState } from "react";
import pomocap from "./pomocap.gif";

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [count, setcount] = useState(0);

  function getRandomIntX() {
    let min = globalCoords.x - 70;
    if (min < 100) {
      min = 100;
    }
    let max = Math.floor(globalCoords.x + 70);
    if (max > windowSize.innerWidth - 100) {
      max = windowSize.innerWidth - 100;
    }
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomIntY() {
    let min = globalCoords.y - 70;
    if (min < 100) {
      min = 100;
    }
    let max = Math.floor(globalCoords.y + 70);
    if (max > windowSize.innerHeight - 100) {
      max = windowSize.innerHeight - 100;
    }
    return Math.floor(Math.random() * (max - min) + min);
  }

  const [action, setAction] = useState(0);
  const [globalCoords, setGlobalCoords] = useState({ x: (windowSize.innerWidth/2), y: (windowSize.innerHeight/2) });

  useEffect(() => {
    // 👇️ get global mouse coordinates
    // const handleWindowMouseMove = (event) => {
    //  setGlobalCoords({
    //     x: event.pageX + 50,
    //     y: event.pageY + 50,
    //   });
    // };
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    // window.addEventListener("mousemove", handleWindowMouseMove);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      // window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, []);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setcount((count) => count + 10);
      setGlobalCoords({
        x: getRandomIntX(),
        y: getRandomIntY(),
      });
    }, 70);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="App">
      <div className="fundo">
       
        {action === 1 && (
          <div
            className="pomo"
            onClick={() => setAction(2)}
            style={{ top: globalCoords.y, left: globalCoords.x }}
          ></div>
        )}
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
          <div className="botao" onClick={() => setAction(1)}>
            {" "}
            Começar{" "}
          </div>
        </div>
      )}

      {action === 2 && (
        <div className="modal-apresentacao">
          <img src={pomocap} alt="alo" className="pomocap" width="400" />
          <p className="paragrafo">
            {" "}
            Foi um longo caminho até aqui nao é, desde nossa primeira mensagem,{" "}
            <br />
            você passou por muitos desafios e evoloui demais, <br />
            e tenho certeza que crescera muito mais aqui dentro. <br />
            Agora é hora de anunciar seu <span className="gold">
              INCRIVEL{" "}
            </span>{" "}
            resultado. <br />
          </p>
          <h1 className="titulo ">
            {" "}
            PARABENS! VOCE É O MAIS NOVO MEMBRO <br />{" "}
            <span className="gold">COMP JUNIOR !!!</span>{" "}
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;

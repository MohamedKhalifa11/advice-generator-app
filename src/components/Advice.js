import { useEffect, useRef, useState } from "react";
import "./advice.css";
import dice from "../images/icon-dice.svg";
import dividerDesktop from "../images/pattern-divider-desktop.svg";
import dividerMob from "../images/pattern-divider-mobile.svg";

function Advice() {
  const [advice, setAdvice] = useState("");
  const [adviceID, setAdviceID] = useState();
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted.current) {
      fetchAdvice();
      isMounted.current = false;
    }
  }, []);

  const fetchAdvice = () => {
    const RandomNum = Math.floor(Math.random() * 224) + 1;
    fetch(`https://api.adviceslip.com/advice/${RandomNum}`)
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice);
        setAdviceID(data.slip.id);
      })
      .catch((error) => {
        console.error("Error fetching advice:", error);
      });
  };

  return (
    <>
      <div className="advice-container">
        <h2>Advice #{adviceID}</h2>
        <p>“{advice}”</p>
        <img
          className="divider-desktop break"
          src={dividerDesktop}
          alt="divider"
        />
        <img className="divider-mobile break" src={dividerMob} alt="divider" />
        <button onClick={fetchAdvice}>
          <img src={dice} alt="dice" />
        </button>
      </div>
    </>
  );
}

export default Advice;

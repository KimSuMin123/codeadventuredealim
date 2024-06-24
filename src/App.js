import "./App.css";
import React, { useState, useEffect } from "react";
import Start from "./pages/Start";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Stage from "./pages/stage";
import Quiz from "./pages/Quiz";
import Language from "./pages/Language";
import Shop from "./pages/Shop";
import Manager from "./pages/Manager";
import MyPage from "./pages/Mypage";
import Prolog from "./pages/Prolog";
import CssStart from "./pages/cssst/CssStart";
import CStart from "./pages/cst/CStart";
import JavaStart from "./pages/javast/JavaStart";
import JsStart from "./pages/jsst/JsStart";
import PythonStart from "./pages/pythonst/PythonStart";
import HtmlStart from "./pages/htmlst/HtmrStart";

function App() {
  const [mode, setMode] = useState("START");
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    fetch(
      "https://port-0-codeadventuredealim-1lxb7tkdw.sel5.cloudtype.app/authcheck"
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === "True") {
          setMode("LANGUAGE");
        } else if (mode !== "START" && mode !== "LOGIN") {
          setMode("LOGIN");
        }
      });
  }, []);

  let content = null;

  if (mode === "START") {
    content = <Start setMode={setMode}></Start>;
  } else if (mode === "LOGIN") {
    content = <Login setMode={setMode}></Login>;
  } else if (mode === "SIGNIN") {
    content = <Signin setMode={setMode}></Signin>;
  } else if (mode === "MYPAGE") {
    content = <MyPage setMode={setMode}></MyPage>;
  } else if (mode === "LANGUAGE") {
    content = (
      <Language
        setMode={setMode}
        setSelectedLanguage={setSelectedLanguage}
      ></Language>
    );
  } else if (mode === "STAGE") {
    content = (
      <Stage
        setMode={setMode}
        setSelectedStage={setSelectedStage}
        selectedLanguage={selectedLanguage}
      ></Stage>
    );
  } else if (mode === "QUIZ") {
    content = (
      <Quiz
        stageId={selectedStage}
        setMode={setMode}
        selectedLanguage={selectedLanguage}
      ></Quiz>
    );
  } else if (mode === "SHOP") {
    content = <Shop setMode={setMode}></Shop>;
  } else if (mode === "MANAGER") {
    content = <Manager setMode={setMode}></Manager>;
  } else if (mode === "PROLOG") {
    content = <Prolog setMode={setMode}></Prolog>;
  } else if (mode === "CSTART") {
    content = <CStart setMode={setMode}></CStart>;
  } else if (mode === "CSSSTART") {
    content = <CssStart setMode={setMode}></CssStart>;
  } else if (mode === "JAVASTART") {
    content = <JavaStart setMode={setMode}></JavaStart>;
  } else if (mode === "JSSTART") {
    content = <JsStart setMode={setMode}></JsStart>;
  } else if (mode === "PYTHONSTART") {
    content = <PythonStart setMode={setMode}></PythonStart>;
  } else if (mode === "HTMLSTART") {
    content = <HtmlStart setMode={setMode}></HtmlStart>;
  }
  return (
    <>
      <div className="background">{content}</div>
    </>
  );
}

export default App;

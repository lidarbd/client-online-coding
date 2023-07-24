import "./Lobby.css";
import io from 'socket.io-client';
import { useState , useEffect } from "react";
import CodeBlock from "./CodeBlock";

const socket = io.connect("http://localhost:3001");

function Lobby() {
  const [codeBlockName, setCodeBlockName] = useState("");
  const [initialCode, setInitialCode] = useState("");
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  const [isMentor, setIsMentor] = useState(true);
  const [solution, setSolution] = useState("");

  const chooseCodeBlock = (name) => {
    if(codeBlockName === "")
    {
        setCodeBlockName(name);
        socket.emit("choose_codeBlock", name);
        setShowCodeBlock(true);
        
        switch(name)
        {
            case "Print":
                setInitialCode(`function print_current_page()
                {
                    Print current page.
                }`);
                setSolution(`function print_current_page()
                {
                    window.print();
                }`);
                break;
            case "Date & Time":
                setInitialCode(`<div id="editor">
                <p>Display current date and time.</p>
            </div>/`);
                setSolution(`<div id="editor">
                <p>console.log(
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes());</p>
                </div>/`);
                break;
            case "Hello World In HTML":
                setInitialCode(`<html>
                Display Hello World in HTML
             </html>`);
             setSolution(`<html>
             <head><title>Hello world</title></head>
          </html>`);
                break;
            case "Is Palindrome":
                setInitialCode(`function palindrome(str) {
                    Check if the string is palindrome.
                }`);
                setSolution(`function palindrome(str) {
                    var lowRegStr = str.toLowerCase().replace(re, '');
                    var reverseStr = lowRegStr.split('').reverse().join(''); 
                     
                    return reverseStr === lowRegStr;
                  }`);
                break;
        }
    }
  };

  useEffect(() => {
    socket.on("mentor_present", (value) => {
        setIsMentor(value);
      });
})

  return (
    <div className="Lobby">
      {!showCodeBlock ? (
      <div className="chooseCodeBlock">
      <h3>Choose Code Block</h3>
      <button onClick={() => chooseCodeBlock("Print")}>Print</button>
      <button onClick={() => chooseCodeBlock("Date & Time")}>Date & Time</button>
      <button onClick={() => chooseCodeBlock("Hello World In HTML")}>Hello World</button>
      <button onClick={() => chooseCodeBlock("Is Palindrome")}>Is Palindrome</button>
    </div>
  ) : (
    <CodeBlock socket={socket} codeBlockName={codeBlockName} isMentor={isMentor} initialCode={initialCode} solution={solution}/>
  )}
  </div>
  );
}

export default Lobby;

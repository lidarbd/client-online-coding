import React, { useMemo, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'

function CodeBlock({socket, codeBlockName, isMentor, initialCode, solution}) {
    const [currentCode, setCurrentCode] = useState(initialCode);
    const [outputCode, setOutputCode] = useState(initialCode);
    const [showSimley, setShowSimley] = useState(false);

    const uplodeCode = async (data) => {
        setCurrentCode(data);
        if(!isMentor && data !== "")
        {
            const codeData = {
              codeBlockName: codeBlockName,
              userCode: data,   
            };

            await socket.emit("student_code_change", codeData);
        }
    };

    const checkSolution = () => {
       if(currentCode === solution)
           {
            setShowSimley(true);
           }
    }

    useMemo(() => {
        socket.on("mentor_code_change", (data) => {
            setOutputCode(data);
          });

    }, [socket]);

  return (
    <div className="code-window">
       <div className="code-header">
        <p>{codeBlockName}</p>
       </div>
       <div className="code-container">
        <ScrollToBottom className="container">
            { !isMentor ? ( 
                    <div className="code-editing">
                        { !showSimley ? (
                        <textarea id="input" 
                            type="text"
                            value={currentCode}
                            placeholder="Type your code here..."
                            onChange={(event) => {
                              uplodeCode(event.target.value);
                           }}
                        />
                        ) : (
                        <textarea id="smileyFace" 
                        value=""
                        readOnly={true}
                    />
                    )}
                    </div>
                    ) : (   
                <textarea id="output"
                    type="text"
                    value={outputCode}
                    readOnly={true}
                />
               )}
        </ScrollToBottom>
       </div>
       { !isMentor && !showSimley && (
                    <div className="code-footer">
                        <button onClick={checkSolution}>SUBMIT</button>
                    </div>
       )}
    </div>
    );
}

export default CodeBlock;
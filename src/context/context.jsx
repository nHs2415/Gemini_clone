import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); /*state variable.use to input data*/
    const [recentPrompt,setRecentPromt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resulData,SetResultData] = useState("");

    const delayPara = (index,nextWord)=>{
        setTimeout(function (){
            SetResultData(prev=>prev+nextWord);
        },75*index)
    }

    const onSent = async (prompt) => {

        SetResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPromt(input)
        const response = await run(input)
        let responseArray = response.split("**");
        let newResponse ;
        for(let i = 0; i < responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            }
            else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i = 0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+ " ")
        }
        setLoading(false)
        setInput("")
    }

    /*onSent("What is react js")*/

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPromt,
        recentPrompt,
        showResult,
        loading,
        resulData,
        input,
        setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider
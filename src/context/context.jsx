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

    const onSent = async (prompt) => {

        SetResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPromt(input)
        const response = await run(input)
        SetResultData(response)
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
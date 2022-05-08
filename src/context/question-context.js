import React, { useState } from 'react';

const QuestionContext = React.createContext()

export const QuestionProvider = props => {
    const [questions, setQuestions] = useState([{"name": "Question"}])

    return (
        <QuestionContext.Provider value={[questions, setQuestions]}>
            {props.childern}
        </QuestionContext.Provider>
    )
}

export default QuestionContext
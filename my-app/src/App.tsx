/* eslint-disable @typescript-eslint/no-explicit-any */
import './Styles/app.css'
import logo from "./assets/quiz-logo.png"
import { QuestionsState , Data } from './API'
import { useState } from "react"
import QuestionCard from './components/QuestionCard'



export type UserState = {
  question : string,
  answer : string,
  correct : boolean,
  correctAnswer : string
}

const totalQues = 10;

const App = () => {

  const[loading , setLoading] = useState<boolean>(false)
  const[data , setData] = useState<QuestionsState[]>([])
  const[gameOver , setgameOver] = useState<boolean>(true)
  const[score , setScore] = useState<number>(0)
  const[userAnswers , setUserAnswer] = useState<UserState[]>([])
  const[num , setNum] = useState<number>(0)
  const[start,setStart] = useState<boolean>(false)

  const startTrivia = async() => {
    setStart(true)
    setLoading(true)
    setgameOver(false)
    const newData = await Data()
    setData(newData)
    setNum(0)
    setScore(0)
    setUserAnswer([])
    setLoading(false)
  }
 
  const ceckAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    
    if(!gameOver){
      // userAnswer
      const answer = e.currentTarget.value;

      //check if the userAnser is true or false
      const correct = data[num].correct_answer === answer

      const userAnsObj = {
        question : data[num].question,
        answer ,
        correct ,
        correctAnswer : data[num].correct_answer
      }
  
      setUserAnswer(prev => [...prev , userAnsObj])

      if(correct) {
        setScore(prev => prev + 1)
        e.currentTarget.style.background = 'linear-gradient(90deg, #56FFA4, #59BC86)'
      }else{
        e.currentTarget.style.background = 'linear-gradient(90deg,#FF5656,#C16868)'
        const correctButton = document.querySelector(`button[value="${data[num].correct_answer}"]`);
        if (correctButton) {
        correctButton.style.background = 'linear-gradient(90deg, #56FFA4, #59BC86)';
      }
         
      }

      
    }
    
  }

  const nextQues = () => {
    const next = num + 1

    if(next === totalQues){
      setgameOver(true)
    }else{
      setNum(next)
    }
  }
 
  
  return (
    <div className='container'>
        <div className="pic">
            <img src={logo} alt="pic" />
        </div>

        {
          gameOver || userAnswers.length === totalQues  ?  <button className='btn' onClick={startTrivia}>start</button> : null
        }

        {
          !gameOver ? <p className='score'>score : {score}</p> : null
        }

        {
          loading ? <p className='loading'>loading...</p> : null
        }

        {
          !loading && !gameOver && 
            <QuestionCard
              Ques = {data[num].question}
              answers = {data[num].allAnswers}
              total = {totalQues}
              QuestionNum = {num + 1}
              callBack = {ceckAnswer}
              userAns = {userAnswers ? userAnswers[num] : undefined}
            /> 
        }   

        {
         !loading  && !gameOver &&  userAnswers.length === num + 1 && num !== totalQues - 1 &&
          <button className='next' onClick={nextQues}>
            Next Question
          </button>
        }

    </div>
  )
}

export default App

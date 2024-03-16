import { UserState } from "../App" 
 
 type Props = {
  Ques : string,
  answers : string[],
  total : number,
  QuestionNum : number,
  userAns : UserState | undefined,
  callBack : (e:React.MouseEvent<HTMLButtonElement>) => void 
}


export default function QuestionCard(props : Props) {



  return (
    <div className="cart">
        <p className="question-num">Question:{props.QuestionNum}/{props.total}</p>

        <p className="question">{props.Ques}</p>

        <div className="answers-container">
          {
            props.answers.map(answer => {
              return(
              <button 
                key={answer} 
                value={answer}
                disabled = {props.userAns ? true : false}
                onClick={props.callBack}
                >
                  {answer}
              </button>
              )
            })
          }
        </div>
    </div>
    
  )
}

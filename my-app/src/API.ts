import { shuffleArray } from './Utilis';

export type Question = {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export type QuestionsState = Question & {allAnswers : string[]}

export const Data = async() => {
    const fetData = await(await fetch("https://opentdb.com/api.php?amount=10&type=multiple")).json();
    const results = fetData.results
    const dataWithAllAnswer = results.map((result: Question) => {
        return {
            ...result,
            allAnswers : shuffleArray([...result.incorrect_answers , result.correct_answer])
        }
    }) 
    return dataWithAllAnswer; 
}
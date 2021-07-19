import { createReducer, on, Store } from "@ngrx/store";
import { question } from "./interfaces/types/question.interface";

import * as requestsActions from './requests.actions'

export interface stateHere {
    allQuestions: question[]
}

const initState: stateHere = {
    allQuestions: []
}

export const questionsReducer = createReducer(
    initState,
    on(requestsActions.SetQuestions,
        (state, action) => {

            let shuffledAnswers = [...action.payload]
            let finalQuestions: question[] = [];

            shuffledAnswers.forEach((el, i) => {

                let correctAnswer = el.correct_answer;
                let incorrectAnswers = el.incorrect_answers;
                let allAnswers: string[] = [];

                allAnswers.push(correctAnswer);
                allAnswers.push(...incorrectAnswers)
                allAnswers = allAnswers.sort(() => Math.random() - 0.5);

                const completeQuestion = new question(
                    el.category,
                    el.correct_answer,
                    el.difficulty,
                    el.incorrect_answers,
                    el.question,
                    el.type,
                    allAnswers
                )

                shuffledAnswers[i]

                finalQuestions.push(completeQuestion);
            });

            return {
                ...state,
                allQuestions: [...finalQuestions]
            }
        })
)
import { createAction, props } from "@ngrx/store"
import { question } from "./interfaces/types/question.interface"

export const SET_QUESTIONS = '[requests] Set Questions'
export const GET_QUESTIONS = '[requests] Get Questions'


export const GetQuestions = createAction(
    GET_QUESTIONS,
    props<{
        id?: number | '',
        difficulty?: string,
        questionType?: string
    }>()
)

export const SetQuestions = createAction(
    SET_QUESTIONS,
    props<{
        payload: question[]
    }>()
)
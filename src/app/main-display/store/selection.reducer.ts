import { createReducer, on } from "@ngrx/store"

import * as selectionActions from './selection.actions'

export interface stateHere {
    categoryId: number | '',
    difficulty: string,
    type: string,
    quizMode: boolean,
    score: number
}

const initState: stateHere = {
    categoryId: '',
    difficulty: '',
    type: '',
    quizMode: false,
    score: 0
}

export const selectionReducer = createReducer(
    initState,
    on(selectionActions.UpdateSelection,
        (state, action) => {
            return {
                ...state,
                categoryId: action.payload.id,
                difficulty: action.payload.difficulty,
                type: action.payload.type,
            }
        }),
    on(selectionActions.ToggleModes, (state) => {
        return {
            ...state,
            quizMode: !state.quizMode
        }
    }),
    on(selectionActions.AddPoint,
        (state) => {
            return {
                ...state,
                score: state.score + 1
            }
        }),
    on(selectionActions.ResetData,
        (state) => {
            return {
                ...state,
                categoryId: '',
                difficulty: '',
                type: '',
                quizMode: false,
                score: 0
            }
        })
)
import { ActionReducerMap } from '@ngrx/store'
import * as questions from './shared/store/requests.reducer'
import * as selection from './main-display/store/selection.reducer'

export interface AppState {
    questions: questions.stateHere,
    selection: selection.stateHere
}

export const AppReducer: ActionReducerMap<AppState> = {
    questions: questions.questionsReducer,
    selection: selection.selectionReducer
}
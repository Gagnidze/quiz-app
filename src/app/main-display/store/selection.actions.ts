import { createAction, props } from "@ngrx/store";

export const UPDATE_SELECTION = '[selection] Update Selection'
export const TOGGLE_MODES = '[selection] Toggle Modes'
export const ADD_POINT = '[selection] Add Point'
export const RESET_DATA = '[selection] Reset Data'


export const UpdateSelection = createAction(
    UPDATE_SELECTION,
    props<{
        payload: {
            id?: number | '',
            difficulty?: string,
            type?: string
        }
    }>()
)

export const ToggleModes = createAction(
    TOGGLE_MODES
)

export const AddPoint = createAction(
    ADD_POINT
)

export const ResetData = createAction(
    RESET_DATA
)
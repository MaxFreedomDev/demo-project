
export interface InitialStateAuthType {
    user: string | null,
    error: string | null
}

export enum AuthActionTypes {
    SET_USER="SET_USER",
    SET_ERROR = "SET_ERROR"
}

interface SetUserAction {
    type: AuthActionTypes.SET_USER,
    payload: string
}
interface SetErrorAction {
    type: AuthActionTypes.SET_ERROR,
    payload: string
}

export type AuthAction = SetUserAction | SetErrorAction
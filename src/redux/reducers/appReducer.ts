import { authMe } from "./authReducer"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
    
        default:
            return state
    }
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {
    dispatch(authMe()).then(() => {
        dispatch(initializedSuccess())
    })
}


export default appReducer
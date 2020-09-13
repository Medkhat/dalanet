import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import profileReducer from "./reducers/profileReducer"
import dialogsReducer from "./reducers/dialogsReducer"
import usersReducer from "./reducers/usersReducer"
import authReducer from "./reducers/authReducer"
import ThunkMiddleware from "redux-thunk"
import {reducer as formReducer} from "redux-form"
import appReducer from "./reducers/appReducer"

let reducers = combineReducers({
    profileReducer,
    dialogsReducer,
    usersReducer,
    authReducer,
    form: formReducer,
    appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));

export default store
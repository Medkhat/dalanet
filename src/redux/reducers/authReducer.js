import { authMeAPI, securityAPI } from "../../api/api"
import { stopSubmit } from "redux-form"

const SET_USER_DATA = 'auth/SET_USER_DATA' // Redux-ducks осылай жазуды ұсынады
const SET_CAPTCHA = 'auth/SET_CAPTCHA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_CAPTCHA:
            return {
                ...state,
                captcha: action.captchaUrl
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {
        userId, email, login, isAuth
    }
})

export const setCaptcha = (captchaUrl) => ({
    type: SET_CAPTCHA,
    captchaUrl
})

export const authMe = () => {
    return async (dispatch) => {
        let response = await authMeAPI.authMe()
        if (response.resultCode === 0) {
            let { id, email, login } = response.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
    
        let response = await authMeAPI.login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            dispatch(authMe())
        } else if(response.data.resultCode === 10){
            dispatch(getCaptchaUrl())
        } else {
            let msg = response.data.messages.length > 0 ? response.data.messages[0] : "Some error!"
            dispatch(stopSubmit('login', {_error: msg}))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await authMeAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        let response = await securityAPI.getCaptchaUrl();
        dispatch(setCaptcha(response.data.url))
    }
}

export default authReducer
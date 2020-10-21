import { stopSubmit } from "redux-form"
import { usersAPI, profileAPI } from "../../api/api"
import { photosType, PostsType, userProfileType } from "../../types/types"

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SET_AVA = 'SET_AVA'

let initialState = {
    posts: [
        {id: 1, text: "Hi, this is my first social network with react", likesCount: 123},
        {id: 2, text: "Hello Hello Helloo", likesCount: 23},
        {id: 3, text: "You are signed in now and can close this page.", likesCount: 432},
        {id: 4, text: "Text text text", likesCount: 0},
    ] as Array<PostsType>,
    userProfile: null as userProfileType | null,
    isFetching: false,
    status: ""
}
export type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                text: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }
        case TOGGLE_PRELOADER:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.postId)
            }
        case SET_AVA:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile, 
                    photos: {...action.photo}
                }
            }
        default:
            return state
    }
}

//Action Creators
type addPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
type setUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    userProfile: userProfileType
}
type togglePreloaderActionType = {
    type: typeof TOGGLE_PRELOADER,
    isFetching: boolean
}
type setStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
type deletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}
type setAvaActionType = {
    type: typeof SET_AVA,
    photo: photosType
}
export const addPost = (newPostText: string): addPostActionType => ({type: ADD_POST, newPostText})
export const setUserProfile = (userProfile: userProfileType): setUserProfileActionType => ({ type: SET_USER_PROFILE, userProfile })
export const togglePreloader = (isFetching: boolean): togglePreloaderActionType => ({ type: TOGGLE_PRELOADER, isFetching })
export const setStatus = (status: string): setStatusActionType => ({ type: SET_STATUS, status })
export const deletePost = (postId: number): deletePostActionType => ({ type: DELETE_POST, postId })
export const setAva = (photo: photosType): setAvaActionType => ({type: SET_AVA, photo})


// REDUX THUNK FUNCTIONS
export const getProfile = (userId: number) => {
    return (dispatch: any) => {
        dispatch(togglePreloader(true))
        usersAPI.getProfile(userId).then((data: any) => {
            dispatch(togglePreloader(false))
            dispatch(setUserProfile(data))
        })
    }
}

export const getStatus = (userId: number) => {
    return (dispatch: any) => {
        profileAPI.getStatus(userId)
            .then((response: any) => {
                dispatch(setStatus(response.data))
            })
    }
}

export const updateStatus = (status: string) => {
    return async (dispatch: any) => {
        try { // error handling
            let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const saveAva = (photo: string) => {
    return async (dispatch: any) => {
        let response = await profileAPI.saveAva(photo)
        if (response.data.resultCode === 0)
            dispatch(setAva(response.data.data.photos))
    }
}

export const saveProfile = (profileData: userProfileType) => {
    return async (dispatch: any, getState: any) => {
        let response = await profileAPI.saveProfile(profileData)
        if (response.data.resultCode === 0) {
            dispatch(getProfile(getState().authReducer.userId))
        } else  {
            dispatch(stopSubmit("editProfile", {_error: response.data.messages[0]}))
            return Promise.reject(response.data.messages[0])
        }
    }
}

export default profileReducer
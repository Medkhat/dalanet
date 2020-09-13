import { usersAPI, profileAPI } from "../../api/api"

const ADD_POST = 'ADD_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    posts: [
        {id: 1, text: "Hi, this is my first social network with react", likesCount: 123},
        {id: 2, text: "Hello Hello Helloo", likesCount: 23},
        {id: 3, text: "You are signed in now and can close this page.", likesCount: 432},
        {id: 4, text: "Text text text", likesCount: 0},
    ],
    userProfile: null,
    isFetching: false,
    status: ""
}

const profileReducer = (state = initialState, action) => {
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
        default:
            return state
    }
}

//Action Creators
export const addPost = (newPostText) => ({type: ADD_POST, newPostText})
export const setUserProfile = (userProfile) => ({ type: SET_USER_PROFILE, userProfile })
export const togglePreloader = (isFetching) => ({ type: TOGGLE_PRELOADER, isFetching })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })


// REDUX THUNK FUNCTIONS
export const getProfile = (userId) => {
    return (dispatch) => {
        dispatch(togglePreloader(true))
        usersAPI.getProfile(userId).then(data => {
            dispatch(togglePreloader(false))
            dispatch(setUserProfile(data))
        })
    }
}

export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data))
            })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}

export default profileReducer
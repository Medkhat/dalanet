import { usersAPI } from '../../api/api'
import { updateObjectInArray } from '../../utils/object-helpers'

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_PRELOADER = 'TOGGLE_PRELOADER'
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }    
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }      
        case SET_USERS:
            return {
                ...state,
                users: [ ...action.users]
            }      
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_PRELOADER:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.inProgress 
                    ? [...state.followingInProgress, action.userId] 
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}


//Action Creators

export const follow = (userId) => ({
    type: FOLLOW,
    userId
})
export const unFollow = (userId) => ({
    type: UNFOLLOW,
    userId
})
export const setUsers = (users) => ({
    type: SET_USERS,
    users
})
export const setCurrentPage = (page) => ({
    type: SET_CURRENT_PAGE,
    page
})
export const setTotalUsersCount = (count) => ({
    type: SET_TOTAL_USERS_COUNT,
    count
})
export const togglePreloader = (isFetching) => ({
    type: TOGGLE_PRELOADER,
    isFetching
})
export const toggleFollowingInProgress = (inProgress, userId) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    inProgress,
    userId
})


// REDUX THUNK FUNCTIONS

export const requestUsers= (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(togglePreloader(true))

        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(togglePreloader(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

export const getUsersPart = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(togglePreloader(true))
        dispatch(setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(togglePreloader(false))
        dispatch(setUsers(data.items))
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId))

    let data = await apiMethod(userId)
    if (data.resultCode === 0) 
        dispatch(actionCreator(userId)) 
    dispatch(toggleFollowingInProgress(false, userId))
}

export const followRequest = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.postFollow.bind(usersAPI), follow)
    }
}

export const unFollowRequest = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.postUnFollow.bind(usersAPI), unFollow)
    }
}

export default usersReducer;
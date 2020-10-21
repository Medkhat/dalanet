import { usersAPI } from "../../api/api";
import { usersType } from "../../types/types";
import { updateObjectInArray } from "../../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_PRELOADER = "TOGGLE_PRELOADER";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [] as Array<usersType>,
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: true,
                }),
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {
                    followed: false,
                }),
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page,
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count,
            };
        case TOGGLE_PRELOADER:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.inProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(
                          (id) => id !== action.userId
                      ),
            };
        default:
            return state;
    }
};

//Action Creators
type followActionType = {
    type: typeof FOLLOW,
    userId: number
}
type unFollowActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
type setUsersActionType = {
    type: typeof SET_USERS,
    users: Array<usersType>
}
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    page: number
}
type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    count: number
}
type togglePreloaderActionType = {
    type: typeof TOGGLE_PRELOADER,
    isFetching: boolean
}
type toggleFollowingInProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS,
    inProgress: boolean,
    userId: number
}
export const follow = (userId: number): followActionType => ({
    type: FOLLOW,
    userId,
});
export const unFollow = (userId: number): unFollowActionType => ({
    type: UNFOLLOW,
    userId,
});
export const setUsers = (users: Array<usersType>): setUsersActionType => ({
    type: SET_USERS,
    users,
});
export const setCurrentPage = (page: number): setCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    page,
});
export const setTotalUsersCount = (count: number): setTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    count,
});
export const togglePreloader = (isFetching: boolean): togglePreloaderActionType => ({
    type: TOGGLE_PRELOADER,
    isFetching,
});
export const toggleFollowingInProgress = (inProgress: boolean, userId: number): toggleFollowingInProgressActionType => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    inProgress,
    userId,
});

// REDUX THUNK FUNCTIONS

export const requestUsers = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(togglePreloader(true));

        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(togglePreloader(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    };
};

export const getUsersPart = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(togglePreloader(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(togglePreloader(false));
        dispatch(setUsers(data.items));
    };
};

const followUnfollowFlow = async (
    dispatch: any,
    userId: number,
    apiMethod: any,
    actionCreator: any
) => {
    dispatch(toggleFollowingInProgress(true, userId));

    let data = await apiMethod(userId);
    if (data.resultCode === 0) dispatch(actionCreator(userId));
    dispatch(toggleFollowingInProgress(false, userId));
};

export const followRequest = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.postFollow.bind(usersAPI),
            follow
        );
    };
};

export const unFollowRequest = (userId: number) => {
    return async (dispatch: any) => {
        followUnfollowFlow(
            dispatch,
            userId,
            usersAPI.postUnFollow.bind(usersAPI),
            unFollow
        );
    };
};

export default usersReducer;

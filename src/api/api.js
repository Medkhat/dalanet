import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "eaced5e2-ed26-4c5f-898a-2ecc0d3493f4"
    }
})

export const usersAPI = {
    getUsers (currentPage, pageSize) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    postFollow (userId) {
        return instance.post(`/follow/${userId}`)
            .then(response => response.data)
    },
    postUnFollow (userId) {
        return instance.delete(`/follow/${userId}`)
            .then(response => response.data)
    },
    getProfile (userId) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile (userId) {
        return instance.get(`/profile/${userId}`)
            .then(response => {
                return response.data
            })
    },
    getStatus (userId) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus (status) {
        return instance.put(`/profile/status`, {status})
    }
}

export const authMeAPI = {
    authMe () {
        return instance.get(`/auth/me`)
            .then(response => response.data)
    },
    login(email, password, rememberMe = false) {
        return instance.post('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('/auth/login')
    },
}
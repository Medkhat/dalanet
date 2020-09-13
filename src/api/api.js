import * as axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "ed0af410-06c2-4ba9-982c-edc89ef486cc"
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
    },
    saveAva (ava) {
        const formData = new FormData()
        formData.append("image", ava)
        return instance.put(`/profile/photo`, formData, {
            "Content-Type": "multipart/form-data"
        })
    },
    saveProfile(profileData) {
        return instance.put(`/profile`, profileData)
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
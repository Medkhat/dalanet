import dialogsReducer from "./reducers/dialogsReducer"
import profileReducer from "./reducers/profileReducer"

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, text: "Hi, this is my first social network with react", likesCount: 123},
                {id: 2, text: "Hello Hello Helloo", likesCount: 23},
                {id: 3, text: "You are signed in now and can close this page.", likesCount: 432},
                {id: 4, text: "Text text text", likesCount: 0},
            ],
            newPostText: 'New post here'
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Aydar'},
                {id: 2, name: 'Dauren'},
                {id: 3, name: 'Ernyaz'},
                {id: 4, name: 'Aibek'},
                {id: 5, name: 'Ilyas'},
            ],
            messagesData: [
                {id: 1, message: "Hi, my name is Medkhat! How are you ?"},
                {id: 2, message: "Hello, Medkhat. I'm fine, thank you, and you ?"},
                {id: 3, message: "I'm fine!"},
            ],
            newMessageText: 'New message here'
        }
    },
    _callSubscriber() {},
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}

export default store
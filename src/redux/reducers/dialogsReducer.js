const NEW_MESSAGE = 'NEW_MESSAGE'

let initialState =  {
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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEW_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.newMessage
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
            }

        default:
            return state
    }
}


export const newMessage = (newMessage) => ({type: NEW_MESSAGE, newMessage})

export default dialogsReducer
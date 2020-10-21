const NEW_MESSAGE = 'NEW_MESSAGE'
type DialogsType = {
    id: number,
    name: string
}
type MessagesType = {
    id: number,
    message: string
}
let initialState =  {
    dialogsData: [
        {id: 1, name: 'Aydar'},
        {id: 2, name: 'Dauren'},
        {id: 3, name: 'Ernyaz'},
        {id: 4, name: 'Aibek'},
        {id: 5, name: 'Ilyas'},
    ] as Array<DialogsType>,
    messagesData: [
        {id: 1, message: "Hi, my name is Medkhat! How are you ?"},
        {id: 2, message: "Hello, Medkhat. I'm fine, thank you, and you ?"},
        {id: 3, message: "I'm fine!"},
    ] as Array<MessagesType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type newMessageActionType = {
    type: typeof NEW_MESSAGE
    newMessage: string
}
export const newMessage = (newMessage: string): newMessageActionType => ({type: NEW_MESSAGE, newMessage})

export default dialogsReducer
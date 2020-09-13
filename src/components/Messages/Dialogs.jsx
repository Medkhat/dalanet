import React from 'react'
import msg from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { ValidateElement } from '../common/FormControls/FormControls'
import { required, maxLengthCreator } from '../../utils/validators/validators'

let maxlength300 = maxLengthCreator(300)
const Textarea = ValidateElement("textarea")

const DialogItem = (props) => {
    return (
        <div className={msg.item}>
            <NavLink to={`/dialogs/${props.id}`} className={msg.dialog_item} activeClassName={msg.active}>
                {props.name}
            </NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={msg.detail}>
            <span className={msg.msg_item}>{props.message}</span>
        </div>
    )
}

const AddMessageForm = reduxForm({form: 'dialogAddMessageForm'})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field 
                component={Textarea} 
                name="newMessage" 
                placeholder="Enter your message"
                validate={[ required, maxlength300 ]}
            />
            <button>Send message</button>
        </form>
    )
})

const Dialogs = (props) => {

    let dialogItem = props.dialogsData.map(
        item => <DialogItem 
            key={item.id}
            id={item.id} 
            name={item.name}
        />
    )
    let messageItem = props.messagesData.map(
        item => <Message 
            key={item.id}
            id={item.id} 
            message={item.message}
        />
    )

    const addMessageSubmit = (value) => {
        props.newMessage(value.newMessage)
    }

    return (
        <div className={msg.content}>
            <div className={msg.dialogs}>
                {dialogItem}
            </div>
            <div className={msg.dialog_detail}>
                <div className={msg.messages}>
                    {messageItem}
                </div>
                <AddMessageForm onSubmit={addMessageSubmit}/>
            </div>
        </div>
    )
}

export default Dialogs
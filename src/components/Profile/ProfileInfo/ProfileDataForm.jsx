import React from 'react'
import { reduxForm } from 'redux-form'
import { createField, ValidateElement } from '../../common/FormControls/FormControls'
import style from './../Profile.module.css'

const ProfileDataForm = reduxForm({form: 'editProfile'})(({handleSubmit, error, userProfile}) => {
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            { createField("text", "Full name", "fullName", ValidateElement("input"), [], "") }
            { createField("", "About me", "aboutMe", ValidateElement("textarea"), [], "") }
            { createField("checkbox", "", "lookingForAJob", ValidateElement("input"), [], "Looking for a job") }
            { createField("", "My professional skills", "lookingForAJobDescription", ValidateElement("textarea"), [], "") }
            <div>
                <b>Contacts: </b>
                {
                    Object.keys(userProfile.contacts).map(key => {
                        return <div key={key} className={style.contact}>
                            {createField("text", key, "contacts."+key, ValidateElement("input"), [], "")}
                        </div>
                    })
                }
            </div>
            <div><button>Save</button></div> 
            { 
                error && <div style={{color: 'red'}}>{error}</div>
            }
        </form>
    )
})

export default ProfileDataForm
import React, { useState } from 'react'
import style from '../Profile.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ava from '../../../img/ava.png'
import { Link } from 'react-router-dom'
import ProfileDataForm from './ProfileDataForm'

const Contacts = ({contactTitle, contactValue}) => {
    return <Link to={contactValue} target="_blank">{contactTitle}</Link>
}

const ProfileData = ({userProfile, isOwner, activateEditMode}) => {
    return (
        <div className={style.data}>
            <h4>
                {userProfile.fullName}
            </h4>
            <div><b>About me: </b> {userProfile.aboutMe} </div>
            <div><b>Looking for a job: </b> { userProfile.lookingForAJob ? 'Yes' : 'No' } </div>
            <div><b>My professional skills: </b> {userProfile.lookingForAJobDescription} </div>
            <div>
                <b>Contacts: </b>
                {
                    Object.keys(userProfile.contacts).map(key => {
                        return <div key={key} className={style.contact}>
                            <Contacts key={key} contactTitle={key} contactValue={userProfile.contacts[key]}/>
                        </div>
                    })
                }
            </div>
            {
                isOwner && <div><button onClick={activateEditMode}>Edit profile</button></div> 
            }
        </div>
    )
}

const ProfileInfo = ({userProfile, isFetching, isOwner, status, updateStatus, saveAva, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!userProfile) return <Preloader />
    if (isFetching) return <Preloader />


    const onChangeAvaInput = (e) => {
        if (e.target.files.length)
            saveAva(e.target.files[0])
    }

    const onProfileDataFormSubmit = (formData) => {
        saveProfile(formData).then(() => {  
            setEditMode(false)
        })
    }

    return (
        <div className={style.info}>
            <div className={style.avatar_block}>
                <img src={userProfile.photos.small || ava} className={style.avatar} alt="AVATAR"/>
                { 
                    isOwner && 
                    <label>
                        <input 
                            type="file" 
                            id="ava-input" 
                            style={{display: "none"}}
                            onChange={onChangeAvaInput}
                        /> Change ava
                    </label>
                }
            </div>
            { 
                editMode 
                    ? <ProfileDataForm initialValues={userProfile} userProfile={userProfile} onSubmit={onProfileDataFormSubmit}/>
                    : <ProfileData userProfile={userProfile} isOwner={isOwner} activateEditMode={() => {setEditMode(true)}} />
            }
            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    )
  
}

export default ProfileInfo
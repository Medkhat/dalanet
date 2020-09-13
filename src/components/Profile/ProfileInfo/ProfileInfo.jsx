import React from 'react'
import style from '../Profile.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import ava from '../../../img/ava.png'


const ProfileInfo = ({userProfile, isFetching, isOwner, status, updateStatus, saveAva}) => {

    if (!userProfile) return <Preloader />
    if (isFetching) return <Preloader />

    const onChangeAvaInput = (e) => {
        if (e.target.files.length)
            saveAva(e.target.files[0])
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
            <div className={style.data}>
                <h4>
                    {userProfile.fullName}
                </h4>
                <p><b>About me: </b> {userProfile.aboutMe} </p>
                <p><b>Looking for a job: </b> { userProfile.lookingForAJob ? 'Yes' : 'No' } </p>
                <p><b>Looking for a job description: </b> {userProfile.lookingForAJobDescription} </p>
            </div>
            <ProfileStatus status={status} updateStatus={updateStatus}/>
        </div>
    )
  
}

export default ProfileInfo
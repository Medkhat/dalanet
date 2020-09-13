import React from 'react'
import profile from '../Profile.module.css'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'


const ProfileInfo = ({userProfile, isFetching, status, updateStatus}) => {

    if (!userProfile) return <Preloader />
    if (isFetching) return <Preloader />

    return (
        <div className={profile.info}>
            <img src={userProfile.photos.small} className={profile.avatar} alt="AVATAR"/>
            <div className={profile.data}>
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
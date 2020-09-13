import React from 'react'
import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'


const Profile = (props) => {
    
    return (
        <div className={style.content}>
            <h3>Profile page</h3>
            <ProfileInfo 
                isFetching={props.isFetching} 
                isOwner={props.isOwner}
                userProfile={props.userProfile}
                status={props.status}
                updateStatus={props.updateStatus}
                saveAva={props.saveAva}
                saveProfile={props.saveProfile}
            />
            <MyPostsContainer 
                dispatch={props.dispatch} 
                profileState={props.profileState}
            />
        </div>
    )
}

export default Profile
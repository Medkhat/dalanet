import React from 'react'
import profile from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'


const Profile = (props) => {
    
    return (
        <div className={profile.content}>
            <h3>Profile page</h3>
            <ProfileInfo 
                isFetching={props.isFetching} 
                userProfile={props.userProfile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer 
                dispatch={props.dispatch} 
                profileState={props.profileState}
            />
        </div>
    )
}

export default Profile
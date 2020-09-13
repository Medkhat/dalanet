import React from 'react'
import Profile from './Profile'
import { connect } from 'react-redux'
import {getProfile, getStatus, updateStatus, saveAva } from '../../redux/reducers/profileReducer'
import { withRouter } from 'react-router-dom'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId // URL - де userId болмаса, онда currentUser-дің өз userId-ін береміз
        if (!userId) {
            if (this.props.isAuth) {
                userId = this.props.authorizedUserId
                if (!userId)
                    this.props.history.push("/login")
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) 
            this.refreshProfile()
    }
    render() {
        return <Profile 
            userProfile={this.props.userProfile} 
            isFetching={this.props.isFetching}
            isOwner={!this.props.match.params.userId}
            isAuth={this.props.isAuth}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            saveAva={this.props.saveAva}
        />
    }
}

let mapStateToProps = (state) => ({
    userProfile: state.profileReducer.userProfile,
    isFetching: state.profileReducer.isFetching,
    status: state.profileReducer.status,
    authorizedUserId: state.authReducer.userId,
    isAuth: state.authReducer.isAuth
})

let mapDispatchToProps = {
    getProfile,
    getStatus,
    updateStatus,
    saveAva
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect //Custom Hoc
)(ProfileContainer)
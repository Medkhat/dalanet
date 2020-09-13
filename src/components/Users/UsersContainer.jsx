import { connect } from 'react-redux'
import {
    setCurrentPage,
    requestUsers,
    getUsersPart,
    followRequest,
    unFollowRequest
} from '../../redux/reducers/usersReducer'
import React from 'react'
import Users from './Users'
import { compose } from 'redux'
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/reducers/users-selectors'


class UsersContainer extends React.PureComponent {

    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPaginationClick = (page) => {
        let {pageSize} = this.props
        this.props.getUsersPart(page, pageSize)
    }

    render() {
        return <Users 
                users={this.props.users} 
                onPaginationClick={this.onPaginationClick} 
                currentPage={this.props.currentPage}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                followRequest={this.props.followRequest}
                unFollowRequest={this.props.unFollowRequest}
            />
    }
}

const mapStateToProps = (state) => ({
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
})

const mapDispatchToProps = {
    setCurrentPage,
    getUsers: requestUsers,
    getUsersPart,
    followRequest,
    unFollowRequest
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(UsersContainer)

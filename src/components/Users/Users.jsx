import React from 'react'
import styles from './Users.module.css'
import Preloader from '../common/Preloader/Preloader'
import Pagination from '../common/Pagination'
import UserItem from './UserItem'

const Users = React.memo(({currentPage, totalUsersCount, pageSize, ...props}) => {

    let userElements = props.users.map(
        user => <UserItem
            fullName={user.name} 
            key={user.id} 
            userId={user.id}
            status={user.status} 
            avatar={user.photos.small}
            followed={user.followed}
            followingInProgress={props.followingInProgress}
            followRequest={props.followRequest}
            unFollowRequest={props.unFollowRequest}
        />
    )


    return (
        <div className={styles.content}>
            <div className={styles.title}>
                <h3>Users</h3>
                <Pagination 
                    currentPage={currentPage} 
                    onPaginationClick={props.onPaginationClick} 
                    totalItemsCount={totalUsersCount} 
                    pageSize={pageSize}
                />
            </div>
            <div className={styles.user_items}>
                {
                    props.isFetching ? <Preloader /> : userElements
                }
            </div>
        </div>
    )
})

export default Users
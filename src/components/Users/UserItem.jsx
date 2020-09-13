import React from 'react'
import ava from '../../img/ava.png'
import { NavLink } from 'react-router-dom'
import styles from './Users.module.css'

const UserItem = (props) => {
    return (
        <div className={styles.item}>
            <img src={props.avatar !== null ? props.avatar : ava} className={styles.ava} alt="AVA"/>
            <div className={styles.info}>
                <h4>
                    <NavLink to={`/profile/${props.userId}`}>
                        {props.fullName}
                    </NavLink>
                </h4>
                <p><b>Status: </b>  {props.status}</p>
                <p><b>Country: </b>  Kazakhstan</p>
                <p><b>City: </b>  Almaty</p>
                <div className={styles.btn_block}>
                    {
                        !props.followed ? <button 
                            className={styles.btn}
                            disabled={props.followingInProgress.some(id => id === props.userId)}
                            onClick={
                                () => {
                                    props.followRequest(props.userId)
                                }
                            }
                        >Follow</button> : <button 
                            disabled={props.followingInProgress.some(id => id === props.userId)}
                            className={styles.btn}
                            onClick={
                                () => {
                                    props.unFollowRequest(props.userId)
                                }
                            }
                        >Unfollow</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default UserItem
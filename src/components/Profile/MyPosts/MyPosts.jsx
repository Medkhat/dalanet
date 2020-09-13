import React from 'react'
import profile from '../Profile.module.css'
import ava from '../../../img/logo.png'
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators'
import { ValidateElement } from '../../common/FormControls/FormControls'

let maxLength10 = maxLengthCreator(10)
const Textarea = ValidateElement("textarea")

const PostItem = (props) => {
    return (
        <div className={profile.item}>
            <div className={profile.item_data}>
                <img src={ava} alt="AVA" className={profile.ava}/>
                <p>{props.text}</p>
            </div>
            <div className={profile.item_info}>
                <span>Like {props.likesCount}</span>
            </div>
        </div>
    )
}


const AddNewPostForm = reduxForm({form: 'profileAddPostForm'})((props) => {
    return (
        <form className={profile.new_post} onSubmit={props.handleSubmit}>
            <h5>Add a new post</h5>
            <div className={profile.text_editor}>
                <Field 
                    component={Textarea} 
                    validate={[ required, maxLength10 ]}
                    name="newPostText" 
                    placeholder="Enter your post"
                />
                <button className={profile.btn}>Add post</button>
            </div>
        </form>
    );
})

const MyPosts = React.memo((props) => {

    let posts = [...props.posts].reverse().map(
        item => <PostItem
            key={item.id}
            id={item.id} 
            text={item.text} 
            likesCount={item.likesCount}
        />
    )
    // let newPostElement = React.createRef()
    let onAddPostSubmit = (value) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={profile.posts}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPostSubmit}/>
            <div className={profile.my_posts}>
                {posts}
            </div>
        </div>
    )
})

export default MyPosts
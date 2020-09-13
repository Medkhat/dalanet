import { addPost } from '../../../redux/reducers/profileReducer'
import MyPosts from './MyPosts'
import { connect } from 'react-redux'

let mapStateToProps = (state) => ({
    posts: state.profileReducer.posts
})

let mapDispatchToProps = {
    addPost
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
import { newMessage } from '../../redux/reducers/dialogsReducer'
import Dialogs from './Dialogs'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state) => ({
    newMessageText: state.dialogsReducer.newMessageText,
    dialogsData: state.dialogsReducer.dialogsData,
    messagesData: state.dialogsReducer.messagesData,
    isAuth: state.authReducer.isAuth
})

let mapDispatchToProps = {
    newMessage
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
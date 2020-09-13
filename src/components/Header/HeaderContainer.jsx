import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/reducers/authReducer'

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = state => ({
    login: state.authReducer.login,
    isAuth: state.authReducer.isAuth
})
export default connect(mapStateToProps, {logout})(HeaderContainer)
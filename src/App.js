import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Route, withRouter, HashRouter, BrowserRouter } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/reducers/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './components/hoc/withSuspense';

// Lazy Loading Components
const DialogsContainer = React.lazy(() => import('./components/Messages/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) return <Preloader />
    return (
      <div className="App">
        <HeaderContainer />
        <div className="app-container">
          <Navbar />
          <div className="content">
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/users" render={withSuspense(UsersContainer)}/>
            <Route path="/login" render={() => <Login />}/>
          </div>
        </div>
      </div>
    );
  }
}
let mapStateToProps = state => ({
  initialized: state.appReducer.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App);

const WebApplication = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default WebApplication
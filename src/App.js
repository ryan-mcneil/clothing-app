import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null
  //when component renders
  componentDidMount() {
    // set this.unsubscribeFromAuth to the following function, to be called in the case of unmounting
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this callback function fires if the state of the userAuth has changed, and returns the userAuth
      if (userAuth) {// if it returns the userAuth,
        // get the reference
        const userRef = await createUserProfileDocument(userAuth);
        // now get the snapShot so that we can update the state
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      //set CurrentUser as either the userAuth object, or null if onAuthStateChanged returned null
      this.setState({ currentUser: userAuth})
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    // state = { isSignedIn: null };

    // we need to get access to **GoogleAuth** class that provides methods to allow the user to sign in with a Google Account, 
    // get user's current sign-in status, get data from user's Google profile etc
    // reference: https://developers.google.com/identity/sign-in/web/reference

    componentDidMount() {
        // load up the client portion of the google api 
        // and initialize GoogleAuth object by calling init method with our clientId
        window.gapi.load('client:auth2', () => {            
            window.gapi.client.init ({
                clientId : '640587146126-ovmac4naqdj293i7rm00l1eg6t7uc6vj.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=> {
                // now we can get the reference to GoogleAuth, this === GoogleAuth class
                // console.log(this);
                this.auth = window.gapi.auth2.getAuthInstance();

                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.onAuthChange(this.auth.isSignedIn.get());

                // set an event listener for sign-in status update
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });

    }

    // Everytime user's sign-in status change, update the state (by setting state / calling action creator)
    // this callback function for listen method will recieve boolean value for user's sign-in statuss
    onAuthChange = (isSignedIn) => {
       if (isSignedIn) {
           // call an action creator
           this.props.signIn(this.auth.currentUser.get().getId());
       } else {
           this.props.signOut();
       }
    };

    // Open sign in prompt
    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if ( this.props.isSignedIn === null ) {
            return null;
        } else if ( this.props.isSignedIn ) {
            return (
                <button className="ui google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign out
                </button>
            );
        } else {
            return (
                <button className="ui google button" onClick={this.onSignInClick}>
                    <i className="google icon" />
                    Sign in with Google
                </button>
            );
        }
    }

    render(){
        return <div className="item">{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
    mapStateToProps, 
    { signIn, signOut }
)(GoogleAuth);
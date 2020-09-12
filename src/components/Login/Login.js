import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFBLogin, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
      // setUser(res);
      // setLoggedInUser(res);
      // history.replace(from);
    })
  }
  // const provider = new firebase.auth.GoogleAuthProvider();
  // const fbProvider = new firebase.auth.FacebookAuthProvider();

  // const handleGoogleSignIn= () => {
  //   firebase.auth().signInWithPopup(provider)
  //   .then(res => {
  //     console.log(res);
  //     const {displayName,photoURL,email} = res.user;
  //     const signedInUser = {
  //       isSignedIn: true,
  //       name: displayName,
  //       email: email,
  //       photo: photoURL
  //     }
  //     setUser(signedInUser);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     console.log(err.message);
  //   })
  // }


  // const handleFBLogin = () => {
  //   const fbProvider = new firebase.auth.FacebookAuthProvider();
  //   firebase.auth().signInWithPopup(fbProvider).then(function(result) {
  //     var token = result.credential.accessToken;
  //     var user = result.user;
  //   }).catch(function(error) {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     var email = error.email;
  //     var credential = error.credential;
  //     // ...
  //   });
  // }


  // const handleSignOut= () => {
  //   firebase.auth().signOut()
  //   .then(res => {
  //     const signedOutUser = {
  //       isSignedIn: false,
  //       name: '',
  //       email: '',
  //       photo: '',
  //       // error: '',
  //       // success: false
  //     }
  //     setUser(signedOutUser);
  //   })
  //   .catch(err => {

  //   })
  // }

  const fbSignIn = () => {
    handleFBLogin()
    .then(res => {
      handleResponse(res, true);
    })
  }


  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }


  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }


  const handleBlur = (e) => {
    let isFieldValid = true;

    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);

        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
      })


      // firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      // .then(res => {
      //   const newUserInfo = {...user};
      //   newUserInfo.error = '';
      //   newUserInfo.success = true;
      //   setUser(newUserInfo);
      //   updateUserName(user.name);
      // })
      // .catch( error => {
      //   // Handle Errors here.
      //   const newUserInfo = {...user};
      //   newUserInfo.error = error.message;
      //   newUserInfo.success = false;
      //   setUser(newUserInfo);
      // });
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true);



        // setUser(res);
        // setLoggedInUser(res);
        // history.replace(from);
      })


      // firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      // .then(res => {
      //   const newUserInfo = {...user};
      //   newUserInfo.error = '';
      //   newUserInfo.success = true;
      //   setUser(newUserInfo);
      //   setLoggedInUser(newUserInfo);
      //   history.replace(from);
      // })
      // .catch(function(error) {
      //   // Handle Errors here.
      //   const newUserInfo = {...user};
      //   newUserInfo.error = error.message;
      //   newUserInfo.success = false;
      //   setUser(newUserInfo);
      // });
    }

    e.preventDefault();
  }

//   const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name
//     }).then(function() {
//       console.log('user name update successfully');
//     }).catch(function(error) {
//       console.log(error);
// });
//   }
  

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ?<button onClick={signOut}>sing out</button> :
        <button onClick={googleSignIn}>sing in</button>
      }
      <br/>
      <button onClick = {fbSignIn}>Sing in Using Facebook</button>
      {
        user.isSignedIn && <div>
          <h1> welcome, {user.name}</h1>
          <p>email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
    
      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input type="text" name='email' onBlur={handleBlur} placeholder="Your Email Address" required/>
        <br/>
        <input type="password" name='password' onBlur={handleBlur} placeholder="Your password" required/>
        <br/>
        <input type="submit" value= {newUser ? 'sign up' : 'sign in'}/>
        <p style={{color:'red'}}>{user.error}</p>
        {user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'Logged IN'} Successfully</p>}
      </form>
      
    </div>
  );
}

export default Login;

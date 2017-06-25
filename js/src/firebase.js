import firebase from 'firebase';

// Initialize Firebase
export const init =()=>{
  const config = {
    apiKey: "AIzaSyAdHdePExLrWT5do9Y1bdQ72HIlSWpCOG0",
    authDomain: "my-favorite-places-1358e.firebaseapp.com",
    databaseURL: "https://my-favorite-places-1358e.firebaseio.com",
    projectId: "my-favorite-places-1358e",
    storageBucket: "my-favorite-places-1358e.appspot.com",
    messagingSenderId: "779311464792"
  };
  firebase.initializeApp(config);

  // const app = firebase.initializeApp(config); 

  const database = firebase.database();
  return firebase
}

// function createNewUser(name, email, username) {
//   // const newUserRef = database.ref('users').push();
//   // const newUserKey = newUserRef.key;

//   database.ref('users').push({
//     // userID: newUserKey,
//     name: 'Kirsi',
//     email: 'abc@gmail.com',
//     username: 'hey'
//   });
// }



export const signIn =()=> {
  
      const provider = new firebase.auth().GoogleAuthProvider();
      //start signin()
      
      firebase.auth()
      .signInWithPopup(provider).then(function(result) {
         const token = result.credential.accessToken;
         const user = result.user;
         console.log(user)
         
      }).catch(function(error) {
         const errorCode = error.code;
         const errorMessage = error.message;
         
         console.log(error.code)
         console.log(error.message)
      });
   //end signin()
      
   
   }


// const signoutBtn = document.querySelector('.google_signout');
// if(signoutBtn !== null) {
//   signoutBtn.addEventListener('click', (e) => {
//       e.preventDefault();
//             firebase.auth().signOut()
            
//             .then(function() {
//                console.log('Signout Succesfull')
//             }, function(error) {
//                console.log('Signout Failed')  
//             });
   
//        });
//    }

//Database functions

// export function create 

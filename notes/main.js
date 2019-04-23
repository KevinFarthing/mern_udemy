// so we have a web api to handle this communication with the server
// crap, we still need api authentication to get the data from server on the client side.
// can we get a read only api key?
var config = {
    apiKey: "AIzaSyDjjxmTSePqUavKuLuWmZc-K_tKukvI_Uw",
    authDomain: "tutorialsfirebase-bbccc.firebaseapp.com",
    databaseURL: "https://tutorialsfirebase-bbccc.firebaseio.com",
    projectId: "tutorialsfirebase-bbccc",
    storageBucket: "tutorialsfirebase-bbccc.appspot.com",
    messagingSenderId: "549763743939"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

//   function writeUserData(roomID, name) {
//     database.ref('users/' + roomID).set({
//       username: name
//     });
//   }

//   writeUserData('gkb','kevin');
function addUser(roomID, name) {
  return database.ref(roomID + "/users").push({
    name
  });
}

function addAnswer(roomID, answer) {
  return database.ref(roomID + "/answers").push({
    answer
  });
}

  // writeAnswerData('gkb','kevin','cast iron, bitches');
  // writeAnswerData('gkb','charlie','pending');

//   $( document ).ready(function() {
//     console.log( "ready!" );
// });

function initialize() {
    console.log($("#room").val());
    var username = $("#username").val();
    var room = $('#room').val();
    addUser(room, username);


    var userDataRef = firebase.database().ref(room + "/users").orderByKey();
    userDataRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            console.log(childSnapshot.val()); // okay childSnapshot.val() has a complete list of users, instead of individuals. whoops.
            var key = childSnapshot.key;
            var childData = childSnapshot.val();              
            
            var name_val = childSnapshot.val().Name;
            var id_val = childSnapshot.val().AssignedID;
            
            $('#users').append('<li class="collection-repeat">' + childSnapshot.val().name + '</li>')
            // $('#answers').append('<li class="collection-repeat">' + childSnapshot.val().message + '</li>')
            
      });
    });
}
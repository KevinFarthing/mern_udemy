// so we have a web api to handle this communication with the server
// crap, we still need api authentication to get the data from server on the client side.
// can we get a read only api key?
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function checkCookie() {
//   var user = getCookie("username");
//   if (user != "") {
//     alert("Welcome again " + user);
//   } else {
//     user = prompt("Please enter your name:", "");
//     if (user != "" && user != null) {
//       setCookie("username", user, 365);
//     }
//   }
// }


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

function addAnswer(roomID) {
  if ($('#room').val() == ""){
    alert("please join room")
  }
  return database.ref(roomID + "/answers").push({
    answer
  });
}

function removeUser(roomID, self) {

}

function removeRoom(roomID) {
  return database.ref(roomID).remove();
}

function clearAnswers(roomID) {
  return database.ref(roomID + "/answers").remove();
}

// addAnswer('gkb','cast iron, bitches');
// addAnswer('gkb','pending');

//   $( document ).ready(function() {
//     console.log( "ready!" );
// });

function initialize() {
    var username = $("#username").val();
    var room = $('#room').val();
    if (username == '' || room == '') {
      alert("Please enter a room id and a username");
      return;
    }
    var self = addUser(room, username).key;
    setCookie("roomid", room, 1);
    setCookie("userid", self, 1);

    var userDataRef = firebase.database().ref(room + "/users").orderByKey();
    userDataRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // console.log(childSnapshot.key,childSnapshot.val(),childSnapshot.val().Name,childSnapshot.val().AssignedID); // okay childSnapshot.val() has a complete list of users, instead of individuals. whoops.
            var key = childSnapshot.key;
            var childData = childSnapshot.val();            
            $('#users').append('<li class="collection-repeat">' + childData.name + '</li>')
      });
    });
    var answerDataRef = firebase.database().ref(room + "/answers").orderByKey();
    answerDataRef.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val(); 
        console.log("woot",childData);
        $('#answers').append('<li class="collection-repeat">' + childData.answer + '</li>')
      });
    });
    $('#fbid').val(self);
    console.log($('#fbid').val());
    return self;
}

firebase.database().ref( getCookie("roomid") + "/users/" + getCookie("userid") ).onDisconnect().remove();
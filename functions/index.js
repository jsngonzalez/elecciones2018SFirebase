const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.guardar = functions.https.onRequest((req, res) => {

	if(req.method !== "POST"){
	 res.status(400).send('Please send a POST request');
	 return;
	}

	const list = req.body;

	const store = admin.firestore();
	for (var i = 0; i < list.length; i++) {
		var item=list[i];
		store.collection('primeraVuelta').add(item);
		//store.doc('primeraVuelta').add(item);
	}


    res.status(200).send({response:"ok"})

});


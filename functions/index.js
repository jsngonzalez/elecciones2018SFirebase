const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);


exports.guardar = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	const data = req.body;
		//console.log(data);

	const store = admin.firestore();
	for (var i = 0; i < data.lista.length; i++) {
		var item=data.lista[i];
		//console.log(item);

		store.collection('primeraVuelta').add(item).then(function() {
		    console.log("Document successfully written!");
		}).catch(function(error) {
		    console.error("Error writing document: ", error);
		});

		//store.doc('primeraVuelta').add(item);
	}


    res.status(200).send({response:"ok"})

});

exports.obtener = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});


	const store = admin.firestore();
	var doc = store.collection('primeraVuelta').where('calificacion', '=', '0').limit(1);

	if (!doc.exists) {
		res.status(200).send({error:1,response:"No se encontraron resultados."});
	} else {
		res.status(200).send({error:0,response:doc.data()});
	}



});



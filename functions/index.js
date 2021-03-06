const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);


exports.set = functions.https.onRequest((req, res) => {
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

  return store.collection('primeraVuelta').where('calificacion', '==', '0').limit(50).get().then(function(querySnapshot) {

		list=[];
		querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            if (doc.exists) {
            	var data=doc.data();
            	data.id=doc.id;
            	list.push(data);
		    }
        });


        if (list.length>0) {
				return res.status(200).send({error:0,response:list});
        }else{
				return res.status(200).send({error:1,response:"No se encontraron resultados."});
        }

	}).catch(function(error) {
		return res.status(200).send({error:1,response:error});
	});


	



});


exports.calificar = functions.https.onRequest((req, res) => {
	cors(req, res, () => {});

	const data = req.body;

    console.log(data.id, " => ", data.calificacion);
	const store = admin.firestore();
	store.collection('primeraVuelta').doc(data.id).update({
	    calificacion: data.calificacion
	}).then(function() {
		res.status(200).send({error:0,response:"Formulario actualizado. gracias!"});
	}).catch(function(error) {
		res.status(200).send({error:1,response:error});
	});

});


import FirebaseAuth from "../../firebase-config.json"
import firebase from "firebase/app";
// noinspection ES6UnusedImports
import {database, auth} from "firebase";
import {useEffect, useState} from "react";
import {usePlayer} from "../providers/playerContext";


function useFirebase({roomId, props}) {
    const [fb, setFb] = useState();
    const {state, dispatch} = usePlayer();

    useEffect(() => {
        if (firebase.apps.length) {
            setFb(firebase.app())
        } else {
            setFb(firebase.initializeApp(FirebaseAuth));
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    // Signed in
                    const {uid} = user;
                    console.log(`Logged in: ${uid}`);
                    dispatch({type: "setFbId", payload: {uid}})
                } else {
                    // Signed out
                    console.info("Not signed in");
                    dispatch({type: "setFbId", payload: {uid: undefined}})
                }
            })
        }
    }, []);

    useEffect(() => {
        if (fb === undefined) return;
        firebase.auth().signInAnonymously()
            .then(() => {
                console.info(`Authorized with firebase anonymously`)
            })
            .catch(error => {
                const {code, message} = error;
                console.error(`Firebase error ${code}: ${message}`);
            })
    }, [fb]);

    return fb?.database().ref(`rooms/${roomId}`);
}

export default useFirebase;
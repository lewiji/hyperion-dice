import FirebaseAuth from "../firebase-config.json"
import firebase from "firebase/app";
import fbdb from "firebase/database";
import {useEffect, useState} from "react";

let fb;

function useFirebase({roomId, props}) {
    const [fb, setFb] = useState();

    useEffect(() => {
        if (firebase.apps.length) {
            setFb(firebase.app())
        } else {
            setFb(firebase.initializeApp(FirebaseAuth));
        }
    }, []);

    return fb?.database().ref(`rooms/${roomId}`);
}

export default useFirebase;
import {getUserAction} from "../userReducer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const fetchUser = () => {

    return async function (dispatch) {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                dispatch(getUserAction(user))
                // ...
            } else {
                // User is signed out
                dispatch(getUserAction(null))
                console.log('Not user...')
            }
        });
        return 'test user'
    }
};
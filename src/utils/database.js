import {ref, set} from "firebase/database";
import {database} from "../firebase";
import {child, push, update} from "firebase/database";
import dayjs from "dayjs";
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";

export const sendToDataBase = async ({userName, commentBody, filmId, TimeStamp, commentId, user}) => {
    try {
        await set(ref(database, `comments/${filmId}/${commentId}`), {
            id: commentId,
            timestamp: TimeStamp,
            username: user.uid ? user.email : userName,
            body: commentBody,
            likes: 0,
        });

        return true;
    } catch (error) {
        console.error('Error adding comment to the database:', error);
        return false;
    }
}

export async function updateLikesAtComments({likes, element, id, commentId, uid}) {

    const newLikesCount = likes - 1;
    const newUserLikes = element.userLike.filter(item => item !== uid);

    const updates = {
        [`/comments/${id}/${commentId}/likes`]: newLikesCount,
        [`/comments/${id}/${commentId}/userLike`]: newUserLikes
    };

    await update(ref(database), updates);
    return true
}

export async function mySignIn({nickName, password}) {
    const auth = getAuth();
    let userReturn = {};

    await signInWithEmailAndPassword(auth, nickName, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            userReturn = user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    return userReturn
}

export async function mySignOut() {
    const auth = getAuth();
    let status = false;

    await signOut(auth).then(() => {
        status = true
    }).catch((error) => {
        console.error(error);
        status = false
    });

    return status
}

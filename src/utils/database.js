import {ref, set} from "firebase/database";
import {database} from "../firebase";
import {child, push, update} from "firebase/database";
import dayjs from "dayjs";
import {getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";

export const sendToDataBase = async ({comment, filmId}) => {
    try {
        await set(ref(database, `comments/${filmId}/${comment.id}`), {
            ...comment
        });
        return true;
    } catch (error) {
        console.error('Error adding comment to the database:', error);
        return false;
    }
}

export async function Unlikes ({likes, element, id, commentId, uid}) {
    let tempArray = element.userLike.filter(e => e !== uid)
    const newLikesCountMinus = likes - 1;

    const updates = {
        [`/comments/${id}/${commentId}/likes`]: newLikesCountMinus,
        [`/comments/${id}/${commentId}/userLike`]: [...tempArray]
    };
    await update(ref(database), updates);

    return true
}

export async function updateLikesAtComments({likes, element, id, commentId, uid}) {
    const newLikesCountPlus = likes + 1;
    const newUserLikes = uid;

    const updates = {
        [`/comments/${id}/${commentId}/likes`]: newLikesCountPlus,
        [`/comments/${id}/${commentId}/userLike`]: element.userLike ? [...element.userLike, newUserLikes] : [newUserLikes]
    };

    await update(ref(database), updates);
    return true;
}

export async function addCommentChild({id, comment, temporaryComment, user, answerBody}) {

    const updates = {
        [`/comments/${id}/${comment.id}/child`]: comment.child ? [...comment.child, temporaryComment] : [temporaryComment]
    };

    await update(ref(database), updates);
    return true;
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

import {ref, set} from "firebase/database";
import {database} from "../firebase";
import { child, push, update } from "firebase/database";
import dayjs from "dayjs";

export const sendToDataBase = async ({ userName, commentBody, filmId, TimeStamp, commentId }) => {
    try {
        await set(ref(database, `comments/${filmId}/${commentId}`), {
            id: commentId,
            timestamp: TimeStamp,
            username: userName,
            body: commentBody,
            likes: 0,
            userLike: false
        });

        return true;
    } catch (error) {
        console.error('Error adding comment to the database:', error);
        return false;
    }
}

export async function updateLikesAtComments({ likes, userLike, id, commentId }) {
    try {
        const updates = {
            [`/comments/${id}/${commentId}/likes`]: userLike ? likes - 1 : likes + 1,
            [`/comments/${id}/${commentId}/userLike`]: !userLike
        };

        await update(ref(database), updates);
        return true;
    } catch (error) {
        console.error('Error updating likes:', error);
        return false;
    }
}

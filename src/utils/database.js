import {ref, set} from "firebase/database";
import {database} from "../firebase";
import dayjs from "dayjs";

export const sendToDataBase = async ({userName, commentBody, filmId, TimeStamp}) => {

    const id = Date.now()




    try {
        // Use serverTimestamp for a more accurate timestamp on the server side
        await set(ref(database, 'comments/' + filmId + '/' + id), {
            id: id,
            timestamp: TimeStamp,
            username: userName,
            body: commentBody,
        });

        return true; // Return true if the set operation is successful
    } catch (e) {
        console.error('Error adding comment to the database:', e);
        return false; // Return false if an error occurs
    }
}
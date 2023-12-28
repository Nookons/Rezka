import axios from "axios";
import { getDatabase, ref, child, get } from "firebase/database";
import {addCommentsAction} from "../moviesReducer";

export const fetchComments = (id) => {
    console.log('test')

    return async function (dispatch) {
        try {
            const dbRef = ref(getDatabase());

            // Fetch comments
            const snapshot = await get(child(dbRef, `comments/${id}`));

            if (snapshot.exists()) {
                // Convert object to array
                const commentsArray = Object.values(snapshot.val());
                dispatch(addCommentsAction(commentsArray));
                return commentsArray
            } else {
                console.log("No comments available");
            }

            // Uncomment this if you want to fetch movies
            // const response = await axios.get('your_movie_api_url');
            // dispatch(addMoviesAction(response.data.results));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        dispatch(addCommentsAction([]))
    }
};
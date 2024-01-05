import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {updateLikesAtComments} from "../../../../utils/database";
import Loader from "../../../../components/Loader/Loader";

import {addLikeAction} from "../../../../stores/moviesReducer";


const FeedbackScreen = ({id}) => {
    const comments = useSelector((state) => state.movies.comments);
    const user = useSelector((state) => state.user.user);

    const uid = user.uid
    const dispatch = useDispatch();

    const copiedArray = [...comments]; //Copied array
    const reversedArray = copiedArray.reverse();

    const date = dayjs().get('date')
    const [loader, setLoader] = useState(false);


    const userLiked = async ({likes, element, commentId}) => {

        try {
            setLoader(true);
            const responseLikes = await updateLikesAtComments({likes, element, id, commentId, uid});

            const updateLikes = {
                updtID: commentId,
                updtLikes: likes + 1,
                updtUserLike: uid ? uid : null
            };

            if (responseLikes) {
                setTimeout(() => {
                    setLoader(false);
                    dispatch(addLikeAction(updateLikes));
                }, 250)
            }
        } catch (error) {
            console.error('Error updating likes:', error);
            setLoader(false);
        }
    };


    return (
        <div>
            <Loader value={loader} setValue={setLoader}/>
            {comments.length ? (
                <div>
                    <h4>Last comments...</h4>
                    <hr/>
                    {reversedArray.slice(0, 5).map((e) => {
                        const day = e.timestamp.split('-')[0];
                        const Time = e.timestamp.split('|')[1];

                        const likes = e.likes;
                        const element = e;
                        const commentId = e.id;


                        return (
                            <div key={e.id}
                                 style={{marginTop: 14, border: '1px solid black', padding: 14, borderRadius: 4}}>
                                <h6>{e.username}</h6>
                                <p style={{
                                    marginTop: 4,
                                    color: 'gray'
                                }}>{date.toString() === day ? `Today at: ${Time}` : e.timestamp}</p>
                                <br/>
                                <p>{e.body}</p>
                                <br/>
                                <hr/>
                                <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
                                    <FavoriteBorderIcon style={{cursor: 'pointer'}} onClick={() => userLiked({
                                        likes,
                                        element,
                                        commentId
                                    })}/> {likes.toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <h4>No anyone comments here...</h4>
                    <hr/>
                </div>
            )}
        </div>
    );
};

export default FeedbackScreen;
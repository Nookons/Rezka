import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Unlikes, updateLikesAtComments } from "../../../../utils/database";
import Loader from "../../../../components/Loader/Loader";
import styles from './FeedbackScreen.module.css'

import { addLikeAction } from "../../../../stores/moviesReducer";
import AddAnswer from "./AddAnswer";
import axios from "axios";
import {fetchComments} from "../../../../stores/async/fetchComments";
import Pagination from "./Pagination";

const FeedbackScreen = ({ id }) => {
    const comments = useSelector((state) => state.movies.comments);
    const user = useSelector((state) => state.user.user);
    const uid = user ? user.uid : null;
    const dispatch = useDispatch();

    const reversedArray = [...comments].reverse();
    const date = dayjs().get('date');
    const [loader, setLoader] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 3;

    // Рассчитайте индексы начала и конца для отображаемых комментариев
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = reversedArray.slice(indexOfFirstComment, indexOfLastComment);

    // Функция для изменения текущей страницы
    const paginate = pageNumber => setCurrentPage(pageNumber);

    let newLike = false;

    useEffect(() => {
        async function get() {
            const responseComments = await dispatch(fetchComments(id))
        }
        get()
    }, []);

    const handleUserUnliked = async ({ likes, element, commentId }) => {
        try {
            setLoader(true);
            await Unlikes({ likes, element, id, commentId, uid });
            setLoader(false);
            window.location.reload();
        } catch (error) {
            console.error(error);
            setLoader(false);
        }
    };

    const handleUserLiked = async ({ likes, element, commentId }) => {
        if (!user.uid) {
            alert("You need sign in for this...")
            return
        }
        try {
            setLoader(true);
            newLike = true;
            const updatedLikes = likes + 1;
            const userLikes = element.userLike ? [...element.userLike, uid] : [uid];

            await updateLikesAtComments({ likes, element, id, commentId, uid });
            setLoader(false);

            const updateCommentLikes = { id: commentId, likes: updatedLikes, userlike: userLikes };
            dispatch(addLikeAction(updateCommentLikes));

            window.location.reload();

        } catch (error) {
            console.error('Error updating likes:', error);
            setLoader(false);
        }
    };

    return (
        <div>
            <Loader value={loader} setValue={setLoader} />
            {comments.length ? (
                <div>
                    <h4>All Comments ({comments.length})</h4>
                    <hr />
                    <Pagination
                        commentsPerPage={commentsPerPage}
                        totalComments={reversedArray.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                    {currentComments.map((comment) => {
                        const day = comment.timestamp.split('-')[0];
                        const time = comment.timestamp.split('|')[1];
                        const likes = comment.likes;
                        const isUserLike = comment.userLike ? comment.userLike.includes(uid) : undefined;

                        return (
                            <div key={comment.id} className={styles.Comment}>
                                <div className={styles.MainLabel}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt=""/>
                                    <h6 style={{fontSize: '16px', display: 'flex', alignItems: 'center', gap: 14}}>{comment.username} <p style={{ marginTop: 2, color: 'gray', fontSize: '12px', fontWeight: 400}}>{date.toString() === day ? `Today at: ${time}` : comment.timestamp}</p></h6>
                                </div>
                                <p style={{marginTop: 14}}>{comment.body}</p>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, justifyContent: 'space-between' }}>

                                    <AddAnswer id={id} comment={comment} user={user}/>


                                    {isUserLike ? (
                                        <div style={{display: 'flex', alignItems: 'center', gap: 4}} >
                                            <FavoriteIcon style={{ cursor: 'pointer', }} onClick={() => handleUserUnliked({ likes, element: comment, commentId: comment.id })} /> {likes.toLocaleString()}
                                        </div>
                                    ) : (
                                        <div style={{display: 'flex', alignItems: 'center', gap: 4}} >
                                            <FavoriteBorderIcon style={{ cursor: 'pointer', }} onClick={() => handleUserLiked({ likes, element: comment, commentId: comment.id })} /> {likes.toLocaleString()}
                                        </div>
                                    )}
                                </div>

                                {comment.child
                                    ?
                                        <div className={styles.ChildCommentContainer}>
                                            {
                                                comment.child.map((child, index) => {

                                                return (
                                                    <div key={index} className={styles.ChildComment}>
                                                        <div className={styles.MainLabel}>
                                                            <img src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" alt=""/>
                                                            <h6 style={{fontSize: '16px', display: 'flex', alignItems: 'center', gap: 14}}>{child.username} <p style={{ color: 'gray', fontSize: '12px', fontWeight: 400}}>{date.toString() === day ? `Today at: ${time}` : child.timestamp}</p></h6>
                                                        </div>
                                                        <br />
                                                        <p>{child.body}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    : null
                                }
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div>
                    <h4>No anyone comments here...  😢</h4>
                    <hr />
                </div>
            )}
        </div>
    );
};





export default FeedbackScreen;

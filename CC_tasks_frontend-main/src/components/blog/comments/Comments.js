import React, { useContext } from "react";
import "./Comments.css";
// components
import Comment from "../comment/Comment";
import CommentInput from "../commentInput/CommentInput";
// contexts
import UserContext from "../../../contexts/User";

const Comments = ({ postId, comments, setComments }) => {
    const { user } = useContext(UserContext);
    return (
        <div className="comments">
            {user ? <CommentInput postId={postId} setComments={setComments} /> : null}
            {comments?.length ? <p className="comments__discussion">what we think...</p> : null}
            {comments?.map((comment, index) => <Comment key={index} comment={comment} delay={index < 3 ? 0.2 * index : 0.6} />)}
        </div>
    );
};

export default Comments;

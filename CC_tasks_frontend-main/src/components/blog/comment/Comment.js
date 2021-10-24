import React from "react";
import "./Comment.css";

const Comment = ({ comment, delay }) => {
    return (
        <div className="comment" style={{ animationDelay: delay + "s" }}>
            <p className="comment__user">{comment.name}</p>
            <p className="comment__professionalAffiliation">{comment.professionalAffiliation}</p>
            <p className="comment__content">{comment.content}</p>
            <p className="comment__date">{comment.date}</p>
        </div>
    );
};

export default Comment;

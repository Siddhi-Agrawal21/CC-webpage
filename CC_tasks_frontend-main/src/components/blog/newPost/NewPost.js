import React, { useState } from "react";
import axios from "axios";
import "./NewPost.css";
// constants
import { ADD_POST_ENDPOINT } from "../../../constants/endpoints";
// components
import Loader from "../../../components/loader/Loader";
// material-ui
import { TextareaAutosize, TextField, IconButton, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// consts
const newPostPhotoURL = "https://source.unsplash.com/1600x900/?motivation";

const NewPost = ({ setNewPostState, setPosts, setAlert }) => {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNewPost = e => {
        e.preventDefault();
        const postData = { name, title, content, date: new Date().toString().substring(0, 15), views: 0, comments: [] };

        try {
            setLoading(true);
            axios.post(ADD_POST_ENDPOINT, postData)
                .then(res => {
                    setPosts(posts => ([...posts, postData]));
                    setNewPostState(false);
                    setLoading(false);
                    setAlert(true);
                    // window.location.reload();
                })
                .catch(err => { setLoading(false); })
        } catch (err) { setLoading(false); }

    };

    return (
        <div className="newPost">
            {loading ? <Loader /> : null}
            <IconButton onClick={() => setNewPostState(false)} style={{ position: "fixed", top: "10px", right: "10px", color: "red", backgroundColor: "white" }}><CloseRoundedIcon style={{ fontSize: "30px" }} /></IconButton>
            <form className="newPost__container" onSubmit={e => handleNewPost(e)}>
                <TextField variant="standard" label="Enter your name" value={name} onChange={e => setName(e.target.value)} inputProps={{ maxLength: 25 }} />
                <TextField variant="standard" label="Enter post's title" value={title} onChange={e => setTitle(e.target.value)} inputProps={{ maxLength: 25 }} />
                <TextareaAutosize aria-label="minimum height" placeholder="What's on your mind?" value={content} onChange={e => setContent(e.target.value)} />
                <Button type="submit" disabled={!(content && title)} style={!(content && title) ? { backgroundColor: "lightgrey" } : {}}>Post</Button>
            </form>
            <img src={newPostPhotoURL} alt="" className="newPost__photo" />
        </div>
    );
};

export default NewPost;

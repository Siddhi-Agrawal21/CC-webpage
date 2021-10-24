import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Blog.css";
// constants
import { GET_POSTS_ENDPOINT } from "../../../constants/endpoints";
import { CC_IITKGP_URL } from "../../../constants/urls";
import { APPOINTMENT_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../../constants/routes";
// components
import Post from "../post/Post";
import NewPost from "../newPost/NewPost";
import PostCard from "../postCard/PostCard";
// import ShapeDivider from "../shapeDivider/ShapeDivider";
// material-ui
import { Drawer, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Snackbar, Alert } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import EventIcon from "@mui/icons-material/Event";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
// contexts
import UserContext from "../../../contexts/User";

const Blog = () => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [postState, setPostState] = useState(false);
    const [newPostState, setNewPostState] = useState(false);
    const [comments, setComments] = useState([]);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        try {
            axios.get(GET_POSTS_ENDPOINT)
                .then(res => setPosts(res.data))
                .catch(err => { });
        } catch (err) { };

    }, [comments]);

    const handleSignOut = () => {
        localStorage.removeItem("cc_task");
        history.push(SIGN_IN_ROUTE);
    };

    return (
        <div className="blog">
            <div className="blog__intro">
                <h1>Welcome to CC Blog</h1>
                <p>A person's most beautiful useful asset is not a head full of knowledge, but a heart full of love, an ear ready to listen and a hand willing to help others.</p>
                <div className="blog__buttons">
                    <Button onClick={() => window.scrollTo(0, window.innerHeight - 75)}>Explore!</Button>
                    <Button onClick={() => window.open(CC_IITKGP_URL, "_blank")}>About us!</Button>
                </div>
            </div>
            <div className="blog__postCollection">
                <p><EventIcon />Most Recent</p>
                <div className="blog__posts">
                    {posts.length ? posts.slice(0, 3).map((post, index) => <PostCard key={index} post={post} setPost={setPost} setPosts={setPosts} setPostState={setPostState} setComments={setComments} />) : <p style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: "gray", margin: "50px 0" }}>No posts yet.</p>}
                </div>
            </div>
            <div className="blog__postCollection">
                <p><PeopleRoundedIcon />Top Posts</p>
                <div className="blog__posts" >
                    {posts.length ? [...posts].sort((a, b) => b.views - a.views).slice(0, 3).map((post, index) => <PostCard key={index} post={post} setPost={setPost} setPosts={setPosts} setPostState={setPostState} setComments={setComments} fullWidth />) : <p style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: "gray", margin: "50px 0" }}>No posts yet.</p>}
                </div>
            </div>
            <div className="blog__postCollection">
                <p><TodayIcon />Older Posts</p>
                <div className="blog__posts">
                    {posts.length ? posts.map((post, index) => <PostCard key={index} post={post} setPost={setPost} setPosts={setPosts} setPostState={setPostState} setComments={setComments} />) : <p style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: "gray", margin: "50px 0" }}>No posts yet.</p>}
                </div>
            </div>
            <Drawer anchor={"bottom"} open={postState} onClose={() => setPostState(false)}>
                <Post post={post} setPostState={setPostState} comments={comments} setComments={setComments} />
            </Drawer>
            <Drawer anchor={"top"} open={newPostState} onClose={() => setNewPostState(false)}>
                <NewPost setNewPostState={setNewPostState} setPosts={setPosts} setAlert={setAlert} />
            </Drawer>
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', right: 10, bottom: 10 }} icon={<SpeedDialIcon style={{ color: "white" }} />}>
                <SpeedDialAction key={"write a post"} icon={<CreateRoundedIcon />} tooltipTitle={"write a post"} onClick={() => setNewPostState(true)} />
                <SpeedDialAction key={"book an appointment"} icon={<AssignmentIcon />} tooltipTitle={"book an appointment"} onClick={() => history.push(APPOINTMENT_ROUTE)} />
                {!user ? <SpeedDialAction key={"Sign in for counsellors"} icon={<VpnKeyRoundedIcon />} tooltipTitle={"Sign in for counsellors"} onClick={() => history.push(SIGN_IN_ROUTE)} /> : null}
                {!user ? <SpeedDialAction key={"Sign up for counsellors"} icon={<PersonAddRoundedIcon />} tooltipTitle={"Sign up for counsellors"} onClick={() => history.push(SIGN_UP_ROUTE)} /> : null}
                {user ? <SpeedDialAction key={"Sign out for counsellors"} icon={<ExitToAppRoundedIcon />} tooltipTitle={"Sign out for counsellors"} onClick={() => handleSignOut()} /> : null}
            </SpeedDial>
            <Snackbar open={alert} autoHideDuration={10000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: "100%" }}>Your post was successful!</Alert>
            </Snackbar>
        </div>
    );
};

export default Blog;

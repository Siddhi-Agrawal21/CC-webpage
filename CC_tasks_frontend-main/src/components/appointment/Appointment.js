import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import validator from "validator";
import "./Appointment.css";
// constants
import { BLOG_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../constants/routes";
import { BOOK_APPOINTMENT_ENDPOINT } from "../../constants/endpoints";
// components
import Loader from "../loader/Loader";
// material ui
import { TextField, Button, SpeedDial, SpeedDialAction, SpeedDialIcon, Snackbar, Alert } from "@mui/material";
import { LocalizationProvider, StaticDatePicker, StaticTimePicker } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
// contexts
import UserContext from "../../contexts/User";

const Appointment = () => {
    const history = useHistory();
    const { user } = useContext(UserContext);
    // states
    const [inProgress, setInProgress] = useState(false);
    const [alert, setAlert] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [rollNum, setRollNum] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    // errors
    const [firstNameErr, setFirstNameErr] = useState(false);
    const [lastNameErr, setLastNameErr] = useState(false);
    const [rollNumErr, setRollNumErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    // disable browser auto-complete
    const disableAutoComplete = { autoComplete: "new-password", form: { autoComplete: "off" } };

    const handleSignOut = () => {
        localStorage.removeItem("cc_task");
        history.push(SIGN_IN_ROUTE);
    };

    const handleAppointment = e => {
        e.preventDefault();

        // error checks
        setFirstNameErr(!firstName);
        setLastNameErr(!lastName);
        setRollNumErr(!rollNum);
        setEmailErr(!validator.isEmail(email));

        // email check
        setErrorMsg(!validator.isEmail(email) ? "Please, enter a proper email." : "");

        // appointment
        if (firstName && lastName && rollNum && validator.isEmail(email)) {
            setInProgress(true);
            const data = { firstName, lastName, rollNum, email, date: date.toString().substring(0, 15), time: time.toString().substring(16, 24) }

            try {
                axios.post(BOOK_APPOINTMENT_ENDPOINT, data)
                    .then(() => { setInProgress(false); setAlert(true) })
                    .catch(() => { setInProgress(false); });
            } catch (err) { setInProgress(false); }

            clearForm();
        }
    };

    const clearForm = () => {
        setErrorMsg("");
        setFirstName("");
        setLastName("");
        setRollNum("");
        setEmail("");
        setDate(new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }));
        setTime(new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }));
    };

    return (
        <div className="appointment">
            {inProgress ? <Loader /> : null}
            <Snackbar open={alert} autoHideDuration={10000} onClose={() => setAlert(false)}>
                <Alert onClose={() => setAlert(false)} severity="success" sx={{ width: "100%" }}>Appointment booked!</Alert>
            </Snackbar>
            <div className="appointment__intro">
                <h1>Welcome to CC Blog</h1>
                <p>A person's most beautiful useful asset is not a head full of knowledge, but a heart full of love, an ear ready to listen and a hand willing to help others.</p>
                <div className="appointment__introButtons">
                    <Button onClick={() => window.scrollTo(0, window.innerHeight - 75)}>Book an appointment!</Button>
                </div>
            </div>
            <form className="appointment__form" onSubmit={e => handleAppointment(e)}>
                <h1 style={{ color: "teal" }}>Book an appointment today.</h1>
                <div className="appointment__info">
                    <TextField variant="standard" label="First Name" error={firstNameErr} helperText={firstNameErr ? "Please, enter your first name." : ""} value={firstName} onChange={e => setFirstName(e.target.value)} style={{ marginRight: "10px" }} inputProps={disableAutoComplete} />
                    <TextField variant="standard" label="Last Name" error={lastNameErr} helperText={lastNameErr ? "Please, enter your last name." : ""} value={lastName} onChange={e => setLastName(e.target.value)} style={{ marginLeft: "10px" }} inputProps={disableAutoComplete} />
                </div>
                <div className="appointment__info">
                    <TextField variant="standard" label="Email" error={emailErr} helperText={emailErr ? "Please, enter your proper email." : ""} value={email} onChange={e => setEmail(e.target.value)} style={{ marginRight: "10px" }} inputProps={disableAutoComplete} />
                    <TextField variant="standard" label="Roll Number" error={rollNumErr} helperText={rollNumErr ? "Please, enter your roll number." : ""} value={rollNum} onChange={e => setRollNum(e.target.value)} style={{ marginLeft: "10px" }} inputProps={disableAutoComplete} />
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="appointment__dateTime">
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={date}
                            onChange={newValue => setDate(newValue)}
                            renderInput={params => <TextField {...params} />}
                        />
                        <StaticTimePicker
                            displayStaticWrapperAs="mobile"
                            value={time}
                            onChange={newValue => setTime(newValue)}
                            renderInput={params => <TextField {...params} />}
                        />
                    </div>
                </LocalizationProvider>
                {errorMsg ? <p className="appointment__errMsg">{errorMsg}</p> : null}
                <div className="appointment__buttons">
                    <Button style={{ marginRight: "2.5px", backgroundColor: "grey" }} onClick={() => clearForm()}>Clear</Button>
                    <Button type="submit" style={{ marginLeft: "2.5px", backgroundColor: "teal" }}>Submit</Button>
                </div>
            </form>
            <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: 'fixed', right: 10, bottom: 10 }} icon={<SpeedDialIcon style={{ color: "white" }} />}>
                <SpeedDialAction key={"go to blog"} icon={<PostAddRoundedIcon />} tooltipTitle={"go to blog"} onClick={() => history.push(BLOG_ROUTE)} />
                {!user ? <SpeedDialAction key={"Sign in for counsellors"} icon={<VpnKeyRoundedIcon />} tooltipTitle={"Sign in for counsellors"} onClick={() => history.push(SIGN_IN_ROUTE)} /> : null}
                {!user ? <SpeedDialAction key={"Sign up for counsellors"} icon={<PersonAddRoundedIcon />} tooltipTitle={"Sign up for counsellors"} onClick={() => history.push(SIGN_UP_ROUTE)} /> : null}
                {user ? <SpeedDialAction key={"Sign out for counsellors"} icon={<ExitToAppRoundedIcon />} tooltipTitle={"Sign out for counsellors"} onClick={() => handleSignOut()} /> : null}
            </SpeedDial>
        </div>
    );
};

export default Appointment;

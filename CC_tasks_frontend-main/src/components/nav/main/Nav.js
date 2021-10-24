import React, { useState, useEffect } from "react";
import "./Nav.css";
// components
import Dropdown from "../dropdown/Dropdown";
// constants
import { LOGO_2_PNG } from "../../../constants/images";
import links from "./Links";
// material-ui
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const Nav = () => {
  const [navState, setNavState] = useState(false);
  const [servicesState, setServicesState] = useState(false);
  const [eventsState, setEventsState] = useState(false);
  const [instaLinksState, setInstaLinksState] = useState(false);
  const [anecdotesState, setAnecdotesState] = useState(false);

  const dropdownStates = {
    "Services": {
      state: servicesState,
      setState: setServicesState,
    },
    "Events": {
      state: eventsState,
      setState: setEventsState,
    },
    "Insta-Links": {
      state: instaLinksState,
      setState: setInstaLinksState,
    },
    "Anecdotes": {
      state: anecdotesState,
      setState: setAnecdotesState,
    },
  };

  const scrollHandler = () => {
    if (window.scrollY > 150)
      setNavState(true);
    else
      setNavState(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler)
    return () => {
      window.removeEventListener("scroll", scrollHandler)
    }
  }, []);

  return (
    <nav className="nav" style={{ backgroundColor: navState ? "#1d2410" : "transparent" }}>
      <div className="nav__left">
        <img src={LOGO_2_PNG} alt="" />
      </div>
      <div className="nav__right">
        {
          links.map((link, index) =>
            <div className="nav__link" key={index}>
              <p onClick={() => !link.isDropdown ? window.open(link.link) : null} onMouseEnter={() => dropdownStates[link.label]?.setState(true)} onMouseLeave={() => dropdownStates[link.label]?.setState(false)}>{link.label} {link.isDropdown ? <KeyboardArrowDownRoundedIcon /> : null}</p>
              {link.isDropdown ? <Dropdown links={link.links} state={dropdownStates[link.label].state} setState={dropdownStates[link.label].setState} /> : null}
            </div>
          )
        }
      </div>
    </nav>
  );
};

export default Nav;

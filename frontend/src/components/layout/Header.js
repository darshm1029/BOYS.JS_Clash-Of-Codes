import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from "./partials/Logo";
import { useLocation } from "react-router-dom";

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", clickOutside);
    setUser(JSON.parse(localStorage.getItem("profile")));
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", clickOutside);
      closeMenu();
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    setUser(null);
  };

  const openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    nav.current.style.maxHeight = nav.current.scrollHeight + "px";
    setIsactive(true);
  };

  const closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  };

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  };

  const clickOutside = (e) => {
    if (!nav.current) return;
    if (
      !isActive ||
      nav.current.contains(e.target) ||
      e.target === hamburger.current
    )
      return;
    closeMenu();
  };

  const classes = classNames(
    "site-header",
    bottomOuterDivider && "has-bottom-divider",
    className
  );

  const onButtonClick = () => {
    fetch("../../assets/postman/api.json").then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = "api.json";
        alink.click();
      });
    });
  };

  return (
    <header {...props} className={classes}>
      <div
        className="container"
        style={{
          width: "100%",
          maxWidth: "100%",
          paddingLeft: "11%",
          paddingRight: "10%",
        }}
      >
        <div
          className={classNames(
            "site-header-inner",
            bottomDivider && "has-bottom-divider"
          )}
        >
          <Logo />
          {!hideNav && (
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={classNames("header-nav", isActive && "is-active")}
              >
                <div className="header-nav-inner">
                  <ul
                    className={classNames(
                      "list-reset text-xs",
                      navPosition && `header-nav-${navPosition}`
                    )}
                  >
                    <li>
                      <Link to="/privacy" onClick={closeMenu}>
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <a
                        href="http://127.0.0.1:8000/playground/"
                        target="_blank"
                      >
                        Documentation
                      </a>
                    </li>
                    <li>
                      <Link to="/upload" onClick={closeMenu}>
                        Upload
                      </Link>
                    </li>
                    <li>
                      <button onClick={onButtonClick} style={{backgroundColor:"#4048d2",color:'white',padding:2,paddingLeft:10,paddingRight:10}}>Postman</button>
                    </li>
                  </ul>
                </div>
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;

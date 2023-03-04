import React, { useRef, useEffect, useState } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Auth from "./views/Auth/Auth";
import Main from "./views/Main";
import Modal from "./components/elements/Modal";
import Privacy from "./views/Privacy";
import Pricing from "./views/Pricing";

const App = () => {
  const childRef = useRef();
  let location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    // trackPage(page);
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <ScrollReveal
        ref={childRef}
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute
              path="/privacy"
              component={Privacy}
              layout={LayoutDefault}
            />
          </Switch>
        )}
      />
    </>
  );
};

export default App;

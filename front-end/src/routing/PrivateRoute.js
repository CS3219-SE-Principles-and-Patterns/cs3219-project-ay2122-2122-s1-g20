import { Route, Redirect } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context/AccountContext";
import { api } from "../utils/api";

function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useContext(AccountContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log(token);
    const authenticate = async () => {
      if (token !== "") {
        await api
          .post("/user/authentication")
          .then((res) => {
            console.log(res);
            setAuthenticated(true);
          })
          .catch((err) => {
            console.log(err);
            setAuthenticated(false);
          });
      }
      setIsLoading(false);
    };
    const timer = setTimeout(() => {
      authenticate();
    }, 1000);
    return () => clearTimeout(timer);
  }, [token]);

  if (isLoading) return <div />;

  return (
    <div>
      {isLoading ? (
        " "
      ) : (
        <Route
          {...rest}
          render={() => {
            if (authenticated) {
              return <Component />;
            } else {
              return <Redirect to="/error" />;
            }
          }}
        />
      )}
    </div>
  );
}

export default PrivateRoute;

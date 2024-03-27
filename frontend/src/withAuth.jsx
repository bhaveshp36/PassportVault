/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function withAuth(WrappedComponent) {
  return function (props) {
    const navigate = useNavigate();
    const token = Cookies.get("token");
    let isTokenExpired = false;

    if (token) {
      const decodedToken = jwtDecode(token);
      const dateNow = new Date();
      isTokenExpired = decodedToken.exp < dateNow.getTime() / 1000;
    }

    useEffect(() => {
      if (!token || isTokenExpired) {
        navigate("/login");
      }
    }, [navigate, token, isTokenExpired]);

    if (!token || isTokenExpired) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;

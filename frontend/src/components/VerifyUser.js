import React, { useEffect } from "react";
import { useAuthToken } from "../auth/AuthTokenContext";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function VerifyUser() {
  const navigate = useHistory();
  //const { getAccessTokenSilently } = useAuth0();
  const { accessToken } = useAuthToken();
  console.log(accessToken);

  //const { accessToken } = useAuth0();

  useEffect(() => {
    async function verifyUser() {
      const URL = `https://project-3-backend-fevm.onrender.com/verify-user`;
      console.log(URL);
      const data = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(data);
      const user = await data.json();

      if (user.auth0Id) {
        navigate.push("/");
      }
    }
    if (accessToken) {
      verifyUser();
    }
  }, [accessToken, navigate]);

  return <div style={{ textAlign: "center" }}>Loading...</div>;
}

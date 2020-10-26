import React, { useEffect } from "react";
import { toast } from "react-toastify";
import makeRequest from "../../helpers/makeRequest";
import Verify from "./Verify";

async function verifyEmail(token) {
  return makeRequest(`/api/user/verify/email?token=${token}`, {
    method: "PATCH",
  });
}

const VerifyContainer = ({ history, location }) => {
  const urlParams = new URLSearchParams(location.search);
  useEffect(() => {
    verifyEmail(urlParams.get("token"))
      .then((res) => {
        console.log(res.status);
        if (res.status === 204) {
          toast.info("Email address successfully verified, you can now login!");
          history.push("/");
        }

        if (res.status === 500) {
          toast.error("Token is not valid");
          history.push("/");
        }
      })
      .catch((_) => {
        toast.error("Token is not valid");
        history.push("/");
      });
  }, []);

  return <Verify />;
};

export default VerifyContainer;

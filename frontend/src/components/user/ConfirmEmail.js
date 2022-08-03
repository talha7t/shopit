import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { MetaData } from "../commons/MetaData";
import Loader from "../commons/Loader";

import { confirmEmail, clearErrors } from "../../actions/userActions";

const ConfirmEmail = ({ history, match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }

    dispatch(confirmEmail(match.params.email, match.params.token));

    history.push("/login");
  }, [error, alert, message]);

  return <></>;
};

export default ConfirmEmail;

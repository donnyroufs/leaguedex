import React, { useState } from "react";
import Settings from "./Settings";
import { Helmet } from "react-helmet-async";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import { useDropdown } from "../../hooks/useDropdown";
import { useInput } from "../../hooks/useInput";
import { API } from "../../api";
import validateForm from "../../helpers/validateForm";
import { CHANGE_PASSWORD_FORM } from "../../constants";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const SettingsContainer = () => {
  const [lockPassword, setLockPassword] = useState(true);
  const { setUser, user, loading } = useAuth();
  const { show, handleSetShow } = useDropdown();
  const [password, passwordProps, resetPassword] = useInput("");
  const [
    passwordConfirmation,
    passwordConfirmationProps,
    resetPasswordConfirmation,
  ] = useInput("");

  const handleSavePassword = async () => {
    const { errors } = validateForm(
      { password, password_confirmation: passwordConfirmation },
      CHANGE_PASSWORD_FORM
    );

    if (Object.values(errors).length > 0) {
      return toast.error(Object.values(errors)[0]);
    }

    try {
      const response = await API.changePassword(password, passwordConfirmation);

      if (!response.ok) {
        toast.error("Could not change your password");
      }
      toast.info("Successfully changed your password");
    } catch (_) {
      toast.error("Could not change your password");
    }
    onCancelPassword();
  };

  const handleChangePassword = () => setLockPassword((curr) => !curr);

  const onCancelPassword = () => {
    setLockPassword(true);
    resetPassword();
    resetPasswordConfirmation();
  };

  const handleDelete = (e) => {
    API.deleteSummoner(user.summoner.id)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        toast.info("Account successfully deleted");
      })
      .catch(() => {
        toast.error("Could not delete summoner account");
      });
  };

  const props = {
    user,
    loading,
    lockPassword,
    handleChangePassword,
    onCancelPassword,
    resetPasswordConfirmation,
    handleDelete,
    handleSavePassword,
    show,
    handleSetShow,
    passwordProps,
    passwordConfirmationProps,
  };

  if (loading) {
    return (
      <Loader.Container hide={!loading} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Leaguedex - settings</title>
      </Helmet>
      <Settings {...props} />
    </>
  );
};

export default SettingsContainer;

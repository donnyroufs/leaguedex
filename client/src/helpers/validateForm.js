import {
  LOGIN_FORM,
  REGISTER_FORM,
  SUMMONER_FORM,
  CHANGE_PASSWORD_FORM,
} from "../constants";
import { blackListEmail } from "./utils";

const validateForm = (values, type) => {
  const errors = {};

  if (type === LOGIN_FORM) {
    if (!values.username) {
      errors.username = "Username is required.";
    } else if (values.username.length < 4 || values.username.length > 16) {
      errors.username = "Username must be between 4 and 16 characters.";
    }

    if (!values.password) {
      errors.password = "Password is required.";
    }
  }

  if (type === REGISTER_FORM) {
    if (!values.username) {
      errors.username = "Username is required.";
    } else if (values.username.length < 4 || values.username.length > 16) {
      errors.username = "Username must be between 4 and 16 characters.";
    }

    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    } else if (blackListEmail(values.email)) {
      const split = values.email.split("@")[1];
      errors.mail = `The domain ${split} is not supported`;
    }

    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 6) {
      errors.password = "Password must be atleast 6 characters long.";
    } else if (values.password.length > 256) {
      errors.password = "Password cannot be longer than 256 characters.";
    }

    if (
      values.password &&
      values.password_confirmation &&
      values.password_confirmation !== values.password
    ) {
      errors.password = "Password did not match";
      errors.password_confirmation = "Password did not match";
    }
  }

  if (type === SUMMONER_FORM) {
  }

  if (type === CHANGE_PASSWORD_FORM) {
    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 6) {
      errors.password = "Password must be atleast 6 characters long.";
    } else if (values.password.length > 256) {
      errors.password = "Password cannot be longer than 256 characters.";
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = "Please fill in all fields.";
    }

    if (
      values.password &&
      values.password_confirmation &&
      values.password_confirmation !== values.password
    ) {
      errors.password = "Password did not match";
      errors.password_confirmation = "Password did not match";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export default validateForm;

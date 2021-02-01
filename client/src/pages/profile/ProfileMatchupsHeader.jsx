import React from "react";
import { Form } from "../../components/styles/Form";
import InputField from "../../components/inputField/InputField";
import * as SC from "./Profile.styles";

const ProfileMatchupsHeader = ({ champion, username, value, handleChange }) => {
  return (
    <>
      <SC.Box flex>
        <SC.Box>
          <SC.Image src={champion.icon} alt="image of a champion" />
        </SC.Box>
        <SC.Box ml="1.5rem">
          <SC.Heading>{champion.name}</SC.Heading>
          <SC.SubTitle>
            By <SC.Link to={`/profile/${username}`}>{username}</SC.Link>
          </SC.SubTitle>
        </SC.Box>
      </SC.Box>

      <Form champion>
        <InputField
          label="find opponent"
          placeholder="enter champion name"
          name="search"
          value={value.search}
          handleChange={handleChange}
        />
      </Form>
    </>
  );
};

export default ProfileMatchupsHeader;

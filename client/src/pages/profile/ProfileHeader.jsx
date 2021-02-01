import React from "react";
import { Form } from "../../components/styles/Form";
import InputField from "../../components/inputField/InputField";
import * as SC from "./Profile.styles";

const ProfileHeader = ({ username, publicDexCount, value, handleChange }) => {
  return (
    <>
      <SC.Box>
        <SC.Heading>
          {username}'s <SC.Unbold>profile</SC.Unbold>
        </SC.Heading>
        <SC.SubTitle>
          {publicDexCount} public {publicDexCount !== 1 ? "dex's" : "dex"}
        </SC.SubTitle>
      </SC.Box>

      {/* onsearch removed */}
      <Form champion>
        <InputField
          label="find champion"
          placeholder="enter champion name"
          name="search"
          value={value.search}
          handleChange={handleChange}
        />
      </Form>
    </>
  );
};

export default ProfileHeader;

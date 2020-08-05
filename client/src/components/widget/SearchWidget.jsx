import React from "react";
import Widget from "./Widget";
import { Input, InputWrapper } from "./Widget.styles";
import { FaSearch } from "react-icons/fa";

const SearchWidget = () => {
  return (
    <Widget title="Find Matchup">
      <InputWrapper>
        <Input type="text" placeholder="Champion name..." />
        <FaSearch className="searchbar-icon" />
      </InputWrapper>
    </Widget>
  );
};

export default SearchWidget;

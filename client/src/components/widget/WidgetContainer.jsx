import React from "react";
import Widget from "./Widget";
import { Text, Input, InputWrapper } from "./Widget.styles";
import { INFO_WIDGET, SEARCH_WIDGET } from "../../constants";
import { FaSearch } from "react-icons/fa";

const WidgetContainer = ({ type }) => {
  if (type === INFO_WIDGET) {
    return (
      <Widget title="Info card">
        <Text>matchups recorded: 0</Text>
        <Text>champions played: 0</Text>
      </Widget>
    );
  }
  if (type === SEARCH_WIDGET) {
    return (
      <Widget title="Find Matchup">
        <InputWrapper>
          <Input type="text" placeholder="Champion name..." />
          <FaSearch className="searchbar-icon" />
        </InputWrapper>
      </Widget>
    );
  }
};

export default WidgetContainer;

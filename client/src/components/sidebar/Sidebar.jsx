import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useSidebar } from "../../hooks/useSidebar";
import * as SC from "./Sidebar.styles";

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const { user, isAuthenticated, isAdmin } = useAuth();

  return (
    <SC.Wrapper isOpen={isOpen}>
      <SC.Wrapper.Inner>
        <SC.Box>
          <SC.Heading>Menu</SC.Heading>
          <SC.Link to="/" exact activeClassName="active-route">
            home
          </SC.Link>
          <SC.Link to="/about" exact activeClassName="active-route">
            about
          </SC.Link>
          <SC.Link to="/collection" exact activeClassName="active-route">
            collection
          </SC.Link>
          {isAuthenticated && (
            <>
              <SC.Link
                to={`/profile/${user.username}`}
                activeClassName="active-route"
              >
                profile
              </SC.Link>
              <SC.Link to="/settings" activeClassName="active-route">
                settings
              </SC.Link>
              {isAdmin && (
                <SC.Link to="/admin/dashboard" activeClassName="active-route">
                  Dashboard
                </SC.Link>
              )}
            </>
          )}
        </SC.Box>
      </SC.Wrapper.Inner>
    </SC.Wrapper>
  );
};

export default Sidebar;

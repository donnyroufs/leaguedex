import React from "react";
import { useHistory } from "react-router";
import { Container } from "./Header.styles";
import { Button, Link } from "../../GlobalStyles";
import { useAuth } from "../../hooks/useAuth";
import { useModal } from "../../hooks/useModal";

const Header = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const history = useHistory();
  const modal = useModal();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    history.push("/");
  };

  return (
    <Container>
      <Container.Brand to="/">
        <Container.Brand.Image src="/logo.svg" alt="leaguedex logo" />
      </Container.Brand>
      {user && (
        <Container.Account>
          <Container.Name>{user.username}</Container.Name>
        </Container.Account>
      )}
      <Container.Buttons authenticated={isAuthenticated}>
        {!isAuthenticated && (
          <>
            <Button onClick={() => modal.setModal("register")}>Register</Button>
            <Button secondary onClick={() => modal.setModal("login")}>
              Login
            </Button>
          </>
        )}
        {isAuthenticated && (
          <>
            {!user.summoner && (
              <Button onClick={() => modal.setModal("summoner")}>
                Add Summoner Account
              </Button>
            )}
            {user.summoner && <Link to="/match">You are not in a match</Link>}
            <Button onClick={handleLogout}>Log out</Button>
          </>
        )}
      </Container.Buttons>
    </Container>
  );
};

export default Header;

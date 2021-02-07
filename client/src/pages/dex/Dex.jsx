import React, { useState, useEffect } from "react";
import Notes from "../../components/notes/Notes";
import { useAuth } from "../../hooks/useAuth";
import { Container } from "./Dex.styles";
import { useMatch } from "../../hooks/useMatch";
import MatchupInfo from "./MatchupInfo";

const Dex = ({
  dex,
  setDex,
  isLive,
  shared,
  notes,
  createNote,
  deleteNote,
}) => {
  const [privacy, setPrivacy] = useState(dex.private);
  const { user } = useAuth();
  const { setBtnText } = useMatch();

  useEffect(() => {
    setBtnText("Game Done?");

    return () => {
      setBtnText("Go To Match");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Container.Inner>
        <MatchupInfo
          user={user}
          dex={dex}
          setDex={setDex}
          privacy={privacy}
          setPrivacy={setPrivacy}
          isLive={isLive}
          shared={shared}
        />
        <Container.Right>
          <Notes
            {...dex}
            user={user}
            setPrivacy={setPrivacy}
            privacy={privacy}
            notes={notes}
            createNote={createNote}
            shared={shared}
            deleteNote={deleteNote}
            championA={dex.championA}
            championb={dex.championA}
          />
        </Container.Right>
      </Container.Inner>
    </Container>
  );
};

export default Dex;

import React, { useState, useEffect } from "react";
import Stats from "../../components/stats/Stats";
import Toggle from "../../components/toggle/Toggle";
import Runes from "../../components/runes/Runes";
import Notes from "../../components/notes/Notes";
import { useAuth } from "../../hooks/useAuth";
import { Container, Header, Text, Highlight, Status } from "./Dex.styles";
import { useMatch } from "../../hooks/useMatch";
import { Like } from "../../components/like/Like";
import { API } from "../../api/index";
import { toast } from "react-toastify";

const isUpdated = (a, b, c) => a + b === c;
const getPercentage = (a, b, c) => {
  const updated = isUpdated(a, b, c);
  const d = updated ? c : c - 1;
  return c === 1 && !updated ? 0 : ((a / d) * 100).toFixed(0);
};

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

  const handleLike = async (e) => {
    if (!user) {
      toast.error("You need to be signed in.");
    }

    const res = await API.likeMatchup(dex.id);
    if (res.status === 201) {
      setDex((curr) => ({
        ...curr,
        likedByMe: !curr.likedByMe,
        likes: curr.likedByMe ? curr.likes - 1 : curr.likes + 1,
      }));

      const message = dex.likedByMe
        ? "You have downvoted this matchup."
        : "You have upvoted this matchup.";

      toast.info(message);
    }
  };

  return (
    <Container>
      <Container.Left>
        <Header>
          <Header.Left>
            {isLive(dex) && <Status>Live !</Status>}
            {!isLive(dex) && (
              <Like
                onClick={handleLike}
                likedByMe={dex.likedByMe}
                likes={dex.likes}
              />
            )}
            <Text>
              {dex.championA.name} <Highlight>vs</Highlight>{" "}
              {dex.championB.name}
            </Text>
          </Header.Left>
          <Header.Right>
            {!shared && (
              <Toggle {...dex} privacy={privacy} setPrivacy={setPrivacy} />
            )}
          </Header.Right>
        </Header>
        <Runes />
      </Container.Left>
      <Container.Right>
        <Header type="stats" stats>
          <Stats label="lane" info={dex.lane} page="home" type="dex" />
          <Stats
            page="home"
            marginTop="1rem"
            label="win ratio"
            info={getPercentage(
              dex.games_won,
              dex.games_lost,
              dex.games_played
            )}
            type="dex"
          />
          <Stats type="dex" page="home" label="wins" info={dex.games_won} />
          <Stats type="dex" page="home" label="losses" info={dex.games_lost} />
        </Header>
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
    </Container>
  );
};

export default Dex;

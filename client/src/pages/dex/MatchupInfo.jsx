import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Header,
  Status,
  Box,
  Column,
  Image,
  SubTitle,
  SmallerTitle,
  StatsWrapper,
} from "./Dex.styles";
import { toast } from "react-toastify";
import { Like } from "../../components/like/Like";
import { API } from "../../api/index";
import SignalIcon from "./SignalIcon";
import Toggle from "../../components/toggle/Toggle";
import Stats from "../../components/stats/Stats";
import { Button } from "../../components/toggle/Toggle.styles";
import { FaLink } from "react-icons/fa";
import useClipboard from "react-hook-clipboard";

const isUpdated = (a, b, c) => a + b === c;

const getPercentage = (a, b, c) => {
  const updated = isUpdated(a, b, c);
  const d = updated ? c : c - 1;
  return c === 1 && !updated ? 0 : ((a / d) * 100).toFixed(0);
};

const MatchupInfo = ({
  user,
  dex,
  setDex,
  privacy,
  setPrivacy,
  isLive,
  shared,
}) => {
  const [, copyToClipboard] = useClipboard();
  const params = useParams();

  const handleCopy = () => {
    copyToClipboard(
      `https://leaguedex.com/profile/${user.username}/dex/${params.id}`
    );
    toast.info("copied link to clipboard");
  };

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
    <Container.Left>
      <Header>
        <Header.Left>
          <Like
            onClick={handleLike}
            likedByMe={dex.likedByMe}
            likes={dex.likes}
          />
          {!shared && (
            <Toggle {...dex} privacy={privacy} setPrivacy={setPrivacy} />
          )}
          {!privacy && !shared && (
            <Button style={{ marginLeft: "1rem" }} onClick={handleCopy}>
              <FaLink className="clipboard" />
              Share
            </Button>
          )}
        </Header.Left>
        <Header.Right>
          {isLive(dex) && (
            <Status>
              <SignalIcon h="24px" w="24px" />
              <span style={{ marginLeft: ".5rem" }}>Live</span>
            </Status>
          )}
        </Header.Right>
      </Header>
      <Box>
        <Box.Inner>
          <Column flex={2}>
            <Image src={dex.championA.image} width="100%" />
            <Stats type="dex" page="home" label="wins" info={dex.games_won} />
          </Column>
          <Column flex={1} align="center">
            <Column.Inner>
              <StatsWrapper>
                <SubTitle>{dex.lane}</SubTitle>
                <SmallerTitle type="vs">VS</SmallerTitle>
              </StatsWrapper>

              <StatsWrapper>
                <SubTitle>win ratio</SubTitle>
                <SmallerTitle>
                  {getPercentage(
                    dex.games_won,
                    dex.games_lost,
                    dex.games_played
                  )}
                  %
                </SmallerTitle>
              </StatsWrapper>
            </Column.Inner>
          </Column>
          <Column flex={2}>
            <Image src={dex.championB.image} width="100%" />
            <Stats
              type="dex"
              page="home"
              label="losses"
              info={dex.games_lost}
            />
          </Column>
        </Box.Inner>
      </Box>
    </Container.Left>
  );
};

export default MatchupInfo;

import React from "react";
import { useManyInputs } from "../../hooks/useInput";
import CardsGrid from "../../components/cardsGrid/CardsGrid";
import RowsLayout from "../../components/rowsLayout/RowsLayout";
import ProfileHeader from "./ProfileHeader";
import * as Loader from "../../components/styles/Loader";
import { MoonLoader } from "react-spinners";
import _ from "lodash";

const Profile = ({ matchups: data, loading, username }) => {
  const { value, handleChange } = useManyInputs({
    search: "",
  });

  if (loading) {
    return (
      <Loader.Container hide={!loading} secondary>
        <MoonLoader color="#B8D0EC" />
      </Loader.Container>
    );
  }

  return (
    <RowsLayout
      body={
        data && data.length > 0 ? (
          <CardsGrid
            data={data}
            filterFn={(champ) =>
              champ.name.toLowerCase().includes(value.search)
            }
            sortFn={(a, b) => b.matchups_count - a.matchups_count}
            contentFn={(champion) =>
              champion.matchups_count !== 1
                ? `${champion.matchups_count} matchups`
                : `${champion.matchups_count} matchup`
            }
            cardHrefFn={(championName) =>
              `/profile/${username}/matchups/${championName}`
            }
          />
        ) : (
          <p style={{ marginTop: "2rem" }}>
            {_.capitalize(username)} has no public matchups yet.
          </p>
        )
      }
      header={
        <ProfileHeader
          username={username}
          publicDexCount={data.length}
          value={value}
          handleChange={handleChange}
        />
      }
    />
  );
};

export default Profile;

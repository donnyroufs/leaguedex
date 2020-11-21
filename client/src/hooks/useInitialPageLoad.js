import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useModal } from "./useModal";
import { useMatch } from "./useMatch";
import { API } from "../api";

export function useInitialPageLoad() {
  const {
    renewAuth,
    user,
    initialLoad,
    setInitialLoad,
    loading,
    isAllowed,
  } = useAuth();
  const { setModal } = useModal();
  const { hasMatch, setActiveSummonerId, activeSummonerId } = useMatch();

  useEffect(() => {
    renewAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && !user.summoner && initialLoad) {
      setModal("summoner");
      setInitialLoad(false);
    }

    if (user && !hasMatch) {
      const summonerId =
        !activeSummonerId && user.summoner.length > 0
          ? user.summoner[0].accountId
          : activeSummonerId;

      API.syncData(summonerId);
      setActiveSummonerId(summonerId);

      setInitialLoad(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, activeSummonerId]);

  return {
    loading,
    isAllowed,
  };
}

import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useModal } from "./useModal";
import { useMatch } from "./useMatch";
import { API } from "../api";

export function useInitialPageLoad() {
  const { renewAuth, user, initialLoad, setInitialLoad } = useAuth();
  const { setModal } = useModal();
  const { findMatch, hasMatch } = useMatch();

  useEffect(() => {
    renewAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && !user.summoner && initialLoad) {
      setModal("summoner");
      setInitialLoad(false);
    }

    if (user && !hasMatch && initialLoad) {
      API.syncData();
      findMatch();
      setInitialLoad(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
}

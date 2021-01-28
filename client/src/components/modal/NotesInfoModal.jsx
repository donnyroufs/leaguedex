import React from "react";
import { useModal } from "../../hooks/useModal";
import Modal from "./Modal";
import { InfoBox } from "./Modal.styles";
import useOnclickOutside from "react-cool-onclickoutside";

export function NotesInfoModal() {
  const { setModal, isOpen } = useModal();

  const ref = useOnclickOutside(() => {
    setModal(null);
  });

  return (
    <Modal
      clickedOutside={ref}
      isOpen={isOpen("info-notes")}
      title="Tags explained"
    >
      <InfoBox>
        <InfoBox.List>
          <InfoBox.Item>
            Create tags specifically for champions by adding their name after @.
            These are always shown when the matchup includes the given champion.
          </InfoBox.Item>
          <InfoBox.Item>
            You can create global tags, which will be shown in every matchup.
          </InfoBox.Item>
          <InfoBox.Item>
            You can create inline tags, these will not show the "@" character
            and are only for the current matchup.
          </InfoBox.Item>
          <InfoBox.Item>
            It's recommended to put specific champion and global tags at the end
            of a note.
          </InfoBox.Item>
          <InfoBox.Item>
            You can filter tags in any combination you wish!
          </InfoBox.Item>
        </InfoBox.List>
        <InfoBox.Footer>
          <InfoBox.Close onClick={() => setModal(null)}>
            close &times;
          </InfoBox.Close>
        </InfoBox.Footer>
      </InfoBox>
    </Modal>
  );
}

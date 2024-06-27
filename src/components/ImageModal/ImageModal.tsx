import { FC } from "react";
import { Item } from "../../types";
import Modal from "react-modal";
import css from "../ImageModal/ImageModal.module.css";

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Item | null;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  onRequestClose,
  image,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
      appElement={document.getElementById("root") as HTMLElement}
    >
      {image && (
        <div>
          <img
            className={css.image}
            src={image.urls.regular}
            alt={image.alt_description}
            style={{
              width: "100%",
              maxHeight: "85vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <button className={css.closeButton} onClick={onRequestClose}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

import ImageCard from "../ImageCard/ImageCard";
import { Articles } from "../../types";
import css from "../ImageGallery/ImageGallery.module.css";

interface ImageGalleryProps {
  items: Articles[];
  onImageClick: (item: Articles) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  items,
  onImageClick,
}) => {
  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li
          className={css.pictureContainer}
          key={item.id}
          onClick={() => onImageClick(item)}
        >
          <ImageCard item={item} />
        </li>
      ))}
    </ul>
  );
};

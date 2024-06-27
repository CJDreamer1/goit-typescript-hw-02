import { FC } from "react";
import { Item } from "../../types";
import css from "../ImageCard/ImageCard.module.css";

interface ImageCardProps {
  item: Item;
}

export const ImageCard: FC<ImageCardProps> = ({ item }) => {
  return (
    <div className={css.image}>
      <img
        className={css.internalImage}
        src={item.urls.small}
        alt={item.alt_description}
      />
      <div className={css.info}>
        <p>likes:{item.likes}</p>
        <p>author:{item.user.name}</p>
      </div>
    </div>
  );
};

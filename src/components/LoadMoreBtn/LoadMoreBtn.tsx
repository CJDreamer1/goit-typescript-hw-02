import { FC } from "react";
import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

interface LoadMoreProps {
  isLoadingMore: boolean;
  hasMore: boolean;
  onClick: () => void;
  whileLoading: JSX.Element;
}

export const LoadMoreBtn: FC<LoadMoreProps> = ({
  isLoadingMore,
  hasMore,
  onClick,
  whileLoading,
}) => {
  return (
    <div>
      {hasMore && (
        <button className={css.loadMoreBtn} onClick={onClick}>
          Load more
        </button>
      )}
      {isLoadingMore && (
        <div className={css.progressWrapper}>{whileLoading}</div>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { getArticles } from "../articles-api";
import SearchBar from "../SearchBar/SearchBar";
import { ImageModal } from "../ImageModal/ImageModal";
import { ProgressBar } from "react-loader-spinner";
import { LoadMoreBtn } from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Item } from "../../types";
import css from "../App/App.module.css";

export default function App() {
  const [articles, setArticles] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  // ================================ Modal State =============================
  const [selectedImage, setSelectedImage] = useState<Item | null>(null);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  // ==========================================================================
  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
    // console.log(articles);
    async function fetchArticles() {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getArticles(searchQuery, page);
        if (data.total_pages > 1) {
          setHasMore(true);
        }
        if (data.length === 0) {
          setIsError(true);
        }
        if (data.length < 10) {
          setHasMore(false);
        }
        setArticles((prevState) => [...prevState, ...data]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    }
    fetchArticles();

    console.log(searchQuery, page);
  }, [searchQuery, page]);
  // =====================================================================================>

  const handleSearch = async (topic: string) => {
    setSearchQuery(topic);
    setHasMore(true);
    setPage(1);
    setArticles([]);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };
  // ========================================= Modal Window ====================
  const openModal = (image: Item) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };
  // =================================== End Modal window ======================

  const bar = (
    <ProgressBar
      visible={true}
      height="80"
      width="500"
      borderColor="#0056b3"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <div className={css.progressWrapper}>{bar}</div>}
      {isError && <ErrorMessage />}
      {articles.length > 0 && (
        <ImageGallery items={articles} onImageClick={openModal} />
      )}
      {isLoadingMore && <div className={css.progressWrapper}>{bar}</div>}
      {articles.length > 0 && !isLoading && (
        <LoadMoreBtn
          isLoadingMore={isLoadingMore}
          hasMore={hasMore}
          onClick={handleLoadMore}
          whileLoading={bar}
        />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

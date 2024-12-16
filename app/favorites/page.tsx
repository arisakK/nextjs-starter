import { fetchFavorites } from "@/actions/action";
import EmptyList from "@/components/home/EmptyList";
import LandmarkList from "@/components/home/LandmarkList";

const FavoritesPage = async () => {
  const favorites = await fetchFavorites();

  return (
    <>
      {favorites.length === 0 ? (
        <EmptyList heading="Not found favorite" />
      ) : (
        <LandmarkList landmarks={favorites} />
      )}
    </>
  );
};
export default FavoritesPage;

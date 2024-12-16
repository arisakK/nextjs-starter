"use client";

import { SignInCardButton } from "@/components/form/Button";
import { fetchFavoriteId } from "@/actions/action";
import FavoriteToggleForm from "./FavoriteToggleForm";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const FavoriteToggleButton = ({
  landmarkId,
}: {
  landmarkId: string;
}): ReactNode => {
  const { userId } = useAuth();

  const [favoriteId, setFavoriteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFavoriteId({ landmarkId });
        setFavoriteId(data);
      } catch (error) {
        console.error("Error fetching favorite ID:", error);
      }
    };
    fetchData();
  }, [landmarkId]);

  if (!userId) return <SignInCardButton />;

  return <FavoriteToggleForm landmarkId={landmarkId} favoriteId={favoriteId} />;
};
export default FavoriteToggleButton;

"use client";

import { toggleFavoriteAction } from "@/actions/action";
import FormContainer from "../form/FormContainer";
import { usePathname } from "next/navigation";
import { CardSubmitButton } from "../form/Button";

const FavoriteToggleForm = ({
  landmarkId,
  favoriteId,
}: {
  landmarkId: string;
  favoriteId: string | null;
}) => {
  const pathname = usePathname();

  const toggleAction = toggleFavoriteAction.bind(null, {
    landmarkId,
    favoriteId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={!!favoriteId} />
    </FormContainer>
  );
};
export default FavoriteToggleForm;

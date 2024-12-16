import { fetchLandmarkById } from "@/actions/action";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrumb from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandmark from "@/components/map/MapLandmark";
import { redirect } from "next/navigation";

const LandmarkDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const landmark = await fetchLandmarkById({ id });

  if (!landmark) {
    redirect("/");
  }

  return (
    <section>
      <Breadcrumb name={landmark.name} />
      <header className="flex justify-between mt-6 items-center ">
        <h1 className="text-4xl font-bold">{landmark.name}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton landmarkId={landmark.id} name={landmark.name} />
          <FavoriteToggleButton landmarkId={id} />
        </div>
      </header>
      <ImageContainer mainImage={landmark.image} name={landmark.name} />
      <section>
        <div>
          <Description description={landmark.description} />
          <MapLandmark location={{ lat: landmark.lat, lng: landmark.lng }} />
        </div>
      </section>
    </section>
  );
};
export default LandmarkDetail;

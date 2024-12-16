import Link from "next/link";
import { Button } from "../ui/button";

const EmptyList = ({
  heading = "No items",
  message = "Please try again",
  btnText = "back home",
}: {
  heading?: string;
  message?: string;
  btnText?: string;
}) => {
  return (
    <div className="flex flex-col justify-center min-h-screen items-center text-center">
      <h2 className="text-xl font-bold">{heading}</h2>
      <p className="text-lg mb-4">{message}</p>
      <Button className="capitalize" asChild>
        <Link href="/">{btnText}</Link>
      </Button>
    </div>
  );
};
export default EmptyList;

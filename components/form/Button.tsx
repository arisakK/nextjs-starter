"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, LoaderCircle } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";

type SubmitButtonProps = {
  className?: string;
  size?: buttonSize;
  text: string;
};

type buttonSize = "default" | "lg" | "sm";

export const SubmitButton = (props: SubmitButtonProps) => {
  const { className, text, size } = props;

  const { pending } = useFormStatus();

  return (
    <Button
      className={`${className} capitalize`}
      type="submit"
      size={size}
      disabled={pending}
    >
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" /> Loading{" "}
        </>
      ) : (
        <p>{text}</p>
      )}
    </Button>
  );
};

export const SignInCardButton = () => {
  return (
    <SignInButton>
      <Button size="icon" variant="outline">
        <Heart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" variant="outline">
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : isFavorite ? (
        <Heart fill="red" />
      ) : (
        <Heart />
      )}
    </Button>
  );
};

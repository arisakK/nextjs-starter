"use client";

import { useToast } from "@/hooks/use-toast";
import { ActionFunction } from "@/utils/types";
import { useActionState, useEffect } from "react";

const initialState = {
  message: "",
};

const FormContainer = ({
  action,
  children,
}: {
  action: ActionFunction;
  children: React.ReactNode;
}) => {
  const { toast } = useToast();

  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return <form action={formAction}>{children}</form>;
};
export default FormContainer;

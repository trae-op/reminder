import { ReactNode } from "react";

export type TPropsProvider = {
  children: ReactNode;
};

export type TPropsForm = {
  id: string;
};

export type TPropsItem = Pick<
  TReminder,
  "id" | "name" | "isDaily" | "date" | "time"
> & {
  handleUpdate: () => void;
  handleDelete: () => void;
};

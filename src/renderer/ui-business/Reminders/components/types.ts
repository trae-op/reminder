import { ReactNode } from "react";

export type TPropsProvider = {
  children: ReactNode;
};

export type TPropsForm = {
  id: string;
};

export type TPropsItem = Pick<
  TReminder,
  "id" | "name" | "isDaily" | "datetime"
> & {
  handleUpdate: () => void;
  handleDelete: () => void;
};

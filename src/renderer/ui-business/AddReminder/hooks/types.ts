import { ChangeEvent, Dispatch, SetStateAction, MouseEvent } from "react";

export type THookSubscribeEvent = {
  result: TReminder | undefined;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};
export type THookControl = {
  handleTextInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAdd: (event: MouseEvent<HTMLButtonElement>) => void;
  submitFormAction: (_: undefined, formData: FormData) => Promise<undefined>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDaily: boolean;
};

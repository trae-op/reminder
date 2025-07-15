import { ElementType, ReactElement, RefAttributes } from "react";

type TProps<P extends Record<string, any>> = P & {
  component: ElementType<P>;
};

export type TComponentGenericForwardRef = <P extends Record<string, any>>(
  props: TProps<P> & RefAttributes<any>
) => ReactElement | null;

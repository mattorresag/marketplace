import React from "react";
import { Button } from "../Button";
import { Flex } from "../Flex";

export interface BaseModalButton {
  content: string;
  variant: React.ComponentProps<typeof Button>["variant"];
  callBack?: (params?: unknown) => void;
  outline?: boolean;
}
interface Props {
  id: string;
  children: React.ReactNode;
  buttons?: {
    confirm: BaseModalButton;
    cancel?: BaseModalButton;
  };
  title?: string;
  maxSize?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";
}

export const Modal = ({
  id,
  title,
  buttons,
  children,
  maxSize = "3xl",
}: Props): JSX.Element => {
  const maxSizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
  };

  function getTailwindClasses() {
    const classes = [];

    if (maxSize && maxSizeClasses[maxSize]) {
      classes.push(maxSizeClasses[maxSize]);
    }

    return classes.join(" ");
  }

  const classes = getTailwindClasses();

  return (
    <dialog id={id} className="modal w-full">
      <Flex
        direction="col"
        className={`${classes} modal-box gap-4 w-full`}
        align="center"
        justify="center"
      >
        <Flex className="text-2xl font-semibold text-primary-500 w-full text-center">
          {title}
        </Flex>
        <Flex className="w-full overflow-hidden">{children}</Flex>
        <Flex className="gap-4 w-[100%] w-full" justify="center">
          {buttons?.cancel && (
            <Button
              className=" w-[48%]"
              variant={buttons.cancel.variant}
              onClick={buttons.cancel.callBack}
              label={buttons.cancel.content}
            />
          )}

          {buttons?.confirm && (
            <Button
              className="w-[48%]"
              variant={buttons.confirm.variant}
              onClick={buttons.confirm.callBack}
              label={buttons.confirm?.content}
            />
          )}
        </Flex>
      </Flex>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

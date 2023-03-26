import { forwardRef } from "react";
import clsxm from "~/utils";
import { TextInputHelper } from "./input-helper";

type InputProps = {
  error?: string;
} & JSX.IntrinsicElements["input"];

const TextField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, error, ...rest } = props;
  return (
    <div>
      <input
        ref={ref}
        className={clsxm(
          "h-12 w-full rounded-lg border border-red-1 px-3 font-semibold focus-within:outline-red-1 text-black",
          className
        )}
        {...rest}
      />
      <TextInputHelper className="pl-2 italic">&nbsp;{error}</TextInputHelper>
    </div>
  );
});

TextField.displayName = "TextField";

export { TextField };

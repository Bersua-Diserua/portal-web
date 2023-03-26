import { forwardRef } from "react";
import clsxm from "~/utils";
import { TextInputHelper } from "./input-helper";

type InputAuthenticationProps = {
  label: string;
  icon?: React.ReactNode;
  error?: string;
} & JSX.IntrinsicElements["input"];

const InputV1 = forwardRef<HTMLInputElement, InputAuthenticationProps>(
  (props, forwardedRef) => {
    const { icon, error, label, ...rest } = props;
    const hasIcon = !!icon;
    const isError = !!error;

    return (
      <div className="relative flex flex-col gap-1">
        <label
          className="w-max pl-2 text-sm text-[#8083A3] md:text-base"
          htmlFor={rest.name}
        >
          {label}
        </label>
        <div className="relative w-full">
          <input
            aria-label={label}
            id={rest.name}
            className={clsxm(
              "h-10 w-full appearance-none rounded-md border-b pb-2 pt-2 pl-2 pr-[2rem] font-bold text-red-1 outline-none placeholder:text-[#1A1C1D]/40 focus-within:outline-red-1",
              isError && "border-red-400"
            )}
            ref={forwardedRef}
            {...rest}
          />
          {hasIcon && (
            <i
              className={clsxm([
                "pointer-events-none absolute bottom-[.8rem] right-[.8rem] fill-black",
                isError && "fill-red-1",
              ])}
            >
              {icon}
            </i>
          )}
        </div>
        <TextInputHelper className="pl-2">&nbsp;{error}</TextInputHelper>
      </div>
    );
  }
);

InputV1.displayName = "InputV1";

export { InputV1 };

import clsxm from "~/utils";

type TextInputHelperProps = {
  children: React.ReactNode;
} & JSX.IntrinsicElements["p"];

export function TextInputHelper(props: TextInputHelperProps) {
  const { className, ...rest } = props;
  return (
    <p
      className={clsxm("text-xs font-semibold italic text-red-600", className)}
      role="note"
      {...rest}
    >
      {props.children}
    </p>
  );
}

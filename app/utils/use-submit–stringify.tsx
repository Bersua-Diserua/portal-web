import { useSubmit, type SubmitFunction } from "@remix-run/react";

export function useSubmitStringify() {
  const submit = useSubmit();

  return function (
    data: unknown,
    options: Parameters<SubmitFunction>["1"] = {}
  ) {
    return submit({ stringify: JSON.stringify(data) }, options);
  };
}

export async function parseStringify<TResult extends unknown = unknown>(
  request: Request
): Promise<TResult> {
  const formData = await request.formData();
  const stringify = formData.get("stringify");

  if (!stringify || typeof stringify !== "string")
    throw new Error(`typeof stringify is ${typeof stringify}`);

  return JSON.parse(stringify) as TResult;
}

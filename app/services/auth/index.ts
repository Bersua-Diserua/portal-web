import { api } from "../core";

export async function signin(payload: TObjUnknown) {
  const { data } = await api.post<TResponse<{ token: string }>>(
    "/auth/signin",
    {
      ...payload,
    }
  );

  return {
    token: data.payload.token,
  };
}

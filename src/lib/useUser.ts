import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

export default function useUser() {
  const { data, isError } = useQuery<IUser>(["me"], getMe, {
    retry: false,
  });

  return {
    user: data,
    isLoggedIn: !isError,
  };
}

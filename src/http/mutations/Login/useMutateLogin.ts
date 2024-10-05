import { AxiosError, AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { api } from "../../axios/auth";
import { MutationError } from "../../../interfaces/Mutation";

interface LoginBody {
  username: string;
  password: string;
}

export function useMutateLogin({
  options,
}: {
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError<MutationError>,
    LoginBody,
    string[]
  >;
}): UseMutationResult<AxiosResponse, AxiosError, LoginBody, unknown> {
  return useMutation((data: LoginBody) => api.post(`/login/`, data), options);
}

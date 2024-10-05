import { AxiosError, AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { api } from "../../axios/auth";
import { MutationError } from "../../../interfaces/Mutation";
import { CartItem } from "../../../interfaces/Cart";

interface CartBody {
  items: CartItem[];
}

export function useMutateCart({
  userId,
  options,
}: {
  userId: number;
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError<MutationError>,
    CartBody,
    string[]
  >;
}): UseMutationResult<AxiosResponse, AxiosError, CartBody, unknown> {
  return useMutation(
    (data: CartBody) => api.put(`/cart/${userId}/`, data),
    options
  );
}

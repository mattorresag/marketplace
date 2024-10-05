import { AxiosError, AxiosResponse } from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { api } from "../../axios/auth";
import { MutationError } from "../../../interfaces/Mutation";

export function useMutatePurchaseHistory({
  options,
}: {
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError<MutationError>,
    FormData,
    string[]
  >;
}): UseMutationResult<AxiosResponse, AxiosError, FormData, unknown> {
  return useMutation(
    (data: FormData) =>
      api.post(`/purchase_history/import_xml/`, data, {
        headers: {
          "Content-Type": "application/xml",
        },
      }),
    options
  );
}

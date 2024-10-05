import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getUserData } from "../../queries/user/getUserData";
import { IAuthContextUser } from "../../../interfaces/User";
import { token } from "../../queries/token";

export function useUserData({
  userId,
  options,
}: {
  userId: number;
  options?: UseQueryOptions<
    { resources: IAuthContextUser },
    unknown,
    { resources: IAuthContextUser },
    string[]
  >;
}): UseQueryResult<{ resources: IAuthContextUser }> {
  return useQuery(
    ["userData", `${userId}`],
    async () => getUserData({ userId, token: token() }),
    options
  );
}

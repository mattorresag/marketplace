import { useContext } from "react";
import useCheckAuth from "../../utils/hooks/useAuth";
import { AuthContext } from "../../provider/Auth/AuthContext";
import { useRouter } from "next/router";
import { pagesAllowedWithoutLogin } from "../../utils/constants/routes";
import PageLoading from "../../components/PageLoading";

export const CookieAuthenticator = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading } = useCheckAuth();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (isLoading) return <PageLoading />;
  if (
    !isLoading &&
    !user &&
    !pagesAllowedWithoutLogin.includes(router.route) &&
    router.route !== "/login"
  )
    router.replace("/login");

  return children;
};

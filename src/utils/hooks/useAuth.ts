import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/Auth/AuthContext";
import { token } from "../../http/queries/token";
import { getCookie } from "cookies-next";
import { Company } from "../../interfaces/User";
import { getUserCompanies } from "../../http/queries/company/getUserCompanies";

function useCheckAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const { handleSetUser, handleSetSelectedCompany, user } =
    useContext(AuthContext);
  const company = JSON.parse(
    (getCookie("@ecommerce/company") || "{}") as unknown as string
  ) as unknown as Company;

  async function checkAuthentication() {
    setIsLoading(true);
    await axios
      .get("/api/auth")
      .then(async (response) => {
        if (token() && company) {
          const companies = !user?.companies
            ? await getUserCompanies({ token: token() }).then(
                (response) => response
              )
            : user?.companies;
          handleSetUser({
            ...response.data.user,
            companies,
          });
          handleSetSelectedCompany(company);
        } else {
          console.error("Token not found in cookie");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
  };
}

export default useCheckAuth;

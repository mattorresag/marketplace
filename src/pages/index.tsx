import type { GetServerSideProps, NextPage } from "next";
import { Flex } from "../components/Flex";
import { Layout } from "../components/Layout";
import { PageTitle } from "../components/Layout/PageTitle";
import { Categories } from "../features/Offer/Categories";
import { useContext, useState } from "react";
import { getBaskets } from "../http/queries/basket/getBaskets";
import { Company } from "../interfaces/User";
import { useBaskets } from "../http/hooks/basket/useBaskets";
import { AuthContext } from "../provider/Auth/AuthContext";
import { BaseCard } from "../components/Card/BaseCard";
import { Baskets } from "../features/Offer/Baskets";

const Explorar: NextPage = () => {
  const [selectedToggle, setSelectedToggle] = useState<string>("cestas");
  const { selectedCompany } = useContext(AuthContext);
  const { data } = useBaskets({
    companyId: selectedCompany?.id || 0,
    options: {
      refetchOnWindowFocus: false,
      enabled: !!selectedCompany,
    },
  });
  return (
    <Layout subtitle="Explorar" align="start">
      <Flex className="w-full h-full mt-8" justify="center" align="center">
        <Flex direction="col" justify="center" className="w-full">
          <Flex className="w-full items-center">
            <Flex
              justify="center"
              className="w-full relative flex-col lg:flex-row gap-4"
              align="center"
            >
              <h1 className="text-center text-4xl lg:text-start lg:text-5xl font-bold text-primary-500">
                {selectedToggle === "cestas"
                  ? "Recomendações de compra"
                  : "Ofertas"}
              </h1>
              <Flex
                className="lg:absolute lg:right-0 gap-4"
                align="center"
                justify="center"
              >
                <span className="text-primary-500 text-lg font-bold">
                  Cestas
                </span>
                <input
                  className="toggle toggle-primary"
                  type="checkbox"
                  onChange={() =>
                    setSelectedToggle(
                      selectedToggle === "cestas" ? "ofertas" : "cestas"
                    )
                  }
                  checked={selectedToggle === "ofertas"}
                />
                <span className="text-primary-500 text-lg font-bold">
                  Ofertas
                </span>
              </Flex>
            </Flex>
          </Flex>
          <div className="divider" />
          {selectedToggle === "cestas" ? (
            <Baskets
              handleToggle={() => setSelectedToggle("ofertas")}
              baskets={data}
            />
          ) : (
            <Categories />
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Explorar;

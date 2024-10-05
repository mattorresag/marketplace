import Link from "next/link";
import { Flex } from "../Flex";
import { LogoutButton } from "./Buttons/LogoutButton";

const NavigationMenu = () => {
  return (
    <Flex
      className="h-full
        mx-4
        text-primary-500
        divide-y-2
        divide-primary-500
        md:divide-y-0
        md:divide-transparent"
    >
      <Flex
        align="center"
        id="products-menu-item"
        className="        py-4
        hover:bg-secondary-500
        hover:text-white

        text-sm
        md:px-4
        md:py-1
        text-primary-500"
      >
        <Link href="/">
          <a>Ofertas</a>
        </Link>
      </Flex>

      {/* <div id="products-menu-item" className="main-menu-item">
                <Link href="/favorites">
                    <a>Lista de favoritos</a>
                </Link>
            </div> */}
      <Flex
        align="center"
        id="products-menu-item"
        className="py-4
        text-sm
        md:px-4
        md:py-1
        hover:text-white
        hover:bg-secondary-500
        text-primary-500"
      >
        <Link href="/pedidos">
          <a>Meus Pedidos</a>
        </Link>
      </Flex>

      <Flex
        align="center"
        className="py-4
        text-sm
        md:px-4
        md:py-1
        hover:bg-secondary-500
        hover:text-white
        text-primary-500 md:ml-auto"
      >
        <LogoutButton />
      </Flex>
    </Flex>
  );
};

export default NavigationMenu;

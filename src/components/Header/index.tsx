import React, { useContext } from "react";
import { Flex } from "../Flex";
import Logo from "../Logo";
import { AuthContext } from "../../provider/Auth/AuthContext";
import { Avatar } from "../Avatar";
import { CompanySwitcher } from "./CompanySwitcher";
import { BurgerMenu } from "./BurgerMenu";
import { Sidebar } from "./Sidebar";
import NavigationMenu from "./NavigationMenu";
import { useRouter } from "next/router";
import { CartButton } from "./Buttons/CartButton";
import ProductsSearchInput from "./Search/ProductsSearch";

export const Header = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Flex className="shadow-xl sticky top-0 z-50 invisible hidden lg:visible lg:block">
        <nav className="bg-primary-500 flex items-center h-[89px] justify-center md:px-4 py-4">
          <Flex align="center" className="w-[100%] max-w-[1120px] gap-8">
            <Flex className="w-[13%] justify-center">
              <Logo url="/" height={100} alternative="fullWhite" />
            </Flex>
            <Flex
              className={`${
                user?.companies && user?.companies?.length > 1
                  ? "w-[32%]"
                  : "w-[58%]"
              } justify-center`}
            >
              <ProductsSearchInput />
            </Flex>
            {user?.companies && user?.companies.length > 1 && (
              <CompanySwitcher />
            )}
            <Flex className="w-[18%] justify-center items-center gap-2">
              <Avatar userName={user?.first_name || ""} />
              <p className="text-white">{user?.first_name}</p>
            </Flex>
            <Flex className="w-[10%] justify-center">
              <CartButton />
            </Flex>
          </Flex>
        </nav>
        <Flex
          className="    bg-white
        text-primary-500
        flex
        items-center
        justify-center
        px-4"
        >
          <div
            className="max-w-6xl
      flex-grow
      h-12"
          >
            <NavigationMenu />
          </div>
        </Flex>
      </Flex>
      <Flex
        className="   
        drawer   
      shadow-xl
       sticky
       top-0
       z-50
       lg:invisible
       lg:hidden"
      >
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <nav
          className="bg-primary-500
        drawer-content
        w-full
        flex
        items-center
        justify-center
        md:px-4"
        >
          <Flex direction="col" className="flex-grow relative top-0 p-4 gap-4">
            <Flex
              align="center"
              justify="center"
              className={`transition-all relative`}
            >
              <Logo url="/" height={33} alternative="fullWhite" />
              <span className=" absolute left-0">
                <CartButton />
              </span>
              <span className="mt-[-6px] absolute right-0">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-primary drawer-button"
                >
                  <BurgerMenu />
                </label>
              </span>
            </Flex>
            <Flex align="center">
              <ProductsSearchInput />
            </Flex>
          </Flex>
        </nav>
        <Sidebar />
      </Flex>
    </>
  );
};

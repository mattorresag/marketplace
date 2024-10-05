import React, { useContext } from "react";
import { AuthContext } from "../../../provider/Auth/AuthContext";
import { Flex } from "../../Flex";
import Icons from "../../../../public/assets/images/icons";

export const LogoutButton = (): JSX.Element => {
  const { logout } = useContext(AuthContext);
  return (
    <button onClick={logout}>
      <Flex className="gap-2" align="center">
        <span>Sair</span>
        <Icons.ArrowRight className="w-[1rem] h-[1rem]" />
      </Flex>
    </button>
  );
};

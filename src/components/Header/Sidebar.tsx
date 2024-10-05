import { useContext } from "react";
import { Avatar } from "../Avatar";
import { Flex } from "../Flex";
import { AuthContext } from "../../provider/Auth/AuthContext";
import { MobileCompanySwitcher } from "./MobileCompanySwitcher";
import { LogoutButton } from "./Buttons/LogoutButton";

export const Sidebar = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 max-w-[65%] min-h-full bg-base-100 text-base-content flex flex-col justify-between">
        <Flex direction="col">
          <li>
            <Flex className="items-center gap-2">
              <Avatar userName={user?.first_name || ""} />
              <p className="text-neutral-500">
                <strong>{user?.first_name}</strong>
              </p>
            </Flex>
          </li>
          <li>
            <MobileCompanySwitcher />
          </li>
        </Flex>
        <Flex className="p-4">
          <LogoutButton />
        </Flex>
      </ul>
    </div>
  );
};

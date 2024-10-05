import { Order } from "../../../../interfaces/Order";
import { useDeviceType } from "../../../../utils/hooks/useDeviceType";
import { DesktopOrderListItem } from "./DesktopOrderListItem";
import { MobileOrderListItem } from "./MobileOrderListItem";

interface Props {
  order: Order;
}

export const OrderListItem = ({ order }: Props) => {
  const { isDesktop } = useDeviceType();

  return isDesktop ? (
    <DesktopOrderListItem order={order} />
  ) : (
    <MobileOrderListItem order={order} />
  );
};

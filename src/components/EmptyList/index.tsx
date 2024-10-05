import { useRouter } from "next/router";
import Image from "next/image";

import EmptyListBanner from "/public/assets/images/illustrations/empty_requests.png";
import { Flex } from "../../components/Flex";
import { Button } from "../../components/Button";
interface Props {
  title: string;
  buttonLabel: string;
  route?: string;
  children?: React.ReactNode;
  buttonCallback?: () => void;
}
export const EmptyList = ({
  title,
  buttonLabel,
  children,
  route = "/",
  buttonCallback,
}: Props) => {
  const router = useRouter();
  const handleGoToPage = () => router.push(route);
  return (
    <Flex
      direction="col"
      justify="center"
      align="center"
      className="flex-1 w-full"
    >
      <Flex align="center" justify="center" className="w-full max-md:flex-col">
        <Flex className="md:w-[70%]">
          <Image
            quality="100"
            unoptimized
            alt="imagem de lista vazia"
            src={EmptyListBanner}
          />
        </Flex>
        <Flex direction="col" className="gap-4 md:w-[30%]">
          <Flex direction="col" className="gap-2">
            <h2 className="font-bold text-2xl text-neutral-900">{title}</h2>
            {children}
          </Flex>
          <Button
            onClick={() =>
              buttonCallback ? buttonCallback() : handleGoToPage()
            }
            label={buttonLabel}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

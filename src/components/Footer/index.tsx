import Link from "next/link";

import InstagramLogo from "/public/assets/images/icons/instagram.svg?svgr";
import LinkedinLogo from "/public/assets/images/icons/linkedin.svg?svgr";
import Logo from "../Logo";
import { Flex } from "../Flex";

const Footer = () => {
  return (
    <footer className="static bottom-0 z-50 font-source-sans-pro">
      <Flex
        direction="col"
        align="center"
        justify="center"
        className="bg-primary-500 text-white pt-16 pb-8 px-4"
      >
        <div className="w-full max-w-6xl">
          <div className="md:grid md:grid-cols-3 md:gap-6 ">
            <div>
              <div>
                <Logo height={33} url="/" alternative="white" />
                <h4 className="font-bold text-base  text-white">
                  Dúvidas? Fale conosco
                </h4>
                <Flex direction="col">
                  <span>+55 27 99639-3006</span>
                  <span>
                    <a href="mailto:contato@ecommerce.com.br">
                      contato@ecommerce.com.br
                    </a>
                  </span>
                </Flex>
              </div>
            </div>
            <div>
              <Flex direction="col">
                <h4 className="font-bold text-base text-white mb-6 mt-3">
                  Links úteis
                </h4>

                <Link
                  href="https://ecommerce.com.br/#perguntas-frequentes"
                  target="_blank"
                >
                  <a>Perguntas Frequentes</a>
                </Link>
                <Link
                  href="https://ecommerce.com.br/termos-de-uso/"
                  target="_blank"
                >
                  <a>Termos de uso</a>
                </Link>
                <Link
                  href="https://ecommerce.com.br/privacy-policy/"
                  target="_blank"
                >
                  <a>Políticas de privacidade</a>
                </Link>
              </Flex>
            </div>
            <div>
              <h4 className="font-bold mb-6 mt-3">
                Nos acompanhe nas redes sociais
              </h4>
              <Flex align="center" className="text-white  font-normal">
                <Link
                  href="https://www.instagram.com/ecommercebr/"
                  target="_blank"
                >
                  <a className="mr-3">
                    <InstagramLogo alt="Redes Sociais" />
                  </a>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/ecommerce-tech"
                  target="_blank"
                >
                  <a className="mr-3">
                    <LinkedinLogo alt="Redes Sociais" />
                  </a>
                </Link>
              </Flex>
            </div>
          </div>
          <div className="flex items-center justify-center text-white flex-col w-full mt-3 pt-3 border-t-2 border-t-primary-500 md:border-t-transparent ">
            <p className="text-white align-center font-source-sans-pro ">
              AV. Jerônimo Monteiro, 1000 – Vitória, ES – 29.010-002
            </p>
            <p className="text-white align-center font-source-sans-pro  ">
              © 2022 Rede de Tecnologia para Padarias LTDA. 40.079.793/0001-09
            </p>
          </div>
        </div>
      </Flex>
    </footer>
  );
};

export default Footer;

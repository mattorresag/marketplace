import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { AuthContext } from "../provider/Auth/AuthContext";
import { useMutateLogin } from "../http/mutations/Login/useMutateLogin";
import { Flex } from "../components/Flex";
import { useDeviceType } from "../utils/hooks/useDeviceType";
import Logo from "../components/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form/dist/types";
import { InferType } from "yup";
import { loginSchema } from "../features/Login/schema";
import FormTextField from "../components/FormTextField";
import CircularProgress from "../components/CircularProgress";
import { setCookie } from "cookies-next";
import PageMeta from "../components/PageMeta";
import { Button } from "../components/Button";

type IFormValues = InferType<typeof loginSchema>;

const Login: NextPage = () => {
  const { user, handleLogin, selectedCompany, handleSetSelectedCompany } =
    useContext(AuthContext);
  const { isTablet } = useDeviceType();
  const [companyId, setCompanyId] = useState<number>(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const router = useRouter();

  const { mutateAsync: loginUser, isLoading } = useMutateLogin({});

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    await loginUser({
      username: data.username,
      password: data.password,
    })
      .then(async (response) => {
        const { token, clients } = response.data;
        await handleLogin({ token, clients }).then(() => {
          if (clients.length === 1) {
            handleSetSelectedCompany(clients[0]);
            setCookie("@ecommerce/company", clients[0]);
            router.push("/");
          }
        });
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Ocorreu um erro ao realizar login"
        );
      });
  };

  const handleUserCompanies = () => {
    const company = user?.companies.find((company) => company.id === companyId);
    if (!company) return;
    handleSetSelectedCompany(company);
    setCookie("@ecommerce/company", company);
    router.push("/");
  };

  useEffect(() => {
    if (user && selectedCompany) {
      router.push("/");
    }
  }, [user, router, selectedCompany]);

  return (
    <>
      <PageMeta subtitle="Login" />
      <Flex
        justify="center"
        className="h-screen bg-background-login
          bg-no-repeat
          bg-cover
          bg-center"
      >
        <Flex
          justify="center"
          direction={isTablet ? "row" : "col"}
          align="center"
          className="w-[100%]"
        >
          <Flex justify="center" className="w-[100%] md:gap-24">
            {isTablet && (
              <Flex className=" md:w-[60%] items-end" justify="center">
                <Flex className="md:w-[100%] xl:w-[90%] 2xl:w-[70%]">
                  <h3 className="text-white font-bold font-source-sans-pro px-4 text-6xl">
                    O parceiro de compras a favor do seu bolso
                  </h3>
                </Flex>
              </Flex>
            )}
            <Flex className="w-[100%] px-4 md:w-[40%] justify-center md:justify-start">
              <Flex
                justify="center"
                align="center"
                direction="col"
                className="w-[100%] h-fit rounded-2xl bg-white shadow-lg py-8 px-8 max-w-sm"
              >
                <Logo height={48} url="/login" alternative="bicolor" />

                {user?.companies && !selectedCompany ? (
                  <Flex direction="col" className="w-full">
                    <Flex
                      direction="col"
                      className="my-4 items-center font-source-sans-pro"
                    >
                      <h2 className="text-neutral-900 text-2xl    font-source-sans-pro font-semibold   ">
                        Para qual padaria quer realizar a compra primeiro?
                      </h2>
                      <p className="text-neutral-600 text-base font-source-sans-pro">
                        Selecione uma de suas padarias abaixo para ver o valor
                        atualizado de cada produto para a sua região.
                      </p>
                    </Flex>
                    <select
                      value={companyId}
                      onChange={(e) => setCompanyId(Number(e.target.value))}
                      className="text-black select w-[100%] border-neutral-300 border-2"
                    >
                      <option value={0} disabled>
                        Selecione uma padaria
                      </option>
                      {user.companies.map((company) => {
                        return (
                          <option key={company.id} value={company.id}>
                            {company.company_name}
                          </option>
                        );
                      })}
                    </select>
                    <Flex justify="center" className="mt-4">
                      <Button onClick={handleUserCompanies} label="Entrar" />
                    </Flex>
                  </Flex>
                ) : (
                  <Flex direction="col" className="w-full">
                    <Flex
                      justify="center"
                      className="my-4 font-source-sans-pro"
                    >
                      <h2 className="text-neutral-900 text-2xl font-source-sans-pro font-bold   ">
                        Bem-vindo!
                      </h2>
                    </Flex>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Flex direction="col" className="gap-4">
                        <Flex direction="col">
                          <FormTextField
                            control={control}
                            name="username"
                            errors={errors}
                            className="w-[100%]"
                            label="Nome de Usuário"
                            placeholder="Digite seu nome de usuário"
                          />
                        </Flex>
                        <Flex direction="col" className="gap-1">
                          <FormTextField
                            name="password"
                            label="Senha"
                            className="w-[100%]"
                            control={control}
                            errors={errors}
                            type="password"
                            placeholder="Digite sua senha"
                          />
                          <Flex justify="center">
                            <Link href="/forgotPassword">
                              <a className="text-neutral-500 text-sm ">
                                Esqueci minha senha
                              </a>
                            </Link>
                          </Flex>
                        </Flex>

                        <Flex justify="center" className="mt-4">
                          {isLoading ? (
                            <CircularProgress size={80} />
                          ) : (
                            <Button
                              label="Entrar"
                              variant="primary"
                              type="submit"
                            />
                          )}
                        </Flex>
                      </Flex>
                    </form>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;

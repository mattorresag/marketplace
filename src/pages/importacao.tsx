import React, { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { Flex } from "../components/Flex";
import { NextPage } from "next";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import { AuthContext } from "../provider/Auth/AuthContext";
import { useRouter } from "next/router";
import { useMutatePurchaseHistory } from "../http/mutations/XML/useMutatePurchaseHistory";

const Importacao: NextPage = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files : null;
    setSelectedFile(file);
  };

  const { mutateAsync, isLoading } = useMutatePurchaseHistory({});

  const handleSubmit = async () => {
    if (selectedFile && selectedFile.length > 0) {
      const formData = new FormData();

      // Loop over each file in the FileList and append to FormData
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append(`file${i}`, selectedFile[i]);
      }

      await mutateAsync(formData)
        .then((response) => {
          toast.success("XMLs importados com sucesso!");
          if (response?.data?.has_registration.length > 0) {
            toast.warning(
              `${response?.data?.has_registration.length} produtos já estavam cadastrados e não foram importados`
            );
          }
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        })
        .catch(() => {
          toast.error("Ocorreu um erro ao importar os XMLs");
        });
    }
  };

  useEffect(() => {
    //change this later
    if (!user?.is_superuser) {
      toast.error("Você não tem permissão para acessar essa página");
      router.push("/");
    }
  }, [router, user]);

  return (
    <Layout>
      <Flex
        className="w-full h-[100vh] mt-[-89px]"
        justify="center"
        align="center"
      >
        <Flex direction="col" className="gap-8 w-full md:w-[800px] px-4">
          <h1 className="text-4xl text-primary-500">
            <strong>Importar XML</strong>
          </h1>
          <input
            ref={fileInputRef}
            className="file-input file-input-primary w-full"
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            multiple
          />
          <Button label="Upload" disabled={isLoading} onClick={handleSubmit} />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Importacao;

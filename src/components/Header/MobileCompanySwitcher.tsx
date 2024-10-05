import React, { useContext, useState } from "react";
import { Flex } from "../Flex";
import { AuthContext } from "../../provider/Auth/AuthContext";
import { Modal } from "../Modal";
import { useModal } from "../../utils/hooks/useModal";
import { Company } from "../../interfaces/User";

export const MobileCompanySwitcher = (): JSX.Element => {
  const { user, selectedCompany, handleSetSelectedCompany } =
    useContext(AuthContext);
  const [selected, setSelected] = useState<Company | null>(selectedCompany);

  const { openModal, closeModal } = useModal({
    modalId: "mobileCompanySwitcher",
  });

  const handleConfirm = () => {
    handleSetSelectedCompany(selected);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Flex className="w-[100%] lg:w-[23%] justify-center">
      <select
        value={selectedCompany?.id}
        onChange={(e) => {
          const selected = user?.companies?.find(
            (company) => company.id === Number(e.target.value)
          );
          if (selected) {
            setSelected(selected);
            openModal();
          }
        }}
        className="text-white select w-[100%] bg-primary-500 border-white border-2"
      >
        {user?.companies?.map((company) => (
          <option key={company.id} value={company.id}>
            {company.company_name}
          </option>
        ))}
      </select>
      <Modal
        id="mobileCompanySwitcher"
        title="Quer fazer o pedido em outra padaria?"
        maxSize="xl"
        buttons={{
          confirm: {
            content: "Mudar de Padaria",
            variant: "primary",
            callBack: handleConfirm,
          },
          cancel: {
            content: "Continuar na Atual",
            variant: "secondary",
            callBack: handleCancel,
            outline: true,
          },
        }}
      >
        <p className="font-normal text-neutral-700 text-center">
          Não se preocupe, os produtos adicionados ao carrinho continuarão
          salvos nesse perfil para que você navegue livremente entre suas
          padarias.
        </p>
      </Modal>
    </Flex>
  );
};

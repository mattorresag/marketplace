import { useCallback } from "react";
interface Props {
  modalId: string;
}
export const useModal = ({ modalId }: Props) => {
  const openModal = useCallback(() => {
    if (window[modalId] && window[modalId].showModal) {
      window[modalId].showModal();
    }
  }, [modalId]);

  const closeModal = useCallback(() => {
    if (window[modalId] && window[modalId].close) {
      window[modalId].close();
    }
  }, [modalId]);

  return {
    openModal,
    closeModal,
  };
};

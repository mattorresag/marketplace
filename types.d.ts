interface ModalMethods {
  showModal: () => void;
  close: () => void;
}

interface Window {
  [key: string]: any | ModalMethods;
}

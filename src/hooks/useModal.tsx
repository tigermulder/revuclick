// src/hooks/useModal.ts

import { useRecoilState } from "recoil"
import { modalState } from "@/store/modal-recoil"
import { ModalType, BaseModalProps } from "@/types/component-types/modal-type"

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalState)

  const openModal = (type: ModalType, props: Partial<BaseModalProps> = {}) => {
    setModal({
      isOpen: true,
      type,
      props,
    })
  }

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: null,
      props: {},
    })
  }

  return { modal, openModal, closeModal }
}
export default useModal

import { useState } from "react"

export const useModalState = () => {
    const [modalState, setModalState ] = useState(false)

    const handleModalOnOpen = () => {
        setModalState(true)
    }

    const handleModalOnClose = () => {
        setModalState(false)
    }


    return {
        modalState,
        handleModalOnOpen,
        handleModalOnClose,
    }
}
import { useState, useCallback } from 'react';

type ModalType = 'paused' | 'win' | 'lose';

export function useModalState() {
    const [modalState, setModalState] = useState<{ isOpen: boolean; type: ModalType }>({
        isOpen: false,
        type: 'paused'
    });

    const openModal = useCallback((type: ModalType) => {
        setModalState({ isOpen: true, type });
    }, []);

    const closeModal = useCallback(() => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    }, []);

    return { modalState, openModal, closeModal };
}
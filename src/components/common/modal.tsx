'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

type Props = {
   isOpen: boolean;
   onClose: () => void;
   title: string;
   children: React.ReactNode;
   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

const CustomModal = ({
   children,
   isOpen,
   onClose,
   title,
   size = 'xs',
}: Props) => {
   return (
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
         <ModalContent>
            <ModalHeader className="border-b">
               <h3 className="text-xl text-background font-semibold">
                  {title}
               </h3>
            </ModalHeader>
            <ModalBody className="space-y-4 py-6">{children}</ModalBody>
         </ModalContent>
      </Modal>
   );
};

export default CustomModal;

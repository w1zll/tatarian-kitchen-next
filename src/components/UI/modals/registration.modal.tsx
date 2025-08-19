import CustomModal from '@/components/common/modal';
import RegistrationForm from '@/forms/registration.form';

type Props = {
   isOpen: boolean;
   onClose: () => void;
};

const RegistrationModal = ({ isOpen, onClose }: Props) => {
   return (
      <CustomModal isOpen={isOpen} onClose={onClose} title="Создать аккаунт">
         <RegistrationForm onClose={onClose} />
      </CustomModal>
   );
};

export default RegistrationModal;

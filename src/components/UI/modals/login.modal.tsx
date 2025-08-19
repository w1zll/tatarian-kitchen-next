import CustomModal from '@/components/common/modal';
import LoginForm from '@/forms/login.form';

type Props = {
   isOpen: boolean;
   onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: Props) => {
   return (
      <CustomModal isOpen={isOpen} onClose={onClose} title="Авторизация">
         <LoginForm onClose={onClose} />
      </CustomModal>
   );
};

export default LoginModal;

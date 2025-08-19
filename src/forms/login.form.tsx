'use client';
import { signInWithCredentials } from '@/actions/sign-in';
import { useAuthStore } from '@/store/auth.store';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { getSession } from 'next-auth/react';
import React from 'react';

type Props = {
   onClose: () => void;
};

const LoginForm = ({ onClose }: Props) => {
   const [formData, setFormData] = React.useState({
      email: '',
      password: '',
   });
   const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
   const { setAuthState } = useAuthStore();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrorMessage(null); // сбрасываем старую ошибку

      const result = await signInWithCredentials(
         formData.email,
         formData.password
      );

      if (result?.error) {
         setAuthState('unauthenticated', null);
         setErrorMessage('Неверный логин или пароль');
         return;
      }

      const session = await getSession();
      if (session) {
         setAuthState('authenticated', session);
      } else {
         setAuthState('unauthenticated', null);
      }

      console.log('Авторизация выполнена');
      onClose();
   };

   return (
      <div>
         <Form className="w-full max-w-xs" onSubmit={handleSubmit}>
            <Input
               aria-label="Email"
               isRequired
               name="email"
               placeholder="Введите email"
               type="email"
               value={formData.email}
               classNames={{
                  inputWrapper: 'bg-default-100',
                  input: 'text-sm focus:outline-none',
               }}
               onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
               }
            />
            <Input
               isRequired
               aria-label="Password"
               name="password"
               placeholder="Введите пароль"
               type="password"
               value={formData.password}
               classNames={{
                  inputWrapper: 'bg-default-100',
                  input: 'text-sm focus:outline-none',
               }}
               onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
               }
            />

            {errorMessage && (
               <p className="text-red-500 text-sm pt-2">{errorMessage}</p>
            )}

            <div className="flex w-full gap-4 items-center pt-8 justify-end">
               <Button variant="light" onPress={onClose}>
                  Отмена
               </Button>
               <Button color="primary" type="submit">
                  Войти
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default LoginForm;

'use client';
import { registerUser } from '@/actions/register';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import React from 'react';

type Props = {
   onClose: () => void;
};

const RegistrationForm = ({ onClose }: Props) => {
   const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      confirmPassword: '',
   });
   const validateEmail = (email: string) => {
      const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return reg.test(email.toLowerCase());
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Form submitted:', formData);

      const result = await registerUser(formData);
      console.log(result);
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
               validate={(value) => {
                  if (!value) return 'Почта обязательна';
                  if (!validateEmail(value)) return 'Некоректный email';
                  return null;
               }}
               // errorMessage="Please enter a valid email"
               // label="Email"
               // labelPlacement="outside"
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
               validate={(value) => {
                  if (!value) return 'Пароль обязателен';
                  if (value.length < 6)
                     return 'Пароль должен быть не менее 6 символов';
                  return null;
               }}
            />
            <Input
               aria-label="confirmPassword"
               name="confirmPassword"
               placeholder="Подтвердите пароль"
               type="password"
               value={formData.confirmPassword}
               classNames={{
                  inputWrapper: 'bg-default-100',
                  input: 'text-sm focus:outline-none',
               }}
               onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
               }
               validate={(value) => {
                  if (!value) return 'Пароль для подтверждения обязателен';
                  if (value !== formData.password) return 'Пароли не совпадают';
                  return null;
               }}
            />
            <div className="flex w-full gap-4 items-center pt-8 justify-end">
               <Button variant="light" onPress={onClose}>
                  Отмена
               </Button>
               <Button color="primary" type="submit">
                  Зарегистрироваться
               </Button>
            </div>
         </Form>
      </div>
   );
};

export default RegistrationForm;

import { RegisterForm } from '@/components/register/register-form';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10 border-">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}

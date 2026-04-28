import RegisterForm from '@/src/components/auth/register/RegisterForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      <RegisterForm />
    </div>
  );
}
import AppHeader from '@/src/components/ui/layout/AppHeader';
import AppFooter from '@/src/components/ui/layout/AppFooter';
import RegisterForm from '@/src/components/auth/register/RegisterForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      <AppHeader />
      <RegisterForm />
      <AppFooter />
    </div>
  );
}
import AppHeader from '@/src/components/ui/layout/AppHeader';
import AppFooter from '@/src/components/ui/layout/AppFooter';
import LoginForm from '@/src/components/auth/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      <AppHeader />
      <LoginForm />
      <AppFooter />
    </div>
  );
}
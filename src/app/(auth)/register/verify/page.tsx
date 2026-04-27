'use client';

import { useRouter } from 'next/navigation';
import OtpForm from '@/src/components/auth/otp/OtpForm';

export default function RegisterVerifyPage() {
  const router = useRouter();
  return (
    <OtpForm
      mode="signup"
      phoneNumber="069888999"
      onBack={() => router.push('/register')}
      onSuccess={() => router.push('/dashboard')}
    />
  );
}

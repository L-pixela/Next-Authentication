'use client';

import { useRouter } from 'next/navigation';
import OtpForm from '@/src/components/auth/otp/OtpForm';

export default function ResetPasswordVerifyPage() {
  const router = useRouter();
  return (
    <OtpForm
      mode="reset-password"
      phoneNumber="069888999"
      onBack={() => router.push('/forgot-password')}
      onSuccess={() => router.push('/reset-password')}
    />
  );
}

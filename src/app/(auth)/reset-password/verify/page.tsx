"use client";

import OtpForm from '@/src/components/auth/otp/OtpForm';
import router from 'next/router';

export default function ResetOtpPage() {
  return (
    <OtpForm
      mode="reset-password"
      phoneNumber="069888999"
      onBack={() => router.push('/forgot-password')}
      onSuccess={() => router.push('/reset-password')}
    />
  );
}
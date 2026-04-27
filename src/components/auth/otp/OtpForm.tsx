'use client';
import { useState, useEffect } from 'react';
import { Grid, Row, Col, Button, PinInput } from 'rsuite';
import { FaChevronLeft } from 'react-icons/fa';
import styles from '../auth.module.css';
import { useOtpVerify } from '@/src/modules/auth/hooks';

type OtpMode = 'signup' | 'reset-password';

interface OtpFormProps {
  mode: OtpMode;
  phoneNumber: string;
  onBack: () => void;
  onSuccess: () => void;
}

const OTP_LENGTH = 4;
const RESEND_SECONDS = 110;

export default function OtpForm({ mode, phoneNumber, onBack, onSuccess }: OtpFormProps) {
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const { verify, resend, loading, error } = useOtpVerify(phoneNumber);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleResend = async () => {
    setValue('');
    setTimer(RESEND_SECONDS);
    await resend();
  };

  const handleSubmit = async () => {
    if (value.length < OTP_LENGTH) return;
    const ok = await verify(value);
    if (ok) onSuccess();
  };

  const title = mode === 'signup' ? 'Sign up' : 'Reset Password';

  return (
    <div className={styles.page}>
      <Grid fluid>
        <Row className={styles.row}>
          <Col xs={22} sm={18} md={14} lg={10} xl={8}>
            <div className={styles.card}>

              <button className={styles.backLink} onClick={onBack} type="button">
                <FaChevronLeft size={12} />
                Back
              </button>

              <div className={styles.headerCenter}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>
                  We have sent you an SMS with the code to your phone number{' '}
                  <strong>{phoneNumber}</strong>
                </p>
              </div>

              {/* ── PinInput ── */}
              <div className={styles.otpGroup}>
                <PinInput
                  value={value}
                  length={OTP_LENGTH}
                  onChange={(val) => setValue(val)}
                  type="number"
                  size="lg"
                  mask={false}
                />
              </div>

              {error && <p className={styles.otpErrorText}>{error}</p>}

              <div className={styles.otpMeta}>
                {timer > 0 ? (
                  <span>Resend code in: <strong>{formatTime(timer)}</strong></span>
                ) : (
                  <button className={styles.resendBtn} onClick={handleResend} type="button">
                    Resend code
                  </button>
                )}
              </div>

              <Button
                appearance="primary"
                block
                className={styles.submitBtn}
                onClick={handleSubmit}
                loading={loading}
                disabled={value.length < OTP_LENGTH || loading}
              >
                Continue
              </Button>

            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
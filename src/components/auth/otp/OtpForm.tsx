'use client';
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Grid, Row, Col, Button } from 'rsuite';
import { FaChevronLeft } from 'react-icons/fa';
import styles from '../auth.module.css';

// ─── Props ───────────────────────────────────────────────
type OtpMode = 'signup' | 'reset-password';

interface OtpFormProps {
  mode: OtpMode;           // controls title + post-submit behavior
  phoneNumber: string;     // e.g. "069888999"
  onBack: () => void;      // navigate back
  onSuccess: () => void;   // navigate forward after verified
}

const OTP_LENGTH = 4;
const RESEND_SECONDS = 110; // 01:50

// ─── Component ───────────────────────────────────────────
export default function OtpForm({ mode, phoneNumber, onBack, onSuccess }: OtpFormProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Countdown timer ──────────────────────────────────
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

  // ── Input handlers ───────────────────────────────────
  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    const cleaned = value.replace(/\D/g, '').slice(-1);
    const updated = [...digits];
    updated[index] = cleaned;
    setDigits(updated);
    setError('');

    // Auto-advance focus
    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Backspace: clear current and go back
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const updated = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => { updated[i] = char; });
    setDigits(updated);
    // Focus last filled input
    const lastIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleResend = () => {
    setDigits(Array(OTP_LENGTH).fill(''));
    setTimer(RESEND_SECONDS);
    setError('');
    inputRefs.current[0]?.focus();
    // TODO: call your resend API here
    console.log('Resend OTP to', phoneNumber);
  };

  // ── Submit ───────────────────────────────────────────
  const handleSubmit = async () => {
    const code = digits.join('');

    if (code.length < OTP_LENGTH) {
      setError('Please enter all 4 digits.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ── Condition: different API call per mode ──────
      if (mode === 'signup') {
        // POST /api/auth/verify-otp
        console.log('[signup] Verifying OTP:', code);
        // await verifySignupOtp({ phone: phoneNumber, code });

      } else if (mode === 'reset-password') {
        // POST /api/auth/verify-reset-otp
        console.log('[reset-password] Verifying OTP:', code);
        // await verifyResetOtp({ phone: phoneNumber, code });
      }

      // Both modes: go to next step on success
      onSuccess();

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid code. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // ── Derived UI strings based on mode ─────────────────
  const title = mode === 'signup' ? 'Sign up' : 'Reset Password';

  return (
    <div className={styles.page}>
      <Grid fluid>
        <Row className={styles.row}>
          <Col xs={22} sm={18} md={14} lg={10} xl={8}>
            <div className={styles.card}>

              {/* ── Back ── */}
              <button className={styles.backLink} onClick={onBack} type="button">
                <FaChevronLeft size={12} />
                Back
              </button>

              {/* ── Header (centered) ── */}
              <div className={styles.headerCenter}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>
                  We have sent you an SMS with the code to your phone number{' '}
                  <strong>{phoneNumber}</strong>
                </p>
              </div>

              {/* ── OTP digit boxes ── */}
              <div className={styles.otpGroup} onPaste={handlePaste}>
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    className={`${styles.otpInput} ${digit ? styles.otpFilled : ''} ${error ? styles.otpError : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              {/* ── Error ── */}
              {error && (
                <p className={styles.otpErrorText}>{error}</p>
              )}

              {/* ── Resend timer ── */}
              <div className={styles.otpMeta}>
                {timer > 0 ? (
                  <span>Resend code in: <strong>{formatTime(timer)}</strong></span>
                ) : (
                  <button className={styles.resendBtn} onClick={handleResend} type="button">
                    Resend code
                  </button>
                )}
              </div>

              {/* ── Continue button ── */}
              <Button
                appearance="primary"
                block
                className={styles.submitBtn}
                onClick={handleSubmit}
                loading={loading}
                disabled={digits.join('').length < OTP_LENGTH || loading}
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
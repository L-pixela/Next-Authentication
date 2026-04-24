'use client';
import { useState } from 'react';
import { Grid, Row, Col, Button, Checkbox } from 'rsuite';
import styles from '../auth.module.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <div className={styles.page}>
      <Grid fluid className={styles.grid}>
        <Row className={styles.row}>

          <Col width={768}>
            <div className={styles.card}>

              {/* ── Heading ── */}
              <h2 className={styles.title}>Sign Up</h2>

              {/* ── Email / Phone ── */}
              <div className={styles.field}>
                <label className={styles.label}>First Name</label>
                <input
                  className={styles.input}
                  placeholder="Your phone number or email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last Name</label>
                <input
                  className={styles.input}
                  placeholder="Your phone number or email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Phone Number</label>
                <input
                  className={styles.input}
                  placeholder="Your phone number or email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* ── Password ── */}
              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirm Password</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    className={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* ── Terms and Conditions ── */}
              <div className={styles.field}>
                <Checkbox>
                  I have read and agree with the <a href="/forgot-password" className={styles.forgotLink}>Term and Condition</a>
                </Checkbox>
              </div>

              {/* ── Continue Button ── */}
              <Button
                appearance="primary"
                block
                className={styles.submitBtn}
                onClick={() => {}}
              >
                Continue
              </Button>

              {/* ── Sign Up ── */}
              <p className={styles.signupText}>
                Already have an account?{' '}
                <a href="/login" className={styles.signupLink}>Login</a>
              </p>

            </div>
          </Col>

        </Row>
      </Grid>
    </div>
  );
}
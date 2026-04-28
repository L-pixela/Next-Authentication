"use client";

import { useLogin } from "@/src/modules/auth/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Container, Content, Panel, Form, VStack, InputGroup, Text, Heading } from "rsuite";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type FormValue = {
  email: string;
  password: string;
};

type ValidationErrors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValue, setFormValue] = useState<FormValue>({ email: '', password: '' });
  const { login, loading, error } = useLogin();
  const router = useRouter();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  function validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!formValue.email) {
      errors.email = 'Email or phone is required';
    } else if (
      !/^\S+@\S+\.\S+$/.test(formValue.email) &&
      !/^\d{8,15}$/.test(formValue.email)
    ) {
      errors.email = 'Invalid email or phone number';
    }

    if (!formValue.password) {
      errors.password = 'Password is required';
    } else if (formValue.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  }

  async function handleSubmit() {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    await login({ email: formValue.email, password: formValue.password });
    router.push('/warranty');
  }

  const inputStyle = {
    backgroundColor: '#f7f7f7',
    border: '1.5px solid #e0e0e0',
    borderRadius: 8,
    width: '100%',
  };

  return (
    <Container style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Panel
          bordered
          style={{
            width: '100%',
            maxWidth: 768,
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: '16px 24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <Heading level={2} style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: '#111' }}>
            Sign In
          </Heading>

          {error && (
            <p style={{ color: '#e53e3e', fontSize: 13, marginBottom: 12 }}>{error}</p>
          )}

          <Form
            fluid
            formValue={formValue}
            onChange={(value) => setFormValue(value as FormValue)}
            onSubmit={() => handleSubmit()}
            style={{ width: '100%' }}
          >
            <VStack spacing={16} style={{ width: '100%' }}>

              {/* ── Email / Phone ── */}
              <Form.Group style={{ width: '100%', marginBottom: 0 }}>
                <Form.ControlLabel>Phone number or Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  placeholder="Your phone number or email"
                  style={inputStyle}
                />
                {validationErrors.email && (
                  <Form.HelpText style={{ color: '#e53e3e' }}>
                    {validationErrors.email}
                  </Form.HelpText>
                )}
              </Form.Group>

              {/* ── Password ── */}
              <Form.Group style={{ width: '100%', marginBottom: 0 }}>
                <Form.ControlLabel>Password</Form.ControlLabel>
                <InputGroup inside style={{ ...inputStyle, width: '100%' }}>
                  <Form.Control
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    style={{ backgroundColor: 'transparent', border: 'none', width: '100%' }}
                  />
                  <InputGroup.Button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: 'none', color: '#888' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Button>
                </InputGroup>
                {validationErrors.password && (
                  <Form.HelpText style={{ color: '#e53e3e' }}>
                    {validationErrors.password}
                  </Form.HelpText>
                )}
              </Form.Group>

              {/* ── Forgot Password ── */}
              <div style={{ width: '100%', textAlign: 'right', marginTop: -8 }}>
                <a
                  href="/forgot-password"
                  style={{ color: '#e5194b', fontSize: 13, textDecoration: 'none' }}
                >
                  Forget Password?
                </a>
              </div>

              {/* ── Continue Button ── */}
              <Button
                appearance="primary"
                block
                loading={loading}
                disabled={loading}
                type="submit"
                style={{
                  backgroundColor: '#e5194b',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 0',
                  fontSize: 15,
                  fontWeight: 600,
                  width: '100%',
                }}
              >
                Continue
              </Button>

            </VStack>
          </Form>

          {/* ── Sign Up Link ── */}
          <Text style={{ textAlign: 'center', fontSize: 13, color: '#666', marginTop: 20 }}>
            Don&apos;t have an account?{' '}
            <a href="/register" style={{ color: '#e5194b', fontWeight: 600, textDecoration: 'none' }}>
              Sign up
            </a>
          </Text>

        </Panel>
      </Content>
    </Container>
  );
}
'use client';
import { useState } from 'react';
import {
  Container, Content, Panel, Button, Checkbox,
  Form, VStack, InputGroup, Text, Heading
} from 'rsuite';
import { FaEye, FaEyeSlash } from "react-icons/fa";

type FormValue = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type ValidationErrors = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState<FormValue>({
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  function validate(): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!formValue.firstName) errors.firstName = 'First name is required';
    if (!formValue.lastName) errors.lastName = 'Last name is required';
    if (!formValue.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{8,15}$/.test(formValue.phone)) {
      errors.phone = 'Invalid phone number';
    }
    if (!formValue.password) {
      errors.password = 'Password is required';
    } else if (formValue.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formValue.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formValue.password !== formValue.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!agreed) errors.terms = 'You must agree to the Terms and Conditions';
    return errors;
  }

  async function handleSubmit() {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setLoading(true);
    // TODO: call register API
    setLoading(false);
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
            Sign Up
          </Heading>

          <Form
            fluid
            formValue={formValue}
            onChange={(value) => setFormValue(value as FormValue)}
            onSubmit={() => handleSubmit()}
            style={{ width: '100%' }}
          >
            <VStack spacing={16} style={{ width: '100%' }}>

              {/* ── First Name ── */}
              <Form.Group style={{ width: '100%', marginBottom: 0 }}>
                <Form.ControlLabel>First name</Form.ControlLabel>
                <Form.Control
                  name="firstName"
                  placeholder="Your first name"
                  style={inputStyle}
                />
                {validationErrors.firstName && (
                  <Form.HelpText style={{ color: '#e53e3e' }}>
                    {validationErrors.firstName}
                  </Form.HelpText>
                )}
              </Form.Group>

              {/* ── Last Name ── */}
              <Form.Group style={{ width: '100%', marginBottom: 0 }}>
                <Form.ControlLabel>Last name</Form.ControlLabel>
                <Form.Control
                  name="lastName"
                  placeholder="Your last name"
                  style={inputStyle}
                />
                {validationErrors.lastName && (
                  <Form.HelpText style={{ color: '#e53e3e' }}>
                    {validationErrors.lastName}
                  </Form.HelpText>
                )}
              </Form.Group>

              {/* ── Phone Number ── */}
              <Form.Group style={{ width: '100%', marginBottom: 0 }}>
                <Form.ControlLabel>Phone number</Form.ControlLabel>
                <Form.Control
                  name="phone"
                  placeholder="Your phone number"
                  style={inputStyle}
                />
                {validationErrors.phone && (
                  <Form.HelpText style={{ color: '#e53e3e' }}>
                    {validationErrors.phone}
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

              {/* ── Confirm Password ── */}
              <Form.Group style={{ width: '100%', marginBottom: 0 }}>
                <Form.ControlLabel>Confirm password</Form.ControlLabel>
                <InputGroup inside style={{ ...inputStyle, width: '100%' }}>
                  <Form.Control
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    style={{ backgroundColor: 'transparent', border: 'none', width: '100%' }}
                  />
                  <InputGroup.Button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ background: 'none', color: '#888' }}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Button>
                </InputGroup>
                {validationErrors.confirmPassword && (
                  <Form.HelpText style={{ color: '#e53e3e' }}>
                    {validationErrors.confirmPassword}
                  </Form.HelpText>
                )}
              </Form.Group>

              {/* ── Terms ── */}
              <Form.Group style={{ width: '100%', marginBottom: 0 }}>
                <Checkbox
                  checked={agreed}
                  onChange={(_, checked) => setAgreed(checked)}
                >
                  <span style={{ fontSize: 13, color: '#444' }}>
                    I have read and agree with the{' '}
                    <a href="/terms" style={{ color: '#e5194b', textDecoration: 'none' }}>
                      Term and Condition
                    </a>
                  </span>
                </Checkbox>
                {validationErrors.terms && (
                  <Form.HelpText style={{ color: '#e53e3e' }}>
                    {validationErrors.terms}
                  </Form.HelpText>
                )}
              </Form.Group>

              {/* ── Continue Button ── */}
              <Button
                appearance="primary"
                block
                loading={loading}
                disabled={loading}
                type='submit'
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

          {/* ── Login Link ── */}
          <Text style={{ textAlign: 'center', fontSize: 13, color: '#666', marginTop: 20 }}>
            Already have an account?{' '}
            <a href="/login" style={{ color: '#e5194b', fontWeight: 600, textDecoration: 'none' }}>
              Login
            </a>
          </Text>

        </Panel>
      </Content>
    </Container>
  );
}
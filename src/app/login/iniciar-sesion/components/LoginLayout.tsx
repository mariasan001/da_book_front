'use client';
import LoginPanel from './LoginPanel';
import LoginForm from './LoginForm';
import './styles/login-layout.css'; 

export default function LoginLayout() {
  return (
    <main className="login-layout">
      <LoginPanel />
      <LoginForm />
    </main>
  );
}

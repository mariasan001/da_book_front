'use client';

interface Props {
  title: string;
  subtitle: string;
}

export default function FormHeader({ title, subtitle }: Props) {
  return (
    <>
      <h1 className="login-form__title">{title}</h1>
      <p className="login-form__subtitle">{subtitle}</p>
    </>
  );
}

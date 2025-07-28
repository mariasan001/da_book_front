import './styles/LayoutContainer.css';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function LayoutContainer({ children }: Props) {
  return <div className="layout-container">{children}</div>;
}

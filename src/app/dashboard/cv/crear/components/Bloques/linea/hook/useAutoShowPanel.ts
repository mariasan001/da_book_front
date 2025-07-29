// components/Linea/hooks/useAutoShowPanel.ts
import { useEffect } from 'react';

export const useAutoShowPanel = (
  selectedElement: string | null,
  id: string,
  setShowPanel: (show: boolean) => void
) => {
  useEffect(() => {
    setShowPanel(selectedElement === id);
  }, [selectedElement, id, setShowPanel]);
};

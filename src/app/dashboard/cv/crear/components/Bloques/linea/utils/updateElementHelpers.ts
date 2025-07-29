// utils/updateElementHelpers.ts
import { ElementoCV } from '../../../../types/types'; // ajusta este path según tu estructura
export function sanitizeStyle(style: Partial<CSSStyleDeclaration>): Record<string, string | number> {
  const clean: Record<string, string | number> = {};
  for (const key in style) {
    const value = style[key as keyof CSSStyleDeclaration];
    if (typeof value === 'string' || typeof value === 'number') {
      clean[key] = value;
    }
  }
  return clean;
}

export function updateElementStyle(
  updateElement: (id: string, updates: Partial<ElementoCV>) => void,
  id: string,
  element: ElementoCV,
  styleUpdate: Partial<CSSStyleDeclaration>
): void {
  updateElement(id, {
    style: {
      ...element.style,
      ...sanitizeStyle(styleUpdate),
    },
  });
}

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createTw } from "react-pdf-tailwind";

export const tw = createTw({})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function omit<T, K extends keyof T>(obj: T, ...args: K[]): T {
  const result = { ...obj };

  for (const k of args) {
    delete result[k];
  }

  return result;
}

export function toDecimal(value: number, fractionDigits: number = 2) {
  const n = Math.pow(10, fractionDigits)
  return Math.floor(value * n) / n
}

export function camelCaseToText(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase())
}

/**
 * className to variable
 */
export function ctv(className: string, variable: string = '--primary') {
  if (typeof document === 'undefined') return
  let result: string | undefined;
  const stylesheets = Array.from(document.styleSheets);

  stylesheets.forEach((sheet) => {
    const rules = Array.from(sheet.cssRules || []);
    rules.forEach((rule) => {
      if (rule instanceof CSSStyleRule && rule.cssText.startsWith(className)) {
        const match = rule.cssText.match(/\.primary-(\w+)/);
        if (match) {
          const value = rule.style.getPropertyValue(variable).trim();
          if (value) {
            result = value;
          }
        }
      }
    });
  });

  return result;
}

export function sortByDate<T extends Record<string, any>>(
  items: T[],
  field: keyof T,
  order: 'asc' | 'desc' = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    if (!a[field] && !b[field]) return 0;
    if (!a[field]) return 1;
    if (!b[field]) return -1;

    try {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();

      if (isNaN(dateA) && isNaN(dateB)) return 0;
      if (isNaN(dateA)) return 1;
      if (isNaN(dateB)) return -1;

      return order === 'desc' ? dateB - dateA : dateA - dateB;
    } catch {
      return 0;
    }
  });
};
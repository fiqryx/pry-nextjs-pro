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

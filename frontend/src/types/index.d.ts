export {};

declare global {
  interface Window {
    snap: any; // 👈️ turn off type checking
  }
}

declare module '../../../../config/firebase';

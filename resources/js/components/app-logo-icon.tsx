import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/images/app-logo.png"
      alt="App Logo"
      {...props}
    />
  );
}

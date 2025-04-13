"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
  error?: string;
  className?: string;
}

const ReCaptcha = React.forwardRef<HTMLDivElement, ReCaptchaProps>(
  ({ onChange, error, className }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const widgetRef = React.useRef<number | null>(null);

    React.useEffect(() => {
      // reCAPTCHA 스크립트 로드
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        if (widgetRef.current) {
          // @ts-ignore
          window.grecaptcha?.reset(widgetRef.current);
        }
      };
    }, []);

    React.useEffect(() => {
      if (isLoaded) {
        // @ts-ignore
        widgetRef.current = window.grecaptcha?.render("recaptcha-container", {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          callback: (token: string) => {
            onChange(token);
          },
          "expired-callback": () => {
            onChange(null);
          },
          "error-callback": () => {
            onChange(null);
          },
        });
      }
    }, [isLoaded, onChange]);

    return (
      <div className={cn("w-full", className)} ref={ref}>
        <div id="recaptcha-container" className="g-recaptcha" />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

ReCaptcha.displayName = "ReCaptcha";

export { ReCaptcha };

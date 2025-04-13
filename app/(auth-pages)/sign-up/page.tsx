"use client";

import { useState, useEffect } from "react";
import { signUpAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
// import { SmtpMessage } from "../smtp-message";

export default function Signup() {
  const searchParams = useSearchParams();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호 유효성 및 일치 여부 확인
  useEffect(() => {
    // 비밀번호 길이 체크
    if (password && password.length < 6) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }

    // 비밀번호 일치 체크
    if (confirmPassword && password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  // 메시지 파라미터 처리
  const message =
    searchParams.get("message") ||
    searchParams.get("error") ||
    searchParams.get("success");
  const type = searchParams.has("error")
    ? "error"
    : searchParams.has("success")
      ? "success"
      : undefined;

  // "Email signups are disabled" 오류 확인
  const isEmailSignupDisabled =
    message && message.includes("이메일 회원가입이 비활성화");
  // 보안 목적 요청 제한 확인
  const isRateLimited =
    message &&
    (message.includes("보안을 위해 잠시 후 다시 시도해주세요") ||
      message.includes("For security purposes") ||
      message.includes("can only request this after"));

  if (message && type) {
    const messageObj =
      type === "error"
        ? { error: message }
        : type === "success"
          ? { success: message }
          : { message };

    return (
      <div className="w-full flex-1 flex flex-col items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={messageObj} />
        {isEmailSignupDisabled && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
            <h3 className="font-bold mb-2">Supabase 설정 안내</h3>
            <p>Supabase 대시보드에서 다음 설정을 확인해주세요:</p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Supabase 프로젝트 대시보드에 로그인</li>
              <li>Authentication → Providers 메뉴로 이동</li>
              <li>Email 제공자에서 'Enable Email Sign Up' 옵션을 활성화</li>
              <li>변경사항 저장 후 다시 시도해보세요</li>
            </ol>
          </div>
        )}
        {isRateLimited && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
            <h3 className="font-bold mb-2">요청 제한 안내</h3>
            <p>
              Supabase에서는 보안을 위해 일정 시간 내 연속된 요청을 제한합니다.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>약 36초 후에 다시 시도해주세요</li>
              <li>
                짧은 시간 내에 여러 번 시도하면 제한 시간이 늘어날 수 있습니다
              </li>
              <li>브라우저 쿠키를 삭제하면 즉시 재시도할 수 있습니다</li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <form
        action={signUpAction}
        className="flex flex-col min-w-64 max-w-64 mx-auto"
      >
        <h1 className="text-2xl font-medium">회원가입</h1>
        <p className="text-sm text text-foreground">
          이미 계정이 있으신가요?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            로그인
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">이메일</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="nickname">닉네임</Label>
          <Input name="nickname" placeholder="닉네임을 입력해주세요" required />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요 (6자 이상)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={!passwordValid ? "border-red-500" : ""}
            minLength={6}
          />
          {!passwordValid && (
            <p className="text-red-500 text-sm -mt-2">
              비밀번호는 6자 이상이어야 합니다
            </p>
          )}

          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={!passwordMatch ? "border-red-500" : ""}
            minLength={6}
          />
          {!passwordMatch && (
            <p className="text-red-500 text-sm -mt-2">
              비밀번호가 일치하지 않습니다
            </p>
          )}

          <button
            type="submit"
            disabled={!passwordMatch || !passwordValid}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors ${
              !passwordMatch || !passwordValid
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            회원가입
          </button>

          {(searchParams.has("error") || searchParams.has("success")) && (
            <div
              className={`mt-2 p-2 rounded ${searchParams.has("error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
            >
              {searchParams.get("error") || searchParams.get("success")}
            </div>
          )}
        </div>
      </form>
      {/* <SmtpMessage /> */}
    </>
  );
}

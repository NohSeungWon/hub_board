"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  console.log("signUpAction 호출됨");
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const nickname = formData.get("nickname")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password || !nickname || !confirmPassword) {
    return encodedRedirect("error", "/sign-up", "모든 필드를 입력해주세요");
  }

  // 비밀번호 길이 검증
  if (password.length < 6) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "비밀번호는 6자 이상이어야 합니다"
    );
  }

  // 비밀번호 확인 검증
  if (password !== confirmPassword) {
    return encodedRedirect("error", "/sign-up", "비밀번호가 일치하지 않습니다");
  }

  try {
    const {
      data: { user },
      error: signUpError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (signUpError) {
      console.error(signUpError.code + " " + signUpError.message);

      // 보안 목적의 요청 속도 제한 오류 처리
      if (
        signUpError.message.includes("For security purposes") ||
        signUpError.message.includes("can only request this after")
      ) {
        return encodedRedirect(
          "error",
          "/sign-up",
          "보안을 위해 잠시 후 다시 시도해주세요. (요청 제한 시간: 36초)"
        );
      }

      return encodedRedirect("error", "/sign-up", signUpError.message);
    }

    if (user) {
      // 사용자 프로필 생성
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          nickname,
          email,
          created_at: new Date().toISOString(),
        },
      ]);

      if (profileError) {
        console.log(profileError);
        return encodedRedirect(
          "error",
          "/sign-up",
          "프로필 생성 중 오류가 발생했습니다"
        );
      }
    }

    return encodedRedirect(
      "success",
      "/sign-up",
      "회원가입이 완료되었습니다! 이메일을 확인해주세요."
    );
  } catch (error) {
    console.error("예상치 못한 오류:", error);
    return encodedRedirect(
      "error",
      "/sign-up",
      "회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "이메일과 비밀번호를 모두 입력해주세요"
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("로그인 오류:", error.message);

    // 로그인 오류 메시지 한글화
    if (error.message === "Invalid login credentials") {
      return encodedRedirect(
        "error",
        "/sign-in",
        "이메일 또는 비밀번호가 올바르지 않습니다"
      );
    }

    // 요청 제한 오류 처리
    if (
      error.message.includes("For security purposes") ||
      error.message.includes("can only request this after")
    ) {
      return encodedRedirect(
        "error",
        "/sign-in",
        "보안을 위해 잠시 후 다시 시도해주세요"
      );
    }

    return encodedRedirect("error", "/sign-in", error.message);
  }

  // 로그인 성공 시 홈페이지로 리다이렉트
  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

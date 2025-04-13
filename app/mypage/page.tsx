"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      // 로그인되지 않은 상태면 로그인 페이지로 리다이렉트
      router.push("/sign-in");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">마이페이지</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">이메일</p>
            <p>user@example.com</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">이름</p>
            <p>사용자</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">가입일</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              localStorage.setItem("isLoggedIn", "false");
              router.push("/");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

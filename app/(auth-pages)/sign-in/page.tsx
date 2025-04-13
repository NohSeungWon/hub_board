import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form
      action={signInAction}
      className="flex flex-col min-w-64 max-w-64 mx-auto"
    >
      <h1 className="text-2xl font-medium">로그인</h1>
      <p className="text-sm text-foreground">
        계정이 없으신가요?{" "}
        <Link className="text-primary font-medium underline" href="/sign-up">
          회원가입
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">이메일</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">비밀번호</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            비밀번호 찾기
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          로그인
        </button>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}

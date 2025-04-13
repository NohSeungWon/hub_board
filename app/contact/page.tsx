"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { Dropdown } from "@/components/ui/dropdown";
import { MultiSelect } from "@/components/ui/multi-select";
import { ReCaptcha } from "@/components/ui/recaptcha";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
  services: string[];
}

const INQUIRY_TYPES = [
  { value: "general", label: "일반 문의" },
  { value: "product", label: "제품 문의" },
  { value: "technical", label: "기술 지원" },
  { value: "partnership", label: "파트너십" },
  { value: "other", label: "기타" },
];

const SERVICES = [
  { value: "web", label: "웹 개발" },
  { value: "mobile", label: "모바일 앱 개발" },
  { value: "design", label: "UI/UX 디자인" },
  { value: "cloud", label: "클라우드 서비스" },
  { value: "data", label: "데이터 분석" },
  { value: "ai", label: "AI 솔루션" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    if (!recaptchaToken) {
      setRecaptchaError("로봇이 아님을 확인해주세요");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await createClient()
        .from("contact")
        .insert([
          {
            name: data.name,
            email: data.email,
            title: data.subject,
            message: data.message,
            type: data.inquiryType,
            select_type: data.services,
            recaptcha_token: recaptchaToken,
          },
        ]);

      if (error) throw error;

      toast.success("메시지가 성공적으로 전송되었습니다!");
      reset();
      setSelectedServices([]);
      setRecaptchaToken(null);
      setRecaptchaError(undefined);
    } catch (error) {
      console.error("Error:", error);
      toast.error("메시지 전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            궁금하신 점이나 문의사항이 있으시다면 언제든지 연락 주시기 바랍니다.
            최대한 빠른 시일 내에 답변 드리도록 하겠습니다.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* 연락처 카드 */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">전화 문의</h3>
              <p className="text-gray-600">02-1234-5678</p>
              <p className="text-gray-500 text-sm mt-2">평일 09:00 - 18:00</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">이메일 문의</h3>
              <p className="text-gray-600">contact@company.com</p>
              <p className="text-gray-500 text-sm mt-2">24시간 접수 가능</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">주소</h3>
              <p className="text-gray-600">서울특별시 강남구 테헤란로 123</p>
              <p className="text-gray-500 text-sm mt-2">우편번호: 06123</p>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">문의하기</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "이름을 입력해주세요" })}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="홍길동"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "이메일을 입력해주세요",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "올바른 이메일 형식이 아닙니다",
                      },
                    })}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <Dropdown
                {...register("inquiryType", {
                  required: "문의 유형을 선택해주세요",
                })}
                options={INQUIRY_TYPES}
                label="문의 유형"
                error={errors.inquiryType?.message}
              />

              <MultiSelect
                options={SERVICES}
                selectedValues={selectedServices}
                onChange={(values) => {
                  setSelectedServices(values);
                  setValue("services", values);
                }}
                label="관심 서비스 (다중 선택 가능)"
                error={errors.services?.message}
                isMulti={false}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  {...register("subject", { required: "제목을 입력해주세요" })}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.subject ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="문의 제목을 입력해주세요"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  메시지
                </label>
                <textarea
                  {...register("message", {
                    required: "메시지를 입력해주세요",
                  })}
                  rows={6}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="문의하실 내용을 자세히 적어주세요..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <ReCaptcha
                onChange={(token) => {
                  setRecaptchaToken(token);
                  setRecaptchaError(undefined);
                }}
                error={recaptchaError}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "전송 중..." : "문의하기"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

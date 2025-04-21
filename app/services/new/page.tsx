"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import { ServiceForm } from "@/components/service-form";
import { MAX_SIZE } from "@/constants/max_width_wrapper";
import { NAV_POSITION } from "@/constants/nav";

export default function NewService() {
  const handleSubmit = async (formData: FormData) => {
    // TODO: Implement API call to save the service
    console.log("Form data:", formData);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8 max-w-[80%] md:max-w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">새 서비스 작성</h1>
        <ServiceForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

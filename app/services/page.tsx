"use client";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Nav from "@/components/nav";
import { Button } from "@/components/ui/button";
import { MAX_SIZE } from "@/constants/max_width_wrapper";
import { NAV_POSITION } from "@/constants/nav";
import { Plus } from "lucide-react";
import { Pagination } from "@/components/pagination";
import { useState } from "react";
import Link from "next/link";

// 임시 데이터
const generateServices = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `서비스 ${index + 1}`,
    description: `서비스 ${index + 1}에 대한 설명입니다. 이 서비스는 다음과 같은 특징을 가지고 있습니다.`,
    thumbnail: "/placeholder.jpg",
  }));
};

const services = generateServices(17);

const ITEMS_PER_PAGE = 4;

export default function Service() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = services.slice(startIndex, endIndex);

  return (
    <div>
      <MaxWidthWrapper size={MAX_SIZE.XL3}>
        <Nav position={NAV_POSITION.STATIC} />

        <div className="container mx-auto px-4 py-8 max-w-[80%] md:max-w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">서비스</h1>
            <Link href="/services/new">
              <Button className="flex items-center gap-2 text-sm md:text-base">
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
                글쓰기
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {currentServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video bg-gray-200">
                  <img
                    src={service.thumbnail}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

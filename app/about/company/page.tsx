export default function CompanyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* 히어로 섹션 */}
      <section className="mb-20">
        <h1 className="text-4xl font-bold mb-6">회사 소개</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          혁신적인 기술과 창의적인 솔루션으로 더 나은 미래를 만들어가는
          기업입니다. 고객의 니즈를 최우선으로 생각하며, 지속 가능한 가치를
          창출하고 있습니다.
        </p>
      </section>

      {/* 미션과 비전 */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">미션</h2>
            <p className="text-gray-600">
              기술을 통한 혁신으로 사회적 가치를 창출하고, 모든 이해관계자들과
              함께 성장하는 미래를 만들어갑니다.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">비전</h2>
            <p className="text-gray-600">
              2030년까지 글로벌 시장을 선도하는 기술 혁신 기업으로 성장하여,
              산업의 새로운 기준을 제시합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8">핵심 가치</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">혁신</h3>
            <p className="text-gray-600">
              끊임없는 도전과 창의적인 사고로 새로운 가치를 창출합니다.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">신뢰</h3>
            <p className="text-gray-600">
              정직과 투명성을 바탕으로 신뢰받는 기업이 되겠습니다.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">협력</h3>
            <p className="text-gray-600">
              열린 소통과 상호 존중으로 함께 성장하는 문화를 만듭니다.
            </p>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8">회사 연혁</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-8">
            <div className="flex gap-8">
              <div className="w-24 flex-shrink-0">
                <span className="font-semibold text-lg">2024</span>
              </div>
              <div>
                <p className="text-gray-600">
                  글로벌 시장 진출 및 해외 지사 설립
                </p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-24 flex-shrink-0">
                <span className="font-semibold text-lg">2023</span>
              </div>
              <div>
                <p className="text-gray-600">신규 서비스 출시 및 특허 등록</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-24 flex-shrink-0">
                <span className="font-semibold text-lg">2022</span>
              </div>
              <div>
                <p className="text-gray-600">기업 부설 연구소 설립</p>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-24 flex-shrink-0">
                <span className="font-semibold text-lg">2021</span>
              </div>
              <div>
                <p className="text-gray-600">회사 설립</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8">오시는 길</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">주소</h3>
              <p className="text-gray-600 mb-4">
                서울특별시 강남구 테헤란로 123 빌딩 4층
              </p>
              <h3 className="text-xl font-semibold mb-4">연락처</h3>
              <p className="text-gray-600 mb-2">전화: 02-123-4567</p>
              <p className="text-gray-600">이메일: contact@company.com</p>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg">
              {/* 지도가 들어갈 자리 */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                지도 영역
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

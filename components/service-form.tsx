import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ServiceFormProps {
  initialData?: {
    title: string;
    description: string;
    thumbnail: string;
  };
  onSubmit: (data: FormData) => Promise<void>;
}

export function ServiceForm({ initialData, onSubmit }: ServiceFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await onSubmit(formData);
      router.push("/services");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="서비스 제목을 입력하세요"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">내용</Label>
        {/* <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="서비스에 대한 설명을 입력하세요"
          className="min-h-[200px]"
        /> */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">썸네일 이미지</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          required={!initialData?.thumbnail}
        />
        {initialData?.thumbnail && !thumbnail && (
          <div className="mt-2">
            <img
              src={initialData.thumbnail}
              alt="Current thumbnail"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="files">첨부 파일</Label>
        <Input
          id="files"
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />
        {files.length > 0 && (
          <div className="mt-2 text-sm text-gray-500">
            {files.length}개의 파일이 선택되었습니다
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
      </div>
    </form>
  );
}

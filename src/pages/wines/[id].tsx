import { useRouter } from "next/router";

export default function WineDetailPage() {
  const router = useRouter();
  const { id } = router.query; // URL에서 id 값을 가져옴

  return (
    <div>
      <p>와인 상세 페이지</p>
      <p>와인 ID: {id}</p>
    </div>
  );
}

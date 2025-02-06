import Link from "next/link";

export default function WinesPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>와인 리스트 페이지</h1>
      <ul>
        <li>
          <Link href="/wines/692">와인 692</Link>
        </li>
        <li>
          <Link href="/wines/691">와인 691</Link>
        </li>
        <li>
          <Link href="/wines/690">와인 690</Link>
        </li>
      </ul>
    </div>
  );
}

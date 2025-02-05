import Link from "next/link";

export default function WinesPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>와인 리스트 페이지</h1>
      <ul>
        <li>
          <Link href="/wines/1">와인 1</Link>
        </li>
        <li>
          <Link href="/wines/2">와인 2</Link>
        </li>
        <li>
          <Link href="/wines/3">와인 3</Link>
        </li>
      </ul>
    </div>
  );
}

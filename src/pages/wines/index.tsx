import Link from "next/link";

export default function WinesPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>와인 리스트 페이지</h1>
      <ul>
        <li>
          <Link href="/wines/1">
            <a>와인 1</a>
          </Link>
        </li>
        <li>
          <Link href="/wines/2">
            <a>와인 2</a>
          </Link>
        </li>
        <li>
          <Link href="/wines/3">
            <a>와인 3</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

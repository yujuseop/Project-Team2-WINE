export default function WinesPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>와인 리스트 페이지</h1>
      <ul>
        <li>
          <a href="/wines/1">와인 1</a>
        </li>
        <li>
          <a href="/wines/2">와인 2</a>
        </li>
        <li>
          <a href="/wines/3">와인 3</a>
        </li>
      </ul>
    </div>
  );
}

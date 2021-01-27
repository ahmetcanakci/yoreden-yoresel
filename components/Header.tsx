import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <img src="/logo.jpg" alt="" className="header__logo" />
      </Link>
      <Link href="/">
        <h1 className="header__title">Yöreden Yöresel</h1>
      </Link>

    </header>
  )
}
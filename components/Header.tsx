import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <Link href="/">
        <img src="/logo.png" alt="" className="header__logo" />
      </Link>
      <Link href="/">
        <h1 className="header__title">Hayatım Organik</h1>
      </Link>

    </header>
  )
}
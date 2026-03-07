import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Shop", path: "/shop" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logo}>FOOTWEAR LAUNDRY</div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={router.pathname === link.path ? styles.activeLink : ""}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      {/* Call-to-Action Button */}
      <button className={styles.bookBtn}>BOOK NOW</button>
    </header>
  );
}

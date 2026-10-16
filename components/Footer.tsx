import Link from "next/link";

const shopLinks = [
  { href: "/#shop", label: "Signature cakes" },
  { href: "/#occasions", label: "Petits gâteaux" },
  { href: "/#occasions", label: "Gift boxes" },
  { href: "/#atelier", label: "Custom orders" },
];

// Placeholder destinations until these pages exist.
const careLinks = ["Delivery & collection", "Allergens", "FAQ", "Contact"];

const columnHeading = "mb-1.5 text-xs font-medium uppercase tracking-[0.2em] text-on-dark-muted";
const footerLink = "text-on-dark transition-colors hover:text-pink";

export function Footer() {
  return (
    <footer data-surface="dark" className="overflow-hidden bg-ink text-on-dark">
      <div className="shell flex flex-wrap justify-between gap-10 pt-[72px] md:pt-20">
        <div className="flex flex-[1_1_280px] flex-col gap-3">
          <p className="max-w-[300px] text-[15px] leading-[1.7] font-light text-on-dark-muted">
            Cakes and pâtisserie, baked to order for every moment worth keeping.
          </p>
        </div>

        <nav aria-label="Shop" className="flex flex-col gap-3 text-sm font-light">
          <h2 className={columnHeading}>Shop</h2>
          {shopLinks.map((link) => (
            <Link key={link.label} href={link.href} className={footerLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Care" className="flex flex-col gap-3 text-sm font-light">
          <h2 className={columnHeading}>Care</h2>
          {careLinks.map((label) => (
            <a key={label} href="#" className={footerLink}>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm font-light">
          <h2 className={columnHeading}>Visit</h2>
          <span>[Shop address]</span>
          <span>[Opening hours]</span>
          <span>[Phone · email]</span>
        </div>
      </div>

      <div className="shell flex flex-wrap justify-between gap-3 pt-14 text-xs uppercase tracking-[0.12em] text-on-dark-muted">
        <span>© 2026 Charlotte Pâtisserie</span>
        <span>Privacy · Terms</span>
      </div>

      <div
        aria-hidden="true"
        className="-mb-[0.12em] pt-6 text-center font-serif text-[clamp(110px,21vw,300px)] leading-[0.78] tracking-[-0.03em] text-pink italic"
      >
        Charlotte
      </div>
    </footer>
  );
}

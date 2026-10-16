import { ButtonLink } from "@/components/Button";
import { Sparkle } from "@/components/Sparkle";

export default function NotFound() {
  return (
    <section className="shell flex flex-col items-center gap-7 py-[72px] text-center md:py-[120px]">
      <Sparkle size={28} />
      <h1 className="font-serif text-[clamp(48px,5.6vw,80px)] leading-[0.95] font-normal tracking-[-0.02em]">
        Page not <em className="text-rose">found</em>
      </h1>
      <p className="max-w-[440px] text-[17px] leading-[1.7] font-light text-muted">
        We couldn’t find that page. The whole collection is just a click away.
      </p>
      <ButtonLink href="/#shop">Shop the collection</ButtonLink>
    </section>
  );
}

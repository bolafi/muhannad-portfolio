import { Reveal } from "./Reveal";

type Props = {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
  id,
}: Props) {
  const isCenter = align === "center";
  return (
    <header
      id={id}
      className={`mb-12 md:mb-16 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}
    >
      <Reveal>
        <div
          className={`flex items-center gap-3 mb-5 ${isCenter ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-gold/70" />
          <span className="text-xs tracking-[0.28em] uppercase text-gold font-medium">
            {label}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-balance text-fg">
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base md:text-lg text-fg-muted text-pretty max-w-2xl">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}

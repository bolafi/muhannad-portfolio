import type { Dictionary } from "@/i18n/dictionaries/en";

type Props = {
  dict: Dictionary["footer"];
  person: Dictionary["person"];
  contact: Dictionary["contact"];
  navItems: Dictionary["nav"]["items"];
};

export function Footer({ dict, person, contact, navItems }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-gold-soft bg-bg-elev/60">
                <span className="font-display text-gold text-sm">
                  {person.initials}
                </span>
              </span>
              <div>
                <p className="text-sm text-fg">{person.name}</p>
                <p className="text-xs text-fg-subtle">{person.title}</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-fg-muted max-w-xs leading-relaxed">
              {dict.blurb}
            </p>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.26em] uppercase text-gold">
              {dict.navigate}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.26em] uppercase text-gold">
              {dict.basedIn}
            </p>
            <p className="mt-4 text-sm text-fg">{person.location}</p>
            <p className="mt-1 text-sm text-fg-subtle">{person.organization}</p>
            <p className="mt-5 text-sm text-fg-muted">
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-fg transition-colors"
              >
                {contact.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-fg-faint">
            © {year} {person.name}. {dict.rightsSuffix}
          </p>
          <p className="text-xs text-fg-faint">{dict.alignment}</p>
        </div>
      </div>
    </footer>
  );
}

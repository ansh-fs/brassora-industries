import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 100 10.2 5.1 5.1 0 000-10.2zm0 8.4a3.3 3.3 0 110-6.6 3.3 3.3 0 010 6.6zm5.3-9.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z",
  facebook:
    "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z",
  linkedin:
    "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 110-4.2 2.1 2.1 0 010 4.2zM7.1 20.5H3.5V9h3.6v11.5z",
  youtube:
    "M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
};
const labels: Record<string, string> = {
  instagram: "Instagram @brassoraindustries",
  facebook: "Facebook — Brassora Industries",
  linkedin: "LinkedIn — Brassora Industries",
  youtube: "YouTube @BrassoraIndustries",
};

export function SocialLinks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <ul className={cn("flex gap-3", className)}>
      {Object.entries(SITE.social).map(([k, href]) => (
        <li key={k}>
          <a
            href={href}
            target="_blank"
            rel="noopener me"
            aria-label={labels[k]}
            title={labels[k]}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              tone === "light"
                ? "border-primary-foreground/25 text-primary-foreground/85 hover:border-gold-soft hover:text-gold-soft"
                : "border-border text-foreground/75 hover:border-gold hover:text-gold",
            )}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d={icons[k]} /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

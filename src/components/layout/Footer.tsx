import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const { name, social, email } = portfolioData;

  return (
    <footer className="border-t border-white/8 py-10 px-6 md:px-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href={`mailto:${email}`}
            className="text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            {email}
          </a>
          {social.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-white/80 transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

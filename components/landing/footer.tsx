import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { landingConfig } from "@/lib/landing-config";
import { LEGAL_ROUTES } from "@/lib/legal/routes";

export function LandingFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-10">
        <Link href="/" className="relative flex items-center space-x-2">
          <BrandLogo nameClassName="text-xl font-bold" />
        </Link>

        <div className="mx-auto mt-8 grid w-full grid-cols-1 justify-between gap-4 border-t pt-6 md:grid-cols-2">
          <span className="text-sm tracking-tight text-foreground">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="/">{landingConfig.name}</Link>
            {" · "}
            <a
              href={landingConfig.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:underline"
            >
              Built by Ajay
            </a>
          </span>
          <ul className="flex justify-start text-sm tracking-tight text-foreground md:justify-end">
            <li className="mr-3 md:mx-4">
              <Link href={LEGAL_ROUTES.privacy}>Privacy Policy</Link>
            </li>
            <li className="mr-3 md:mx-4">
              <Link href={LEGAL_ROUTES.terms}>Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useContext } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { DocsConfig, MarketingConfig } from "@/types";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "@/components/link/link";
import LocaleSwitcher from "@/components/locale/locale-switcher";
import { ModalContext } from "@/components/modals/providers";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

import { ModeToggle } from "./mode-toggle";

interface NavBarProps {
  scroll?: boolean;
  marketingConfig: MarketingConfig;
  docsConfig: DocsConfig;
  translations: {
    adminPanel: string;
    dashboard: string;
    login: string;
    signUp: string;
  };
}

export function NavBar({
  scroll = false,
  marketingConfig,
  docsConfig,
  translations,
}: NavBarProps) {
  const locale = useLocale();

  const scrolled = useScroll(50);
  const { data: session, status } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);

  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links =
    (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all",
        scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b",
      )}
    >
      <MaxWidthWrapper
        className="grid h-14 w-full grid-cols-2 justify-between"
        large={documentation}
      >
        <div className="flex items-center gap-6 md:gap-10">
          <Link prefetch={true} href="/" className="text-xl font-bold">
            <div className="relative text-nowrap">
              <span
                className={`inline-block transition-[opacity,transform] duration-500 ${
                  scrolled
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
              >
                use technology efficiently
              </span>
              <span
                className={`absolute left-0 top-0 inline-block transition-[opacity,transform] duration-500 ${
                  scrolled
                    ? "-translate-y-full opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                UseEfficiently
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-end">
          {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${selectedLayout}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80",
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <Link
                href={`/discovery`}
                prefetch={true}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    rounded: "lg",
                    variant: "outline",
                  }),
                  "group text-nowrap",
                )}
              >
                <span>Book a free discovery call</span>
                <Icons.arrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </nav>
          ) : null}
        </div>
        {/* <div className="hidden justify-end items-center space-x-2 md:flex md:space-x-3">
          <ModeToggle dropdown={false} />
          <LocaleSwitcher dropdown={false} />
          {session ? (
            <Link
              href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="md:hidden"
            >
              <Button
                className="bg-transparent text-foreground hover:bg-transparent"
                size="sm"
              />
            </Link>
          ) : status === "unauthenticated" ? (
            <Button
              className="bg-transparent text-foreground hover:bg-transparent md:hidden"
              size="sm"
              onClick={() => setShowSignInModal(true)}
            />
          ) : (
            <Skeleton className="size-9 rounded-full md:hidden" />
          )}

           {session ? (
            <Link
              href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="hidden md:block"
            >
              <Button
                className="gap-2 bg-primary px-5 text-primary-foreground hover:bg-primary/90"
                size="sm"
              >
                <span> {translations.dashboard} </span>
              </Button>
            </Link>
          ) : status === "unauthenticated" ? (
            <Button
              className="hidden gap-2 bg-primary px-5 text-primary-foreground hover:bg-primary/90 md:flex"
              size="sm"
              onClick={() => setShowSignInModal(true)}
            >
              <span> {translations.login} </span>
              <Icons.arrowRight className="size-4" />
            </Button>
          ) : (
            <Skeleton className="hidden h-9 w-28 rounded-full md:flex" />
          )}
        </div> */}
      </MaxWidthWrapper>
    </header>
  );
}

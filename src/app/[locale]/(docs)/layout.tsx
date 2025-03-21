import { NavMobile } from "@/components/layout/mobile-nav";
import { NavBar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { getDocsConfig } from "@/config/docs";
import { getMarketingConfig } from "@/config/marketing";
import { getTranslations, setRequestLocale } from "next-intl/server";

// Type definition for layout params
type DocsLayoutParams = {
  locale: string;
};

interface DocsLayoutProps {
  children: React.ReactNode;
  params: Promise<DocsLayoutParams>;
}

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const t = await getTranslations();
  const marketingConfig = getMarketingConfig(t);
  const docsConfig = getDocsConfig(t);

  const translations = {
    adminPanel: t('Dashboard.sidebar.adminPanel'),
    dashboard: t('Dashboard.sidebar.dashboard'),
    login: t('Marketing.login'),
    signUp: t('Marketing.signUp'),
  };

  return (
    <div className="flex flex-col">
      <NavMobile marketingConfig={marketingConfig} docsConfig={docsConfig} translations={translations} />
      <NavBar marketingConfig={marketingConfig} docsConfig={docsConfig} translations={translations} />
      <MaxWidthWrapper className="min-h-screen" large>
        {children}
      </MaxWidthWrapper>
      <SiteFooter className="border-t" />
    </div>
  );
}

import { I18nProvider } from "@/components/portfolio/i18n-provider";
import { PortfolioContent } from "@/components/portfolio/portfolio-content";

export default function PortfolioPage() {
  return (
    <I18nProvider>
      <PortfolioContent />
    </I18nProvider>
  );
}

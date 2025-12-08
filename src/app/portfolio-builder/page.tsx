import PortfolioBuilder from '@/components/portfolio/PortfolioBuilder';
import Header from '@/components/layout/Header';

export default function PortfolioBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <PortfolioBuilder />
      </main>
    </div>
  );
}

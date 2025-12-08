import type { PortfolioData } from '@/lib/types';
import PortfolioTemplate1 from './templates/PortfolioTemplate1';

type PortfolioPreviewProps = {
  portfolioData: PortfolioData;
};

export default function PortfolioPreview({ portfolioData }: PortfolioPreviewProps) {
  return (
    <div className="w-full h-full">
      <PortfolioTemplate1 data={portfolioData} />
    </div>
  );
}

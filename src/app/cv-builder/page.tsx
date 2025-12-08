import CvBuilder from '@/components/cv/CvBuilder';
import Header from '@/components/layout/Header';

export default function CvBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <CvBuilder />
      </main>
    </div>
  );
}

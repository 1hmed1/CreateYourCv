'use client';

import { useState } from 'react';
import type { PortfolioData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PortfolioForm from './PortfolioForm';
import PortfolioPreview from './PortfolioPreview';

const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '+92 300 1234567',
    address: 'City, Country',
    linkedin: 'linkedin.com/in/yourprofile',
    website: 'yourportfolio.com',
    summary: 'A passionate developer and designer creating beautiful and functional web experiences. Welcome to my portfolio.',
  },
  projects: [
    {
      id: 'proj1',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce website built with Next.js, Stripe, and PostgreSQL. Features product management, user authentication, and a responsive design.',
      imageUrl: 'https://picsum.photos/seed/port1/600/400',
      projectUrl: '#',
      tags: ['Next.js', 'TypeScript', 'Stripe'],
    },
    {
      id: 'proj2',
      title: 'Data Visualization Dashboard',
      description: 'An interactive dashboard for visualizing sales data, created using D3.js and React. Allows users to filter and explore data dynamically.',
      imageUrl: 'https://picsum.photos/seed/port2/600/400',
      projectUrl: '#',
      tags: ['React', 'D3.js', 'Data Viz'],
    },
  ],
};

export default function PortfolioBuilder() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(initialPortfolioData);
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: 'Preparing PDF...',
      description: 'Your portfolio will be prepared for download. Please use the "Save as PDF" option in the print dialog.',
    });
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
      <div className="col-span-1 p-4 lg:p-8 overflow-y-auto bg-card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-headline">Portfolio Builder</h1>
          <Button onClick={handlePrint} size="sm"><Download className="mr-2" /> Download PDF</Button>
        </div>
        <PortfolioForm portfolioData={portfolioData} setPortfolioData={setPortfolioData} />
      </div>
      <div className="col-span-1 p-4 lg:p-8 flex flex-col items-center">
        <div id="portfolio-preview-container" className="w-full h-full bg-background shadow-2xl overflow-auto rounded-lg">
          <PortfolioPreview portfolioData={portfolioData} />
        </div>
      </div>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #portfolio-preview-container, #portfolio-preview-container * {
            visibility: visible;
          }
          #portfolio-preview-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            max-width: 100%;
            box-shadow: none;
            overflow: visible;
            background: white;
            border-radius: 0;
          }
           @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}

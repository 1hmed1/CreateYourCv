'use client';

import { useState } from 'react';
import type { CvData, Template } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Bot } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import CvForm from './CvForm';
import CvPreview from './CvPreview';
import AtsChecker from './AtsChecker';

const initialCvData: CvData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '+92 300 1234567',
    address: 'City, Country',
    linkedin: 'linkedin.com/in/yourprofile',
    website: 'yourportfolio.com',
    summary: 'A brief professional summary about yourself, highlighting your key skills and career goals. Aim for 2-3 sentences.',
  },
  experience: [
    {
      id: 'exp1',
      company: 'Awesome Company',
      position: 'Software Engineer',
      startDate: '2020-01-01',
      endDate: 'Present',
      description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to deliver high-quality software.',
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Example',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2016-09-01',
      endDate: '2020-05-31',
      description: 'Graduated with honors. Relevant coursework: Data Structures, Algorithms, Web Development.',
    },
  ],
  skills: [
    { id: 'skill1', name: 'React', level: 'Expert' },
    { id: 'skill2', name: 'TypeScript', level: 'Advanced' },
    { id: 'skill3', name: 'Node.js', level: 'Advanced' },
  ],
};

export default function CvBuilder() {
  const [cvData, setCvData] = useState<CvData>(initialCvData);
  const [template, setTemplate] = useState<Template>('modern');
  const { toast } = useToast();

  const handlePrint = () => {
    toast({
      title: 'Preparing PDF...',
      description: 'Your CV will be prepared for download. Please use the "Save as PDF" option in the print dialog.',
    });
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
      <div className="col-span-1 p-4 lg:p-8 overflow-y-auto bg-card">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold font-headline">CV Builder</h1>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"><Bot className="mr-2" /> ATS Check</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>ATS Compatibility Checker</DialogTitle>
                </DialogHeader>
                <AtsChecker cvData={cvData} />
              </DialogContent>
            </Dialog>
            <Button onClick={handlePrint} size="sm"><Download className="mr-2" /> Download PDF</Button>
          </div>
        </div>
        <CvForm cvData={cvData} setCvData={setCvData} />
      </div>
      <div className="col-span-1 p-4 lg:p-8 flex flex-col items-center">
        <Tabs value={template} onValueChange={(value) => setTemplate(value as Template)} className="mb-4">
          <TabsList>
            <TabsTrigger value="modern">Modern</TabsTrigger>
            <TabsTrigger value="classic" disabled>Classic (soon)</TabsTrigger>
          </TabsList>
        </Tabs>
        <div id="cv-preview-container" className="w-full max-w-[8.5in] aspect-[8.5/11] bg-white shadow-2xl overflow-hidden">
          <CvPreview cvData={cvData} template={template} />
        </div>
      </div>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-preview-container, #cv-preview-container * {
            visibility: visible;
          }
          #cv-preview-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            max-width: 100%;
            box-shadow: none;
            transform: scale(1);
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

'use client';

import { useState } from 'react';
import { analyzeCvForAtsCompatibility, AnalyzeCvForAtsCompatibilityOutput } from '@/ai/flows/ats-compatibility-assistance';
import type { CvData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function formatCvDataAsText(cvData: CvData): string {
  let text = `Name: ${cvData.personalInfo.name}\n`;
  text += `Email: ${cvData.personalInfo.email}\n`;
  text += `Phone: ${cvData.personalInfo.phone}\n`;
  text += `Address: ${cvData.personalInfo.address}\n\n`;
  text += `Summary: ${cvData.personalInfo.summary}\n\n`;

  text += '--- Experience ---\n';
  cvData.experience.forEach(exp => {
    text += `${exp.position} at ${exp.company}\n`;
    text += `${exp.startDate} - ${exp.endDate}\n`;
    text += `${exp.description}\n\n`;
  });

  text += '--- Education ---\n';
  cvData.education.forEach(edu => {
    text += `${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution}\n`;
    text += `${edu.startDate} - ${edu.endDate}\n`;
    text += `${edu.description}\n\n`;
  });

  text += '--- Skills ---\n';
  text += cvData.skills.map(s => s.name).join(', ') + '\n';
  
  return text;
}

export default function AtsChecker({ cvData }: { cvData: CvData }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeCvForAtsCompatibilityOutput | null>(null);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    setLoading(true);
    setResult(null);
    try {
      const cvText = formatCvDataAsText(cvData);
      const analysisResult = await analyzeCvForAtsCompatibility({ cvText });
      setResult(analysisResult);
    } catch (error) {
      console.error('ATS analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: 'Could not analyze the CV. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-muted-foreground">
        This tool analyzes the content and structure of your current CV draft for compatibility with common Applicant Tracking Systems (ATS). It provides feedback to help you improve your chances of passing automated screening.
      </p>
      <Button onClick={handleAnalysis} disabled={loading}>
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Analyze My CV
      </Button>
      {result && (
        <Alert variant={result.isAtsFriendly ? 'default' : 'destructive'} className="mt-4">
          {result.isAtsFriendly ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle>
            {result.isAtsFriendly ? 'This CV appears to be ATS-friendly!' : 'Potential ATS Compatibility Issues Found'}
          </AlertTitle>
          <AlertDescription>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {result.feedback}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

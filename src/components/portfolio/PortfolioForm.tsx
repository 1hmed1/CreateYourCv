'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { PortfolioData, Project } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle, Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { summarizeProjectDescription } from '@/ai/flows/summarize-portfolio-project';
import { useState } from 'react';

type PortfolioFormProps = {
  portfolioData: PortfolioData;
  setPortfolioData: Dispatch<SetStateAction<PortfolioData>>;
};

export default function PortfolioForm({ portfolioData, setPortfolioData }: PortfolioFormProps) {
  const [summarizingId, setSummarizingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPortfolioData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handleProjectChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setPortfolioData(prev => ({
        ...prev,
        projects: prev.projects.map(item => item.id === id ? { ...item, [name]: value } : item)
      }));
  };
  
  const handleProjectTagsChange = (id: string, value: string) => {
      setPortfolioData(prev => ({
        ...prev,
        projects: prev.projects.map(item => item.id === id ? { ...item, tags: value.split(',').map(t => t.trim()) } : item)
      }));
  };

  const addProject = () => {
    const newProject: Project = { id: `proj${Date.now()}`, title: 'New Project', description: '', imageUrl: 'https://picsum.photos/seed/new-proj/600/400', projectUrl: '', tags: [] };
    setPortfolioData(prev => ({...prev, projects: [...prev.projects, newProject] }));
  };

  const removeProject = (id: string) => {
    setPortfolioData(prev => ({ ...prev, projects: prev.projects.filter(item => item.id !== id) }));
  };

  const handleSummarize = async (project: Project) => {
    if (!project.description) {
        toast({ variant: 'destructive', title: 'Description is empty.' });
        return;
    }
    setSummarizingId(project.id);
    try {
        const result = await summarizeProjectDescription({ projectDescription: project.description });
        setPortfolioData(prev => ({
            ...prev,
            projects: prev.projects.map(item => item.id === project.id ? { ...item, description: result.summary } : item)
        }));
        toast({ title: 'Description summarized successfully!' });
    } catch(e) {
        toast({ variant: 'destructive', title: 'Failed to summarize.' });
    } finally {
        setSummarizingId(null);
    }
  }
  
  return (
    <Accordion type="multiple" defaultValue={['personal-info', 'projects']} className="w-full">
      <AccordionItem value="personal-info">
        <AccordionTrigger>Personal Information</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={portfolioData.personalInfo.name} onChange={handlePersonalInfoChange} /></div>
            <div><Label htmlFor="website">Website/Portfolio URL</Label><Input id="website" name="website" value={portfolioData.personalInfo.website} onChange={handlePersonalInfoChange} /></div>
          </div>
          <div><Label htmlFor="summary">Headline/Summary</Label><Textarea id="summary" name="summary" value={portfolioData.personalInfo.summary} onChange={handlePersonalInfoChange} rows={3} /></div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="projects">
        <AccordionTrigger>Projects</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {portfolioData.projects.map((proj) => (
            <div key={proj.id} className="p-4 border rounded-lg space-y-4 relative">
                <div><Label htmlFor={`title-${proj.id}`}>Project Title</Label><Input id={`title-${proj.id}`} name="title" value={proj.title} onChange={(e) => handleProjectChange(proj.id, e)} /></div>
                <div>
                    <Label htmlFor={`description-${proj.id}`}>Description</Label>
                    <Textarea id={`description-${proj.id}`} name="description" value={proj.description} onChange={(e) => handleProjectChange(proj.id, e)} rows={4}/>
                    <Button size="sm" variant="ghost" className="mt-1" onClick={() => handleSummarize(proj)} disabled={summarizingId === proj.id}>
                        {summarizingId === proj.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Bot className="mr-2 h-4 w-4"/>}
                        AI Summarize
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor={`imageUrl-${proj.id}`}>Image URL</Label><Input id={`imageUrl-${proj.id}`} name="imageUrl" value={proj.imageUrl} onChange={(e) => handleProjectChange(proj.id, e)} /></div>
                    <div><Label htmlFor={`projectUrl-${proj.id}`}>Project URL</Label><Input id={`projectUrl-${proj.id}`} name="projectUrl" value={proj.projectUrl} onChange={(e) => handleProjectChange(proj.id, e)} /></div>
                </div>
                <div><Label htmlFor={`tags-${proj.id}`}>Tags (comma-separated)</Label><Input id={`tags-${proj.id}`} name="tags" value={proj.tags.join(', ')} onChange={(e) => handleProjectTagsChange(proj.id, e.target.value)} /></div>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeProject(proj.id)}><Trash2 className="w-4 h-4"/></Button>
            </div>
          ))}
          <Button variant="outline" onClick={addProject}><PlusCircle className="mr-2 h-4 w-4" /> Add Project</Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

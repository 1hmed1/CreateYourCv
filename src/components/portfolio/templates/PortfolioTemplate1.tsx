import type { PortfolioData } from '@/lib/types';
import { Mail, Linkedin, Globe, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function PortfolioTemplate1({ data }: { data: PortfolioData }) {
    const { personalInfo, projects } = data;

    return (
        <div className="bg-background text-foreground min-h-full">
            <header className="py-16 md:py-24 bg-card text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary">{personalInfo.name}</h1>
                <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">{personalInfo.summary}</p>
                <div className="mt-8 flex justify-center gap-6 text-foreground/70">
                    {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:text-primary"><Mail /></a>}
                    {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Linkedin /></a>}
                    {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><Globe /></a>}
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-12 font-headline">My Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map(project => (
                        <div key={project.id} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                            <div className="relative w-full h-48">
                                <Image src={project.imageUrl} alt={project.title} fill style={{objectFit: 'cover'}} data-ai-hint="abstract design" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2 font-headline">{project.title}</h3>
                                <p className="text-foreground/70 mb-4 flex-1">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                                </div>
                                {project.projectUrl && project.projectUrl !== '#' && (
                                     <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-accent-foreground font-semibold inline-flex items-center self-start bg-accent px-3 py-1 rounded-md hover:bg-accent/90">
                                        View Project <ExternalLink className="ml-2 h-4 w-4"/>
                                     </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

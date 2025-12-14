import type { CvData } from '@/lib/types';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Wrench, User, Award, Star, Languages, Heart, Projector } from 'lucide-react';

const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
        return dateString;
    }
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
    <section className={className}>
        <h2 className="flex items-center gap-3 text-xl font-bold text-primary mb-4">
            {icon}
            <span>{title}</span>
        </h2>
        {children}
    </section>
);


export default function ProfessionalTemplate({ data }: { data: CvData }) {
    const { personalInfo, experience, education, skills, projects, certifications, achievements, hobbies, languages } = data;
    return (
        <div className="bg-white text-[#334155] p-8 font-sans text-sm leading-relaxed h-full w-full overflow-auto">
            {/* Header */}
            <header className="flex items-center gap-8 mb-8 border-b-2 border-gray-200 pb-6">
                 {personalInfo.showPhoto && personalInfo.photoUrl && personalInfo.photoUrl.trim() !== '' && (
                    <div className="shrink-0">
                        <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={120} height={120} className="rounded-full shadow-md" data-ai-hint="headshot photo" />
                    </div>
                )}
                <div className="flex-grow">
                    <h1 className="text-5xl font-bold text-primary tracking-tight">{personalInfo.name}</h1>
                    {experience.length > 0 && <p className="text-xl text-accent mt-2">{experience[0].position}</p>}
                    <div className="flex items-center gap-x-4 gap-y-1 text-xs mt-4 text-gray-500 flex-wrap">
                        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-primary"><Mail size={14} /><span>{personalInfo.email}</span></a>}
                        {personalInfo.phone && <span className="flex items-center gap-2"><Phone size={14} /><span>{personalInfo.phone}</span></span>}
                        {personalInfo.address && <span className="flex items-center gap-2"><MapPin size={14} /><span>{personalInfo.address}</span></span>}
                        {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Linkedin size={14} /><span>{personalInfo.linkedin}</span></a>}
                        {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary"><Globe size={14} /><span>{personalInfo.website}</span></a>}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-3 gap-x-10">
                <div className="col-span-2 space-y-8">
                     <Section title="Profile" icon={<User className="w-6 h-6" />}>
                        <p className="text-gray-700">{personalInfo.summary}</p>
                    </Section>

                    <Section title="Work Experience" icon={<Briefcase className="w-6 h-6" />}>
                        <div className="space-y-6 border-l-2 border-gray-200 pl-6 relative">
                            {experience.map((exp) => (
                                <div key={exp.id} className="relative">
                                    <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-white"></div>
                                    <p className="text-xs font-semibold text-accent uppercase tracking-wider">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    <h3 className="text-base font-semibold text-gray-800 mt-1">{exp.position}</h3>
                                    <p className="text-sm font-medium text-gray-600">{exp.company}</p>
                                    <ul className="mt-2 text-xs text-gray-600 list-disc list-inside space-y-1">
                                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Education" icon={<GraduationCap className="w-6 h-6" />}>
                         <div className="space-y-6 border-l-2 border-gray-200 pl-6 relative">
                            {education.map(edu => (
                                <div key={edu.id} className="relative">
                                    <div className="absolute -left-[33px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-white"></div>
                                    <p className="text-xs font-semibold text-accent uppercase tracking-wider">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                    <h3 className="text-base font-semibold text-gray-800 mt-1">{edu.degree}, {edu.fieldOfStudy}</h3>
                                    <p className="text-sm font-medium text-gray-600">{edu.institution}</p>
                                    {edu.description && <p className="mt-1 text-xs text-gray-600">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </Section>

                    {projects.length > 0 && <Section title="Projects" icon={<Projector className="w-6 h-6" />}>
                        <div className="space-y-4">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <h3 className="text-base font-semibold">{proj.title}</h3>
                                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{proj.url}</a>}
                                    <p className="mt-1 text-xs text-gray-600">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>}
                </div>

                <div className="col-span-1 space-y-8">
                    <Section title="Skills" icon={<Wrench className="w-6 h-6" />}>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(skill => (
                                <div key={skill.id} className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1 rounded-full">{skill.name}</div>
                            ))}
                        </div>
                    </Section>
                    
                    {certifications.length > 0 && <Section title="Certifications" icon={<Star className="w-6 h-6" />}>
                        <div className="space-y-3">
                            {certifications.map(cert => (
                                <div key={cert.id} className="text-xs">
                                    <p className="font-semibold">{cert.name}</p>
                                    <p className="text-gray-600">{cert.issuer} - {formatDate(cert.date)}</p>
                                </div>
                            ))}
                        </div>
                    </Section>}

                    {achievements.length > 0 && <Section title="Achievements" icon={<Award className="w-6 h-6" />}>
                         <ul className="space-y-1 list-disc list-inside text-xs text-gray-600">
                            {achievements.map(ach => (
                                <li key={ach.id}>{ach.description}</li>
                            ))}
                        </ul>
                    </Section>}

                    {languages.length > 0 && <Section title="Languages" icon={<Languages className="w-6 h-6" />}>
                        <div className="space-y-2">
                            {languages.map(lang => (
                                <div key={lang.id} className="flex justify-between text-xs">
                                    <span>{lang.name}</span>
                                    <span className="text-gray-600">{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </Section>}

                    {hobbies.length > 0 && <Section title="Hobbies & Interests" icon={<Heart className="w-6 h-6" />}>
                        <p className="text-xs text-gray-600">{hobbies.map(h => h.name).join(', ')}</p>
                    </Section>}
                </div>
            </div>
        </div>
    );
}

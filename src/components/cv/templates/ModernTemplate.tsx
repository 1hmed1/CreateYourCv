import type { CvData } from '@/lib/types';
import { Mail, Phone, Linkedin, Globe, MapPin, Award, Projector, Heart, Languages, Star, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
        return dateString;
    }
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <section className="mt-8">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">
            {icon}
            <span>{title}</span>
        </h2>
        {children}
    </section>
);

export default function ModernTemplate({ data }: { data: CvData }) {
    const { personalInfo, experience, education, skills, projects, certifications, achievements, hobbies, languages } = data;
    return (
        <div className="bg-white text-gray-800 p-8 font-sans text-sm h-full w-full overflow-auto">
            <div className="grid grid-cols-12 gap-x-8">
                {/* Main Content */}
                <div className="col-span-8 pr-8">
                    <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name}</h1>
                    {experience.length > 0 && <p className="text-lg font-medium text-primary mt-1">{experience[0].position}</p>}
                    <p className="mt-4 text-gray-600">{personalInfo.summary}</p>

                    <Section title="Experience" icon={<Linkedin size={20} />}>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-base">{exp.position}</h3>
                                        <p className="text-xs font-medium text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                                    <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1 text-xs">
                                        {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>
                    
                    <Section title="Education" icon={<GraduationCap size={20} />}>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-base">{edu.institution}</h3>
                                        <p className="text-xs font-medium text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
                                    <p className="mt-1 text-gray-600 text-xs">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {projects.length > 0 && (
                        <Section title="Projects" icon={<Projector size={20} />}>
                            <div className="space-y-4">
                                {projects.map(proj => (
                                    <div key={proj.id}>
                                        <h3 className="font-semibold text-base">{proj.title}</h3>
                                        {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{proj.url}</a>}
                                        <p className="mt-1 text-gray-600 text-xs">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}
                </div>
                
                {/* Sidebar */}
                <div className="col-span-4 border-l-2 border-gray-200 pl-8">
                    {personalInfo.showPhoto && personalInfo.photoUrl && personalInfo.photoUrl.trim() !== '' && (
                        <div className="mb-8">
                            <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={160} height={160} className="rounded-full mx-auto" data-ai-hint="headshot photo" />
                        </div>
                    )}
                    <section>
                        <h2 className="text-lg font-bold text-gray-800">Contact</h2>
                        <div className="mt-2 space-y-2 text-xs">
                            {personalInfo.email && <p className="flex items-center gap-2"><Mail size={14} className="text-gray-500" /><span>{personalInfo.email}</span></p>}
                            {personalInfo.phone && <p className="flex items-center gap-2"><Phone size={14} className="text-gray-500" /><span>{personalInfo.phone}</span></p>}
                            {personalInfo.address && <p className="flex items-center gap-2"><MapPin size={14} className="text-gray-500" /><span>{personalInfo.address}</span></p>}
                            {personalInfo.linkedin && <p className="flex items-center gap-2"><Linkedin size={14} className="text-gray-500" /><span>{personalInfo.linkedin}</span></p>}
                            {personalInfo.website && <p className="flex items-center gap-2"><Globe size={14} className="text-gray-500" /><span>{personalInfo.website}</span></p>}
                        </div>
                    </section>

                    <section className="mt-6">
                        <h2 className="text-lg font-bold text-gray-800">Skills</h2>
                        <div className="mt-2 space-y-2">
                            {skills.map(skill => (
                                <div key={skill.id}>
                                    <p className="text-sm font-medium">{skill.name}</p>
                                    <p className="text-xs text-gray-500">{skill.level}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {certifications.length > 0 && <section className="mt-6">
                        <h2 className="text-lg font-bold text-gray-800">Certifications</h2>
                        <div className="mt-2 space-y-2">
                            {certifications.map(cert => (
                                <div key={cert.id} className="text-xs">
                                    <p className="font-semibold">{cert.name}</p>
                                    <p className="text-gray-600">{cert.issuer} - {formatDate(cert.date)}</p>
                                </div>
                            ))}
                        </div>
                    </section>}

                    {achievements.length > 0 && <section className="mt-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Award size={16}/>Achievements</h2>
                        <ul className="mt-2 space-y-1 list-disc list-inside text-xs">
                            {achievements.map(ach => (
                                <li key={ach.id}>{ach.description}</li>
                            ))}
                        </ul>
                    </section>}
                    
                    {languages.length > 0 && <section className="mt-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Languages size={16}/>Languages</h2>
                        <div className="mt-2 space-y-1">
                            {languages.map(lang => (
                                <p key={lang.id} className="text-xs">{lang.name} ({lang.proficiency})</p>
                            ))}
                        </div>
                    </section>}
                    
                    {hobbies.length > 0 && <section className="mt-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Heart size={16}/>Hobbies</h2>
                        <p className="text-xs mt-2">{hobbies.map(h => h.name).join(', ')}</p>
                    </section>}
                </div>
            </div>
        </div>
    );
}

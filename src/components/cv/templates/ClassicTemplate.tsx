import type { CvData } from '@/lib/types';
import Image from 'next/image';

const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch {
        return dateString;
    }
};

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <section className={className}>
        <h2 className="text-lg font-bold tracking-widest border-b-2 border-black pb-1 mb-4">{title.toUpperCase()}</h2>
        {children}
    </section>
);


export default function ClassicTemplate({ data }: { data: CvData }) {
    const { personalInfo, experience, education, skills, projects, certifications, achievements, hobbies, languages } = data;
    return (
        <div className="bg-white text-black p-8 font-serif text-[10pt] leading-snug h-full w-full overflow-auto">
            {/* Header */}
            <header className="text-center border-b-4 border-black pb-4 mb-6">
                <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name.toUpperCase()}</h1>
                {experience.length > 0 && <p className="text-lg font-medium tracking-widest mt-1">{experience[0].position}</p>}
                
                <div className="flex justify-center gap-x-4 gap-y-1 text-xs mt-3 flex-wrap">
                    {personalInfo.email && <p><span>{personalInfo.email}</span></p>}
                    {personalInfo.phone && <p><span>|</span><span className="ml-4">{personalInfo.phone}</span></p>}
                    {personalInfo.address && <p><span>|</span><span className="ml-4">{personalInfo.address}</span></p>}
                </div>
                 <div className="flex justify-center gap-x-4 gap-y-1 text-xs mt-1 flex-wrap">
                    {personalInfo.linkedin && <p><span>{personalInfo.linkedin}</span></p>}
                    {personalInfo.website && <p><span>|</span><span className="ml-4">{personalInfo.website}</span></p>}
                </div>
            </header>

            {/* Summary */}
            <p className="text-center text-sm mb-6">{personalInfo.summary}</p>
            
            {/* Main Content */}
            <div className="grid grid-cols-3 gap-x-8">
                {/* Left Column */}
                <div className="col-span-2 space-y-6">
                    {personalInfo.showPhoto && personalInfo.photoUrl && (
                        <div className="md:hidden mb-6 flex justify-center">
                             <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={120} height={120} className="rounded-full" data-ai-hint="headshot photo" />
                        </div>
                    )}
                    <Section title="Experience">
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base">{exp.position}</h3>
                                        <p className="text-xs font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-semibold italic">{exp.company}</p>
                                    <ul className="mt-1 text-sm list-disc list-inside space-y-1">
                                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Education">
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base">{edu.degree}, {edu.fieldOfStudy}</h3>
                                        <p className="text-xs font-medium">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-semibold italic">{edu.institution}</p>
                                    <p className="mt-1 text-sm">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                     {projects.length > 0 && <Section title="Projects">
                        <div className="space-y-3">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <h3 className="font-bold text-base">{proj.title}</h3>
                                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs italic hover:underline">{proj.url}</a>}
                                    <p className="mt-1 text-sm">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>}
                </div>
                
                {/* Right Column */}
                <div className="col-span-1 space-y-6">
                   {personalInfo.showPhoto && personalInfo.photoUrl && (
                        <div className="hidden md:block">
                            <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={150} height={150} className="rounded-full mx-auto" data-ai-hint="headshot photo" />
                        </div>
                    )}
                    <Section title="Skills">
                        <div className="space-y-1">
                            {skills.map(skill => (
                                <p key={skill.id} className="text-sm">{skill.name} ({skill.level})</p>
                            ))}
                        </div>
                    </Section>

                    {certifications.length > 0 && <Section title="Certifications">
                        <div className="space-y-2">
                            {certifications.map(cert => (
                                <div key={cert.id} className="text-sm">
                                    <p className="font-semibold">{cert.name}</p>
                                    <p className="italic">{cert.issuer} - {formatDate(cert.date)}</p>
                                </div>
                            ))}
                        </div>
                    </Section>}

                    {achievements.length > 0 && <Section title="Achievements">
                        <ul className="space-y-1 list-disc list-inside text-sm">
                            {achievements.map(ach => (
                                <li key={ach.id}>{ach.description}</li>
                            ))}
                        </ul>
                    </Section>}
                    
                    {languages.length > 0 && <Section title="Languages">
                        <div className="space-y-1">
                            {languages.map(lang => (
                                <p key={lang.id} className="text-sm">{lang.name} ({lang.proficiency})</p>
                            ))}
                        </div>
                    </Section>}

                    {hobbies.length > 0 && <Section title="Hobbies & Interests">
                        <p className="text-sm">{hobbies.map(h => h.name).join(', ')}</p>
                    </Section>}
                </div>
            </div>
        </div>
    );
}

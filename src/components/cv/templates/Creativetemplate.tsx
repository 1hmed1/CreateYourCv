import type { CvData } from '@/lib/types';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Globe, MapPin, Award, Star, Languages, Heart, Projector, Briefcase, GraduationCap } from 'lucide-react';

const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
        return dateString;
    }
};

const skillLevelToPercentage = (level: CvData['skills'][0]['level']) => {
    switch (level) {
        case 'Beginner': return 25;
        case 'Intermediate': return 50;
        case 'Advanced': return 75;
        case 'Expert': return 95;
        default: return 0;
    }
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className }) => (
    <section className={className}>
        <h2 className="flex items-center gap-3 text-xl font-bold text-[#5D6D7E] mb-4">
            {icon}
            <span>{title}</span>
        </h2>
        {children}
    </section>
);


export default function CreativeTemplate({ data }: { data: CvData }) {
    const { personalInfo, experience, education, skills, projects, certifications, achievements, hobbies, languages } = data;
    const { position } = experience[0] || { position: 'Your Title' };

    return (
        <div className="bg-white text-gray-800 text-sm h-full w-full flex overflow-auto">
            {/* Left Column */}
            <div className="w-1/3 bg-[#2C3E50] text-white p-6 flex flex-col gap-6">
                <div className="text-center mt-4">
                    {personalInfo.showPhoto && personalInfo.photoUrl && personalInfo.photoUrl.trim() !== '' && (
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-white bg-[#5D6D7E] flex items-center justify-center overflow-hidden mb-4">
                             <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={128} height={128} className="object-cover" data-ai-hint="headshot photo" />
                        </div>
                    )}
                    <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
                    <p className="text-lg font-light tracking-widest">{position.toUpperCase()}</p>
                </div>

                <section>
                    <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2">ABOUT ME</h2>
                    <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
                </section>

                <section>
                    <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2">CONTACT</h2>
                    <div className="space-y-2 text-xs">
                        {personalInfo.phone && <p className="flex items-center gap-3"><Phone size={14} /><span>{personalInfo.phone}</span></p>}
                        {personalInfo.email && <p className="flex items-center gap-3"><Mail size={14} /><span>{personalInfo.email}</span></p>}
                        {personalInfo.website && <p className="flex items-center gap-3"><Globe size={14} /><span>{personalInfo.website}</span></p>}
                        {personalInfo.linkedin && <p className="flex items-center gap-3"><Linkedin size={14} /><span>{personalInfo.linkedin}</span></p>}
                        {personalInfo.address && <p className="flex items-center gap-3"><MapPin size={14} /><span>{personalInfo.address}</span></p>}
                    </div>
                </section>
                
                <section>
                    <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2">SKILLS</h2>
                    <div className="space-y-4 text-xs">
                       {skills.map(skill => (
                           <div key={skill.id}>
                               <p>{skill.name} - {skill.level}</p>
                               <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
                                   <div className="bg-white h-1.5 rounded-full" style={{width: `${skillLevelToPercentage(skill.level)}%`}}></div>
                               </div>
                           </div>
                       ))}
                    </div>
                </section>
                
                {languages.length > 0 && <section>
                    <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2 flex items-center gap-2"><Languages size={16}/>LANGUAGES</h2>
                    <div className="space-y-1 text-xs">
                        {languages.map(lang => (
                            <p key={lang.id}>{lang.name} <span className="text-gray-300">({lang.proficiency})</span></p>
                        ))}
                    </div>
                </section>}
                
                {hobbies.length > 0 && <section>
                    <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2 flex items-center gap-2"><Heart size={16}/>HOBBIES</h2>
                    <p className="text-xs">{hobbies.map(h => h.name).join(', ')}</p>
                </section>}

            </div>
            {/* Right Column */}
            <div className="w-2/3 bg-gray-50 text-[#2C3E50] p-8 space-y-6">
                <Section title="EXPERIENCE" icon={<Briefcase size={20} />}>
                    <div className="space-y-5">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline">
                                  <h3 className="font-bold">{exp.position} at {exp.company}</h3>
                                  <p className="text-xs font-medium text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                </div>
                                <ul className="mt-1 text-xs list-disc list-inside space-y-1 text-gray-600">
                                    {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Section>
                <Section title="EDUCATION" icon={<GraduationCap size={20} />}>
                    <div className="space-y-4">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold">{edu.degree}, {edu.fieldOfStudy}</h3>
                                    <p className="text-xs font-medium text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                </div>
                                <p className="italic">{edu.institution}</p>
                                {edu.description && <p className="text-xs mt-1 text-gray-600">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </Section>
                 {projects.length > 0 && (
                    <Section title="PROJECTS" icon={<Projector size={20} />}>
                        <div className="space-y-3">
                            {projects.map(proj => (
                                <div key={proj.id}>
                                    <h3 className="font-bold">{proj.title}</h3>
                                    {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{proj.url}</a>}
                                    <p className="mt-1 text-xs text-gray-600">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}
                {certifications.length > 0 && (
                    <Section title="CERTIFICATIONS" icon={<Star size={20} />}>
                        <ul className="space-y-1 list-disc list-inside text-xs text-gray-600">
                            {certifications.map(cert => (
                                <li key={cert.id}>{cert.name} from {cert.issuer} ({formatDate(cert.date)})</li>
                            ))}
                        </ul>
                    </Section>
                )}
                {achievements.length > 0 && (
                    <Section title="ACHIEVEMENTS" icon={<Award size={20} />}>
                        <ul className="space-y-1 list-disc list-inside text-xs text-gray-600">
                            {achievements.map(ach => (
                                <li key={ach.id}>{ach.description}</li>
                            ))}
                        </ul>
                    </Section>
                )}
            </div>
        </div>
    );
}
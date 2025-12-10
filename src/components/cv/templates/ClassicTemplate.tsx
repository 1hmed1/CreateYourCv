import type { CvData } from '@/lib/types';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch {
        return dateString;
    }
};

export default function ClassicTemplate({ data }: { data: CvData }) {
    const { personalInfo, experience, education, skills } = data;
    return (
        <div className="bg-white text-black p-10 font-serif text-[11pt] leading-snug h-full w-full">
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-4">
                {personalInfo.showPhoto && personalInfo.photoUrl && (
                  <div className="mb-4">
                      <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={100} height={100} className="rounded-full mx-auto" data-ai-hint="headshot photo" />
                  </div>
                )}
                <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name.toUpperCase()}</h1>
                <div className="flex justify-center gap-x-4 gap-y-1 text-xs mt-3 flex-wrap">
                    {personalInfo.email && <p className="flex items-center gap-2"><span>{personalInfo.email}</span></p>}
                    {personalInfo.phone && <p className="flex items-center gap-2"><span>|</span><span>{personalInfo.phone}</span></p>}
                    {personalInfo.address && <p className="flex items-center gap-2"><span>|</span><span>{personalInfo.address}</span></p>}
                </div>
                 <div className="flex justify-center gap-x-4 gap-y-1 text-xs mt-1 flex-wrap">
                    {personalInfo.linkedin && <p className="flex items-center gap-2"><span>{personalInfo.linkedin}</span></p>}
                    {personalInfo.website && <p className="flex items-center gap-2"><span>|</span><span>{personalInfo.website}</span></p>}
                </div>
            </div>

            {/* Summary */}
            <section className="mt-6">
                <p>{personalInfo.summary}</p>
            </section>
            
            {/* Main Content */}
            <div className="mt-6 grid grid-cols-12 gap-x-10">
                <div className="col-span-8 space-y-8">
                     {/* Experience */}
                    <section>
                        <h2 className="text-lg font-bold tracking-widest border-b border-black pb-1 mb-4">EXPERIENCE</h2>
                        <div className="space-y-5">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base">{exp.position}</h3>
                                        <p className="text-xs font-medium">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-semibold italic">{exp.company}</p>
                                    <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                                        {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-lg font-bold tracking-widest border-b border-black pb-1 mb-4">EDUCATION</h2>
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
                    </section>
                </div>
                
                {/* Sidebar */}
                <div className="col-span-4 space-y-8">
                    <section>
                        <h2 className="text-lg font-bold tracking-widest border-b border-black pb-1 mb-4">SKILLS</h2>
                        <div className="mt-2 space-y-2">
                            {skills.map(skill => (
                                <div key={skill.id}>
                                    <p className="text-sm font-medium">{skill.name} ({skill.level})</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

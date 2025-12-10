import type { CvData } from '@/lib/types';
import Image from 'next/image';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
        return dateString;
    }
};

export default function ProfessionalTemplate({ data }: { data: CvData }) {
    const { personalInfo, experience, education, skills } = data;
    return (
        <div className="bg-white text-gray-800 p-8 font-sans text-sm h-full w-full">
            {/* Header */}
            <header className="flex items-center justify-between border-b-2 border-gray-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{personalInfo.name}</h1>
                    <div className="flex items-center gap-x-4 gap-y-1 text-xs mt-2 text-gray-500 flex-wrap">
                        {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-blue-600"><Mail size={12} /><span>{personalInfo.email}</span></a>}
                        {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} /><span>{personalInfo.phone}</span></span>}
                        {personalInfo.address && <span className="flex items-center gap-1.5"><MapPin size={12} /><span>{personalInfo.address}</span></span>}
                    </div>
                    <div className="flex items-center gap-x-4 gap-y-1 text-xs mt-1 text-gray-500 flex-wrap">
                       {personalInfo.linkedin && <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Linkedin size={12} /><span>{personalInfo.linkedin}</span></a>}
                       {personalInfo.website && <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600"><Globe size={12} /><span>{personalInfo.website}</span></a>}
                    </div>
                </div>
                {personalInfo.showPhoto && personalInfo.photoUrl && (
                    <div className="flex-shrink-0">
                        <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={100} height={100} className="rounded-md" data-ai-hint="headshot photo" />
                    </div>
                )}
            </header>

            {/* Summary */}
            <section className="mt-6">
                <h2 className="text-base font-bold uppercase tracking-wider text-gray-600 mb-2">Summary</h2>
                <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
            
            {/* Main Content */}
            <div className="mt-6 grid grid-cols-12 gap-8">
                <div className="col-span-12 space-y-6">
                     {/* Experience */}
                    <section>
                        <h2 className="text-base font-bold uppercase tracking-wider text-gray-600 mb-3">Work Experience</h2>
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id} className="pl-2 border-l-2 border-gray-200">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base text-gray-800">{exp.position}</h3>
                                        <p className="text-xs font-semibold text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-semibold italic text-gray-700">{exp.company}</p>
                                    <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-base font-bold uppercase tracking-wider text-gray-600 mb-3">Education</h2>
                        <div className="space-y-3">
                            {education.map(edu => (
                                <div key={edu.id} className="pl-2">
                                     <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-base text-gray-800">{edu.degree}, {edu.fieldOfStudy}</h3>
                                        <p className="text-xs font-semibold text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-semibold italic text-gray-700">{edu.institution}</p>
                                    {edu.description && <p className="mt-1 text-sm text-gray-600">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Skills */}
             <section className="mt-6">
                <h2 className="text-base font-bold uppercase tracking-wider text-gray-600 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <div key={skill.id} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{skill.name}</div>
                    ))}
                </div>
            </section>
        </div>
    );
}

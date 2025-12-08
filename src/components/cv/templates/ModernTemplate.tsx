import type { CvData } from '@/lib/types';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

const formatDate = (dateString: string) => {
    if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
    try {
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
        return dateString;
    }
};

export default function ModernTemplate({ data }: { data: CvData }) {
    const { personalInfo, experience, education, skills } = data;
    return (
        <div className="bg-white text-gray-800 p-8 font-sans text-sm h-full w-full">
            <div className="grid grid-cols-12 gap-x-8">
                {/* Main Content */}
                <div className="col-span-8 pr-8">
                    <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name}</h1>
                    <p className="mt-4 text-gray-600">{personalInfo.summary}</p>

                    <section className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">Experience</h2>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-base">{exp.position}</h3>
                                        <p className="text-xs font-medium text-gray-500">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{exp.company}</p>
                                    <ul className="mt-2 text-gray-600 list-disc list-inside space-y-1">
                                        {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <section className="mt-8">
                        <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-1 mb-4">Education</h2>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-base">{edu.institution}</h3>
                                        <p className="text-xs font-medium text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
                                    <p className="mt-1 text-gray-600">{edu.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                
                {/* Sidebar */}
                <div className="col-span-4 border-l-2 border-gray-200 pl-8">
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

                    <section className="mt-8">
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
                </div>
            </div>
        </div>
    );
}

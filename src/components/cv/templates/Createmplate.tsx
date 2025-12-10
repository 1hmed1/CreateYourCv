// import type { CvData } from '@/lib/types';
// import Image from 'next/image';
// import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

// const formatDate = (dateString: string) => {
//     if (!dateString || dateString.toLowerCase() === 'present') return 'Present';
//     try {
//         return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
//     } catch {
//         return dateString;
//     }
// };

// const skillLevelToPercentage = (level: CvData['skills'][0]['level']) => {
//     switch (level) {
//         case 'Beginner': return 25;
//         case 'Intermediate': return 50;
//         case 'Advanced': return 75;
//         case 'Expert': return 95;
//         default: return 0;
//     }
// }

// export default function CreativeTemplate({ data }: { data: CvData }) {
//     const { personalInfo, experience, education, skills } = data;
//     const { position } = experience[0] || { position: 'Your Title' };

//     return (
//         <div className="bg-white text-gray-800 text-sm h-full w-full flex">
//             {/* Left Column */}
//             <div className="w-1/3 bg-[#2C3E50] text-white p-6 flex flex-col gap-6">
//                 {/* Name & Title */}
//                 <div className="text-center mt-12 relative">
//                     {personalInfo.showPhoto && personalInfo.photoUrl && (
//                         <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white bg-[#5D6D7E] flex items-center justify-center overflow-hidden">
//                              <Image src={personalInfo.photoUrl} alt={personalInfo.name} width={128} height={128} className="object-cover" data-ai-hint="headshot photo" />
//                         </div>
//                     )}
//                     <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
//                     <p className="text-lg font-light tracking-widest">{position.toUpperCase()}</p>
//                 </div>

//                 {/* About Me */}
//                 <section>
//                     <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2">ABOUT ME</h2>
//                     <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
//                 </section>

//                 {/* Contact */}
//                 <section>
//                     <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2">CONTACT</h2>
//                     <div className="space-y-2 text-xs">
//                         {personalInfo.phone && <p className="flex items-center gap-3"><Phone size={14} /><span>{personalInfo.phone}</span></p>}
//                         {personalInfo.email && <p className="flex items-center gap-3"><Mail size={14} /><span>{personalInfo.email}</span></p>}
//                         {personalInfo.website && <p className="flex items-center gap-3"><Globe size={14} /><span>{personalInfo.website}</span></p>}
//                         {personalInfo.address && <p className="flex items-center gap-3"><MapPin size={14} /><span>{personalInfo.address}</span></p>}
//                     </div>
//                 </section>
                
//                 {/* Skills */}
//                 <section>
//                     <h2 className="text-lg font-bold bg-[#5D6D7E] text-white px-4 py-2 rounded-md -mx-2 mb-2">SKILLS</h2>
//                     <div className="space-y-4 text-xs">
//                        {skills.map(skill => (
//                            <div key={skill.id}>
//                                <p>{skill.name}</p>
//                                <div className="w-full bg-gray-600 rounded-full h-1.5 mt-1">
//                                    <div className="bg-white h-1.5 rounded-full" style={{width: `${skillLevelToPercentage(skill.level)}%`}}></div>
//                                </div>
//                            </div>
//                        ))}
//                     </div>
//                 </section>

//             </div>
//             {/* Right Column */}
//             <div className="w-2/3 bg-white text-[#2C3E50] p-8">
//                  {/* Education */}
//                  <section className="mb-8">
//                     <h2 className="text-xl font-bold text-[#5D6D7E] mb-4">EDUCATION</h2>
//                     <div className="space-y-4">
//                         {education.map(edu => (
//                             <div key={edu.id}>
//                                 <h3 className="font-bold">{edu.institution} ({formatDate(edu.startDate)} - {formatDate(edu.endDate)})</h3>
//                                 <p className="italic">{edu.degree}, {edu.fieldOfStudy}</p>
//                                 {edu.description && <p className="text-xs mt-1">{edu.description}</p>}
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Experience */}
//                 <section>
//                     <h2 className="text-xl font-bold text-[#5D6D7E] mb-4">EXPERIENCE</h2>
//                     <div className="space-y-6">
//                         {experience.map(exp => (
//                             <div key={exp.id}>
//                                 <h3 className="font-bold">{exp.position} ({formatDate(exp.startDate)} - {formatDate(exp.endDate)})</h3>
//                                 <p className="italic font-semibold">{exp.company}</p>
//                                 <ul className="mt-2 text-xs list-disc list-inside space-y-1">
//                                     {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
//                                 </ul>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// }
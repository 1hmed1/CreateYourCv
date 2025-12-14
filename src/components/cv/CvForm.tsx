'use client';

import type { CvData, Education, Experience, Skill, CvProject, Certification, Achievement, Hobby, Language } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';


type CvFormProps = {    
  cvData: CvData;
  setCvData: (data: CvData | ((prev: CvData) => CvData)) => void;
};

export default function CvForm({ cvData, setCvData }: CvFormProps) {

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handlePhotoToggle = (checked: boolean) => {
    setCvData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, showPhoto: checked } }));
  };

  const handleNestedChange = <T extends Education | Experience | Skill | CvProject | Certification | Achievement | Hobby | Language>(section: keyof CvData, id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCvData(prev => ({
        ...prev,
        [section]: (prev[section] as T[]).map(item => item.id === id ? { ...item, [name]: value } : item)
      }));
  };
  
  const handleSkillLevelChange = (id: string, value: Skill['level']) => {
      setCvData(prev => ({
        ...prev,
        skills: prev.skills.map(item => item.id === id ? { ...item, level: value } : item)
      }));
  };

  const handleLanguageProficiencyChange = (id: string, value: string) => {
      setCvData(prev => ({
          ...prev,
          languages: prev.languages.map(item => item.id === id ? { ...item, proficiency: value } : item)
      }));
  };

  const addItem = <T extends any>(section: keyof CvData, newItem: T) => {
    setCvData(prev => ({...prev, [section]: [...(prev[section] as T[]), newItem] }));
  };

  const removeItem = (section: keyof CvData, id: string) => {
    setCvData(prev => ({ ...prev, [section]: (prev[section] as any[]).filter(item => item.id !== id) }));
  };
  
  return (
    <Accordion type="multiple" defaultValue={['personal-info', 'experience']} className="w-full">
      <AccordionItem value="personal-info">
        <AccordionTrigger>Personal Information</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={cvData.personalInfo.name} onChange={handlePersonalInfoChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={cvData.personalInfo.email} onChange={handlePersonalInfoChange} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={cvData.personalInfo.phone} onChange={handlePersonalInfoChange} />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={cvData.personalInfo.address} onChange={handlePersonalInfoChange} />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" value={cvData.personalInfo.linkedin} onChange={handlePersonalInfoChange} />
            </div>
            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input id="website" name="website" value={cvData.personalInfo.website} onChange={handlePersonalInfoChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="photoUrl">Photo URL</Label>
            <Input id="photoUrl" name="photoUrl" value={cvData.personalInfo.photoUrl || ''} onChange={handlePersonalInfoChange} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="show-photo" checked={cvData.personalInfo.showPhoto || false} onCheckedChange={handlePhotoToggle} />
            <Label htmlFor="show-photo">Show Photo on CV</Label>
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea id="summary" name="summary" value={cvData.personalInfo.summary} onChange={handlePersonalInfoChange} rows={4} />
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="experience">
        <AccordionTrigger>Work Experience</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.experience.map((exp, idx) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`position-${idx}`}>Position</Label>
                  <Input id={`position-${idx}`} name="position" value={exp.position} onChange={(e) => handleNestedChange('experience', exp.id, e)} />
                </div>
                <div>
                  <Label htmlFor={`company-${idx}`}>Company</Label>
                  <Input id={`company-${idx}`} name="company" value={exp.company} onChange={(e) => handleNestedChange('experience', exp.id, e)} />
                </div>
                <div>
                  <Label htmlFor={`startDate-exp-${idx}`}>Start Date</Label>
                  <Input id={`startDate-exp-${idx}`} name="startDate" type="date" value={exp.startDate} onChange={(e) => handleNestedChange('experience', exp.id, e)} />
                </div>
                <div>
                  <Label htmlFor={`endDate-exp-${idx}`}>End Date</Label>
                  <Input id={`endDate-exp-${idx}`} name="endDate" type="text" placeholder="Present" value={exp.endDate} onChange={(e) => handleNestedChange('experience', exp.id, e)} />
                </div>
              </div>
              <div>
                <Label htmlFor={`description-exp-${idx}`}>Description</Label>
                <Textarea id={`description-exp-${idx}`} name="description" value={exp.description} onChange={(e) => handleNestedChange('experience', exp.id, e)} rows={3} placeholder="- Bullet point 1..."/>
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeItem('experience', exp.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('experience', { id: `exp${Date.now()}`, company: '', position: '', startDate: '', endDate: '', description: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education">
        <AccordionTrigger>Education</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.education.map((edu, idx) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`institution-${idx}`}>Institution</Label>
                  <Input id={`institution-${idx}`} name="institution" value={edu.institution} onChange={(e) => handleNestedChange('education', edu.id, e)} />
                </div>
                <div>
                  <Label htmlFor={`degree-${idx}`}>Degree</Label>
                  <Input id={`degree-${idx}`} name="degree" value={edu.degree} onChange={(e) => handleNestedChange('education', edu.id, e)} />
                </div>
                <div>
                  <Label htmlFor={`fieldOfStudy-${idx}`}>Field of Study</Label>
                  <Input id={`fieldOfStudy-${idx}`} name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleNestedChange('education', edu.id, e)} />
                </div>
                <div>
                  <Label htmlFor={`startDate-edu-${idx}`}>Start Date</Label>
                  <Input id={`startDate-edu-${idx}`} name="startDate" type="date" value={edu.startDate} onChange={(e) => handleNestedChange('education', edu.id, e)} />
                </div>
                <div>
                  <Label htmlFor={`endDate-edu-${idx}`}>End Date</Label>
                  <Input id={`endDate-edu-${idx}`} name="endDate" type="date" value={edu.endDate} onChange={(e) => handleNestedChange('education', edu.id, e)} />
                </div>
              </div>
              <div>
                <Label htmlFor={`description-edu-${idx}`}>Description/Achievements</Label>
                <Textarea id={`description-edu-${idx}`} name="description" value={edu.description} onChange={(e) => handleNestedChange('education', edu.id, e)} rows={2} />
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeItem('education', edu.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('education', { id: `edu${Date.now()}`, institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="skills">
        <AccordionTrigger>Skills</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.skills.map((skill, idx) => (
            <div key={skill.id} className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor={`skill-name-${idx}`}>Skill</Label>
                <Input id={`skill-name-${idx}`} name="name" value={skill.name} onChange={(e) => handleNestedChange('skills', skill.id, e)} />
              </div>
              <div className="w-[150px]">
                <Label>Level</Label>
                <Select value={skill.level} onValueChange={(value: Skill['level']) => handleSkillLevelChange(skill.id, value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeItem('skills', skill.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('skills', { id: `skill${Date.now()}`, name: '', level: 'Intermediate' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="projects">
        <AccordionTrigger>Projects</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.projects.map((proj, idx) => (
            <div key={proj.id} className="p-4 border rounded-lg space-y-4 relative">
              <div>
                <Label htmlFor={`proj-title-${idx}`}>Title</Label>
                <Input id={`proj-title-${idx}`} name="title" value={proj.title} onChange={(e) => handleNestedChange('projects', proj.id, e)} />
              </div>
              <div>
                <Label htmlFor={`proj-url-${idx}`}>URL</Label>
                <Input id={`proj-url-${idx}`} name="url" value={proj.url || ''} onChange={(e) => handleNestedChange('projects', proj.id, e)} />
              </div>
              <div>
                <Label htmlFor={`proj-desc-${idx}`}>Description</Label>
                <Textarea id={`proj-desc-${idx}`} name="description" value={proj.description} onChange={(e) => handleNestedChange('projects', proj.id, e)} rows={2} />
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeItem('projects', proj.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('projects', { id: `proj${Date.now()}`, title: '', url: '', description: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="certifications">
        <AccordionTrigger>Certifications</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.certifications.map((cert, idx) => (
            <div key={cert.id} className="p-4 border rounded-lg space-y-4 relative">
              <div>
                <Label htmlFor={`cert-name-${idx}`}>Name</Label>
                <Input id={`cert-name-${idx}`} name="name" value={cert.name} onChange={(e) => handleNestedChange('certifications', cert.id, e)} />
              </div>
              <div>
                <Label htmlFor={`cert-issuer-${idx}`}>Issuer</Label>
                <Input id={`cert-issuer-${idx}`} name="issuer" value={cert.issuer} onChange={(e) => handleNestedChange('certifications', cert.id, e)} />
              </div>
              <div>
                <Label htmlFor={`cert-date-${idx}`}>Date</Label>
                <Input id={`cert-date-${idx}`} name="date" type="date" value={cert.date} onChange={(e) => handleNestedChange('certifications', cert.id, e)} />
              </div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeItem('certifications', cert.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('certifications', { id: `cert${Date.now()}`, name: '', issuer: '', date: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Certification
          </Button>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="achievements">
        <AccordionTrigger>Achievements</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.achievements.map((ach, idx) => (
            <div key={ach.id} className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor={`ach-desc-${idx}`}>Description</Label>
                <Input id={`ach-desc-${idx}`} name="description" value={ach.description} onChange={(e) => handleNestedChange('achievements', ach.id, e)} />
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeItem('achievements', ach.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('achievements', { id: `ach${Date.now()}`, description: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Achievement
          </Button>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="hobbies">
        <AccordionTrigger>Hobbies & Interests</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.hobbies.map((hobby, idx) => (
            <div key={hobby.id} className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor={`hobby-name-${idx}`}>Hobby</Label>
                <Input id={`hobby-name-${idx}`} name="name" value={hobby.name} onChange={(e) => handleNestedChange('hobbies', hobby.id, e)} />
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeItem('hobbies', hobby.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('hobbies', { id: `hobby${Date.now()}`, name: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Hobby
          </Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="languages">
        <AccordionTrigger>Languages</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.languages.map((lang, idx) => (
            <div key={lang.id} className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor={`lang-name-${idx}`}>Language</Label>
                <Input id={`lang-name-${idx}`} name="name" value={lang.name} onChange={(e) => handleNestedChange('languages', lang.id, e)} />
              </div>
              <div className="w-[150px]">
                <Label>Proficiency</Label>
                <Select value={lang.proficiency} onValueChange={(value: string) => handleLanguageProficiencyChange(lang.id, value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Native">Native</SelectItem>
                    <SelectItem value="Fluent">Fluent</SelectItem>
                    <SelectItem value="Conversational">Conversational</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeItem('languages', lang.id)}>
                <Trash2 className="w-4 h-4"/>
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('languages', { id: `lang${Date.now()}`, name: '', proficiency: 'Conversational' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Language
          </Button>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}
'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { CvData, Education, Experience, Skill } from '@/lib/types';
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
  setCvData: Dispatch<SetStateAction<CvData>>;
};

export default function CvForm({ cvData, setCvData }: CvFormProps) {

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCvData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handlePhotoToggle = (checked: boolean) => {
    setCvData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, showPhoto: checked } }));
  };

  const handleNestedChange = <T extends Education | Experience | Skill>(section: keyof CvData, id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const addItem = <T extends Education | Experience | Skill>(section: keyof CvData, newItem: T) => {
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
            <div><Label htmlFor="name">Full Name</Label><Input id="name" name="name" value={cvData.personalInfo.name} onChange={handlePersonalInfoChange} /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={cvData.personalInfo.email} onChange={handlePersonalInfoChange} /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" value={cvData.personalInfo.phone} onChange={handlePersonalInfoChange} /></div>
            <div><Label htmlFor="address">Address</Label><Input id="address" name="address" value={cvData.personalInfo.address} onChange={handlePersonalInfoChange} /></div>
            <div><Label htmlFor="linkedin">LinkedIn</Label><Input id="linkedin" name="linkedin" value={cvData.personalInfo.linkedin} onChange={handlePersonalInfoChange} /></div>
            <div><Label htmlFor="website">Website/Portfolio</Label><Input id="website" name="website" value={cvData.personalInfo.website} onChange={handlePersonalInfoChange} /></div>
          </div>
          <div><Label htmlFor="photoUrl">Photo URL</Label><Input id="photoUrl" name="photoUrl" value={cvData.personalInfo.photoUrl} onChange={handlePersonalInfoChange} /></div>
          <div className="flex items-center space-x-2">
            <Switch id="show-photo" checked={cvData.personalInfo.showPhoto} onCheckedChange={handlePhotoToggle} />
            <Label htmlFor="show-photo">Show Photo on CV</Label>
          </div>
          <div><Label htmlFor="summary">Professional Summary</Label><Textarea id="summary" name="summary" value={cvData.personalInfo.summary} onChange={handlePersonalInfoChange} rows={4} /></div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="experience">
        <AccordionTrigger>Work Experience</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.experience.map((exp, index) => (
            <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor={`position-${index}`}>Position</Label><Input id={`position-${index}`} name="position" value={exp.position} onChange={(e) => handleNestedChange('experience', exp.id, e)} /></div>
                <div><Label htmlFor={`company-${index}`}>Company</Label><Input id={`company-${index}`} name="company" value={exp.company} onChange={(e) => handleNestedChange('experience', exp.id, e)} /></div>
                <div><Label htmlFor={`startDate-exp-${index}`}>Start Date</Label><Input id={`startDate-exp-${index}`} name="startDate" type="date" value={exp.startDate} onChange={(e) => handleNestedChange('experience', exp.id, e)} /></div>
                <div><Label htmlFor={`endDate-exp-${index}`}>End Date</Label><Input id={`endDate-exp-${index}`} name="endDate" type="text" placeholder="Present" value={exp.endDate} onChange={(e) => handleNestedChange('experience', exp.id, e)} /></div>
              </div>
              <div><Label htmlFor={`description-exp-${index}`}>Description</Label><Textarea id={`description-exp-${index}`} name="description" value={exp.description} onChange={(e) => handleNestedChange('experience', exp.id, e)} rows={3} placeholder="- Bullet point 1..."/></div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeItem('experience', exp.id)}><Trash2 className="w-4 h-4"/></Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('experience', { id: `exp${Date.now()}`, company: '', position: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Experience</Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education">
        <AccordionTrigger>Education</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.education.map((edu, index) => (
            <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor={`institution-${index}`}>Institution</Label><Input id={`institution-${index}`} name="institution" value={edu.institution} onChange={(e) => handleNestedChange('education', edu.id, e)} /></div>
                <div><Label htmlFor={`degree-${index}`}>Degree</Label><Input id={`degree-${index}`} name="degree" value={edu.degree} onChange={(e) => handleNestedChange('education', edu.id, e)} /></div>
                <div><Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label><Input id={`fieldOfStudy-${index}`} name="fieldOfStudy" value={edu.fieldOfStudy} onChange={(e) => handleNestedChange('education', edu.id, e)} /></div>
                <div><Label htmlFor={`startDate-edu-${index}`}>Start Date</Label><Input id={`startDate-edu-${index}`} name="startDate" type="date" value={edu.startDate} onChange={(e) => handleNestedChange('education', edu.id, e)} /></div>
                <div><Label htmlFor={`endDate-edu-${index}`}>End Date</Label><Input id={`endDate-edu-${index}`} name="endDate" type="date" value={edu.endDate} onChange={(e) => handleNestedChange('education', edu.id, e)} /></div>
              </div>
              <div><Label htmlFor={`description-edu-${index}`}>Description/Achievements</Label><Textarea id={`description-edu-${index}`} name="description" value={edu.description} onChange={(e) => handleNestedChange('education', edu.id, e)} rows={2} /></div>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive hover:text-destructive" onClick={() => removeItem('education', edu.id)}><Trash2 className="w-4 h-4"/></Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('education', { id: `edu${Date.now()}`, institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Education</Button>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="skills">
        <AccordionTrigger>Skills</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {cvData.skills.map((skill, index) => (
            <div key={skill.id} className="flex items-end gap-2">
              <div className="flex-1"><Label htmlFor={`skill-name-${index}`}>Skill</Label><Input id={`skill-name-${index}`} name="name" value={skill.name} onChange={(e) => handleNestedChange('skills', skill.id, e)} /></div>
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
              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeItem('skills', skill.id)}><Trash2 className="w-4 h-4"/></Button>
            </div>
          ))}
          <Button variant="outline" onClick={() => addItem('skills', { id: `skill${Date.now()}`, name: '', level: 'Intermediate' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Skill</Button>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}

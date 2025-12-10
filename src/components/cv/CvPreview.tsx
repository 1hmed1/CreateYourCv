import type { CvData, Template } from '@/lib/types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
// import CreativeTemplate from './templates/Createmplate';

type CvPreviewProps = {
  cvData: CvData;
  template: Template;
};

export default function CvPreview({ cvData, template }: CvPreviewProps) {
  return (
    <div className="w-full h-full overflow-auto transform scale-[0.9] origin-top">
      {template === 'modern' && <ModernTemplate data={cvData} />}
      {template === 'classic' && <ClassicTemplate data={cvData} />}
      {template === 'professional' && <ProfessionalTemplate data={cvData} />}
      {/* {template === 'creative' && <CreativeTemplate data={cvData} />} */}
    </div>
  );
}

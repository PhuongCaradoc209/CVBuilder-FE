import ATSStandardTemplate from './ats-standard';
import ClassicProfessionalTemplate from './classic-professional-template';
import CorporateMinimalTemplate from './corporate_minimal';
import CVCreativeBeigeTemplate from './cv_creative_beige';
import EditorialCreativeTemplate from './editorial-creative-template';
import ModernSidebarTemplate from './modern-sidebar';

/**
 * Enum for all available CV templates.
 * The keys match the filenames/component names for easy mapping with the backend.
 */
export const CVTemplateKey = {
  ATS_STANDARD: 'ats-standard',
  CLASSIC_PROFESSIONAL: 'classic-professional-template',
  CORPORATE_MINIMAL: 'corporate_minimal',
  CV_CREATIVE_BEIGE: 'cv_creative_beige',
  EDITORIAL_CREATIVE: 'editorial-creative-template',
  MODERN_SIDEBAR: 'modern-sidebar',
} as const;

export type CVTemplateKeyType = (typeof CVTemplateKey)[keyof typeof CVTemplateKey];

/**
 * Mapping of template keys to their respective React components.
 */
export const TEMPLATE_REGISTRY: Record<string, React.ComponentType<any>> = {
  [CVTemplateKey.ATS_STANDARD]: ATSStandardTemplate,
  [CVTemplateKey.CLASSIC_PROFESSIONAL]: ClassicProfessionalTemplate,
  [CVTemplateKey.CORPORATE_MINIMAL]: CorporateMinimalTemplate,
  [CVTemplateKey.CV_CREATIVE_BEIGE]: CVCreativeBeigeTemplate,
  [CVTemplateKey.EDITORIAL_CREATIVE]: EditorialCreativeTemplate,
  [CVTemplateKey.MODERN_SIDEBAR]: ModernSidebarTemplate,
};

/**
 * List of templates with human-readable labels for UI selection.
 */
export const TEMPLATE_OPTIONS = [
  { id: CVTemplateKey.ATS_STANDARD, name: 'ATS Standard' },
  { id: CVTemplateKey.CLASSIC_PROFESSIONAL, name: 'Classic Professional' },
  { id: CVTemplateKey.CORPORATE_MINIMAL, name: 'Corporate Minimal' },
  { id: CVTemplateKey.CV_CREATIVE_BEIGE, name: 'Creative Beige' },
  { id: CVTemplateKey.EDITORIAL_CREATIVE, name: 'Editorial Creative' },
  { id: CVTemplateKey.MODERN_SIDEBAR, name: 'Modern Sidebar' },
];

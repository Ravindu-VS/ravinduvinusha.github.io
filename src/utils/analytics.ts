// Analytics and Performance Tracking Utilities

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Google Analytics 4 Event Tracking
export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Project interaction tracking
export const trackProjectView = (projectTitle: string) => {
  trackEvent({
    action: 'project_view',
    category: 'engagement',
    label: projectTitle,
  });
};

export const trackProjectDemo = (projectTitle: string) => {
  trackEvent({
    action: 'demo_click',
    category: 'conversion',
    label: projectTitle,
  });
};

export const trackProjectGithub = (projectTitle: string) => {
  trackEvent({
    action: 'github_click',
    category: 'conversion',
    label: projectTitle,
  });
};

// Navigation tracking
export const trackSectionView = (sectionName: string) => {
  trackEvent({
    action: 'section_view',
    category: 'navigation',
    label: sectionName,
  });
};

// Contact form tracking
export const trackContactSubmit = () => {
  trackEvent({
    action: 'contact_submit',
    category: 'conversion',
    label: 'contact_form',
  });
};

// CV download tracking
export const trackCVDownload = () => {
  trackEvent({
    action: 'cv_download',
    category: 'conversion',
    label: 'cv_pdf',
    value: 1,
  });
};

// Performance monitoring
export const trackPageLoad = () => {
  if (typeof window !== 'undefined' && window.performance) {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    trackEvent({
      action: 'page_load_time',
      category: 'performance',
      value: Math.round(loadTime),
    });
  }
};

// Skill interaction tracking
export const trackSkillInteraction = (skillName: string) => {
  trackEvent({
    action: 'skill_hover',
    category: 'engagement',
    label: skillName,
  });
};

// Error tracking
export const trackError = (errorMessage: string, errorLocation: string) => {
  trackEvent({
    action: 'error',
    category: 'technical',
    label: `${errorLocation}: ${errorMessage}`,
  });
};

// Social media link tracking
export const trackSocialClick = (platform: string) => {
  trackEvent({
    action: 'social_click',
    category: 'engagement',
    label: platform,
  });
};

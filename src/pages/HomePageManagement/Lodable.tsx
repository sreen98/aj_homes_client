import * as React from 'react';
import { loadable } from 'utils';
import { LoadingIndicator } from 'components';

export const HomePageManagement = loadable(() => import('./index'), {
  fallback: <LoadingIndicator visible />
});

export const AboutUsManagement = loadable(() => import('./index-aboutUs'), {
  fallback: <LoadingIndicator visible />
});

export const TestimonialManagement = loadable(() => import('./index-testimonials'), {
  fallback: <LoadingIndicator visible />
});

export const MaintenancePageManagement = loadable(() => import('./index-maintenance-details'), {
  fallback: <LoadingIndicator visible />
});

export const FAQManagement = loadable(() => import('./index-Faq'), {
  fallback: <LoadingIndicator visible />
});

export const PrivacyPolicyManagement = loadable(() => import('./index-privacyPolicy'), {
  fallback: <LoadingIndicator visible />
});

export const MaintenancePage = loadable(() => import('./index-maintenance'), {
  fallback: <LoadingIndicator visible />
});

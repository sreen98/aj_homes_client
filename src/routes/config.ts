import {
  PropertyManagement,
  HomePageManagement,
  EnquiryManagement,
  AboutUsManagement,
  TestimonialManagement,
  FAQManagement,
  PrivacyPolicyManagement
} from 'pages';
import { MaintenancePageManagement } from 'pages/HomePageManagement/Lodable';
import MaintenancePage from 'pages/HomePageManagement/index-maintenance';
import PropertyDetails from 'pages/PropertyManagement/index-singleProperty';

export const pageRoutes = {
  // private: [
  //   { component: PropertyManagement, path: '/properties' },
  //   { component: HomePageManagement, section: 'home' }
  // ],
  public: [
    { path: '/', component: HomePageManagement, section: 'home' },
    { path: '/home', component: HomePageManagement, section: 'home' },
    { path: '/properties', component: PropertyManagement, section: 'property' },
    { path: '/property', component: PropertyDetails, section: 'propertyDetails' },
    { path: '/about', component: AboutUsManagement, section: 'about' },
    { path: '/testimonials', component: TestimonialManagement, section: 'testimonials' },
    { path: '/maintenance', component: MaintenancePageManagement, section: 'testimonials' },
    { path: '/contact', component: EnquiryManagement, section: 'enquiry' },
    { path: '/faq', component: FAQManagement, section: 'faq' },
    { path: '/privacy-policy', component: PrivacyPolicyManagement, section: 'privacy-policy' },
    { path: '/maintenance', component: MaintenancePage, section: 'maintenance-page' }
  ]
};

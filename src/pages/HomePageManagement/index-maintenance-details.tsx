import React from 'react';
import Footer from 'container/Footer';
import NavBar from 'container/Nav';

export default function MaintenanceDetailsPage() {
  const styles = {
    maintenanceContainer: {
      margin: '50px auto', // Center the container
      maxWidth: '800px', // Limit container width
      marginTop: '110px'
    },
    maintenanceBox: {
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '20px',
      marginBottom: '20px', // Add space between boxes
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    heading: {
      marginTop: 0
    },
    link: {
      color: '#007bff',
      textDecoration: 'none'
    },
    linkHover: {
      textDecoration: 'underline'
    }
  };

  return (
    <>
      <NavBar />
      <div style={styles.maintenanceContainer}>
        <div style={styles.maintenanceBox}>
          <h2 style={styles.heading}>Maintenance Queries</h2>
          <p>
            Tenants can report maintenance issues by emailing the designated maintenance team at{' '}
            <a href="mailto:info@ajhomeslettings.co.uk" style={styles.link}>
              info@ajhomeslettings.co.uk
            </a>
            . Please avoid calling the office for maintenance requests; instead, put your query in writing via email.
            Include as many details as possible, including photos and videos if available. Remember, admin team members
            are not part of the maintenance team and will redirect requests to the proper channel.
          </p>
        </div>
        <div style={styles.maintenanceBox}>
          <h2 style={styles.heading}>Emergency Contact</h2>
          <p>
            For emergencies outside of working hours, call the office line at{' '}
            <a href="tel:07450238686" style={styles.link}>
              07450238686
            </a>
            . Use the emergency line only for urgent matters such as heavy leaks, security issues, or safety concerns.
          </p>
        </div>
        <div style={styles.maintenanceBox}>
          <h2 style={styles.heading}>Tenant Responsibility</h2>
          <p>
            AJ Homes & Lettings Ltd emphasizes tenant responsibility in looking after rental properties. A highly
            trained team of maintenance contractors is available to address reported issues promptly. Our standard
            response times are 5-7 working days for emergency maintenance and 7-21 working days for non-emergency
            maintenance. Please understand that we always strive to ensure any reported issue is resolved during the
            first visit. Therefore, we request you to book your job via emailing{' '}
            <a href="mailto:info@ajhomeslettings.co.uk" style={styles.link}>
              info@ajhomeslettings.co.uk
            </a>{' '}
            and be as detailed as possible, including images and other relevant information.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

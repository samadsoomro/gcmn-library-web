import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Building, Calendar, Target } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { icon: <Calendar size={32} />, number: '1953', label: 'Established' },
    { icon: <BookOpen size={32} />, number: '25,000+', label: 'Books' },
    { icon: <Users size={32} />, number: '2,000+', label: 'Students' },
    { icon: <Award size={32} />, number: '70+', label: 'Years of Excellence' },
  ];

  const facilities = [
    {
      icon: <BookOpen size={24} />,
      title: 'Two-Story Library',
      description: 'Upper floor for quiet study and research, lower floor as reading hall with newspapers'
    },
    {
      icon: <Building size={24} />,
      title: 'Modern Facilities',
      description: 'Well-equipped laboratories, computer labs, and study spaces'
    },
    {
      icon: <Users size={24} />,
      title: 'Experienced Faculty',
      description: 'Dedicated professors and lecturers committed to academic excellence'
    },
    {
      icon: <Award size={24} />,
      title: 'Academic Programs',
      description: 'Intermediate (Class 11-12), ADA, and BSc programs in multiple disciplines'
    }
  ];

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="about-header">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="about-title">About GCMN</h1>
            <p className="about-subtitle">
              A Legacy of Excellence Since 1953
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="about-content">
        <div className="container">
          {/* History Section */}
          <motion.section
            className="about-section"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="about-section-header">
              <Building size={32} className="section-icon" />
              <div>
                <h2 className="section-title">Our History</h2>
                <div className="section-divider"></div>
              </div>
            </div>
            
            <div className="about-text">
              <p>
                <strong>Government College for Men, Nazimabad</strong> was established in <strong>1953</strong> under 
                the name of <em>Central Government College for Men</em> to provide higher education to the newly 
                settled and prominent area of Nazimabad in Karachi. This institution was founded with a vision 
                to serve the educational needs of the growing community in one of Karachi's most significant neighborhoods.
              </p>
              
              <p>
                In <strong>1961</strong>, the college was transferred to the <strong>Government of Sindh</strong> and 
                officially renamed as <em>Government College for Men, Nazimabad, Karachi</em>. Since then, it has 
                continued its mission of providing quality education and has become a cornerstone of academic 
                excellence in the region.
              </p>
              
              <p>
                For over <strong>70 years</strong>, GCMN has been shaping minds and creating memories for 
                generations of students. The college has produced countless professionals, teachers, scientists, 
                and leaders who have contributed significantly to Pakistan's development and progress.
              </p>
            </div>
          </motion.section>

          {/* Library Section */}
          <motion.section
            className="about-section about-section-highlight"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="about-section-header">
              <BookOpen size={32} className="section-icon" />
              <div>
                <h2 className="section-title">Our Library</h2>
                <div className="section-divider"></div>
              </div>
            </div>
            
            <div className="about-text">
              <p>
                The <strong>GCMN Library</strong> is a magnificent <strong>two-story building</strong> designed 
                to cater to the diverse needs of our students and researchers. The library serves as the heart 
                of academic life at the college, providing a conducive environment for learning and intellectual growth.
              </p>
              
              <p>
                The <strong>upper floor</strong> is dedicated to providing a calm and quiet space for serious 
                researchers and students engaged in deep study. This floor is designed to minimize distractions 
                and create an atmosphere conducive to focused academic work.
              </p>
              
              <p>
                The <strong>lower floor</strong> functions as a reading hall where students can access daily 
                newspapers and periodicals. This space encourages students to stay informed about current affairs 
                and develop a broader perspective on national and international issues.
              </p>
              
              <p>
                Currently, our library houses more than <strong>25,000 books</strong> covering a wide range of 
                subjects including Science, Arts, Commerce, Islamic Studies, Pakistan Studies, and more. The 
                collection is regularly updated to include the latest publications and reference materials.
              </p>
              
              <p>
                The library also provides access to <strong>leading daily newspapers</strong> of Pakistan, 
                ensuring that students remain connected with current events and develop critical thinking skills 
                through regular reading and analysis.
              </p>
            </div>
          </motion.section>

          {/* Stats Grid */}
          <motion.div
            className="about-stats"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="about-stat-card">
                <div className="about-stat-icon">{stat.icon}</div>
                <h3 className="about-stat-number">{stat.number}</h3>
                <p className="about-stat-label">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Academic Programs */}
          <motion.section
            className="about-section"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="about-section-header">
              <Target size={32} className="section-icon" />
              <div>
                <h2 className="section-title">Academic Programs</h2>
                <div className="section-divider"></div>
              </div>
            </div>
            
            <div className="about-text">
              <p>
                Government College for Men, Nazimabad offers a comprehensive range of academic programs designed 
                to prepare students for higher education and professional careers:
              </p>
              
              <ul className="about-list">
                <li><strong>Intermediate Programs (Class 11-12)</strong> - Pre-Engineering, Pre-Medical, Computer Science, Commerce, and Arts</li>
                <li><strong>Associate Degree in Arts (ADA)</strong> - Part 1 and Part 2 programs in humanities and social sciences</li>
                <li><strong>Bachelor of Science (BSc)</strong> - Part 1 and Part 2 programs in natural sciences and mathematics</li>
              </ul>
              
              <p>
                The college is affiliated with the <strong>Board of Intermediate Education Karachi</strong> and 
                the <strong>University of Karachi</strong>, ensuring that our academic standards meet national 
                and international benchmarks.
              </p>
            </div>
          </motion.section>

          {/* Facilities Grid */}
          <motion.div
            className="about-facilities"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
              Our Facilities
            </h2>
            <div className="facilities-grid">
              {facilities.map((facility, index) => (
                <div key={index} className="facility-card">
                  <div className="facility-icon">{facility.icon}</div>
                  <h3 className="facility-title">{facility.title}</h3>
                  <p className="facility-description">{facility.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.section
            className="about-section about-section-highlight"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="about-mission-vision">
              <div className="mission-card">
                <h3>Our Mission</h3>
                <p>
                  To provide quality education and foster intellectual growth, preparing students to become 
                  responsible citizens and leaders who contribute positively to society and the nation.
                </p>
              </div>
              <div className="vision-card">
                <h3>Our Vision</h3>
                <p>
                  To be a leading institution of higher education in Pakistan, recognized for academic excellence, 
                  research innovation, and producing graduates who excel in their chosen fields.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Location */}
          <motion.section
            className="about-section"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="about-section-header">
              <Building size={32} className="section-icon" />
              <div>
                <h2 className="section-title">Location</h2>
                <div className="section-divider"></div>
              </div>
            </div>
            
            <div className="about-text">
              <p>
                The college is strategically located in <strong>Nazimabad</strong>, one of Karachi's most 
                well-established and accessible neighborhoods. Situated adjacent to the famous Nazimabad Flyover 
                and Petrol Pump bus stop, the college is easily accessible via public transportation from all 
                parts of the city.
              </p>
              
              <p>
                The campus provides a conducive learning environment with modern facilities, green spaces, and 
                a vibrant academic atmosphere that encourages both scholastic achievement and personal development.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
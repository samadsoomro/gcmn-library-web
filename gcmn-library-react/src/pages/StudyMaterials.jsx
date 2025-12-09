import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Filter, BookOpen, GraduationCap } from 'lucide-react';
import { CLASSES, SUBJECTS_BY_CLASS } from '../utils/constants';
import './StudyMaterials.css';

const StudyMaterials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Study materials data
  const studyMaterials = [
    {
      id: 1,
      title: 'Mathematics Formula Sheet',
      class: 'Class 11',
      subject: 'Mathematics',
      type: 'Formula Sheet',
      description: 'Complete collection of important formulas for Class 11 Mathematics',
      fileSize: '2.5 MB',
      pages: 15,
      downloads: 245,
      uploadDate: '2025-01-15',
      fileUrl: '/materials/math-formulas-class11.pdf'
    },
    {
      id: 2,
      title: 'Physics Practical Manual',
      class: 'Class 12',
      subject: 'Physics',
      type: 'Practical Manual',
      description: 'Step-by-step guide for all physics practicals with diagrams',
      fileSize: '5.8 MB',
      pages: 42,
      downloads: 189,
      uploadDate: '2025-01-20',
      fileUrl: '/materials/physics-practical-class12.pdf'
    },
    {
      id: 3,
      title: 'Chemistry Revision Notes',
      class: 'Class 11',
      subject: 'Chemistry',
      type: 'Revision Notes',
      description: 'Comprehensive revision notes covering all chapters',
      fileSize: '3.2 MB',
      pages: 28,
      downloads: 312,
      uploadDate: '2025-02-01',
      fileUrl: '/materials/chemistry-revision-class11.pdf'
    },
    {
      id: 4,
      title: 'English Grammar Guide',
      class: 'Class 12',
      subject: 'English',
      type: 'Grammar Guide',
      description: 'Complete grammar rules with examples and exercises',
      fileSize: '1.8 MB',
      pages: 22,
      downloads: 278,
      uploadDate: '2025-01-25',
      fileUrl: '/materials/english-grammar-class12.pdf'
    },
    {
      id: 5,
      title: 'Computer Science Programming Examples',
      class: 'BSc Part 1',
      subject: 'Computer Science',
      type: 'Code Examples',
      description: 'Collection of programming examples in C++ and Python',
      fileSize: '4.1 MB',
      pages: 35,
      downloads: 421,
      uploadDate: '2025-02-05',
      fileUrl: '/materials/cs-programming-bsc1.pdf'
    },
    {
      id: 6,
      title: 'Statistics Problem Solving Guide',
      class: 'Class 11',
      subject: 'Statistics',
      type: 'Problem Guide',
      description: 'Step-by-step solutions to statistical problems',
      fileSize: '2.9 MB',
      pages: 31,
      downloads: 198,
      uploadDate: '2025-02-10',
      fileUrl: '/materials/statistics-problems-class11.pdf'
    },
    {
      id: 7,
      title: 'Biology Diagrams Collection',
      class: 'Class 12',
      subject: 'Biology',
      type: 'Diagrams',
      description: 'Labeled diagrams for all biology chapters',
      fileSize: '6.5 MB',
      pages: 48,
      downloads: 356,
      uploadDate: '2025-01-30',
      fileUrl: '/materials/biology-diagrams-class12.pdf'
    },
    {
      id: 8,
      title: 'Pakistan Studies Key Points',
      class: 'ADA Part 1',
      subject: 'Pakistan Studies',
      type: 'Key Points',
      description: 'Important points and dates for Pakistan Studies',
      fileSize: '1.5 MB',
      pages: 18,
      downloads: 267,
      uploadDate: '2025-02-08',
      fileUrl: '/materials/pak-studies-keypoints-ada1.pdf'
    },
    {
      id: 9,
      title: 'Islamic Studies Q&A',
      class: 'Class 11',
      subject: 'Islamic Studies',
      type: 'Q&A',
      description: 'Important questions and answers for Islamic Studies',
      fileSize: '2.1 MB',
      pages: 25,
      downloads: 223,
      uploadDate: '2025-01-28',
      fileUrl: '/materials/islamic-studies-qa-class11.pdf'
    },
    {
      id: 10,
      title: 'Economics Case Studies',
      class: 'ADA Part 2',
      subject: 'Economics',
      type: 'Case Studies',
      description: 'Real-world economic case studies with analysis',
      fileSize: '3.7 MB',
      pages: 33,
      downloads: 145,
      uploadDate: '2025-02-12',
      fileUrl: '/materials/economics-cases-ada2.pdf'
    }
  ];

  // Filter materials
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || material.class === selectedClass;
    const matchesSubject = !selectedSubject || material.subject === selectedSubject;
    
    return matchesSearch && matchesClass && matchesSubject;
  });

  const handleDownload = (material) => {
    alert(`Downloading: ${material.title}\n\nNote: Connect to backend API to download actual PDF files.`);
    // In production: window.open(`${API_BASE_URL}/study-materials/download/${material.id}`, '_blank');
  };

  return (
    <motion.div
      className="study-materials-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="study-materials-header">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="header-badge">
              <GraduationCap size={20} />
              <span>Study Resources</span>
            </div>
            <h1 className="study-materials-title">Study Materials</h1>
            <p className="study-materials-subtitle">
              Access formula sheets, practical manuals, revision notes, and more
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="study-materials-content">
        <div className="container">
          {/* Filters */}
          <div className="materials-filters">
            {/* Search */}
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search study materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Class Filter */}
            <div className="filter-group">
              <Filter size={18} />
              <select
                className="filter-select"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setSelectedSubject('');
                }}
              >
                <option value="">All Classes</option>
                {CLASSES.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            {/* Subject Filter */}
            <div className="filter-group">
              <BookOpen size={18} />
              <select
                className="filter-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedClass}
              >
                <option value="">All Subjects</option>
                {selectedClass && SUBJECTS_BY_CLASS[selectedClass]?.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="results-count">
              <span>{filteredMaterials.length} materials found</span>
            </div>
          </div>

          {/* Materials Grid */}
          {filteredMaterials.length > 0 ? (
            <div className="materials-grid">
              {filteredMaterials.map((material, index) => (
                <motion.div
                  key={material.id}
                  className="material-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="material-header">
                    <div className="material-icon">
                      <FileText size={32} />
                    </div>
                    <div className="material-type-badge">
                      {material.type}
                    </div>
                  </div>

                  <div className="material-body">
                    <h3 className="material-title">{material.title}</h3>
                    <p className="material-description">{material.description}</p>

                    <div className="material-meta">
                      <span className="material-class">{material.class}</span>
                      <span className="material-subject">{material.subject}</span>
                    </div>

                    <div className="material-stats">
                      <span>{material.pages} pages</span>
                      <span>•</span>
                      <span>{material.fileSize}</span>
                      <span>•</span>
                      <span>{material.downloads} downloads</span>
                    </div>
                  </div>

                  <div className="material-footer">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => handleDownload(material)}
                    >
                      <Download size={18} />
                      Download PDF
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <FileText size={64} />
              <h3>No study materials found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StudyMaterials;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ChevronDown, BookOpen } from 'lucide-react';
import { CLASSES, SUBJECTS_BY_CLASS } from '../utils/constants';
import './Notes.css';

const Notes = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const handleClassChange = (e) => {
    const classValue = e.target.value;
    setSelectedClass(classValue);
    setSelectedSubject('');
    
    if (classValue) {
      setAvailableSubjects(SUBJECTS_BY_CLASS[classValue] || []);
    } else {
      setAvailableSubjects([]);
    }
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleGetNotes = () => {
    if (!selectedClass || !selectedSubject) {
      alert('Please select both class and subject');
      return;
    }

    // Simulate PDF download
    alert(`Downloading notes for:\nClass: ${selectedClass}\nSubject: ${selectedSubject}\n\nNote: Connect to backend API to download actual PDF files.`);
    
    // In production, this would call the API:
    // window.open(`${API_BASE_URL}/notes/download?class=${selectedClass}&subject=${selectedSubject}`, '_blank');
  };

  // Sample notes data for display
  const sampleNotes = [
    {
      id: 1,
      class: 'Class 11',
      subject: 'Mathematics',
      title: 'Calculus and Analytical Geometry',
      description: 'Complete notes covering limits, derivatives, and integrals',
      pages: 45,
      uploadDate: '2025-01-15'
    },
    {
      id: 2,
      class: 'Class 12',
      subject: 'Physics',
      title: 'Electromagnetism and Modern Physics',
      description: 'Comprehensive notes on electricity, magnetism, and quantum physics',
      pages: 52,
      uploadDate: '2025-01-20'
    },
    {
      id: 3,
      class: 'BSc Part 1',
      subject: 'Computer Science',
      title: 'Data Structures and Algorithms',
      description: 'Complete notes on arrays, linked lists, trees, and sorting algorithms',
      pages: 68,
      uploadDate: '2025-02-01'
    },
    {
      id: 4,
      class: 'ADA Part 1',
      subject: 'English',
      title: 'English Literature and Composition',
      description: 'Notes covering poetry, prose, and essay writing',
      pages: 38,
      uploadDate: '2025-01-25'
    }
  ];

  return (
    <motion.div
      className="notes-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="notes-header">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="notes-title">Notes & Syllabus</h1>
            <p className="notes-subtitle">
              Access study materials, course notes, and syllabus for all classes
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="notes-content">
        <div className="container">
          {/* Notes Selector Card */}
          <motion.div
            className="notes-selector-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="notes-selector-header">
              <FileText size={32} className="notes-selector-icon" />
              <div>
                <h2 className="notes-selector-title">Select Your Class & Subject</h2>
                <p className="notes-selector-subtitle">Choose your class and subject to access notes</p>
              </div>
            </div>

            <div className="notes-selector-form">
              {/* Class Dropdown */}
              <div className="form-group">
                <label className="form-label">
                  <BookOpen size={18} />
                  Select Class
                </label>
                <div className="select-wrapper">
                  <select
                    className="form-control form-select"
                    value={selectedClass}
                    onChange={handleClassChange}
                  >
                    <option value="">-- Choose Class --</option>
                    {CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={20} />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="form-group">
                <label className="form-label">
                  <FileText size={18} />
                  Select Subject
                </label>
                <div className="select-wrapper">
                  <select
                    className="form-control form-select"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    disabled={!selectedClass}
                  >
                    <option value="">-- Choose Subject --</option>
                    {availableSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" size={20} />
                </div>
              </div>

              {/* Get Notes Button */}
              <button
                className="btn btn-primary btn-lg"
                onClick={handleGetNotes}
                disabled={!selectedClass || !selectedSubject}
                style={{ width: '100%' }}
              >
                <Download size={20} />
                Get Notes (PDF)
              </button>
            </div>

            {/* Selected Info */}
            {selectedClass && selectedSubject && (
              <motion.div
                className="notes-selected-info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>
                  <strong>Selected:</strong> {selectedClass} - {selectedSubject}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Available Notes List */}
          <div className="notes-list-section">
            <h2 className="section-title">Available Study Materials</h2>
            
            <div className="notes-grid">
              {sampleNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  className="note-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="note-card-header">
                    <div className="note-card-icon">
                      <FileText size={32} />
                    </div>
                    <div className="note-card-badges">
                      <span className="badge badge-primary">{note.class}</span>
                      <span className="badge badge-secondary">{note.subject}</span>
                    </div>
                  </div>

                  <div className="note-card-body">
                    <h3 className="note-card-title">{note.title}</h3>
                    <p className="note-card-description">{note.description}</p>
                    
                    <div className="note-card-meta">
                      <span className="note-card-meta-item">
                        📄 {note.pages} pages
                      </span>
                      <span className="note-card-meta-item">
                        📅 {note.uploadDate}
                      </span>
                    </div>
                  </div>

                  <div className="note-card-footer">
                    <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                      <FileText size={16} />
                      Preview
                    </button>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <motion.div
            className="notes-info-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="notes-info-card">
              <h3>📚 How to Use</h3>
              <ol>
                <li>Select your class from the dropdown</li>
                <li>Choose the subject you need notes for</li>
                <li>Click "Get Notes (PDF)" to download</li>
                <li>Study materials are updated regularly</li>
              </ol>
            </div>

            <div className="notes-info-card">
              <h3>ℹ️ Important Information</h3>
              <ul>
                <li>All notes are in PDF format</li>
                <li>Notes are organized by class and subject</li>
                <li>New materials are added regularly</li>
                <li>Contact library for missing notes</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Notes;
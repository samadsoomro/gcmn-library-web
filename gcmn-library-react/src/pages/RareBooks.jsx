import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, Eye, Calendar, BookOpen, Shield, Search } from 'lucide-react';
import './RareBooks.css';

const RareBooks = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Rare books data with cover images
  const rareBooks = [
    {
      id: 1,
      title: 'Tareekh-e-Pakistan (History of Pakistan)',
      author: 'I. H. Qureshi',
      year: 1967,
      description: 'A comprehensive historical account of Pakistan from ancient times to independence. This rare edition contains original maps and photographs.',
      coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
      language: 'Urdu',
      pages: 456,
      condition: 'Good',
      availability: 'View Only',
      category: 'History'
    },
    {
      id: 2,
      title: 'Kulliyat-e-Iqbal (Complete Works of Iqbal)',
      author: 'Allama Muhammad Iqbal',
      year: 1945,
      description: 'First edition collection of poetry by Pakistan\'s national poet. Includes Bang-e-Dara, Bal-e-Jibril, and Zarb-e-Kalim.',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      language: 'Urdu/Persian',
      pages: 892,
      condition: 'Excellent',
      availability: 'View Only',
      category: 'Poetry'
    },
    {
      id: 3,
      title: 'Quaid-e-Azam: Speeches and Statements',
      author: 'Muhammad Ali Jinnah',
      year: 1948,
      description: 'Collection of speeches and statements by the founder of Pakistan. Rare first edition with original photographs.',
      coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      language: 'English/Urdu',
      pages: 324,
      condition: 'Very Good',
      availability: 'View Only',
      category: 'Politics'
    },
    {
      id: 4,
      title: 'Urdu Adab Ki Tareekh (History of Urdu Literature)',
      author: 'Muhammad Sadiq',
      year: 1964,
      description: 'Comprehensive history of Urdu literature from its origins to modern times. Includes critical analysis of major poets and writers.',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      language: 'Urdu',
      pages: 678,
      condition: 'Good',
      availability: 'View Only',
      category: 'Literature'
    },
    {
      id: 5,
      title: 'Pakistan: A Modern History',
      author: 'Ian Talbot',
      year: 1998,
      description: 'Detailed analysis of Pakistan\'s political, social, and economic development. Rare signed edition.',
      coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
      language: 'English',
      pages: 412,
      condition: 'Excellent',
      availability: 'View Only',
      category: 'History'
    },
    {
      id: 6,
      title: 'Islamic Architecture in Pakistan',
      author: 'Ahmad Nabi Khan',
      year: 1990,
      description: 'Illustrated guide to Islamic architectural heritage in Pakistan. Contains rare photographs and architectural drawings.',
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      language: 'English',
      pages: 256,
      condition: 'Very Good',
      availability: 'View Only',
      category: 'Architecture'
    }
  ];

  const filteredBooks = rareBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="rare-books-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="rare-books-header">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rare-books-badge">
              <Archive size={20} />
              <span>Digital Archive</span>
            </div>
            <h1 className="rare-books-title">Rare Books Collection</h1>
            <p className="rare-books-subtitle">
              Explore our curated collection of rare and historical books. View-only access to preserve these precious resources.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="rare-books-content">
        <div className="container">
          {/* Security Notice */}
          <motion.div
            className="security-notice"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Shield size={32} />
            <div>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                Protected Content
              </h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                These rare books are view-only to preserve their integrity. Downloading, printing, and copying are disabled.
              </p>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="rare-books-search">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                className="search-input"
                placeholder="Search rare books by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Rare Books Grid */}
          <motion.div
            className="rare-books-grid"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                className="rare-book-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Book Cover Image */}
                <div className="rare-book-cover">
                  <img src={book.coverImage} alt={book.title} />
                  <div className="rare-book-overlay">
                    <button
                      className="btn-view-book"
                      onClick={() => setSelectedBook(book)}
                    >
                      <Eye size={20} />
                      <span>View Book</span>
                    </button>
                  </div>
                </div>

                {/* Book Info */}
                <div className="rare-book-info">
                  <div className="rare-book-year">
                    <Calendar size={16} />
                    <span>{book.year}</span>
                  </div>
                  
                  <h3 className="rare-book-title">{book.title}</h3>
                  <p className="rare-book-author">by {book.author}</p>
                  
                  <p className="rare-book-description">{book.description}</p>
                  
                  <div className="rare-book-meta">
                    <span className="rare-book-meta-item">
                      <BookOpen size={14} />
                      {book.pages} pages
                    </span>
                    <span className="rare-book-meta-item">
                      {book.language}
                    </span>
                    <span className="rare-book-meta-item">
                      {book.category}
                    </span>
                  </div>

                  <div className="rare-book-footer">
                    <span className="rare-book-condition">
                      Condition: {book.condition}
                    </span>
                    <span className="rare-book-availability">
                      {book.availability}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredBooks.length === 0 && (
            <div className="no-results">
              <Archive size={48} />
              <h3>No rare books found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <motion.div
          className="rare-book-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedBook(null)}
        >
          <motion.div
            className="rare-book-modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedBook(null)}
            >
              ×
            </button>
            
            <div className="modal-body">
              <div className="modal-cover">
                <img src={selectedBook.coverImage} alt={selectedBook.title} />
              </div>
              
              <div className="modal-details">
                <h2>{selectedBook.title}</h2>
                <p className="modal-author">by {selectedBook.author}</p>
                
                <div className="modal-meta-grid">
                  <div className="modal-meta-item">
                    <strong>Year:</strong> {selectedBook.year}
                  </div>
                  <div className="modal-meta-item">
                    <strong>Language:</strong> {selectedBook.language}
                  </div>
                  <div className="modal-meta-item">
                    <strong>Pages:</strong> {selectedBook.pages}
                  </div>
                  <div className="modal-meta-item">
                    <strong>Condition:</strong> {selectedBook.condition}
                  </div>
                  <div className="modal-meta-item">
                    <strong>Category:</strong> {selectedBook.category}
                  </div>
                  <div className="modal-meta-item">
                    <strong>Availability:</strong> {selectedBook.availability}
                  </div>
                </div>

                <div className="modal-description">
                  <h3>Description</h3>
                  <p>{selectedBook.description}</p>
                </div>

                <div className="modal-notice">
                  <Shield size={20} />
                  <span>This is a protected rare book. View-only access.</span>
                </div>

                <button className="btn btn-primary" style={{ width: '100%' }}>
                  <Eye size={20} />
                  <span>Open Secure Viewer</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RareBooks;
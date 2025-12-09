import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, User, Calendar, Package } from 'lucide-react';
import BookCard from '../components/books/BookCard';
import { BOOK_CATEGORIES } from '../utils/constants';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Sample books data (replace with API call)
  useEffect(() => {
    // Simulate API call
    const sampleBooks = [
      {
        book_id: 1,
        title: 'Introduction to Algorithms',
        author: 'Thomas H. Cormen',
        category: 'Computer Science',
        publication_year: 2022,
        total_copies: 5,
        available_copies: 3,
        isbn: '978-0-13-468599-1',
        publisher: 'MIT Press',
        shelf_location: 'CS-A-101',
        description: 'Comprehensive guide to algorithms and data structures',
        status: 'available'
      },
      {
        book_id: 2,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        category: 'Computer Science',
        publication_year: 2021,
        total_copies: 3,
        available_copies: 2,
        isbn: '978-0-13-235088-4',
        publisher: 'Prentice Hall',
        shelf_location: 'CS-A-102',
        description: 'A handbook of agile software craftsmanship',
        status: 'available'
      },
      {
        book_id: 3,
        title: 'Calculus: Early Transcendentals',
        author: 'James Stewart',
        category: 'Mathematics',
        publication_year: 2020,
        total_copies: 10,
        available_copies: 8,
        isbn: '978-0-07-338093-4',
        publisher: 'Cengage Learning',
        shelf_location: 'MATH-B-201',
        description: 'Comprehensive calculus textbook',
        status: 'available'
      },
      {
        book_id: 4,
        title: 'Physics for Scientists and Engineers',
        author: 'Raymond A. Serway',
        category: 'Physics',
        publication_year: 2019,
        total_copies: 8,
        available_copies: 5,
        isbn: '978-1-133-95405-7',
        publisher: 'Cengage Learning',
        shelf_location: 'PHY-C-301',
        description: 'Comprehensive physics textbook with modern applications',
        status: 'available'
      },
      {
        book_id: 5,
        title: 'Organic Chemistry',
        author: 'Paula Yurkanis Bruice',
        category: 'Chemistry',
        publication_year: 2021,
        total_copies: 6,
        available_copies: 4,
        isbn: '978-0-134-04216-4',
        publisher: 'Pearson',
        shelf_location: 'CHEM-D-401',
        description: 'Modern approach to organic chemistry',
        status: 'available'
      },
      {
        book_id: 6,
        title: 'Campbell Biology',
        author: 'Jane B. Reece',
        category: 'Biology',
        publication_year: 2020,
        total_copies: 7,
        available_copies: 6,
        isbn: '978-0-134-09341-3',
        publisher: 'Pearson',
        shelf_location: 'BIO-E-501',
        description: 'Comprehensive biology textbook',
        status: 'available'
      },
      {
        book_id: 7,
        title: 'Pakistan Studies',
        author: 'Ikram Rabbani',
        category: 'Pakistan Studies',
        publication_year: 2022,
        total_copies: 15,
        available_copies: 12,
        isbn: '978-969-8961-00-1',
        publisher: 'Caravan Book House',
        shelf_location: 'PAK-F-601',
        description: 'Complete guide to Pakistan history and culture',
        status: 'available'
      },
      {
        book_id: 8,
        title: 'Islamic Studies',
        author: 'Dr. Muhammad Hamidullah',
        category: 'Islamic Studies',
        publication_year: 2021,
        total_copies: 12,
        available_copies: 10,
        isbn: '978-969-432-123-4',
        publisher: 'Islamic Publications',
        shelf_location: 'ISL-G-701',
        description: 'Comprehensive Islamic studies textbook',
        status: 'available'
      },
      {
        book_id: 9,
        title: 'English Literature: An Introduction',
        author: 'William J. Long',
        category: 'English Literature',
        publication_year: 2020,
        total_copies: 8,
        available_copies: 0,
        isbn: '978-1-420-92676-9',
        publisher: 'Forgotten Books',
        shelf_location: 'ENG-H-801',
        description: 'Classic introduction to English literature',
        status: 'unavailable'
      },
      {
        book_id: 10,
        title: 'Urdu Adab Ki Tareekh',
        author: 'Muhammad Sadiq',
        category: 'Urdu Literature',
        publication_year: 2019,
        total_copies: 5,
        available_copies: 3,
        isbn: '978-969-8888-88-8',
        publisher: 'Sang-e-Meel Publications',
        shelf_location: 'URD-I-901',
        description: 'History of Urdu literature',
        status: 'available'
      },
      {
        book_id: 11,
        title: 'Principles of Economics',
        author: 'N. Gregory Mankiw',
        category: 'Economics',
        publication_year: 2021,
        total_copies: 6,
        available_copies: 4,
        isbn: '978-0-357-13348-8',
        publisher: 'Cengage Learning',
        shelf_location: 'ECO-J-1001',
        description: 'Introduction to microeconomics and macroeconomics',
        status: 'available'
      },
      {
        book_id: 12,
        title: 'Data Structures and Algorithms in Python',
        author: 'Michael T. Goodrich',
        category: 'Computer Science',
        publication_year: 2022,
        total_copies: 4,
        available_copies: 2,
        isbn: '978-1-118-29027-9',
        publisher: 'Wiley',
        shelf_location: 'CS-A-103',
        description: 'Python-based approach to data structures',
        status: 'available'
      }
    ];

    setTimeout(() => {
      setBooks(sampleBooks);
      setFilteredBooks(sampleBooks);
      setLoading(false);
    }, 500);
  }, []);

  // Filter books based on search and category
  useEffect(() => {
    let result = books;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((book) => book.category === selectedCategory);
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedCategory, books]);

  const handleBorrow = (book) => {
    alert(`Borrow request for "${book.title}" will be implemented with backend integration.`);
  };

  const handleViewDetails = (book) => {
    alert(`Viewing details for "${book.title}":\n\nAuthor: ${book.author}\nISBN: ${book.isbn}\nPublisher: ${book.publisher}\nYear: ${book.publication_year}\nAvailable: ${book.available_copies}/${book.total_copies}\nLocation: ${book.shelf_location}\n\n${book.description}`);
  };

  return (
    <motion.div
      className="books-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="books-header pakistan-bg">
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="books-title">Book Catalog</h1>
            <p className="books-subtitle">
              Browse our extensive collection of academic books and resources
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="books-content">
          {/* Filters Section */}
          <motion.div
            className="books-filters"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <Filter size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {BOOK_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="results-count">
              <BookOpen size={18} />
              <span>
                {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
              </span>
            </div>
          </motion.div>

          {/* Books Grid */}
          {loading ? (
            <div className="books-loading">
              <div className="loading-spinner"></div>
              <p>Loading books...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <motion.div
              className="books-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BookOpen size={64} />
              <h3>No books found</h3>
              <p>Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              className="books-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.book_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <BookCard
                    book={book}
                    onBorrow={handleBorrow}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Books;
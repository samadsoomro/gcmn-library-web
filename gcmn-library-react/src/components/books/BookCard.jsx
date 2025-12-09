import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User, Calendar, MapPin } from 'lucide-react';
import './BookCard.css';

const BookCard = ({ book, onBorrow, onViewDetails }) => {
  const isAvailable = book.available_copies > 0 && book.status === 'available';

  return (
    <motion.div
      className="book-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Book Cover */}
      <div className="book-card-cover">
        {book.cover_image ? (
          <img src={book.cover_image} alt={book.title} />
        ) : (
          <div className="book-card-placeholder">
            <BookOpen size={48} />
          </div>
        )}
        
        {/* Availability Badge */}
        <div className={`book-card-badge ${isAvailable ? 'available' : 'unavailable'}`}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </div>
      </div>

      {/* Book Info */}
      <div className="book-card-body">
        <h3 className="book-card-title">{book.title}</h3>
        
        <div className="book-card-meta">
          <div className="book-card-meta-item">
            <User size={14} />
            <span>{book.author}</span>
          </div>
          
          {book.publication_year && (
            <div className="book-card-meta-item">
              <Calendar size={14} />
              <span>{book.publication_year}</span>
            </div>
          )}
          
          {book.shelf_location && (
            <div className="book-card-meta-item">
              <MapPin size={14} />
              <span>{book.shelf_location}</span>
            </div>
          )}
        </div>

        <div className="book-card-category">
          <span className="badge badge-primary">{book.category}</span>
        </div>

        <div className="book-card-availability">
          <span className="book-card-copies">
            {book.available_copies} of {book.total_copies} available
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="book-card-footer">
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onViewDetails(book)}
        >
          View Details
        </button>
        
        {isAvailable && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onBorrow(book)}
          >
            Borrow
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
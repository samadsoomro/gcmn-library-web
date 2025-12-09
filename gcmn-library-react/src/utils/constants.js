// Application Constants
export const APP_NAME = 'GCMN Library';
export const APP_FULL_NAME = 'Gov. College For Men Nazimabad Library';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Google Maps Location
export const LIBRARY_LOCATION = {
  lat: 24.9207,
  lng: 67.0338,
  address: 'Nazimabad, Karachi, Pakistan',
  mapUrl: 'https://maps.app.goo.gl/erR98wVW9iwRzXi6A',
  embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.0!2d67.0338!3d24.9207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU1JzE0LjUiTiA2N8KwMDInMDEuNyJF!5e0!3m2!1sen!2s!4v1234567890'
};

// Classes/Semesters
export const CLASSES = [
  'Class 11',
  'Class 12',
  'ADA Part 1',
  'ADA Part 2',
  'BSc Part 1',
  'BSc Part 2'
];

// Subjects by Class
export const SUBJECTS_BY_CLASS = {
  'Class 11': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Computer Science', 'Statistics', 'Pakistan Studies', 'Islamic Studies'],
  'Class 12': ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Urdu', 'Computer Science', 'Statistics', 'Pakistan Studies', 'Islamic Studies'],
  'ADA Part 1': ['English', 'Urdu', 'Islamic Studies', 'Pakistan Studies', 'Economics', 'Political Science', 'Sociology', 'Psychology'],
  'ADA Part 2': ['English', 'Urdu', 'Islamic Studies', 'Pakistan Studies', 'Economics', 'Political Science', 'Sociology', 'Psychology'],
  'BSc Part 1': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Statistics', 'Botany', 'Zoology', 'Geology'],
  'BSc Part 2': ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Statistics', 'Botany', 'Zoology', 'Geology']
};

// Book Categories
export const BOOK_CATEGORIES = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English Literature',
  'Urdu Literature',
  'Islamic Studies',
  'Pakistan Studies',
  'Economics',
  'Business',
  'Engineering',
  'Medical',
  'General Knowledge',
  'History',
  'Geography',
  'Political Science',
  'Sociology',
  'Psychology'
];

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin'
};

// Borrow Status
export const BORROW_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  ISSUED: 'issued',
  RETURNED: 'returned',
  OVERDUE: 'overdue',
  REJECTED: 'rejected'
};

// Book Status
export const BOOK_STATUS = {
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  MAINTENANCE: 'maintenance'
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Date Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';

// Borrow Duration (days)
export const BORROW_DURATION = 14;

// Fine per day (PKR)
export const FINE_PER_DAY = 10;
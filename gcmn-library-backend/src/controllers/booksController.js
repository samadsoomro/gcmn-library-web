import pool from '../config/database.js';

// Get all books with pagination, search, and filters
export const getAllBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      category = '',
      status = '',
      sortBy = 'title',
      sortOrder = 'ASC',
    } = req.query;

    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    // Search filter
    if (search) {
      query += ' AND (title LIKE ? OR author LIKE ? OR isbn LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Category filter
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    // Status filter
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    // Sorting
    const validSortFields = ['title', 'author', 'publication_year', 'created_at'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'title';
    const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortField} ${order}`;

    // Pagination
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    // Execute query
    const [books] = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM books WHERE 1=1';
    const countParams = [];

    if (search) {
      countQuery += ' AND (title LIKE ? OR author LIKE ? OR isbn LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    const [countResult] = await pool.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: books,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching books.',
    });
  }
};

// Get single book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const [books] = await pool.query('SELECT * FROM books WHERE book_id = ?', [id]);

    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    res.json({
      success: true,
      data: books[0],
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching book.',
    });
  }
};

// Create new book (admin only)
export const createBook = async (req, res) => {
  try {
    const {
      isbn,
      title,
      author,
      publisher,
      publication_year,
      edition,
      category,
      subject,
      language,
      total_copies,
      shelf_location,
      description,
      cover_image,
    } = req.body;

    // Validate required fields
    if (!title || !author || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, author, and category.',
      });
    }

    const available_copies = total_copies || 1;

    const [result] = await pool.query(
      `INSERT INTO books (isbn, title, author, publisher, publication_year, edition, category, 
       subject, language, total_copies, available_copies, shelf_location, description, cover_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        isbn,
        title,
        author,
        publisher,
        publication_year,
        edition,
        category,
        subject,
        language || 'English',
        total_copies || 1,
        available_copies,
        shelf_location,
        description,
        cover_image,
      ]
    );

    const [books] = await pool.query('SELECT * FROM books WHERE book_id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Book created successfully.',
      data: books[0],
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating book.',
    });
  }
};

// Update book (admin only)
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if book exists
    const [books] = await pool.query('SELECT * FROM books WHERE book_id = ?', [id]);

    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    // Build update query
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update.',
      });
    }

    const setClause = fields.map((field) => `${field} = ?`).join(', ');
    values.push(id);

    await pool.query(`UPDATE books SET ${setClause} WHERE book_id = ?`, values);

    // Get updated book
    const [updatedBooks] = await pool.query('SELECT * FROM books WHERE book_id = ?', [id]);

    res.json({
      success: true,
      message: 'Book updated successfully.',
      data: updatedBooks[0],
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating book.',
    });
  }
};

// Delete book (admin only)
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if book exists
    const [books] = await pool.query('SELECT * FROM books WHERE book_id = ?', [id]);

    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Book not found.',
      });
    }

    // Check if book has active borrows
    const [borrows] = await pool.query(
      'SELECT COUNT(*) as count FROM borrow_records WHERE book_id = ? AND status IN ("pending", "approved", "issued")',
      [id]
    );

    if (borrows[0].count > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete book with active borrow requests.',
      });
    }

    await pool.query('DELETE FROM books WHERE book_id = ?', [id]);

    res.json({
      success: true,
      message: 'Book deleted successfully.',
    });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting book.',
    });
  }
};

// Get book categories
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT DISTINCT category FROM books ORDER BY category'
    );

    res.json({
      success: true,
      data: categories.map((c) => c.category),
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories.',
    });
  }
};
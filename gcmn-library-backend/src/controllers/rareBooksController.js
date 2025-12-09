import pool from '../config/database.js';

// Get all rare books
export const getAllRareBooks = async (req, res) => {
  try {
    const { search = '', category = '', language = '' } = req.query;

    let query = 'SELECT * FROM rare_books WHERE status = "active"';
    const params = [];

    if (search) {
      query += ' AND (title LIKE ? OR author LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (language) {
      query += ' AND language = ?';
      params.push(language);
    }

    query += ' ORDER BY year DESC, title ASC';

    const [rareBooks] = await pool.query(query, params);

    res.json({
      success: true,
      data: rareBooks,
    });
  } catch (error) {
    console.error('Get rare books error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching rare books.',
    });
  }
};

// Get single rare book
export const getRareBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rareBooks] = await pool.query(
      'SELECT * FROM rare_books WHERE rare_book_id = ?',
      [id]
    );

    if (rareBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Rare book not found.',
      });
    }

    // Increment view count
    await pool.query(
      'UPDATE rare_books SET view_count = view_count + 1 WHERE rare_book_id = ?',
      [id]
    );

    res.json({
      success: true,
      data: rareBooks[0],
    });
  } catch (error) {
    console.error('Get rare book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching rare book.',
    });
  }
};

// Create rare book (admin only)
export const createRareBook = async (req, res) => {
  try {
    const {
      title,
      author,
      year,
      description,
      language,
      pages,
      condition,
      category,
      pdf_path,
    } = req.body;
    const added_by = req.user.user_id;

    if (!title || !author || !pdf_path) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, author, and PDF file.',
      });
    }

    const [result] = await pool.query(
      `INSERT INTO rare_books (title, author, year, description, language, pages, \`condition\`, category, pdf_path, added_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, author, year, description, language, pages, condition, category, pdf_path, added_by]
    );

    const [rareBooks] = await pool.query(
      'SELECT * FROM rare_books WHERE rare_book_id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Rare book added successfully.',
      data: rareBooks[0],
    });
  } catch (error) {
    console.error('Create rare book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding rare book.',
    });
  }
};

// Update rare book (admin only)
export const updateRareBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const [rareBooks] = await pool.query(
      'SELECT * FROM rare_books WHERE rare_book_id = ?',
      [id]
    );

    if (rareBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Rare book not found.',
      });
    }

    const allowedFields = [
      'title',
      'author',
      'year',
      'description',
      'language',
      'pages',
      'condition',
      'category',
      'pdf_path',
      'status',
    ];

    const updateFields = [];
    const updateValues = [];

    Object.keys(updates).forEach((key) => {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = ?`);
        updateValues.push(updates[key]);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update.',
      });
    }

    updateValues.push(id);

    await pool.query(
      `UPDATE rare_books SET ${updateFields.join(', ')} WHERE rare_book_id = ?`,
      updateValues
    );

    const [updatedRareBooks] = await pool.query(
      'SELECT * FROM rare_books WHERE rare_book_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Rare book updated successfully.',
      data: updatedRareBooks[0],
    });
  } catch (error) {
    console.error('Update rare book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating rare book.',
    });
  }
};

// Delete rare book (admin only)
export const deleteRareBook = async (req, res) => {
  try {
    const { id } = req.params;

    const [rareBooks] = await pool.query(
      'SELECT * FROM rare_books WHERE rare_book_id = ?',
      [id]
    );

    if (rareBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Rare book not found.',
      });
    }

    // Soft delete
    await pool.query(
      'UPDATE rare_books SET status = "deleted" WHERE rare_book_id = ?',
      [id]
    );

    res.json({
      success: true,
      message: 'Rare book deleted successfully.',
    });
  } catch (error) {
    console.error('Delete rare book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting rare book.',
    });
  }
};

// Get categories
export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT DISTINCT category FROM rare_books WHERE status = "active" ORDER BY category'
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
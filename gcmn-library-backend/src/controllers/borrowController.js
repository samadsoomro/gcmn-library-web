import pool from '../config/database.js';

// Create borrow request
export const createBorrowRequest = async (req, res) => {
  try {
    const { book_id } = req.body;
    const user_id = req.user.user_id;

    // Check if book exists and is available
    const [books] = await pool.query(
      'SELECT * FROM books WHERE book_id = ? AND status = "available" AND available_copies > 0',
      [book_id]
    );

    if (books.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Book is not available for borrowing.',
      });
    }

    // Check if user already has pending/active borrow for this book
    const [existingBorrows] = await pool.query(
      'SELECT * FROM borrow_records WHERE user_id = ? AND book_id = ? AND status IN ("pending", "approved", "issued")',
      [user_id, book_id]
    );

    if (existingBorrows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active request for this book.',
      });
    }

    // Create borrow request
    const [result] = await pool.query(
      'INSERT INTO borrow_records (user_id, book_id, status) VALUES (?, ?, "pending")',
      [user_id, book_id]
    );

    // Get created borrow record with book and user details
    const [borrows] = await pool.query(
      `SELECT br.*, b.title, b.author, b.cover_image, u.full_name, u.email
       FROM borrow_records br
       JOIN books b ON br.book_id = b.book_id
       JOIN users u ON br.user_id = u.user_id
       WHERE br.borrow_id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Borrow request created successfully.',
      data: borrows[0],
    });
  } catch (error) {
    console.error('Create borrow request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating borrow request.',
    });
  }
};

// Get user's borrow records
export const getUserBorrows = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const [borrows] = await pool.query(
      `SELECT br.*, b.title, b.author, b.cover_image, b.isbn
       FROM borrow_records br
       JOIN books b ON br.book_id = b.book_id
       WHERE br.user_id = ?
       ORDER BY br.request_date DESC`,
      [user_id]
    );

    res.json({
      success: true,
      data: borrows,
    });
  } catch (error) {
    console.error('Get user borrows error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching borrow records.',
    });
  }
};

// Get all borrow requests (admin only)
export const getAllBorrows = async (req, res) => {
  try {
    const { status = '', page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT br.*, b.title, b.author, b.isbn, u.full_name, u.email, u.roll_number
      FROM borrow_records br
      JOIN books b ON br.book_id = b.book_id
      JOIN users u ON br.user_id = u.user_id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ' AND br.status = ?';
      params.push(status);
    }

    query += ' ORDER BY br.request_date DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [borrows] = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM borrow_records WHERE 1=1';
    const countParams = [];

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    const [countResult] = await pool.query(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: borrows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get all borrows error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching borrow records.',
    });
  }
};

// Update borrow request status (admin only)
export const updateBorrowStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes, issue_date, due_date } = req.body;
    const admin_id = req.user.user_id;

    // Validate status
    const validStatuses = ['pending', 'approved', 'issued', 'returned', 'overdue', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status.',
      });
    }

    // Get borrow record
    const [borrows] = await pool.query(
      'SELECT * FROM borrow_records WHERE borrow_id = ?',
      [id]
    );

    if (borrows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Borrow record not found.',
      });
    }

    const borrow = borrows[0];

    // Update book availability based on status
    if (status === 'issued' && borrow.status !== 'issued') {
      await pool.query(
        'UPDATE books SET available_copies = available_copies - 1 WHERE book_id = ?',
        [borrow.book_id]
      );
    } else if (status === 'returned' && borrow.status === 'issued') {
      await pool.query(
        'UPDATE books SET available_copies = available_copies + 1 WHERE book_id = ?',
        [borrow.book_id]
      );
    }

    // Update borrow record
    await pool.query(
      `UPDATE borrow_records 
       SET status = ?, admin_id = ?, admin_notes = ?, issue_date = ?, due_date = ?
       WHERE borrow_id = ?`,
      [status, admin_id, admin_notes, issue_date, due_date, id]
    );

    // Get updated record
    const [updatedBorrows] = await pool.query(
      `SELECT br.*, b.title, b.author, u.full_name, u.email
       FROM borrow_records br
       JOIN books b ON br.book_id = b.book_id
       JOIN users u ON br.user_id = u.user_id
       WHERE br.borrow_id = ?`,
      [id]
    );

    res.json({
      success: true,
      message: 'Borrow request updated successfully.',
      data: updatedBorrows[0],
    });
  } catch (error) {
    console.error('Update borrow status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating borrow request.',
    });
  }
};
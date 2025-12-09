import pool from '../config/database.js';

// Get all notes with filters
export const getAllNotes = async (req, res) => {
  try {
    const { class: classFilter = '', subject = '', search = '' } = req.query;

    let query = 'SELECT * FROM notes WHERE status = "active"';
    const params = [];

    if (classFilter) {
      query += ' AND class = ?';
      params.push(classFilter);
    }

    if (subject) {
      query += ' AND subject = ?';
      params.push(subject);
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY upload_date DESC';

    const [notes] = await pool.query(query, params);

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notes.',
    });
  }
};

// Get single note
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const [notes] = await pool.query('SELECT * FROM notes WHERE note_id = ?', [id]);

    if (notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    // Increment download count
    await pool.query('UPDATE notes SET download_count = download_count + 1 WHERE note_id = ?', [id]);

    res.json({
      success: true,
      data: notes[0],
    });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching note.',
    });
  }
};

// Get notes by class and subject
export const getNotesByClassAndSubject = async (req, res) => {
  try {
    const { class: classParam, subject } = req.query;

    if (!classParam || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both class and subject.',
      });
    }

    const [notes] = await pool.query(
      'SELECT * FROM notes WHERE class = ? AND subject = ? AND status = "active" ORDER BY upload_date DESC',
      [classParam, subject]
    );

    res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error('Get notes by class and subject error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notes.',
    });
  }
};

// Create note (admin only)
export const createNote = async (req, res) => {
  try {
    const { title, class: classValue, subject, description, file_path, file_type, pages } = req.body;
    const uploaded_by = req.user.user_id;

    if (!title || !classValue || !subject || !file_path) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, class, subject, and file.',
      });
    }

    const [result] = await pool.query(
      `INSERT INTO notes (title, class, subject, description, file_path, file_type, pages, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, classValue, subject, description, file_path, file_type || 'PDF', pages, uploaded_by]
    );

    const [notes] = await pool.query('SELECT * FROM notes WHERE note_id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Note uploaded successfully.',
      data: notes[0],
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading note.',
    });
  }
};

// Update note (admin only)
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, class: classValue, subject, description, status } = req.body;

    const updates = [];
    const params = [];

    if (title) {
      updates.push('title = ?');
      params.push(title);
    }
    if (classValue) {
      updates.push('class = ?');
      params.push(classValue);
    }
    if (subject) {
      updates.push('subject = ?');
      params.push(subject);
    }
    if (description) {
      updates.push('description = ?');
      params.push(description);
    }
    if (status) {
      updates.push('status = ?');
      params.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update.',
      });
    }

    params.push(id);
    await pool.query(
      `UPDATE notes SET ${updates.join(', ')} WHERE note_id = ?`,
      params
    );

    const [notes] = await pool.query('SELECT * FROM notes WHERE note_id = ?', [id]);

    res.json({
      success: true,
      message: 'Note updated successfully.',
      data: notes[0],
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating note.',
    });
  }
};

// Delete note (admin only)
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const [notes] = await pool.query('SELECT * FROM notes WHERE note_id = ?', [id]);

    if (notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Note not found.',
      });
    }

    await pool.query('DELETE FROM notes WHERE note_id = ?', [id]);

    res.json({
      success: true,
      message: 'Note deleted successfully.',
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting note.',
    });
  }
};

// Get all classes
export const getClasses = async (req, res) => {
  try {
    const [classes] = await pool.query(
      'SELECT DISTINCT class FROM notes WHERE status = "active" ORDER BY class'
    );

    res.json({
      success: true,
      data: classes.map((c) => c.class),
    });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching classes.',
    });
  }
};

// Get subjects by class
export const getSubjectsByClass = async (req, res) => {
  try {
    const { class: classParam } = req.query;

    if (!classParam) {
      return res.status(400).json({
        success: false,
        message: 'Please provide class parameter.',
      });
    }

    const [subjects] = await pool.query(
      'SELECT DISTINCT subject FROM notes WHERE class = ? AND status = "active" ORDER BY subject',
      [classParam]
    );

    res.json({
      success: true,
      data: subjects.map((s) => s.subject),
    });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching subjects.',
    });
  }
};
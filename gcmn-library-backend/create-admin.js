import bcrypt from 'bcryptjs';
import pool from './src/config/database.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    console.log('🔧 Creating admin account...\n');

    // Admin credentials
    const adminData = {
      full_name: 'Library Administrator',
      email: 'admin@gcmn.edu.pk',
      password: 'Admin@GCMN2025',
      phone: '+92 21 36630301',
      roll_number: 'ADMIN-001',
      department: 'Administration',
      semester: 'N/A'
    };

    // Check if admin already exists
    const [existing] = await pool.query(
      'SELECT user_id FROM users WHERE email = ?',
      [adminData.email]
    );

    if (existing.length > 0) {
      console.log('⚠️  Admin account already exists!');
      console.log('Email:', adminData.email);
      console.log('\nTo reset password, run: npm run reset-admin-password\n');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(adminData.password, salt);

    // Insert admin user
    const [result] = await pool.query(
      `INSERT INTO users (
        full_name, email, phone, roll_number, 
        password_hash, role, department, semester, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        adminData.full_name,
        adminData.email,
        adminData.phone,
        adminData.roll_number,
        password_hash,
        'admin',
        adminData.department,
        adminData.semester,
        'active'
      ]
    );

    console.log('✅ Admin account created successfully!\n');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('═══════════════════════════════════════\n');
    console.log('⚠️  IMPORTANT: Change this password after first login!\n');
    console.log('🌐 Login at: http://localhost:5173/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
import bcrypt from 'bcryptjs';

const storedHash = '$2a$10$jI9fopacLdYPMEVX7rIzo.BS0FANUDeYrxrGOL7IsYBzHt.tArcUi';
const password = 'demo12345';

(async () => {
  try {
    const match = await bcrypt.compare(password, storedHash);
    console.log('Password match result for demo user:', match);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

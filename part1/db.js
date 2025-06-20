const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'newpass123',
  database: 'DogWalkService',
  multipleStatements: true
};

async function initializeDatabase() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    await connection.query(`
      INSERT IGNORE INTO Users (username, email, password_hash, role) VALUES
      ('alice123', 'alice@example.com', 'hashed123', 'owner'),
      ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
      ('carol123', 'carol@example.com', 'hashed789', 'owner'),
      ('davewalker', 'dave@example.com', 'hashed999', 'walker'),
      ('eveowner', 'eve@example.com', 'hashed000', 'owner');

      INSERT IGNORE INTO Dogs (owner_id, name, size) VALUES
      ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
      ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
      ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Rocky', 'large'),
      ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Luna', 'medium'),
      ((SELECT user_id FROM Users WHERE username = 'eveowner'), 'Milo', 'small');

      INSERT IGNORE INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
      ((SELECT dog_id FROM Dogs WHERE name = 'Max' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Bella' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Rocky'), '2025-06-11 14:00:00', 60, 'River Trail', 'open'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Luna'), '2025-06-12 10:30:00', 20, 'City Park', 'open'),
      ((SELECT dog_id FROM Dogs WHERE name = 'Milo'), '2025-06-13 16:00:00', 40, 'Downtown Square', 'cancelled');
    `);

    console.log('Sample data inserted.');
  } catch (err) {
    console.error('DB insert error:', err.message);
  }

  return connection;
}

module.exports = initializeDatabase;

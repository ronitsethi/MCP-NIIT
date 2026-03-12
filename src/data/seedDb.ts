import { query, getClient } from "../db.js";
import { 
  MOCK_COURSES, 
  MOCK_OFFERINGS, 
  MOCK_LEARNERS, 
  MOCK_SURVEY_DATA, 
  MOCK_ATTENDANCE, 
  MOCK_ROOMS,
  MOCK_BOOKINGS 
} from "./mockData.js";

async function createSchema() {
  await query(`
    DROP TABLE IF EXISTS bookings CASCADE;
    DROP TABLE IF EXISTS attendance CASCADE;
    DROP TABLE IF EXISTS survey_data CASCADE;
    DROP TABLE IF EXISTS offerings CASCADE;
    DROP TABLE IF EXISTS courses CASCADE;
    DROP TABLE IF EXISTS learners CASCADE;
    DROP TABLE IF EXISTS rooms CASCADE;

    CREATE TABLE courses (
      course_id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(50) NOT NULL,
      delivery_mode VARCHAR(50) NOT NULL,
      duration_days INTEGER NOT NULL,
      owner VARCHAR(100) NOT NULL,
      fee_internal NUMERIC DEFAULT 0,
      fee_external NUMERIC DEFAULT 0,
      fee_jvn NUMERIC DEFAULT 0
    );

    CREATE TABLE offerings (
      offering_id VARCHAR(50) PRIMARY KEY,
      course_id VARCHAR(50) REFERENCES courses(course_id),
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      location VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      capacity INTEGER NOT NULL,
      enrolled_count INTEGER DEFAULT 0,
      waitlist_count INTEGER DEFAULT 0
    );

    CREATE TABLE learners (
      user_id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL
    );

    CREATE TABLE survey_data (
      offering_id VARCHAR(50) PRIMARY KEY REFERENCES offerings(offering_id),
      total_participants INTEGER DEFAULT 0,
      responses_received INTEGER DEFAULT 0,
      response_rate NUMERIC DEFAULT 0,
      survey_close_date DATE,
      average_rating NUMERIC(3, 2) DEFAULT 0,
      report_url TEXT
    );

    CREATE TABLE attendance (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(50) REFERENCES learners(user_id),
      offering_id VARCHAR(50) REFERENCES offerings(offering_id),
      sessions_attended INTEGER DEFAULT 0,
      total_sessions INTEGER DEFAULT 0,
      status VARCHAR(50) NOT NULL,
      evidence_links JSONB DEFAULT '[]'::jsonb,
      UNIQUE(user_id, offering_id)
    );

    CREATE TABLE rooms (
      room_id VARCHAR(50) PRIMARY KEY,
      location VARCHAR(255) NOT NULL,
      capacity INTEGER NOT NULL
    );

    CREATE TABLE bookings (
      booking_id VARCHAR(50) PRIMARY KEY,
      room_id VARCHAR(50) REFERENCES rooms(room_id),
      booking_date DATE NOT NULL,
      requested_by VARCHAR(255) NOT NULL,
      course_id VARCHAR(50),
      booking_reference VARCHAR(50) NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'confirmed',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("Schema created successfully.");
}

async function seedData() {
  const client = await getClient();
  try {
    await client.query("BEGIN");

    // Insert Courses
    for (const course of MOCK_COURSES) {
      await client.query(
        `INSERT INTO courses (course_id, title, category, delivery_mode, duration_days, owner, fee_internal, fee_external, fee_jvn)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [course.courseId, course.title, course.category, course.deliveryMode, course.durationDays, course.owner, course.fees.internal, course.fees.external, course.fees.jvn]
      );
    }

    // Insert Offerings
    for (const offering of MOCK_OFFERINGS) {
      await client.query(
        `INSERT INTO offerings (offering_id, course_id, start_date, end_date, location, status, capacity, enrolled_count, waitlist_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [offering.offeringId, offering.courseId, offering.startDate, offering.endDate, offering.location, offering.status, offering.capacity, offering.enrolledCount, offering.waitlistCount]
      );
    }

    // Insert Learners
    for (const learner of MOCK_LEARNERS) {
      await client.query(
        `INSERT INTO learners (user_id, name, type) VALUES ($1, $2, $3)`,
        [learner.userId, learner.name, learner.type]
      );
    }

    // Insert Survey Data (Note we only have one item in MOCK_SURVEY_DATA as an object)
    const survey = MOCK_SURVEY_DATA;
    await client.query(
      `INSERT INTO survey_data (offering_id, total_participants, responses_received, response_rate, survey_close_date, average_rating, report_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [survey.offeringId, survey.totalParticipants, survey.responsesReceived, survey.responseRate, survey.surveyCloseDate, survey.averageRating, survey.reportUrl]
    );

    // Insert Attendance
    for (const att of MOCK_ATTENDANCE) {
      await client.query(
        `INSERT INTO attendance (user_id, offering_id, sessions_attended, total_sessions, status, evidence_links)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [att.userId, att.offeringId, att.sessionsAttended, att.totalSessions, att.status, JSON.stringify(att.evidenceLinks)]
      );
    }

    // Insert Rooms
    for (const room of MOCK_ROOMS) {
      await client.query(
        `INSERT INTO rooms (room_id, location, capacity)
         VALUES ($1, $2, $3)`,
        [room.roomId, room.location, room.capacity]
      );
    }

    // Insert Bookings
    for (const booking of MOCK_BOOKINGS) {
      await client.query(
        `INSERT INTO bookings (booking_id, room_id, booking_date, requested_by, course_id, booking_reference, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [booking.bookingId, booking.roomId, booking.bookingDate, booking.requestedBy, booking.courseId, booking.bookingReference, booking.status]
      );
    }

    await client.query("COMMIT");
    console.log("Mock data seeded successfully.");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error seeding data:", err);
    throw err;
  } finally {
    client.release();
  }
}

async function run() {
  try {
    await createSchema();
    await seedData();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed database", error);
    process.exit(1);
  }
}

run();

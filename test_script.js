import { getRoomBookings, bookTrainingRoom } from "./src/services/logisticsService.js";

async function runTests() {
  console.log("--- Testing bookTrainingRoom (April 14, 2026) ---");
  // RM-501 is booked on April 14, so this should fail
  const res1 = await bookTrainingRoom({
    location: "Singapore",
    sessionDate: "2026-04-14",
    capacity: 25,
    requestedBy: "Test User"
  });
  console.log(JSON.stringify(res1, null, 2));

  console.log("\n--- Testing bookTrainingRoom (April 16, 2026) ---");
  // RM-501 is NOT booked on April 16, so it should succeed
  const res2 = await bookTrainingRoom({
    location: "Singapore",
    sessionDate: "2026-04-16",
    capacity: 25,
    requestedBy: "Test User"
  });
  console.log(JSON.stringify(res2, null, 2));
}

runTests().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });

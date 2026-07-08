const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = require('./src/config/db');
const { notifyPostPayment } = require('./src/services/paymentNotificationService');

const mockBooking = {
  customer_name: "Murali NRK Test",
  phone: "+918247818568",
  email: "saripillimurali8@gmail.com",
  booking_id: "TX-NRK-9999",
  amount_paid: 1000,
  total_amount: 3000,
  remaining_balance: 2000,
  booking_status: "partially_paid",
  payment_status: "paid",
  booking_type: "vehicle",
  travel_date: new Date(),
  pickup_location: "Visakhapatnam Airport (VTZ)",
  drop_location: "RK Beach, Vizag"
};

const runTest = async () => {
  console.log("Connecting to database...");
  await connectDB();
  console.log("Triggering notifyPostPayment...");
  await notifyPostPayment(mockBooking);
  console.log("Done! Closing process in 5 seconds...");
  setTimeout(() => {
    process.exit(0);
  }, 5000);
};

runTest().catch(console.error);

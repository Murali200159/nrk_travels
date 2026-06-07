-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- e.g. Hatchback, Sedan, SUV, Bus
  capacity INTEGER NOT NULL,
  price_per_km DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. vehicle_terms table
CREATE TABLE IF NOT EXISTS vehicle_terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_type VARCHAR(100) UNIQUE NOT NULL, -- e.g. Honda Amaze, Maruti Dzire, Toyota Innova
  terms TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. tours table
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  location VARCHAR(255),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. bookings table (Refactored RedBus/AbhiBus style)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id VARCHAR(100) UNIQUE NOT NULL, -- Format: NRK-YYYYMMDD-XXXX
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  booking_type VARCHAR(50) NOT NULL, -- 'tour', 'group_tour', 'vehicle', 'hire_driver'
  vehicle_id VARCHAR(255),
  tour_id VARCHAR(255),
  travel_date DATE NOT NULL,
  pickup_location TEXT,
  drop_location TEXT,
  passengers JSONB, -- Seat details, names, ages
  amount DECIMAL(10, 2) NOT NULL,
  booking_status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_id VARCHAR(255), -- Razorpay Payment ID
  order_id VARCHAR(255), -- Razorpay Order ID
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  razorpay_order_id VARCHAR(255) NOT NULL,
  razorpay_payment_id VARCHAR(255),
  razorpay_signature VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'NEW', -- NEW, IN_PROGRESS, RESOLVED
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. careers table
CREATE TABLE IF NOT EXISTS careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  position VARCHAR(255) NOT NULL,
  resume_url TEXT,
  status VARCHAR(50) DEFAULT 'APPLIED',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers for automatic updated_at handling
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_vehicles
BEFORE UPDATE ON vehicles
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_vehicle_terms
BEFORE UPDATE ON vehicle_terms
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_tours
BEFORE UPDATE ON tours
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_bookings
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_contacts
BEFORE UPDATE ON contacts
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_careers
BEFORE UPDATE ON careers
FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_booking_id ON bookings(booking_id);
CREATE INDEX IF NOT EXISTS idx_bookings_order_id ON bookings(order_id);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_status ON bookings(booking_status);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(razorpay_order_id);

-- Insert Mock/Initial Vehicle Terms (e.g. Honda Amaze, Hatchback, Sedan, SUV, Bus)
INSERT INTO vehicle_terms (vehicle_type, terms) VALUES 
('Honda Amaze', ARRAY[
  'For extra kilometers (after time limit), charge is ₹14/km.',
  'For extra hours (after time limit), charge is ₹250/hour.',
  'Driver Bhatta is ₹200/day.',
  'Toll gate charges and parking fees should be paid by the customer.',
  'Driver food should be paid/provided by the customer.'
]),
('Dzire', ARRAY[
  'For extra kilometers (after time limit), charge is ₹14/km.',
  'For extra hours (after time limit), charge is ₹250/hour.',
  'Driver Bhatta is ₹200/day.',
  'Toll gate charges and parking fees should be paid by the customer.',
  'Driver food should be paid/provided by the customer.'
]),
('Sedan', ARRAY[
  'For extra kilometers, charge is ₹14/km.',
  'For extra hours, charge is ₹250/hour.',
  'Driver Bhatta is ₹200/day.',
  'Toll gate charges and parking fees should be paid by the customer.',
  'Driver food should be paid/provided by the customer.'
]),
('SUV', ARRAY[
  'For extra kilometers, charge is ₹18/km.',
  'For extra hours, charge is ₹300/hour.',
  'Driver Bhatta is ₹300/day.',
  'Toll gate charges and parking fees should be paid by the customer.',
  'Driver food should be paid/provided by the customer.'
]),
('Bus', ARRAY[
  'For extra kilometers, charge is ₹40/km.',
  'For extra hours, charge is ₹600/hour.',
  'Driver Bhatta is ₹500/day.',
  'Toll gate charges and parking fees should be paid by the customer.',
  'Driver food and lodging must be provided by the customer.'
])
ON CONFLICT (vehicle_type) DO UPDATE SET terms = EXCLUDED.terms;

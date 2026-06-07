const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL.replace(/\/rest\/v1\/?$/, '');
const supabaseKey = process.env.SUPABASE_KEY;

console.log('URL (cleaned):', supabaseUrl);
console.log('Key prefix:', supabaseKey ? supabaseKey.slice(0, 10) : 'none');

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const tables = ['bookings', 'payments', 'vehicles', 'tours', 'contacts', 'careers', 'fleet', 'group_tours'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`Table ${table} error:`, error.message);
    } else {
      console.log(`Table ${table} exists! Columns:`, data.length > 0 ? Object.keys(data[0]) : 'empty');
    }
  }
}

inspect();

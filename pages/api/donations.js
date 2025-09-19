import fs from 'fs';
import path from 'path';

const donationsFilePath = path.join(process.cwd(), 'data', 'donations.json');

// Ensure data directory exists
try {
  if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
  }
} catch (error) {
  console.error('Error creating data directory:', error);
}

// Helper function to read donations from file
function readDonations() {
  try {
    if (fs.existsSync(donationsFilePath)) {
      const data = fs.readFileSync(donationsFilePath, 'utf8');
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch (error) {
    console.error('Error reading donations file:', error);
    return [];
  }
}

// Helper function to write donations to file
function writeDonations(donations) {
  try {
    fs.writeFileSync(donationsFilePath, JSON.stringify(donations, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing donations file:', error);
    return false;
  }
}

export default async function handler(req, res) {
  console.log('API called with method:', req.method);

  if (req.method === "POST") {
    try {
      console.log('Processing POST request');

      // Parse request body if it's not already parsed
      let donation;
      if (typeof req.body === 'string') {
        donation = JSON.parse(req.body);
      } else {
        donation = req.body;
      }

      console.log('Received donation data:', donation);

      if (!donation || typeof donation.amount !== 'number' || isNaN(donation.amount) || donation.amount <= 0) {
        console.error('Invalid donation data:', donation);
        return res.status(400).json({ error: 'Invalid donation data - amount must be a positive number' });
      }

      const donations = readDonations();
      console.log('Current donations count:', donations.length);

      donation.id = donations.length + 1;
      donation.timestamp = new Date().toISOString();

      donations.push(donation);
      console.log('Adding donation:', donation);

      const success = writeDonations(donations);
      if (!success) {
        return res.status(500).json({ error: 'Failed to save donation to file' });
      }

      console.log('Donation saved successfully with ID:', donation.id);
      res.status(201).json({ success: true, id: donation.id });
    } catch (error) {
      console.error('Error in POST handler:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  } else if (req.method === "GET") {
    try {
      console.log('Processing GET request');
      const donations = readDonations();
      console.log('Returning donations count:', donations.length);
      res.status(200).json(donations);
    } catch (error) {
      console.error('Error in GET handler:', error);
      res.status(500).json({ error: 'Failed to read donations' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

'use client';
import React, { useEffect, useState } from 'react';

interface Donation {
  id: number;
  donor: string;
  amount: number;
  date: string;
}

const mockDonations: Donation[] = [
  { id: 1, donor: 'John Doe', amount: 100, date: '2024-06-01' },
  { id: 2, donor: 'Jane Smith', amount: 250, date: '2024-06-03' },
  { id: 3, donor: 'Alice Brown', amount: 75, date: '2024-06-05' },
];

function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Replace with API call if available
    setDonations(mockDonations);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Donation History</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Donor</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Amount</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {donations.map(donation => (
            <tr key={donation.id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{donation.id}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{donation.donor}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{donation.amount}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{donation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDonations;

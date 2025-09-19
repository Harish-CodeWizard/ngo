'use client';
import React, { useEffect, useState } from 'react';

// Define the Donation interface
interface Donation {
  id: number;
  donor: string;
  amount: number;
  date: string;
}

// The component logic is now directly inside the page
export default function AdminPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations');
      if (response.ok) {
        const data = await response.json();
        setDonations(data);
        const total = data.reduce((sum: number, donation: Donation) => sum + donation.amount, 0);
        setTotalAmount(total);
      }
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading donations...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      
      {/* Total Donated Amount */}
      <div style={{ 
        backgroundColor: '#f0f8ff', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        border: '2px solid #007bff'
      }}>
        <h2 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>Total Donated Amount</h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
          ₹{totalAmount.toLocaleString()}
        </p>
      </div>

      <h2>Donation History</h2>
      {donations.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
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
                <td style={{ border: '1px solid black', padding: '8px' }}>₹{donation.amount}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{donation.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
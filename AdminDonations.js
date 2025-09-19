import React, { useEffect, useState } from 'react';

function AdminDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("/api/donations")
      .then(res => res.json())
      .then(data => setDonations(data))
      .catch(() => setDonations([]));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Donation History</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Donor</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>PAN Card</th>
            <th>Message</th>
            <th>Campaign</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation, idx) => (
            <tr key={idx}>
              <td>{donation.id}</td>
              <td>{donation.donor}</td>
              <td>{donation.amount}</td>
              <td>{donation.date}</td>
              <td>{donation.email}</td>
              <td>{donation.phone}</td>
              <td>{donation.address}</td>
              <td>{donation.panCard}</td>
              <td>{donation.message}</td>
              <td>{donation.campaign}</td>
              <td>{donation.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDonations;

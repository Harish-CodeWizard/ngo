'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
// More specific icons for a professional dashboard
import { LayoutDashboard, Users, DollarSign, Calendar, Download, Search, MoreHorizontal, TrendingUp } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from 'recharts';

// Extend jsPDF type to include autoTable method (for compatibility)
declare module 'jspdf' {
  interface jsPDF {
    autoTable?: (options: any) => jsPDF;
    getNumberOfPages: () => number;
  }
}

interface Donation {
  id: number;
  donor: string;
  amount: number;
  date: string;
  campaign?: string;
  type?: string;
  email?: string;
  phone?: string;
  address?: string;
  panCard?: string;
  message?: string;
  timestamp?: string;
}

// --- SIDEBAR COMPONENT ---
const Sidebar = () => (
  <aside className="hidden md:flex flex-col w-64 bg-[#2D3748] text-gray-300">
    <div className="flex items-center justify-center h-20 border-b border-gray-700">
      <div className="flex items-center">
        <img src="https://placehold.co/40x40/FBBF24/2D3748?text=KF" alt="Kuviyal Foundation Logo" className="h-10 w-10 rounded-full" />
        <span className="ml-3 text-xl font-bold text-white">Kuviyal Admin</span>
      </div>
    </div>
    <nav className="flex-1 px-4 py-6 space-y-2">
      <a href="/admin" className="flex items-center px-4 py-2.5 bg-gray-900 text-white rounded-lg">
        <LayoutDashboard className="h-5 w-5" />
        <span className="ml-4">Dashboard</span>
      </a>
      <a href="/admin/donors" className="flex items-center px-4 py-2.5 hover:bg-gray-700 rounded-lg">
        <Users className="h-5 w-5" />
        <span className="ml-4">Donors</span>
      </a>
      {/* Add more nav items here */}
    </nav>
  </aside>
);

// --- MAIN PAGE COMPONENT ---
export default function AdminPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Fetch donations data from API
  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/donations');
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDonations(); }, []);

  const filteredDonations = useMemo(() => {
    let filtered = donations;
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(d => {
        const donationDate = new Date(d.date);
        const month = donationDate.getMonth() + 1;
        const year = donationDate.getFullYear();
        return `${year}-${month.toString().padStart(2, '0')}` === selectedMonth;
      });
    }
    if (searchTerm) {
      filtered = filtered.filter(d => d.donor.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  }, [donations, selectedMonth, searchTerm]);

  const paginatedDonations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDonations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDonations, currentPage]);

  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  const summaryStats = useMemo(() => {
    const totalDonationAmount = donations.reduce((sum, d) => sum + d.amount, 0);
    const monthlyTotal = filteredDonations.reduce((sum, d) => sum + d.amount, 0);

    // Calculate unique donors using the same logic as donors page
    const donorMap: Record<string, boolean> = {};
    donations.forEach(donation => {
      const key = donation.email || donation.donor.toLowerCase();
      donorMap[key] = true;
    });
    const totalDonorCount = Object.keys(donorMap).length;

    const filteredDonorCount = filteredDonations.length;
    return { totalDonationAmount, monthlyTotal, totalDonorCount, filteredDonorCount };
  }, [donations, filteredDonations]);

  const monthlyChartData = useMemo(() => {
    const monthlyData: Record<string, { amount: number; count: number }> = {};

    donations.forEach(donation => {
      const date = new Date(donation.date);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { amount: 0, count: 0 };
      }

      monthlyData[monthKey].amount += donation.amount;
      monthlyData[monthKey].count += 1;
    });

    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        amount: data.amount,
        count: data.count,
      }));
  }, [donations]);

  const donorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const donationSequences: Record<string, Record<number, number>> = {};

    // Group donations by donor (case-insensitive)
    const donorGroups: Record<string, Donation[]> = {};
    donations.forEach(d => {
      const key = d.donor.toLowerCase();
      if (!donorGroups[key]) donorGroups[key] = [];
      donorGroups[key].push(d);
    });

    // Sort each group by date and assign sequence numbers
    Object.keys(donorGroups).forEach(key => {
      const group = donorGroups[key];
      group.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      group.forEach((donation, index) => {
        donationSequences[key] = donationSequences[key] || {};
        donationSequences[key][donation.id] = index + 1;
      });
      counts[key] = group.length;
    });

    return { counts, donationSequences };
  }, [donations]);

  const monthOptions = useMemo(() => {
    const months = new Set<string>();
    donations.forEach(d => {
      const date = new Date(d.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      months.add(`${year}-${month.toString().padStart(2, '0')}`);
    });
    const monthList = Array.from(months).sort().reverse().map(m => {
      const [year, month] = m.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return { value: m, label: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) };
    });
    return [{ value: 'all', label: 'All Months' }, ...monthList];
  }, [donations]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Kuviyal Foundation - Donation Report', 20, 30);

    // Add report period
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Report Period: ${selectedMonthLabel}`, 20, 45);

    // Add summary statistics
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Summary Statistics', 20, 65);

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.text(`Total Revenue: ₹${summaryStats.totalDonationAmount.toLocaleString()}`, 20, 80);
    doc.text(`Selected Period Revenue: ₹${selectedMonth === 'all' ? summaryStats.totalDonationAmount.toLocaleString() : summaryStats.monthlyTotal.toLocaleString()}`, 20, 90);
    doc.text(`Unique Donors: ${summaryStats.totalDonorCount}`, 20, 100);
    doc.text(`Total Records: ${filteredDonations.length}`, 20, 110);

    // Prepare table data
    const tableData = filteredDonations.map(donation => [
      donation.id.toString(),
      donation.donor === 'Anonymous' ? '-' : donation.donor,
      `₹${donation.amount.toLocaleString()}`,
      new Date(donation.date).toLocaleDateString(),
      donation.donor === 'Anonymous' ? '-' : (donorCounts.donationSequences[donation.donor.toLowerCase()]?.[donation.id] || 1).toString(),
      donation.type ? donation.type.charAt(0).toUpperCase() + donation.type.slice(1) : 'One-time',
      donation.campaign || '-'
    ]);

    // Add table
    autoTable(doc, {
      head: [['ID', 'Donor', 'Amount', 'Date', 'Donation #', 'Type', 'Campaign']],
      body: tableData,
      startY: 125,
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [251, 191, 36], // Yellow color matching the theme
        textColor: [45, 55, 72], // Dark gray
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251], // Light gray
      },
    });

    // Add footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on ${new Date().toLocaleDateString()} - Page ${i} of ${pageCount}`, 20, doc.internal.pageSize.height - 10);
    }

    // Save the PDF
    doc.save(`kuviyal-foundation-report-${selectedMonth === 'all' ? 'all-months' : selectedMonth}.pdf`);
  };

  const selectedMonthLabel = useMemo(() => {
    if (selectedMonth === 'all') return 'all months';
    return monthOptions.find(m => m.value === selectedMonth)?.label;
  }, [monthOptions, selectedMonth]);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* --- TOP HEADER --- */}
        <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200">
           <div>
             <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
             <p className="text-sm text-gray-500">Overview of donations for {selectedMonthLabel || 'the selected period'}</p>
           </div>
           <div className="flex items-center space-x-4">
              <Button onClick={handleDownloadPDF} className="bg-[#FBBF24] text-gray-900 hover:bg-yellow-400">
                 <Download className="h-4 w-4 mr-2"/>
                 Export Report
              </Button>
              <img src="https://placehold.co/40x40/E5E7EB/4B5563?text=HK" alt="User Avatar" className="h-10 w-10 rounded-full" />
           </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-yellow-50/50 via-white to-purple-50/50">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
                <DollarSign className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-800">₹{summaryStats.totalDonationAmount.toLocaleString()}</div>
                <p className="text-xs text-gray-500">All-time donation total</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Selected Month</CardTitle>
                <Calendar className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-800">₹{selectedMonth === 'all' ? summaryStats.totalDonationAmount.toLocaleString() : summaryStats.monthlyTotal.toLocaleString()}</div>
                <p className="text-xs text-gray-500">{selectedMonth === 'all' ? 'All-time total' : (selectedMonthLabel || '...')}</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Unique Donors</CardTitle>
                <Users className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-800">+{summaryStats.totalDonorCount}</div>
                 <p className="text-xs text-gray-500">In the selected period</p>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Donations Chart */}
          <Card className="bg-white shadow-lg border-gray-200 mb-8 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-purple-50 border-b border-gray-100">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-[#FBBF24]" />
                Monthly Donations Trend
              </CardTitle>
              <CardDescription className="text-gray-600">Track donation amounts and frequency over time with beautiful visualizations</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <defs>
                      <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FBBF24" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FBBF24" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="countGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="2 2"
                      stroke="#E5E7EB"
                      strokeOpacity={0.5}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      axisLine={{ stroke: '#D1D5DB' }}
                      tickLine={{ stroke: '#D1D5DB' }}
                    />
                    <YAxis
                      yAxisId="amount"
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                      axisLine={{ stroke: '#D1D5DB' }}
                      tickLine={{ stroke: '#D1D5DB' }}
                      label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6B7280' } }}
                    />
                    <YAxis
                      yAxisId="count"
                      orientation="right"
                      tick={{ fontSize: 12, fill: '#6B7280' }}
                      axisLine={{ stroke: '#D1D5DB' }}
                      tickLine={{ stroke: '#D1D5DB' }}
                      label={{ value: 'Donations', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#6B7280' } }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                      formatter={(value, name) => [
                        name === 'amount' ? `₹${value.toLocaleString()}` : value,
                        name === 'amount' ? '💰 Total Amount' : '📊 Number of Donations'
                      ]}
                      labelStyle={{ color: '#374151', fontWeight: '600', marginBottom: '8px' }}
                      cursor={{ stroke: '#FBBF24', strokeWidth: 2, strokeDasharray: '5 5' }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="rect"
                    />
                    <Area
                      yAxisId="amount"
                      type="monotone"
                      dataKey="amount"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      fill="url(#amountGradient)"
                      name="Total Amount (₹)"
                      dot={{
                        fill: '#F59E0B',
                        strokeWidth: 3,
                        stroke: '#FFFFFF',
                        r: 6,
                        filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))'
                      }}
                      activeDot={{
                        r: 8,
                        stroke: '#F59E0B',
                        strokeWidth: 3,
                        fill: '#FFFFFF',
                        filter: 'drop-shadow(0 4px 8px rgba(245, 158, 11, 0.4))'
                      }}
                    />
                    <Area
                      yAxisId="count"
                      type="monotone"
                      dataKey="count"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      strokeDasharray="8 4"
                      fill="url(#countGradient)"
                      name="Number of Donations"
                      dot={{
                        fill: '#8B5CF6',
                        strokeWidth: 2,
                        stroke: '#FFFFFF',
                        r: 5,
                        filter: 'drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))'
                      }}
                      activeDot={{
                        r: 7,
                        stroke: '#8B5CF6',
                        strokeWidth: 3,
                        fill: '#FFFFFF',
                        filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.4))'
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 py-2 rounded-full border border-yellow-200">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-sm"></div>
                  <span className="text-sm font-medium text-gray-700">Total Amount (₹)</span>
                </div>
                <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-full border border-purple-200">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-sm border-2 border-dashed border-purple-300"></div>
                  <span className="text-sm font-medium text-gray-700">Number of Donations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Table and Filters Card */}
          <Card className="bg-white shadow-sm border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">Recent Donations</CardTitle>
              <CardDescription>Browse and manage all donation records.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filter Controls */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search by donor name..." onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
                </div>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select Month..." /></SelectTrigger>
                  <SelectContent>
                     {monthOptions.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                 <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[150px]"><SelectValue placeholder="Select Type..." /></SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Types</SelectItem>
                     <SelectItem value="one-time">One-time</SelectItem>
                     <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-center">Donation #</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDonations.map(donation => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium">{donation.id}</TableCell>
                        <TableCell>{donation.donor === 'Anonymous' ? '-' : donation.donor}</TableCell>
                        <TableCell className="text-right font-semibold text-green-600">₹{donation.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center font-medium text-gray-600">{donation.donor === 'Anonymous' ? '-' : (donorCounts.donationSequences[donation.donor.toLowerCase()]?.[donation.id] || 1)}</TableCell>
                        <TableCell>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${donation.type === 'monthly' ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {donation.type ? donation.type.charAt(0).toUpperCase() + donation.type.slice(1) : 'One-time'}
                          </span>
                        </TableCell>
                        <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-600">Showing <strong>{paginatedDonations.length}</strong> of <strong>{filteredDonations.length}</strong> results</p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</Button>
                  <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

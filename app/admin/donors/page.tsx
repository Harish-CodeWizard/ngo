'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
// Icons for a polished UI
import { LayoutDashboard, Users, DollarSign, TrendingUp, UserCheck, Search, ArrowRight, Star } from 'lucide-react';

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
}

interface Donor {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  totalAmount: number;
  firstDonation: string;
  lastDonation: string;
  donationCount: number;
  isTopDonor?: boolean;
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
      <Link href="/admin" className="flex items-center px-4 py-2.5 hover:bg-gray-700 rounded-lg">
        <LayoutDashboard className="h-5 w-5" />
        <span className="ml-4">Dashboard</span>
      </Link>
      <a href="#" className="flex items-center px-4 py-2.5 bg-gray-900 text-white rounded-lg">
        <Users className="h-5 w-5" />
        <span className="ml-4">Donors</span>
      </a>
    </nav>
  </aside>
);

// --- DONOR PROFILE DIALOG ---
const DonorProfileDialog = ({ donor, donations }: { donor: Donor; donations: Donation[] }) => {
  const donorDonations = donations.filter(d =>
    (d.email && d.email === donor.email) ||
    (!d.email && d.donor.toLowerCase() === donor.name.toLowerCase())
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${donor.name}`} />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">{donor.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800">{donor.name}</span>
              {donor.isTopDonor && <Badge className="bg-yellow-400 hover:bg-yellow-400 text-gray-900"><Star className="h-4 w-4 mr-1" /> Top Donor</Badge>}
            </div>
            <p className="text-sm text-gray-500 font-normal">{donor.email}</p>
          </div>
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        {/* Key Stats */}
        <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Donated</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">₹{donor.totalAmount.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Donations</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold text-blue-600">{donor.donationCount}</div></CardContent>
        </Card>
        <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Donor Status</CardTitle></CardHeader>
            <CardContent>
                <Badge variant={donor.donationCount > 1 ? "default" : "secondary"} className={donor.donationCount > 1 ? 'bg-blue-600 hover:bg-blue-600' : ''}>
                    {donor.donationCount > 1 ? "Repeat Donor" : "New Donor"}
                </Badge>
            </CardContent>
        </Card>
      </div>

      {/* Donation History */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Donation History</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {donorDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">₹{donation.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{new Date(donation.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline">{donation.campaign || 'General'}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DialogContent>
  );
};

// --- DONOR LIST ITEM & SKELETON ---
const DonorListItem = ({ donor, donations }: { donor: Donor; donations: Donation[] }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
        <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${donor.name}`} />
                <AvatarFallback className="bg-gray-200 text-gray-600">{donor.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-gray-800 flex items-center">{donor.name} {donor.isTopDonor && <Star className="h-4 w-4 ml-2 text-yellow-500 fill-current" />}</p>
                <p className="text-sm text-gray-500">{donor.email}</p>
            </div>
        </div>
        <div className="hidden md:block text-center">
            <p className="font-semibold text-gray-800">₹{donor.totalAmount.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Total Donated</p>
        </div>
        <div className="hidden lg:block text-center">
            <p className="font-semibold text-gray-800">{donor.donationCount}</p>
            <p className="text-sm text-gray-500">Donations</p>
        </div>
        <div className="hidden md:block text-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${donor.donationCount > 1 ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {donor.donationCount > 1 ? "Repeat" : "New"}
            </span>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-white">
                    View Profile <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </DialogTrigger>
            <DonorProfileDialog donor={donor} donations={donations} />
        </Dialog>
    </div>
);

const DonorListSkeleton = () => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
            </div>
        </div>
        <div className="hidden md:block text-center space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-3 w-24" /></div>
        <div className="hidden lg:block text-center space-y-2"><Skeleton className="h-4 w-8" /><Skeleton className="h-3 w-16" /></div>
        <div className="hidden md:block text-center"><Skeleton className="h-6 w-16 rounded-full" /></div>
        <Skeleton className="h-9 w-32 rounded-lg" />
    </div>
);


// --- MAIN PAGE COMPONENT ---
export default function DonorsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  
  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/donations');
      if (!response.ok) {
        throw new Error('Failed to fetch donations');
      }
      const data = await response.json();
      setDonations(data);
    } catch (error) {
        console.error("Failed to fetch donations", error);
    } finally {
        setLoading(false);
    }
  };
  useEffect(() => { fetchDonations(); }, []);

  const donorsData = useMemo(() => {
    const donorMap: Record<string, Donor> = {};
    if (!donations) return [];

    donations.forEach(donation => {
      const key = donation.email || donation.donor.toLowerCase();
      if (!donorMap[key]) {
        donorMap[key] = {
          name: donation.donor,
          email: donation.email || 'N/A',
          phone: donation.phone || '',
          address: donation.address || '',
          totalAmount: 0,
          donationCount: 0,
          firstDonation: donation.date,
          lastDonation: donation.date,
        };
      }
      const donor = donorMap[key];
      donor.totalAmount += donation.amount;
      donor.donationCount += 1;
      if (new Date(donation.date) < new Date(donor.firstDonation)) donor.firstDonation = donation.date;
      if (new Date(donation.date) > new Date(donor.lastDonation)) {
        donor.lastDonation = donation.date;
        if (donation.phone) donor.phone = donation.phone;
        if (donation.address) donor.address = donation.address;
      }
    });

    const allDonors = Object.values(donorMap);
    const sortedDonors = [...allDonors].sort((a, b) => b.totalAmount - a.totalAmount);
    const topDonorCount = Math.ceil(sortedDonors.length * 0.1);
    const topDonorEmails = new Set(sortedDonors.slice(0, topDonorCount).map(d => d.email));
    
    return allDonors.map(d => ({...d, isTopDonor: topDonorEmails.has(d.email)}));
  }, [donations]);

  const filteredDonors = useMemo(() => {
    if (!searchTerm) return donorsData;
    return donorsData.filter(donor =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [donorsData, searchTerm]);

  const paginatedDonors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDonors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDonors, currentPage]);

  const totalPages = Math.ceil(filteredDonors.length / itemsPerPage);

  const donorStats = useMemo(() => {
    const totalDonors = donorsData.length;
    const totalAmount = donorsData.reduce((sum, donor) => sum + donor.totalAmount, 0);
    const avgDonation = totalDonors > 0 ? totalAmount / totalDonors : 0;
    const repeatDonors = donorsData.filter(donor => donor.donationCount > 1).length;
    return { totalDonors, totalAmount, avgDonation, repeatDonors };
  }, [donorsData]);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* --- TOP HEADER --- */}
        <header className="flex items-center justify-between h-20 px-8 bg-white border-b border-gray-200">
           <div>
             <h1 className="text-2xl font-bold text-gray-800">Donors Directory</h1>
             <p className="text-sm text-gray-500">Manage and connect with your supporters.</p>
           </div>
           <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search donors..." onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64"/>
              </div>
              <img src="https://placehold.co/40x40/E5E7EB/4B5563?text=HK" alt="User Avatar" className="h-10 w-10 rounded-full" />
           </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-yellow-50/50 via-white to-purple-50/50">
          {/* Donor Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <Card className="bg-white shadow-sm border-gray-200"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Donors</CardTitle><Users className="h-5 w-5 text-gray-400" /></CardHeader><CardContent><div className="text-3xl font-bold text-gray-800">{donorStats.totalDonors}</div></CardContent></Card>
             <Card className="bg-white shadow-sm border-gray-200"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle><DollarSign className="h-5 w-5 text-gray-400" /></CardHeader><CardContent><div className="text-3xl font-bold text-gray-800">₹{donorStats.totalAmount.toLocaleString()}</div></CardContent></Card>
             <Card className="bg-white shadow-sm border-gray-200"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-500">Avg. Donation</CardTitle><TrendingUp className="h-5 w-5 text-gray-400" /></CardHeader><CardContent><div className="text-3xl font-bold text-gray-800">₹{donorStats.avgDonation.toLocaleString(undefined, {maximumFractionDigits: 0})}</div></CardContent></Card>
             <Card className="bg-white shadow-sm border-gray-200"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-500">Repeat Donors</CardTitle><UserCheck className="h-5 w-5 text-gray-400" /></CardHeader><CardContent><div className="text-3xl font-bold text-gray-800">{donorStats.repeatDonors}</div></CardContent></Card>
          </div>

          {/* Donors List */}
          <div className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <DonorListSkeleton key={i} />)
              ) : paginatedDonors.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-700">No Donors Found</h3>
                    <p className="text-gray-500 text-sm">Your search for "{searchTerm}" did not return any results.</p>
                </div>
              ) : (
                paginatedDonors.map((donor) => <DonorListItem key={donor.email} donor={donor} donations={donations} />)
              )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
                <p className="text-sm text-gray-600">Showing <strong>{paginatedDonors.length}</strong> of <strong>{filteredDonors.length}</strong> donors</p>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Previous</Button>
                    <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</Button>
                </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


'use client';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ClipperDashboard() {
  const [clipper, setClipper] = useState({
    id: 1,
    name: "Alex Chen",
    email: "alex@example.com",
    totalEarnings: 2450,
    totalVideos: 12,
    activeVideos: 8,
    averageRPM: 2.45
  });

  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      videoUrl: "https://tiktok.com/@alexchen/video/123456789",
      platform: "TikTok",
      status: "approved",
      views: 2500000,
      earnings: 612.50,
      submittedDate: "2025-01-15",
      approvedDate: "2025-01-16",
      campaign: "Summer Product Launch"
    },
    {
      id: 2,
      videoUrl: "https://instagram.com/p/example123",
      platform: "Instagram",
      status: "pending",
      views: 0,
      earnings: 0,
      submittedDate: "2025-01-20",
      approvedDate: null,
      campaign: "Summer Product Launch"
    },
    {
      id: 3,
      videoUrl: "https://youtube.com/shorts/example456",
      platform: "YouTube",
      status: "approved",
      views: 1800000,
      earnings: 441.00,
      submittedDate: "2025-01-10",
      approvedDate: "2025-01-11",
      campaign: "Summer Product Launch"
    }
  ]);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState('7d');

  // Refs for dropdown click outside handling
  const statusDropdownRef = React.useRef<HTMLDivElement>(null);
  const sortDropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Realistic earnings data for a clipper over time
  // Scenario: Creator started with Viewmark in January 2024, gradually growing their earnings
  // Total earnings: $2,238 (matches the total at the top of the page)
  const earningsData = [
    // January 2024 - Started with Viewmark, low initial earnings
    { date: '2024-01-01', earnings: 0 },
    { date: '2024-01-02', earnings: 12 },
    { date: '2024-01-03', earnings: 8 },
    { date: '2024-01-04', earnings: 15 },
    { date: '2024-01-05', earnings: 22 },
    { date: '2024-01-06', earnings: 18 },
    { date: '2024-01-07', earnings: 25 },
    { date: '2024-01-08', earnings: 30 },
    { date: '2024-01-09', earnings: 28 },
    { date: '2024-01-10', earnings: 35 },
    { date: '2024-01-11', earnings: 42 },
    { date: '2024-01-12', earnings: 38 },
    { date: '2024-01-13', earnings: 45 },
    { date: '2024-01-14', earnings: 52 },
    { date: '2024-01-15', earnings: 48 },
    { date: '2024-01-16', earnings: 55 },
    { date: '2024-01-17', earnings: 62 },
    { date: '2024-01-18', earnings: 58 },
    { date: '2024-01-19', earnings: 65 },
    { date: '2024-01-20', earnings: 72 },
    { date: '2024-01-21', earnings: 68 },
    { date: '2024-01-22', earnings: 75 },
    { date: '2024-01-23', earnings: 82 },
    { date: '2024-01-24', earnings: 78 },
    { date: '2024-01-25', earnings: 85 },
    { date: '2024-01-26', earnings: 92 },
    { date: '2024-01-27', earnings: 88 },
    { date: '2024-01-28', earnings: 95 },
    { date: '2024-01-29', earnings: 102 },
    { date: '2024-01-30', earnings: 98 },
    { date: '2024-01-31', earnings: 105 },

    // February 2024 - Growing steadily
    { date: '2024-02-01', earnings: 112 },
    { date: '2024-02-02', earnings: 108 },
    { date: '2024-02-03', earnings: 115 },
    { date: '2024-02-04', earnings: 122 },
    { date: '2024-02-05', earnings: 118 },
    { date: '2024-02-06', earnings: 125 },
    { date: '2024-02-07', earnings: 132 },
    { date: '2024-02-08', earnings: 128 },
    { date: '2024-02-09', earnings: 135 },
    { date: '2024-02-10', earnings: 142 },
    { date: '2024-02-11', earnings: 138 },
    { date: '2024-02-12', earnings: 145 },
    { date: '2024-02-13', earnings: 152 },
    { date: '2024-02-14', earnings: 148 },
    { date: '2024-02-15', earnings: 155 },
    { date: '2024-02-16', earnings: 162 },
    { date: '2024-02-17', earnings: 158 },
    { date: '2024-02-18', earnings: 165 },
    { date: '2024-02-19', earnings: 172 },
    { date: '2024-02-20', earnings: 168 },
    { date: '2024-02-21', earnings: 175 },
    { date: '2024-02-22', earnings: 182 },
    { date: '2024-02-23', earnings: 178 },
    { date: '2024-02-24', earnings: 185 },
    { date: '2024-02-25', earnings: 192 },
    { date: '2024-02-26', earnings: 188 },
    { date: '2024-02-27', earnings: 195 },
    { date: '2024-02-28', earnings: 202 },
    { date: '2024-02-29', earnings: 198 },

    // March 2024 - Continued growth
    { date: '2024-03-01', earnings: 205 },
    { date: '2024-03-02', earnings: 212 },
    { date: '2024-03-03', earnings: 208 },
    { date: '2024-03-04', earnings: 215 },
    { date: '2024-03-05', earnings: 222 },
    { date: '2024-03-06', earnings: 218 },
    { date: '2024-03-07', earnings: 225 },
    { date: '2024-03-08', earnings: 232 },
    { date: '2024-03-09', earnings: 228 },
    { date: '2024-03-10', earnings: 235 },
    { date: '2024-03-11', earnings: 242 },
    { date: '2024-03-12', earnings: 238 },
    { date: '2024-03-13', earnings: 245 },
    { date: '2024-03-14', earnings: 252 },
    { date: '2024-03-15', earnings: 248 },
    { date: '2024-03-16', earnings: 255 },
    { date: '2024-03-17', earnings: 262 },
    { date: '2024-03-18', earnings: 258 },
    { date: '2024-03-19', earnings: 265 },
    { date: '2024-03-20', earnings: 272 },
    { date: '2024-03-21', earnings: 268 },
    { date: '2024-03-22', earnings: 275 },
    { date: '2024-03-23', earnings: 282 },
    { date: '2024-03-24', earnings: 278 },
    { date: '2024-03-25', earnings: 285 },
    { date: '2024-03-26', earnings: 292 },
    { date: '2024-03-27', earnings: 288 },
    { date: '2024-03-28', earnings: 295 },
    { date: '2024-03-29', earnings: 302 },
    { date: '2024-03-30', earnings: 298 },
    { date: '2024-03-31', earnings: 305 },

    // Continue with realistic progression through 2024...
    // April 2024
    { date: '2024-04-01', earnings: 312 },
    { date: '2024-04-02', earnings: 318 },
    { date: '2024-04-03', earnings: 325 },
    { date: '2024-04-04', earnings: 332 },
    { date: '2024-04-05', earnings: 338 },
    { date: '2024-04-06', earnings: 345 },
    { date: '2024-04-07', earnings: 352 },
    { date: '2024-04-08', earnings: 358 },
    { date: '2024-04-09', earnings: 365 },
    { date: '2024-04-10', earnings: 372 },
    { date: '2024-04-11', earnings: 378 },
    { date: '2024-04-12', earnings: 385 },
    { date: '2024-04-13', earnings: 392 },
    { date: '2024-04-14', earnings: 398 },
    { date: '2024-04-15', earnings: 405 },
    { date: '2024-04-16', earnings: 412 },
    { date: '2024-04-17', earnings: 418 },
    { date: '2024-04-18', earnings: 425 },
    { date: '2024-04-19', earnings: 432 },
    { date: '2024-04-20', earnings: 438 },
    { date: '2024-04-21', earnings: 445 },
    { date: '2024-04-22', earnings: 452 },
    { date: '2024-04-23', earnings: 458 },
    { date: '2024-04-24', earnings: 465 },
    { date: '2024-04-25', earnings: 472 },
    { date: '2024-04-26', earnings: 478 },
    { date: '2024-04-27', earnings: 485 },
    { date: '2024-04-28', earnings: 492 },
    { date: '2024-04-29', earnings: 498 },
    { date: '2024-04-30', earnings: 505 },

    // May 2024 - More growth
    { date: '2024-05-01', earnings: 512 },
    { date: '2024-05-02', earnings: 518 },
    { date: '2024-05-03', earnings: 525 },
    { date: '2024-05-04', earnings: 532 },
    { date: '2024-05-05', earnings: 538 },
    { date: '2024-05-06', earnings: 545 },
    { date: '2024-05-07', earnings: 552 },
    { date: '2024-05-08', earnings: 558 },
    { date: '2024-05-09', earnings: 565 },
    { date: '2024-05-10', earnings: 572 },
    { date: '2024-05-11', earnings: 578 },
    { date: '2024-05-12', earnings: 585 },
    { date: '2024-05-13', earnings: 592 },
    { date: '2024-05-14', earnings: 598 },
    { date: '2024-05-15', earnings: 605 },
    { date: '2024-05-16', earnings: 612 },
    { date: '2024-05-17', earnings: 618 },
    { date: '2024-05-18', earnings: 625 },
    { date: '2024-05-19', earnings: 632 },
    { date: '2024-05-20', earnings: 638 },
    { date: '2024-05-21', earnings: 645 },
    { date: '2024-05-22', earnings: 652 },
    { date: '2024-05-23', earnings: 658 },
    { date: '2024-05-24', earnings: 665 },
    { date: '2024-05-25', earnings: 672 },
    { date: '2024-05-26', earnings: 678 },
    { date: '2024-05-27', earnings: 685 },
    { date: '2024-05-28', earnings: 692 },
    { date: '2024-05-29', earnings: 698 },
    { date: '2024-05-30', earnings: 705 },
    { date: '2024-05-31', earnings: 712 },

    // June 2024 - Continued growth
    { date: '2024-06-01', earnings: 718 },
    { date: '2024-06-02', earnings: 725 },
    { date: '2024-06-03', earnings: 732 },
    { date: '2024-06-04', earnings: 738 },
    { date: '2024-06-05', earnings: 745 },
    { date: '2024-06-06', earnings: 752 },
    { date: '2024-06-07', earnings: 758 },
    { date: '2024-06-08', earnings: 765 },
    { date: '2024-06-09', earnings: 772 },
    { date: '2024-06-10', earnings: 778 },
    { date: '2024-06-11', earnings: 785 },
    { date: '2024-06-12', earnings: 792 },
    { date: '2024-06-13', earnings: 798 },
    { date: '2024-06-14', earnings: 805 },
    { date: '2024-06-15', earnings: 812 },
    { date: '2024-06-16', earnings: 818 },
    { date: '2024-06-17', earnings: 825 },
    { date: '2024-06-18', earnings: 832 },
    { date: '2024-06-19', earnings: 838 },
    { date: '2024-06-20', earnings: 845 },
    { date: '2024-06-21', earnings: 852 },
    { date: '2024-06-22', earnings: 858 },
    { date: '2024-06-23', earnings: 865 },
    { date: '2024-06-24', earnings: 872 },
    { date: '2024-06-25', earnings: 878 },
    { date: '2024-06-26', earnings: 885 },
    { date: '2024-06-27', earnings: 892 },
    { date: '2024-06-28', earnings: 898 },
    { date: '2024-06-29', earnings: 905 },
    { date: '2024-06-30', earnings: 912 },

    // July 2024 - More growth
    { date: '2024-07-01', earnings: 918 },
    { date: '2024-07-02', earnings: 925 },
    { date: '2024-07-03', earnings: 932 },
    { date: '2024-07-04', earnings: 938 },
    { date: '2024-07-05', earnings: 945 },
    { date: '2024-07-06', earnings: 952 },
    { date: '2024-07-07', earnings: 958 },
    { date: '2024-07-08', earnings: 965 },
    { date: '2024-07-09', earnings: 972 },
    { date: '2024-07-10', earnings: 978 },
    { date: '2024-07-11', earnings: 985 },
    { date: '2024-07-12', earnings: 992 },
    { date: '2024-07-13', earnings: 998 },
    { date: '2024-07-14', earnings: 1005 },
    { date: '2024-07-15', earnings: 1012 },
    { date: '2024-07-16', earnings: 1018 },
    { date: '2024-07-17', earnings: 1025 },
    { date: '2024-07-18', earnings: 1032 },
    { date: '2024-07-19', earnings: 1038 },
    { date: '2024-07-20', earnings: 1045 },
    { date: '2024-07-21', earnings: 1052 },
    { date: '2024-07-22', earnings: 1058 },
    { date: '2024-07-23', earnings: 1065 },
    { date: '2024-07-24', earnings: 1072 },
    { date: '2024-07-25', earnings: 1078 },
    { date: '2024-07-26', earnings: 1085 },
    { date: '2024-07-27', earnings: 1092 },
    { date: '2024-07-28', earnings: 1098 },
    { date: '2024-07-29', earnings: 1105 },
    { date: '2024-07-30', earnings: 1112 },
    { date: '2024-07-31', earnings: 1118 },

    // August 2024 - Continued growth
    { date: '2024-08-01', earnings: 1125 },
    { date: '2024-08-02', earnings: 1132 },
    { date: '2024-08-03', earnings: 1138 },
    { date: '2024-08-04', earnings: 1145 },
    { date: '2024-08-05', earnings: 1152 },
    { date: '2024-08-06', earnings: 1158 },
    { date: '2024-08-07', earnings: 1165 },
    { date: '2024-08-08', earnings: 1172 },
    { date: '2024-08-09', earnings: 1178 },
    { date: '2024-08-10', earnings: 1185 },
    { date: '2024-08-11', earnings: 1192 },
    { date: '2024-08-12', earnings: 1198 },
    { date: '2024-08-13', earnings: 1205 },
    { date: '2024-08-14', earnings: 1212 },
    { date: '2024-08-15', earnings: 1218 },
    { date: '2024-08-16', earnings: 1225 },
    { date: '2024-08-17', earnings: 1232 },
    { date: '2024-08-18', earnings: 1238 },
    { date: '2024-08-19', earnings: 1245 },
    { date: '2024-08-20', earnings: 1252 },
    { date: '2024-08-21', earnings: 1258 },
    { date: '2024-08-22', earnings: 1265 },
    { date: '2024-08-23', earnings: 1272 },
    { date: '2024-08-24', earnings: 1278 },
    { date: '2024-08-25', earnings: 1285 },
    { date: '2024-08-26', earnings: 1292 },
    { date: '2024-08-27', earnings: 1298 },
    { date: '2024-08-28', earnings: 1305 },
    { date: '2024-08-29', earnings: 1312 },
    { date: '2024-08-30', earnings: 1318 },
    { date: '2024-08-31', earnings: 1325 },

    // September 2024 - More growth
    { date: '2024-09-01', earnings: 1332 },
    { date: '2024-09-02', earnings: 1338 },
    { date: '2024-09-03', earnings: 1345 },
    { date: '2024-09-04', earnings: 1352 },
    { date: '2024-09-05', earnings: 1358 },
    { date: '2024-09-06', earnings: 1365 },
    { date: '2024-09-07', earnings: 1372 },
    { date: '2024-09-08', earnings: 1378 },
    { date: '2024-09-09', earnings: 1385 },
    { date: '2024-09-10', earnings: 1392 },
    { date: '2024-09-11', earnings: 1398 },
    { date: '2024-09-12', earnings: 1405 },
    { date: '2024-09-13', earnings: 1412 },
    { date: '2024-09-14', earnings: 1418 },
    { date: '2024-09-15', earnings: 1425 },
    { date: '2024-09-16', earnings: 1432 },
    { date: '2024-09-17', earnings: 1438 },
    { date: '2024-09-18', earnings: 1445 },
    { date: '2024-09-19', earnings: 1452 },
    { date: '2024-09-20', earnings: 1458 },
    { date: '2024-09-21', earnings: 1465 },
    { date: '2024-09-22', earnings: 1472 },
    { date: '2024-09-23', earnings: 1478 },
    { date: '2024-09-24', earnings: 1485 },
    { date: '2024-09-25', earnings: 1492 },
    { date: '2024-09-26', earnings: 1498 },
    { date: '2024-09-27', earnings: 1505 },
    { date: '2024-09-28', earnings: 1512 },
    { date: '2024-09-29', earnings: 1518 },
    { date: '2024-09-30', earnings: 1525 },

    // October 2024 - Continued growth
    { date: '2024-10-01', earnings: 1532 },
    { date: '2024-10-02', earnings: 1538 },
    { date: '2024-10-03', earnings: 1545 },
    { date: '2024-10-04', earnings: 1552 },
    { date: '2024-10-05', earnings: 1558 },
    { date: '2024-10-06', earnings: 1565 },
    { date: '2024-10-07', earnings: 1572 },
    { date: '2024-10-08', earnings: 1578 },
    { date: '2024-10-09', earnings: 1585 },
    { date: '2024-10-10', earnings: 1592 },
    { date: '2024-10-11', earnings: 1598 },
    { date: '2024-10-12', earnings: 1605 },
    { date: '2024-10-13', earnings: 1612 },
    { date: '2024-10-14', earnings: 1618 },
    { date: '2024-10-15', earnings: 1625 },
    { date: '2024-10-16', earnings: 1632 },
    { date: '2024-10-17', earnings: 1638 },
    { date: '2024-10-18', earnings: 1645 },
    { date: '2024-10-19', earnings: 1652 },
    { date: '2024-10-20', earnings: 1658 },
    { date: '2024-10-21', earnings: 1665 },
    { date: '2024-10-22', earnings: 1672 },
    { date: '2024-10-23', earnings: 1678 },
    { date: '2024-10-24', earnings: 1685 },
    { date: '2024-10-25', earnings: 1692 },
    { date: '2024-10-26', earnings: 1698 },
    { date: '2024-10-27', earnings: 1705 },
    { date: '2024-10-28', earnings: 1712 },
    { date: '2024-10-29', earnings: 1718 },
    { date: '2024-10-30', earnings: 1725 },
    { date: '2024-10-31', earnings: 1732 },

    // November 2024 - More growth
    { date: '2024-11-01', earnings: 1738 },
    { date: '2024-11-02', earnings: 1745 },
    { date: '2024-11-03', earnings: 1752 },
    { date: '2024-11-04', earnings: 1758 },
    { date: '2024-11-05', earnings: 1765 },
    { date: '2024-11-06', earnings: 1772 },
    { date: '2024-11-07', earnings: 1778 },
    { date: '2024-11-08', earnings: 1785 },
    { date: '2024-11-09', earnings: 1792 },
    { date: '2024-11-10', earnings: 1798 },
    { date: '2024-11-11', earnings: 1805 },
    { date: '2024-11-12', earnings: 1812 },
    { date: '2024-11-13', earnings: 1818 },
    { date: '2024-11-14', earnings: 1825 },
    { date: '2024-11-15', earnings: 1832 },
    { date: '2024-11-16', earnings: 1838 },
    { date: '2024-11-17', earnings: 1845 },
    { date: '2024-11-18', earnings: 1852 },
    { date: '2024-11-19', earnings: 1858 },
    { date: '2024-11-20', earnings: 1865 },
    { date: '2024-11-21', earnings: 1872 },
    { date: '2024-11-22', earnings: 1878 },
    { date: '2024-11-23', earnings: 1885 },
    { date: '2024-11-24', earnings: 1892 },
    { date: '2024-11-25', earnings: 1898 },
    { date: '2024-11-26', earnings: 1905 },
    { date: '2024-11-27', earnings: 1912 },
    { date: '2024-11-28', earnings: 1918 },
    { date: '2024-11-29', earnings: 1925 },
    { date: '2024-11-30', earnings: 1932 },

    // December 2024 - Continued growth
    { date: '2024-12-01', earnings: 1938 },
    { date: '2024-12-02', earnings: 1945 },
    { date: '2024-12-03', earnings: 1952 },
    { date: '2024-12-04', earnings: 1958 },
    { date: '2024-12-05', earnings: 1965 },
    { date: '2024-12-06', earnings: 1972 },
    { date: '2024-12-07', earnings: 1978 },
    { date: '2024-12-08', earnings: 1985 },
    { date: '2024-12-09', earnings: 1992 },
    { date: '2024-12-10', earnings: 1998 },
    { date: '2024-12-11', earnings: 2005 },
    { date: '2024-12-12', earnings: 2012 },
    { date: '2024-12-13', earnings: 2018 },
    { date: '2024-12-14', earnings: 2025 },
    { date: '2024-12-15', earnings: 2032 },
    { date: '2024-12-16', earnings: 2038 },
    { date: '2024-12-17', earnings: 2045 },
    { date: '2024-12-18', earnings: 2052 },
    { date: '2024-12-19', earnings: 2058 },
    { date: '2024-12-20', earnings: 2065 },
    { date: '2024-12-21', earnings: 2072 },
    { date: '2024-12-22', earnings: 2078 },
    { date: '2024-12-23', earnings: 2085 },
    { date: '2024-12-24', earnings: 2092 },
    { date: '2024-12-25', earnings: 2098 },
    { date: '2024-12-26', earnings: 2105 },
    { date: '2024-12-27', earnings: 2112 },
    { date: '2024-12-28', earnings: 2118 },
    { date: '2024-12-29', earnings: 2125 },
    { date: '2024-12-30', earnings: 2132 },
    { date: '2024-12-31', earnings: 2138 },

    // January 2025 - Current month, continued growth
    { date: '2025-01-01', earnings: 2145 },
    { date: '2025-01-02', earnings: 2152 },
    { date: '2025-01-03', earnings: 2158 },
    { date: '2025-01-04', earnings: 2165 },
    { date: '2025-01-05', earnings: 2172 },
    { date: '2025-01-06', earnings: 2178 },
    { date: '2025-01-07', earnings: 2185 },
    { date: '2025-01-08', earnings: 2192 },
    { date: '2025-01-09', earnings: 2198 },
    { date: '2025-01-10', earnings: 2205 },
    { date: '2025-01-11', earnings: 2212 },
    { date: '2025-01-12', earnings: 2218 },
    { date: '2025-01-13', earnings: 2225 },
    { date: '2025-01-14', earnings: 2232 },
    { date: '2025-01-15', earnings: 2238 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          background: 'linear-gradient(145deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)',
          color: 'rgb(21, 128, 61)',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        };
      case 'pending':
        return {
          background: 'linear-gradient(145deg, rgb(254, 243, 199) 0%, rgb(253, 230, 138) 100%)',
          color: 'rgb(161, 98, 7)',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        };
      case 'rejected':
        return {
          background: 'linear-gradient(145deg, rgb(254, 226, 226) 0%, rgb(252, 232, 232) 100%)',
          color: 'rgb(185, 28, 28)',
          border: '1px solid rgba(239, 68, 68, 0.3)'
        };
      default:
        return {
          background: 'linear-gradient(145deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)',
          color: 'rgb(37, 99, 235)',
          border: '1px solid rgba(59, 130, 246, 0.3)'
        };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  const formatViews = (views: number) => {
    if (views < 10000) {
      return views.toLocaleString();
    } else if (views < 1000000) {
      const thousands = views / 1000;
      return thousands >= 100 ? `${Math.round(thousands)}K` : `${thousands.toFixed(1)}K`;
    } else {
      const millions = views / 1000000;
      return millions >= 10 ? `${Math.round(millions)}M` : `${millions.toFixed(1)}M`;
    }
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
  };

  // Helper function for better date formatting on X-axis
  const formatDateLabel = (dateString: string, timeFilter: string) => {
    const date = new Date(dateString);
    
    switch (timeFilter) {
      case '7d':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case '28d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '60d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '1y':
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Helper function for Y-axis label formatting
  const formatEarningsLabel = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  // Filter and sort logic
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.videoUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.campaign.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      case 'views':
        return b.views - a.views;
      case 'earnings':
        return b.earnings - a.earnings;
      default:
        return 0;
    }
  });

  // Filter earnings data based on time filter
  const getFilteredEarningsData = () => {
    switch (timeFilter) {
      case '7d':
        // Return last 7 days of data (Jan 9-15, 2025)
        return earningsData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= new Date('2025-01-09') && itemDate <= new Date('2025-01-15');
        });
      case '28d':
        // Return last 28 days of data (Dec 18, 2024 - Jan 15, 2025)
        return earningsData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= new Date('2024-12-18') && itemDate <= new Date('2025-01-15');
        });
      case '60d':
        // Return last 60 days of data (Nov 16, 2024 - Jan 15, 2025)
        return earningsData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= new Date('2024-11-16') && itemDate <= new Date('2025-01-15');
        });
      case '1y':
        // Return monthly data points for the full year (Jan 1, 2024 - Jan 15, 2025)
        return earningsData.filter(item => {
          const itemDate = new Date(item.date);
          // Get the 1st of each month for cleaner monthly view
          return itemDate.getDate() === 1 && itemDate >= new Date('2024-01-01') && itemDate <= new Date('2025-01-01');
        });
      default:
        return earningsData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= new Date('2025-01-09') && itemDate <= new Date('2025-01-15');
        });
    }
  };

  const filteredEarningsData = getFilteredEarningsData();
  const totalEarnings = filteredEarningsData.reduce((sum, item) => sum + item.earnings, 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl" style={{
          background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
          border: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-gray-600">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#dde2ee' }}>
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="black"/>
                <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm text-gray-600">Clipper dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="mailto:help@viewmark.co"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Help
              </a>
              <button className="sign-out-button">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Welcome back, {clipper.name}</h1>
              <p className="text-sm text-gray-600">Track your video performance and earnings</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="/platform/clipper/submit"
                className="new-campaign-button"
              >
                Submit New Video
              </a>
              <button className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                  color: 'rgb(107, 114, 128)',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                  border: '1px solid rgba(0, 0, 0, 0.1)'
                }}
              >
                Request Payout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-sm p-6 border border-white/20" style={{
            borderRadius: '1.5rem',
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">${clipper.totalEarnings.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Earnings</div>
          </div>

          <div className="backdrop-blur-sm p-6 border border-white/20" style={{
            borderRadius: '1.5rem',
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">{clipper.totalVideos}</div>
            <div className="text-sm text-gray-600">Total Videos</div>
          </div>

          <div className="backdrop-blur-sm p-6 border border-white/20" style={{
            borderRadius: '1.5rem',
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">{clipper.activeVideos}</div>
            <div className="text-sm text-gray-600">Active Videos</div>
          </div>

          <div className="backdrop-blur-sm p-6 border border-white/20" style={{
            borderRadius: '1.5rem',
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div className="text-2xl font-semibold text-gray-900 mb-1">${clipper.averageRPM}</div>
            <div className="text-sm text-gray-600">Avg. RPM</div>
          </div>
        </div>

        {/* Earnings Graph */}
        <div className="mb-8">
          <div className="backdrop-blur-sm p-6 border border-white/20 rounded-2xl" style={{
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Earnings Overview</h3>
                <p className="text-sm text-gray-600">Track your earnings over time</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">${totalEarnings.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
            </div>

            {/* Time Filter Buttons */}
            <div className="flex space-x-2 mb-6">
              {[
                { key: '7d', label: '7 Days' },
                { key: '28d', label: '28 Days' },
                { key: '60d', label: '60 Days' },
                { key: '1y', label: '1 Year' },
                { key: 'all', label: 'All Time' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setTimeFilter(filter.key)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    timeFilter === filter.key ? 'text-blue-600' : 'text-gray-600'
                  }`}
                  style={{
                    background: timeFilter === filter.key 
                      ? 'linear-gradient(145deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)'
                      : 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Chart */}
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredEarningsData}>
                  <defs>
                    <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(37, 99, 235)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="rgb(37, 99, 235)" stopOpacity={0.1}/>
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="2 4" 
                    stroke="rgba(0, 0, 0, 0.08)" 
                    strokeWidth={1}
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => formatDateLabel(value, timeFilter)}
                    tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.6)' }}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 20, right: 20 }}
                    dy={8}
                  />
                  <YAxis 
                    tickFormatter={formatEarningsLabel}
                    tick={{ fontSize: 11, fill: 'rgba(0, 0, 0, 0.6)' }}
                    tickLine={false}
                    axisLine={false}
                    dx={-8}
                    domain={[0, 'dataMax + 100']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="natural"
                    dataKey="earnings" 
                    stroke="url(#earningsGradient)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dot={false}
                    activeDot={{
                      r: 5,
                      stroke: 'rgb(37, 99, 235)',
                      strokeWidth: 2,
                      fill: 'white'
                    }}
                    filter="url(#glow)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>



        {/* Video Submissions Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Your Video Submissions</h2>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search videos or campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
                  style={{
                    background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '1rem'
                  }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="relative" ref={statusDropdownRef}>
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                style={{
                  background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '1rem',
                  minWidth: '140px'
                }}
              >
                <span>{statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                <svg className={`h-4 w-4 ml-2 transition-transform duration-200 ${isStatusDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isStatusDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full z-10 overflow-hidden" style={{
                  background: 'linear-gradient(145deg, rgb(255, 255, 255) 0%, rgb(248, 250, 252) 100%)',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '1rem'
                }}>
                  {['all', 'approved', 'pending', 'rejected'].map((status, index) => (
                    <div key={status}>
                      <button
                        onClick={() => {
                          setStatusFilter(status);
                          setIsStatusDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 hover:bg-gray-100 ${
                          statusFilter === status ? 'text-gray-900 bg-gray-100' : 'text-gray-700'
                        }`}
                      >
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                      {index < 3 && (
                        <div className="h-px mx-4" style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.08) 50%, transparent 100%)',
                          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
                        }}></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sort Filter */}
            <div className="relative" ref={sortDropdownRef}>
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                style={{
                  background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '1rem',
                  minWidth: '160px'
                }}
              >
                <span>
                  {sortBy === 'date' && 'Date (Newest)'}
                  {sortBy === 'views' && 'Views (High to Low)'}
                  {sortBy === 'earnings' && 'Earnings (High to Low)'}
                </span>
                <svg className={`h-4 w-4 ml-2 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isSortDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full z-10 overflow-hidden" style={{
                  background: 'linear-gradient(145deg, rgb(255, 255, 255) 0%, rgb(248, 250, 252) 100%)',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.75rem'
                }}>
                  {[
                    { value: 'date', label: 'Date (Newest)' },
                    { value: 'views', label: 'Views (High to Low)' },
                    { value: 'earnings', label: 'Earnings (High to Low)' }
                  ].map((option, index) => (
                    <div key={option.value}>
                      <button
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150 hover:bg-gray-100 ${
                          sortBy === option.value ? 'text-gray-900 bg-gray-100' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                      {index < 2 && (
                        <div className="h-px mx-4" style={{
                          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.08) 50%, transparent 100%)',
                          boxShadow: '0px 1px 0px 0px rgba(255, 255, 255, 0.3)'
                        }}></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-600 flex items-center">
            <span>
              Showing <span className="font-semibold text-gray-900">{sortedSubmissions.length}</span> of <span className="font-semibold text-gray-900">{submissions.length}</span> submissions
            </span>
          </div>
          <div className="text-sm text-gray-600">
            Updated just now
          </div>
        </div>

        {/* Video Submissions */}
        <div className="mb-8">

          <div className="backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden" style={{
            background: 'linear-gradient(145deg, rgb(248, 250, 252) 0%, rgb(241, 245, 249) 100%)',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px -1px 0px 0px inset, rgba(255, 255, 255, 0.9) 0px 1px 0px 0px inset',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            {/* Table Header */}
            <div className="px-6 py-5 border-b border-gray-200" style={{
              background: 'linear-gradient(145deg, rgb(245, 247, 250) 0%, rgb(250, 252, 255) 100%)',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 0px 0px inset'
            }}>
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                <div className="col-span-4">Video</div>
                <div className="col-span-2">Platform</div>
                <div className="col-span-2">Views</div>
                <div className="col-span-2">Earnings</div>
                <div className="col-span-2">Status</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {sortedSubmissions.map((submission) => (
                <div 
                  key={submission.id}
                  className="px-6 py-5 hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer"
                  onClick={() => window.open(submission.videoUrl, '_blank', 'noopener,noreferrer')}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Video URL */}
                    <div className="col-span-4">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {submission.videoUrl}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {submission.campaign}
                      </div>
                    </div>

                    {/* Platform */}
                    <div className="col-span-2">
                      <span className="text-sm font-medium text-gray-700">
                        {submission.platform}
                      </span>
                    </div>

                    {/* Views */}
                    <div className="col-span-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatViews(submission.views)}
                      </span>
                    </div>

                    {/* Earnings */}
                    <div className="col-span-2">
                      <span className="text-sm font-semibold text-gray-900">
                        ${submission.earnings.toFixed(2)}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-lg" style={getStatusColor(submission.status)}>
                        {getStatusText(submission.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {sortedSubmissions.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? "No submissions match your search criteria."
                    : "You haven't submitted any videos yet."
                  }
                </p>
                <a
                  href="/platform/clipper/submit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all duration-200 rounded-xl"
                  style={{
                    background: 'linear-gradient(145deg, rgb(23, 25, 28) 0%, rgb(29, 32, 32) 100%)',
                    boxShadow: 'rgba(0, 0, 0, 0.5) 0px -4px 0px 0px inset, rgba(255, 255, 255, 0.2) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.25) 0px 3px 6px 0px',
                    border: '1px solid rgba(0, 0, 0, 0.5)'
                  }}
                >
                  Submit your first video
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            {/* Copyright */}
            <div className="copyright">
              © 2025 VIEWMARK. ALL RIGHTS RESERVED.
            </div>
            
            {/* Social media icons */}
            <div className="social-links">
              {/* X (Twitter) icon */}
              <a 
                href="https://x.com/viewmarkco" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Follow us on X (Twitter)"
              >
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.4033 0.5H18.2852L11.989 7.701L19.396 17.5H13.5964L9.054 11.557L3.85637 17.5H0.972692L7.70709 9.7977L0.601562 0.5H6.54839L10.6544 5.93215L15.4033 0.5ZM14.3918 15.7738H15.9887L5.68067 2.13549H3.96702L14.3918 15.7738Z" fill="currentColor"/>
                </svg>
              </a>
              
              {/* Instagram icon */}
              <a 
                href="https://instagram.com/viewmark.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Follow us on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2.21173C12.5365 2.21173 12.837 2.22123 13.8389 2.267C14.4411 2.27427 15.0377 2.38499 15.6024 2.59432C16.0151 2.74662 16.3884 2.9895 16.6949 3.30509C17.0105 3.61156 17.2534 3.98488 17.4057 4.39759C17.615 4.96235 17.7257 5.55888 17.733 6.16114C17.7788 7.16295 17.7883 7.4635 17.7883 10C17.7883 12.5365 17.7788 12.837 17.733 13.8389C17.7257 14.4411 17.615 15.0377 17.4057 15.6024C17.2476 16.0122 17.0055 16.3844 16.6949 16.6949C16.3844 17.0055 16.0122 17.2476 15.6024 17.4057C15.0377 17.615 14.4411 17.7257 13.8389 17.733C12.837 17.7788 12.5365 17.7883 10 17.7883C7.4635 17.7883 7.16295 17.7788 6.16114 17.733C5.55859 17.7258 4.96176 17.6151 4.39673 17.4057C3.98433 17.2533 3.61132 17.0104 3.30509 16.6949C2.9895 16.3884 2.74662 16.0151 2.59432 15.6024C2.38499 15.0377 2.27427 14.4411 2.267 13.8389C2.22123 12.837 2.21173 12.5365 2.21173 10C2.21173 7.4635 2.22123 7.16295 2.267 6.16114C2.27427 5.55888 2.38499 4.96235 2.59432 4.39759C2.74662 3.98488 2.9895 3.61156 3.30509 3.30509C3.61156 2.9895 3.98488 2.74662 4.39759 2.59432C4.96235 2.38499 5.55888 2.27427 6.16114 2.267C7.16295 2.22123 7.4635 2.21173 10 2.21173ZM10 0.5C7.42032 0.5 7.09645 0.51123 6.08341 0.557C5.29535 0.57272 4.51567 0.72194 3.7775 0.99832C3.1433 1.2371 2.56886 1.61141 2.09427 2.09514C1.61096 2.56956 1.23695 3.14369 0.99832 3.7775C0.72224 4.51572 0.57331 5.2954 0.55786 6.08341C0.51036 7.09645 0.5 7.42032 0.5 10C0.5 12.5797 0.51123 12.9035 0.557 13.9166C0.57272 14.7046 0.72194 15.4843 0.99832 16.2225C1.2371 16.8567 1.61141 17.4311 2.09514 17.9057C2.56956 18.389 3.14369 18.763 3.7775 19.0017C4.51572 19.2778 5.2954 19.4267 6.08341 19.4421C7.09645 19.4896 7.42032 19.5 10 19.5C12.5797 19.5 12.9035 19.4888 13.9166 19.443C14.7046 19.4273 15.4843 19.2781 16.2225 19.0017C16.8538 18.7576 17.4271 18.3843 17.9057 17.9057C18.3843 17.4271 18.7576 16.8538 19.0017 16.2225C19.2778 15.4843 19.4267 14.7046 19.4421 13.9166C19.4896 12.9035 19.5 12.5797 19.5 10C19.5 7.42032 19.4888 7.09645 19.443 6.08341C19.4273 5.29535 19.2781 4.51567 19.0017 3.7775C18.7629 3.1433 18.3886 2.56886 17.9049 2.09427C17.4304 1.61096 16.8563 1.23695 16.2225 0.99832C15.4843 0.72224 14.7046 0.57331 13.9166 0.55786C12.9035 0.51036 12.5797 0.5 10 0.5ZM10 5.12132C9.0351 5.12132 8.0918 5.40745 7.28955 5.94352C6.48725 6.4796 5.86194 7.24155 5.49269 8.133C5.12343 9.0245 5.02682 10.0054 5.21506 10.9518C5.40331 11.8982 5.86796 12.7675 6.55025 13.4497C7.23255 14.132 8.1018 14.5967 9.0482 14.7849C9.9946 14.9732 10.9755 14.8766 11.867 14.5073C12.7585 14.1381 13.5204 13.5127 14.0565 12.7105C14.5926 11.9082 14.8787 10.9649 14.8787 10C14.8787 8.7061 14.3647 7.46518 13.4497 6.55025C12.5348 5.63532 11.2939 5.12132 10 5.12132ZM10 13.167C9.3736 13.167 8.7613 12.9812 8.2405 12.6332C7.71973 12.2852 7.31382 11.7906 7.07412 11.2119C6.83442 10.6333 6.7717 9.9965 6.8939 9.3822C7.0161 8.7678 7.31772 8.2035 7.76063 7.76063C8.2035 7.31772 8.7678 7.0161 9.3822 6.8939C9.9965 6.7717 10.6333 6.83442 11.2119 7.07412C11.7906 7.31382 12.2852 7.71973 12.6332 8.2405C12.9812 8.7613 13.167 9.3736 13.167 10C13.167 10.8399 12.8333 11.6455 12.2394 12.2394C11.6455 12.8333 10.8399 13.167 10 13.167ZM15.0713 3.78873C14.8458 3.78873 14.6254 3.85559 14.4379 3.98085C14.2505 4.10612 14.1043 4.28416 14.0181 4.49247C13.9318 4.70078 13.9092 4.92999 13.9532 5.15113C13.9972 5.37227 14.1057 5.5754 14.2652 5.73483C14.4246 5.89426 14.6277 6.00284 14.8489 6.04682C15.07 6.09081 15.2992 6.06823 15.5075 5.98195C15.7158 5.89567 15.8939 5.74955 16.0191 5.56208C16.1444 5.37461 16.2113 5.1542 16.2113 4.92873C16.2113 4.62638 16.0912 4.33642 15.8774 4.12263C15.6636 3.90883 15.3736 3.78873 15.0713 3.78873Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

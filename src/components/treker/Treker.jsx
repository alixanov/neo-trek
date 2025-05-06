import React, { useState, useLayoutEffect, useMemo, useEffect, useRef } from 'react';
import { Search, X, User, Calendar, ArrowLeft } from 'lucide-react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import users from '../data/user';
import XIcon from '@mui/icons-material/X';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TrekerContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #1e1b4b, #4c1d95);
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden;
  @media (min-width: 640px) {
    padding: 3rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E") center center;
    opacity: 0.15;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #8b5cf6, #ff0080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  @media (min-width: 640px) {
    font-size: 3rem;
  }
  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 4rem 1rem 3rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  &:focus {
    border-color: #ec4899;
    box-shadow: 0 0 8px rgba(236, 72, 153, 0.4);
  }
  &::placeholder {
    color: #94a3b8;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #facc15;
  }
`;

const TwitterLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  color: #94a3b8;
  transition: all 0.3s ease;
  &:hover {
    color: #facc15;
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const UserCard = styled.div`
  position: relative;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3), 0 0 20px rgba(236, 72, 153, 0.2);
    border-color: #ec4899;
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.2), transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  &:hover:before {
    opacity: 1;
  }
`;

const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  transition: transform 0.3s ease;
  ${UserCard}:hover & {
    transform: scale(1.1);
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Username = styled.h3`
  color: #ffffff;
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0;
  transition: color 0.3s ease;
  ${UserCard}:hover & {
    color: #facc15;
  }
`;

const DisplayName = styled.p`
  color: #d1d5db;
  font-size: 0.95rem;
  margin: 0;
`;

const Bio = styled.p`
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
  max-height: 2.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Followers = styled.p`
  color: #ec4899;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
`;

const CreatedAt = styled.p`
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 36rem;
  max-height: 95vh;
  overflow-y: auto;
  background: linear-gradient(135deg, rgba(30, 34, 53, 0.95), rgba(18, 20, 32, 0.95));
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(139, 92, 246, 0.3);
  padding: 0;
  position: relative;
  transform: scale(0.85);
  transition: transform 0.4s ease;
  backdrop-filter: blur(12px);
  .active & {
    transform: scale(1);
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.6);
    border-radius: 5px;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  height: 12rem;
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
  border-radius: 2rem 2rem 0 0;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E") center center;
    opacity: 0.3;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: #ffffff;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    transform: scale(1.1);
  }
`;

const ProfileAvatar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #12151f;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
`;

const ProfileAvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileContent = styled.div`
  padding: 5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileName = styled.div`
  text-align: center;
`;

const ProfileDisplayName = styled.h2`
  color: #ffffff;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
`;

const ProfileUsername = styled.p`
  color: #ec4899;
  font-size: 1.1rem;
  margin: 0;
`;

const ProfileFollowers = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #facc15;
  font-weight: 600;
`;

const ProfileBio = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.25rem;
`;

const ProfileBioTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  margin: 0 0 0.75rem;
`;

const ProfileBioText = styled.p`
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
`;

const ProfileDate = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ProfileDateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
`;

const ProfileDateText = styled.p`
  color: #d1d5db;
  font-size: 0.9rem;
  margin: 0;
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const ChartTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: 1rem;
  margin: 0 0 1rem;
`;

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date)) throw new Error('Invalid date');
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'Unknown';
  }
};

const Treker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const modalRef = useRef(null);
  const containerRef = useRef(null);
  const chartRef = useRef(null);

  // Gradient backgrounds for scroll effect
  const gradients = [
    'linear-gradient(135deg, #1e1b4b, #571d95)',
    'linear-gradient(135deg, #2a2a72, #2f1752)',
    'linear-gradient(135deg, #1b1849, #6a1950)',
  ];

  // Set initial background immediately on mount
  useLayoutEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        background: gradients[0],
      });
    }
  }, []);

  // Handle background gradient change on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateBackground = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = docHeight > 0 ? scrollY / docHeight : 0;
      const index = Math.min(
        Math.floor(scrollFraction * (gradients.length - 1)) + 1,
        gradients.length - 1
      );
      gsap.to(container, {
        background: gradients[index],
        duration: 1,
        ease: 'sine.inOut',
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(updateBackground);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [gradients]);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearchTerm) return users;
    const lowerSearch = debouncedSearchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerSearch) ||
        user.displayName.toLowerCase().includes(lowerSearch)
    );
  }, [debouncedSearchTerm]);

  // Handle card animations with IntersectionObserver
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.user-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            gsap.fromTo(
              card,
              { opacity: 0 },
              { opacity: 1, duration: 0.5, ease: 'power2.inOut' }
            );
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, [filteredUsers]);

  // Animate chart when modal opens
  useLayoutEffect(() => {
    if (modalOpen && chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, [modalOpen]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useLayoutEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  useLayoutEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.classList.add('active');
    } else if (modalRef.current) {
      const handleTransitionEnd = () => {
        if (!modalOpen) {
          setSelectedUser(null);
        }
      };
      modalRef.current.classList.remove('active');
      modalRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true });
      return () => {
        if (modalRef.current) {
          modalRef.current.removeEventListener('transitionend', handleTransitionEnd);
        }
      };
    }
  }, [modalOpen]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Simulated engagement data for the chart
  const getChartData = (user) => {
    return {
      labels: ['Followers', 'Posts', 'Likes'],
      datasets: [
        {
          label: 'User Engagement',
          data: [
            user.followers,
            // Simulate posts (e.g., based on followers)
            Math.floor(user.followers * (Math.random() * 0.05 + 0.05)),
            // Simulate likes (e.g., based on followers)
            Math.floor(user.followers * (Math.random() * 0.2 + 0.1)),
          ],
          backgroundColor: ['rgba(139, 92, 246, 0.6)', 'rgba(236, 72, 153, 0.6)', 'rgba(250, 204, 21, 0.6)'],
          borderColor: ['#8b5cf6', '#ec4899', '#facc15'],
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 34, 53, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          callback: (value) => value.toLocaleString(),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <TrekerContainer ref={containerRef}>
      <ContentWrapper>
        <Header ref={headerRef}>Neo-Trek</Header>
        <SearchWrapper>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or username..."
            autoFocus
            aria-label="Search users"
            sx={{
              paddingLeft: "30px", // Отступ для иконки
              position: "relative",
            }}
          />
          <QueryStatsIcon
            sx={{
              color: "#c92ab4",
              fontSize: "22px",
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          {searchTerm && (
            <ClearButton onClick={clearSearch} aria-label="Clear search">
              <X size={20} />
            </ClearButton>
          )}
          <TwitterLink href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Go to X">
            <XIcon size={24} />
          </TwitterLink>
        </SearchWrapper>

        <UserGrid ref={gridRef}>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.username}
              className="user-card"
              onClick={() => handleCardClick(user)}
            >
              <UserContent>
                <AvatarWrapper>
                  <Avatar src={user.avatar || 'https://via.placeholder.com/72'} alt={`${user.displayName} avatar`} />
                </AvatarWrapper>
                <UserInfo>
                  <Username>{user.username}</Username>
                  <DisplayName>{user.displayName}</DisplayName>
                  <Bio>{user.bio}</Bio>
                  <Followers>{user.followers.toLocaleString()} followers</Followers>
                  <CreatedAt>Joined {formatDate(user.createdAt)}</CreatedAt>
                </UserInfo>
              </UserContent>
            </UserCard>
          ))}
        </UserGrid>
      </ContentWrapper>

      <ModalOverlay ref={modalRef} className={modalOpen ? 'active' : ''}>
        {selectedUser && (
          <ModalContent>
            <ModalHeader>
              <BackButton onClick={closeModal} aria-label="Close modal">
                <ArrowLeft size={20} />
              </BackButton>
              <ProfileAvatar>
                <ProfileAvatarImg
                  src={selectedUser.avatar || 'https://via.placeholder.com/96'}
                  alt={`${selectedUser.displayName} profile`}
                />
              </ProfileAvatar>
            </ModalHeader>
            <ProfileContent>
              <ProfileName>
                <ProfileDisplayName>{selectedUser.displayName}</ProfileDisplayName>
                <ProfileUsername>{selectedUser.username}</ProfileUsername>
              </ProfileName>
              <ProfileFollowers>{selectedUser.followers.toLocaleString()} followers</ProfileFollowers>
              <ProfileBio>
                <ProfileBioTitle>
                  <User size={16} /> Biography
                </ProfileBioTitle>
                <ProfileBioText>{selectedUser.bio}</ProfileBioText>
              </ProfileBio>
              <ProfileDate>
                <ProfileDateIcon>
                  <Calendar size={18} />
                </ProfileDateIcon>
                <ProfileDateText>Joined {formatDate(selectedUser.createdAt)}</ProfileDateText>
              </ProfileDate>
              <ChartContainer ref={chartRef} aria-label="User engagement chart">
                <ChartTitle>
                  <User size={16} /> Engagement Metrics
                </ChartTitle>
                <div style={{ height: '200px' }}>
                  <Bar data={getChartData(selectedUser)} options={chartOptions} />
                </div>
              </ChartContainer>
            </ProfileContent>
          </ModalContent>
        )}
      </ModalOverlay>
    </TrekerContainer>
  );
};

export default Treker;
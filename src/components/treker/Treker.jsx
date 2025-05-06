import React, { useState, useLayoutEffect, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, X, User, Calendar, ArrowLeft, EyeOff, Sun, Moon } from 'lucide-react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import users from '../data/user';
import XIcon from '@mui/icons-material/X';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Theme definitions
const themes = {
  light: {
    background: 'linear-gradient(135deg, #1e1b4b, #4c1d95)',
    text: '#ffffff',
    secondaryText: '#d1d5db',
    mutedText: '#94a3b8',
    accent: '#ec4899',
    highlight: '#facc15',
    cardBg: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
    modalBg: 'linear-gradient(135deg, rgba(30, 34, 53, 0.95), rgba(18, 20, 32, 0.95))',
    inputBg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.15)',
    optionBg: '#12151f',
  },
  dark: {
    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
    text: '#e2e8f0',
    secondaryText: '#cbd5e1',
    mutedText: '#64748b',
    accent: '#db2777',
    highlight: '#eab308',
    cardBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(219, 39, 119, 0.1))',
    modalBg: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))',
    inputBg: 'rgba(15, 23, 42, 0.3)',
    border: 'rgba(255, 255, 255, 0.1)',
    optionBg: '#1e293b',
  },
};

// Styled components
const TrekerContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 1rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-family: 'Montserrat', sans-serif;
  position: relative;
  overflow: hidden;
  transition: filter 0.3s ease, background 0.3s ease, color 0.3s ease;
  &.incognito {
    filter: brightness(0.7) contrast(0.9);
    background: linear-gradient(135deg, #12151f, #2a1d3a);
  }
  @media (min-width: 640px) {
    padding: 3rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
  @media (max-width: 639px) {
    padding: 2rem 0.5rem;
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
  @media (max-width: 639px) {
    max-width: 100%;
    padding: 0 0.5rem;
  }
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
  @media (max-width: 639px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  @media (max-width: 639px) {
    flex-direction: column;
    margin-bottom: 2rem;
    gap: 0.5rem;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 1rem 4rem 1rem 3rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.inputBg};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 8px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.4)`};
  }
  &::placeholder {
    color: ${({ theme }) => theme.mutedText};
  }
  @media (max-width: 639px) {
    min-width: 0;
    width: 100%;
    padding: 0.75rem 3rem 0.75rem 2.5rem;
    font-size: 0.9rem;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.highlight};
  }
  @media (max-width: 639px) {
    right: 1.5rem;
  }
`;

const TwitterLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  color: ${({ theme }) => theme.mutedText};
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.highlight};
    background: ${({ theme }) => `rgba(${parseColor(theme.inputBg)}, 0.1)`};
    transform: scale(1.1);
  }
  @media (max-width: 639px) {
    width: 2rem;
    height: 2rem;
  }
`;

const FilterButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 2rem;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 200px;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  cursor: pointer;
  position: relative;
  &:hover {
    border-color: ${({ theme }) => theme.highlight};
    box-shadow: 0 0 10px ${({ theme }) => `rgba(${parseColor(theme.highlight)}, 0.3)`};
  }
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 12px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.5)`};
  }
  @media (max-width: 639px) {
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background: ${({ theme }) => theme.optionBg};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  z-index: 10;
  margin-top: 0.5rem;
  backdrop-filter: blur(8px);
  list-style: none;
  padding: 0.5rem 0;
  display: none;
  &.open {
    display: block;
  }
  @media (max-width: 639px) {
    width: 100%;
    margin-top: 0.25rem;
  }
`;

const DropdownItem = styled.li`
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    background: ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
    color: ${({ theme }) => theme.highlight};
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 1rem;
    right: 1rem;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.accent}, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  &:hover:after {
    opacity: 1;
  }
  @media (max-width: 639px) {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
`;

const IncognitoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;
  transition: all 0.3s ease;
  &.active {
    background: ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accent};
  }
  &:hover {
    color: ${({ theme }) => theme.highlight};
    background: ${({ theme }) => `rgba(${parseColor(theme.inputBg)}, 0.1)`};
    transform: scale(1.1);
  }
  @media (max-width: 639px) {
    width: 2rem;
    height: 2rem;
  }
`;

const DarkModeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.mutedText};
  cursor: pointer;
  transition: all 0.3s ease;
  &.active {
    background: ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
    color: ${({ theme }) => theme.accent};
    border-color: ${({ theme }) => theme.accent};
  }
  &:hover {
    color: ${({ theme }) => theme.highlight};
    background: ${({ theme }) => `rgba(${parseColor(theme.inputBg)}, 0.1)`};
    transform: scale(1.1);
  }
  @media (max-width: 639px) {
    width: 2rem;
    height: 2rem;
  }
`;

const HashtagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.2), rgba(157, 23, 77, 0.2));
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(6px);
  justify-content: center;
  @media (max-width: 639px) {
    padding: 1rem;
    gap: 0.4rem;
    margin-bottom: 1.5rem;
    border-radius: 0.75rem;
  }
`;

const HashtagWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`;

const HashtagButton = styled.button`
  background: ${({ theme }) => theme.inputBg};
  border: 1px solid ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.3)`};
  border-radius: 0.75rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondaryText};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  text-transform: lowercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  &:hover {
    background: ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
    color: ${({ theme }) => theme.highlight};
    border-color: ${({ theme }) => theme.highlight};
    transform: scale(1.05);
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 8px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.4)`};
  }
  @media (max-width: 639px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
  }
`;

const PostCount = styled.span`
  background: ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
  color: ${({ theme }) => theme.highlight};
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 0.5rem;
  line-height: 1;
  @media (max-width: 639px) {
    font-size: 0.7rem;
    padding: 0.15rem 0.4rem;
  }
`;

const ShowMoreButton = styled.button`
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  border: none;
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  margin: 0.5rem auto;
  display: block;
  &:hover {
    background: linear-gradient(45deg, #a78bfa, #f472b6);
    transform: scale(1.05);
  }
  @media (max-width: 639px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
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
  @media (max-width: 639px) {
    gap: 1rem;
  }
`;

const UserCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 8px 20px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.3)`}, 0 0 20px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
    border-color: ${({ theme }) => theme.accent};
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 20%, ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`}, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  &:hover:before {
    opacity: 1;
  }
  @media (max-width: 639px) {
    padding: 1rem;
    border-radius: 1rem;
  }
`;

const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  @media (max-width: 639px) {
    gap: 0.75rem;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  transition: transform 0.3s ease;
  ${UserCard}:hover & {
    transform: scale(1.1);
  }
  @media (max-width: 639px) {
    width: 4rem;
    height: 4rem;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid transparent;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  box-shadow: 0 0 10px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.5)`};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-width: 639px) {
    gap: 0.3rem;
  }
`;

const Username = styled.h3`
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0;
  transition: color 0.3s ease;
  ${UserCard}:hover & {
    color: ${({ theme }) => theme.highlight};
  }
  @media (max-width: 639px) {
    font-size: 1.1rem;
  }
`;

const DisplayName = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.95rem;
  margin: 0;
  @media (max-width: 639px) {
    font-size: 0.9rem;
  }
`;

const Bio = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.4;
  max-height: 2.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media (max-width: 639px) {
    font-size: 0.8rem;
  }
`;

const Hashtags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  @media (max-width: 639px) {
    gap: 0.3rem;
  }
`;

const Hashtag = styled.span`
  background: ${({ theme }) => theme.inputBg};
  border: 1px solid ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.3)`};
  border-radius: 0.75rem;
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondaryText};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
    color: ${({ theme }) => theme.highlight};
    border-color: ${({ theme }) => theme.highlight};
  }
  @media (max-width: 639px) {
    padding: 0.2rem 0.5rem;
    font-size: 0.75rem;
  }
`;

const Followers = styled.p`
  color: ${({ theme }) => theme.accent};
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  @media (max-width: 639px) {
    font-size: 0.85rem;
  }
`;

const CreatedAt = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.85rem;
  margin: 0;
  @media (max-width: 639px) {
    font-size: 0.8rem;
  }
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
  @media (max-width: 639px) {
    align-items: flex-start;
    padding-top: 1rem;
  }
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 36rem;
  max-height: 95vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.modalBg};
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.3)`};
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
    background: ${({ theme }) => theme.inputBg};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.6)`};
    border-radius: 5px;
  }
  @media (max-width: 639px) {
    width: 95%;
    max-width: 100%;
    border-radius: 1.5rem;
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
  @media (max-width: 639px) {
    height: 8rem;
    border-radius: 1.5rem 1.5rem 0 0;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: ${({ theme }) => theme.text};
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
  @media (max-width: 639px) {
    width: 2rem;
    height: 2rem;
    top: 0.5rem;
    left: 0.5rem;
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
  border: 4px solid ${({ theme }) => theme.optionBg};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  @media (max-width: 639px) {
    width: 6rem;
    height: 6rem;
    border-width: 3px;
    bottom: 0.5rem;
  }
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
  @media (max-width: 639px) {
    padding: 3.5rem 1rem 1rem;
    gap: 1rem;
  }
`;

const ProfileName = styled.div`
  text-align: center;
`;

const ProfileDisplayName = styled.h2`
  color: ${({ theme }) => theme.text};
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
  @media (max-width: 639px) {
    font-size: 1.4rem;
  }
`;

const ProfileUsername = styled.p`
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  margin: 0;
  @media (max-width: 639px) {
    font-size: 1rem;
  }
`;

const ProfileFollowers = styled.div`
  background: ${({ theme }) => theme.inputBg};
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.highlight};
  font-weight: 600;
  @media (max-width: 639px) {
    font-size: 1rem;
    padding: 0.75rem;
  }
`;

const ProfileBio = styled.div`
  background: ${({ theme }) => theme.inputBg};
  border-radius: 1rem;
  padding: 1.25rem;
  @media (max-width: 639px) {
    padding: 1rem;
  }
`;

const ProfileBioTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  margin: 0 0 0.75rem;
  @media (max-width: 639px) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

const ProfileBioText = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  @media (max-width: 639px) {
    font-size: 0.85rem;
  }
`;

const ProfileDate = styled.div`
  background: ${({ theme }) => theme.inputBg};
  border-radius: 1rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  @media (max-width: 639px) {
    padding: 0.75rem 1rem;
  }
`;

const ProfileDateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
`;

const ProfileDateText = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.9rem;
  margin: 0;
  @media (max-width: 639px) {
    font-size: 0.85rem;
  }
`;

const PostsContainer = styled.div`
  background: ${({ theme }) => theme.inputBg};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 639px) {
    padding: 1rem;
    gap: 0.75rem;
  }
`;

const PostsTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  margin: 0 0 0.5rem;
  @media (max-width: 639px) {
    font-size: 0.9rem;
  }
`;

const PostCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => `linear-gradient(135deg, rgba(${parseColor(theme.accent)}, 0.1), rgba(${parseColor(theme.accent)}, 0.1))`};
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 4px 10px ${({ theme }) => `rgba(${parseColor(theme.accent)}, 0.2)`};
  }
  @media (max-width: 639px) {
    padding: 0.75rem;
  }
`;

const PostContent = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 0.5rem;
  @media (max-width: 639px) {
    font-size: 0.85rem;
  }
`;

const PostCategory = styled.span`
  display: inline-block;
  background: ${({ category }) => {
    switch (category) {
      case 'strange':
        return 'rgba(139, 92, 246, 0.3)';
      case 'crypto scam warnings':
        return 'rgba(236, 72, 153, 0.3)';
      case 'chaos and toxicity':
        return 'rgba(250, 204, 21, 0.3)';
      case 'conflicts and controversial':
        return 'rgba(239, 68, 68, 0.3)';
      case 'seeking likes and comments':
        return 'rgba(59, 130, 246, 0.3)';
      default:
        return 'rgba(255, 255, 255, 0.2)';
    }
  }};
  color: ${({ theme }) => theme.text};
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  margin-right: 0.5rem;
  @media (max-width: 639px) {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
  }
`;

const PostDate = styled.span`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.8rem;
  @media (max-width: 639px) {
    font-size: 0.75rem;
  }
`;

const NoPosts = styled.p`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  @media (max-width: 639px) {
    font-size: 0.85rem;
  }
`;

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.inputBg};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  @media (max-width: 639px) {
    padding: 1rem;
  }
`;

const ChartTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  margin: 0 0 1rem;
  @media (max-width: 639px) {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
`;

// Utility to parse hex color to RGB
const parseColor = (hex) => {
  if (hex.startsWith('#')) hex = hex.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

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
  const [filterOption, setFilterOption] = useState('all');
  const [isIncognito, setIsIncognito] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedHashtag, setSelectedHashtag] = useState(null);
  const [showMoreHashtags, setShowMoreHashtags] = useState(false);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const modalRef = useRef(null);
  const containerRef = useRef(null);
  const postsRef = useRef(null);
  const chartRef = useRef(null);
  const dropdownRef = useRef(null);
  const hashtagsContainerRef = useRef(null);

  const theme = isDarkMode ? themes.dark : themes.light;

  // Gradient backgrounds for scroll effect
  const gradients = [
    theme.background,
    `linear-gradient(135deg, ${isDarkMode ? '#0d0215' : '#2a2a72'}, ${isDarkMode ? '#050f18' : '#2f1752'})`,
    `linear-gradient(135deg, ${isDarkMode ? '#250c20' : '#1b1849'}, ${isDarkMode ? '#050f19' : '#6a1950'})`,
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'latest', label: 'Latest Posts' },
    { value: 'strange', label: 'Strange Posts' },
    { value: 'crypto scam warnings', label: 'Crypto Scam Warnings' },
    { value: 'chaos and toxicity', label: 'Chaos and Toxicity' },
    { value: 'conflicts and controversial', label: 'Controversial Posts' },
    { value: 'seeking likes and comments', label: 'Engagement Posts' },
  ];

  // Collect up to 4 hashtags from each user's hashtags array
  const allHashtags = useMemo(() => {
    const hashtagSet = new Set();
    users.forEach((user) => {
      if (user.hashtags && Array.isArray(user.hashtags)) {
        user.hashtags.slice(0, 4).forEach((hashtag) => {
          const cleanHashtag = hashtag.startsWith('#') ? hashtag.slice(1).toLowerCase() : hashtag.toLowerCase();
          hashtagSet.add(cleanHashtag);
        });
      }
    });
    return Array.from(hashtagSet).sort();
  }, []);

  // Calculate post count for each hashtag
  const hashtagCounts = useMemo(() => {
    const counts = {};
    allHashtags.forEach((hashtag) => {
      counts[hashtag] = 0;
      users.forEach((user) => {
        if (user.posts && Array.isArray(user.posts)) {
          user.posts.forEach((post) => {
            if (post.content) {
              const regex = new RegExp(`#${hashtag}\\b`, 'i');
              if (regex.test(post.content)) {
                counts[hashtag]++;
              }
            }
          });
        }
      });
    });
    return counts;
  }, [allHashtags, users]);

  // Limit displayed hashtags to 50 unless showMore is true
  const displayedHashtags = showMoreHashtags ? allHashtags : allHashtags.slice(0, 50);

  // Set initial background immediately on mount
  useLayoutEffect(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, {
        background: gradients[0],
      });
    }
  }, [theme]);

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
        background: isIncognito ? 'linear-gradient(135deg, #12151f, #2a1d3a)' : gradients[index],
        duration: 1,
        ease: 'sine.inOut',
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(updateBackground);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [gradients, isIncognito]);

  // Handle dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animate dropdown menu
  useLayoutEffect(() => {
    if (dropdownRef.current) {
      const menu = dropdownRef.current.querySelector('ul');
      const items = menu?.querySelectorAll('li');
      if (isDropdownOpen) {
        gsap.fromTo(
          menu,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(
          items,
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', stagger: 0.05 }
        );
      }
    }
  }, [isDropdownOpen]);

  // Animate hashtags container
  useLayoutEffect(() => {
    if (hashtagsContainerRef.current) {
      const wrappers = hashtagsContainerRef.current.querySelectorAll('.hashtag-wrapper');
      gsap.fromTo(
        wrappers,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.03, delay: 0.3 }
      );
    }
  }, [displayedHashtags]);

  const filteredUsers = useMemo(() => {
    let result = users;

    // Handle search
    if (debouncedSearchTerm) {
      const lowerSearch = debouncedSearchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.username.toLowerCase().includes(lowerSearch) ||
          user.displayName.toLowerCase().includes(lowerSearch) ||
          user.hashtags.some((hashtag) => hashtag.toLowerCase().includes(lowerSearch))
      );
    }

    // Handle hashtag filter
    if (selectedHashtag) {
      result = result
        .map((user) => {
          const matchingPosts = user.posts?.filter((post) => {
            const hashtags = post.hashtags || post.content.match(/#[^\s#]+/g) || [];
            return hashtags.some((hashtag) =>
              hashtag.toLowerCase().includes(selectedHashtag.toLowerCase())
            );
          }).length || 0;
          return { ...user, matchingPosts };
        })
        .filter((user) => user.matchingPosts > 0)
        .sort((a, b) => b.matchingPosts - a.matchingPosts);
    }

    // Handle filtering
    if (filterOption === 'latest' && !selectedHashtag) {
      result = [...result].sort((a, b) => {
        const aLatest = a.posts?.length
          ? Math.max(...a.posts.map((p) => new Date(p.createdAt).getTime()))
          : 0;
        const bLatest = b.posts?.length
          ? Math.max(...b.posts.map((p) => new Date(p.createdAt).getTime()))
          : 0;
        return bLatest - aLatest;
      });
    } else if (filterOption !== 'all' && !selectedHashtag) {
      result = result.filter((user) =>
        user.posts?.some((post) => post.category === filterOption)
      );
    }

    return result;
  }, [debouncedSearchTerm, filterOption, selectedHashtag]);

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
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.inOut' }
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

  // Animate posts and chart when modal opens
  useLayoutEffect(() => {
    if (modalOpen && postsRef.current) {
      gsap.fromTo(
        postsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1, delay: 0.3 }
      );
    }
    if (modalOpen && chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 }
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
    setSelectedHashtag(null);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedHashtag(null);
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleIncognito = () => {
    setIsIncognito((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleFilterSelect = useCallback((value) => {
    setFilterOption(value);
    setIsDropdownOpen(false);
    setSelectedHashtag(null);
  }, []);

  const handleHashtagClick = (hashtag) => {
    setSelectedHashtag(hashtag);
    setFilterOption('all');
  };

  const toggleShowMore = () => {
    setShowMoreHashtags((prev) => !prev);
  };

  // Chart data
  const getChartData = (user) => {
    return {
      labels: ['Followers', 'Posts', 'Likes'],
      datasets: [
        {
          label: 'User Engagement',
          data: [
            user.followers,
            user.posts?.length || 0,
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
        backgroundColor: theme.optionBg,
        titleColor: theme.text,
        bodyColor: theme.secondaryText,
        borderColor: `rgba(${parseColor(theme.accent)}, 0.3)`,
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: `rgba(${parseColor(theme.text)}, 0.1)`,
        },
        ticks: {
          color: theme.mutedText,
          callback: (value) => value.toLocaleString(),
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: theme.mutedText,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <TrekerContainer ref={containerRef} className={isIncognito ? 'incognito' : ''} theme={theme}>
      <ContentWrapper>
        <Header ref={headerRef}>Neo-Trek</Header>
        <SearchWrapper>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name, username, or hashtag..."
            autoFocus
            aria-label="Search users"
            theme={theme}
            sx={{
              paddingLeft: "30px",
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
            <ClearButton onClick={clearSearch} aria-label="Clear search" theme={theme}>
              <X size={20} />
            </ClearButton>
          )}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <FilterButton
              onClick={toggleDropdown}
              aria-label="Filter users"
              aria-expanded={isDropdownOpen}
              theme={theme}
            >
              {filterOptions.find((opt) => opt.value === filterOption)?.label}
              <ArrowLeft size={16} style={{ transform: isDropdownOpen ? 'rotate(90deg)' : 'rotate(-90deg)', transition: 'transform 0.3s ease' }} />
            </FilterButton>
            <DropdownMenu className={isDropdownOpen ? 'open' : ''} theme={theme}>
              {filterOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => handleFilterSelect(option.value)}
                  theme={theme}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </div>
          <IncognitoButton
            onClick={toggleIncognito}
            className={isIncognito ? 'active' : ''}
            aria-label={isIncognito ? 'Disable incognito mode' : 'Enable incognito mode'}
            title={isIncognito ? 'Disable Incognito' : 'Enable Incognito'}
            theme={theme}
          >
            <EyeOff size={20} />
          </IncognitoButton>
          <DarkModeButton
            onClick={toggleDarkMode}
            className={isDarkMode ? 'active' : ''}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            theme={theme}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </DarkModeButton>
          <TwitterLink href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Go to X" theme={theme}>
            <XIcon size={24} />
          </TwitterLink>
        </SearchWrapper>

        <HashtagsContainer ref={hashtagsContainerRef} theme={theme}>
          {displayedHashtags.map((hashtag) => (
            <HashtagWrapper key={hashtag} className="hashtag-wrapper">
              <HashtagButton
                onClick={() => handleHashtagClick(hashtag)}
                theme={theme}
                aria-label={`Filter by hashtag ${hashtag}`}
              >
                #{hashtag}
              </HashtagButton>
              <PostCount theme={theme}>{hashtagCounts[hashtag] || 0}</PostCount>
            </HashtagWrapper>
          ))}
        </HashtagsContainer>
        {allHashtags.length > 50 && (
          <ShowMoreButton onClick={toggleShowMore} theme={theme}>
            {showMoreHashtags ? 'Show Less' : 'Show More'}
          </ShowMoreButton>
        )}

        <UserGrid ref={gridRef}>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.username}
              className="user-card"
              onClick={() => handleCardClick(user)}
              theme={theme}
            >
              <UserContent>
                <AvatarWrapper>
                  <Avatar src={user.avatar || 'https://via.placeholder.com/72'} alt={`${user.displayName} avatar`} theme={theme} />
                </AvatarWrapper>
                <UserInfo>
                  <Username theme={theme}>{user.username}</Username>
                  <DisplayName theme={theme}>{user.displayName}</DisplayName>
                  <Bio theme={theme}>{user.bio}</Bio>
                  <Hashtags>
                    {user.hashtags.slice(0, 3).map((hashtag) => (
                      <Hashtag key={hashtag} onClick={() => handleHashtagClick(hashtag.slice(1).toLowerCase())} theme={theme}>
                        {hashtag}
                      </Hashtag>
                    ))}
                  </Hashtags>
                  <Followers theme={theme}>{user.followers.toLocaleString()} followers</Followers>
                  <CreatedAt theme={theme}>Joined {formatDate(user.createdAt)}</CreatedAt>
                </UserInfo>
              </UserContent>
            </UserCard>
          ))}
        </UserGrid>
      </ContentWrapper>

      <ModalOverlay ref={modalRef} className={modalOpen ? 'active' : ''}>
        {selectedUser && (
          <ModalContent theme={theme}>
            <ModalHeader>
              <BackButton onClick={closeModal} aria-label="Close modal" theme={theme}>
                <ArrowLeft size={20} />
              </BackButton>
              <ProfileAvatar theme={theme}>
                <ProfileAvatarImg
                  src={selectedUser.avatar || 'https://via.placeholder.com/96'}
                  alt={`${selectedUser.displayName} profile`}
                />
              </ProfileAvatar>
            </ModalHeader>
            <ProfileContent>
              <ProfileName>
                <ProfileDisplayName theme={theme}>{selectedUser.displayName}</ProfileDisplayName>
                <ProfileUsername theme={theme}>{selectedUser.username}</ProfileUsername>
              </ProfileName>
              <ProfileFollowers theme={theme}>{selectedUser.followers.toLocaleString()} followers</ProfileFollowers>
              <ProfileBio theme={theme}>
                <ProfileBioTitle theme={theme}>
                  <User size={16} /> Biography
                </ProfileBioTitle>
                <ProfileBioText theme={theme}>{selectedUser.bio}</ProfileBioText>
              </ProfileBio>
              <ProfileDate theme={theme}>
                <ProfileDateIcon>
                  <Calendar size={18} />
                </ProfileDateIcon>
                <ProfileDateText theme={theme}>Joined {formatDate(selectedUser.createdAt)}</ProfileDateText>
              </ProfileDate>
              <PostsContainer ref={postsRef} aria-label="User posts" theme={theme}>
                <PostsTitle theme={theme}>
                  <User size={16} /> Posts
                </PostsTitle>
                {selectedUser.posts && selectedUser.posts.length > 0 ? (
                  selectedUser.posts
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((post, index) => (
                      <PostCard key={index} theme={theme}>
                        <PostContent theme={theme}>{post.content}</PostContent>
                        <div>
                          <PostCategory category={post.category} theme={theme}>{post.category}</PostCategory>
                          <PostDate theme={theme}>{formatDate(post.createdAt)}</PostDate>
                        </div>
                      </PostCard>
                    ))
                ) : (
                  <NoPosts theme={theme}>No posts available</NoPosts>
                )}
              </PostsContainer>
              <ChartContainer ref={chartRef} aria-label="User engagement chart" theme={theme}>
                <ChartTitle theme={theme}>
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
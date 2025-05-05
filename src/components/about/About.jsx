import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ChevronLeft, Calendar, Users, Info, Globe, Clock } from 'lucide-react';
import users from '../data/user';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1rem;
  background: #12151f;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  @media (min-width: 640px) {
    padding: 2rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 2.5rem 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #94a3b8;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  transition: all 0.3s ease;
  &:hover {
    color: #facc15;
    transform: translateX(-5px);
  }
`;

const ProfileCard = styled.div`
  position: relative;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
  border-radius: 2rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.2), transparent 70%);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 2.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2.5rem;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    width: 10rem;
    height: 10rem;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid transparent;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Username = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #facc15;
  margin: 0;
  background: linear-gradient(45deg, #facc15, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DisplayName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
`;

const Followers = styled.p`
  color: #ec4899;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const Bio = styled.p`
  color: #d1d5db;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  margin: 2rem 0;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const InfoText = styled.p`
  color: #94a3b8;
  font-size: 1rem;
  margin: 0;
`;

const InfoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: rgba(236, 72, 153, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ec4899;
  flex-shrink: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  color: #ec4899;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  gap: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const ReturnButton = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  color: white;
  border: none;
  border-radius: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(236, 72, 153, 0.4);
  }
`;

// Format date function
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const About = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Simulate fetching user data (in a real app, this would be an API call)
    const foundUser = users.find(u => u.id === id);

    setTimeout(() => {
      if (foundUser) {
        setUser(foundUser);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800); // Simulated loading delay
  }, [id]);

  useLayoutEffect(() => {
    if (!loading && !error && containerRef.current) {
      // Animate container
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      // Animate header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      // Animate info section
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, [loading, error]);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <AboutContainer>
        <ContentWrapper>
          <BackButton onClick={handleBackClick}>
            <ChevronLeft size={20} />
            Назад
          </BackButton>
          <LoadingContainer>
            Загружаем профиль...
          </LoadingContainer>
        </ContentWrapper>
      </AboutContainer>
    );
  }

  if (error) {
    return (
      <AboutContainer>
        <ContentWrapper>
          <BackButton onClick={handleBackClick}>
            <ChevronLeft size={20} />
            Назад
          </BackButton>
          <ErrorContainer>
            <ErrorMessage>Пользователь не найден</ErrorMessage>
            <ReturnButton onClick={handleBackClick}>
              Вернуться на главную
            </ReturnButton>
          </ErrorContainer>
        </ContentWrapper>
      </AboutContainer>
    );
  }

  return (
    <AboutContainer>
      <ContentWrapper>
        <BackButton onClick={handleBackClick}>
          <ChevronLeft size={20} />
          Назад
        </BackButton>
        <ProfileCard ref={containerRef}>
          <ProfileHeader ref={headerRef}>
            <AvatarWrapper>
              <Avatar
                src={user.avatar || 'https://via.placeholder.com/200'}
                alt={`${user.displayName} avatar`}
              />
            </AvatarWrapper>
            <ProfileInfo>
              <Username>{user.username}</Username>
              <DisplayName>{user.displayName}</DisplayName>
              <Followers>{user.followers.toLocaleString()} подписчиков</Followers>
              <Bio>{user.bio}</Bio>
            </ProfileInfo>
          </ProfileHeader>

          <Divider />

          <InfoSection ref={infoRef}>
            <InfoItem>
              <InfoIcon>
                <Calendar size={20} />
              </InfoIcon>
              <InfoText>Присоединился: {formatDate(user.createdAt)}</InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <Users size={20} />
              </InfoIcon>
              <InfoText>Подписчики: {user.followers.toLocaleString()}</InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <Info size={20} />
              </InfoIcon>
              <InfoText>Профиль: {user.username}</InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <Globe size={20} />
              </InfoIcon>
              <InfoText>ID: {user.id}</InfoText>
            </InfoItem>
          </InfoSection>
        </ProfileCard>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;
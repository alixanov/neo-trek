import React, { useState, useLayoutEffect, useMemo, memo, useRef } from 'react';
import { Search, X } from 'lucide-react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const users = [
  { username: '@RapidResponse47', displayName: 'Rapid Response', followers: 1200, bio: 'Быстрые новости и реакции' },
  { username: '@nypost', displayName: 'New York Post', followers: 500000, bio: 'Новости Нью-Йорка и не только' },
  { username: '@Independent', displayName: 'The Independent', followers: 300000, bio: 'Независимая журналистика' },
  { username: '@mailOnline', displayName: 'Daily Mail', followers: 400000, bio: 'Глобальные новости каждый день' },
  { username: '@elonmusk', displayName: 'Elon Musk', followers: 10000000, bio: 'Инноватор и мечтатель' },
  { username: '@lessin', displayName: 'Jessica Lessin', followers: 25000, bio: 'Технологии и медиа' },
  { username: '@euwyn', displayName: 'Euwyn Poon', followers: 1500, bio: 'Стартапы и код' },
  { username: '@Polymarket', displayName: 'Polymarket', followers: 8000, bio: 'Прогнозы и рынки' },
  { username: '@euris_JT', displayName: 'Euris JT', followers: 300, bio: 'Искры творчества' },
  { username: '@MarioNawfal', displayName: 'Mario Nawfal', followers: 50000, bio: 'Предприниматель и аналитик' },
  { username: '@RT_com', displayName: 'RT News', followers: 200000, bio: 'Мировые новости' },
  { username: '@LucaNetz', displayName: 'Luca Netz', followers: 7000, bio: 'NFT и блокчейн' },
  { username: '@0xRamonos', displayName: 'Ramonos', followers: 400, bio: 'Криптоэнтузиаст' },
  { username: '@nima_owji', displayName: 'Nima Owji', followers: 600, bio: 'Технологии и дизайн' },
  { username: '@2mistekevin_rs', displayName: 'Kevin RS', followers: 200, bio: 'Игры и код' },
  { username: '@100xgemfinder', displayName: 'Gem Finder', followers: 1000, bio: 'Криптосокровища' },
  { username: '@_shadow36', displayName: 'Shadow', followers: 300, bio: 'Таинственный наблюдатель' },
  { username: '@FunnyJMoney', displayName: 'Funny Money', followers: 5000, bio: 'Мемы и финансы' },
  { username: '@BurwickLaw', displayName: 'Burwick Law', followers: 800, bio: 'Юридические инсайты' },
  { username: '@ABC', displayName: 'ABC News', followers: 600000, bio: 'Надёжные новости' },
  { username: '@PaulSkallas', displayName: 'Paul Skallas', followers: 12000, bio: 'Культура и идеи' },
  { username: '@wallstreetbets', displayName: 'Wall Street Bets', followers: 150000, bio: 'Финансовый бунт' },
  { username: '@realdonuldtrump', displayName: 'Donald Trump', followers: 2000000, bio: 'Политика и лидерство' },
  { username: '@peta', displayName: 'PETA', followers: 100000, bio: 'За права животных' },
  { username: '@DegenerateNews', displayName: 'Degenerate News', followers: 4000, bio: 'Дикие новости' },
  { username: '@pain', displayName: 'Pain', followers: 200, bio: 'Искры эмоций' },
  { username: '@astridhpilla', displayName: 'Astrid Pilla', followers: 300, bio: 'Искусство и жизнь' },
  { username: '@nfl', displayName: 'NFL', followers: 500000, bio: 'Футбол и страсть' },
  { username: '@marklevinshow', displayName: 'Mark Levin', followers: 60000, bio: 'Политические дебаты' },
  { username: '@ecca', displayName: 'Ecca', followers: 100, bio: 'Музыка и вайб' },
  { username: '@crypto_banter', displayName: 'Crypto Banter', followers: 20000, bio: 'Крипто и трейдинг' },
  { username: '@amuse', displayName: 'Amuse', followers: 500, bio: 'Развлечения и юмор' },
  { username: '@doge', displayName: 'Doge Army', followers: 30000, bio: 'Мемы и крипто' },
  { username: '@ChartfuMonkey', displayName: 'Chartfu Monkey', followers: 7000, bio: 'Графики и аналитика' },
  { username: '@crashiusClay69', displayName: 'Crashius Clay', followers: 400, bio: 'Хаос и веселье' },
  { username: '@PeterSchiff', displayName: 'Peter Schiff', followers: 80000, bio: 'Экономика и золото' },
  { username: '@mrpunkdoteth', displayName: 'Mr Punk', followers: 2000, bio: 'NFT и панк' },
  { username: '@alx', displayName: 'ALX', followers: 15000, bio: 'Технологии и свобода' },
  { username: '@dgabeau', displayName: 'Dgabeau', followers: 300, bio: 'Искры гениальности' },
  { username: '@Easyeatsbodega', displayName: 'Easy Eats', followers: 600, bio: 'Еда и стиль' },
  { username: '@boloudon', displayName: 'Bo Loudon', followers: 4000, bio: 'Молодёжный вайб' },
  { username: '@ansem', displayName: 'Ansem', followers: 1000, bio: 'Крипто и философия' },
  { username: '@ye', displayName: 'Ye', followers: 5000000, bio: 'Музыка и инновации' },
  { username: '@ryanafournier', displayName: 'Ryan Fournier', followers: 20000, bio: 'Политика и молодёжь' },
  { username: '@markjeffrey', displayName: 'Mark Jeffrey', followers: 5000, bio: 'Технологии и книги' },
  { username: '@0xash1', displayName: 'Ash1', followers: 200, bio: 'Код и крипто' },
  { username: '@marionawfal', displayName: 'Mario Nawfal', followers: 50000, bio: 'Бизнес и аналитика' },
  { username: '@Forbes', displayName: 'Forbes', followers: 700000, bio: 'Бизнес и успех' },
  { username: '@WSJ', displayName: 'Wall Street Journal', followers: 600000, bio: 'Финансы и новости' },
  { username: '@SenLummis', displayName: 'Cynthia Lummis', followers: 25000, bio: 'Политика и крипто' },
  { username: '@FA_touadera', displayName: 'Faustin Touadera', followers: 3000, bio: 'Лидерство и прогресс' },
  { username: '@NewsWire_US', displayName: 'NewsWire US', followers: 10000, bio: 'Новости США' },
  { username: '@krakensupport', displayName: 'Kraken Support', followers: 5000, bio: 'Криптобиржа' },
  { username: '@moonshot', displayName: 'Moonshot', followers: 2000, bio: 'Инновации и мечты' },
  { username: '@farhajmayan', displayName: 'Farhaj Mayan', followers: 400, bio: 'Технологии и стартапы' },
  { username: '@Watcher.Guru', displayName: 'Watcher Guru', followers: 15000, bio: 'Крипто и тренды' },
  { username: '@okx', displayName: 'OKX', followers: 20000, bio: 'Криптобиржа' },
  { username: '@cz', displayName: 'CZ', followers: 100000, bio: 'Крипто и бизнес' },
  { username: '@binance', displayName: 'Binance', followers: 300000, bio: 'Ведущая криптобиржа' },
  { username: '@oreo', displayName: 'Oreo', followers: 40000, bio: 'Вкус и веселье' },
  { username: '@VitalikButerin', displayName: 'Vitalik Buterin', followers: 200000, bio: 'Эфириум и будущее' },
  { username: '@aeyakovenko', displayName: 'Anatoly Yakovenko', followers: 25000, bio: 'Solana и блокчейн' },
  { username: '@LiberLand_org', displayName: 'Liberland', followers: 5000, bio: 'Свобода и утопия' },
  { username: '@TheinsiderPaper', displayName: 'Insider Paper', followers: 10000, bio: 'Инсайдерские новости' },
  { username: '@Cointehelgraph', displayName: 'Cointelegraph', followers: 80000, bio: 'Крипто и технологии' },
  { username: '@AutismCapital', displayName: 'Autism Capital', followers: 6000, bio: 'Крипто и аналитика' },
  { username: '@WhaleInsider', displayName: 'Whale Insider', followers: 4000, bio: 'Криптокиты и тренды' }
];

const TrekerContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 1rem;
  background: #12151f;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  @media (min-width: 640px) {
    padding: 3rem 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
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
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3rem 1rem 3rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease;
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
  right: 1rem;
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

const UserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const UserCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  &.expanded {
    padding-bottom: 1.5rem;
  }
  &:hover:not(.expanded) {
    transform: translateY(-4px);
    border-color: #8b5cf6;
    box-shadow: 0 6px 12px rgba(139, 92, 246, 0.2);
  }
`;

const UserContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: linear-gradient(45deg, #8b5cf6, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.span`
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;
`;

const DisplayName = styled.span`
  color: #d1d5db;
  font-size: 0.85rem;
`;

const ExpandedContent = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #d1d5db;
  font-size: 0.9rem;
`;

const Bio = styled.p`
  margin: 0 0 0.5rem;
`;

const Followers = styled.p`
  margin: 0;
  color: #facc15;
`;

const UserCardComponent = memo(({ user }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  useLayoutEffect(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        height: 'auto',
        duration: 0.3,
        ease: 'power3.out'
      });
    }
  }, [isExpanded]);

  return (
    <UserCard
      ref={cardRef}
      className={`user-card ${isExpanded ? 'expanded' : ''}`}
      onClick={handleClick}
    >
      <UserContent>
        <Avatar>{user.username[1].toUpperCase()}</Avatar>
        <UserInfo>
          <Username>{user.username}</Username>
          <DisplayName>{user.displayName}</DisplayName>
        </UserInfo>
      </UserContent>
      {isExpanded && (
        <ExpandedContent>
          <Bio>{user.bio}</Bio>
          <Followers>{user.followers.toLocaleString()} подписчиков</Followers>
        </ExpandedContent>
      )}
    </UserCard>
  );
});

const Treker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );
    }
  }, []);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearchTerm) return users;
    return users.filter(
      user =>
        user.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        user.displayName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm]);

  useLayoutEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        '.user-card',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  }, [filteredUsers]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <TrekerContainer>
      <ContentWrapper>
        <Header ref={headerRef}>Neo-Trek</Header>
        <SearchWrapper>
          <Search
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }}
            size={24}
          />
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Поиск пользователей..."
            autoFocus
            aria-label="Поиск пользователей"
          />
          {searchTerm && (
            <ClearButton onClick={clearSearch} aria-label="Очистить поиск">
              <X size={20} />
            </ClearButton>
          )}
        </SearchWrapper>
        <UserGrid ref={gridRef}>
          {filteredUsers.map(user => (
            <UserCardComponent key={user.username} user={user} />
          ))}
        </UserGrid>
      </ContentWrapper>
    </TrekerContainer>
  );
};

export default Treker;
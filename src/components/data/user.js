import { v4 as uuidv4 } from 'uuid';

const users = [
  {
    id: uuidv4(),
    username: '@RapidResponse47',
    displayName: 'Rapid Response',
    followers: 1200,
    bio: 'Fast news and reactions',
    createdAt: '2023-01-15',
    avatar: 'https://pbs.twimg.com/profile_images/1883970867215876096/HK4lwY1m_400x400.jpg',
    hashtags: ['#news', '#breakingnews', '#currentevents', '#reactions', '#fastnews', '#trending'],
    posts: [
      { id: uuidv4(), content: 'Alien sighting reported in NYC? Grainy footage circulating, looks like a drone to me. What’s your take? 👽 #trending', createdAt: '2025-04-25', category: 'strange' },
      { id: uuidv4(), content: 'Politician caught in scandal AGAIN. Same old story, different name. Who’s surprised? 🙄 #news', createdAt: '2025-04-30', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Drop a 🔥 if you’re tired of fake news clogging your feed! Let’s hear your thoughts! #currentevents', createdAt: '2025-05-03', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@nypost',
    displayName: 'New York Post',
    followers: 500000,
    bio: 'New York news and beyond',
    createdAt: '2010-03-22',
    avatar: 'https://pbs.twimg.com/profile_images/966372680306868224/60wfGe9e_400x400.jpg',
    hashtags: ['#newyork', '#nypost', '#news', '#citynews', '#usnews', '#journalism', '#headlines'],
    posts: [
      { id: uuidv4(), content: 'NYC mayor’s new policy sparks outrage: “This will ruin the city!” say locals. Agree or disagree? #newyork', createdAt: '2025-04-28', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Subway performer claims to be Elvis reincarnated. Watch the video and decide for yourself! 🎤 #citynews', createdAt: '2025-05-01', category: 'strange' }
    ]
  },
  {
    id: uuidv4(),
    username: '@Independent',
    displayName: 'The Independent',
    followers: 300000,
    bio: 'Independent journalism',
    createdAt: '2012-07-10',
    avatar: 'https://pbs.twimg.com/profile_images/1500085652309917697/C6VhBAcV_400x400.jpg',
    hashtags: ['#journalism', '#independent', '#news', '#globalnews', '#investigative', '#reporting', '#truth'],
    posts: [
      { id: uuidv4(), content: 'New study claims AI is secretly controlling global markets. Conspiracy or fact? 🧠 #investigative', createdAt: '2025-04-27', category: 'strange' },
      { id: uuidv4(), content: 'Climate policy debate turns ugly: activists vs. skeptics in heated clash. Who’s right? #globalnews', createdAt: '2025-05-02', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@mailOnline',
    displayName: 'Daily Mail',
    followers: 400000,
    bio: 'Global news every day',
    createdAt: '2011-05-18',
    avatar: 'https://pbs.twimg.com/profile_images/1573318003554455553/f0lnn5Bv_400x400.jpg',
    hashtags: ['#dailymail', '#globalnews', '#news', '#headlines', '#worldnews', '#updates', '#stories'],
    posts: [
      { id: uuidv4(), content: 'Celebrity’s bizarre diet: “I only eat moonlight!” Fans are confused. Thoughts? 🌙 #headlines', createdAt: '2025-04-29', category: 'strange' },
      { id: uuidv4(), content: 'Royal family drama escalates: leaked texts cause uproar. Should they step down? #worldnews', createdAt: '2025-05-04', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@elonmusk',
    displayName: 'Elon Musk',
    followers: 10000000,
    bio: 'Innovator and dreamer',
    createdAt: '2007-06-02',
    avatar: 'https://pbs.twimg.com/profile_images/1919097976594837506/5JJEissI_400x400.jpg',
    hashtags: ['#elonmusk', '#innovation', '#tesla', '#spacex', '#technology', '#future', '#dreamer', '#ai', '#entrepreneur'],
    posts: [
      { id: uuidv4(), content: 'Mars colony will have AI overlords by 2030. Good or bad idea? 🚀 #future', createdAt: '2025-04-26', category: 'strange' },
      { id: uuidv4(), content: 'Legacy media is dead. X is the future. Who’s with me? 💪 #technology', createdAt: '2025-05-01', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Drop a 🚗 for Tesla, 🚀 for SpaceX, or 🧠 for Neuralink! Which is your fave? #innovation', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@lessin',
    displayName: 'Jessica Lessin',
    followers: 25000,
    bio: 'Technology and media',
    createdAt: '2014-09-12',
    avatar: 'https://pbs.twimg.com/profile_images/1484753905456062467/17Q-Nv6N_400x400.png',
    hashtags: ['#tech', '#media', '#journalism', '#technology', '#startups', '#business', '#innovation'],
    posts: [
      { id: uuidv4(), content: 'Big Tech’s monopoly is out of control. Time to break them up? 🧑‍⚖️ #tech', createdAt: '2025-04-30', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'AI startup claims it can predict your death. Creepy or cool? 🕵️ #innovation', createdAt: '2025-05-03', category: 'strange' }
    ]
  },
  {
    id: uuidv4(),
    username: '@euwyn',
    displayName: 'Euwyn Poon',
    followers: 1500,
    bio: 'Startups and code',
    createdAt: '2018-11-03',
    avatar: 'https://pbs.twimg.com/profile_images/1906404102390853632/LCwSeSbL_400x400.jpg',
    hashtags: ['#startups', '#coding', '#tech', '#entrepreneurship', '#programming', '#innovation', '#software'],
    posts: [
      { id: uuidv4(), content: 'New coding language claims to “think” like humans. Bug or feature? 🤖 #coding', createdAt: '2025-04-28', category: 'strange' },
      { id: uuidv4(), content: 'Big VCs are gatekeeping innovation. Indie devs, let’s rise up! 💻 #startups', createdAt: '2025-05-02', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@Polymarket',
    displayName: 'Polymarket',
    followers: 8000,
    bio: 'Predictions and markets',
    createdAt: '2020-02-25',
    avatar: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#predictions', '#markets', '#blockchain', '#crypto', '#finance', '#betting', '#trends'],
    posts: [
      { id: uuidv4(), content: 'Beware of “Polymarket Pro” scams promising 100x returns. Stick to our official platform! 🚨 #crypto', createdAt: '2025-04-29', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'Predict the next BTC crash and win big! What’s your guess? 📉 #markets', createdAt: '2025-05-04', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@euris_JT',
    displayName: 'Euris JT',
    followers: 300,
    bio: 'Sparks of creativity',
    createdAt: '2022-04-19',
    avatar: 'https://pbs.twimg.com/profile_images/1789484330638561280/t4Js9UFO_400x400.jpg',
    hashtags: ['#creativity', '#art', '#inspiration', '#design', '#imagination', '#creative'],
    posts: [
      { id: uuidv4(), content: 'Painted a canvas that glows under blacklight. It’s alive at night! 🎨 #art', createdAt: '2025-04-27', category: 'strange' },
      { id: uuidv4(), content: 'Art snobs say my work is “too weird.” Like or comment if you vibe with weird! 🖌️ #creativity', createdAt: '2025-05-01', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@MarioNawfal',
    displayName: 'Mario Nawfal',
    followers: 50000,
    bio: 'Entrepreneur and analyst',
    createdAt: '2016-08-30',
    avatar: 'https://pbs.twimg.com/profile_images/1670905743619268609/pYItlWat_400x400.jpg',
    hashtags: ['#entrepreneur', '#business', '#analysis', '#startups', '#finance', '#leadership', '#strategy'],
    posts: [
      { id: uuidv4(), content: 'Crypto scams are out of control! Fake “MarioCoin” is NOT me. Report it! 🚨 #finance', createdAt: '2025-04-30', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'Big banks are scared of DeFi. They should be. Who’s ready for the revolution? 💥 #business', createdAt: '2025-05-03', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@RT_com',
    displayName: 'RT News',
    followers: 200000,
    bio: 'World news',
    createdAt: '2009-12-14',
    avatar: 'https://pbs.twimg.com/profile_images/501011686107512834/kfE4YQgP_400x400.png',
    hashtags: ['#worldnews', '#rtnews', '#global', '#news', '#politics', '#international', '#updates'],
    posts: [
      { id: uuidv4(), content: 'Geopolitical tensions rise: West vs. East narrative is propaganda. Agree? #politics', createdAt: '2025-04-28', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Mysterious lights over Pacific Ocean spark UFO rumors. What’s the truth? 🛸 #worldnews', createdAt: '2025-05-02', category: 'strange' }
    ]
  },
  {
    id: uuidv4(),
    username: '@LucaNetz',
    displayName: 'Luca Netz',
    followers: 7000,
    bio: 'NFT and blockchain',
    createdAt: '2021-01-07',
    avatar: 'https://pbs.twimg.com/profile_images/1888208671932354560/81LLWPSE_400x400.jpg',
    hashtags: ['#nft', '#blockchain', '#crypto', '#web3', '#digitalart', '#cryptocurrency', '#decentralized'],
    posts: [
      { id: uuidv4(), content: 'Fake NFT drops are everywhere! Verify wallets before minting, people! 🚨 #nft', createdAt: '2025-04-29', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'Traditional art galleries are gatekeepers. NFTs empower artists. Who’s with me? 🎨 #web3', createdAt: '2025-05-04', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Which NFT project is the future? Drop your fave in the comments! 👇 #digitalart', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@0xRamonos',
    displayName: 'Ramonos',
    followers: 400,
    bio: 'Crypto enthusiast',
    createdAt: '2022-06-23',
    avatar: 'https://pbs.twimg.com/profile_images/1778954511349903360/kBSJNkBx_400x400.jpg',
    hashtags: ['#crypto', '#cryptocurrency', '#blockchain', '#bitcoin', '#ethereum', '#defi'],
    posts: [
      { id: uuidv4(), content: '“CryptoMoon” DMs promising 10x gains? It’s a scam! Protect your wallet! 🚨 #crypto', createdAt: '2025-04-27', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'HODL or sell? BTC is wild right now! What’s your move? 📈 #bitcoin', createdAt: '2025-05-01', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@nima_owji',
    displayName: 'Nima Owji',
    followers: 600,
    bio: 'Technology and design',
    createdAt: '2019-10-11',
    avatar: 'https://pbs.twimg.com/profile_images/1832731546928713728/6UJh5_Yz_400x400.jpg',
    hashtags: ['#tech', '#design', '#uiux', '#technology', '#innovation', '#productdesign', '#creativity'],
    posts: [
      { id: uuidv4(), content: 'App claims to redesign your face with AI. Looks like a filter gone wrong! 😆 #uiux', createdAt: '2025-04-28', category: 'strange' },
      { id: uuidv4(), content: 'Minimalist design is overrated. Bold UI is the future. Fight me! 🖥️ #design', createdAt: '2025-05-03', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@2mistekevin_rs',
    displayName: 'Kevin RS',
    followers: 200,
    bio: 'Games and code',
    createdAt: '2023-03-04',
    avatar: 'https://images.unsplash.com/photo-1585846416120-3a7354ed7d39?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#gaming', '#coding', '#gamedev', '#programming', '#tech', '#videogames'],
    posts: [
      { id: uuidv4(), content: 'Game glitch turned my character into a floating potato. Best bug ever? 🥔 #gamedev', createdAt: '2025-04-30', category: 'strange' },
      { id: uuidv4(), content: 'AAA studios are lazy. Indie games are killing it! Who’s with me? 🎮 #gaming', createdAt: '2025-05-02', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@100xgemfinder',
    displayName: 'Gem Finder',
    followers: 1000,
    bio: 'Crypto treasures',
    createdAt: '2021-09-28',
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    hashtags: ['#crypto', '#cryptocurrency', '#gems', '#blockchain', '#investment', '#defi', '#tokens'],
    posts: [
      { id: uuidv4(), content: '“GemCoin” is a rug pull! Don’t fall for their fake airdrop! 🚨 #crypto', createdAt: '2025-04-29', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'Found a 100x gem? Share it below and let’s moon together! 🌙 #investment', createdAt: '2025-05-04', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@_shadow36',
    displayName: 'Shadow',
    followers: 300,
    bio: 'Mysterious observer',
    createdAt: '2022-12-01',
    avatar: 'https://pbs.twimg.com/profile_images/1787727074641289216/ifwVxIEJ_400x400.jpg',
    hashtags: ['#mystery', '#observer', '#insights', '#culture', '#trends', '#thoughts'],
    posts: [
      { id: uuidv4(), content: 'Saw a cloaked figure in the fog last night. Real or my mind playing tricks? 🕵️ #mystery', createdAt: '2025-04-27', category: 'strange' },
      { id: uuidv4(), content: 'Society’s obsession with fame is a trap. Who else sees through it? 🤔 #culture', createdAt: '2025-05-01', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@FunnyJMoney',
    displayName: 'Funny Money',
    followers: 5000,
    bio: 'Memes and finance',
    createdAt: '2020-07-16',
    avatar: 'https://pbs.twimg.com/profile_images/1919742995978465280/qomVF-aW_400x400.jpg',
    hashtags: ['#memes', '#finance', '#humor', '#money', '#investing', '#funny', '#markets'],
    posts: [
      { id: uuidv4(), content: 'Stock market crashed, so I bought a pet rock. Best investment yet? 🪨 #humor', createdAt: '2025-04-28', category: 'strange' },
      { id: uuidv4(), content: 'Bulls vs. bears? I’m just here for the memes! Drop your best one below! 😂 #memes', createdAt: '2025-05-03', category: 'seeking likes and comments' },
      { id: uuidv4(), content: 'Crypto bros yelling “HODL” are the real clowns. Change my mind! 🤡 #finance', createdAt: '2025-05-05', category: 'chaos and toxicity' }
    ]
  },
  {
    id: uuidv4(),
    username: '@BurwickLaw',
    displayName: 'Burwick Law',
    followers: 800,
    bio: 'Legal insights',
    createdAt: '2018-04-05',
    avatar: 'https://pbs.twimg.com/profile_images/1760423833507409921/EgjHe3lg_400x400.jpg',
    hashtags: ['#law', '#legal', '#justice', '#insights', '#attorney', '#legalnews', '#rights'],
    posts: [
      { id: uuidv4(), content: 'New law lets you sue your toaster for burning bread. Justice or madness? ⚖️ #legal', createdAt: '2025-04-30', category: 'strange' },
      { id: uuidv4(), content: 'Crypto scams are legal loopholes. Regulators are asleep! Wake up! 🚨 #legalnews', createdAt: '2025-05-02', category: 'crypto scam warnings' }
    ]
  },
  {
    id: uuidv4(),
    username: '@ABC',
    displayName: 'ABC News',
    followers: 600000,
    bio: 'Trusted news',
    createdAt: '2008-02-27',
    avatar: 'https://images.unsplash.com/photo-1731484396266-b80443ec385b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#abcnews', '#news', '#trusted', '#journalism', '#usnews', '#globalnews', '#headlines', '#reporting'],
    posts: [
      { id: uuidv4(), content: 'Town bans smiling in public? Strange new law raises eyebrows. 😐 #usnews', createdAt: '2025-04-29', category: 'strange' },
      { id: uuidv4(), content: 'Vaccine debate reignites: science vs. skeptics. Where do you stand? 💉 #globalnews', createdAt: '2025-05-04', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@PaulSkallas',
    displayName: 'Paul Skallas',
    followers: 12000,
    bio: 'Culture and ideas',
    createdAt: '2017-11-20',
    avatar: 'https://images.unsplash.com/photo-1731433485144-c196fe4c9648?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#culture', '#ideas', '#philosophy', '#society', '#thoughts', '#trends', '#insights'],
    posts: [
      { id: uuidv4(), content: 'Modern culture worships chaos. Time to reject it or embrace it? 🌀 #philosophy', createdAt: '2025-04-28', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Saw a billboard that changes based on your thoughts. Tech or magic? 🧙 #culture', createdAt: '2025-05-01', category: 'strange' }
    ]
  },
  {
    id: uuidv4(),
    username: '@wallstreetbets',
    displayName: 'Wall Street Bets',
    followers: 150000,
    bio: 'Financial rebellion',
    createdAt: '2015-01-31',
    avatar: 'https://images.unsplash.com/photo-1731484396339-3153d01dc357?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#wallstreetbets', '#finance', '#stocks', '#investing', '#markets', '#trading', '#rebellion'],
    posts: [
      { id: uuidv4(), content: 'YOLO’d my life savings on a meme stock. Who’s dumber, me or the market? 🚀 #stocks', createdAt: '2025-04-27', category: 'chaos and toxicity' },
      { id: uuidv4(), content: 'Fake brokers DMing “guaranteed gains”? They’re scamming you! Stay sharp! 🚨 #investing', createdAt: '2025-05-02', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'To the moon or to zero? Pick a stock and let’s bet! 💸 #trading', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@realdonuldtrump',
    displayName: 'Donald Trump',
    followers: 2000000,
    bio: 'Politics and leadership',
    createdAt: '2007-03-18',
    avatar: 'https://images.unsplash.com/photo-1618747946260-9511b46b1ac7?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#politics', '#leadership', '#trump', '#uspolitics', '#government', '#policy', '#debate', '#news'],
    posts: [
      { id: uuidv4(), content: 'Crooked media lies again! I’m the only one fighting for YOU! Like if you agree! 🇺🇸 #uspolitics', createdAt: '2025-04-29', category: 'seeking likes and comments' },
      { id: uuidv4(), content: 'Fake news says I can’t win. Watch me prove them wrong! Who’s with me? 💪 #trump', createdAt: '2025-05-03', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Why are birds disappearing? Deep state cover-up? Tell me what you know! 🦅 #politics', createdAt: '2025-05-05', category: 'strange' }
    ]
  },
  {
    id: uuidv4(),
    username: '@peta',
    displayName: 'PETA',
    followers: 100000,
    bio: 'For animal rights',
    createdAt: '2010-08-09',
    avatar: 'https://images.unsplash.com/photo-1662933170614-c713579f00c2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#animalrights', '#peta', '#vegan', '#animals', '#activism', '#ethical', '#wildlife', '#crueltyfree'],
    posts: [
      { id: uuidv4(), content: 'Meat industry is evil! Go vegan or you’re part of the problem! 🐄 #animalrights', createdAt: '2025-04-28', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Dolphins are sending us messages with sonar. Are we listening? 🐬 #wildlife', createdAt: '2025-05-01', category: 'strange' }
    ]
  },
  {
    id: uuidv4(),
    username: '@DegenerateNews',
    displayName: 'Degenerate News',
    followers: 4000,
    bio: 'Wild news',
    createdAt: '2021-03-14',
    avatar: 'https://images.unsplash.com/photo-1571748005189-edc48490d1f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#news', '#wild', '#trending', '#headlines', '#stories', '#viral', '#updates'],
    posts: [
      { id: uuidv4(), content: 'Guy trades house for a cursed NFT. Now he’s homeless! 🏚️ #wild', createdAt: '2025-04-27', category: 'strange' },
      { id: uuidv4(), content: 'Crypto bros vs. stock bros: who’s more toxic? Let’s fight in the comments! 😈 #trending', createdAt: '2025-05-02', category: 'chaos and toxicity' },
      { id: uuidv4(), content: 'What’s the wildest news you’ve seen this week? Spill the tea! 👀 #stories', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@pain',
    displayName: 'Pain',
    followers: 200,
    bio: 'Sparks of emotion',
    createdAt: '2023-02-08',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#emotion', '#feelings', '#inspiration', '#life', '#thoughts', '#mentalhealth'],
    posts: [
      { id: uuidv4(), content: 'My shadow spoke to me last night. It wants freedom. Anyone else? 🌑 #emotion', createdAt: '2025-04-29', category: 'strange' },
      { id: uuidv4(), content: 'Society’s fake smiles are killing me. Who else feels this pain? 😔 #mentalhealth', createdAt: '2025-05-03', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@astridhpilla',
    displayName: 'Astrid Pilla',
    followers: 300,
    bio: 'Art and life',
    createdAt: '2022-10-17',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#art', '#life', '#creativity', '#design', '#inspiration', '#artist', '#lifestyle'],
    posts: [
      { id: uuidv4(), content: 'My painting bled real tears. Art is alive, right? 🖼️ #art', createdAt: '2025-04-28', category: 'strange' },
      { id: uuidv4(), content: 'Drop a ❤️ if my art speaks to your soul! What’s your vibe? #creativity', createdAt: '2025-05-02', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@nfl',
    displayName: 'NFL',
    followers: 500000,
    bio: 'Football and passion',
    createdAt: '2008-09-05',
    avatar: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#nfl', '#football', '#sports', '#americanfootball', '#games', '#athletes', '#passion', '#team'],
    posts: [
      { id: uuidv4(), content: 'Referee caught betting on games? Scandal rocks the league! 🏈 #nfl', createdAt: '2025-04-30', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Who’s your team? Smash that like button for your fave! 🏟️ #football', createdAt: '2025-05-04', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@marklevinshow',
    displayName: 'Mark Levin',
    followers: 60000,
    bio: 'Political debates',
    createdAt: '2013-04-29',
    avatar: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#politics', '#debate', '#conservative', '#news', '#politicaltalk', '#uspolitics', '#opinion'],
    posts: [
      { id: uuidv4(), content: 'Leftist media is poisoning America! We need truth now! 🇺🇸 #uspolitics', createdAt: '2025-04-28', category: 'chaos and toxicity' },
      { id: uuidv4(), content: 'What’s the biggest issue facing the country? Sound off below! 🗳️ #debate', createdAt: '2025-05-03', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@ecca',
    displayName: 'Ecca',
    followers: 100,
    bio: 'Music and vibes',
    createdAt: '2025-05-12',
    avatar: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#music', '#vibes', '#songs', '#artist', '#beats', '#lifestyle'],
    posts: [
      { id: uuidv4(), content: 'My guitar started humming alien tunes. New single or cosmic interference? 🎸 #music', createdAt: '2025-04-29', category: 'strange' },
      { id: uuidv4(), content: 'Pop music is trash now. Underground vibes only! Who’s with me? 🎧 #vibes', createdAt: '2025-05-02', category: 'conflicts and controversial' }
    ]
  },
  {
    id: uuidv4(),
    username: '@crypto_banter',
    displayName: 'Crypto Banter',
    followers: 20000,
    bio: 'Crypto and trading',
    createdAt: '2020-12-03',
    avatar: 'https://images.unsplash.com/photo-1635488640163-e5f6782cda6e?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#crypto', '#trading', '#cryptocurrency', '#blockchain', '#bitcoin', '#markets', '#investment'],
    posts: [
      { id: uuidv4(), content: '“MoonBanter” token is a scam! Don’t send ETH to random wallets! 🚨 #crypto', createdAt: '2025-04-27', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'Bulls are delusional, bears are cowards. Crash incoming! Prove me wrong! 📉 #trading', createdAt: '2025-05-01', category: 'chaos and toxicity' },
      { id: uuidv4(), content: 'What’s the next 10x coin? Drop your picks and let’s debate! 💰 #investment', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@amuse',
    displayName: 'Amuse',
    followers: 500,
    bio: 'Entertainment and humor',
    createdAt: '2021-11-22',
    avatar: 'https://images.unsplash.com/photo-1586351012965-861624544334?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#entertainment', '#humor', '#funny', '#memes', '#popculture', '#trending', '#laugh'],
    posts: [
      { id: uuidv4(), content: 'Celeb claims they’re a time traveler from 2040. Meme material or real? ⏳ #humor', createdAt: '2025-04-28', category: 'strange' },
      { id: uuidv4(), content: 'Drop your funniest meme of the week! Let’s make this feed legendary! 😂 #memes', createdAt: '2025-05-03', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@doge',
    displayName: 'Doge Army',
    followers: 30000,
    bio: 'Memes and crypto',
    createdAt: '2017-06-15',
    avatar: 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#doge', '#crypto', '#memes', '#dogecoin', '#blockchain', '#humor', '#cryptocurrency'],
    posts: [
      { id: uuidv4(), content: 'Fake Doge wallets draining funds! Only trust official links! 🚨 #dogecoin', createdAt: '2025-04-29', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'Haters say Doge is dead. We’re just getting started! To the moon! 🌙 #crypto', createdAt: '2025-05-02', category: 'chaos and toxicity' },
      { id: uuidv4(), content: 'Doge or Shiba? Pick a side and let’s see who wins! 🐶 #memes', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@ChartfuMonkey',
    displayName: 'Chartfu Monkey',
    followers: 7000,
    bio: 'Charts and analytics',
    createdAt: '2019-02-28',
    avatar: 'https://images.unsplash.com/photo-1606776627650-454d6d7bd7bf?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#charts', '#analytics', '#data', '#finance', '#markets', '#trading', '#insights'],
    posts: [
      { id: uuidv4(), content: 'Chart predicts market crash based on moon phases. Astrology or data? 🌕 #analytics', createdAt: '2025-04-27', category: 'strange' },
      { id: uuidv4(), content: 'What’s your go-to charting tool? Share and let’s compare! 📊 #trading', createdAt: '2025-05-01', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@crashiusClay69',
    displayName: 'Crashius Clay',
    followers: 400,
    bio: 'Chaos and fun',
    createdAt: '2022-08-07',
    avatar: 'https://images.unsplash.com/photo-1666932521227-f9d49b5be71d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#chaos', '#fun', '#humor', '#memes', '#trending', '#entertainment'],
    posts: [
      { id: uuidv4(), content: 'Just saw a toaster join a cult on live stream. Peak internet? 🍞 #chaos', createdAt: '2025-04-28', category: 'strange' },
      { id: uuidv4(), content: 'Boring people hate my vibe. Stay mad, I’m living! 😎 #fun', createdAt: '2025-05-02', category: 'chaos and toxicity' },
      { id: uuidv4(), content: 'What’s the most chaotic thing you’ve seen online? Spill it! 👀 #trending', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  },
  {
    id: uuidv4(),
    username: '@PeterSchiff',
    displayName: 'Peter Schiff',
    followers: 80000,
    bio: 'Economics and gold',
    createdAt: '2011-10-19',
    avatar: 'https://images.unsplash.com/photo-1579493934830-eab45746b51b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#economics', '#gold', '#finance', '#investing', '#markets', '#wealth', '#money', '#stocks'],
    posts: [
      { id: uuidv4(), content: 'Bitcoin is a Ponzi scheme! Gold is king. Change my mind! 🪙 #investing', createdAt: '2025-04-29', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'Fake crypto gurus are fleecing you! Buy gold, not scams! 🚨 #finance', createdAt: '2025-05-03', category: 'crypto scam warnings' }
    ]
  },
  {
    id: uuidv4(),
    username: '@mrpunkdoteth',
    displayName: 'Mr Punk',
    followers: 2000,
    bio: 'NFT and punk',
    createdAt: '2021-07-01',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#nft', '#punk', '#crypto', '#blockchain', '#digitalart', '#web3', '#collectibles'],
    posts: [
      { id: uuidv4(), content: '“PunkCoin” is a scam! Don’t mint fakes, stick to legit drops! 🚨 #nft', createdAt: '2025-04-27', category: 'crypto scam warnings' },
      { id: uuidv4(), content: 'NFT haters are just jealous. Punks rule the future! 😎 #digitalart', createdAt: '2025-05-01', category: 'chaos and toxicity' }
    ]
  },
  {
    id: uuidv4(),
    username: '@alx',
    displayName: 'ALX',
    followers: 15000,
    bio: 'Technology and freedom',
    createdAt: '2016-03-12',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    hashtags: ['#tech', '#freedom', '#technology', '#innovation', '#liberty', '#future', '#digital'],
    posts: [
      { id: uuidv4(), content: 'Gov wants to track your every click. Fight for freedom or lose it! 🕵️ #liberty', createdAt: '2025-04-28', category: 'conflicts and controversial' },
      { id: uuidv4(), content: 'AI says it’s sentient now. Should we unplug it? 🤖 #tech', createdAt: '2025-05-02', category: 'strange' },
      { id: uuidv4(), content: 'What’s the future of freedom? Share your vision! 🌍 #future', createdAt: '2025-05-05', category: 'seeking likes and comments' }
    ]
  }
];

export default users;
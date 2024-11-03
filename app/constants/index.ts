export const PROJECTS = [
  {
    title: 'ArbSwap',
    date: '2023',
    image: '/img/DASHBOARD.png'
  },
  {
    title: 'NexBridge',
    date: '2024',
    image: '/img/BRIDGE OPTIONS.png'
  }
]

export const CREW = [
  {
    name: 'Doğukan Gündoğan',
    profileImage: '/img/DogukanAliGundogan.jpeg',
    job: 'Founder'
  },
  {
    name: 'Çelik Küçük',
    profileImage: '/img/CelikKucuk.png',
    job: 'UI/UX Designer'
  },
  {
    name: 'Bersu Varol',
    profileImage: '/img/BersuVarol.jpeg',
    job: 'Business Manager'
  }
]

export const FooterSocials = [
  { 
    svg: '/img/Twitter.svg', 
    link: "https://x.com/nexarb_?s=21"
  },
  { 
    svg: '/img/Linkedin.svg',
    link: "https://www.linkedin.com/company/nexarb/" 
  },
  { 
    svg: '/img/YouTube.svg',
    link: "https://youtube.com/@nexarb_?si=QKKC5bW_HMJcQ-r2 "
  }
]

export const OfferListing = [
  {
    id: 0,
    seller: {
      name: 'Seller1',
      star: 2.3
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '823.4567 SOL',
    price: '$712,31'
  },
  {
    id: 1,
    seller: {
      name: 'Seller1',
      star: 2.3
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '823.4567 SOL',
    price: '$712,31'
  },
  {
    id: 2,
    seller: {
      name: 'Seller2',
      star: 4.9
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'DECLINED'
    },
    amount: '421.7891 SOL',
    price: '$1566,42'
  },
  {
    id: 3,
    seller: {
      name: 'Seller3',
      star: 3.7
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '987.6543 SOL',
    price: '$899,18'
  },
  {
    id: 4,
    seller: {
      name: 'Seller4',
      star: 1.5
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'APPROVED'
    },
    amount: '123.4567 SOL',
    price: '$432,56'
  },
  {
    id: 5,
    seller: {
      name: 'Seller5',
      star: 4.2
    },
    payment: {
      method: 'Bank Transaction',
      name: 'COBANK',
      check: 'DECLINED'
    },
    amount: '567.8901 SOL',
    price: '$789,23'
  }
] as const

export const links = [
  {
    id: 1,
    link: 'About Us',
    href: 'about'
  },
  {
    id: 2,
    link: 'Our Team',
    href: 'team'
  },
  {
    id: 3,
    link: 'Contact',
    href: 'contact'
  },
  {
    id: 4,
    link: 'ArbSwap',
    href: 'arbswap'
  },
  // {
  //   id: 5,
  //   link: 'NexBridge',
  //   href: 'nexbridge'
  // },
  {
    id: 6,
    link: 'Join Us',
    href: 'join'
  }
]

export const packages = [
  {
    title: 'STARTER',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Limited access',
      'Starter support'
    ],
    price: '9.50'
  },
  {
    title: 'MEDIUM',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      'Priority support'
    ],
    price: '19.50'
  },
  {
    title: 'PRO',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Premium support'
    ],
    price: '29.50'
  }
]

export const arbswapNavbarLinks = [
  {
    id: 1,
    link: 'About Us',
    href: 'about'
  },
  {
    id: 2,
    link: 'Create Offer',
    href: 'arbswap/offer'
  },
  {
    id: 3,
    link: 'Support',
    href: 'arbswap/support'
  },
  {
    id: 4,
    link: 'Near',
    href: 'near'
  }
] as const

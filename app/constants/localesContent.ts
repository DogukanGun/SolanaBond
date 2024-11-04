import {
  About,
  ArbSwapFooter,
  ArbSwapHome,
  ArbswapNavbar,
  Footer,
  ForgotPassword,
  Home,
  JoxHome,
  JoxNavbar,
  Login,
  Navbar,
  NexBridgeDashboard,
  NexBridgeHome,
  NexBridgeNavbar,
  Register,
  RegisterWallet,
  UnderConstruction
} from '@/types/locales'

export const arbswapNavbarDictionary: Record<string, ArbswapNavbar> = {
  en: {
    aboutUs: 'About Us',
    createOffer: 'Create Offer',
    wallet: 'Wallet',
    support: 'Support',
    login: 'Login',
    walletConnected: 'Wallet Connected',
    goToDashboard: 'Go to Dashboard'
  },
  tr: {
    aboutUs: 'Hakkımızda',
    createOffer: 'Teklif Oluştur',
    wallet: 'Wallet',
    support: 'Destek',
    login: 'Giriş Yap',
    walletConnected: 'Wallet Bağlandı',
    goToDashboard: 'Kontrol paneline git'
  },
  de: {
    aboutUs: 'Über Uns',
    createOffer: 'Angebot erstellen',
    wallet: 'Wallet',
    support: 'Unterstützung',
    login: 'Anmeldung',
    walletConnected: 'Wallet verbunden',
    goToDashboard: 'Zum Dashboard'
  }
}

export const joxNavbarDictionary: Record<string, JoxNavbar> = {
  en: {
    aboutUs: 'About Us',
    findJob: 'See Job',
    wallet: 'Wallet',
    support: 'Support',
    login: 'Login',
    walletConnected: 'Wallet Connected',
    goToDashboard: 'Go to Dashboard'
  },
  tr: {
    aboutUs: 'Hakkımızda',
    findJob: 'Isleri gor',
    wallet: 'Wallet',
    support: 'Destek',
    login: 'Giriş Yap',
    walletConnected: 'Wallet Bağlandı',
    goToDashboard: 'Kontrol paneline git'
  },
  de: {
    aboutUs: 'Über Uns',
    findJob: 'Sehen Angebote',
    wallet: 'Wallet',
    support: 'Unterstützung',
    login: 'Anmeldung',
    walletConnected: 'Wallet verbunden',
    goToDashboard: 'Zum Dashboard'
  }
}

export const nexBridgeNavbarDictionary: Record<string, NexBridgeNavbar> = {
  en: {
    home: 'Home',
    connectWallet: 'Connect Wallet',
    pricing: 'Pricing',
    dashboard: 'Dashboard'
  },
  tr: {
    home: 'Ana Sayfa',
    connectWallet: 'Wallet Bağla',
    pricing: 'Fiyatlandırma',
    dashboard: 'Kontrol Paneli'
  },
  de: {
    home: 'Startseite',
    connectWallet: 'Wallet Verbinden',
    pricing: 'Preisgestaltung',
    dashboard: 'Armaturenbrett'
  }
}

export const navbarDictionary: Record<string, Navbar> = {
  en: {
    aboutUs: 'About Us',
    ourTeam: 'Our Team',
    contact: 'Contact',
    joinUs: 'Join Us'
  },
  tr: {
    aboutUs: 'Hakkımızda',
    ourTeam: 'Ekibimiz',
    contact: 'İletişim',
    joinUs: 'Bize Katılın'
  },
  de: {
    aboutUs: 'Über Uns',
    ourTeam: 'Unser Team',
    contact: 'Kommunikation',
    joinUs: 'Begleiten Sie Uns'
  }
}

export const aboutPageDictionary: Record<string, About> = {
  en: {
    aboutNexarb: 'About NexArb',
    description:
      'NexArb is an innovative startup project located in Germany, specializing in the blockchain domain. With its two products, ArbSwap and NexBridge, NexArb aims to make trading with Blockchain technology process much easier, safer and more comfortable.',
    manyUsefulComponents: 'Secure Transfer',
    manyUsefulComponentsDesc:
      'Our main product, ArbSwap, enables swift and secure P2P Swaps between the Solana and Ethereum networks at minimal fees.',
    responsiveLayout: 'Seamless Swaps',
    responsiveLayoutDesc:
      'Our second offering, NexBridge, facilitates the smooth transfer of assets across Near and other chains.',
    retinaReady: 'Easy Transactions',
    retinaReadyDesc:
      'Our platforms, ArbSwap and NexBridge, let you trade and transfer across blockchain networks quickly and securely without the hassle.'
  },
  tr: {
    aboutNexarb: 'NexArb Hakkında',
    description:
      "NexArb, Almanya'da bulunan ve blockchain alanında uzmanlaşmış yenilikçi bir başlangıç ​​projesidir. NexArb, ArbSwap ve NexBridge adlı iki ürünüyle Blockchain teknolojisiyle alım satım sürecini çok daha kolay, güvenli ve konforlu hale getirmeyi hedefliyor.",
    manyUsefulComponents: 'Güvenli Transfer',
    manyUsefulComponentsDesc:
      "Ana ürünümüz ArbSwap, Solana ve Ethereum ağları arasında minimum ücretle hızlı ve güvenli P2P Swap'lara olanak tanır.",
    responsiveLayout: 'Kesintisiz Takaslar',
    responsiveLayoutDesc:
      'İkinci teklifimiz NexBridge, varlıkların Near ve diğer zincirler arasında sorunsuz şekilde aktarılmasını kolaylaştırır.',
    retinaReady: 'Kolay İşlemler',
    retinaReadyDesc:
      'Platformlarımız ArbSwap ve NexBridge, blockchain ağları arasında sorunsuz ve hızlı bir şekilde işlem yapmanıza ve aktarım yapmanıza olanak tanır.'
  },
  de: {
    aboutNexarb: 'Über NexArb',
    description:
      'Zu den Vorteilen zählen die hervorragende Klangqualität und die Tatsache, dass keine Batterien erforderlich sind. Gamer bevorzugen häufig kabelgebundene Kopfhörer, sodass sie sich nie Sorgen machen müssen, dass die Batterien mitten in einem hitzigen Spiel leer werden.',
    manyUsefulComponents: 'Sichere Übertragung',
    manyUsefulComponentsDesc:
      'Unser Hauptprodukt ArbSwap ermöglicht schnelle und sichere P2P-Swaps zwischen den Netzwerken Solana und Ethereum zu minimalen Gebühren.',
    responsiveLayout: 'Nahtlose Swaps',
    responsiveLayoutDesc:
      'Unser zweites Angebot, NexBridge, erleichtert die reibungslose Übertragung von Vermögenswerten zwischen Near- und anderen Ketten.',
    retinaReady: 'Einfache Transaktionen',
    retinaReadyDesc:
      'Mit unseren Plattformen ArbSwap und NexBridge können Sie schnell, sicher und problemlos über Blockchain-Netzwerke handeln und übertragen.'
  }
}

export const joxHomeDictionary: Record<string, JoxHome> = {
  en: {
    introHeader: 'Fastest & secure transfer Solana',
    introDescription:
      'Join our peer-to-peer trading platform and use the fastest and most secure payment method for buying and selling Solana with users just like you.',
    getStarted: 'Get Started'
  },
  tr: {
    introHeader: 'En hızlı & güvenli transfer Solana',
    introDescription:
      'Peer-to-peer ticaret platformumuza katılın ve sizin gibi Solana alan ve satan kullanıcılarla en hızlı ve en güvenli ödeme yöntemini kullanın.',
    getStarted: 'Başlayın',
  },
  de: {
    introHeader: 'Schnellster und sicherer Transfer Solana',
    introDescription:
      'Treten Sie unserer Peer-to-Peer-Handelsplattform bei und nutzen Sie die schnellste und sicherste Zahlungsmethode für den Kauf und Verkauf von Solana mit Benutzern wie Ihnen.',
    getStarted: 'Loslegen',
  }
}

export const arbSwapHomeDictionary: Record<string, ArbSwapHome> = {
  en: {
    introHeader: 'Fastest & secure transfer Solana',
    introDescription:
      'Join our peer-to-peer trading platform and use the fastest and most secure payment method for buying and selling Solana with users just like you.',
    getStarted: 'Get Started',
    buySOL: 'Buy SOL',
    sellSOL: 'Sell SOL',
    amount: 'Amount',
    searchForOffers: 'Search For Offers',
    exchangeRates: 'Exchange Rates',
    userWorldwide: 'User worldwide',
    countrySupported: 'Country Supported',
    cryptoTransactions: 'Crypto Transactions',
    assetsOnPlatform: 'Assets on Platform',
    sendAndRecieve: 'SEND AND RECEIVE',
    sendAndRecieveDesc: 'Easily send and recieve Solana from everywhere',
    stepsHeader: 'Simple steps to get started',
    quickSignUp: 'Quick sign-up',
    quickSignUpDesc: "It'll take you 1 minutes top",
    securitySetup: 'Security setup',
    connectWallet: 'Connect Wallet',
    startTrading: 'Start Trading',
    startTradingDesc: 'Start trading at your desired rate, and get paid.',
    solanaWorld: 'Get ready to explore the Solana world',
    solanaWorldDescription:
      'Join NexArb to get the latest news and start trading now.',
    signUpNow: 'Sign Up Now',
    confidentiality: 'Confidentiality',
    confidentialityDesc:
      'We do not store personal data on our servers and never transfer it to third parties.'
  },
  tr: {
    introHeader: 'En hızlı & güvenli transfer Solana',
    introDescription:
      'Peer-to-peer ticaret platformumuza katılın ve sizin gibi Solana alan ve satan kullanıcılarla en hızlı ve en güvenli ödeme yöntemini kullanın.',
    getStarted: 'Başlayın',
    buySOL: 'SOL Al',
    sellSOL: 'SOL Sat',
    amount: 'Miktar',
    searchForOffers: 'Teklifleri Ara',
    exchangeRates: 'Kur Oranları',
    userWorldwide: 'Dünya çapında kullanıcı',
    countrySupported: 'Ülke Destekli',
    cryptoTransactions: 'Crypto İşlemleri',
    assetsOnPlatform: 'Platformdaki Varlıklar',
    sendAndRecieve: 'GÖNDER VE AL',
    sendAndRecieveDesc: 'Her yerden kolaylıkla Solana gönderin ve alın',
    stepsHeader: 'Başlamak için kolay adımlar',
    quickSignUp: 'Hızlı kayıt olma',
    quickSignUpDesc: 'En fazla 1 dakikanızı alacaktır',
    securitySetup: 'Güvenlik kurulumu',
    connectWallet: 'Wallet Bağlama',
    startTrading: 'Ticarete Başlama',
    startTradingDesc: 'İstediğiniz oranda ticarete başlayın ve ödeme alın.',
    solanaWorld: 'Solana dünyasını keşfetmeye hazır olun',
    solanaWorldDescription:
      "En yeni haberleri almak ve şimdi ticarete başlamak için NexArb'a katılın.",
    signUpNow: 'Şimdi Kayıt Ol',
    confidentiality: 'Gizlilik',
    confidentialityDesc:
      'Sunucularımızda kişisel verileri tutmayız ve onları üçüncü partilere aktarmayız.'
  },
  de: {
    introHeader: 'Schnellster und sicherer Transfer Solana',
    introDescription:
      'Treten Sie unserer Peer-to-Peer-Handelsplattform bei und nutzen Sie die schnellste und sicherste Zahlungsmethode für den Kauf und Verkauf von Solana mit Benutzern wie Ihnen.',
    getStarted: 'Loslegen',
    buySOL: 'Kaufen Sie SOL',
    sellSOL: 'Verkaufe SOL',
    amount: 'Menge',
    searchForOffers: 'Nach Angeboten Suchen',
    exchangeRates: 'Wechselkurse',
    userWorldwide: 'Benutzer weltweit',
    countrySupported: 'Land Unterstützt',
    cryptoTransactions: 'Kryptotransaktionen',
    assetsOnPlatform: 'Vermögenswerte auf der Plattform',
    sendAndRecieve: 'SENDEN UND EMPFANGEN',
    sendAndRecieveDesc:
      'Senden und empfangen Sie Solana ganz einfach von überall aus',
    stepsHeader: 'Einfache Schritte für den Einstieg',
    quickSignUp: 'Schnell anmelden',
    quickSignUpDesc: 'Es dauert höchstens 1 Minute',
    securitySetup: 'Sicherheitseinrichtung',
    connectWallet: 'Wallet Verbinden',
    startTrading: 'Mit dem handel beginnen',
    startTradingDesc:
      'Beginnen Sie mit dem Handel zu Ihrem gewünschten Kurs und lassen Sie sich auszahlen.',
    solanaWorld: 'Machen Sie sich bereit, die Solana-Welt zu erkunden.',
    solanaWorldDescription:
      'Melden Sie sich bei NexArb an, um die neuesten Nachrichten zu erhalten und jetzt mit dem Handel zu beginnen.',
    signUpNow: 'Jetzt Registrieren',
    confidentiality: 'Vertraulichkeit',
    confidentialityDesc:
      'Wir speichern keine personenbezogenen Daten auf unseren Servern und geben diese niemals an Dritte weiter.'
  }
}

export const nexBridgeHomeDictionary: Record<string, NexBridgeHome> = {
  en: {
    description:
      'Join our peer-to-peer trading platform and use the fastest and most secure payment method for buying and selling Solana with users just like you.',
    crossChain: 'Cross-chain Bridge'
  },
  tr: {
    description:
      'Peer-to-peer ticaret platformumuza katılın ve sizin gibi Solana alan ve satan kullanıcılarla en hızlı ve en güvenli ödeme yöntemini kullanın.',
    crossChain: 'Cross-chain Köprü'
  },
  de: {
    description:
      'Treten Sie unserer Peer-to-Peer-Handelsplattform bei und nutzen Sie die schnellste und sicherste Zahlungsmethode für den Kauf und Verkauf von Solana mit Benutzern wie Ihnen.',
    crossChain: 'Cross-Chain-Brücke'
  }
}

export const homeDictionary: Record<string, Home> = {
  en: {
    digitalSolutions: 'Seamless Swaps and Cross-Chain Transactions Made Easy',
    digitalSolutionsDesc:
      'NexArb, where technology meets user-friendly solutions. Our platforms, ArbSwap and NexBridge, let you trade and transfer across blockchain networks quickly and securely without the hassle. Whether you`re trading on Solana or bridging to NEAR, we make it simple.',
    letsMeet: "Let's Meet",
    ourWorks: 'Our Works',
    ourWorksDesc:
      'Our main product, ArbSwap, enables swift and secure P2P Swaps between the Solana and Ethereum networks at minimal fees. Our second offering, NexBridge, facilitates the smooth transfer of assets across Near and other chains. We prioritize simplicity and security, ensuring that our tools are user-friendly and reliable for all users even new to Web3 ecosystem.',
    startupCrew: 'Our Crew'
  },
  tr: {
    digitalSolutions: 'Kesintisiz Takaslar ve Zincirler Arası İşlemler Kolaylaştı',
    digitalSolutionsDesc:
      'Teknolojinin kullanıcı dostu çözümlerle buluştuğu NexArb. Platformlarımız ArbSwap ve NexBridge, blockchain ağları arasında sorunsuz ve hızlı bir şekilde işlem yapmanıza ve aktarım yapmanıza olanak tanır. İster Solana`da işlem yapıyor olun ister NEAR`a köprü oluşturuyor olun, bunu kolaylaştırıyoruz.',
    letsMeet: 'Haydi Buluşalım',
    ourWorks: 'Çalışmalarımız',
    ourWorksDesc:
      "Ana ürünümüz ArbSwap, Solana ve Ethereum ağları arasında minimum ücretle hızlı ve güvenli P2P Swap'lara olanak tanır. İkinci teklifimiz NexBridge, varlıkların Near ve diğer zincirler arasında sorunsuz şekilde aktarılmasını kolaylaştırır. Basitliğe ve güvenliğe öncelik veriyoruz, araçlarımızın Web3 ekosisteminde yeni olanlar dahil tüm kullanıcılar için kullanıcı dostu ve güvenilir olmasını sağlıyoruz.",
    startupCrew: 'Ekibimiz'
  },
  de: {
    digitalSolutions: 'Nahtlose Swaps und Cross-Chain-Transaktionen leicht gemacht',
    digitalSolutionsDesc:
      'NexArb, wo Technologie auf benutzerfreundliche Lösungen trifft. Mit unseren Plattformen ArbSwap und NexBridge können Sie schnell, sicher und problemlos über Blockchain-Netzwerke handeln und übertragen. Egal, ob Sie auf Solana handeln oder eine Brücke zu NEAR schlagen, wir machen es Ihnen einfach.',
    letsMeet: 'Lass uns treffen',
    ourWorks: 'Unsere Arbeiten',
    ourWorksDesc:
      'Unser Hauptprodukt ArbSwap ermöglicht schnelle und sichere P2P-Swaps zwischen den Netzwerken Solana und Ethereum zu minimalen Gebühren. Unser zweites Angebot, NexBridge, erleichtert die reibungslose Übertragung von Vermögenswerten zwischen Near- und anderen Ketten. Wir legen Wert auf Einfachheit und Sicherheit und stellen sicher, dass unsere Tools für alle Benutzer benutzerfreundlich und zuverlässig sind, auch für Neulinge im Web3-Ökosystem.',
    startupCrew: 'Unsere Mannschaft'
  }
}

export const nexBridgeDashboardDictionary: Record<string, NexBridgeDashboard> =
  {
    en: {
      compose: 'Compose',
      bridgeOptions: 'Bridge Options',
      edit: 'EDIT',
      delete: 'DELETE',
      from: 'From :',
      to: 'To :',
      personalData:
        'We do not store personal data on our servers and never transfer it to third parties.',
      startBridge: 'Start Bridge',
      information: 'Information :'
    },
    tr: {
      compose: 'Oluştur',
      bridgeOptions: 'Köprü Seçenekleri',
      edit: 'DÜZENLE',
      delete: 'SİL',
      from: 'Kimden :',
      to: 'Kime :',
      personalData:
        'Kişisel verileri sunucularımızda tutmayız ve asla üçüncü partilere aktarmayız.',
      startBridge: 'Köprüyü Başlat',
      information: 'Bilgiler :'
    },
    de: {
      compose: 'Komponieren',
      bridgeOptions: 'Bridge-Optionen',
      edit: 'BEARBEITEN',
      delete: 'LÖSCHEN',
      from: 'Aus :',
      to: 'Zu :',
      personalData:
        'Wir speichern keine personenbezogenen Daten auf unseren Servern und geben diese niemals an Dritte weiter.',
      startBridge: 'Starten Sie Bridge',
      information: 'Information :'
    }
  }

export const loginDictionary: Record<string, Login> = {
  en: {
    emailOrPhoneNumber: 'Email or Phone number',
    enterUsername: 'Enter your username',
    password: 'Password',
    enterPassword: 'Enter your password',
    rememberThisDevice: 'Remember this device',
    login: 'Login',
    loginWithGoogle: 'Login with Google',
    dontYouHaveAnAccount: "Don't you have an account?",
    signUpHere: 'Sign up here!',
    forgotPassword: 'Forgot Password?',
    verifyHere: 'Verify here.',
    connectWallet: 'Connect Wallet'
  },
  tr: {
    emailOrPhoneNumber: 'Email veya Telefon Numarası',
    enterUsername: 'Kullanıcı adınızı girin',
    password: 'Şifre',
    enterPassword: 'Şifrenizi girin',
    rememberThisDevice: 'Bu cihazı hatırla',
    login: 'Giriş Yap',
    loginWithGoogle: 'Google İle Giriş Yap',
    dontYouHaveAnAccount: 'Hesabınız yok mu?',
    signUpHere: 'Buradan kayıt olun!',
    forgotPassword: 'Şifrenizi mi unuttunuz?',
    verifyHere: 'Buradan doğrulayın.',
    connectWallet: 'Wallet Bağlayın'
  },
  de: {
    emailOrPhoneNumber: 'E-Mail oder Telefonnummer',
    enterUsername: 'Geben Sie Ihren Benutzernamen ein',
    password: 'Passwort',
    enterPassword: 'Geben Sie Ihr Passwort ein',
    rememberThisDevice: 'Erinnern Sie sich an dieses Gerät:',
    login: 'Anmeldung',
    loginWithGoogle: 'Melden Sie sich mit Google an',
    dontYouHaveAnAccount: 'Sie haben kein Konto?',
    signUpHere: 'Hier anmelden!',
    forgotPassword: 'Passwort vergessen?',
    verifyHere: 'Überprüfen Sie hier.',
    connectWallet: 'Wallet verbinden'
  }
}

export const registerDictionary: Record<string, Register> = {
  en: {
    enterEmail: 'Enter a valid email',
    choosePassword: 'Choose Password',
    enterPassword: 'Enter your password',
    passwordAgain: 'Password Again',
    confirmPassword: 'Confirm your password',
    acceptTermsConditions: 'Accept the terms and conditions...',
    next: 'Next'
  },
  tr: {
    enterEmail: 'Geçerli bir email girin',
    choosePassword: 'Şifre seçin',
    enterPassword: 'Şifrenizi girin',
    passwordAgain: 'Şifre Tekrar',
    confirmPassword: 'Şifrenizi doğrulayın',
    acceptTermsConditions: 'Şartları ve koşulları kabul edin...',
    next: 'Sonraki'
  },
  de: {
    enterEmail: 'Geben Sie eine gültige E-Mail-Adresse ein',
    choosePassword: 'Wählen sie ein Passwort',
    enterPassword: 'Geben Sie Ihr Passwort ein',
    passwordAgain: 'Passwort erneut',
    confirmPassword: 'Bestätigen Sie Ihr Passwort',
    acceptTermsConditions:
      'Akzeptieren Sie die Allgemeinen Geschäftsbedingungen...',
    next: 'Nächste'
  }
}

export const registerWalletDictionary: Record<string, RegisterWallet> = {
  en: {
    connectPhantomWallet: 'Connect your Phantom wallet to continue register.',
    connectWallet: 'Connect Wallet',
    walletConnected: 'Wallet Connected',
    register: 'Register'
  },
  tr: {
    connectPhantomWallet:
      "Kayıt olmaya devam etmek için Phantom wallet'ınızı bağlayın",
    connectWallet: 'Wallet Bağla',
    walletConnected: 'Wallet Bağlandı',
    register: 'Kayıt Ol'
  },
  de: {
    connectPhantomWallet:
      'Verbinden Sie Ihr Phantom-Wallet, um mit der Registrierung fortzufahren.',
    connectWallet: 'Wallet verbinden',
    walletConnected: 'Wallet verbunden',
    register: 'Registrieren'
  }
}

export const forgotPasswordDictionary: Record<string, ForgotPassword> = {
  en: {
    enterEmail: 'Enter your valid email',
    sendCode: 'Send code',
    verificationCode: 'Verification Code',
    enterVerificationCode: 'Enter verification code',
    dontYouGetCode: "Don't you get code?",
    sendAgain: 'Send again',
    verify: 'Verify',
    newPassword: 'New Password',
    enterPassword: 'Enter your password',
    newPasswordAgain: 'New Password Again',
    login: 'Log in'
  },
  tr: {
    enterEmail: 'Geçerli emailinizi girin',
    sendCode: 'Kod gönder',
    verificationCode: 'Doğrulama Kodu',
    enterVerificationCode: 'Doğrulama kodunu girin',
    dontYouGetCode: 'Kodu almadınız mı?',
    sendAgain: 'Tekrar gönder',
    verify: 'Doğrula',
    newPassword: 'Yeni Şifre',
    enterPassword: 'Şifrenizi girin',
    newPasswordAgain: 'Yeni Şifre Tekrar',
    login: 'Giriş yap'
  },
  de: {
    enterEmail: 'Geben Sie Ihre gültige E-Mail-Adresse ein',
    sendCode: 'Code senden',
    verificationCode: 'Bestätigungscode',
    enterVerificationCode: 'Bestätigungscode eingeben',
    dontYouGetCode: 'Bekommst du keinen Code?',
    sendAgain: 'Nochmals senden',
    verify: 'Verifizieren',
    newPassword: 'Neues Kennwort',
    enterPassword: 'Geben Sie Ihr Passwort ein',
    newPasswordAgain: 'Neues Passwort nochmal',
    login: 'Anmeldung'
  }
}

export const underConstructionDictionary: Record<string, UnderConstruction> = {
  en: {
    underConstruction: "This Page Is Under Construction",
    promoVideoDesc: "You can watch our promo video."
  },
  tr: {
    underConstruction: "Bu Sayfa Yapım Aşamasındadır",
    promoVideoDesc: "Tanıtım videomuzu izleyebilirsiniz."
  },
  de: {
    underConstruction: "Diese Seite befindet sich im Aufbau",
    promoVideoDesc: "Sie können sich unser Promo-Video ansehen."
  }
}

export const arbSwapFooterDictionary: Record<string, ArbSwapFooter> = {
  en: {
    dummyText:
      'Filler text is dummy text which has no meaning however looks very similar to real text',
    products: 'PRODUCTS',
    overview: 'Overview',
    solutions: 'Solutions',
    pricing: 'Pricing',
    customers: 'Customers',
    company: 'COMPANY',
    about: 'About',
    inverstorRelations: 'Investor Relations',
    jobs: 'Jobs',
    press: 'Press',
    blog: 'Blog',
    support: 'SUPPORT',
    contact: 'Contact',
    documentation: 'Documentation',
    chat: 'Chat',
    faq: 'FAQ',
    legal: 'LEGAL',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    cookieSettings: 'Cookie Settings',
    copyright: '© 2021 - Present Flowrift. All rights reserved.'
  },
  tr: {
    dummyText:
      'Doldurucu metin anlamı olmayan ancak gerçek metne çok benzeyen anlamsız metindir',
    products: 'ÜRÜNLER',
    overview: 'Genel Bakış',
    solutions: 'Çözümler',
    pricing: 'Fiyatlandırma',
    customers: 'Müşteriler',
    company: 'ŞİRKET',
    about: 'Hakkında',
    inverstorRelations: 'Yatırımcı İlişkileri',
    jobs: 'İşler',
    press: 'Basın',
    blog: 'Blog',
    support: 'DESTEK',
    contact: 'İletişim',
    documentation: 'Dokümantasyon',
    chat: 'Sohbet',
    faq: 'SSS',
    legal: 'HUKUK',
    termsOfService: 'Hizmet Koşulları',
    privacyPolicy: 'Gizlilik Politikası',
    cookieSettings: 'Çerez Ayarları',
    copyright: '© 2021 - Present Flowrift. Tüm hakları saklıdır.'
  },
  de: {
    dummyText:
      'Fülltext ist Blindtext, der keine Bedeutung hat, aber echtem Text sehr ähnlich sieht',
    products: 'PRODUKTE',
    overview: 'Überblick',
    solutions: 'Lösungen',
    pricing: 'Preisgestaltung',
    customers: 'Müşteriler',
    company: 'Unternehmen',
    about: 'About',
    inverstorRelations: 'Anlegerbeziehungen',
    jobs: 'Arbeitsplätze',
    press: 'Drücken Sie',
    blog: 'Blog',
    support: 'UNTERSTÜTZUNG',
    contact: 'Kontakt',
    documentation: 'Dokumentation',
    chat: 'Plaudern',
    faq: 'Häufig gestellte Fragen',
    legal: 'RECHTLICH',
    termsOfService: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    cookieSettings: 'Cookie-Einstellungen',
    copyright: '© 2021 – Present Flowrift. Alle Rechte vorbehalten.'
  }
}

export const footerDictionary: Record<string, Footer> = {
  en: {
    keepInTouch: "Let's Keep in Touch",
    description:
      'You can keep in touch with us via information below or form on the side.',
    yourName: 'Your Name',
    inputField: 'Your Email',
    yourMessage: 'Your Message',
    send: 'Send',
    copyright: '© 2023 NexArb. All Rights Reserved.'
  },
  tr: {
    keepInTouch: 'Haydi İletişime Geçelim',
    description:
      'Bizimle alttaki bilgiler ya da yandaki form aracılığıyla iletişime geçebilirsiniz.',
    yourName: 'İsminiz',
    inputField: 'Emailiniz',
    yourMessage: 'Mesajınız',
    send: 'Gönder',
    copyright: '© 2023 NexArb. Tüm hakları saklıdır.'
  },
  de: {
    keepInTouch: 'Lass uns in Kontakt bleiben',
    description:
      'Sie können über die unten stehenden Informationen oder das nebenstehende Formular mit uns in Kontakt bleiben.',
    yourName: 'Ihr Name',
    inputField: 'Ihre E-Mail',
    yourMessage: 'Ihre Nachricht',
    send: 'Schicken',
    copyright: '© 2023 NexArb. Alle Rechte vorbehalten.'
  }
}

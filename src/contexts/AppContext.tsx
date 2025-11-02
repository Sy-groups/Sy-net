import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'ar';
export type Currency = 'EUR' | 'SYP';
export type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  currency: Currency;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  setTheme: (theme: Theme) => void;
  convertPrice: (price: number) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Exchange rate: 1 EUR = 2800 SYP (approximate)
const EUR_TO_SYP_RATE = 2800;

export function AppProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('EUR');
  const [theme, setTheme] = useState<Theme>('light');

  // Initialize from localStorage or defaults
  useEffect(() => {
    const savedLang = localStorage.getItem('synet-language') as Language;
    const savedCurrency = localStorage.getItem('synet-currency') as Currency;
    const savedTheme = localStorage.getItem('synet-theme') as Theme;

    if (savedLang) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
    }
    if (savedCurrency) setCurrency(savedCurrency);
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, [i18n]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('synet-language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem('synet-currency', curr);
  };

  const convertPrice = (price: number): number => {
    return currency === 'SYP' ? price * EUR_TO_SYP_RATE : price;
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('synet-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const value: AppContextType = {
    language,
    currency,
    theme,
    setLanguage: handleSetLanguage,
    setCurrency: handleSetCurrency,
    setTheme: handleSetTheme,
    convertPrice,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
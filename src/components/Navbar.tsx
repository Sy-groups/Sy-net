import { useTranslation } from "react-i18next";
import { useApp, Language, Currency, Theme } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, DollarSign, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const { t } = useTranslation();
  const { language, currency, theme, setLanguage, setCurrency, setTheme } =
    useApp();

  return (
    <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                src={`${import.meta.env.BASE_URL}sy-netlogo.png`}
                alt="Logo"
                className="h-22 w-24"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-smooth"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/domains"
              className="text-foreground hover:text-primary transition-smooth"
            >
              {t("nav.domains")}
            </Link>
            <Link
              to="/pricing"
              className="text-foreground hover:text-primary transition-smooth"
            >
              {t("nav.pricing")}
            </Link>
            <Link
              to="/support"
              className="text-foreground hover:text-primary transition-smooth"
            >
              {t("nav.support")}
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="w-4 h-4 mr-1" />
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("en" as Language)}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ar" as Language)}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {currency}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => setCurrency("EUR" as Currency)}
                >
                  EUR (€)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCurrency("SYP" as Currency)}
                >
                  SYP (ل.س)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

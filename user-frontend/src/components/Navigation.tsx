import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, User, Globe, Eye, Type } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isLargeFont, setIsLargeFont] = useState(false);

  const toggleAccessibility = (type: "contrast" | "font") => {
    if (type === "contrast") {
      setIsHighContrast(!isHighContrast);
      document.documentElement.classList.toggle("high-contrast", !isHighContrast);
    } else {
      setIsLargeFont(!isLargeFont);
      document.documentElement.classList.toggle("large-fonts", !isLargeFont);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-civic flex items-center justify-center">
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            <span className="text-xl font-bold text-gradient">CivicReport</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              {language === "hi" ? "होम" : "Home"}
            </a>
            <a href="/report" className="text-foreground hover:text-primary transition-colors">
              {language === "hi" ? "रिपोर्ट करें" : "Report Issue"}
            </a>
            <a href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              {language === "hi" ? "डैशबोर्ड" : "Dashboard"}
            </a>
            <a href="/track-reports" className="text-foreground hover:text-primary transition-colors">
              {language === "hi" ? "ट्रैक करें" : "Track Reports"}
            </a>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  {language === "hi" ? "हिं" : "EN"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("hi")}>
                  हिंदी (Hindi)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Accessibility Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => toggleAccessibility("contrast")}>
                  <Eye className="w-4 h-4 mr-2" />
                  {isHighContrast ? "Normal Contrast" : "High Contrast"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleAccessibility("font")}>
                  <Type className="w-4 h-4 mr-2" />
                  {isLargeFont ? "Normal Font" : "Large Font"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emergency rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="btn-civic">
              {language === "hi" ? "रिपोर्ट करें" : "Report Issue"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <a href="/" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                {language === "hi" ? "होम" : "Home"}
              </a>
              <a href="/report" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                {language === "hi" ? "रिपोर्ट करें" : "Report Issue"}
              </a>
              <a href="/dashboard" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                {language === "hi" ? "डैशबोर्ड" : "Dashboard"}
              </a>
              <a href="/track" className="text-foreground hover:text-primary transition-colors px-3 py-2">
                {language === "hi" ? "ट्रैक करें" : "Track Reports"}
              </a>
              <div className="flex items-center justify-between px-3 py-2">
                <Button variant="ghost" size="sm" onClick={() => setLanguage(language === "en" ? "hi" : "en")}>
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "hi" ? "English" : "हिंदी"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toggleAccessibility("contrast")}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              <div className="px-3">
                <Button className="btn-civic w-full">
                  {language === "hi" ? "रिपोर्ट करें" : "Report Issue"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
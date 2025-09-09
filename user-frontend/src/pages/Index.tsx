import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <Navigation />
      
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-civic flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CR</span>
                </div>
                <span className="text-xl font-bold text-gradient">CivicReport</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering communities through smart civic reporting and AI-driven solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/report" className="hover:text-primary transition-colors">Report Issue</a></li>
                <li><a href="/dashboard" className="hover:text-primary transition-colors">Dashboard</a></li>
                <li><a href="/track" className="hover:text-primary transition-colors">Track Reports</a></li>
                <li><a href="/community" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="/tutorials" className="hover:text-primary transition-colors">Video Tutorials</a></li>
                <li><a href="/accessibility" className="hover:text-primary transition-colors">Accessibility</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CivicReport. All rights reserved. Built with AI for the community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

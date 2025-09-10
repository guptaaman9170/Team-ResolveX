import { ArrowRight, Camera, Brain, Users, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-civic.jpg";
import FloatingReportModal from "@/components/FloatingReportModal";
import FloatingEmergencyModal from "@/components/FloatingEmergencyModal";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white">
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Smart Civic
                <br />
                <span className="text-accent">Reporting</span>
                <br />
                System
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Empowering citizens and municipalities with AI-powered issue detection, 
                multilingual support, and accessible reporting for a smarter, more 
                responsive community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/report">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 h-14">
                  Report an Issue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                </Link>
                <Link to="/dashboard">
                <Button 
                 variant="outline" 
                 size="lg" 
                 className="border-2 border-white text-primary bg-white text-lg px-8 h-14"
                >
                  View Dashboard
                 </Button>
                </Link>

              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white/90">AI-Powered</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <Globe2 className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white/90">Multilingual</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white/90">AR Reporting</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-white/90">Community</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-float">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Photo Recognition</h3>
                    <p className="text-white/70 text-sm">AI detects potholes automatically</p>
                  </div>
                </div>
                
                <div className="h-px bg-white/20"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-warning flex items-center justify-center">
                    <Globe2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Multilingual Support</h3>
                    <p className="text-white/70 text-sm">Report in your native language</p>
                  </div>
                </div>
                
                <div className="h-px bg-white/20"></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-glow flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Community Verification</h3>
                    <p className="text-white/70 text-sm">Citizens validate reports together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
<div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
  {/* <Button 
    size="lg" 
    className="w-16 h-16 rounded-full btn-emergency shadow-float animate-pulse-glow"
    aria-label="Emergency SOS"
  >
    SOS
  </Button>
  */}

 <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
  {/* Emergency SOS Button */}
  <div className="z-20 mb-40">
  <FloatingEmergencyModal />
   </div>
  {/* Reporting Modal */}
  <div className="z-20">
    <FloatingReportModal />
  </div>
</div>

</div>

    </section>
  );
};

export default HeroSection;
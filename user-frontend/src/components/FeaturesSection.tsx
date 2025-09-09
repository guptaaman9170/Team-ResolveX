import { 
  Brain, 
  Users, 
  Camera, 
  MapPin, 
  Star, 
  MessageSquare, 
  Globe, 
  Eye,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning automatically categorizes and prioritizes reports based on severity and type.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Users,
      title: "Community Verification",
      description: "Citizens can verify reports through upvotes and comments, ensuring accuracy and relevance.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Camera,
      title: "AR Reporting",
      description: "Use augmented reality to highlight and tag problem areas directly through your device camera.",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      icon: MapPin,
      title: "Geo-Tagged Reports",
      description: "Automatic location tagging with 3D image capture for comprehensive issue documentation.",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Report and receive updates in your native language with voice-to-text in multiple languages.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Eye,
      title: "Accessibility First",
      description: "High contrast modes, large fonts, text-to-speech, and screen reader compatibility.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const stats = [
    { number: "10K+", label: "Reports Resolved", icon: CheckCircle },
    { number: "5K+", label: "Active Citizens", icon: Users },
    { number: "24/7", label: "Response Time", icon: Clock },
    { number: "12", label: "Languages", icon: Globe }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive <span className="text-gradient">Smart Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with user-centered design 
            to create the most advanced civic reporting system available.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="card-civic hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Real-Time Dashboard & Analytics
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Monitor civic issues across your community with our comprehensive dashboard. 
              Track report status, view analytics, and coordinate municipal responses all in one place.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <span className="text-foreground">Live status tracking for all reports</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">AI-powered priority recommendations</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <span className="text-foreground">Emergency alert system</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={dashboardPreview} 
              alt="Civic reporting dashboard interface"
              className="rounded-2xl shadow-elevated w-full"
            />
            <div className="absolute inset-0 bg-gradient-civic/10 rounded-2xl"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-civic flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h4>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
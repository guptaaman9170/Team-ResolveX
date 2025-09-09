import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  MapPin, 
  Upload, 
  Mic, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const ReportPage = () => {
  const [reportData, setReportData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    location: "",
    images: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const categories = [
    { value: "pothole", label: "Pothole", icon: "🕳️" },
    { value: "streetlight", label: "Street Light", icon: "💡" },
    { value: "garbage", label: "Garbage/Waste", icon: "🗑️" },
    { value: "traffic", label: "Traffic Signal", icon: "🚦" },
    { value: "sidewalk", label: "Sidewalk", icon: "🚶" },
    { value: "water", label: "Water Issue", icon: "💧" },
    { value: "other", label: "Other", icon: "📝" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setReportData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate voice recording
      toast({
        title: "Voice Recording Started",
        description: "Speak clearly to describe the issue. AI will transcribe and translate automatically.",
      });
      
      setTimeout(() => {
        setIsRecording(false);
        setReportData(prev => ({
          ...prev,
          description: "Voice recording transcribed: There is a large pothole on Main Street near the intersection. It's causing traffic issues and could damage vehicles."
        }));
        toast({
          title: "Voice Recording Complete",
          description: "Your voice has been transcribed and analyzed by AI.",
        });
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate AI analysis and submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Report Submitted Successfully!",
      description: "AI has analyzed your report and assigned priority: HIGH. Report ID: #CR-2024-001",
    });

    setIsSubmitting(false);
    
    // Reset form
    setReportData({
      title: "",
      description: "",
      category: "",
      priority: "medium",
      location: "",
      images: []
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-emergency bg-emergency/10 border-emergency/20";
      case "medium": return "text-warning bg-warning/10 border-warning/20";
      case "low": return "text-success bg-success/10 border-success/20";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Report a <span className="text-gradient">Civic Issue</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Help improve your community by reporting issues. Our AI will analyze and prioritize your report automatically.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card className="card-civic">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-civic flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  Create New Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">Issue Category</Label>
                    <Select value={reportData.category} onValueChange={(value) => 
                      setReportData(prev => ({ ...prev, category: value }))
                    }>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <span className="flex items-center gap-2">
                              <span>{cat.icon}</span>
                              {cat.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">Issue Title</Label>
                    <Input
                      id="title"
                      value={reportData.title}
                      onChange={(e) => setReportData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief description of the issue"
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Description with Voice Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="description" className="text-sm font-medium">Detailed Description</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleVoiceRecording}
                        className={`gap-2 ${isRecording ? 'text-emergency border-emergency' : ''}`}
                      >
                        <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
                        {isRecording ? "Recording..." : "Voice Input"}
                      </Button>
                    </div>
                    <Textarea
                      id="description"
                      value={reportData.description}
                      onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the issue in detail. You can also use voice input above."
                      rows={4}
                      className="resize-none"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <MapPin className="w-4 h-4" />
                        Use Current Location
                      </Button>
                    </div>
                    <Input
                      id="location"
                      value={reportData.location}
                      onChange={(e) => setReportData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Street address or landmark"
                      className="mt-2"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label className="text-sm font-medium">Upload Images</Label>
                    <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload images or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG up to 10MB each
                        </p>
                      </label>
                    </div>
                    {reportData.images.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {reportData.images.map((file, index) => (
                          <Badge key={index} variant="secondary">{file.name}</Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Priority (AI-suggested) */}
                  <div>
                    <Label className="text-sm font-medium">AI-Suggested Priority</Label>
                    <div className="mt-2 flex items-center gap-3">
                      <Badge className={`px-3 py-1 ${getPriorityColor(reportData.priority)}`}>
                        <Brain className="w-4 h-4 mr-1" />
                        {reportData.priority.toUpperCase()} PRIORITY
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Based on AI analysis of description and images
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full btn-civic h-12 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Brain className="w-5 h-5 mr-2 animate-spin" />
                        AI Analyzing Report...
                      </>
                    ) : (
                      <>
                        Submit Report
                        <CheckCircle className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="card-civic">
              <CardHeader>
                <CardTitle className="text-lg">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reports Submitted</span>
                  <Badge variant="secondary">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Issues Resolved</span>
                  <Badge className="bg-success/10 text-success">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Community Points</span>
                  <Badge className="bg-warning/10 text-warning">245</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="card-civic">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Reporting Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Camera className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Take clear photos from multiple angles
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center mt-0.5">
                    <MapPin className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Include specific location details
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-warning/10 flex items-center justify-center mt-0.5">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mark urgent issues for faster response
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Button */}
            <Card className="bg-emergency/5 border-emergency/20">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-emergency mx-auto mb-4" />
                <h3 className="font-semibold text-emergency mb-2">Emergency?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For immediate dangers like gas leaks or structural collapse
                </p>
                <Button className="btn-emergency w-full">
                  Emergency SOS
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
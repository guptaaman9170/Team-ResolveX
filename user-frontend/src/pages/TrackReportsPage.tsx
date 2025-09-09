import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";

const TrackReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Mock data for tracked reports
  const trackedReports = [
    {
      id: "CR-2024-001",
      title: "Large pothole on Main Street",
      category: "Pothole",
      status: "in-progress",
      location: "Main St & Oak Ave",
      createdAt: "2024-01-15",
      lastUpdated: "2024-04-01",
    },
    {
      id: "CR-2024-002",
      title: "Broken streetlight on Park Road",
      category: "Street Light",
      status: "resolved",
      location: "Park Rd, Block 4",
      createdAt: "2024-01-14",
      lastUpdated: "2024-03-28",
    }
  ];

  const filteredReports = trackedReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || report.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Track Your <span className="text-gradient">Reports</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor the status of your previously submitted civic reports.
          </p>
        </div>

        {/* Filters */}
        <Card className="card-civic mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="pothole">Pothole</SelectItem>
                  <SelectItem value="street light">Street Light</SelectItem>
                  <SelectItem value="garbage">Garbage</SelectItem>
                  <SelectItem value="traffic">Traffic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tracked Reports List */}
        <div className="grid gap-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="card-report border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{report.title}</h3>

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Created: {report.createdAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> Last Updated: {report.lastUpdated}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {report.location}
                  </span>
                  <Badge variant="outline">{report.category}</Badge>
                  <Badge variant="outline" className="text-sm">
                    {report.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredReports.length === 0 && (
            <Card className="card-civic">
              <CardContent className="p-12 text-center">
                <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No tracked reports found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters to see your reports.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackReportsPage;

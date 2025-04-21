
import { SectionHeader } from "@/components/ui/section-header";
import { SectionContainer } from "@/components/ui/section-container";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MapPin, 
  Calendar, 
  User,
  Eye,
  MessageSquare,
  PlusCircle,
  HelpCircle
} from "lucide-react";

const LostFound = () => {
  // Sample data for the lost and found items
  const lostItems = [
    {
      id: 1,
      title: "Gold Wedding Ring",
      description: "Lost in Central Park area near the fountain. Has initials 'J&M' engraved inside.",
      location: "Central Park",
      date: "April 12, 2025",
      category: "Jewelry",
      contact: "John D.",
      reward: true
    },
    {
      id: 2,
      title: "Black Leather Wallet",
      description: "Contains ID, credit cards, and family photos. Lost near Main Street Coffee Shop.",
      location: "Main Street",
      date: "April 15, 2025",
      category: "Personal Items",
      contact: "Sarah M.",
      reward: true
    },
    {
      id: 3,
      title: "House Keys with Red Keychain",
      description: "Set of 4 keys with a distinctive red fox keychain. Lost near the community center.",
      location: "Community Center",
      date: "April 16, 2025",
      category: "Keys",
      contact: "Michael T.",
      reward: false
    }
  ];
  
  const foundItems = [
    {
      id: 1,
      title: "Blue Bicycle Helmet",
      description: "Found on Oak Street near the elementary school. Child size with dinosaur stickers.",
      location: "Oak Street",
      date: "April 14, 2025",
      category: "Sports Equipment",
      contact: "Emma L.",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Prescription Glasses",
      description: "Found at the bus stop on Maple Avenue. Black frames with slight gold trim.",
      location: "Maple Avenue",
      date: "April 17, 2025",
      category: "Eyewear",
      contact: "David K.",
      image: "/placeholder.svg"
    }
  ];
  
  return (
    
    <MainLayout>
      <SectionContainer>
        <SectionHeader 
          title="Lost & Found" 
          description="Lost something or found an item? Our community lost and found helps reconnect items with their owners"
        />
        
        <div className="max-w-5xl mx-auto">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button className="bg-community-purple">
              <PlusCircle className="mr-2 h-4 w-4" /> Report Lost Item
            </Button>
            <Button className="bg-community-blue">
              <PlusCircle className="mr-2 h-4 w-4" /> Report Found Item
            </Button>
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" /> How It Works
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-12">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full p-4 pl-10 text-sm border rounded-lg bg-white focus:ring-primary focus:border-primary"
              placeholder="Search by description, location, or category..."
            />
            <Button className="absolute right-2.5 bottom-2.5">
              Search
            </Button>
          </div>
          
          {/* Lost and Found Tabs */}
          <Tabs defaultValue="lost" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lost" className="text-base">
                Lost Items
              </TabsTrigger>
              <TabsTrigger value="found" className="text-base">
                Found Items
              </TabsTrigger>
            </TabsList>
            
            {/* Lost Items Tab */}
            <TabsContent value="lost" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {lostItems.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="bg-red-50 border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-800 rounded mb-2">
                            Lost
                          </span>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription className="mt-1">{item.category}</CardDescription>
                        </div>
                        {item.reward && (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded">
                            Reward
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm mb-4">{item.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{item.date}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <User className="mr-2 h-4 w-4" />
                          <span>Posted by: {item.contact}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Contact
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Found Items Tab */}
            <TabsContent value="found" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {foundItems.map(item => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="bg-green-50 border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded mb-2">
                            Found
                          </span>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription className="mt-1">{item.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                          <img src={item.image} alt={item.title} className="max-h-full" />
                        </div>
                        <div>
                          <p className="text-sm mb-4">{item.description}</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="mr-2 h-4 w-4" />
                              <span>{item.location}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>{item.date}</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <User className="mr-2 h-4 w-4" />
                              <span>Posted by: {item.contact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" /> Contact
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Don't see your item? Create a new listing or subscribe to notifications.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button>Subscribe to Alerts</Button>
              <Button variant="outline">View All Listings</Button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </MainLayout>
  );
};

export default LostFound;

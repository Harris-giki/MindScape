import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SectionContainer } from "@/components/ui/section-container";
import MainLayout from "@/components/layout/MainLayout";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Users,
  Bell,
  MessageSquare,
  PlusCircle,
  AlarmClock,
  UserCog,
  Store,
  Briefcase,
  Shield,
  Heart,
  Search,
  Calendar,
  User,
  MessageSquareDashed,
  ShoppingCart,
  Send,
  Flag,
  ChevronLeft,
  Edit,
  Trash2,
  Save,
  X,
  ExternalLink,
  Phone,
  AlertTriangle,
  Siren,
  Bandage,
  MapPin,
  Handshake,
  Megaphone,
  Award,
  Zap,
  Mail,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Laptop,
  FlaskConical,
  Microscope,
  Wifi,
  Utensils,
  Home,
  Dumbbell,
  Bus,
  Shirt,
  Music,
  Paintbrush,
  PawPrint,
  Car,
  Baby,
  Dog,
  Cat,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useCommunityStore } from "@/stores/communityStore";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_COMMUNITY_IMAGE =
  "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/lorelei/svg?seed=user";

// Community-specific data generators
const getCommunitySpecificData = (communityName: string) => {
  const lowerName = communityName.toLowerCase();

  // Common types
  type Announcement = {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    comments?: { id: string; user: string; text: string; time: string }[];
  };

  type Professional = {
    id: string;
    name: string;
    profession: string;
    specialty: string | null;
    contact: string;
    phone: string | null;
    messages?: { id: string; user: string; text: string; time: string }[];
  };

  type Business = {
    id: string;
    name: string;
    type: string;
    description: string | null;
    address: string;
    hours: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
  };

  type LostFoundItem = {
    id: string;
    type: "lost" | "found";
    title: string;
    description: string;
    date: string | null;
    contact: string;
    isFound: boolean;
  };

  type Campaign = {
    id: string;
    title: string;
    description: string;
    goal: string;
    progress: number;
    endDate: string;
  };

  // University Community (GIKI Connect)
  if (
    lowerName.includes("giki") ||
    lowerName.includes("university") ||
    lowerName.includes("campus")
  ) {
    return {
      messages: [
        {
          id: "sample-msg-1",
          user: "Ali Khan",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=ali",
          message: "Does anyone have notes for CS-302 Algorithms class?",
          time: "2 hours ago",
          replies: 3,
        },
        {
          id: "sample-msg-2",
          user: "Sara Ahmed",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=sara",
          message: "Looking for roommates for next semester near campus!",
          time: "1 hour ago",
          replies: 1,
        },
        {
          id: "sample-msg-3",
          user: "Usman Malik",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=usman",
          message:
            "Free IEEE student membership workshop tomorrow at 3pm in CS department",
          time: "30 minutes ago",
          replies: 0,
        },
      ],
      announcements: [
        {
          id: "sample-ann-1",
          title: "Midterm Exam Schedule",
          description:
            "The midterm exam schedule has been posted on the notice boards. Please check your department's schedule.",
          date: "2025-10-15",
          time: "9:00 AM",
          comments: [
            {
              id: "c1",
              user: "Fatima",
              text: "Are the timings the same for all sections?",
              time: "2 hours ago",
            },
            {
              id: "c2",
              user: "Admin",
              text: "Yes, all sections will have exams at the same time.",
              time: "1 hour ago",
            },
          ],
        },
        {
          id: "sample-ann-2",
          title: "Career Fair 2025",
          description:
            "Annual career fair will be held on November 5th in the main auditorium. Over 50 companies will be participating.",
          date: "2025-11-05",
          time: "10:00 AM",
          comments: [],
        },
        {
          id: "sample-ann-3",
          title: "Library Extended Hours",
          description:
            "During finals week, the library will remain open until 2 AM. Please bring your student ID for entry after 10 PM.",
          date: "2025-12-10",
          time: "8:00 AM",
          comments: [],
        },
      ],
      professionals: [
        {
          id: "sample-prof-1",
          name: "Dr. Asma Khan",
          profession: "Math Tutor",
          specialty: "Calculus & Linear Algebra",
          contact: "asma.tutor@email.com",
          phone: "555-1234",
          messages: [],
        },
        {
          id: "sample-prof-2",
          name: "CS Department Help Center",
          profession: "Programming Help",
          specialty: "Data Structures",
          contact: "cshelp@giki.edu.pk",
          phone: null,
          messages: [],
        },
      ],
      businesses: [
        {
          id: "sample-bus-1",
          name: "Campus Bookstore",
          type: "Bookstore",
          description: "Textbooks, stationery and university merchandise",
          address: "Main Academic Block",
          hours: "Mon-Fri 9am-5pm",
          contactEmail: "bookstore@giki.edu.pk",
          contactPhone: "555-4321",
        },
        {
          id: "sample-bus-2",
          name: "Student Cafe",
          type: "Cafeteria",
          description: "Affordable meals and snacks",
          address: "Near Hostels",
          hours: "Daily 8am-11pm",
          contactEmail: null,
          contactPhone: "555-8765",
        },
      ],
      lostFoundItems: [
        {
          id: "sample-lf-1",
          type: "lost",
          title: "Lost Calculator",
          description:
            "TI-84 calculator lost near CS department yesterday. Has a sticker with my name on back.",
          date: "2025-04-18",
          contact: "Call 555-5678",
          isFound: false,
        },
        {
          id: "sample-lf-2",
          type: "found",
          title: "Found Student ID",
          description: "Found a student ID card near the library entrance.",
          date: "2025-04-19",
          contact: "Text 555-8765 to identify",
          isFound: false,
        },
        {
          id: "sample-lf-3",
          type: "lost",
          title: "Lost Notebook",
          description:
            "Blue notebook with Physics notes. Lost in the cafeteria area.",
          date: "2025-04-20",
          contact: "email: student123@email.com",
          isFound: false,
        },
      ],
      campaigns: [
        {
          id: "sample-camp-1",
          title: "Scholarship Fund",
          description:
            "Raising funds to support needy students with their tuition fees.",
          goal: "$10,000",
          progress: 45,
          endDate: "2025-07-01",
        },
        {
          id: "sample-camp-2",
          title: "Campus Cleanup",
          description: "Volunteers needed for monthly campus cleanup drive.",
          goal: "50 volunteers",
          progress: 30,
          endDate: "2025-05-15",
        },
      ],
    };
  }

  // Footballers Club
  if (lowerName.includes("football") || lowerName.includes("soccer")) {
    return {
      messages: [
        {
          id: "sample-msg-1",
          user: "David Beck",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=david",
          message:
            "Anyone available for practice this Saturday at the city field?",
          time: "2 hours ago",
          replies: 3,
        },
        {
          id: "sample-msg-2",
          user: "Alex Morgan",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=alex",
          message: "Looking for a goalkeeper for our weekend league team!",
          time: "1 hour ago",
          replies: 1,
        },
        {
          id: "sample-msg-3",
          user: "Coach Smith",
          avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=coach",
          message:
            "Team meeting tomorrow at 6pm to discuss tournament strategy",
          time: "30 minutes ago",
          replies: 0,
        },
      ],
      announcements: [
        {
          id: "sample-ann-1",
          title: "Summer Tournament Registration",
          description:
            "Registration for the annual summer tournament is now open. Deadline is May 15th. Team fee is $200.",
          date: "2025-05-01",
          time: "9:00 AM",
          comments: [
            {
              id: "c1",
              user: "Jamie",
              text: "What's the minimum team size?",
              time: "2 hours ago",
            },
            {
              id: "c2",
              user: "Admin",
              text: "Minimum 7 players per team, maximum 15.",
              time: "1 hour ago",
            },
          ],
        },
        {
          id: "sample-ann-2",
          title: "Field Maintenance",
          description:
            "Main field will be closed for maintenance next Tuesday and Wednesday. Practice will be moved to the secondary field.",
          date: "2025-05-07",
          time: "10:00 AM",
          comments: [],
        },
      ],
      professionals: [
        {
          id: "sample-prof-1",
          name: "Mike Trainer",
          profession: "Fitness Coach",
          specialty: "Football Conditioning",
          contact: "mike.trainer@email.com",
          phone: "555-1234",
          messages: [],
        },
        {
          id: "sample-prof-2",
          name: "Dr. Sarah Lee",
          profession: "Sports Physician",
          specialty: "Injury Prevention",
          contact: "sarah.physio@email.com",
          phone: "555-5678",
          messages: [],
        },
      ],
      businesses: [
        {
          id: "sample-bus-1",
          name: "Kick It Sports",
          type: "Sports Store",
          description: "Football gear and equipment",
          address: "123 Sports Ave",
          hours: "Mon-Sat 10am-8pm",
          contactEmail: "info@kickitsports.com",
          contactPhone: "555-4321",
        },
        {
          id: "sample-bus-2",
          name: "Field Rentals Inc",
          type: "Field Rental",
          description: "Football field rentals by the hour",
          address: "456 Field Road",
          hours: "Daily 7am-10pm",
          contactEmail: "bookings@fieldrentals.com",
          contactPhone: "555-8765",
        },
      ],
      lostFoundItems: [
        {
          id: "sample-lf-1",
          type: "lost",
          title: "Lost Football Pump",
          description:
            "Black Nike football pump lost after last practice. Reward if found!",
          date: "2025-04-18",
          contact: "Call 555-5678",
          isFound: false,
        },
        {
          id: "sample-lf-2",
          type: "found",
          title: "Found Headband",
          description: "Blue Nike headband found on field #3.",
          date: "2025-04-19",
          contact: "Text 555-8765 to identify",
          isFound: false,
        },
        {
          id: "sample-lf-3",
          type: "lost",
          title: "Lost Cleats",
          description: "Size 10 Adidas Predator cleats. Left in locker room.",
          date: "2025-04-20",
          contact: "email: player123@email.com",
          isFound: false,
        },
      ],
      campaigns: [
        {
          id: "sample-camp-1",
          title: "New Goal Posts",
          description:
            "Fundraising for new professional goal posts for our main field.",
          goal: "$2,500",
          progress: 65,
          endDate: "2025-07-01",
        },
        {
          id: "sample-camp-2",
          title: "Youth Program",
          description:
            "Sponsor a child for our youth football development program.",
          goal: "20 sponsors",
          progress: 15,
          endDate: "2025-06-30",
        },
      ],
    };
  }

  // Default/Generic Community
  return {
    messages: [
      {
        id: "sample-msg-1",
        user: "Community Admin",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=admin",
        message: "Welcome to our community! Please introduce yourself.",
        time: "2 hours ago",
        replies: 3,
      },
      {
        id: "sample-msg-2",
        user: "New Member",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=new",
        message:
          "Just moved to the area. Looking for recommendations for local services.",
        time: "1 hour ago",
        replies: 1,
      },
    ],
    announcements: [
      {
        id: "sample-ann-1",
        title: "Community Picnic",
        description:
          "Annual community picnic will be held on June 10th at the main park. Bring a dish to share!",
        date: "2025-06-10",
        time: "12:00 PM",
        comments: [
          {
            id: "c1",
            user: "Lisa",
            text: "What should we bring?",
            time: "2 hours ago",
          },
          {
            id: "c2",
            user: "Admin",
            text: "Anything you'd like to share! We'll have sign-up sheets soon.",
            time: "1 hour ago",
          },
        ],
      },
    ],
    professionals: [
      {
        id: "sample-prof-1",
        name: "Handy Manny",
        profession: "Handyman",
        specialty: "Small Repairs",
        contact: "manny@example.com",
        phone: "555-1234",
        messages: [],
      },
    ],
    businesses: [
      {
        id: "sample-bus-1",
        name: "Local Cafe",
        type: "Cafe",
        description: "Cozy neighborhood cafe",
        address: "123 Main St",
        hours: "Mon-Fri 7am-6pm",
        contactEmail: "info@localcafe.com",
        contactPhone: "555-4321",
      },
    ],
    lostFoundItems: [
      {
        id: "sample-lf-1",
        type: "lost",
        title: "Lost Keys",
        description: "Set of keys with blue keychain",
        date: "2025-04-18",
        contact: "Call 555-5678",
        isFound: false,
      },
    ],
    campaigns: [
      {
        id: "sample-camp-1",
        title: "Park Bench Restoration",
        description:
          "Raising funds to restore the old benches in Central Park.",
        goal: "$2,500",
        progress: 65,
        endDate: "2025-07-01",
      },
    ],
  };
};

const CommunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    area: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [safetyResourcesExpanded, setSafetyResourcesExpanded] = useState(false);

  // State for Add New Forms
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });
  const [newProfessional, setNewProfessional] = useState({
    name: "",
    profession: "",
    specialty: "",
    contact: "",
    phone: "",
  });
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    type: "",
    description: "",
    address: "",
    hours: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [newLostFoundItem, setNewLostFoundItem] = useState({
    type: "lost" as "lost" | "found",
    title: "",
    description: "",
    date: "",
    contact: "",
    isFound: false,
  });
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    description: "",
    goal: "",
    progress: 0,
    endDate: "",
  });

  // State for Expanded Modals
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [currentAnnouncementMessage, setCurrentAnnouncementMessage] =
    useState("");

  const [isProfessionalModalOpen, setIsProfessionalModalOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [currentProfessionalMessage, setCurrentProfessionalMessage] =
    useState("");

  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);

  const [isLostFoundModalOpen, setIsLostFoundModalOpen] = useState(false);
  type LostFoundItem = {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    contact: string;
    isFound: boolean;
  };

  const [selectedLostFoundItem, setSelectedLostFoundItem] =
    useState<LostFoundItem | null>(null);

  // Zustand store actions and state
  const {
    communities,
    messages,
    announcements: realAnnouncements,
    professionals: realProfessionals,
    businesses: realBusinesses,
    lostFoundItems: realLostFoundItems,
    campaigns: realCampaigns,
    updateCommunity,
    leaveCommunity,
    addMessage,
    addAnnouncement,
    addProfessional,
    addBusiness,
    addLostFoundItem,
    addCampaign,
    deleteMessage,
    deleteAnnouncement,
    deleteProfessional,
    deleteBusiness,
    deleteLostFoundItem,
    deleteCampaign,
  } = useCommunityStore();

  const community = communities.find((c) => c.id === id);

  // Get community-specific sample data
  const sampleData = community
    ? getCommunitySpecificData(community.name)
    : {
        messages: [],
        announcements: [],
        professionals: [],
        businesses: [],
        lostFoundItems: [],
        campaigns: [],
      };

  useEffect(() => {
    if (!id) {
      setError("Invalid community ID");
      navigate("/communities");
      return;
    }

    if (!community) {
      const unsubscribe = useCommunityStore.persist.onHydrate(() => {
        const hydratedCommunity = useCommunityStore
          .getState()
          .communities.find((c) => c.id === id);
        if (!hydratedCommunity) {
          setError("Community not found");
          navigate("/communities");
        } else {
          setEditData({
            name: hydratedCommunity.name,
            area: hydratedCommunity.area,
            description: hydratedCommunity.description,
          });
          setIsLoading(false);
        }
      });

      if (useCommunityStore.persist.hasHydrated()) {
        const hydratedCommunity = useCommunityStore
          .getState()
          .communities.find((c) => c.id === id);
        if (!hydratedCommunity) {
          setError("Community not found");
          navigate("/communities");
        } else {
          setEditData({
            name: hydratedCommunity.name,
            area: hydratedCommunity.area,
            description: hydratedCommunity.description,
          });
          setIsLoading(false);
        }
      } else {
        setIsLoading(true);
      }

      return () => {
        unsubscribe();
      };
    } else {
      setEditData({
        name: community.name,
        area: community.area,
        description: community.description,
      });
      setIsLoading(false);
    }
  }, [id, community, navigate]);

  // --- Community Actions ---
  const handleUpdateCommunity = () => {
    try {
      if (!id) throw new Error("No community ID");
      if (!editData.name || !editData.area || !editData.description) {
        toast({
          title: "Validation Error",
          description: "Community name, area, and description cannot be empty.",
          variant: "destructive",
        });
        return;
      }
      updateCommunity(id, editData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Community updated successfully!",
      });
    } catch (err) {
      console.error("Update error:", err);
      toast({
        title: "Error",
        description: "Failed to update community",
        variant: "destructive",
      });
    }
  };

  const handleLeaveCommunity = () => {
    try {
      if (!id) throw new Error("No community ID");
      leaveCommunity(id);
      toast({
        title: "Success",
        description: "You've left the community",
      });
      navigate("/communities");
    } catch (err) {
      console.error("Leave error:", err);
      toast({
        title: "Error",
        description: "Failed to leave community",
        variant: "destructive",
      });
    }
  };

  // --- Content Actions ---
  const handleSendMessage = () => {
    try {
      if (!id) throw new Error("No community ID");
      if (!messageInput.trim()) return;

      addMessage(id, {
        user: "Current User",
        avatar: DEFAULT_AVATAR,
        message: messageInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        replies: 0,
      });

      setMessageInput("");
    } catch (err) {
      console.error("Message error:", err);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const handleAddAnnouncement = () => {
    try {
      if (!id) throw new Error("No community ID");
      if (
        !newAnnouncement.title ||
        !newAnnouncement.description ||
        !newAnnouncement.date ||
        !newAnnouncement.time
      ) {
        toast({
          title: "Validation Error",
          description: "Please fill all announcement fields.",
          variant: "destructive",
        });
        return;
      }
      addAnnouncement(id, { ...newAnnouncement });
      toast({ title: "Success", description: "Announcement added." });
      setNewAnnouncement({ title: "", description: "", date: "", time: "" });
    } catch (err) {
      console.error("Add Announcement error:", err);
      toast({
        title: "Error",
        description: "Failed to add announcement.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAnnouncement = (announcementId: string) => {
    if (!id) return;
    deleteAnnouncement(id, announcementId);
    toast({ title: "Success", description: "Announcement deleted." });
    if (selectedAnnouncement?.id === announcementId) {
      setIsAnnouncementModalOpen(false);
      setSelectedAnnouncement(null);
    }
  };

  const handleAddProfessional = () => {
    if (!id) throw new Error("No community ID");
    if (
      !newProfessional.name ||
      !newProfessional.profession ||
      !newProfessional.contact
    ) {
      toast({
        title: "Validation Error",
        description:
          "Please fill all required professional fields (Name, Profession, Contact).",
        variant: "destructive",
      });
      return;
    }
    addProfessional(id, { ...newProfessional });
    toast({ title: "Success", description: "Professional added." });
    setNewProfessional({
      name: "",
      profession: "",
      specialty: "",
      contact: "",
      phone: "",
    });
  };

  const handleDeleteProfessional = (professionalId: string) => {
    if (!id) return;
    deleteProfessional(id, professionalId);
    toast({ title: "Success", description: "Professional deleted." });
    if (selectedProfessional?.id === professionalId) {
      setIsProfessionalModalOpen(false);
      setSelectedProfessional(null);
    }
  };

  const handleAddBusiness = () => {
    if (!id) throw new Error("No community ID");
    if (!newBusiness.name || !newBusiness.type || !newBusiness.address) {
      toast({
        title: "Validation Error",
        description:
          "Please fill all required business fields (Name, Type, Address).",
        variant: "destructive",
      });
      return;
    }
    addBusiness(id, { ...newBusiness });
    toast({ title: "Success", description: "Business added." });
    setNewBusiness({
      name: "",
      type: "",
      description: "",
      address: "",
      hours: "",
      contactEmail: "",
      contactPhone: "",
    });
  };

  const handleDeleteBusiness = (businessId: string) => {
    if (!id) return;
    deleteBusiness(id, businessId);
    toast({ title: "Success", description: "Business deleted." });
    if (selectedBusiness?.id === businessId) {
      setIsBusinessModalOpen(false);
      setSelectedBusiness(null);
    }
  };

  const handleAddLostFoundItem = () => {
    if (!id) throw new Error("No community ID");
    if (
      !newLostFoundItem.title ||
      !newLostFoundItem.description ||
      !newLostFoundItem.contact
    ) {
      toast({
        title: "Validation Error",
        description:
          "Please fill all required Lost & Found fields (Title, Description, Contact).",
        variant: "destructive",
      });
      return;
    }
    addLostFoundItem(id, { ...newLostFoundItem });
    toast({
      title: "Success",
      description: `Item reported as ${newLostFoundItem.type}.`,
    });
    setNewLostFoundItem({
      type: "lost",
      title: "",
      description: "",
      date: "",
      contact: "",
      isFound: false,
    });
  };

  const handleDeleteLostFoundItem = (itemId: string) => {
    if (!id) return;
    deleteLostFoundItem(id, itemId);
    toast({ title: "Success", description: "Item deleted." });
    if (selectedLostFoundItem?.id === itemId) {
      setIsLostFoundModalOpen(false);
      setSelectedLostFoundItem(null);
    }
  };

  const handleToggleFoundStatus = (itemId: string, currentStatus: boolean) => {
    if (!id) return;
    // In a real app, you would update this in the store
    toast({
      title: "Status Updated",
      description: `Item marked as ${!currentStatus ? "Found" : "Not Found"}.`,
    });
    if (selectedLostFoundItem && selectedLostFoundItem.id === itemId) {
      setSelectedLostFoundItem((prev) =>
        prev ? { ...prev, isFound: !currentStatus } : null
      );
    }
  };

  const handleAddCampaign = () => {
    if (!id) throw new Error("No community ID");
    if (
      !newCampaign.title ||
      !newCampaign.description ||
      !newCampaign.goal ||
      !newCampaign.endDate
    ) {
      toast({
        title: "Validation Error",
        description:
          "Please fill all required campaign fields (Title, Description, Goal, End Date).",
        variant: "destructive",
      });
      return;
    }
    if (newCampaign.progress < 0 || newCampaign.progress > 100) {
      toast({
        title: "Validation Error",
        description: "Progress must be between 0 and 100.",
        variant: "destructive",
      });
      return;
    }
    addCampaign(id, { ...newCampaign });
    toast({ title: "Success", description: "Campaign created." });
    setNewCampaign({
      title: "",
      description: "",
      goal: "",
      progress: 0,
      endDate: "",
    });
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (!id) return;
    deleteCampaign(id, campaignId);
    toast({ title: "Success", description: "Campaign deleted." });
  };

  // --- Announcement Discussion Actions ---
  const handleSendAnnouncementMessage = () => {
    if (!currentAnnouncementMessage.trim() || !selectedAnnouncement || !id)
      return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      user: "Current User",
      text: currentAnnouncementMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSelectedAnnouncement((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        comments: [...(prev.comments || []), newMessage],
      };
    });

    setCurrentAnnouncementMessage("");
  };

  // --- Professional Messaging Actions ---
  const handleSendProfessionalMessage = () => {
    if (!currentProfessionalMessage.trim() || !selectedProfessional || !id)
      return;

    const newMessage = {
      id: `prof-msg-${Date.now()}`,
      user: "Current User",
      text: currentProfessionalMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSelectedProfessional((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...(prev.messages || []), newMessage],
      };
    });

    setCurrentProfessionalMessage("");
  };

  if (error) {
    return (
      <MainLayout>
        <SectionContainer>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild>
              <Link to="/communities">Back to Communities</Link>
            </Button>
          </div>
        </SectionContainer>
      </MainLayout>
    );
  }

  if (isLoading || !community) {
    return (
      <MainLayout>
        <SectionContainer>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading community...</p>
          </div>
        </SectionContainer>
      </MainLayout>
    );
  }

  // Get real data for the current community
  const communityMessages = messages[id] || [];
  const communityAnnouncements = realAnnouncements[id] || [];
  const communityProfessionals = realProfessionals[id] || [];
  const communityBusinesses = realBusinesses[id] || [];
  const communityLostFoundItems = realLostFoundItems[id] || [];
  const communityCampaigns = realCampaigns[id] || [];

  // Combine real data with sample data for display
  const displayMessages = [
    ...sampleData.messages.filter(
      (sm) => !communityMessages.some((cm) => cm.id === sm.id)
    ),
    ...communityMessages,
  ];
  const displayAnnouncements = [
    ...sampleData.announcements.filter(
      (sa) => !communityAnnouncements.some((ra) => ra.id === sa.id)
    ),
    ...communityAnnouncements,
  ];
  const displayProfessionals = [
    ...sampleData.professionals.filter(
      (sp) => !communityProfessionals.some((rp) => rp.id === sp.id)
    ),
    ...communityProfessionals,
  ];
  const displayBusinesses = [
    ...sampleData.businesses.filter(
      (sb) => !communityBusinesses.some((rb) => rb.id === sb.id)
    ),
    ...communityBusinesses,
  ];
  const displayLostFoundItems = [
    ...sampleData.lostFoundItems.filter(
      (sl) => !communityLostFoundItems.some((rl) => rl.id === sl.id)
    ),
    ...communityLostFoundItems,
  ];
  const displayCampaigns = [
    ...sampleData.campaigns.filter(
      (sc) => !communityCampaigns.some((rc) => rc.id === sc.id)
    ),
    ...communityCampaigns,
  ];

  // Get appropriate icon based on community type
  const getCommunityIcon = () => {
    const lowerName = community.name.toLowerCase();

    if (
      lowerName.includes("giki") ||
      lowerName.includes("university") ||
      lowerName.includes("campus")
    ) {
      return <GraduationCap className="h-6 w-6" />;
    }
    if (
      lowerName.includes("pet") ||
      lowerName.includes("animal") ||
      lowerName.includes("dog") ||
      lowerName.includes("cat")
    ) {
      return <PawPrint className="h-6 w-6" />;
    }
    return <Users className="h-6 w-6" />;
  };

  return (
    <MainLayout>
      <SectionContainer>
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/communities" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Communities
            </Link>
          </Button>
        </div>

        {/* Community Header and Description (Editable) */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="edit-name" className="text-sm font-medium">
                    Community Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="text-3xl font-bold mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-area" className="text-sm font-medium">
                    Area/District
                  </Label>
                  <Input
                    id="edit-area"
                    value={editData.area}
                    onChange={(e) =>
                      setEditData({ ...editData, area: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="edit-description"
                    className="text-sm font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="text-muted-foreground mt-1"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleUpdateCommunity}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditData({
                        name: community.name,
                        area: community.area,
                        description: community.description,
                      });
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  {getCommunityIcon()}
                  <h1 className="text-3xl font-bold">{community.name}</h1>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{community.area}</span>
                  <span>•</span>
                  <Users className="h-4 w-4" />
                  <span>{community.members} members</span>
                </div>
                <p className="text-muted-foreground mb-4">
                  {community.description}
                </p>
              </>
            )}

            {/* Action Buttons */}
            {!isEditing && (
              <div className="flex flex-wrap gap-2 mt-4">
                {community.joined ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit MoodBoard
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Leave MoodB
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Leave Community?</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to leave {community.name}? You
                            will stop receiving updates and lose access to
                            member-only content.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={handleLeaveCommunity}
                            >
                              Leave Community
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => {
                      useCommunityStore.getState().joinCommunity(community.id);
                      toast({
                        title: "Joined!",
                        description: `You have successfully joined ${community.name}.`,
                      });
                    }}
                  >
                    Join Community
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Community Image */}
          <div className="w-full md:w-1/3 lg:w-1/4 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={community.image || DEFAULT_COMMUNITY_IMAGE}
              alt={community.name}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== DEFAULT_COMMUNITY_IMAGE) {
                  target.src = DEFAULT_COMMUNITY_IMAGE;
                }
              }}
            />
          </div>
        </div>

        {/* Community Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>

            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>

          {/* General Chat Tab Content */}
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Community Discussion</CardTitle>
                    <CardDescription>
                      Chat with your neighbors about community topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto p-2">
                      {displayMessages
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 p-3 rounded-lg shadow-sm ${
                              message.id.startsWith("sample-")
                                ? "bg-gradient-to-r from-[#F1F0FB] to-gray-50"
                                : "bg-muted/30"
                            }`}
                          >
                            <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                              <img
                                src={message.avatar || DEFAULT_AVATAR}
                                alt={message.user}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">{message.user}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {message.time}
                                </span>
                              </div>
                              <p className="text-sm mt-1">{message.message}</p>
                              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2"
                                  disabled={message.id.startsWith("sample-")}
                                >
                                  <MessageSquareDashed className="h-3.5 w-3.5 mr-1" />
                                  {message.replies} Replies
                                </Button>
                                {!message.id.startsWith("sample-") && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-red-500 hover:text-red-700"
                                    onClick={() =>
                                      deleteMessage(id, message.id)
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5 mr-1" />{" "}
                                    Delete
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      {displayMessages.length === 0 && (
                        <p className="text-center text-sm text-muted-foreground">
                          No messages yet. Start the conversation!
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 items-end">
                      <Textarea
                        placeholder="Write a message to the community..."
                        className="flex-1 resize-none"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        rows={1}
                      />
                      <Button
                        type="button"
                        size="icon"
                        className="h-10 w-10 flex-shrink-0"
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right sidebar with events and members */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Active Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {displayMessages
                        .reduce((acc: any[], current: any) => {
                          if (!acc.find((item) => item.user === current.user)) {
                            acc.push(current);
                          }
                          return acc;
                        }, [])
                        .slice(-3)
                        .map((message) => (
                          <div
                            key={`member-${message.user}`}
                            className="flex items-center gap-2"
                          >
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={message.avatar || DEFAULT_AVATAR}
                                alt={message.user}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                {message.user}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Recent activity
                              </p>
                            </div>
                          </div>
                        ))}
                      {displayMessages.length === 0 && (
                        <div className="text-muted-foreground text-sm">
                          No recent activity.
                        </div>
                      )}
                    </div>

                    <Button variant="ghost" className="w-full mt-3" disabled>
                      <User className="h-4 w-4 mr-1" />
                      View All Members
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Announcements Tab Content */}
          <TabsContent value="announcements">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Community Announcements</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Announcement</DialogTitle>
                      <DialogDescription>
                        Share important news with the community.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="announcement-title">
                          Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="announcement-title"
                          placeholder="Event title or headline"
                          value={newAnnouncement.title}
                          onChange={(e) =>
                            setNewAnnouncement({
                              ...newAnnouncement,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="announcement-description">
                          Description <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="announcement-description"
                          placeholder="Detailed information about the announcement"
                          value={newAnnouncement.description}
                          onChange={(e) =>
                            setNewAnnouncement({
                              ...newAnnouncement,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="announcement-date">
                            Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="announcement-date"
                            type="date"
                            value={newAnnouncement.date}
                            onChange={(e) =>
                              setNewAnnouncement({
                                ...newAnnouncement,
                                date: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="announcement-time">
                            Time <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="announcement-time"
                            type="time"
                            value={newAnnouncement.time}
                            onChange={(e) =>
                              setNewAnnouncement({
                                ...newAnnouncement,
                                time: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={() => {
                          handleAddAnnouncement();
                        }}
                      >
                        Add Announcement
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayAnnouncements.map((announcement, index) => {
                    const pastelColors = [
                      "#EFE9F4",
                      "#FADEE5",
                      "#E1F5FE",
                      "#E8F5E9",
                    ];
                    const cardColor = pastelColors[index % pastelColors.length];

                    return (
                      <motion.div
                        key={announcement.id}
                        className="rounded-lg overflow-hidden shadow-md cursor-pointer border transition-all duration-300 ease-in-out flex flex-col"
                        style={{
                          backgroundColor: cardColor,
                          borderColor: "#E5E7EB",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                        onClick={() => {
                          setSelectedAnnouncement(announcement);
                          setIsAnnouncementModalOpen(true);
                        }}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between items-start text-lg font-semibold">
                            <span>
                              {announcement.title}{" "}
                              {announcement.id.startsWith("sample-") && (
                                <Badge
                                  variant="outline"
                                  className="ml-2 text-xs"
                                >
                                  Sample
                                </Badge>
                              )}
                            </span>
                            {!announcement.id.startsWith("sample-") && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 p-1 h-7 w-7 ml-2 shrink-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAnnouncement(announcement.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />{" "}
                            {announcement.date} at {announcement.time}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground flex-grow">
                          <p className="line-clamp-3">
                            {announcement.description}
                          </p>
                        </CardContent>
                      </motion.div>
                    );
                  })}
                  {displayAnnouncements.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground py-8">
                      No announcements yet.
                    </div>
                  )}
                </div>
              </AnimatePresence>
            </div>

            {/* --- Expanded Announcement Modal --- */}
            <Dialog
              open={isAnnouncementModalOpen}
              onOpenChange={setIsAnnouncementModalOpen}
            >
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{selectedAnnouncement?.title}</DialogTitle>
                  <DialogDescription className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-1" />{" "}
                    {selectedAnnouncement?.date} at {selectedAnnouncement?.time}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                  <div>
                    <h4 className="text-md font-semibold mb-2">Details</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedAnnouncement?.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold mb-2">Discussion</h4>
                    <div className="space-y-3 max-h-40 overflow-y-auto border rounded-md p-3 bg-gray-50 mb-3">
                      {selectedAnnouncement?.comments?.length === 0 ? (
                        <p className="text-center text-sm italic text-muted-foreground">
                          No comments yet.
                        </p>
                      ) : (
                        selectedAnnouncement?.comments?.map(
                          (comment, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">
                                {comment.user}:
                              </span>{" "}
                              {comment.text}
                              <span className="text-xs text-muted-foreground ml-2">
                                {comment.time}
                              </span>
                            </div>
                          )
                        )
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Join the discussion..."
                        value={currentAnnouncementMessage}
                        onChange={(e) =>
                          setCurrentAnnouncementMessage(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendAnnouncementMessage();
                          }
                        }}
                      />
                      <Button
                        size="icon"
                        onClick={handleSendAnnouncementMessage}
                        disabled={!currentAnnouncementMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  {!selectedAnnouncement?.id.startsWith("sample-") && (
                    <Button
                      variant="destructive"
                      className="mr-auto"
                      onClick={() =>
                        selectedAnnouncement &&
                        handleDeleteAnnouncement(selectedAnnouncement.id)
                      }
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Announcement
                    </Button>
                  )}
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </SectionContainer>
    </MainLayout>
  );
};

export default CommunityDetail;

import { useState } from "react";
import {
  MessageSquare,
  Users,
  Calendar,
  MapPin,
  Edit,
  Send,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

// This component can be imported and used in routing like:
// <Route path="/moodboards/football" element={<FootballCommunityPage />} />

const MoodBoard = () => {
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    console.log("Message sent:", messageText);
    setMessageText("");
  };

  // Mock data for the page - in a real app, you'd likely fetch this from an API
  const moodboardData = {
    name: "Mindful Movers",
    memberCount: 125,
    location: "Wellness Grounds",
    description:
      "Combine movement and mindfulness with group activities like mindful walking, yoga, and grounding exercises to stay active and centered.",
  };

  const discussionPosts = [
    {
      id: 1,
      author: "Alex Morgan",
      initials: "AM",
      message: "Looking for a goalkeeper for our weekend league team!",
      time: "1 hour ago",
      replies: 1,
    },
    {
      id: 2,
      author: "David Beck",
      initials: "DB",
      message: "Anyone available for practice this Saturday at the city field?",
      time: "2 hours ago",
      replies: 3,
    },
    {
      id: 3,
      author: "Coach Smith",
      initials: "CS",
      message: "Team meeting tomorrow at 6pm to discuss tournament strategy",
      time: "30 minutes ago",
      replies: 0,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Field Maintenance",
      date: "May 7",
      time: "10:00 AM",
      description: "Main field will be closed for maintenance next Tuesday...",
    },
  ];

  const activeMembers = [
    {
      id: 1,
      name: "Alex Morgan",
      initials: "AM",
    },
    {
      id: 2,
      name: "David Beck",
      initials: "DB",
    },
    {
      id: 3,
      name: "Coach Smith",
      initials: "CS",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <Link
            to="/communities"
            className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition duration-200"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to MoodBoards
          </Link>
        </div>
      </div>

      {/* Moodboard Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                {moodboardData.name}
              </h1>
            </div>

            <div className="flex flex-wrap gap-4 mt-3 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{moodboardData.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                <span>{moodboardData.memberCount} members</span>
              </div>
            </div>

            <p className="mt-3 text-gray-700">{moodboardData.description}</p>

            <div className="flex gap-3 mt-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition duration-200">
                <Edit className="h-4 w-4 mr-2" />
                Edit MoodBoard
              </button>
              <button className="flex items-center px-4 py-2 border border-red-400 bg-white text-red-500 rounded-md hover:bg-red-50 transition duration-200">
                <Users className="h-4 w-4 mr-2" />
                Leave MoodBoard
              </button>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <div className="w-40 h-40 rounded-md overflow-hidden">
              <img
                src="/api/placeholder/140/140"
                alt="Mindful Movers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto">
            <button className="px-6 py-3 text-blue-600 border-b-2 border-blue-600 font-medium">
              General
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Moodboard Discussion */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  MoodBoard Discussion
                </h2>
                <p className="text-gray-600">
                  Chat with your neighbors about MoodBoard topics
                </p>
              </div>

              <div className="border-t border-gray-100">
                {/* Discussion items */}
                {discussionPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className={`p-6 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                  >
                    <div className="flex gap-3">
                      <div className="shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {post.initials}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-medium text-gray-900">
                            {post.author}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {post.time}
                          </span>
                        </div>
                        <p className="text-gray-700">{post.message}</p>
                        <div className="mt-2 flex items-center text-gray-500">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span className="text-sm">
                            {post.replies}{" "}
                            {post.replies === 1 ? "Reply" : "Replies"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Message input */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Write a message to the MoodBoard..."
                      className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <button
                      className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition duration-200"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Upcoming Events
                </h2>
              </div>

              <div className="border-t border-gray-100 p-6">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 bg-blue-50 rounded-md flex flex-col items-center justify-center">
                        <span className="text-xs text-blue-500 uppercase">
                          {event.date.split(" ")[0]}
                        </span>
                        <span className="text-xl font-bold text-blue-600">
                          {event.date.split(" ")[1]}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {event.name}
                      </h3>
                      <div className="flex items-center text-gray-600 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}

                <button className="flex items-center justify-center w-full mt-4 text-blue-600 hover:text-blue-700 transition duration-200">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>View All Announcements</span>
                </button>
              </div>
            </div>

            {/* Active Members */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Active Members
                </h2>
              </div>

              <div className="border-t border-gray-100">
                {activeMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-4 hover:bg-gray-50 transition duration-150"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        {member.initials}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-500">Recent activity</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="p-4 border-t border-gray-100">
                  <button className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700 transition duration-200">
                    <Users className="h-4 w-4 mr-1" />
                    <span>View All Members</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodBoard;

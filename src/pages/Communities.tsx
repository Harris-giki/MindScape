import { useState } from "react";
import { Plus, ArrowRight, X, Image, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const Communities = () => {
  const [activeTab, setActiveTab] = useState("my");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMoodBoard, setNewMoodBoard] = useState({
    name: "",
    location: "",
    description: "",
    image: null,
    imageName: "",
  });

  const [communityData, setCommunityData] = useState([
    {
      id: 1,
      name: "Mindful Movers",
      location: "Wellness Grounds",
      description:
        "Combine movement and mindfulness with group activities like mindful walking, yoga, and grounding exercises to stay active and centered.",
      members: 125,
      image: "3.jpg",
      joined: true,
    },
    {
      id: 2,
      name: "Islamabad Soul Space",
      location: "Islamabad Capital Territory",
      description:
        "A sanctuary for Islamabad residents to discuss mental health, share wellness resources, and organize local support gatherings.",
      members: 5300,
      image: "1.jpg",
      joined: true,
    },
    {
      id: 3,
      name: "MindScape@GIKI",
      location: "GIK Institute, Topi",
      description:
        "A safe space for GIKIans to talk about student life challenges, support each other, and explore mental well-being together.",
      members: 3800,
      image: "2.jpg",
      joined: true,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMoodBoard((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newId =
      communityData.length > 0
        ? Math.max(...communityData.map((c) => c.id)) + 1
        : 1;

    const newCommunity = {
      id: newId,
      name: newMoodBoard.name,
      location: newMoodBoard.location,
      description: newMoodBoard.description,
      members: 1, // Starting with just the creator
      image: "/images/default-moodboard.jpg", // In a real app, you'd handle file uploads differently
      joined: true,
    };

    setCommunityData([...communityData, newCommunity]);
    setNewMoodBoard({
      name: "",
      location: "",
      description: "",
      image: null,
      imageName: "",
    });
    setIsModalOpen(false);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewMoodBoard((prev) => ({
        ...prev,
        image: e.target.files[0],
        imageName: e.target.files[0].name,
      }));
    }
  };

  const fileInputRef = { current: null };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Banner with enhanced background */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-800 to-purple-600 py-16 px-4 rounded-lg mx-4 my-4 shadow-lg text-white relative overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-pattern opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-center mb-3 drop-shadow-md">
              Available MoodBoards
            </h1>
            <p className="text-center text-white text-lg max-w-2xl mx-auto">
              Join local GIKI's MoodBoards to connect with students across
              campus, share thoughts, ideas and discuss life!
            </p>
          </div>
        </motion.div>

        {/* Create Button */}
        <div className="flex justify-end px-4 my-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create MoodBoard
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex px-4 mt-4 mb-6">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "my"
                ? "bg-blue-800 text-white"
                : "bg-blue-100 text-blue-800"
            } rounded-lg mr-2 shadow-sm transition-all duration-200`}
            onClick={() => setActiveTab("my")}
          >
            My MoodBoards ({communityData.length})
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "discover"
                ? "bg-blue-800 text-white"
                : "bg-blue-100 text-blue-800"
            } rounded-lg ml-2 shadow-sm transition-all duration-200`}
            onClick={() => setActiveTab("discover")}
          >
            Discover (0)
          </motion.button>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-12">
          <AnimatePresence>
            {activeTab === "my" &&
              communityData.map((community) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg"
                >
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{community.name}</h2>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {community.location}
                    </div>
                    <p className="text-gray-700 mt-2 text-sm">
                      {community.description}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {/* View Button */}
                      <Link
                        to="/moodboard"
                        className="bg-white border border-gray-300 px-4 py-2 rounded-md text-blue-600 hover:bg-blue-50 text-sm shadow-sm text-center"
                      >
                        View
                      </Link>

                      {/* Leave Button */}
                      <button
                        className="bg-white border border-gray-300 px-4 py-2 rounded-md text-red-500 hover:bg-red-50 text-sm shadow-sm"
                        onClick={() =>
                          setCommunityData((prev) =>
                            prev.filter((c) => c.id !== community.id)
                          )
                        }
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Create MoodBoard Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X />
                </button>
                <h2 className="text-2xl font-bold mb-4">Create a MoodBoard</h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newMoodBoard.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={newMoodBoard.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={newMoodBoard.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    ref={(ref) => (fileInputRef.current = ref)}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center bg-gray-200 px-3 py-2 rounded-md text-sm hover:bg-gray-300"
                  >
                    <Image className="w-4 h-4 mr-2" />
                    {newMoodBoard.imageName || "Upload Image"}
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create MoodBoard
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
};

export default Communities;

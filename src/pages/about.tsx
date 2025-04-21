import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Heart, HandCoins, Shield, BookOpen, Globe, Award } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const AboutUs = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Community Building",
      description: "Connecting people all around to foster unity and brotherhood."
    },
    {
      icon: <HandCoins className="h-8 w-8 text-green-600" />,
      title: "BaitulMaal",
      description: "Transparent charity system to support those in need."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Safety Network",
      description: "Ensuring the security and well-being of our community members."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Islamic Resources",
      description: "Access to authentic Islamic knowledge and learning materials."
    },
    {
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      title: "Global Reach",
      description: "Serving People across different Areas and cultures."
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Excellence",
      description: "Committed to providing the highest quality services."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-500 mb-4">
              About HumQadam
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Empowering the community through technology, charity, and unity.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-100 rounded-full opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At HumQadam, we strive to create a platform that serves as a comprehensive hub for people all around. 
                Our mission is to facilitate community building, charitable giving, knowledge sharing, and safety 
                through innovative technology solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-3">Vision</h3>
                  <p className="text-gray-600">
                    To be the leading digital platform that unites and empowers the global community.
                  </p>
                </div>
                <div className="bg-teal-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-teal-700 mb-3">Values</h3>
                  <p className="text-gray-600">
                    Integrity, Compassion, Unity, Innovation, and Service to humanity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Sohail Shahzad", role: "Founder & CEO", bio: "Visionary leader with 1+ Weeks in community development." },
                { name: "Qasim Asghar", role: "Head of Charity & Co-Founder", bio: "Passionate about humanitarian work and social justice." },
                { name: "Hasnat Nawaz", role: "Tech Lead & Finance Manager", bio: "Expert in building scalable platforms for social impact." }
              ].map((member, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-600 text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-purple-600 mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-600 to-teal-500 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Join Our Community Today</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Be part of a growing network of Muslims working together to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="secondary">
                <Link to="/register">Sign Up Now</Link>
              </Button>
              <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
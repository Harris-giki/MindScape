import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const diagonalStripes = {
  backgroundImage: `repeating-linear-gradient(
    45deg,
    transparent,
    transparent 25px,
    rgba(50, 100, 255, 0.08) 25px,
    rgba(50, 100, 255, 0.08) 50px
  )`,
  backgroundBlendMode: "soft-light",
};

const Index = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      >
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="mb-6">
            We're having trouble loading the community page. Please try
            refreshing.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-600/90 text-white"
            >
              Refresh Page
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="relative py-16 md:py-24 overflow-hidden"
        style={diagonalStripes}
      >
        {/* Animated background elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            transition: {
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
          }}
          className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-blue-600/5 filter blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            transition: {
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: 5,
            },
          }}
          className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-blue-400/5 filter blur-3xl"
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content column */}
            <div>
              <motion.h1
                variants={fadeIn}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                Building Stronger{" "}
                <span className="text-blue-600">Communities</span> Together
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-gray-700 text-xl mb-8"
              >
                Connect, share resources, and support your neighbors for a
                better community life
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-600/90 text-white"
                    asChild
                  >
                    <Link to="/communities">Explore Communities</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-600/90 text-white ml-3"
                    asChild
                  >
                    <Link to="/MentalGPT">AI Assistance</Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                ></motion.div>
              </motion.div>
            </div>

            {/* Right image column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative z-20 border-4 border-white"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <img
                  src="/public/mindscape.jpg"
                  alt="Diverse community members together"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ed?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl z-10"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block z-30 border-l-4 border-blue-600"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <p className="font-heading text-blue-600 font-bold">
                  "Our community platform has brought neighbors closer than ever
                  before."
                </p>
                <p className="text-gray-600 text-sm mt-2">- Fatima, Lahore</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-blue-50"
      >
        <div className="container mx-auto px-4">
          <SectionHeading title="How MindScape Works" alignment="center" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Discover",
                description:
                  "Uncover your emotions through expressive mood boards. Identify mental patterns and themes in a safe, personalized space.",
                color: "blue",
              },
              {
                step: "2",
                title: "Connect",
                description:
                  "Engage with peers, alumni, and supporters. Share your experiences and receive thoughtful feedback and guidance.",
                color: "blue",
              },
              {
                step: "3",
                title: "Collaborate",
                description:
                  "Work together to build a culture of empathy and support. Contribute to emotional well-being through shared understanding.",
                color: "blue",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-16 h-16 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-blue-600/20`}
                >
                  <span className="font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </MainLayout>
  );
};

export default Index;

import React from 'react';
import { motion } from 'framer-motion';

// --- Abstract Shapes as React Components ---

const BlobShape = ({ color, size, position, animate }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{ ...position, opacity: 0.15 }} // Subtle opacity
        animate={animate}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }} // Slow animation
    >
        <path d="M289.5 37.5C354 85 382.5 163.5 376 238C369.5 312.5 328.5 380 254 392.5C179.5 405 79 362.5 29.5 291C-20 219.5 3.5 117.5 52 52C100.5 -13.5 225 0 289.5 37.5Z" fill={color}/>
    </motion.svg>
);

const WavyLineShape = ({ color, size, position, animate }) => (
    <motion.svg
        width={size * 2} // Adjust width for wavy shape
        height={size}
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{ ...position, opacity: 0.1 }} // Subtle opacity
         animate={animate}
         transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "linear" }} // Slow animation
    >
        <path d="M0 100C50 50 150 50 200 100C250 150 350 150 400 100" stroke={color} strokeWidth="50"/>
    </motion.svg>
);

const RoundedTriangleShape = ({ color, size, position, animate }) => (
     <motion.svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
        style={{ ...position, opacity: 0.2 }} // Subtle opacity
         animate={animate}
         transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }} // Slow animation
    >
        <path d="M150 0L300 260H0L150 0Z" fill={color}/>
        {/* Optional: Add stroke with a different color from your scheme */}
        {/* <path d="M150 0L300 260H0L150 0Z" stroke="#D946EF" strokeWidth="20"/> */}
    </motion.svg>
);


// --- Abstract Background Component ---

const AbstractBackground = () => {
    const primaryBaseColor = '#8B5CF6'; // Purple
    const pinkBaseColor = '#D946EF'; // Pink

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden"> {/* z-0 to be in background, overflow-hidden to clip shapes */}
            {/* Example usage of shapes with varied positions, sizes, and animations */}
            <BlobShape
                color={primaryBaseColor}
                size={300}
                position={{ top: '10%', left: '5%' }}
                animate={{ y: [0, 50, 0], rotate: [0, 30, 0] }}
            />
             <WavyLineShape
                color={pinkBaseColor}
                size={200}
                position={{ bottom: '5%', right: '10%' }}
                 animate={{ x: [0, 80, 0] }}
            />
             <RoundedTriangleShape
                color={primaryBaseColor}
                size={250}
                position={{ top: '40%', right: '15%' }}
                 animate={{ rotate: [0, -45, 0] }}
            />
             <BlobShape
                color={pinkBaseColor}
                size={200}
                position={{ bottom: '20%', left: '25%' }}
                animate={{ scale: [1, 1.1, 1] }}
            />
            {/* Add more shapes here with different properties as desired */}
        </div>
    );
};

export default AbstractBackground;
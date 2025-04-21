import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import SectionHeading from "@/components/ui/section-heading";
import {
    Search, Plus, X, MapPin, Clock, Send, User, Image as ImageIcon, UploadCloud,
    Heart, CheckCircle, Loader2, Trash2 // Added Trash2 icon for delete functionality
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Colors ---
// Using colors inferred from previous interactions (dark/purple/pink/white)
const primaryBaseColor = '#8B5CF6'; // Purple
const primaryHoverColor = '#7c3aed';
const pinkBaseColor = '#D946EF'; // Pink
const pinkHoverColor = '#c026d3';
const lightBgColor = '#F1F0FB'; // Very light purple/grey background
const cardBgColor = '#FFFFFF'; // White cards
const textColorPrimary = '#1F2937'; // Dark grey for main text/headings
const textColorSecondary = '#6B7280'; // Muted grey for secondary text
const borderColor = '#E5E7EB'; // Light grey for borders
const inputBgColor = '#F9FAFB'; // Very light grey for inputs
const successColor = '#10B981'; // Green for success tick
const errorColor = '#EF4444'; // Red (used for heart animation, maybe not ideal but kept from source)
const dangerColor = '#DC2626'; // Red for delete buttons

// --- Interfaces ---
interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Base64 or URL
  location: string;
  pickupTimes: string;
  giverName: string;
  giverProfilePicUrl?: string; // Base64 or URL
  giverContactInfo: string;
  price?: number; // Optional price in PKR
}

// --- Placeholder Data ---
// This data represents items that are part of the initial application load.
// These items should NOT be deletable by the user in this implementation.
const initialItems: Item[] = [
    {
        id: 'initial-1', // Keep unique IDs for initial items
        name: 'Old Books Collection',
        description: 'A mix of novels, textbooks, and magazines. Around 50 books.',
        imageUrl: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        location: 'Sector G-9, Islamabad',
        pickupTimes: 'Weekends 11 AM - 4 PM',
        giverName: 'Ali Khan', // Example Giver Name
        giverProfilePicUrl: `https://ui-avatars.com/api/?name=Ali+Khan&background=c084fc&color=fff`,
        giverContactInfo: 'Message via App',
        price: 0 // Example: Free item indicated by 0 or undefined
    },
    {
        id: 'initial-2', // Keep unique IDs for initial items
        name: 'Comfy Armchair',
        description: 'Single seater armchair, good condition, minor wear.',
        imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJmY2hhaXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        location: 'Sector F-11, Islamabad',
        pickupTimes: 'Weekdays after 6 PM',
        giverName: 'Fatima Ahmed', // Example Giver Name
        giverProfilePicUrl: `https://ui-avatars.com/api/?name=Fatima+Ahmed&background=f0abfc&color=fff`,
        giverContactInfo: 'Call 0312-3456789',
        price: 3500 // Example: Priced item
    },
     {
        id: 'initial-3',
        name: 'Kids Bicycle',
        description: 'Small bicycle for ages 5-8. Needs minor tire repair.',
        imageUrl: 'https://cdn.pixabay.com/photo/2021/10/26/16/51/amsterdam-6744567_1280.jpg',
        location: 'Bahria Town, Phase 4',
        pickupTimes: 'Any day 2 PM - 5 PM',
        giverName: 'Usman Ali',
        giverProfilePicUrl: `https://ui-avatars.com/api/?name=Usman+Ali&background=c084fc&color=fff`,
        giverContactInfo: 'Message via App',
        price: 0
    },
    {
        id: 'initial-4',
        name: 'Assorted Kitchen Utensils',
        description: 'Spoons, forks, knives, spatulas. Used but functional.',
        imageUrl: 'https://cdn.pixabay.com/photo/2017/09/05/01/27/kitchen-2716156_1280.png',
        location: 'Sector I-8, Islamabad',
        pickupTimes: 'Flexible, contact to arrange',
        giverName: 'Ayesha Khan',
        giverProfilePicUrl: `https://ui-avatars.com/api/?name=Ayesha+Khan&background=f0abfc&color=fff`,
        giverContactInfo: 'Message via App',
        price: 0
    },
    {
        id: 'initial-5',
        name: 'Box of Clothes',
        description: 'Mixed adult clothing, various sizes. Cleaned and folded.',
        imageUrl: 'https://cdn.pixabay.com/photo/2014/08/26/21/48/sweatshirts-428607_1280.jpg',
        location: 'Sector E-7, Islamabad',
        pickupTimes: 'Sunday mornings',
        giverName: 'Zainab Bilal',
        giverProfilePicUrl: `https://ui-avatars.com/api/?name=Zainab+Bilal&background=c084fc&color=fff`,
        giverContactInfo: 'Message via App',
        price: 0
    },
];


// --- Local Storage Key ---
const LOCAL_STORAGE_KEY = 'communityShareItems';

// --- Helper Functions for localStorage ---
const loadItemsFromStorage = (): Item[] | null => {
  try {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedItems) {
         // Filter out initial items from stored items to avoid duplicates on load
         const parsedItems: Item[] = JSON.parse(storedItems);
         const userAddedItems = parsedItems.filter(item =>
             !initialItems.some(initial => initial.id === item.id)
         );
         return userAddedItems;
    }
    return null;
  } catch (error) {
    console.error('Failed to load items from localStorage:', error);
    return null;
  }
};

const saveItemsToStorage = (items: Item[]) => {
  try {
     // Only save items that are NOT in the initialItems list
     const userAddedItems = items.filter(item =>
         !initialItems.some(initial => initial.id === item.id)
     );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userAddedItems));
  } catch (error) {
    console.error('Failed to save items to localStorage:', error);
  }
};


// --- Heart Animation Component ---
const HeartRain: React.FC = () => {
    const hearts = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // vw
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        size: 15 + Math.random() * 15,
    })), []);
    return (
        <div className="fixed inset-0 pointer-events-none z-[100]" aria-hidden="true">
            {hearts.map(heart => (
                <motion.div
                    key={heart.id}
                    className="absolute"
                    initial={{ top: '-10%', opacity: 1 }}
                    animate={{ top: '110%', opacity: 0 }}
                    transition={{
                        duration: heart.duration,
                        delay: heart.delay,
                        ease: "linear"
                    }}
                    style={{ left: `${heart.x}vw` }} // Use left for x positioning
                >
                    {/* Using errorColor which is red */}
                    <Heart size={heart.size} className="text-red-500 fill-current" fill={errorColor}/>
                </motion.div>
            ))}
        </div>
    );
};


// --- Main Component ---
const CommunitySharePage: React.FC = () => {
  // Load user-added items from storage and combine with initial items
  const [items, setItems] = useState<Item[]>(() => {
      const userItems = loadItemsFromStorage() || [];
      // Ensure initial items are always present and appear first
      return [...initialItems, ...userItems];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // Add Item Form State
  const [newItem, setNewItem] = useState({
    name: '', description: '', location: '', pickupTimes: '',
    giverName: '', giverContactInfo: '', price: '' // Added price field
  });
  const [itemImageFile, setItemImageFile] = useState<File | null>(null);
  const [itemImagePreview, setItemImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessTick, setShowSuccessTick] = useState(false);

  // Donation State
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number | string>(''); // Can be preset number or custom string
  const [showHearts, setShowHearts] = useState(false);

  // Chat State (Simulated)
  const [messageInput, setMessageInput] = useState('');
  const [sentMessages, setSentMessages] = useState<string[]>([]); // Store sent messages


  // --- Effects ---
  useEffect(() => { // Save user-added items to localStorage whenever 'items' state changes
    saveItemsToStorage(items);
  }, [items]);

  useEffect(() => { // Image preview cleanup
    // Revoke the object URL when the component unmounts or when itemImagePreview changes
    return () => {
      if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);
    };
  }, [itemImagePreview]); // Dependency on itemImagePreview


  useEffect(() => { // Heart animation timer
    let timer: NodeJS.Timeout;
    if (showHearts) {
      timer = setTimeout(() => setShowHearts(false), 4000); // Duration of animation + buffer
    }
    return () => clearTimeout(timer);
  }, [showHearts]); // Dependency on showHearts


  // --- Helper to check if an item is one of the initial predefined ones ---
  const isInitialItem = useCallback((itemId: string): boolean => {
      return initialItems.some(item => item.id === itemId);
  }, []);


  // --- Filter Logic ---
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.location.toLowerCase().includes(term) ||
      item.giverName.toLowerCase().includes(term) // Allow searching by giver name
    );
  }, [items, searchTerm]); // Dependencies for recalculation


  // --- General Handlers ---
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []); // No dependencies needed


  const openViewItemModal = useCallback((item: Item) => {
    setSelectedItem(item);
    setIsViewItemModalOpen(true);
    // Reset chat simulation when viewing a new item
    setMessageInput('');
    setSentMessages([]);
  }, []); // No dependencies needed


  const closeViewItemModal = useCallback(() => {
    setIsViewItemModalOpen(false);
    // Delay clearing selectedItem state until after modal exit animation completes
    setTimeout(() => setSelectedItem(null), 300);
  }, []); // No dependencies needed


  // --- Add Item Handlers ---
  const openAddItemModal = useCallback(() => {
    // Reset all form state when opening the modal
    setNewItem({ name: '', description: '', location: '', pickupTimes: '', giverName: '', giverContactInfo: '', price: '' });
    setItemImageFile(null); // Clear selected file
    setItemImagePreview(null); // Clear image preview
    setShowSuccessTick(false); // Hide success tick
    setIsSubmitting(false); // Not submitting yet
    setIsAddItemModalOpen(true); // Open the modal
  }, []); // No dependencies needed


  const closeAddItemModal = useCallback(() => {
    setIsAddItemModalOpen(false);
    // Clean up the object URL for image preview when closing
    if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);
    setItemImagePreview(null); // Clear preview
    setItemImageFile(null); // Clear file
    // Submitting/success states are reset on next open
  }, [itemImagePreview]); // Dependency on itemImagePreview to revoke URL


  const handleNewItemInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
     // Prevent non-numeric input for price, but allow empty string
    if (name === 'price' && value !== '' && !/^\d*\.?\d*$/.test(value)) {
         return; // Do not update state if input is invalid for price
    }
    setNewItem(prev => ({ ...prev, [name]: value }));
  }, []); // No dependencies needed


  const handleItemImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Optional: Add file type/size validation here
      // if (file.size > 1024 * 1024) { alert("File is too large!"); return; }
      // if (!['image/jpeg', 'image/png'].includes(file.type)) { alert("Invalid file type!"); return; }

      // Clean up previous preview URL if it exists
      if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);

      // Create a new object URL for the selected file and set preview state
      const previewUrl = URL.createObjectURL(file);
      setItemImageFile(file);
      setItemImagePreview(previewUrl);
    } else {
        // If no file is selected (e.g., user cancels file picker)
        if (itemImagePreview) URL.revokeObjectURL(itemImagePreview);
        setItemImageFile(null);
        setItemImagePreview(null);
    }
  }, [itemImagePreview]); // Dependency on itemImagePreview to revoke URL


  // Helper function to convert File to Data URL (useful for saving to localStorage)
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAddItemSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (isSubmitting || showSuccessTick) return; // Prevent double submission

    setIsSubmitting(true); // Start submitting state
    setShowSuccessTick(false); // Ensure success tick is hidden initially

    let imageBase64Url: string | undefined = undefined;
    if (itemImageFile) {
      try {
        // Convert image file to Data URL (Base64) for local storage/display
        imageBase64Url = await readFileAsDataURL(itemImageFile);
      } catch (error) {
        console.error("Error reading image file:", error);
        setIsSubmitting(false); // Reset submitting state on error
        // TODO: Show user feedback about image error (e.g., using a toast)
        return; // Stop the submission process
      }
    }

    // Handle Price: Convert to number, or undefined if empty/invalid
    const priceValue = newItem.price.trim();
    const priceNumber = priceValue !== '' ? parseFloat(priceValue) : undefined;

    const itemToAdd: Item = {
      // Use crypto.randomUUID() for a robust unique ID for new items
      id: crypto.randomUUID(),
      name: newItem.name,
      description: newItem.description,
      location: newItem.location,
      pickupTimes: newItem.pickupTimes,
      giverName: newItem.giverName,
      giverContactInfo: newItem.giverContactInfo,
      imageUrl: imageBase64Url, // Use the Base64 URL or undefined
      // Store valid, non-negative price or undefined
      price: (priceNumber !== undefined && !isNaN(priceNumber) && priceNumber >= 0) ? priceNumber : undefined,
      // Generate a profile pic URL based on the giver's name
      giverProfilePicUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(newItem.giverName || '??')}&background=random&color=fff`,
    };

    // Simulate backend delay (optional, remove in production)
    // await new Promise(resolve => setTimeout(resolve, 500));

    // Update the state with the new item (add it to the top)
    setItems(prev => [itemToAdd, ...prev]);

    setIsSubmitting(false); // End submitting state
    setShowSuccessTick(true); // Show success tick

    // Close the modal after a short delay to show the success tick
    setTimeout(() => {
       closeAddItemModal();
       // Reset success tick state (optional, can also be done on next modal open)
       setShowSuccessTick(false);
    }, 1500); // Keep modal open for 1.5 seconds showing the tick

  }, [newItem, itemImageFile, closeAddItemModal, isSubmitting, showSuccessTick]); // Added dependencies for useCallback


  // --- Delete Item Handlers ---
  // Opens the delete confirmation modal for a specific item ID
  const openDeleteConfirmModal = useCallback((itemId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the view modal when clicking the trash icon

    // Add a check here: only open delete confirmation if the item is NOT one of the initial items
    if (!isInitialItem(itemId)) {
        setItemToDelete(itemId); // Set the ID of the item to be deleted
        setIsDeleteModalOpen(true); // Open the confirmation modal
    } else {
        // Optionally provide feedback to the user (e.g., a toast notification)
        console.log("Cannot delete predefined items.");
        // Example toast (requires a toast component, like shadcn/ui Toaster)
        // toast({ title: "Action Denied", description: "You cannot delete predefined items.", variant: "destructive" });
    }
  }, [isInitialItem]); // Dependency on isInitialItem helper


  // Closes the delete confirmation modal
  const closeDeleteConfirmModal = useCallback(() => {
    setIsDeleteModalOpen(false); // Close the modal
    // Delay clearing itemToDelete state until after modal exit animation
    setTimeout(() => setItemToDelete(null), 300);
  }, []); // No dependencies needed


  // Confirms the deletion and removes the item from the state
  const confirmDelete = useCallback(() => {
    if (itemToDelete) {
        // Safeguard: Double-check that the item is not an initial item before deleting
        if (!isInitialItem(itemToDelete)) {
            // Filter the items array to remove the item with the matching ID
            setItems(prev => prev.filter(item => item.id !== itemToDelete));

            // If the deleted item is currently being viewed in the detail modal, close that modal too
            if (selectedItem && selectedItem.id === itemToDelete) {
                closeViewItemModal(); // Close the view modal
            }
        } else {
             console.log("Attempted to delete a predefined item via confirmDelete (safeguard).");
        }
      closeDeleteConfirmModal(); // Close the confirmation modal
    }
  }, [itemToDelete, closeDeleteConfirmModal, selectedItem, closeViewItemModal, isInitialItem]); // Dependencies


  // --- Donation Handlers ---
  const handleDonateNowClick = useCallback(() => {
    setDonationAmount(''); // Reset amount
    setIsDonationOpen(true); // Open donation modal
  }, []);


  const handleDonationAmountSelect = useCallback((amount: number | string) => {
    setDonationAmount(amount); // Set the selected amount (can be number from presets or string from custom input)
  }, []);


  const handleConfirmDonation = useCallback(() => {
    const finalAmount = typeof donationAmount === 'number' ? donationAmount : parseFloat(donationAmount);

    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter a valid donation amount."); // Simple validation
      return;
    }

    console.log(`Donating PKR ${finalAmount}... (Simulation)`);
    // In a real application: Integrate with a payment gateway here

    setIsDonationOpen(false); // Close donation modal
    setShowHearts(true); // Trigger heart animation for visual feedback
  }, [donationAmount]); // Dependency on donationAmount


  // --- Chat Simulation Handlers (for View Item Modal) ---
  const handleMessageInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value); // Update message input state
  }, []);


  const handleSendMessage = useCallback(() => {
    if (messageInput.trim()) { // Check if message is not empty
      setSentMessages(prev => [...prev, messageInput]); // Add user message to chat
      setMessageInput(''); // Clear input field

      // Simulate a reply from the giver after a short delay
      setTimeout(() => {
        setSentMessages(prev => [...prev, `Thanks for your message! The owner will get back to you soon.`]);
        // In a real app, this would involve sending the message to a backend/messaging service
      }, 1000); // Simulate typing/response delay
    }
  }, [messageInput]); // Dependency on messageInput


  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Send message on Enter key press
      e.preventDefault(); // Prevent default newline behavior in input
      handleSendMessage(); // Call the send message handler
    }
  }, [handleSendMessage]); // Dependency on handleSendMessage


  // --- Generic Image Error Handler ---
  // Handles cases where an image fails to load, replacing it with a placeholder
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>, defaultText: string = "No Image") => {
    const img = e.currentTarget;
    img.onerror = null; // Prevent infinite loop if the placeholder also fails (unlikely)
    // Use a placeholder service or a local placeholder image
    img.src = `https://via.placeholder.com/300x200/e5e7eb/4b5563?text=${encodeURIComponent(defaultText)}`;
    img.className = img.className + ' object-contain'; // Ensure placeholder text is visible
  }, []);


  return (
    <MainLayout>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: lightBgColor }}>

        {/* Heart Rain Animation Overlay */}
        <AnimatePresence>
            {showHearts && <HeartRain />}
        </AnimatePresence>

      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6"> {/* Reduced margin */}
            <h1 className="text-4xl font-bold mb-4" style={{ color: textColorPrimary }}>Baitul-Maal</h1>
            <p className="text-lg" style={{ color: textColorSecondary }}>Share items, find treasures, spread kindness.</p> {/* Updated tagline */}
        </div>

        {/* Action Bar: Search and Add */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-3xl mx-auto"> {/* Reduced margin */}
            {/* Search Input */}
            <div className="relative flex-grow">
                {/* Search icon positioned inside the input */}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: textColorSecondary }} />
                <input
                    type="text"
                    placeholder="Search items, locations, givers..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                />
            </div>
            {/* List Item Button */}
            <button
                onClick={openAddItemModal}
                className="flex items-center justify-center px-4 py-2 rounded-lg shadow-md transition-colors duration-200"
                style={{ backgroundColor: primaryBaseColor, color: 'white' }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = primaryHoverColor}
                onMouseOut={e => e.currentTarget.style.backgroundColor = primaryBaseColor}
            >
                <Plus size={20} className="mr-2" /> List New Item
            </button>
        </div>

        {/* --- Donation Strip --- */}
        {/* Added Donation strip based on previous request/context */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4" style={{ background: 'linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.1))' }}>
            <div className="flex items-center gap-3">
                {/* Heart icon */}
                <Heart size={24} fill={errorColor} className="text-red-600 flex-shrink-0"/>
                <span className="text-sm md:text-base font-medium text-center sm:text-left" style={{ color: textColorPrimary }}>
                    Support Palestine Relief Efforts
                </span>
            </div>
            {/* Donate Now Button */}
            <button
                onClick={handleDonateNowClick}
                className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all flex-shrink-0"
                style={{ '--tw-ring-offset-color': cardBgColor } as React.CSSProperties } // Use cardBgColor for ring offset
            >
                Donate Now
            </button>
        </div>


        {/* --- Item Listing Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* AnimatePresence for exit animations when items are filtered out or deleted */}
          <AnimatePresence>
            {filteredItems.map(item => (
              // Each item is a clickable motion div for animations
              <motion.div key={item.id}
                className="rounded-lg overflow-hidden shadow-md cursor-pointer border transition-all duration-300 ease-in-out flex flex-col bg-white" /* Ensure bg is white for card */
                style={{ borderColor: borderColor }}
                onClick={() => openViewItemModal(item)} // Click the whole card to open view modal
                // whileHover animation for scaling and border highlight
                whileHover={{ scale: 1.03, borderColor: primaryBaseColor, boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.1)' }}
                // Initial and animate states for entrance animation
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // Exit state for removal animation
                exit={{ opacity: 0, scale: 0.9 }}
                layout // Helps with animation when items are filtered or added/removed
              >
                {/* Item Image Container */}
                <div className="relative">
                    {/* Item Image */}
                    <img
                        src={item.imageUrl || `https://via.placeholder.com/300x200/e5e7eb/4b5563?text=No+Image`}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                        onError={(e) => handleImageError(e, "No Image")} // Handle image loading errors
                    />

                    {/* Price Tag (PKR) */}
                    {item.price !== undefined && item.price > 0 && (
                        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                           PKR {item.price.toLocaleString()} {/* Format price */}
                        </div>
                    )}
                     {/* Free Tag */}
                    {(item.price === undefined || item.price === 0) && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                            FREE
                        </div>
                    )}

                    {/* === MODIFIED: Conditionally render Delete Button === */}
                    {/* The Trash icon button is only rendered if the item is NOT one of the initial predefined items */}
                    {/* This implements the requirement that only locally added items can be removed */}
                    {!isInitialItem(item.id) && (
                        <button
                           // Use a separate handler to prevent triggering the view modal when clicking the trash icon
                           onClick={(e) => openDeleteConfirmModal(item.id, e)}
                           className="absolute bottom-2 right-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow transition-all"
                           style={{ color: dangerColor }} // Use danger color (red)
                           title="Remove listing" // Add a tooltip for accessibility
                        >
                            <Trash2 size={18} /> {/* Trash icon */}
                        </button>
                    )}
                    {/* === END MODIFIED === */}
                </div>

                {/* Item Info Content */}
                <div className="p-4 flex flex-col flex-grow"> {/* flex-grow makes card height more consistent */}
                    <h3 className="text-lg font-semibold mb-2" style={{ color: textColorPrimary }}>{item.name}</h3>
                    {/* Line-clamp utility for truncating description */}
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: textColorSecondary }}>{item.description}</p>
                    {/* Location */}
                    <div className="flex items-center text-xs mb-1" style={{ color: textColorSecondary }}>
                        <MapPin size={14} className="mr-1 flex-shrink-0" /> {/* Location icon */}
                        <span className="truncate">{item.location}</span> {/* Truncate long location text */}
                    </div>
                    {/* Pickup Times */}
                    <div className="flex items-center text-xs mb-1" style={{ color: textColorSecondary }}>
                        <Clock size={14} className="mr-1 flex-shrink-0" /> {/* Clock icon */}
                        <span className="truncate">{item.pickupTimes}</span> {/* Truncate long times text */}
                    </div>
                     {/* Giver Name */}
                    <div className="flex items-center text-xs mt-1" style={{ color: textColorSecondary }}>
                        <User size={14} className="mr-1 flex-shrink-0" /> {/* User icon */}
                         {/* Display Giver Name */}
                        <span className="truncate">Given by: {item.giverName}</span>
                    </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Message when no items match the search */}
          {(filteredItems.length === 0) && (
            <div className="col-span-full text-center py-10">
              <p className="text-lg" style={{ color: textColorSecondary }}>No items found matching your search.</p>
              {/* Button to clear search */}
              {searchTerm && (
                 <button
                   onClick={() => setSearchTerm('')}
                   className="mt-4 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                   style={{ backgroundColor: primaryBaseColor, color: 'white' }}
                   onMouseOver={e => e.currentTarget.style.backgroundColor = primaryHoverColor}
                   onMouseOut={e => e.currentTarget.style.backgroundColor = primaryBaseColor}
                 >
                   Clear Search
                 </button>
              )}
            </div>
          )}
        </div>


        {/* --- Modals --- */}

        {/* Add Item Modal */}
        {/* AnimatePresence for modal entrance/exit animations */}
        <AnimatePresence>
          {isAddItemModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }} // Initial state (hidden)
              animate={{ opacity: 1 }} // Animate to visible
              exit={{ opacity: 0 }} // Exit animation
              onClick={closeAddItemModal} // Close modal when clicking outside
            >
              {/* Modal Content */}
              <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto relative" // Added max height and overflow scroll
                initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
                animate={{ scale: 1, opacity: 1 }} // Animate to full size and visible
                exit={{ scale: 0.9, opacity: 0 }} // Exit animation
                onClick={e => e.stopPropagation()} // Prevent click inside modal from closing it
              >
                {/* Close Button */}
                <button
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={closeAddItemModal}
                 >
                    <X size={24} />
                 </button>

                 {/* Modal Title */}
                 <h2 className="text-2xl font-bold mb-6" style={{ color: textColorPrimary }}>List a New Item</h2>

                 {/* Add Item Form */}
                 <form onSubmit={handleAddItemSubmit} className="space-y-5">

                     {/* Image Upload Section */}
                     <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: textColorPrimary }}>Item Image (Optional)</label>
                        <div
                            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all hover:border-purple-400"
                            style={{ borderColor: itemImagePreview ? primaryBaseColor : borderColor }}
                            onClick={() => fileInputRef.current?.click()} // Trigger hidden file input click
                        >
                            {/* Hidden File Input */}
                            <input
                                ref={fileInputRef} // Ref to access the input element
                                type="file"
                                accept="image/*" // Accept only image files
                                className="hidden" // Hide the default file input
                                onChange={handleItemImageChange} // Handle file selection
                            />

                            {/* Image Preview or Placeholder */}
                            {itemImagePreview ? (
                                <img
                                    src={itemImagePreview} // Display the object URL preview
                                    alt="Item Preview"
                                    className="h-40 mx-auto object-contain rounded" // Object-contain to fit without cropping
                                />
                            ) : (
                                <div className="py-6">
                                    {/* Upload icon */}
                                    <UploadCloud size={40} className="mx-auto mb-2" style={{ color: textColorSecondary }} />
                                    <p className="text-sm" style={{ color: textColorSecondary }}>Click or drag image here</p>
                                </div>
                            )}
                           </div>
                     </div>

                      {/* Text Inputs Grid (Main Item Details) */}
                      <div className="grid grid-cols-1 gap-5">
                          <div>
                            <label htmlFor="name" className="sr-only">Item Name</label> {/* Screen reader only label */}
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={newItem.name}
                                onChange={handleNewItemInputChange}
                                required // Make field required
                                placeholder="Item Name"
                                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                                style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                            />
                          </div>
                          <div>
                            <label htmlFor="description" className="sr-only">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newItem.description}
                                onChange={handleNewItemInputChange}
                                required
                                rows={3} // Set number of visible rows
                                placeholder="Description..."
                                className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                                style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                            />
                          </div>

                          {/* Price Input (Optional) */}
                           <div>
                                <label htmlFor="price" className="sr-only">Price (PKR, optional)</label>
                                <div className="relative rounded-md shadow-sm">
                                     {/* PKR currency symbol inside the input */}
                                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                         <span className="text-gray-500 sm:text-sm">PKR</span>
                                     </div>
                                     <input
                                         type="number" // Use number type for price
                                         id="price"
                                         name="price"
                                         value={newItem.price}
                                         onChange={handleNewItemInputChange}
                                         min="0" // Minimum price is 0
                                         step="1" // Allow decimal steps if needed, or '1' for whole numbers
                                         placeholder="0 (Leave empty if free)"
                                         className="w-full pl-12 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                                         style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Enter price or leave empty/0 if the item is free.</p>
                           </div>

                          {/* Location and Pickup Times Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                               <div>
                                 <label htmlFor="location" className="sr-only">Pickup Location</label>
                                 <input
                                     id="location"
                                     name="location"
                                     type="text"
                                     value={newItem.location}
                                     onChange={handleNewItemInputChange}
                                     required
                                     placeholder="Pickup Location..."
                                     className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                                     style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                                 />
                               </div>
                               <div>
                                 <label htmlFor="pickupTimes" className="sr-only">Pickup Times</label>
                                 <input
                                     id="pickupTimes"
                                     name="pickupTimes"
                                     type="text"
                                     value={newItem.pickupTimes}
                                     onChange={handleNewItemInputChange}
                                     required
                                     placeholder="Preferred Pickup Times..."
                                     className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                                     style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                                 />
                               </div>
                           </div>

                           {/* Giver Info Grid */}
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                               <div>
                                 <label htmlFor="giverName" className="sr-only">Your Name</label>
                                 <input
                                     id="giverName"
                                     name="giverName"
                                     type="text"
                                     value={newItem.giverName}
                                     onChange={handleNewItemInputChange}
                                     required
                                     placeholder="Your Name"
                                     className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                                     style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                                 />
                               </div>
                               <div>
                                 <label htmlFor="giverContactInfo" className="sr-only">Contact Method</label>
                                 <input
                                     id="giverContactInfo"
                                     name="giverContactInfo"
                                     type="text"
                                     value={newItem.giverContactInfo}
                                     onChange={handleNewItemInputChange}
                                     required
                                     placeholder="Preferred Contact Method..."
                                     className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent"
                                     style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                                 />
                               </div>
                           </div>
                      </div>

                      {/* Submit Button with States */}
                      <div className="pt-4">
                           <button
                                type="submit"
                                disabled={isSubmitting || showSuccessTick} // Disable button while submitting or on success
                                className={`w-full px-4 py-2.5 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all flex items-center justify-center ${isSubmitting || showSuccessTick ? 'cursor-not-allowed' : ''}`}
                                style={{
                                    backgroundColor: showSuccessTick ? successColor : primaryBaseColor, // Green on success, purple otherwise
                                    opacity: isSubmitting ? 0.7 : 1, // Reduced opacity while submitting
                                    color: 'white',
                                    '--tw-ring-color': showSuccessTick ? successColor : primaryBaseColor,
                                    '--tw-ring-offset-color': cardBgColor // Ring offset color matches modal background
                                } as React.CSSProperties}
                                // Hover effects only active when not submitting or showing success
                                onMouseOver={e => !isSubmitting && !showSuccessTick ? e.currentTarget.style.backgroundColor = primaryHoverColor : null}
                                onMouseOut={e => !isSubmitting && !showSuccessTick ? e.currentTarget.style.backgroundColor = primaryBaseColor : null}
                           >
                               {/* Button content changes based on state */}
                               {showSuccessTick ? (
                                    <> <CheckCircle size={20} className="mr-2"/> Listed Successfully! </> // Success state
                                ) : isSubmitting ? (
                                    <> <Loader2 size={20} className="mr-2 animate-spin"/> Listing... </> // Submitting state
                                ) : (
                                    <> <UploadCloud size={20} className="mr-2"/> List Item </> // Default state
                                )}
                           </button>
                       </div>
                 </form>
               </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* View Item Modal */}
         {/* AnimatePresence for modal entrance/exit animations */}
         <AnimatePresence>
            {isViewItemModalOpen && selectedItem && (
                <motion.div
                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                     initial={{ opacity: 0 }} // Initial state (hidden)
                     animate={{ opacity: 1 }} // Animate to visible
                     exit={{ opacity: 0 }} // Exit animation
                     onClick={closeViewItemModal} // Close modal when clicking outside
                >
                    {/* Modal Content */}
                    <motion.div
                        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto relative" // Added max height and overflow scroll
                        initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
                        animate={{ scale: 1, opacity: 1 }} // Animate to full size and visible
                        exit={{ scale: 0.9, opacity: 0 }} // Exit animation
                        onClick={e => e.stopPropagation()} // Prevent click inside modal from closing it
                    >
                        {/* Close Button */}
                        <button
                            className="absolute right-6 top-6 z-10 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={closeViewItemModal}
                        >
                            <X size={24} />
                        </button>

                        {/* Giver Info Section */}
                        <div className="flex items-center mb-5 pb-4 border-b" style={{ borderColor: borderColor }}>
                           {/* Giver Profile Picture/Avatar */}
                           <img
                               src={selectedItem.giverProfilePicUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.giverName)}&background=random&color=fff`}
                                alt={selectedItem.giverName}
                                className="w-12 h-12 rounded-full mr-3 object-cover" // object-cover to prevent stretching
                                // Handle error for profile pic
                                onError={(e) => {
                                     const img = e.currentTarget;
                                     img.onerror = null; // Prevent infinite loop
                                     img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedItem.giverName.substring(0,2) || "??")}&background=random&color=fff`;
                                     img.className = img.className + ' object-contain'; // Adjust class for avatar
                                }}
                           />
                           {/* Giver Name and Contact */}
                           <div className="flex-grow">
                                <p className="text-xs" style={{ color: textColorSecondary }}>Listed by:</p>
                                <h3 className="text-md font-medium" style={{ color: textColorPrimary }}>{selectedItem.giverName}</h3>
                                 {/* Display Contact Info */}
                                <p className="text-sm" style={{ color: textColorSecondary }}>Contact: {selectedItem.giverContactInfo}</p>
                           </div>

                           {/* === MODIFIED: Conditionally render Delete Button in View Modal === */}
                           {/* The Trash icon button is only rendered if the item is NOT one of the initial predefined items */}
                           {/* This ensures the delete option is only available for user-added items */}
                           {selectedItem.id && !isInitialItem(selectedItem.id) && (
                               <button
                                    // Call the delete handler, stopping event propagation
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent closing the modal when clicking trash
                                        openDeleteConfirmModal(selectedItem.id, e); // Open delete confirmation
                                    }}
                                    className="p-2 rounded-full hover:bg-red-50 transition-colors"
                                    style={{ color: dangerColor }} // Use danger color (red)
                                    title="Remove listing" // Add a tooltip
                               >
                                    <Trash2 size={20} /> {/* Trash icon */}
                               </button>
                           )}
                           {/* === END MODIFIED === */}
                        </div>

                        {/* Item Image & Price Display */}
                         <div className="relative mb-4">
                            {/* Item Image */}
                            <img
                                src={selectedItem.imageUrl || `https://via.placeholder.com/400x300/e5e7eb/4b5563?text=No+Image`}
                                alt={selectedItem.name}
                                className="w-full h-48 object-cover rounded-lg" // object-cover to prevent stretching
                                onError={(e) => handleImageError(e, "No Image")} // Handle image loading errors
                             />
                             {/* Price Tag */}
                             {selectedItem.price !== undefined && selectedItem.price > 0 && (
                                 <div className="absolute top-3 right-3 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                     PKR {selectedItem.price.toLocaleString()} {/* Format price */}
                                 </div>
                             )}
                             {/* Free Tag */}
                             {(selectedItem.price === undefined || selectedItem.price === 0) && (
                                  <div className="absolute top-3 right-3 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                                      FREE
                                  </div>
                             )}
                         </div>

                        {/* Item Name and Description */}
                        <h2 className="text-xl font-bold mb-2" style={{ color: textColorPrimary }}>{selectedItem.name}</h2>
                        <p className="text-sm mb-4" style={{ color: textColorSecondary }}>{selectedItem.description}</p>

                        {/* Location and Pickup Times */}
                        <div className="flex items-center mb-2" style={{ color: textColorSecondary }}>
                            <MapPin size={16} className="mr-2 flex-shrink-0" /> {/* Location icon */}
                            <span>{selectedItem.location}</span>
                        </div>
                        <div className="flex items-center mb-4" style={{ color: textColorSecondary }}>
                            <Clock size={16} className="mr-2 flex-shrink-0" /> {/* Clock icon */}
                            <span>{selectedItem.pickupTimes}</span>
                        </div>

                        {/* Simulated Chat Section */}
                        <div className="mt-6 border-t pt-4" style={{ borderColor: borderColor }}>
                            <h3 className="text-md font-medium mb-3" style={{ color: textColorPrimary }}>Message Giver (Simulation)</h3>
                             {/* Simulated Chat Window */}
                             <div className="bg-gray-50 rounded-lg p-3 mb-3 max-h-40 overflow-y-auto" style={{ minHeight: '80px' }}> {/* Fixed height with scrolling */}
                                {/* Display Sent Messages */}
                                {sentMessages.length === 0 ? (
                                    <p className="text-center text-sm italic" style={{ color: textColorSecondary }}>No messages yet</p>
                                ) : (
                                     // Map through sent messages
                                    sentMessages.map((msg, i) => (
                                        <div
                                            key={i} // Using index as key (okay for simple simulation, use unique message IDs in real app)
                                            className={`mb-2 text-sm p-2 rounded-lg ${i % 2 === 0 ? 'bg-purple-100 ml-auto max-w-[75%] text-right' : 'bg-gray-200 mr-auto max-w-[75%]'}`}
                                        >
                                            {msg}
                                        </div>
                                    ))
                                )}
                             </div>
                             {/* Message Input and Send Button */}
                             <div className="flex mt-2">
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={handleMessageInputChange}
                                    onKeyDown={handleKeyDown} // Handle Enter key to send
                                    placeholder="Type a message..."
                                    className="flex-grow px-3 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:border-transparent"
                                    style={{ borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                                />
                                <button
                                    onClick={handleSendMessage} // Send message on click
                                    className="px-4 py-2 rounded-r-lg transition-colors duration-200"
                                    style={{ backgroundColor: primaryBaseColor, color: 'white' }}
                                     onMouseOver={e => e.currentTarget.style.backgroundColor = primaryHoverColor}
                                    onMouseOut={e => e.currentTarget.style.backgroundColor = primaryBaseColor}
                                >
                                    <Send size={18}/> {/* Send icon */}
                                </button>
                             </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>


        {/* Delete Confirmation Modal */}
        {/* AnimatePresence for modal entrance/exit animations */}
        <AnimatePresence>
            {isDeleteModalOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    initial={{ opacity: 0 }} // Initial state (hidden)
                    animate={{ opacity: 1 }} // Animate to visible
                    exit={{ opacity: 0 }} // Exit animation
                    onClick={closeDeleteConfirmModal} // Close modal when clicking outside
                >
                    {/* Modal Content */}
                    <motion.div
                        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }} // Initial scale and opacity
                        animate={{ scale: 1, opacity: 1 }} // Animate to full size and visible
                        exit={{ scale: 0.9, opacity: 0 }} // Exit animation
                        onClick={e => e.stopPropagation()} // Prevent click inside modal from closing it
                    >
                        {/* Modal Title */}
                        <h3 className="text-lg font-semibold mb-3" style={{ color: textColorPrimary }}>Remove Listing</h3>
                        {/* Confirmation Message */}
                        <p style={{ color: textColorSecondary }}>Are you sure you want to remove this item listing? This action cannot be undone.</p>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            {/* Cancel Button */}
                            <button
                                onClick={closeDeleteConfirmModal} // Close modal on cancel
                                className="px-4 py-2 rounded-md border font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                style={{ borderColor: borderColor, color: textColorSecondary }}
                            >
                                Cancel
                            </button>
                             {/* Remove Button */}
                            <button
                                onClick={confirmDelete} // Confirm deletion
                                className="px-4 py-2 rounded-md font-medium text-white transition-colors duration-200"
                                style={{ backgroundColor: dangerColor }} // Use danger color (red)
                            >
                                Remove
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>


        {/* Donation Modal */}
        {/* AnimatePresence for modal entrance/exit animations */}
        <AnimatePresence>
            {isDonationOpen && (
                <motion.div
                     className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                     onClick={() => setIsDonationOpen(false)} // Close modal on clicking outside
                >
                    {/* Modal Content */}
                    <motion.div
                        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()} // Prevent click inside modal from closing it
                    >
                        {/* Modal Title and Subtitle */}
                        <h3 className="text-xl font-semibold text-center mb-4" style={{color: textColorPrimary}}>Donate to Palestine Relief</h3>
                        <p className="text-center text-sm mb-6" style={{color: textColorSecondary}}>Your contribution makes a difference.</p>

                         {/* Preset Donation Amounts */}
                         <div className="grid grid-cols-3 gap-3 mb-4">
                           {[500, 1000, 5000].map(amount => (
                                <button key={amount}
                                    onClick={() => handleDonationAmountSelect(amount)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${donationAmount === amount ? 'bg-purple-100 border-purple-400 ring-2 ring-purple-300' : 'border-gray-300 hover:bg-gray-100'}`}
                                    style={{ color: textColorPrimary }}
                                >
                                    PKR {amount}
                                </button>
                            ))}
                         </div>

                         {/* Custom Amount Input */}
                         <div>
                             <label htmlFor="customAmount" className="block text-sm font-medium mb-1" style={{color: textColorSecondary}}>Or enter custom amount:</label>
                             <div className="relative">
                                 {/* PKR currency symbol */}
                                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">PKR</span></div>
                                 {/* Custom Amount Input Field */}
                                 <input
                                     type="number" id="customAmount" name="customAmount"
                                     min="50" step="50" // Minimum and step values for input
                                     placeholder="Enter amount"
                                     // Bind value to state, handle change and focus
                                     value={typeof donationAmount === 'string' ? donationAmount : ''} // Only bind if it's the custom string
                                     onChange={e => handleDonationAmountSelect(e.target.value)} // Update state as string
                                     onFocus={() => setDonationAmount('')} // Clear presets when focusing custom input
                                     className="w-full pl-12 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:border-transparent shadow-sm"
                                     style={{ backgroundColor: inputBgColor, color: textColorPrimary, borderColor: borderColor, '--tw-ring-color': primaryBaseColor } as React.CSSProperties}
                                 />
                             </div>
                         </div>

                          {/* Confirm Donation Button */}
                          <button
                            onClick={handleConfirmDonation} // Handle donation confirmation
                            className="w-full mt-6 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition-all flex items-center justify-center"
                          >
                              <Heart size={18} className="mr-2" fill="white"/> Confirm Donation {/* Heart icon */}
                          </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  </MainLayout>
  );
};

export default CommunitySharePage;
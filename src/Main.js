
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Play, Pause, Download, Moon, Sun, Share2, Heart, Clock, Music, X, ChevronRight, SkipBack, SkipForward, Volume2, VolumeX, Copy, Link, Loader2 } from 'lucide-react';
// import { Linkedin, Youtube } from "lucide-react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const MusicMixApp = () => {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [currentMix, setCurrentMix] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [favorited, setFavorited] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [sharePopupOpen, setSharePopupOpen] = useState(false);
//   const [shareForMix, setShareForMix] = useState(null);
//   const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
//   const [supportPopupOpen, setSupportPopupOpen] = useState(false);
//   const [comingSoonPopupOpen, setComingSoonPopupOpen] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [waveformHeights, setWaveformHeights] = useState(Array(40).fill(20)); // 40 bars for the waveform

//   // Refs
//   const progressInterval = useRef(null);
//   const audioRef = useRef(new Audio());

//   const mixes = [
//     {
//       id: 1,
//       title: "Best of Luo Oldies",
//       genre: "Oldies",
//       duration: "6:58:24",
//       durationSecs: 3504,
//       bpm: 128,
//       date: "Feb 15, 2025",
//       cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1741010478/Black_Binaural_Meditation_Music_YouTube_Thumbnail_jyvvxf.png",
//       description: "Best of Luo Oldies, Rhumba, & Benga  | Featuring George Ramogi, Atis Pesa, & More",
//       audioUrl: "https://github.com/rodgersochieng/myaudiofiles/releases/download/v1.0/BEST.OF.LUO.OLDIES.mp3" // Updated URL
//     },
//     {
//       id: 2,
//       title: "Best Of Luo Benga",
//       genre: "Benga",
//       duration: "7:12:05",
//       durationSecs: 4325,
//       bpm: 128,
//       date: "Jan 28, 2025",
//       cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1741010521/Yellow_and_Red_Bright_and_Playful_YouTube_Thumbnail_b3ou5m.png",
//       description: "Luo Benga Mix | ft  Dola Kabarry, Odhiambo Tusker, Osito Kalle, Kamaliza & More",
//       audioUrl: "https://github.com/rodgersochieng/myaudiofiles/releases/download/v1.0/BEST.OF.LUO.OLDIES.BENGA.mp3" // Updated URL
//     },
//     {
//       id: 3,
//       title: "Best of Luo Rhumba",
//       genre: "Rhumba",
//       duration: "7:05:45",
//       durationSecs: 3945,
//       bpm: 140,
//       date: "Mar 1, 2025",
//       cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1741010403/Premium_Vector___Coming_soon_stage_illuminated_with_light_spotlight_x1vmbx.jpg",
//       description: "Featuring John Junior, Madanji, Mali ya Mungu & More.",
//       audioUrl: "" // No audio URL for this mix
//     }
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   // Calculate current time
//   const calculateCurrentTime = () => {
//     if (!currentMix) return "0:00";
//     const currentSeconds = Math.floor((progress / 100) * currentMix.durationSecs);
//     const mins = Math.floor(currentSeconds / 60);
//     const secs = Math.floor(currentSeconds % 60);
//     return `${mins}:${secs < 10 ? '0' + secs : secs}`;
//   };

//   // Toggle favorite
//   const toggleFavorite = (id) => {
//     if (favorited.includes(id)) {
//       setFavorited(favorited.filter(item => item !== id));
//     } else {
//       setFavorited([...favorited, id]);
//     }
//   };

//   // Handle audio loading and playback
//   useEffect(() => {
//     if (currentMix && currentMix.audioUrl) {
//       setIsLoading(true);
//       audioRef.current.src = currentMix.audioUrl;
//       audioRef.current.load();

//       const handleCanPlay = () => {
//         setIsLoading(false);
//         audioRef.current.play().then(() => {
//           setIsPlaying(true);
//         }).catch((error) => {
//           console.error("Error playing audio:", error);
//           setIsLoading(false);
//         });
//       };

//       const handleError = () => {
//         console.error("Error loading audio.");
//         setIsLoading(false);
//       };

//       audioRef.current.addEventListener("canplay", handleCanPlay);
//       audioRef.current.addEventListener("error", handleError);

//       return () => {
//         audioRef.current.removeEventListener("canplay", handleCanPlay);
//         audioRef.current.removeEventListener("error", handleError);
//       };
//     }
//   }, [currentMix]);

//   // Handle play/pause
//   useEffect(() => {
//     if (isPlaying) {
//       audioRef.current.play();
//     } else {
//       audioRef.current.pause();
//     }
//   }, [isPlaying]);

//   // Handle progress tracking
//   useEffect(() => {
//     if (isPlaying) {
//       progressInterval.current = setInterval(() => {
//         setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
//       }, 1000);
//     } else {
//       clearInterval(progressInterval.current);
//     }

//     return () => clearInterval(progressInterval.current);
//   }, [isPlaying]);

//   // Reset progress when changing mix
//   useEffect(() => {
//     setProgress(0);
//   }, [currentMix]);

//   // Handle seek
//   const handleSeek = (e) => {
//     const container = e.currentTarget;
//     const rect = container.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const newProgress = (x / rect.width) * 100;
//     const newTime = (newProgress / 100) * audioRef.current.duration;
//     audioRef.current.currentTime = newTime;
//     setProgress(newProgress);
//   };

//   // Handle skip forward/backward
//   const skipForward = () => {
//     audioRef.current.currentTime += 5;
//   };

//   const skipBackward = () => {
//     audioRef.current.currentTime -= 5;
//   };

//   // Handle download
//   const handleDownload = (audioUrl) => {
//     if (!audioUrl) {
//       setComingSoonPopupOpen(true);
//       return;
//     }

//     const link = document.createElement("a");
//     link.href = audioUrl;
//     link.download = audioUrl.split("/").pop();
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Handle share
//   const handleShare = (mix) => {
//     setShareForMix(mix);
//     setSharePopupOpen(true);
//   };

//   // Share via WhatsApp
//   const shareViaWhatsApp = () => {
//     const url = `https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA`;
//     const message = `Check out this mix: ${shareForMix.title} - ${url}`;
//     window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
//   };

//   // Copy link to clipboard
//   const copyLink = () => {
//     const url = `https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA`;
//     navigator.clipboard.writeText(url).then(() => {
//       toast.success("Link copied to clipboard!", {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//       });
//     });
//   };

//   // Copy phone number to clipboard
//   const copyPhoneNumber = () => {
//     const phoneNumber = "+254 729942447";
//     navigator.clipboard.writeText(phoneNumber).then(() => {
//       toast.success("Phone number copied to clipboard!", {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: true,
//       });
//     });
//   };

//   // Toggle mute
//   const toggleMute = () => {
//     audioRef.current.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   // Close the player
//   const closePlayer = () => {
//     setIsPlaying(false);
//     setCurrentMix(null);
//     setProgress(0);
//     clearInterval(progressInterval.current);
//     audioRef.current.pause();
//     audioRef.current.currentTime = 0;
//   };

//   // Play a mix
//   const playMix = (mix) => {
//     if (!mix.audioUrl) {
//       setComingSoonPopupOpen(true);
//       return;
//     }
//     setCurrentMix(mix);
//     setIsPlaying(true);
//     setProgress(0);
//   };

//   // Update waveform heights dynamically
//   useEffect(() => {
//     const updateWaveform = () => {
//       if (!isPlaying) return;

//       const newHeights = waveformHeights.map(() => Math.floor(Math.random() * 80) + 20); // Random heights between 20% and 100%
//       setWaveformHeights(newHeights);
//     };

//     const interval = setInterval(updateWaveform, 200); // Update every 200ms
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
//       {/* Header */}
//       <header className={`p-6 flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} sticky top-0 z-10 shadow-md`}>
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="flex items-center space-x-2"
//         >
//           <Music size={24} className={isDarkMode ? 'text-purple-400' : 'text-indigo-600'} />
//           <h1 className="text-2xl font-bold">Golden Archive</h1>
//         </motion.div>
        
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={toggleDarkMode}
//           className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-indigo-600'}`}
//         >
//           {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//         </motion.button>
//       </header>

//       {/* Hero Section */}
//       <motion.section 
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   className={`py-8 sm:py-12 px-4 sm:px-6 
//     ${isDarkMode 
//       ? 'bg-gradient-to-br from-purple-900 to-gray-900 text-gray-100' 
//       : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-800'}`}
// >
//   <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
//     <motion.h2 
//       initial={{ y: -20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center
//         ${isDarkMode 
//           ? 'text-purple-300' 
//           : 'text-purple-700'}`}
//     >
//       🎵 Grab My Latest Mixes
//     </motion.h2>
    
//     <motion.p 
//       initial={{ y: 20, opacity: 0 }}
//       animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
//       className="text-sm sm:text-base text-center 
//         leading-relaxed px-2
//         opacity-90"
//     >
//       I'm a front-end developer, UI/UX designer, and project manager in training, 
//       blending creativity and structure in tech, business, and sound. 
//       These mixes are crafted with precision and flow—just like great products!
//     </motion.p>
    
//     <motion.div
//       initial={{ scale: 0.9, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1, transition: { delay: 0.4 } }}
//       className="flex justify-center"
//     >
//       <a 
//         href="https://www.linkedin.com/in/ochieng-o-rodgers" target='blank'
//         className={`inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 
//           rounded-full text-xs sm:text-sm 
//           transition-all duration-300 
//           ${isDarkMode
//             ? 'bg-purple-700 text-white hover:bg-purple-600'
//             : 'bg-purple-600 text-white hover:bg-purple-700'}`}
//       >
//         Connect on LinkedIn
//       </a>
//     </motion.div>
//   </div>
// </motion.section>

//       {/* Player Section */}
//       <AnimatePresence>
//   {currentMix && (
//     <motion.section
//       initial={{ opacity: 0, height: 0 }}
//       animate={{ opacity: 1, height: 'auto' }}
//       exit={{ opacity: 0, height: 0 }}
//       className={`
//         py-4 px-2 sm:py-6 sm:px-4 
//         transition-all duration-300 ease-in-out
//         ${isDarkMode 
//           ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
//           : 'bg-gradient-to-br from-gray-100 to-white'}
//       `}
//     >
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4 sm:mb-6 px-2">
//           <h3 className={`
//             text-xl sm:text-2xl font-bold font-poppins 
//             ${isDarkMode ? 'text-white' : 'text-gray-900'}
//           `}>
//             Now Playing
//           </h3>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={closePlayer}
//             className={`
//               p-2 rounded-full transition-all duration-200
//               ${isDarkMode 
//                 ? 'bg-gray-800 text-white hover:bg-gray-700' 
//                 : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
//             `}
//           >
//             <X size={20} />
//           </motion.button>
//         </div>

//         {/* Player Card */}
//         <div className={`
//           rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden
//           ${isDarkMode 
//             ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
//             : 'bg-white'}
//           transition-all duration-300
//         `}>
//           <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 p-4 sm:p-6">
//             {/* Album Art - Full Width on Small Screens */}
//             <div className="w-full sm:w-48 md:w-64">
//               <div className="relative w-full h-48 sm:h-64 md:h-48">
//                 <img
//                   src={currentMix.cover}
//                   alt={currentMix.title}
//                   className="
//                     w-full h-full object-cover rounded-lg sm:rounded-xl 
//                     shadow-md sm:shadow-lg transform transition-transform 
//                     hover:scale-105 cursor-pointer
//                   "
//                 />
//                 {/* Optional: Add a play icon overlay */}
//                 {!isPlaying && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg sm:rounded-xl">
//                     <Play size={40} className="text-white" />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Track Details and Controls */}
//             <div className="flex flex-col justify-between space-y-4 sm:space-y-6">
//               {/* Track Info */}
//               <div>
//                 <h4 className={`
//                   text-xl sm:text-2xl md:text-3xl font-bold font-poppins mb-2
//                   ${isDarkMode ? 'text-white' : 'text-gray-900'}
//                 `}>
//                   {currentMix.title}
//                 </h4>
//                 <p className={`
//                   text-sm sm:text-base 
//                   ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
//                 `}>
//                   {currentMix.genre} • {currentMix.bpm} BPM
//                 </p>
//               </div>

//               {/* Description */}
//               <p className={`
//                 text-sm sm:text-base overflow-hidden overflow-ellipsis
//                 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
//               `}>
//                 {currentMix.description}
//               </p>

//               {/* Progress Bar */}
//               <div className="space-y-2">
//                 <div 
//                   className="h-2 rounded-full cursor-pointer overflow-hidden bg-gray-300 dark:bg-gray-700"
//                   onClick={handleSeek}
//                 >
//                   <div
//                     className={`h-full ${
//                       isDarkMode 
//                         ? 'bg-purple-500 ' 
//                         : 'bg-indigo-600'
//                     }`}
//                     style={{ width: `${progress}%` }}
//                   />
//                 </div>
//                 <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                   <span>{calculateCurrentTime()}</span>
//                   <span>{currentMix.duration}</span>
//                 </div>
//               </div>

//               {/* Player Controls */}
//               <div className="flex justify-center items-center space-x-4 sm:space-x-6">
//                 {/* Skip Backward */}
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={skipBackward}
//                   className={`
//                     p-2 sm:p-3 rounded-full transition-all duration-200
//                     ${isDarkMode 
//                       ? 'bg-gray-700 text-white hover:bg-gray-600' 
//                       : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
//                   `}
//                 >
//                   <SkipBack size={20} />
//                 </motion.button>

//                 {/* Play/Pause */}
//                 <motion.button
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setIsPlaying(!isPlaying)}
//                   disabled={isLoading}
//                   className={`
//                     p-3 sm:p-4 md:p-5 rounded-full transition-all duration-200
//                     ${isDarkMode 
//                       ? 'bg-purple-600 hover:bg-purple-700' 
//                       : 'bg-indigo-600 hover:bg-indigo-700'}
//                     text-white shadow-lg transform active:scale-95
//                   `}
//                 >
//                   {isLoading ? (
//                     <Loader2 size={24} className="animate-spin" />
//                   ) : isPlaying ? (
//                     <Pause size={24} />
//                   ) : (
//                     <Play size={24} />
//                   )}
//                 </motion.button>

//                 {/* Skip Forward */}
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={skipForward}
//                   className={`
//                     p-2 sm:p-3 rounded-full transition-all duration-200
//                     ${isDarkMode 
//                       ? 'bg-gray-700 text-white hover:bg-gray-600' 
//                       : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
//                   `}
//                 >
//                   <SkipForward size={20} />
//                 </motion.button>

//                 {/* Mute/Unmute */}
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={toggleMute}
//                   className={`
//                     p-2 sm:p-3 rounded-full transition-all duration-200
//                     ${isDarkMode 
//                       ? 'bg-gray-700 text-white hover:bg-gray-600' 
//                       : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
//                   `}
//                 >
//                   {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//                 </motion.button>
//               </div>

//               {/* Waveform Visualization */}
//               <div className="h-12 sm:h-16 flex items-end space-x-1 justify-center">
//                 {waveformHeights.map((height, i) => (
//                   <motion.div
//                     key={i}
//                     animate={{ height: `${height}%` }}
//                     transition={{ duration: 0.2, ease: "easeOut" }}
//                     className={`
//                       w-1.5 sm:w-2 rounded-t-sm
//                       ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-600'}
//                     `}
//                   />
//                 ))}
//               </div>

//               {/* Share and Download Buttons */}
//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => handleShare(currentMix)}
//                   className={`
//                     flex items-center justify-center space-x-2 
//                     px-4 py-2 rounded-md w-full
//                     transition-all duration-200
//                     ${isDarkMode 
//                       ? 'bg-gray-700 text-white hover:bg-gray-600' 
//                       : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
//                   `}
//                 >
//                   <Share2 size={16} />
//                   <span>Share Mix</span>
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     setDownloadPopupOpen(true);
//                     setShareForMix(currentMix);
//                   }}
//                   className={`
//                     flex items-center justify-center space-x-2 
//                     px-4 py-2 rounded-md w-full
//                     transition-all duration-200
//                     ${isDarkMode 
//                       ? 'bg-purple-600 text-white hover:bg-purple-700' 
//                       : 'bg-indigo-600 text-white hover:bg-indigo-700'}
//                   `}
//                 >
//                   <Download size={16} />
//                   <span>Download Mix</span>
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   )}
// </AnimatePresence>

//       {/* Mix Collection */}
//       <section className={`py-12 px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//         <div className="max-w-6xl mx-auto">
//           <h3 className="text-2xl font-bold mb-8">Featured Mixes</h3>
          
//           <motion.div 
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {mixes.map(mix => (
//               <motion.div 
//                 key={mix.id}
//                 variants={itemVariants}
//                 whileHover={{ y: -5 }}
//                 className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} transition-all duration-300`}
//               >
//                 <div className="relative">
//                   <img src={mix.cover} alt={mix.title} className="w-full h-48 object-cover" />
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => playMix(mix)}
//                     className={`absolute bottom-4 right-4 p-3 rounded-full ${isDarkMode ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'} shadow-lg`}
//                   >
//                     <Play size={20} />
//                   </motion.button>
//                 </div>

//                 <div className="p-4">
//                   <div className="flex justify-between items-start mb-2">
//                     <h4 className="text-lg font-semibold">{mix.title}</h4>
//                     <motion.button
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => toggleFavorite(mix.id)}
//                       className={`p-1 rounded-full ${favorited.includes(mix.id) ? (isDarkMode ? 'text-red-400' : 'text-red-500') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}
//                     >
//                       <Heart size={18} fill={favorited.includes(mix.id) ? (isDarkMode ? '#F87171' : '#EF4444') : 'none'} />
//                     </motion.button>
//                   </div>
                  
//                   <div className="space-y-2 mb-4">
//                     <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{mix.description}</p>
//                     <div className="flex items-center space-x-4 text-sm">
//                       <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>{mix.genre}</span>
//                       <div className="flex items-center">
//                         <Clock size={14} className="mr-1" /> {mix.duration}
//                       </div>
//                       <div>{mix.bpm} BPM</div>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between">
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => handleShare(mix)}
//                       className={`flex items-center space-x-1 px-3 py-1 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
//                     >
//                       <Share2 size={14} />
//                       <span>Share</span>
//                     </motion.button>
                    
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => {
//                         setDownloadPopupOpen(true);
//                         setShareForMix(mix);
//                       }}
//                       className={`flex items-center space-x-1 px-3 py-1 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors`}
//                     >
//                       <Download size={14} />
//                       <span>Download</span>
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className={`py-8 px-6 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
//         <div className="max-w-6xl mx-auto text-center">
//           <p className="text-sm mt-2">Made with ❤️ by Ochieng O. Rodgers</p>
//           <div className="flex justify-center gap-4 mt-4">
//             <a href="www.linkedin.com/in/ochieng-o-rodgers" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
//               <Linkedin size={20} /> LinkedIn
//             </a>
//             <a href="https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 flex items-center gap-1">
//               <Youtube size={20} /> YouTube
//             </a>
//           </div>
//           <p>© 2025 Golden Archive. All rights reserved.</p>
//           <div className="flex items-center justify-center mt-4">
//             <p className="text-lg font-bold">+254 729942447</p>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={copyPhoneNumber}
//               className="cursor-pointer p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//               title="Copy phone number"
//             >
//               <Copy size={18} className="text-gray-600 dark:text-gray-300" />
//             </motion.div>
//           </div>
//         </div>
//       </footer>

//       {/* Download Popup */}
//       <AnimatePresence>
//         {downloadPopupOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
//             >
//               <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white`}>
//                 <h4 className="text-xl font-bold">Download Mix</h4>
//               </div>
              
//               <div className="p-6">
//                 <p className="mb-6">Thanks for downloading! YouTube doesn’t pay me for this, but you can. If you'd like to support my effort, send your appreciation via M-Pesa:</p>
                
//                 <div className="flex justify-between">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       handleDownload(shareForMix.audioUrl);
//                       setDownloadPopupOpen(false);
//                     }}
//                     className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
//                   >
//                     No thanks, just download
//                   </motion.button>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       handleDownload(shareForMix.audioUrl);
//                       setDownloadPopupOpen(false);
//                       setSupportPopupOpen(true);
//                     }}
//                     className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white flex items-center`}
//                   >
//                     <span>Support & Download</span>
//                     <ChevronRight size={16} className="ml-1" />
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Support Popup */}
//       <AnimatePresence>
//         {supportPopupOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
//             >
//               <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white flex justify-between items-center`}>
//                 <h4 className="text-xl font-bold">A little Appreciation Goes a Long way</h4>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSupportPopupOpen(false)}
//                   className="text-white"
//                 >
//                   <X size={20} />
//                 </motion.button>
//               </div>
              
//               <div className="p-6">
//                 <p className="mb-4">Thanks for appreciating my effort! You can send your appreciation directly to my M-Pesa at:</p>
//                 <div className="flex items-center justify-center">
//                   <p className="text-lg font-bold">+254 729942447</p>
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     onClick={copyPhoneNumber}
//                     className="cursor-pointer p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//                     title="Copy phone number"
//                   >
//                     <Copy size={18} className="text-gray-600 dark:text-gray-300" />
//                   </motion.div>
//                 </div>
//                 <p className="text-sm text-gray-500">Your download started automatically.</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Share Popup */}
//       <AnimatePresence>
//         {sharePopupOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
//             >
//               <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white flex justify-between items-center`}>
//                 <h4 className="text-xl font-bold">Share this Mix</h4>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSharePopupOpen(false)}
//                   className="text-white"
//                 >
//                   <X size={20} />
//                 </motion.button>
//               </div>
              
//               <div className="p-6">
//                 <p className="mb-4">Share this mix with your friends:</p>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={shareViaWhatsApp}
//                     className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
//                   >
//                     <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 mb-2" />
//                     <span>Share via WhatsApp</span>
//                   </motion.button>
                  
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={copyLink}
//                     className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
//                   >
//                     <Link size={24} className="mb-2" />
//                     <span>Copy Link</span>
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Coming Soon Popup */}
//       <AnimatePresence>
//         {comingSoonPopupOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
//             >
//               <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white flex justify-between items-center`}>
//                 <h4 className="text-xl font-bold">Coming Soon!</h4>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setComingSoonPopupOpen(false)}
//                   className="text-white"
//                 >
//                   <X size={20} />
//                 </motion.button>
//               </div>
              
//               <div className="p-6">
//                 <p className="mb-4">This mix is coming soon! Subscribe to our YouTube channel to get notified.</p>
//                 <a
//                   href="https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white flex items-center justify-center`}
//                 >
//                   <Youtube size={20} className="mr-2" />
//                   <span>Subscribe</span>
//                 </a>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
//     </div>
//   );
// };

// export default MusicMixApp;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Download, Moon, Sun, Share2, Heart, Clock, Music, X, 
  ChevronRight, SkipBack, SkipForward, Volume2, VolumeX, Copy, Link, 
  Loader2, Check, AlertCircle
} from 'lucide-react';
import { Linkedin, Youtube } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MusicMixApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentMix, setCurrentMix] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favorited, setFavorited] = useState([]);
  const [progress, setProgress] = useState(0);
  const [sharePopupOpen, setSharePopupOpen] = useState(false);
  const [shareForMix, setShareForMix] = useState(null);
  const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [supportPopupOpen, setSupportPopupOpen] = useState(false);
  const [comingSoonPopupOpen, setComingSoonPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformHeights, setWaveformHeights] = useState(Array(40).fill(20));
  const [transactionCode, setTransactionCode] = useState('');
  const [transactionError, setTransactionError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Refs
  const progressInterval = useRef(null);
  const audioRef = useRef(new Audio());

  const mixes = [
    {
      id: 1,
      title: "Best of Luo Oldies",
      genre: "Oldies",
      duration: "6:58:24",
      durationSecs: 3504,
      bpm: 128,
      date: "Feb 15, 2025",
      cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1741010478/Black_Binaural_Meditation_Music_YouTube_Thumbnail_jyvvxf.png",
      description: "Best of Luo Oldies, Rhumba, & Benga  | Featuring George Ramogi, Atis Pesa, & More",
      audioUrl: "https://github.com/rodgersochieng/myaudiofiles/releases/download/v1.0/BEST.OF.LUO.OLDIES.mp3",
      price: "Ksh 100"
    },
    {
      id: 2,
      title: "Best Of Luo Benga",
      genre: "Benga",
      duration: "7:12:05",
      durationSecs: 4325,
      bpm: 128,
      date: "Jan 28, 2025",
      cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1741010521/Yellow_and_Red_Bright_and_Playful_YouTube_Thumbnail_b3ou5m.png",
      description: "Luo Benga Mix | ft Dola Kabarry, Odhiambo Tusker, Osito Kalle, Kamaliza & More",
      audioUrl: "https://github.com/rodgersochieng/myaudiofiles/releases/download/v1.0/BEST.OF.LUO.OLDIES.BENGA.mp3",
      price: "Ksh 100"
    },
    {
      id: 3,
      title: "Best of Luo Rhumba",
      genre: "Rhumba",
      duration: "7:05:45",
      durationSecs: 3945,
      bpm: 140,
      date: "Mar 1, 2025",
      cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1741010403/Premium_Vector___Coming_soon_stage_illuminated_with_light_spotlight_x1vmbx.jpg",
      description: "Featuring John Junior, Madanji, Mali ya Mungu & More.",
      audioUrl: "",
      price: "Ksh 100"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle Transaction Code validation
  const validateTransactionCode = () => {
    setIsProcessingPayment(true);
    setTransactionError('');
    
    // Simulate server validation with a timeout
    setTimeout(() => {
      if (!transactionCode.trim()) {
        setTransactionError('Please enter a transaction code or phone number');
        setIsProcessingPayment(false);
        return false;
      }
      
      // Basic validation: Accept if starts with "TD" (M-Pesa transaction code format) 
      // or starts with "0" (phone number format)
      if (transactionCode.trim().startsWith('TD') || transactionCode.trim().startsWith('0')) {
        setIsProcessingPayment(false);
        setDownloadPopupOpen(false);
        setSuccessPopupOpen(true);
        
        // Start download after success popup appears
        setTimeout(() => {
          handleDownload(shareForMix.audioUrl);
        }, 1000);
        
        return true;
      } else {
        setTransactionError('Invalid transaction code format');
        setIsProcessingPayment(false);
        return false;
      }
    }, 1500);
  };

  // Calculate current time
  const calculateCurrentTime = () => {
    if (!currentMix) return "0:00";
    const currentSeconds = Math.floor((progress / 100) * currentMix.durationSecs);
    const mins = Math.floor(currentSeconds / 60);
    const secs = Math.floor(currentSeconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    if (favorited.includes(id)) {
      setFavorited(favorited.filter(item => item !== id));
    } else {
      setFavorited([...favorited, id]);
    }
  };

  // Handle audio loading and playback
  useEffect(() => {
    if (currentMix && currentMix.audioUrl) {
      setIsLoading(true);
      audioRef.current.src = currentMix.audioUrl;
      audioRef.current.load();

      const handleCanPlay = () => {
        setIsLoading(false);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error("Error playing audio:", error);
          setIsLoading(false);
        });
      };

      const handleError = () => {
        console.error("Error loading audio.");
        setIsLoading(false);
      };

      audioRef.current.addEventListener("canplay", handleCanPlay);
      audioRef.current.addEventListener("error", handleError);

      return () => {
        audioRef.current.removeEventListener("canplay", handleCanPlay);
        audioRef.current.removeEventListener("error", handleError);
      };
    }
  }, [currentMix]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle progress tracking
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [isPlaying]);

  // Reset progress when changing mix
  useEffect(() => {
    setProgress(0);
  }, [currentMix]);

  // Handle seek
  const handleSeek = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = (x / rect.width) * 100;
    const newTime = (newProgress / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  // Handle skip forward/backward
  const skipForward = () => {
    audioRef.current.currentTime += 5;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 5;
  };

  // Handle download
  const handleDownload = (audioUrl) => {
    if (!audioUrl) {
      setComingSoonPopupOpen(true);
      return;
    }

    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = audioUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle download button click
  const handleDownloadClick = (mix) => {
    if (!mix.audioUrl) {
      setComingSoonPopupOpen(true);
      return;
    }
    setShareForMix(mix);
    setDownloadPopupOpen(true);
  };

  // Handle share
  const handleShare = (mix) => {
    setShareForMix(mix);
    setSharePopupOpen(true);
  };

  // Share via WhatsApp
  const shareViaWhatsApp = () => {
    const url = `https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA`;
    const message = `Check out this mix: ${shareForMix.title} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Copy link to clipboard
  const copyLink = () => {
    const url = `https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    });
  };

  // Copy phone number to clipboard
  const copyPhoneNumber = () => {
    const phoneNumber = "+254 729942447";
    navigator.clipboard.writeText(phoneNumber).then(() => {
      toast.success("Phone number copied to clipboard!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    });
  };

  // Toggle mute
  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Close the player
  const closePlayer = () => {
    setIsPlaying(false);
    setCurrentMix(null);
    setProgress(0);
    clearInterval(progressInterval.current);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // Play a mix
  const playMix = (mix) => {
    if (!mix.audioUrl) {
      setComingSoonPopupOpen(true);
      return;
    }
    setCurrentMix(mix);
    setIsPlaying(true);
    setProgress(0);
  };

  // Update waveform heights dynamically
  useEffect(() => {
    const updateWaveform = () => {
      if (!isPlaying) return;

      const newHeights = waveformHeights.map(() => Math.floor(Math.random() * 80) + 20);
      setWaveformHeights(newHeights);
    };

    const interval = setInterval(updateWaveform, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      {/* Header */}
      <header className={`p-6 flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} sticky top-0 z-10 shadow-md`}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Music size={24} className={isDarkMode ? 'text-purple-400' : 'text-indigo-600'} />
          <h1 className="text-2xl font-bold">Golden Archive</h1>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-indigo-600'}`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`py-8 sm:py-12 px-4 sm:px-6 
          ${isDarkMode 
            ? 'bg-gradient-to-br from-purple-900 to-gray-900 text-gray-100' 
            : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-gray-800'}`}
      >
        <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center
              ${isDarkMode 
                ? 'text-purple-300' 
                : 'text-purple-700'}`}
          >
            🎵 Grab My Latest Mixes
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="text-sm sm:text-base text-center 
              leading-relaxed px-2
              opacity-90"
          >
            I'm a front-end developer, UI/UX designer in training, 
            blending creativity and structure in tech, business, and sound. 
            These mixes are crafted with precision and flow—just like great products!
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { delay: 0.4 } }}
            className="flex justify-center"
          >
            <a 
              href="https://www.linkedin.com/in/ochieng-o-rodgers" target='blank'
              className={`inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 
                rounded-full text-xs sm:text-sm 
                transition-all duration-300 
                ${isDarkMode
                  ? 'bg-purple-700 text-white hover:bg-purple-600'
                  : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
              Connect on LinkedIn
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Player Section */}
      <AnimatePresence>
        {currentMix && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`
              py-4 px-2 sm:py-6 sm:px-4 
              transition-all duration-300 ease-in-out
              ${isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
                : 'bg-gradient-to-br from-gray-100 to-white'}
            `}
          >
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-4 sm:mb-6 px-2">
                <h3 className={`
                  text-xl sm:text-2xl font-bold font-poppins 
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  Now Playing
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePlayer}
                  className={`
                    p-2 rounded-full transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                  `}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Player Card */}
              <div className={`
                rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden
                ${isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
                  : 'bg-white'}
                transition-all duration-300
              `}>
                <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 p-4 sm:p-6">
                  {/* Album Art */}
                  <div className="w-full sm:w-48 md:w-64">
                    <div className="relative w-full h-48 sm:h-64 md:h-48">
                      <img
                        src={currentMix.cover}
                        alt={currentMix.title}
                        className="
                          w-full h-full object-cover rounded-lg sm:rounded-xl 
                          shadow-md sm:shadow-lg transform transition-transform 
                          hover:scale-105 cursor-pointer
                        "
                      />
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg sm:rounded-xl">
                          <Play size={40} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Track Details and Controls */}
                  <div className="flex flex-col justify-between space-y-4 sm:space-y-6">
                    {/* Track Info */}
                    <div>
                      <h4 className={`
                        text-xl sm:text-2xl md:text-3xl font-bold font-poppins mb-2
                        ${isDarkMode ? 'text-white' : 'text-gray-900'}
                      `}>
                        {currentMix.title}
                      </h4>
                      <p className={`
                        text-sm sm:text-base 
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        {currentMix.genre} • {currentMix.bpm} BPM
                      </p>
                    </div>

                    {/* Description */}
                    <p className={`
                      text-sm sm:text-base overflow-hidden overflow-ellipsis
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                      {currentMix.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div 
                        className="h-2 rounded-full cursor-pointer overflow-hidden bg-gray-300 dark:bg-gray-700"
                        onClick={handleSeek}
                      >
                        <div
                          className={`h-full ${
                            isDarkMode 
                              ? 'bg-purple-500 ' 
                              : 'bg-indigo-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span>{calculateCurrentTime()}</span>
                        <span>{currentMix.duration}</span>
                      </div>
                    </div>

                    {/* Player Controls */}
                    <div className="flex justify-center items-center space-x-4 sm:space-x-6">
                      {/* Skip Backward */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={skipBackward}
                        className={`
                          p-2 sm:p-3 rounded-full transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                        `}
                      >
                        <SkipBack size={20} />
                      </motion.button>

                      {/* Play/Pause */}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={isLoading}
                        className={`
                          p-3 sm:p-4 md:p-5 rounded-full transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-indigo-600 hover:bg-indigo-700'}
                          text-white shadow-lg transform active:scale-95
                        `}
                      >
                        {isLoading ? (
                          <Loader2 size={24} className="animate-spin" />
                        ) : isPlaying ? (
                          <Pause size={24} />
                        ) : (
                          <Play size={24} />
                        )}
                      </motion.button>

                      {/* Skip Forward */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={skipForward}
                        className={`
                          p-2 sm:p-3 rounded-full transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                        `}
                      >
                        <SkipForward size={20} />
                      </motion.button>

                      {/* Mute/Unmute */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMute}
                        className={`
                          p-2 sm:p-3 rounded-full transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                        `}
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </motion.button>
                    </div>

                    {/* Waveform Visualization */}
                    <div className="h-12 sm:h-16 flex items-end space-x-1 justify-center">
                      {waveformHeights.map((height, i) => (
                        <motion.div
                          key={i}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`
                            w-1.5 sm:w-2 rounded-t-sm
                            ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-600'}
                          `}
                        />
                      ))}
                    </div>

                    {/* Share and Download Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(currentMix)}
                        className={`
                          flex items-center justify-center space-x-2 
                          px-4 py-2 rounded-md w-full
                          transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-gray-700 text-white hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                        `}
                      >
                        <Share2 size={16} />
                        <span>Share Mix</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownloadClick(currentMix)}
                        className={`
                          flex items-center justify-center space-x-2 
                          px-4 py-2 rounded-md w-full
                          transition-all duration-200
                          ${isDarkMode 
                            ? 'bg-purple-600 text-white hover:bg-purple-700' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'}
                        `}
                      >
                        <Download size={16} />
                        <span>Download Mix</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Mix Collection */}
      <section className={`py-12 px-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Featured Mixes</h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mixes.map(mix => (
              <motion.div 
                key={mix.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} transition-all duration-300`}
              >
                <div className="relative">
                  <img src={mix.cover} alt={mix.title} className="w-full h-48 object-cover" />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => playMix(mix)}
                    className={`absolute bottom-4 right-4 p-3 rounded-full ${isDarkMode ? 'bg-purple-600 text-white' : 'bg-indigo-600 text-white'} shadow-lg`}
                  >
                    <Play size={20} />
                  </motion.button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold">{mix.title}</h4>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleFavorite(mix.id)}
                      className={`p-1 rounded-full ${favorited.includes(mix.id) ? (isDarkMode ? 'text-red-400' : 'text-red-500') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}
                    >
                      <Heart size={18} fill={favorited.includes(mix.id) ? (isDarkMode ? '#F87171' : '#EF4444') : 'none'} />
                    </motion.button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{mix.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>{mix.genre}</span>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{mix.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-medium">{mix.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownloadClick(mix)}
                      className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white text-sm`}
                    >
                      Download
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Download Popup */}
      <AnimatePresence>
        {downloadPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setDownloadPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-xl p-6 w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Download "{shareForMix?.title}"
                </h3>
                <button 
                  onClick={() => setDownloadPopupOpen(false)}
                  className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    <AlertCircle size={20} className={isDarkMode ? 'text-yellow-300' : 'text-yellow-600'} />
                  </div>
                  <div>
                    <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>How to download</h4>
                    <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                      <li>Send Ksh 100 to <strong>Pochi: 0729942447</strong></li>
                      <li>Enter your M-Pesa transaction code below</li>
                      <li>Click "Verify Payment"</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Transaction Code / Number Used to Pay
                </label>
                <input
                  type="text"
                  placeholder="e.g. TD or 07"
                  className={`w-full px-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 focus:border-purple-500' : 'bg-white border-gray-300 focus:border-indigo-500'} focus:ring-2 focus:ring-opacity-50 focus:outline-none transition`}
                  value={transactionCode}
                  onChange={(e) => setTransactionCode(e.target.value)}
                />
                {transactionError && (
                  <p className="mt-2 text-sm text-red-500">{transactionError}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setDownloadPopupOpen(false);
                    copyPhoneNumber();
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
                >
                  <Copy size={16} />
                  <span>Copy Pochi Number</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={validateTransactionCode}
                  disabled={isProcessingPayment}
                  className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition disabled:opacity-70`}
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Verify Payment</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {successPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`rounded-xl p-6 w-full max-w-md text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                  <Check size={40} className="text-green-500" strokeWidth={2} />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Payment Verified!
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Thank you for your purchase. Your download will start automatically.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSuccessPopupOpen(false)}
                className={`w-full py-3 px-4 rounded-lg ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition`}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Popup */}
      <AnimatePresence>
        {comingSoonPopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setComingSoonPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`rounded-xl p-6 w-full max-w-md text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                  <AlertCircle size={40} className="text-yellow-500" strokeWidth={2} />
                </div>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Coming Soon!
              </h3>
              <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                This mix is currently being prepared and will be available soon.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setComingSoonPopupOpen(false)}
                className={`w-full py-3 px-4 rounded-lg ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition`}
              >
                Got it
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default MusicMixApp;





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
//       audioUrl: "/audio/BEST OF LUO OLDIES.mp3"
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
//       audioUrl: "/audio/BEST OF LUO OLDIES, BENGA.mp3"
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
//       audioUrl: ""
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
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className={`py-16 px-6 ${isDarkMode ? 'bg-gradient-to-br from-purple-900 to-gray-900' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}
//       >
//         <div className="max-w-4xl mx-auto text-center">
//           <motion.h2 
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="text-4xl md:text-5xl font-bold mb-4"
//           >
//             🎵Grab My Latest Mixes & Keep the Vibes Going!
//           </motion.h2>
//           <motion.p 
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
//             className="text-xl opacity-90 mb-8"
//           >
//             I’m a front-end developer, UI/UX designer, and project manager in training, blending creativity and structure whether in tech, business, or sound. Just like great products, these mixes are crafted with precision and flow download and enjoy!
//             lets connect on linkedin "link below"
//           </motion.p>
//         </div>
//       </motion.section>

//       {/* Player Section */}
//       <AnimatePresence>
//         {currentMix && (
//           <motion.section 
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className={`py-8 px-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
//           >
//             <div className="max-w-4xl mx-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-bold">Now Playing</h3>
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={closePlayer}
//                   className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
//                 >
//                   <X size={20} />
//                 </motion.button>
//               </div>

//               <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
//                 <div className="flex flex-col md:flex-row gap-6">
//                   <img src={currentMix.cover} alt={currentMix.title} className="w-full md:w-48 h-48 object-cover rounded-lg shadow-md" />
                  
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <h4 className="text-2xl font-bold">{currentMix.title}</h4>
//                         <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentMix.genre} • {currentMix.bpm} BPM</p>
//                       </div>
//                     </div>
                    
//                     <p className={`my-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentMix.description}</p>
                    
//                     {/* Playback controls and progress */}
//                     <div className="mt-2 mb-4">
//                       <div 
//                         className="relative h-2 rounded-full overflow-hidden cursor-pointer bg-gray-600"
//                         onClick={handleSeek}
//                       >
//                         <div 
//                           className={`absolute left-0 top-0 bottom-0 ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-600'}`}
//                           style={{ width: `${progress}%` }}
//                         ></div>
//                       </div>
                      
//                       <div className="flex justify-between text-xs mt-1">
//                         <span>{calculateCurrentTime()}</span>
//                         <span>{currentMix.duration}</span>
//                       </div>
//                     </div>
                    
//                     {/* Player controls */}
//                     <div className="flex justify-center space-x-6 my-4">
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={skipBackward}
//                         className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
//                       >
//                         <SkipBack size={20} />
//                       </motion.button>
                      
//                       <motion.button 
//                         whileHover={{ scale: 1.2 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setIsPlaying(!isPlaying)}
//                         disabled={isLoading}
//                         className={`p-4 rounded-full ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
//                       >
//                         {isLoading ? <Loader2 size={24} className="animate-spin" /> : isPlaying ? <Pause size={24} /> : <Play size={24} />}
//                       </motion.button>
                      
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={skipForward}
//                         className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
//                       >
//                         <SkipForward size={20} />
//                       </motion.button>
                      
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={toggleMute}
//                         className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
//                       >
//                         {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//                       </motion.button>
//                     </div>
                    
//                     {/* Waveform Visualization */}
//                     <div className="h-16 mt-2 flex items-end space-x-1">
//                       {waveformHeights.map((height, i) => (
//                         <motion.div 
//                           key={i}
//                           animate={{ height: `${height}%` }}
//                           transition={{ duration: 0.2, ease: "easeOut" }}
//                           className={`w-2 md:w-3 rounded-t-sm ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-600'}`}
//                         />
//                       ))}
//                     </div>
                    
//                     <div className="mt-6 flex justify-between">
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => handleShare(currentMix)}
//                         className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
//                       >
//                         <Share2 size={16} />
//                         <span>Share Mix</span>
//                       </motion.button>
                      
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => {
//                           setDownloadPopupOpen(true);
//                           setShareForMix(currentMix);
//                         }}
//                         className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors`}
//                       >
//                         <Download size={16} />
//                         <span>Download Mix</span>
//                       </motion.button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.section>
//         )}
//       </AnimatePresence>

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
//                 <p className="mb-6">Thank you for downloading! If you’d like to support my Effort, I’d truly appreciate it.</p>
                
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
//                 <p className="mb-4">Thank you for Appreciating my effort! You can reach me at:</p>
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
import { Play, Pause, Download, Moon, Sun, Share2, Heart, Clock, Music, X, ChevronRight, SkipBack, SkipForward, Volume2, VolumeX, Copy, Link, Loader2 } from 'lucide-react';
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
  const [supportPopupOpen, setSupportPopupOpen] = useState(false);
  const [comingSoonPopupOpen, setComingSoonPopupOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformHeights, setWaveformHeights] = useState(Array(40).fill(20)); // 40 bars for the waveform

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
      audioUrl: "https://github.com/rodgersochieng/myaudiofiles/releases/download/v1.0/BEST.OF.LUO.OLDIES.mp3" // Updated URL
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
      description: "Luo Benga Mix | ft  Dola Kabarry, Odhiambo Tusker, Osito Kalle, Kamaliza & More",
      audioUrl: "https://github.com/rodgersochieng/myaudiofiles/releases/download/v1.0/BEST.OF.LUO.OLDIES.BENGA.mp3" // Updated URL
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
      audioUrl: "" // No audio URL for this mix
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

      const newHeights = waveformHeights.map(() => Math.floor(Math.random() * 80) + 20); // Random heights between 20% and 100%
      setWaveformHeights(newHeights);
    };

    const interval = setInterval(updateWaveform, 200); // Update every 200ms
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
        className={`py-16 px-6 ${isDarkMode ? 'bg-gradient-to-br from-purple-900 to-gray-900' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            🎵Grab My Latest Mixes & Keep the Vibes Going!
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="text-xl opacity-90 mb-8"
          >
            I’m a front-end developer, UI/UX designer, and project manager in training, blending creativity and structure whether in tech, business, or sound. Just like great products, these mixes are crafted with precision and flow download and enjoy!
            lets connect on linkedin "link below"
          </motion.p>
        </div>
      </motion.section>

      {/* Player Section */}
      <AnimatePresence>
        {currentMix && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`py-8 px-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Now Playing</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePlayer}
                  className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
                <div className="flex flex-col md:flex-row gap-6">
                  <img src={currentMix.cover} alt={currentMix.title} className="w-full md:w-48 h-48 object-cover rounded-lg shadow-md" />
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-2xl font-bold">{currentMix.title}</h4>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentMix.genre} • {currentMix.bpm} BPM</p>
                      </div>
                    </div>
                    
                    <p className={`my-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{currentMix.description}</p>
                    
                    {/* Playback controls and progress */}
                    <div className="mt-2 mb-4">
                      <div 
                        className="relative h-2 rounded-full overflow-hidden cursor-pointer bg-gray-600"
                        onClick={handleSeek}
                      >
                        <div 
                          className={`absolute left-0 top-0 bottom-0 ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-600'}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs mt-1">
                        <span>{calculateCurrentTime()}</span>
                        <span>{currentMix.duration}</span>
                      </div>
                    </div>
                    
                    {/* Player controls */}
                    <div className="flex justify-center space-x-6 my-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={skipBackward}
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                      >
                        <SkipBack size={20} />
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={isLoading}
                        className={`p-4 rounded-full ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white`}
                      >
                        {isLoading ? <Loader2 size={24} className="animate-spin" /> : isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={skipForward}
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                      >
                        <SkipForward size={20} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMute}
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                      >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </motion.button>
                    </div>
                    
                    {/* Waveform Visualization */}
                    <div className="h-16 mt-2 flex items-end space-x-1">
                      {waveformHeights.map((height, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`w-2 md:w-3 rounded-t-sm ${isDarkMode ? 'bg-purple-500' : 'bg-indigo-600'}`}
                        />
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(currentMix)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
                      >
                        <Share2 size={16} />
                        <span>Share Mix</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setDownloadPopupOpen(true);
                          setShareForMix(currentMix);
                        }}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors`}
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
                        <Clock size={14} className="mr-1" /> {mix.duration}
                      </div>
                      <div>{mix.bpm} BPM</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare(mix)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                    >
                      <Share2 size={14} />
                      <span>Share</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setDownloadPopupOpen(true);
                        setShareForMix(mix);
                      }}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white transition-colors`}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-6 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm mt-2">Made with ❤️ by Ochieng O. Rodgers</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="www.linkedin.com/in/ochieng-o-rodgers" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 flex items-center gap-1">
              <Linkedin size={20} /> LinkedIn
            </a>
            <a href="https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 flex items-center gap-1">
              <Youtube size={20} /> YouTube
            </a>
          </div>
          <p>© 2025 Golden Archive. All rights reserved.</p>
          <div className="flex items-center justify-center mt-4">
            <p className="text-lg font-bold">+254 729942447</p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={copyPhoneNumber}
              className="cursor-pointer p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Copy phone number"
            >
              <Copy size={18} className="text-gray-600 dark:text-gray-300" />
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Download Popup */}
      <AnimatePresence>
        {downloadPopupOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white`}>
                <h4 className="text-xl font-bold">Download Mix</h4>
              </div>
              
              <div className="p-6">
                <p className="mb-6">Thank you for downloading! If you’d like to support my Effort, I’d truly appreciate it.</p>
                
                <div className="flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleDownload(shareForMix.audioUrl);
                      setDownloadPopupOpen(false);
                    }}
                    className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                  >
                    No thanks, just download
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleDownload(shareForMix.audioUrl);
                      setDownloadPopupOpen(false);
                      setSupportPopupOpen(true);
                    }}
                    className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white flex items-center`}
                  >
                    <span>Support & Download</span>
                    <ChevronRight size={16} className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Popup */}
      <AnimatePresence>
        {supportPopupOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white flex justify-between items-center`}>
                <h4 className="text-xl font-bold">A little Appreciation Goes a Long way</h4>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSupportPopupOpen(false)}
                  className="text-white"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              <div className="p-6">
                <p className="mb-4">Thank you for Appreciating my effort! You can reach me at:</p>
                <div className="flex items-center justify-center">
                  <p className="text-lg font-bold">+254 729942447</p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyPhoneNumber}
                    className="cursor-pointer p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    title="Copy phone number"
                  >
                    <Copy size={18} className="text-gray-600 dark:text-gray-300" />
                  </motion.div>
                </div>
                <p className="text-sm text-gray-500">Your download started automatically.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Popup */}
      <AnimatePresence>
        {sharePopupOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white flex justify-between items-center`}>
                <h4 className="text-xl font-bold">Share this Mix</h4>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSharePopupOpen(false)}
                  className="text-white"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              <div className="p-6">
                <p className="mb-4">Share this mix with your friends:</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shareViaWhatsApp}
                    className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 mb-2" />
                    <span>Share via WhatsApp</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyLink}
                    className={`flex flex-col items-center p-4 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                  >
                    <Link size={24} className="mb-2" />
                    <span>Copy Link</span>
                  </motion.button>
                </div>
              </div>
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
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className={`p-4 ${isDarkMode ? 'bg-purple-700' : 'bg-indigo-600'} text-white flex justify-between items-center`}>
                <h4 className="text-xl font-bold">Coming Soon!</h4>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setComingSoonPopupOpen(false)}
                  className="text-white"
                >
                  <X size={20} />
                </motion.button>
              </div>
              
              <div className="p-6">
                <p className="mb-4">This mix is coming soon! Subscribe to our YouTube channel to get notified.</p>
                <a
                  href="https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-md ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white flex items-center justify-center`}
                >
                  <Youtube size={20} className="mr-2" />
                  <span>Subscribe</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default MusicMixApp;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  Play, Pause, Download, Moon, Sun, Share2, Heart, Clock, Music, X, 
  SkipBack, SkipForward, Volume2, VolumeX, Copy, Link, 
  Loader2, Check, AlertCircle, Star,
} from 'lucide-react';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* global dataLayer */
const initializeGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && !window.GA_INITIALIZED) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-MWX7STLCVS`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-MWX7STLCVS');
    
    window.GA_INITIALIZED = true;
  }
};

const MusicMixApp = () => {
  useEffect(() => {
    initializeGoogleAnalytics();
  }, []);

// Refs
const audioRef = useRef(new Audio());
const progressInterval = useRef(null);

  // State variables
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentMix, setCurrentMix] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [favorited, setFavorited] = useState([]);
  const [progress, setProgress] = useState(0);
  const [sharePopupOpen, setSharePopupOpen] = useState(false);
  const [shareForMix, setShareForMix] = useState(null);
  const [downloadPopupOpen, setDownloadPopupOpen] = useState(false);
  const [comingSoonPopupOpen, setComingSoonPopupOpen] = useState(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformHeights, setWaveformHeights] = useState(Array(40).fill(20));
  const [transactionCode, setTransactionCode] = useState('');
  const [transactionError, setTransactionError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showLegalNotice, setShowLegalNotice] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [language, setLanguage] = useState('english');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
      title: "Best Of Musa Juma",
      genre: "Rhumba",
      duration: "4:50:05",
      durationSecs: 4325,
      bpm: 128,
      date: "May 10, 2025",
      cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1746899675/Black_and_Orange_Modern_Music_YouTube_Thumbnail_zak6ts.png",
      description: "🎶 Musa Juma  Playlist – The GOAT of Luo Rhumba 🎶",
      audioUrl: "https://github.com/rodgersochieng/myaudiofiles/releases/download/v1.0/Best.of.musa.juma.mp3",
      price: "Ksh 100"
    },
    {
      id: 4,
      title: "Best of Luo Rhumba",
      genre: "Rhumba",
      duration: "7:05:45",
      durationSecs: 3945,
      bpm: 140,
      date: "Mar 1, 2025",
      cover: "https://res.cloudinary.com/dqmvetc5w/image/upload/v1741010403/Premium_Vector___Coming_soon_stage_illuminated_with_light_spotlight_x1vmbx.jpg",
      description: "Featuring John Junior, Madanji, Mali ya Mungu & More.",
      audioUrl: "",
      price: "Ksh 200"
    }
  ];

  // Legal notices in both languages
  const legalNotices = {
    english: {
      title: "Legal Notice",
      content: "© 2025 Golden Archive. All rights reserved. The music featured in these mixes remains the property of its original creators. These mixes represent original curation and arrangement by Golden Archive and are offered for entertainment purposes only. By purchasing, you're supporting the creative effort behind the mixing not licensing the individual tracks.",
      understood: "I Understand"
    },
    swahili: {
      title: "Taarifa ya Kisheria",
      content: "© 2025 Golden Archive. Haki zote zimehifadhiwa. Muziki unaotolewa katika mchanganyiko huu bado ni mali ya waundishi wake asili. Mchanganyiko huu unawakilisha utayarishaji na mpangilio asili wa Golden Archive na unatolewa kwa madhumuni ya burudani pekee. Kwa kununua, unasaidia juhudi za ubunifu nyuma ya mchanganyiko na sio kukodisha nyimbo za mtu binafsi.",
      understood: "Nimeelewa"
    }
  };

  const legalDocuments = {
    terms: {
      english: [
        { title: "1. Acceptance of Terms", content: "By using Golden Archive, you agree to these Terms. If you disagree, please don't use our service." },
        { title: "2. Service Description", content: "We provide curated music mixes for entertainment. Mixes contain original arrangements but may include copyrighted material owned by others." },
        { title: "3. User Responsibilities", content: "- You must be at least 13 years old\n- Don't redistribute or sell our content\n- Keep your account secure" },
        { title: "4. Payments", content: "- All sales are final\n- Prices may change without notice\n- Chargebacks may get your account banned" },
        { title: "5. Copyright", content: "- Mixes are © Golden Archive\n- Original songs belong to their owners\n- Unauthorized use may lead to legal action" },
        { title: "6. Limitations", content: "We're not responsible for:\n- Indirect damages from using our service\n- Data loss\n- Third-party content" },
        { title: "7. Changes", content: "We may update these terms anytime. Keep using our service means you accept changes." }
      ],
      swahili: [
        { title: "1. Kukubali Sheria", content: "Kwa kutumia Golden Archive, unakubali sheria hizi. Kama hukubali, tafadhali usitumie huduma yetu." },
        { title: "2. Maelezo ya Huduma", content: "Tunatoa mchanganyiko wa muziki kwa burudani. Mchanganyiko una mpangilio wa asili lakini unaweza kuwa na nyimbo zenye hakimiliki za wengine." },
        { title: "3. Wajibu wa Mtumiaji", content: "- Lazima uwe na umri wa angalau miaka 13\n- Usirudishe au uuze maudhui yetu\n- Weka akaunti yako salama" },
        { title: "4. Malipo", content: "- Mauzo yote ni ya mwisho\n- Bei zinaweza kubadilika bila taarifa\n- Kuzuia malipo kunaweza kusababisha kufungiwa kwa akaunti yako" },
        { title: "5. Hakimiliki", content: "- Mchanganyiko ni © Golden Archive\n- Nyimbo asili ni mali ya wenyewe\n- Matumizi yasiyoidhinishwa yanaweza kusababisha hatua za kisheria" },
        { title: "6. Vikwazo", content: "Hatujibebi kwa:\n- Madhara ya posho kutokana na kutumia huduma yetu\n- Kupoteza data\n- Maudhui ya wahusika wengine" },
        { title: "7. Mabadiliko", content: "Tunaweza kusasisha sheria hizi wakati wowote. Kuendelea kutumia huduma yetu kunamaanisha unakubali mabadiliko." }
      ]
    },
    privacy: {
      english: [
        { title: "1. Information We May Collect", content: "\n- Payment details\n- Usage data\n" },
        { title: "2. How We Use Data", content: "- To provide our service\n- Process payments\n- Improve your experience\n- Analyze usage patterns" },
        { title: "3. Data Sharing", content: "We may share with:\n- Payment processors\n- Legal authorities when required\n- Service providers" },
        { title: "4. Security", content: "We protect your data with:\n- Encryption\n- Secure servers\n- Limited access" },
        { title: "5. Your Rights", content: "You can:\n- Access your data\n- Request corrections\n- Delete your account\n- Opt-out of marketing" },
        { title: "6. Cookies", content: "We use cookies to:\n- Remember preferences\n- Understand usage\n- Improve our service" },
        { title: "7. Children's Privacy", content: "Not for kids under 13. We don't collect data from children." },
        { title: "8. Policy Changes", content: "We'll notify you of important changes." },
        { title: "9. Contact Us", content: "Email: contact@goldenarchive.com\nAddress: Nairobi, Kenya" }
      ],
      swahili: [
        { title: "1. Taarifa Tunazokusanya", content: "- Taarifa za akaunti (barua pepe, jina la mtumiaji)\n- Maelezo ya malipo\n- Data ya matumizi\n- Taarifa za kifaa (anwani ya IP, aina ya kivinjari)" },
        { title: "2. Matumizi ya Data", content: "- Kutoa huduma yetu\n- Kufanya malipo\n- Kuboresha uzoefu wako\n- Kuchambua mwenendo wa matumizi" },
        { title: "3. Kugawana Data", content: "Tunaweza kugawana na:\n- Wadau wa malipo\n- Mamlaka za kisheria zinapohitajika\n- Wawekezaji wa huduma" },
        { title: "4. Usalama", content: "Tunalinda data yako kwa:\n- Usimbaji fiche\n- Seva salama\n- Ufikiaji mdogo" },
        { title: "5. Haki Zako", content: "Unaweza:\n- Kupata data yako\n- Kuomba marekebisho\n- Kufuta akaunti yako\n- Kujiondoa kwenye utangazaji" },
        { title: "6. Kuki", content: "Tunatumia kuki kwa:\n- Kukumbuka mapendeleo\n- Kuelewa matumizi\n- Kuboresha huduma yetu" },
        { title: "7. Faragha ya Watoto", content: "Sio kwa watoto chini ya miaka 13. Hatukusanyi data kutoka kwa watoto." },
        { title: "8. Mabadiliko ya Sera", content: "Tutakujulisha kuhusu mabadiliko muhimu." },
        { title: "9. Wasiliana Nasi", content: "Barua pepe: contact@goldenarchive.com\nAnwani: Nairobi, Kenya" }
      ]
    }
  };
  

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

  // Handle Transaction Code validation
  // const validateTransactionCode = () => {
  //   setIsProcessingPayment(true);
  //   setTransactionError('');
  
  //   if (window.gtag) {
  //     window.gtag('event', 'payment_attempt', {
  //       mix_title: shareForMix?.title,
  //       transaction_code: transactionCode
  //     });
  //   }
  
  //   setTimeout(() => {
  //     const trimmedCode = transactionCode.trim();
  
  //     if (!trimmedCode) {
  //       setTransactionError('Please enter a transaction code or phone number');
  //       setIsProcessingPayment(false);
  //       return false;
  //     }
  
  //     // Validate if it's a transaction code starting with 2 uppercase letters
  //     const isTransactionCode = /^[A-Z]{2}/.test(trimmedCode);
  
  //     // Validate if it's a valid phone number format (Kenyan style)
  //     const isPhoneNumber = /^0\d{9,}$/.test(trimmedCode) || /^(\+254|254)\d{9,}$/.test(trimmedCode);
  
  //     if (isTransactionCode || isPhoneNumber) {
  //       setIsProcessingPayment(false);
  //       setDownloadPopupOpen(false);
  //       setSuccessPopupOpen(true);
  
  //       if (window.gtag) {
  //         window.gtag('event', 'payment_success', {
  //           mix_title: shareForMix?.title,
  //           transaction_code: transactionCode
  //         });
  //       }
  
  //       setTimeout(() => {
  //         handleDownload(shareForMix.audioUrl);
  //       }, 1000);
  
  //       return true;
  //     } else {
  //       setTransactionError('Invalid transaction code or phone number format');
  //       setIsProcessingPayment(false);
  //       return false;
  //     }
  //   }, 1500);
  // };

  const validateTransactionCode = () => {
    setIsProcessingPayment(true);
    setTransactionError('');
    
    if (window.gtag) {
      window.gtag('event', 'payment_attempt', {
        mix_title: shareForMix?.title,
        transaction_code: transactionCode
      });
    }
    
    setTimeout(() => {
      const trimmedCode = transactionCode.trim();
  
      if (!trimmedCode) {
        setTransactionError('Please enter a transaction code or phone number');
        setIsProcessingPayment(false);
        return false;
      }
  
      // Validate if it's a transaction code starting with 2 uppercase letters
      const isTransactionCode = /^[A-Z]{2}/.test(trimmedCode);
  
      // Validate if it's a valid phone number format (including international)
      const isPhoneNumber = /^0\d{9,}$/.test(trimmedCode) || 
                           /^(\+254|254)\d{9,}$/.test(trimmedCode) ||
                           /^(\+?\d{1,4}?[-.\s]?)?(\(?\d{1,3}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(trimmedCode);
  
      if (isTransactionCode || isPhoneNumber) {
        setIsProcessingPayment(false);
        setDownloadPopupOpen(false);
        setSuccessPopupOpen(true);
  
        if (window.gtag) {
          window.gtag('event', 'payment_success', {
            mix_title: shareForMix?.title,
            transaction_code: transactionCode
          });
        }
  
        setTimeout(() => {
          handleDownload(shareForMix.audioUrl);
        }, 1000);
  
        return true;
      } else {
        // Provide specific error messages based on input
        if (trimmedCode.length < 6) {
          setTransactionError('Input is too short. Transaction codes should be at least 6 characters.');
        } else if (/^\d+$/.test(trimmedCode)) {
          setTransactionError('Please include your country code for international numbers (e.g., +1234567890)');
        } else if (/^[a-zA-Z]+$/.test(trimmedCode)) {
          setTransactionError('Transaction codes should include both letters and numbers (e.g., TD123456)');
        } else {
          setTransactionError('Invalid format. Please enter a valid transaction code (e.g., TD123456) or phone number with country code (e.g., +1234567890)');
        }
        
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
          
          if (window.gtag) {
            window.gtag('event', 'play_mix', {
              mix_title: currentMix.title,
              mix_id: currentMix.id
            });
          }
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
    
    if (window.gtag) {
      window.gtag('event', 'download_attempt', {
        mix_title: mix.title,
        mix_id: mix.id
      });
    }
  };

  // Handle share
  const handleShare = (mix) => {
    setShareForMix(mix);
    setSharePopupOpen(true);
    
    if (window.gtag) {
      window.gtag('event', 'share_attempt', {
        mix_title: mix.title,
        mix_id: mix.id
      });
    }
  };

  // Share via WhatsApp
  const shareViaWhatsApp = () => {
    const url = `https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA`;
    const message = `Check out this mix: ${shareForMix.title} - ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    
    if (window.gtag) {
      window.gtag('event', 'share_success', {
        mix_title: shareForMix.title,
        platform: 'whatsapp'
      });
    }
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
      
      if (window.gtag) {
        window.gtag('event', 'share_success', {
          mix_title: shareForMix.title,
          platform: 'clipboard'
        });
      }
    });
  };

  // Copy phone number to clipboard
  // const copyPhoneNumber = () => {
  //   const phoneNumber = "+254 729942447";
  //   navigator.clipboard.writeText(phoneNumber).then(() => {
  //     toast.success("Phone number copied to clipboard!", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: true,
  //     });
  //   });
  // };
  const copyPhoneNumber = () => {
    const phoneNumber = "+254 729942447";
    navigator.clipboard.writeText(phoneNumber).then(() => {
      // Create and show custom toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-md';
      toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm font-medium">Phone number copied to clipboard!</span>
        <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      `;
      
      // Add animation styles
      toast.style.animation = 'toastFadeIn 0.3s ease-out forwards';
      
      document.body.appendChild(toast);
      
      // Remove toast after 2 seconds
      setTimeout(() => {
        if (toast.parentElement) {
          toast.style.animation = 'toastFadeOut 0.3s ease-in forwards';
          setTimeout(() => {
            if (toast.parentElement) {
              toast.parentElement.removeChild(toast);
            }
          }, 300);
        }
      }, 2000);
    });
  };
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastFadeIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
    
    @keyframes toastFadeOut {
      from {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
    }
  `;
  
  // Add styles to document head if not already added
  if (!document.querySelector('style#toast-styles')) {
    style.id = 'toast-styles';
    document.head.appendChild(style);
  }
  // Toggle mute
  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

   // Toggle dark mode
   const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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

  // Legal Notice Popup
 
  const LegalNoticePopup = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        style={{
          backgroundImage: isDarkMode 
            ? "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(76,29,149,0.85) 100%)" 
            : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(124,58,237,0.15) 100%)",
          backdropFilter: "blur(12px)"
        }}
      >
        {/* Background elements (unchanged) */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 left-0 w-full h-full opacity-10 
            ${isDarkMode ? 'bg-gradient-to-tr from-purple-900 via-gray-900 to-gray-900' : 'bg-gradient-to-tr from-purple-100 via-gray-100 to-white'}`}>
          </div>
          
          <motion.div 
            className={`absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 
              ${isDarkMode ? 'bg-purple-600' : 'bg-purple-300'}`}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className={`absolute top-10 left-10 w-40 h-40 rounded-full opacity-5 
              ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-200'}`}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
  
        {/* Popup Content */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ 
            scale: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 25 } 
          }}
          className={`rounded-xl p-6 w-full max-w-2xl shadow-2xl relative z-10 backdrop-blur-sm
            ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'}`}
          style={{
            boxShadow: isDarkMode 
              ? "0 25px 50px -12px rgba(124, 58, 237, 0.3)" 
              : "0 25px 50px -12px rgba(139, 92, 246, 0.2)"
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <motion.h3 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-xl font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}
            >
              {legalNotices[language].title}
            </motion.h3>
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex space-x-2"
            >
              <motion.button 
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(language === 'english' ? 'swahili' : 'english')}
                className={`px-3 py-1 text-sm rounded-md transition-all duration-300 
                  ${isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 shadow-lg shadow-purple-900/20 text-purple-400 hover:text-purple-300' 
                    : 'bg-white hover:bg-gray-50 shadow-md shadow-purple-200/50 text-purple-600 hover:text-purple-700'}`}
              >
                {language === 'english' ? 'Swahili' : 'English'}
              </motion.button>
            </motion.div>
          </div>
  
          {/* Legal content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-lg mb-6 max-h-96 overflow-y-auto 
              ${isDarkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-white/60 text-gray-600'} backdrop-blur-sm shadow-sm`}
            style={{
              boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
              borderLeft: isDarkMode 
                ? "3px solid rgba(139, 92, 246, 0.5)" 
                : "3px solid rgba(124, 58, 237, 0.3)"
            }}
          >
            <p>{legalNotices[language].content}</p>
          </motion.div>
  
          {/* Button (always enabled) */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ 
              y: -3, 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLegalNotice(false)}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 
              ${isDarkMode 
                ? 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/30' 
                : 'bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-300/50'}`}
          >
            <span className="flex items-center justify-center gap-2">
              {legalNotices[language].understood}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity, 
                  repeatDelay: 3
                }}
              >
                ✓
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  // Terms and Privacy Popups

  const TermsPopup = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 10, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`rounded-xl p-6 w-full max-w-2xl shadow-2xl ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md relative overflow-hidden`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-5 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'}`}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -5, 0],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className={`absolute -bottom-10 -left-10 w-24 h-24 rounded-full opacity-5 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'}`}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 5, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
  
        <div className="flex justify-between items-center mb-6 relative z-10">
          <motion.h3 
            className={`text-xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {language === 'english' ? 'Terms of Service' : 'Sheria za Huduma'}
          </motion.h3>
          <div className="flex space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'english' ? 'swahili' : 'english')}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition-all
                ${isDarkMode ? 
                  'bg-gray-700 hover:bg-gray-600 text-purple-300 border border-gray-600' : 
                  'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'english' ? 'Switch to Swahili' : 'Switch to English'}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowTerms(false)}
              className={`p-2 rounded-full flex items-center justify-center transition-all
                ${isDarkMode ? 
                  'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' : 
                  'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'}`}
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>
    
        <motion.div 
          className={`p-5 rounded-xl mb-6 max-h-[60vh] overflow-y-auto shadow-inner
            ${isDarkMode ? 
              'bg-gray-700/80 text-gray-300 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800' : 
              'bg-gray-50 text-gray-700 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {legalDocuments.terms[language].map((section, index) => (
            <motion.div 
              key={index} 
              className="mb-6 last:mb-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                {section.title}
              </h4>
              <p className="whitespace-pre-line text-sm leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
  
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowTerms(false)}
            className={`px-5 py-2 rounded-lg font-medium shadow-md
              ${isDarkMode ? 
                'bg-purple-600 hover:bg-purple-500 text-white' : 
                'bg-purple-600 hover:bg-purple-700 text-white'}`}
          >
            I Understand
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
  
  const PrivacyPopup = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 10, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`rounded-xl p-6 w-full max-w-2xl shadow-2xl ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md relative overflow-hidden`}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-5 ${isDarkMode ? 'bg-purple-500' : 'bg-purple-300'}`}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -5, 0],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className={`absolute -bottom-10 -left-10 w-24 h-24 rounded-full opacity-5 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-300'}`}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 5, 0],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
  
        <div className="flex justify-between items-center mb-6 relative z-10">
          <motion.h3 
            className={`text-xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {language === 'english' ? 'Privacy Policy' : 'Sera ya Faragha'}
          </motion.h3>
          <div className="flex space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'english' ? 'swahili' : 'english')}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition-all
                ${isDarkMode ? 
                  'bg-gray-700 hover:bg-gray-600 text-purple-300 border border-gray-600' : 
                  'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {language === 'english' ? 'Switch to Swahili' : 'Switch to English'}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowPrivacy(false)}
              className={`p-2 rounded-full flex items-center justify-center transition-all
                ${isDarkMode ? 
                  'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' : 
                  'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'}`}
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <X size={18} />
            </motion.button>
          </div>
        </div>
    
        <motion.div 
          className={`p-5 rounded-xl mb-6 max-h-[60vh] overflow-y-auto shadow-inner
            ${isDarkMode ? 
              'bg-gray-700/80 text-gray-300 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800' : 
              'bg-gray-50 text-gray-700 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {legalDocuments.privacy[language].map((section, index) => (
            <motion.div 
              key={index} 
              className="mb-6 last:mb-0"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <h4 className={`font-semibold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                {section.title}
              </h4>
              <p className="whitespace-pre-line text-sm leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </motion.div>
  
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowPrivacy(false)}
            className={`px-5 py-2 rounded-lg font-medium shadow-md
              ${isDarkMode ? 
                'bg-purple-600 hover:bg-purple-500 text-white' : 
                'bg-purple-600 hover:bg-purple-700 text-white'}`}
          >
            I Understand
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  if (!hasMounted) {
    return null; // Prevent flickering by not rendering until mounted
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      {/* Legal Notice Popup */}
      <AnimatePresence>
        {showLegalNotice && <LegalNoticePopup />}
      </AnimatePresence>

      {/* Terms Popup */}
      <AnimatePresence>
        {showTerms && <TermsPopup />}
      </AnimatePresence>

      {/* Privacy Popup */}
      <AnimatePresence>
        {showPrivacy && <PrivacyPopup />}
      </AnimatePresence>

      {/* Header */}
      <header className={`p-6 flex justify-between items-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} sticky top-0 z-40 shadow-md`}>
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

      {/* Player Section - At the top */}
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
            🎧 Vibes with a Designer's Touch
          </motion.h2>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="text-sm sm:text-base text-center 
              leading-relaxed px-2
              opacity-90"
          >
            Hey, I'm a frontend developer learning the ropes of UX. I love things that feel smooth, whether it's a website, an app, or a beat. These mixes? Just me having fun and chasing that flow.
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

      {/* Enhanced Social Proof Section */}
     
      <motion.section 
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className={`py-10 px-4 relative overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
>
  {/* Animated background gradient */}
  <div className="absolute inset-0 z-0">
    <div className={`absolute top-0 left-0 w-full h-full opacity-10 ${isDarkMode ? 'bg-gradient-to-br from-purple-900 via-indigo-900 to-gray-800' : 'bg-gradient-to-br from-purple-100 via-indigo-50 to-white'}`}></div>
    
    {/* Animated circles */}
    <motion.div 
      className={`absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-20 ${isDarkMode ? 'bg-purple-600' : 'bg-purple-300'}`}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, 10, 0],
        y: [0, 15, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    <motion.div 
      className={`absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10 ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-200'}`}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, -20, 0],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </div>

  <div className="max-w-3xl mx-auto relative z-10">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-center mb-6"
    >
      <motion.h3 
        className={`text-2xl sm:text-3xl font-semibold mb-3 
          ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}
      >
        People Are Loving Golden Archive
      </motion.h3>

      <p className={`text-sm sm:text-base max-w-lg mx-auto leading-relaxed 
        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Whether it's a nostalgic Weekend or long drives, 
        these mixes are finding their way into good moments.
      </p>
    </motion.div>

    {/* Stats Card */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className={`rounded-xl p-5 shadow-md mx-2 sm:mx-auto backdrop-blur-sm
        ${isDarkMode ? 'bg-gray-700/80 shadow-purple-900/20' : 'bg-white/90 shadow-purple-200/50'}`}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Downloads */}
        <motion.div 
          className="flex-1 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div 
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2
              ${isDarkMode ? 'bg-purple-900/60' : 'bg-purple-100'}`}
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <Download size={20} className={isDarkMode ? 'text-purple-300' : 'text-purple-600'} />
          </motion.div>
          <motion.p 
            className={`text-3xl font-bold mb-1
              ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut" 
              }}
            >
              543
            </motion.span>
          </motion.p>
          <p className={`text-xs font-medium uppercase tracking-wide
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Downloads
          </p>
        </motion.div>

        {/* Divider */}
        <div className="hidden sm:block">
          <div className={`h-16 w-px ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
        </div>
        
        {/* Mobile divider */}
        <div className="sm:hidden w-full">
          <div className={`h-px w-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
        </div>

        {/* Rating */}
        <motion.div 
          className="flex-1 text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div 
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2
              ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}
            whileHover={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1],
              transition: { duration: 0.5 }
            }}
          >
            <Star size={20} className="text-yellow-400 fill-yellow-400" />
          </motion.div>
          <motion.p 
            className="text-3xl font-bold mb-1 text-yellow-400"
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut" 
              }}
            >
              4.7
            </motion.span>
          </motion.p>
          <p className={`text-xs font-medium tracking-wide
            ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Rated by <span className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-500'}`}>86+</span> fans
          </p>
        </motion.div>
      </div>
    </motion.div>
  </div>
</motion.section>
      {/* Share Popup */}
      <AnimatePresence>
        {sharePopupOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSharePopupOpen(false)}
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
                  Share "{shareForMix?.title}"
                </h3>
                <button 
                  onClick={() => setSharePopupOpen(false)}
                  className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareViaWhatsApp}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center space-y-2 
                    ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <faWhatsapp size={24} className="text-green-500" />
                  <span>WhatsApp</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyLink}
                  className={`p-4 rounded-lg flex flex-col items-center justify-center space-y-2 
                    ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  <Link size={24} className="text-blue-500" />
                  <span>Copy Link</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                      <li>Send {shareForMix?.price} to <strong>Pochi: 0729942447</strong></li>
                      <li>Enter your M-Pesa transaction code below</li>
                      <li>Click "Verify Payment"</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Transaction Code / Phone Number
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

      {/* Enhanced Footer */}
      <motion.footer 
  className={`pt-12 pb-8 px-6 border-t relative overflow-hidden
    ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-300'}`}
>
  {/* Animated background elements */}
  <div className="absolute inset-0 z-0">
    <div className={`absolute top-0 left-0 w-full h-full opacity-10 
      ${isDarkMode ? 'bg-gradient-to-tr from-purple-900 via-gray-900 to-gray-900' : 'bg-gradient-to-tr from-purple-100 via-gray-100 to-white'}`}>
    </div>
    
    {/* Animated circle */}
    <motion.div 
      className={`absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 
        ${isDarkMode ? 'bg-purple-600' : 'bg-purple-300'}`}
      animate={{
        scale: [1, 1.1, 1],
        x: [0, -10, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 18,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
    
    <motion.div 
      className={`absolute top-10 left-10 w-40 h-40 rounded-full opacity-5 
        ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-200'}`}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 20, 0],
        y: [0, 10, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm relative z-10">
    {/* Brand Info */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`p-5 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'} backdrop-blur-sm shadow-sm`}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <motion.h3 
        className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}
        whileHover={{ x: 3, transition: { duration: 0.2 } }}
      >
        Golden Archive
      </motion.h3>
      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Curated music mixes blending creativity, culture, and sound.
        Every mix is crafted with intentional flow.
      </p>
    </motion.div>

    {/* Social Links */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`flex flex-col items-center md:items-start p-5 rounded-xl 
        ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'} backdrop-blur-sm shadow-sm`}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <motion.h3 
        className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}
        whileHover={{ x: 3, transition: { duration: 0.2 } }}
      >
        Connect With Us
      </motion.h3>
      <div className="flex space-x-4">
        <motion.a 
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/254729942447" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className={`p-3 rounded-full ${isDarkMode ? 
            'bg-gray-700 hover:bg-gray-600 shadow-lg shadow-green-900/20' : 
            'bg-white hover:bg-gray-50 shadow-md shadow-green-200/50'}`}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-lg" />
        </motion.a>

        <motion.a 
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="mailto:sirrodgers21@gmail.com"
          aria-label="Email"
          className={`p-3 rounded-full ${isDarkMode ? 
            'bg-gray-700 hover:bg-gray-600 shadow-lg shadow-blue-900/20' : 
            'bg-white hover:bg-gray-50 shadow-md shadow-blue-200/50'}`}
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 text-lg" />
        </motion.a>

        <motion.a 
          whileHover={{ y: -3, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.youtube.com/channel/UCmOJF2TM3CFmFmJyOkbQMxA" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="YouTube Channel"
          className={`p-3 rounded-full ${isDarkMode ? 
            'bg-gray-700 hover:bg-gray-600 shadow-lg shadow-red-900/20' : 
            'bg-white hover:bg-gray-50 shadow-md shadow-red-200/50'}`}
        >
          <FontAwesomeIcon icon={faYoutube} className="text-red-500 text-lg" />
        </motion.a>
      </div>
    </motion.div>

    {/* Legal */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`p-5 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'} backdrop-blur-sm shadow-sm`}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <motion.h3 
        className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}
        whileHover={{ x: 3, transition: { duration: 0.2 } }}
      >
        Legal
      </motion.h3>
      <div className="space-y-2">
        <motion.button 
          onClick={() => {
            setShowTerms(true);
            setLanguage('english');
          }}
          className={`text-left ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
          whileHover={{ x: 3, transition: { duration: 0.2 } }}
        >
          Terms of Service
        </motion.button>
        <div className="block h-px bg-gray-700/30 my-2"></div>
        <motion.button 
          onClick={() => {
            setShowPrivacy(true);
            setLanguage('english');
          }}
          className={`text-left ${isDarkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'}`}
          whileHover={{ x: 3, transition: { duration: 0.2 } }}
        >
          Privacy Policy
        </motion.button>
      </div>
    </motion.div>
  </div>

  {/* Copyright */}
  <motion.div 
    className={`mt-12 pt-6 border-t text-center relative z-10
      ${isDarkMode ? 'border-gray-700/50' : 'border-gray-300/50'}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.6 }}
  >
    <motion.p 
      className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      © 2025 Golden Archive. All rights reserved.
    </motion.p>
  </motion.div>
</motion.footer>

      <ToastContainer />
    </div>
  );
};

export default MusicMixApp;
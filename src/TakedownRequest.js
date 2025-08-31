

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// export default function TakedownRequest() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     song_name: "",
//     content_url: "",
//     reason: "",
//     declaration: false
//   });

//   // Check system preference for dark mode
//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     setIsDarkMode(mediaQuery.matches);
    
//     const handleChange = (e) => setIsDarkMode(e.matches);
//     mediaQuery.addEventListener('change', handleChange);
    
//     return () => mediaQuery.removeEventListener('change', handleChange);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     // Simulate form submission
//     try {
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error("Submission error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setIsSubmitted(false);
//     setFormData({
//       name: "",
//       email: "",
//       song_name: "",
//       content_url: "",
//       reason: "",
//       declaration: false
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="fixed inset-0 flex items-center justify-center z-50 p-4"
//       style={{
//         backgroundImage: isDarkMode 
//           ? "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(76,29,149,0.85) 100%)" 
//           : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(124,58,237,0.15) 100%)",
//         backdropFilter: "blur(12px)"
//       }}
//     >
//       {/* Background elements */}
//       <div className="absolute inset-0 z-0">
//         <div className={`absolute top-0 left-0 w-full h-full opacity-10 
//           ${isDarkMode ? 'bg-gradient-to-tr from-purple-900 via-gray-900 to-gray-900' : 'bg-gradient-to-tr from-purple-100 via-gray-100 to-white'}`}>
//         </div>
        
//         <motion.div 
//           className={`absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-10 
//             ${isDarkMode ? 'bg-purple-600' : 'bg-purple-300'}`}
//           animate={{
//             scale: [1, 1.1, 1],
//             x: [0, -10, 0],
//             y: [0, -15, 0],
//           }}
//           transition={{
//             duration: 18,
//             repeat: Infinity,
//             repeatType: "reverse"
//           }}
//         />
        
//         <motion.div 
//           className={`absolute top-10 left-10 w-40 h-40 rounded-full opacity-5 
//             ${isDarkMode ? 'bg-indigo-500' : 'bg-indigo-200'}`}
//           animate={{
//             scale: [1, 1.2, 1],
//             x: [0, 20, 0],
//             y: [0, 10, 0],
//           }}
//           transition={{
//             duration: 15,
//             repeat: Infinity,
//             repeatType: "reverse"
//           }}
//         />
//       </div>

//       <AnimatePresence mode="wait">
//         {isSubmitted ? (
//           <SuccessMessage resetForm={resetForm} isDarkMode={isDarkMode} />
//         ) : isLoading ? (
//           <Loader isDarkMode={isDarkMode} />
//         ) : (
//           <Form 
//             formData={formData} 
//             handleInputChange={handleInputChange} 
//             handleSubmit={handleSubmit} 
//             isDarkMode={isDarkMode} 
//           />
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// // Form Component
// const Form = ({ formData, handleInputChange, handleSubmit, isDarkMode }) => (
//   <motion.div
//     key="form"
//     initial={{ scale: 0.9, y: 20 }}
//     animate={{ 
//       scale: 1, 
//       y: 0,
//       transition: { type: "spring", stiffness: 300, damping: 25 } 
//     }}
//     exit={{ scale: 0.9, opacity: 0 }}
//     className={`rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 backdrop-blur-sm
//       ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'}`}
//     style={{
//       boxShadow: isDarkMode 
//         ? "0 25px 50px -12px rgba(124, 58, 237, 0.3)" 
//         : "0 25px 50px -12px rgba(139, 92, 246, 0.2)"
//     }}
//   >
//     <motion.div 
//       initial={{ x: -20, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ delay: 0.2 }}
//       className="text-center mb-8"
//     >
//       <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//         Intellectual Property Takedown Request
//       </h1>
//       <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//         If you believe your copyrighted material or intellectual property 
//         has been used without authorization, please submit this form. 
//         Our team will review your request and respond promptly.
//       </p>
//     </motion.div>

//     <form onSubmit={handleSubmit} className="space-y-6">
//       {/* Full Name */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3 }}
//       >
//         <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//           Full Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           required
//           className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
//             ${isDarkMode 
//               ? 'bg-gray-800/70 text-white border-gray-700' 
//               : 'bg-white/70 text-gray-800 border-gray-300'}`}
//           placeholder="John Doe"
//         />
//       </motion.div>

//       {/* Email */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.35 }}
//       >
//         <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//           Email Address
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           required
//           className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
//             ${isDarkMode 
//               ? 'bg-gray-800/70 text-white border-gray-700' 
//               : 'bg-white/70 text-gray-800 border-gray-300'}`}
//           placeholder="you@example.com"
//         />
//       </motion.div>

//       {/* Song Name */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4 }}
//       >
//         <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//           Song Name to be Removed
//         </label>
//         <input
//           type="text"
//           name="song_name"
//           value={formData.song_name}
//           onChange={handleInputChange}
//           required
//           className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
//             ${isDarkMode 
//               ? 'bg-gray-800/70 text-white border-gray-700' 
//               : 'bg-white/70 text-gray-800 border-gray-300'}`}
//           placeholder="Enter the song title"
//         />
//       </motion.div>

//       {/* Content URL */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.45 }}
//       >
//         <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//           Content URL
//         </label>
//         <input
//           type="url"
//           name="content_url"
//           value={formData.content_url}
//           onChange={handleInputChange}
//           required
//           className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
//             ${isDarkMode 
//               ? 'bg-gray-800/70 text-white border-gray-700' 
//               : 'bg-white/70 text-gray-800 border-gray-300'}`}
//           placeholder="https://example.com/infringing-content"
//         />
//       </motion.div>

//       {/* Reason */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//       >
//         <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//           Reason for Takedown
//         </label>
//         <textarea
//           name="reason"
//           rows="4"
//           value={formData.reason}
//           onChange={handleInputChange}
//           required
//           className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
//             ${isDarkMode 
//               ? 'bg-gray-800/70 text-white border-gray-700' 
//               : 'bg-white/70 text-gray-800 border-gray-300'}`}
//           placeholder="Explain why this content should be removed..."
//         ></textarea>
//       </motion.div>

//       {/* Declaration */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.55 }}
//         className={`p-4 rounded-xl mb-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'} backdrop-blur-sm shadow-sm`}
//         style={{
//           boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
//           borderLeft: isDarkMode 
//             ? "3px solid rgba(139, 92, 246, 0.5)" 
//             : "3px solid rgba(124, 58, 237, 0.3)"
//         }}
//       >
//         <label className="flex items-start space-x-2">
//           <input
//             type="checkbox"
//             name="declaration"
//             checked={formData.declaration}
//             onChange={handleInputChange}
//             required
//             className={`mt-1 w-4 h-4 rounded focus:ring-purple-500 ${
//               isDarkMode 
//                 ? 'text-purple-500 bg-gray-700 border-gray-600' 
//                 : 'text-purple-600 bg-white border-gray-300'
//             }`}
//           />
//           <span className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//             By submitting this form, you declare that the information provided 
//             is accurate and that you are the rightful owner or authorized to act 
//             on behalf of the owner.
//           </span>
//         </label>
//       </motion.div>

//       {/* Button */}
//       <motion.button
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//         type="submit"
//         whileHover={{ 
//           y: -3, 
//           scale: 1.02,
//           transition: { duration: 0.3 }
//         }}
//         whileTap={{ scale: 0.95 }}
//         className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 
//           ${isDarkMode 
//             ? 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/30' 
//             : 'bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-300/50'}`}
//       >
//         <span className="flex items-center justify-center gap-2">
//           Submit Request
//           <motion.span
//             animate={{
//               scale: [1, 1.2, 1],
//             }}
//             transition={{ 
//               duration: 1.5,
//               repeat: Infinity, 
//               repeatDelay: 3
//             }}
//           >
//             ↗
//           </motion.span>
//         </span>
//       </motion.button>
//     </form>
//   </motion.div>
// );

// // Loader Component
// const Loader = ({ isDarkMode }) => (
//   <motion.div
//     key="loader"
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     exit={{ opacity: 0, scale: 0.8 }}
//     transition={{ duration: 0.5 }}
//     className={`rounded-xl p-8 w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm text-center
//       ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'}`}
//     style={{
//       boxShadow: isDarkMode 
//         ? "0 25px 50px -12px rgba(124, 58, 237, 0.3)" 
//         : "0 25px 50px -12px rgba(139, 92, 246, 0.2)"
//     }}
//   >
//     <motion.div
//       animate={{ rotate: 360 }}
//       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//       className={`w-16 h-16 rounded-full border-4 mx-auto mb-6
//         ${isDarkMode 
//           ? 'border-purple-500 border-t-transparent' 
//           : 'border-purple-600 border-t-transparent'}`}
//     />
//     <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//       Processing Request
//     </h3>
//     <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
//       Please wait while we submit your takedown request...
//     </p>
//   </motion.div>
// );

// // Success Message Component
// const SuccessMessage = ({ resetForm, isDarkMode }) => (
//   <motion.div
//     key="success"
//     initial={{ opacity: 0, scale: 0.8 }}
//     animate={{ opacity: 1, scale: 1 }}
//     exit={{ opacity: 0, scale: 0.8 }}
//     transition={{ duration: 0.5 }}
//     className={`rounded-xl p-8 w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm text-center
//       ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'}`}
//     style={{
//       boxShadow: isDarkMode 
//         ? "0 25px 50px -12px rgba(124, 58, 237, 0.3)" 
//         : "0 25px 50px -12px rgba(139, 92, 246, 0.2)"
//     }}
//   >
//     <motion.div
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ type: "spring", stiffness: 200, damping: 15 }}
//       className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
//         isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
//       }`}
//     >
//       <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//       </svg>
//     </motion.div>
    
//     <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
//       Request Submitted!
//     </h3>
    
//     <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//       Your takedown request has been successfully submitted. 
//       Our team will review it and respond to you shortly.
//     </p>
    
//     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={resetForm}
//         className={`px-6 py-3 rounded-lg font-medium transition-colors
//           ${isDarkMode 
//             ? 'bg-purple-600 hover:bg-purple-500 text-white' 
//             : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
//       >
//         Submit Another Request
//       </motion.button>
      
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => window.location.href = '/'}
//         className={`px-6 py-3 rounded-lg font-medium transition-colors
//           ${isDarkMode 
//             ? 'bg-gray-700 hover:bg-gray-600 text-white' 
//             : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
//       >
//         Return Home
//       </motion.button>
//     </div>
//   </motion.div>
// );


import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function TakedownRequest() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    song_name: "",
    content_url: "",
    reason: "",
    declaration: false
  });

  // Check system preference for dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Submit to Formspree
      const response = await fetch("https://formspree.io/f/mqaeblnw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message || "Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setError(null);
    setFormData({
      name: "",
      email: "",
      song_name: "",
      content_url: "",
      reason: "",
      declaration: false
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backgroundImage: isDarkMode 
          ? "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(76,29,149,0.85) 100%)" 
          : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(124,58,237,0.15) 100%)",
        backdropFilter: "blur(12px)"
      }}
    >
      {/* Background elements */}
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

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <SuccessMessage resetForm={resetForm} isDarkMode={isDarkMode} />
        ) : isLoading ? (
          <Loader isDarkMode={isDarkMode} />
        ) : (
          <Form 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleSubmit={handleSubmit} 
            isDarkMode={isDarkMode}
            error={error}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Form Component
const Form = ({ formData, handleInputChange, handleSubmit, isDarkMode, error }) => (
  <motion.div
    key="form"
    initial={{ scale: 0.9, y: 20 }}
    animate={{ 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 } 
    }}
    exit={{ scale: 0.9, opacity: 0 }}
    className={`rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 backdrop-blur-sm
      ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'}`}
    style={{
      boxShadow: isDarkMode 
        ? "0 25px 50px -12px rgba(124, 58, 237, 0.3)" 
        : "0 25px 50px -12px rgba(139, 92, 246, 0.2)"
    }}
  >
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center mb-8"
    >
      <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
        Intellectual Property Takedown Request
      </h1>
      <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        If you believe your copyrighted material or intellectual property 
        has been used without authorization, please submit this form. 
        I will review your request and respond promptly.
      </p>
    </motion.div>

    {/* Error Message */}
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`p-4 mb-6 rounded-lg ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} border ${isDarkMode ? 'border-red-800' : 'border-red-200'}`}
        >
          <div className="flex items-start">
            <svg className={`w-5 h-5 mt-0.5 mr-3 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span className={isDarkMode ? 'text-red-300' : 'text-red-700'}>{error}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
            ${isDarkMode 
              ? 'bg-gray-800/70 text-white border-gray-700' 
              : 'bg-white/70 text-gray-800 border-gray-300'}`}
          placeholder="John Doe"
        />
      </motion.div>

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
            ${isDarkMode 
              ? 'bg-gray-800/70 text-white border-gray-700' 
              : 'bg-white/70 text-gray-800 border-gray-300'}`}
          placeholder="you@example.com"
        />
      </motion.div>

      {/* Song Name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
          Song Name to be Removed
        </label>
        <input
          type="text"
          name="song_name"
          value={formData.song_name}
          onChange={handleInputChange}
          required
          className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
            ${isDarkMode 
              ? 'bg-gray-800/70 text-white border-gray-700' 
              : 'bg-white/70 text-gray-800 border-gray-300'}`}
          placeholder="Enter the song title"
        />
      </motion.div>

      {/* Content URL */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
          Content URL
        </label>
        <input
          type="url"
          name="content_url"
          value={formData.content_url}
          onChange={handleInputChange}
          required
          className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
            ${isDarkMode 
              ? 'bg-gray-800/70 text-white border-gray-700' 
              : 'bg-white/70 text-gray-800 border-gray-300'}`}
          placeholder="https://example.com/infringing-content"
        />
      </motion.div>

      {/* Reason */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
          Reason for Takedown
        </label>
        <textarea
          name="reason"
          rows="4"
          value={formData.reason}
          onChange={handleInputChange}
          required
          className={`w-full p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition
            ${isDarkMode 
              ? 'bg-gray-800/70 text-white border-gray-700' 
              : 'bg-white/70 text-gray-800 border-gray-300'}`}
          placeholder="Explain why this content should be removed..."
        ></textarea>
      </motion.div>

      {/* Declaration */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className={`p-4 rounded-xl mb-6 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'} backdrop-blur-sm shadow-sm`}
        style={{
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
          borderLeft: isDarkMode 
            ? "3px solid rgba(139, 92, 246, 0.5)" 
            : "3px solid rgba(124, 58, 237, 0.3)"
        }}
      >
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="declaration"
            checked={formData.declaration}
            onChange={handleInputChange}
            required
            className={`mt-1 w-4 h-4 rounded focus:ring-purple-500 ${
              isDarkMode 
                ? 'text-purple-500 bg-gray-700 border-gray-600' 
                : 'text-purple-600 bg-white border-gray-300'
            }`}
          />
          <span className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            By submitting this form, you declare that the information provided 
            is accurate and that you are the rightful owner or authorized to act 
            on behalf of the owner.
          </span>
        </label>
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        type="submit"
        disabled={!formData.declaration}
        whileHover={{ 
          y: formData.declaration ? -3 : 0, 
          scale: formData.declaration ? 1.02 : 1,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: formData.declaration ? 0.95 : 1 }}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 
          ${isDarkMode 
            ? formData.declaration 
              ? 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/30' 
              : 'bg-gray-600 cursor-not-allowed shadow-lg shadow-gray-900/30'
            : formData.declaration 
              ? 'bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-300/50' 
              : 'bg-gray-400 cursor-not-allowed shadow-md shadow-gray-300/50'}`}
      >
        <span className="flex items-center justify-center gap-2">
          {formData.declaration ? 'Submit Request' : 'Please accept the declaration'}
          {formData.declaration && (
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity, 
                repeatDelay: 3
              }}
            >
              ↗
            </motion.span>
          )}
        </span>
      </motion.button>
    </form>
  </motion.div>
);

// Loader Component
const Loader = ({ isDarkMode }) => (
  <motion.div
    key="loader"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`rounded-xl p-8 w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm text-center
      ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'}`}
    style={{
      boxShadow: isDarkMode 
        ? "0 25px 50px -12px rgba(124, 58, 237, 0.3)" 
        : "0 25px 50px -12px rgba(139, 92, 246, 0.2)"
    }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`w-16 h-16 rounded-full border-4 mx-auto mb-6
        ${isDarkMode 
          ? 'border-purple-500 border-t-transparent' 
          : 'border-purple-600 border-t-transparent'}`}
    />
    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
      Processing Request
    </h3>
    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
      Please wait while we submit your takedown request...
    </p>
  </motion.div>
);

// Success Message Component
const SuccessMessage = ({ resetForm, isDarkMode }) => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`rounded-xl p-8 w-full max-w-md shadow-2xl relative z-10 backdrop-blur-sm text-center
      ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/60'}`}
    style={{
      boxShadow: isDarkMode 
        ? "0 25px 50px -12px rgba(124, 58, 237, 0.3)" 
        : "0 25px 50px -12px rgba(139, 92, 246, 0.2)"
    }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
        isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
      }`}
    >
      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </motion.div>
    
    <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
      Request Submitted!
    </h3>
    
    <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      Your takedown request has been successfully submitted. 
      I will review it and respond to you shortly.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetForm}
        className={`px-6 py-3 rounded-lg font-medium transition-colors
          ${isDarkMode 
            ? 'bg-purple-600 hover:bg-purple-500 text-white' 
            : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
      >
        Submit Another Request
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.location.href = '/'}
        className={`px-6 py-3 rounded-lg font-medium transition-colors
          ${isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
      >
        Return Home
      </motion.button>
    </div>
  </motion.div>
);
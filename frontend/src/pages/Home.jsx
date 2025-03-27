import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const pulseHover = {
  scale: 1.03,
  transition: { 
    type: "spring", 
    stiffness: 300,
    damping: 10 
  }
};

function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="fixed inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-20 w-60 h-60 rounded-full bg-blue-200 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-indigo-200 blur-3xl"></div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="relative inline-block">
                <span className="relative z-10">Find Your </span>
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="absolute bottom-2 left-0 h-3 bg-blue-100 z-0"
                />
              </span>
              <br className="md:hidden" />
              <span className="text-blue-600">Dream Job</span> Today
            </motion.h1>
            
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
            >
              Join the platform trusted by 10,000+ companies and professionals worldwide
            </motion.p>
            
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link 
                to="/jobs" 
                className="relative overflow-hidden group"
              >
                <motion.div
                  whileHover={pulseHover}
                  className={`bg-blue-600 text-white font-medium py-3 px-8 rounded-md shadow-md`}
                >
                  <span className="relative z-10">Browse Jobs</span>
                  <motion.span 
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    className="absolute inset-0 bg-blue-700 z-0"
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </Link>
              <Link 
                to="/post-job" 
                className="relative overflow-hidden group"
              >
                <motion.div
                  whileHover={pulseHover}
                  className="bg-white text-blue-600 border border-blue-600 font-medium py-3 px-8 rounded-md shadow-sm"
                >
                  <span className="relative z-10">Post a Job</span>
                  <motion.span 
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    className="absolute inset-0 bg-blue-50 z-0"
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Animated mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 mx-auto max-w-4xl bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="h-64 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <motion.div
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                  y: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-white text-center p-6"
              >
                <p className="text-2xl font-medium">JobPlatform Dashboard</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={ref} 
        className="relative py-20 px-6 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-gray-900 mb-16"
          >
            Trusted by Industry Leaders
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "10K+", label: "Active Job Seekers", icon: "👨‍💻" },
              { value: "2.5K+", label: "Companies Hiring", icon: "🏢" },
              { value: "95%", label: "Hiring Success Rate", icon: "📈" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <motion.p 
                  className="text-4xl font-bold text-blue-600 mb-2"
                  initial={{ scale: 0.9 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    delay: index * 0.15 + 0.3
                  }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who've found their perfect match through our platform.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block"
          >
            <Link 
              to="/signup" 
              className="inline-block bg-white text-blue-600 font-medium py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started - It's Free
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
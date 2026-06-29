import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useSpring, useMotionValueEvent } from 'framer-motion';
import { Menu, ArrowRight, ArrowDownRight } from 'lucide-react';

// --- Configuration & Constants ---
const premiumEase = [0.85, 0, 0.15, 1]; 

const PROJECTS = [
  {
    id: 1,
    title: 'Brand Launch',
    subtitle: 'Social Campaign',
    roles: 'Content / Strategy / Ads',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    overlayColor: '#1e3a8a', 
  },
  {
    id: 2,
    title: 'Content Series',
    subtitle: 'Reels & Graphics',
    roles: 'Production / Social Media',
    image: 'https://images.unsplash.com/photo-1515093110296-e26090c2ebf9?q=80&w=2070&auto=format&fit=crop', 
    overlayColor: '#7f1d1d', 
  },
  {
    id: 3,
    title: 'Paid Ads',
    subtitle: 'Lead Generation',
    roles: 'Paid Media / Copywriting',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    overlayColor: '#312e81', 
  }
];

const SERVICES = [
  {
    title: 'Social Media Management',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop'
  },
  {
    title: 'Content Creation',
    image: 'https://images.unsplash.com/photo-1542744094-24638ea89614?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Paid Advertising',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  },
  {
    title: 'Brand Strategy',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
  }
];

const TEAM = [
  {
    name: 'Trayvaughn Burnett',
    role: 'Founder | Social Media Manager | Content Creator | Brand Strategist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop'
  },
  {
    name: 'Team Member 2',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop'
  },
  {
    name: 'Team Member 3',
    role: 'Ads Specialist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop'
  }
];

// --- Components ---

const Logo = ({ delayOffset = 0 }) => (
  <div className="flex items-center gap-3">
    <div className="flex gap-[3px]">
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: delayOffset, ease: premiumEase, originY: 0.5 }}
        className="w-1.5 h-4 bg-[#D4AF37]" 
      />
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: delayOffset + 0.1, ease: premiumEase, originY: 0.5 }}
        className="w-1.5 h-6 bg-[#D4AF37]" 
      />
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: delayOffset + 0.2, ease: premiumEase, originY: 0.5 }}
        className="w-1.5 h-4 bg-[#D4AF37]" 
      />
    </div>
    <div className="overflow-hidden">
      <motion.span 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: delayOffset + 0.2, ease: premiumEase }}
        className="text-white tracking-[0.3em] text-sm md:text-base font-medium block"
      >
        BURNETT'S
      </motion.span>
    </div>
  </div>
);

const Navbar = () => (
  <motion.nav 
    initial={{ y: "-100%" }}
    animate={{ y: 0 }}
    transition={{ duration: 1.2, delay: 0.8, ease: premiumEase }}
    className="fixed top-0 left-0 right-0 z-50 flex justify-between items-stretch h-20 md:h-24 shadow-lg shadow-black/5"
  >
    <div className="flex items-center px-6 md:px-12 h-full bg-[#111111] min-w-[200px]">
      <Logo delayOffset={1.0} />
    </div>
    <div className="flex items-stretch">
      <div className="hidden md:flex items-center justify-center px-8 bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition-colors duration-300">
         <span className="text-white font-medium tracking-widest uppercase text-sm">Book a Call</span>
      </div>
      <div className="h-full bg-[#D4AF37] w-20 md:w-24 flex items-center justify-center cursor-pointer hover:bg-white transition-colors duration-300">
        <Menu size={32} color="#000" strokeWidth={1.5} />
      </div>
    </div>
  </motion.nav>
);

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 1.0 }
    }
  };

  const lineVariants = {
    hidden: { y: "110%", rotateX: 10, opacity: 0 },
    visible: { 
      y: "0%", 
      rotateX: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: premiumEase } 
    }
  };

  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-6 md:px-16 lg:px-32 relative pt-24 text-white">
      <div className="absolute top-32 right-6 md:right-12 text-zinc-500 font-mono text-sm tracking-wider overflow-hidden">
        <motion.div
           initial={{ y: "100%" }}
           animate={{ y: "0%" }}
           transition={{ delay: 1.6, duration: 1, ease: premiumEase }}
        >
          /V2
        </motion.div>
      </div>

      <div className="z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="perspective-[1000px] flex flex-col gap-1 md:gap-2"
        >
          <div className="overflow-hidden pb-2">
            <motion.h1 variants={lineVariants} className="text-5xl md:text-7xl lg:text-[7rem] leading-none font-light tracking-tight">
              Strategic Design
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h1 variants={lineVariants} className="text-5xl md:text-7xl lg:text-[7rem] leading-none font-light text-zinc-400 tracking-tight">
              Creative Direction
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-2">
            <motion.h1 
              variants={lineVariants} 
              className="text-5xl md:text-7xl lg:text-[7rem] leading-none font-light tracking-tight"
            >
              <motion.span
                initial={{ color: "#ffffff" }}
                animate={{ color: "#D4AF37" }}
                transition={{ delay: 2.2, duration: 0.8, ease: "linear" }}
              >
                Digital Experiences
              </motion.span>
            </motion.h1>
          </div>
          <motion.div 
            variants={lineVariants}
            className="mt-12 overflow-hidden"
          >
            <button className="bg-[#D4AF37] text-black px-10 py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300">
              Book a Call
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const WhatWeDo = () => {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-32 text-zinc-900 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            WHAT WE DO
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md text-lg md:text-xl text-zinc-600 font-medium"
        >
          How do we transform your brand to make the most of your digital presence?
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: premiumEase }}
            className="group relative h-[60vh] md:h-[70vh] rounded-[2rem] overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 z-10" />
            
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: premiumEase }}
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover origin-center"
            />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase leading-none w-3/4 mb-4 drop-shadow-md">
                {service.title}
              </h3>
              
              <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all duration-300">
                <ArrowDownRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section className="py-32 px-6 md:px-16 lg:px-32 text-zinc-900 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: premiumEase }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            OUR TEAM
          </motion.h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: premiumEase }}
            className="group relative h-[60vh] md:h-[70vh] rounded-[2rem] overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
            
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: premiumEase }}
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover origin-center grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase leading-none w-full mb-2 drop-shadow-md">
                {member.name}
              </h3>
              <p className="text-[#D4AF37] font-bold text-sm md:text-sm uppercase tracking-wider max-w-[90%] drop-shadow-md">
                {member.role}
              </p>
              
              <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all duration-300">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  const y = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div 
      ref={containerRef}
      className="mb-32 md:mb-48 relative w-full group cursor-pointer"
    >
      <div className="w-full h-[50vh] md:h-[70vh] lg:h-[85vh] overflow-hidden relative rounded-xl bg-zinc-900">
        <motion.div 
          className="absolute inset-0 z-20 origin-top"
          style={{ backgroundColor: project.overlayColor }}
          initial={{ y: "0%" }}
          animate={isInView ? { y: "-100%" } : { y: "0%" }}
          transition={{ duration: 1.4, ease: premiumEase }}
        />

        <motion.div 
          className="w-full h-[116%] absolute -top-[8%]"
          style={{ y }}
        >
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700 z-10" />
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={isInView ? { scale: 1 } : { scale: 1.2 }}
            transition={{ duration: 1.8, ease: premiumEase }}
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover object-center transition-all duration-700"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 p-6 md:p-10 z-30 pointer-events-none w-full flex justify-between items-end">
        <div>
          <div className="overflow-hidden mb-2">
            <motion.h2 
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1, delay: 0.3, ease: premiumEase }}
              className="text-3xl md:text-5xl lg:text-6xl font-light text-white drop-shadow-lg"
            >
              {project.title} <span className="text-zinc-300 font-extralight mx-2">|</span> {project.subtitle}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p 
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1, delay: 0.4, ease: premiumEase }}
              className="text-zinc-300 text-sm md:text-base tracking-widest uppercase font-medium drop-shadow-md"
            >
              {project.roles}
            </motion.p>
          </div>
        </div>
        
        <motion.div
           initial={{ scale: 0 }}
           animate={isInView ? { scale: 1 } : { scale: 0 }}
           transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }} 
           className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-black pointer-events-auto group-hover:scale-110 transition-transform duration-300 shadow-xl"
        >
           <ArrowRight size={24} strokeWidth={2} />
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="pt-32 overflow-hidden relative z-10 text-white">
      <div className="px-6 md:px-16 lg:px-32 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-24 md:mb-32 relative z-20">
        
        <div className="col-span-1 md:col-span-4 flex flex-col gap-6 items-start">
          <a href="https://burnettsdigitalcreative.com" className="text-2xl hover:text-[#D4AF37] transition-colors">burnettsdigitalcreative.com</a>
          <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-white transition-colors duration-300 mt-2">
            Book a Call
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 md:col-start-7 flex flex-col gap-3 text-sm">
          <h4 className="font-bold tracking-widest uppercase mb-2">Explore</h4>
          {['What We Do', 'Our Work', 'Our Team', 'Contact'].map(link => (
            <a key={link} href="#" className="text-zinc-400 hover:text-white transition-colors">{link}</a>
          ))}
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col gap-3 text-sm">
          <h4 className="font-bold tracking-widest uppercase mb-2">Socials</h4>
          {['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map(link => (
            <a key={link} href="#" className="text-zinc-400 hover:text-white transition-colors">{link}</a>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center text-zinc-900 overflow-hidden translate-y-[28%] pointer-events-none select-none z-10">
        <h1 className="text-[20vw] leading-[0.75] font-black tracking-tighter uppercase whitespace-nowrap">
          BURNETT'S
        </h1>
      </div>
    </footer>
  );
};

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.12 && latest < 0.72) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });

  useEffect(() => {
    if (!isRevealed) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [isRevealed]);

  return (
    <div className="bg-[#D4AF37] min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden relative">
      
      <div className="fixed inset-0 z-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-black font-mono text-sm tracking-[0.3em] font-bold"
        >
          LOADING // 100%
        </motion.div>
      </div>

      <motion.main
        initial={{ y: "100vh", scale: 0.95, borderRadius: "32px", backgroundColor: "#0a0a0a" }}
        animate={{ 
          y: "0vh", 
          scale: 1, 
          borderRadius: "0px",
          backgroundColor: theme === 'light' ? '#f1f0ea' : '#0a0a0a'
        }}
        transition={{ 
          y: { duration: 1.4, ease: premiumEase, delay: 0.3 },
          scale: { duration: 1.4, ease: premiumEase, delay: 0.3 },
          borderRadius: { duration: 1.4, ease: premiumEase, delay: 0.3 },
          backgroundColor: { duration: 0.8, ease: "easeInOut" }
        }}
        onAnimationComplete={() => setIsRevealed(true)}
        className="min-h-screen relative z-10 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.5)] origin-bottom"
      >
        <Navbar />
        <Hero />
        <WhatWeDo />
        <TeamSection />
        
        <section className="px-6 md:px-16 lg:px-32 pt-32 pb-12 z-10 relative">
          <div className="overflow-hidden mb-24 flex items-baseline gap-4">
             <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black">OUR WORK</h2>
             <div className="w-4 h-4 bg-[#D4AF37] rounded-full"></div>
          </div>
          
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>

        <Footer />
      </motion.main>
    </div>
  );
}

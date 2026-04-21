'use client'

import { motion, useInView, AnimatePresence, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { 
  Mail, Phone, MapPin, Award, Code, 
  Database, Cloud, Users, Zap, TrendingUp, 
  BarChart3, Activity, PieChart, GitBranch
} from 'lucide-react'

// Dynamically import D3 components to avoid SSR issues
const SkillRadarChart = dynamic(() => import('@/components/SkillRadarChart'), { 
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-[500px] text-gray-500">Loading Chart...</div>
})
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'), { ssr: false })
const AchievementBubbles = dynamic(() => import('@/components/AchievementBubbles'), { ssr: false })
const TechStackGraph = dynamic(() => import('@/components/TechStackGraph'), { ssr: false })
const CodeActivityGraph = dynamic(() => import('@/components/CodeActivityGraph'), { ssr: false })
const PerformanceMetrics = dynamic(() => import('@/components/PerformanceMetrics'), { ssr: false })

export default function Home() {
  const [activeTab, setActiveTab] = useState('skills')
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fix: Properly typed variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div variants={itemVariants} className="flex-1 text-center md:text-left">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Hafiz Musharraf Ahmed
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-2xl text-gray-600 dark:text-gray-300 mt-4"
              >
                Senior Software Engineer & Technical Lead
              </motion.p>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-500 dark:text-gray-400 mt-2"
              >
                7+ years of experience in .NET Core, Angular, React, and SQL Server
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start"
              >
                <motion.a
                  href="mailto:musharrafgb@gmail.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Mail size={18} /> Email Me
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/musharraf-ahmed-213643159"
                  target="_blank"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  LinkedIn
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                >
                  <Phone size={18} /> +92-332-5874696
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex-1 max-w-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <motion.h3 
                  className="text-xl font-semibold mb-4"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Quick Info
                </motion.h3>
                <div className="space-y-3">
                  <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                    <MapPin className="text-blue-600" size={20} />
                    <span>Karachi, Pakistan</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                    <Award className="text-blue-600" size={20} />
                    <span>7+ Years Experience</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                    <Users className="text-blue-600" size={20} />
                    <span>Led teams of 12+ engineers</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                    <Zap className="text-blue-600" size={20} />
                    <span>70% reduction in production bugs</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Visualization Tabs */}
      <section className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {[
            { id: 'skills', label: 'Skills Radar', icon: BarChart3 },
            { id: 'timeline', label: 'Experience Timeline', icon: Activity },
            { id: 'achievements', label: 'Achievement Bubbles', icon: PieChart },
            { id: 'techstack', label: 'Tech Stack Graph', icon: GitBranch },
            { id: 'activity', label: 'Code Activity', icon: Activity },
            { id: 'performance', label: 'Performance Metrics', icon: TrendingUp }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 min-h-[500px]"
          >
            {activeTab === 'skills' && <SkillRadarChart />}
            {activeTab === 'timeline' && <ExperienceTimeline />}
            {activeTab === 'achievements' && <AchievementBubbles />}
            {activeTab === 'techstack' && <TechStackGraph />}
            {activeTab === 'activity' && <CodeActivityGraph />}
            {activeTab === 'performance' && <PerformanceMetrics />}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Core Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Code className="w-8 h-8" />, title: "Frontend", skills: ["Angular", "React", "Next.js", "Redux", "React Native", "TypeScript", "WebSocket"], color: "from-blue-500 to-cyan-500" },
            { icon: <Database className="w-8 h-8" />, title: "Backend", skills: [".NET Core", "C#", "ASP.NET", "Entity Framework", "Node.js", "GraphQL"], color: "from-green-500 to-emerald-500" },
            { icon: <Database className="w-8 h-8" />, title: "Databases", skills: ["SQL Server", "MongoDB", "EF Core", "Query Optimization"], color: "from-purple-500 to-pink-500" },
            { icon: <Cloud className="w-8 h-8" />, title: "DevOps & Tools", skills: ["Git", "CI/CD", "Microservices", "Web API", "Agile/Scrum", "Unit Testing"], color: "from-orange-500 to-red-500" }
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity blur-xl`} />
              <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full border border-gray-200 dark:border-gray-700">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5, ease: "easeInOut" }}
                  className="text-blue-600 mb-4"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Professional Experience
          </motion.h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              { title: "Senior Software Engineer", company: "EpicMetry (AHOY Group)", period: "May 2024 - Present", achievements: [
                "Built enterprise apps with .NET Core + Angular 18, improving feature delivery speed by 25%",
                "Optimized EF Core queries for SQL Server, cutting response times by 40%",
                "Created reusable UI components with Angular/PrimeNG, reducing dev effort by 20%"
              ]},
              { title: "Senior Software Engineer / Technical Lead", company: "KCompute Pvt. Ltd", period: "June 2018 - May 2024", achievements: [
                "Led a team of 12+ engineers, delivering 10+ enterprise solutions",
                "Mentored junior developers and conducted code reviews, improving team productivity by 35%",
                "Automated unit testing workflows, reducing production bugs by 70%"
              ]}
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="relative bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400">{exp.company}</p>
                    </div>
                    <span className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg text-sm">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: achIndex * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Key Achievements
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { icon: <TrendingUp className="w-6 h-6" />, title: "Angular Migration", description: "Upgraded Angular from v9 to v14, improving performance by 40%", metric: "40%" },
            { icon: <Zap className="w-6 h-6" />, title: "Database Optimization", description: "Reduced DB query times by 30% via EF Core optimization", metric: "30%" },
            { icon: <Code className="w-6 h-6" />, title: "UI Library Development", description: "Improved efficiency by 20% with reusable UI libraries", metric: "20%" },
            { icon: <Users className="w-6 h-6" />, title: "Real-time System", description: "Enhanced user engagement by 50% with WebSocket notifications", metric: "50%" }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="relative bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ rotateY: [0, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, delay: index * 5, ease: "linear" }}
                    className="text-white bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg shadow-lg"
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                      <span className="text-2xl font-bold text-blue-600">{achievement.metric}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Education
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-600">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-semibold">B.S. Computer Science</h3>
              <p className="text-xl text-gray-600 dark:text-gray-300">University of Karachi</p>
              <p className="text-gray-500">2014 - 2018</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
'use client'

import { motion, useInView, AnimatePresence, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { 
  Mail, Phone, MapPin, Award, Code, 
  Database, Cloud, Users, Zap, TrendingUp, 
  BarChart3, Activity, PieChart, GitBranch,
  Briefcase, GraduationCap, Star,
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

  const containerVariants: Variants = {
    hidden: {  },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20},
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section - Clean Light Theme */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="text-center"
          >
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-4 py-2 mb-6 shadow-lg"
            >
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">7+ Years of Excellence</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4"
            >
              Hafiz Musharraf
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Ahmed
              </span>
            </motion.h1>

            {/* Designation */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Briefcase className="w-6 h-6 text-blue-600" />
              <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
                Senior Software Engineer & Technical Lead
              </p>
            </motion.div>

            {/* Experience Badges */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="bg-white rounded-lg px-5 py-2 shadow-md border border-gray-200">
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-blue-600 text-lg">7+</span> Years Experience
                </p>
              </div>
              <div className="bg-white rounded-lg px-5 py-2 shadow-md border border-gray-200">
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-blue-600 text-lg">12+</span> Team Lead
                </p>
              </div>
              <div className="bg-white rounded-lg px-5 py-2 shadow-md border border-gray-200">
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-blue-600 text-lg">10+</span> Enterprise Solutions
                </p>
              </div>
            </motion.div>

            {/* Contact Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a
                href="mailto:musharrafgb@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Mail size={20} /> Email Me
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/musharraf-ahmed-213643159"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                LinkedIn
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold shadow-lg border border-gray-300 hover:shadow-xl transition-all"
              >
                <Phone size={20} /> +92-332-5874696
              </motion.a>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200">
                <MapPin className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-gray-700 text-sm font-medium">Karachi, Pakistan</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200">
                <Award className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-gray-700 text-sm font-medium">Microsoft Certified</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200">
                <GraduationCap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-gray-700 text-sm font-medium">B.S. Computer Science</p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-md border border-gray-200">
                <Code className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <p className="text-gray-700 text-sm font-medium">Full Stack Expert</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Visualization Tabs */}
      <section className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-medium ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
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
            className="bg-white rounded-2xl shadow-xl p-6 min-h-[500px] border border-gray-100"
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
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Core Technical Skills
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Specialized in modern web technologies with 7+ years of hands-on experience
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Code className="w-8 h-8" />, title: "Frontend", skills: ["Angular", "React", "Next.js", "Redux", "React Native", "TypeScript", "WebSocket"], color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50" },
            { icon: <Database className="w-8 h-8" />, title: "Backend", skills: [".NET Core", "C#", "ASP.NET", "Entity Framework", "Node.js", "GraphQL"], color: "from-green-500 to-emerald-500", bgColor: "bg-green-50" },
            { icon: <Database className="w-8 h-8" />, title: "Databases", skills: ["SQL Server", "MongoDB", "EF Core", "Query Optimization"], color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50" },
            { icon: <Cloud className="w-8 h-8" />, title: "DevOps & Tools", skills: ["Git", "CI/CD", "Microservices", "Web API", "Agile/Scrum", "Unit Testing"], color: "from-orange-500 to-red-500", bgColor: "bg-orange-50" }
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className={`${category.bgColor} rounded-xl p-6 h-full border border-gray-100 shadow-sm hover:shadow-xl transition-all`}>
                <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-sm cursor-default shadow-sm"
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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Professional Experience
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              Proven track record of delivering enterprise-grade solutions and leading teams
            </motion.p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { 
                title: "Senior Software Engineer", 
                company: "EpicMetry (AHOY Group)", 
                period: "May 2024 - Present",
                description: "Leading enterprise application development with modern tech stack",
                achievements: [
                  "Built enterprise apps with .NET Core + Angular 18, improving feature delivery speed by 25%",
                  "Optimized EF Core queries for SQL Server, cutting response times by 40%",
                  "Created reusable UI components with Angular/PrimeNG, reducing dev effort by 20%"
                ]
              },
              { 
                title: "Senior Software Engineer / Technical Lead", 
                company: "KCompute Pvt. Ltd", 
                period: "June 2018 - May 2024",
                description: "Led a team of 12+ engineers delivering 10+ enterprise solutions",
                achievements: [
                  "Led a team of 12+ engineers, delivering 10+ enterprise solutions",
                  "Mentored junior developers and conducted code reviews, improving team productivity by 35%",
                  "Automated unit testing workflows, reducing production bugs by 70%"
                ]
              }
            ].map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                      <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                    </div>
                    <span className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">{exp.period}</span>
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
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{achievement}</span>
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
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Key Achievements
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            Quantifiable results that demonstrate my impact on business outcomes
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { icon: <TrendingUp className="w-6 h-6" />, title: "Angular Migration", description: "Upgraded Angular from v9 to v14, improving performance by 40%", metric: "40%", color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50" },
            { icon: <Zap className="w-6 h-6" />, title: "Database Optimization", description: "Reduced DB query times by 30% via EF Core optimization", metric: "30%", color: "from-green-500 to-emerald-500", bgColor: "bg-green-50" },
            { icon: <Code className="w-6 h-6" />, title: "UI Library Development", description: "Improved efficiency by 20% with reusable UI libraries", metric: "20%", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-50" },
            { icon: <Users className="w-6 h-6" />, title: "Real-time System", description: "Enhanced user engagement by 50% with WebSocket notifications", metric: "50%", color: "from-orange-500 to-red-500", bgColor: "bg-orange-50" }
          ].map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -5 }}
            >
              <div className={`${achievement.bgColor} rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${achievement.color} text-white shadow-md`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{achievement.title}</h3>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                        {achievement.metric}
                      </span>
                    </div>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Education
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
            ></motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              Academic background and professional certifications
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-sm hover:shadow-lg transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">Bachelor of Science in Computer Science</h3>
              <p className="text-xl text-blue-600 font-medium mb-2">University of Karachi</p>
              <p className="text-gray-500">2014 - 2018</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Specialized in Software Engineering, Data Structures, and Web Development
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
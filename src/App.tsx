import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  Code, 
  Database, 
  Globe, 
  Github, 
  Linkedin,
  Download,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  ArrowUp
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Trigger loading animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const skills = [
    { name: 'HTML5', level: 90, icon: <Globe className="w-6 h-6" />, color: 'from-orange-400 to-red-500' },
    { name: 'CSS3', level: 85, icon: <Code className="w-6 h-6" />, color: 'from-blue-400 to-blue-600' },
    { name: 'JavaScript', level: 80, icon: <Code className="w-6 h-6" />, color: 'from-yellow-400 to-orange-500' },
    { name: 'React', level: 75, icon: <Code className="w-6 h-6" />, color: 'from-cyan-400 to-blue-500' },
    { name: 'Node.js', level: 70, icon: <Database className="w-6 h-6" />, color: 'from-green-400 to-green-600' },
    { name: 'MongoDB', level: 65, icon: <Database className="w-6 h-6" />, color: 'from-green-500 to-emerald-600' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg z-50 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className={`text-2xl font-bold text-gray-800 dark:text-white transition-all duration-500 ${isLoaded ? 'animate-fade-in-left' : 'opacity-0'}`}>
                Deepak Bhankhor
              </div>
              
              {/* Desktop Navigation */}
              <div className={`hidden md:flex space-x-8 items-center ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`}>
                {['home', 'about', 'skills', 'experience', 'contact'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-all duration-300 hover:scale-105 ${
                      activeSection === item 
                        ? 'text-blue-600 font-semibold transform scale-105' 
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </button>
                ))}
                
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex items-center gap-4 md:hidden">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800 dark:text-gray-200 transition-transform duration-300 hover:scale-110"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="py-4 border-t dark:border-gray-700">
                {['home', 'about', 'skills', 'experience', 'contact'].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left py-2 capitalize text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:translate-x-2 ${
                      isMenuOpen ? 'animate-slide-in-left' : ''
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-20 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`text-center lg:text-left ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
                <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <span className="text-lg text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                    👋 Hello there!
                  </span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-6">
                  <span className="inline-block animate-text-shimmer">Hi, I'm</span>{' '}
                  <span className="text-blue-600 dark:text-blue-400 animate-pulse">Deepak</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  Full Stack Developer passionate about creating beautiful, functional web applications
                  with modern technologies and clean code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg transform"
                  >
                    Get In Touch
                  </button>
                  <button className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg transform">
                    <Download className="w-5 h-5" />
                    Download CV
                  </button>
                </div>
              </div>
              <div className={`flex justify-center lg:justify-end ${isLoaded ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
                <div className="relative group">
                  <div className="w-96 h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden shadow-2xl border-8 border-white dark:border-gray-700 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl">
                    <img
                      src="/IMG_0536.jpg"
                      alt="Deepak Bhankhor"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 bg-blue-600 dark:bg-blue-500 text-white p-6 rounded-full shadow-lg animate-bounce-slow">
                    <Code className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg animate-pulse">
                    <Globe className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About Me</h2>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto animate-expand"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                  Passionate Full Stack Developer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  I'm a dedicated full stack developer with 1 year of experience in creating 
                  dynamic web applications. I specialize in modern JavaScript frameworks and 
                  have a strong foundation in both frontend and backend technologies.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Based in Hisar, Haryana, I'm always eager to learn new technologies and 
                  take on challenging projects that push the boundaries of what's possible 
                  on the web.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: MapPin, text: "Hisar, Haryana" },
                    { icon: Briefcase, text: "1 Year Experience" },
                    { icon: Phone, text: "+91 7988059891" },
                    { icon: Mail, text: "deepakbhakhor758@gmail.com" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 animate-fade-in-up hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl animate-fade-in-right transition-colors duration-500">
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">What I Do</h4>
                <div className="space-y-4">
                  {[
                    { icon: Globe, title: "Frontend Development", desc: "Creating responsive and interactive user interfaces" },
                    { icon: Database, title: "Backend Development", desc: "Building robust server-side applications and APIs" },
                    { icon: Code, title: "Full Stack Solutions", desc: "End-to-end web application development" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 animate-slide-in-right hover:scale-105 transition-transform duration-300" style={{ animationDelay: `${index * 150}ms` }}>
                      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                        <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 dark:text-white">{item.title}</h5>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Skills & Technologies</h2>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto animate-expand"></div>
              <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
                Here are the technologies I work with to bring ideas to life
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in-up hover:scale-105 transform border border-gray-100 dark:border-gray-700" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="text-blue-600 dark:text-blue-400 animate-pulse group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                      <div className="absolute -inset-2 bg-blue-100 dark:bg-blue-900 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${skill.color} h-4 rounded-full transition-all duration-1000 ease-out animate-skill-bar relative overflow-hidden`}
                        style={{ width: `${skill.level}%`, animationDelay: `${index * 200}ms` }}
                      >
                        <div className="absolute inset-0 bg-white opacity-20 animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Proficiency</span>
                      <span className="text-lg font-bold text-gray-800 dark:text-white">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Floating Animation Elements */}
            <div className="relative mt-16">
              <div className="absolute top-0 left-1/4 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-float"></div>
              <div className="absolute top-10 right-1/4 w-16 h-16 bg-purple-500 rounded-full opacity-10 animate-float-delayed"></div>
              <div className="absolute bottom-0 left-1/3 w-12 h-12 bg-pink-500 rounded-full opacity-10 animate-float-slow"></div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Experience</h2>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto animate-expand"></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800 animate-draw-line"></div>
                
                <div className="relative flex items-start gap-8 pb-12 animate-fade-in-left">
                  <div className="bg-blue-600 dark:bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-700 p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Full Stack Developer</h3>
                      <span className="text-blue-600 dark:text-blue-400 font-medium animate-pulse">1 Year Experience</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Developing and maintaining web applications using modern technologies. 
                      Working with HTML, CSS, JavaScript, and various frameworks to create 
                      responsive and user-friendly interfaces.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['HTML/CSS', 'JavaScript', 'React', 'Node.js'].map((tech, index) => (
                        <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm animate-fade-in-up hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Get In Touch</h2>
              <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6 animate-expand"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                I'm always open to discussing new opportunities and interesting projects. 
                Let's connect and create something amazing together!
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="animate-fade-in-left">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-8">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: "Phone", info: "+91 7988059891" },
                    { icon: Mail, title: "Email", info: "deepakbhakhor758@gmail.com" },
                    { icon: MapPin, title: "Location", info: "Hisar, Haryana, India" }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:scale-105 transform" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                        <contact.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">{contact.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{contact.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    <a href="#" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 transform">
                      <Github className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
                    </a>
                    <a href="#" className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 transform">
                      <Linkedin className="w-6 h-6 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg animate-fade-in-right transition-colors duration-500">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Send Message</h3>
                <form className="space-y-6">
                  <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 font-semibold hover:scale-105 transform animate-fade-in-up"
                    style={{ animationDelay: '400ms' }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in-up">
              <p className="text-gray-400 dark:text-gray-500">
                © 2024 Deepak Bhankhor. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 transform z-50 ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
          }`}
        >
          <ArrowUp className="w-6 h-6 animate-bounce-slow" />
        </button>
      </div>
    </div>
  );
}

export default App;
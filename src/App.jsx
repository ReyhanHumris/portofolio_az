import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  BarChart3, 
  Database, 
  FolderGit2, 
  BriefcaseBusiness, 
  Mail, 
  MapPin, 
  GraduationCap, 
  TrendingUp, 
  Code, 
  Download, 
  ExternalLink, 
  X, 
  Cpu, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  Trash2
} from 'lucide-react';

// Elegant Interactive Bento Card with Framer Motion Tilt Effect
const BentoCard = ({ children, className = '', delay = 0 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(56, 189, 248, 0.15)",
        borderColor: "rgba(56, 189, 248, 0.3)"
      }}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition-colors ${className}`}
    >
      {/* Dynamic Shine Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/0 via-sky-500/5 to-sky-500/0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Reusable animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  
  // Projects State
  const [projectFilter, setProjectFilter] = useState('semua');
  const [selectedDashboardModal, setSelectedDashboardModal] = useState(false);
  const [selectedMLModal, setSelectedMLModal] = useState(false);
  const [selectedInventoryModal, setSelectedInventoryModal] = useState(false);

  // CV Download simulation state
  const [cvStatus, setCvStatus] = useState('idle');

  // Contact Form state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  // Interactive Sandbox States
  const [dbRegion, setDbRegion] = useState('semua');
  const dbData = {
    semua: { revenue: 'Rp 148.920.000', orders: '3.240', avgVal: 'Rp 45.960', product: 'Mouse Nirkabel (820 unit)' },
    ntt: { revenue: 'Rp 28.450.000', orders: '640', avgVal: 'Rp 44.450', product: 'Keyboard Mekanik (150 unit)' },
    jabar: { revenue: 'Rp 54.320.000', orders: '1.120', avgVal: 'Rp 48.500', product: 'USB-C Hub (320 unit)' },
    jakarta: { revenue: 'Rp 66.150.000', orders: '1.480', avgVal: 'Rp 44.690', product: 'Mouse Nirkabel (440 unit)' }
  };

  const [mlContract, setMlContract] = useState(12);
  const [mlCharges, setMlCharges] = useState(70);
  const [mlSupportCalls, setMlSupportCalls] = useState(2);
  const [churnProb, setChurnProb] = useState(24);

  useEffect(() => {
    let base = 20;
    if (mlContract < 6) base += 25;
    else if (mlContract >= 12) base -= 15;
    if (mlCharges > 100) base += 20;
    else if (mlCharges < 40) base -= 10;
    base += mlSupportCalls * 12;
    setChurnProb(Math.min(Math.max(base, 5), 98));
  }, [mlContract, mlCharges, mlSupportCalls]);

  const [inventoryList, setInventoryList] = useState([
    { id: 1, name: 'Laptop Gaming Asus TUF', category: 'Komputer', quantity: 8, status: 'Digunakan' },
    { id: 2, name: 'Printer Epson L3210', category: 'Periferal', quantity: 2, status: 'Tersedia' },
    { id: 3, name: 'Arduino Uno Starter Kit', category: 'Elektronik', quantity: 15, status: 'Tersedia' },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCat, setNewItemCat] = useState('Komputer');

  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const item = {
      id: Date.now(),
      name: newItemName,
      category: newItemCat,
      quantity: 1,
      status: 'Tersedia'
    };
    setInventoryList([...inventoryList, item]);
    setNewItemName('');
  };

  const handleDeleteInventory = (id) => {
    setInventoryList(inventoryList.filter(item => item.id !== id));
  };

  const handleDownloadCV = (e) => {
    e.preventDefault();
    setCvStatus('loading');
    setTimeout(() => {
      setCvStatus('success');
      setTimeout(() => setCvStatus('idle'), 3000);
    }, 1200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert('Harap isi semua kolom yang wajib diisi.');
      return;
    }
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1000);
  };

  const projects = [
    {
      id: 1,
      title: "Dasbor Penjualan E-Commerce",
      category: "analitik",
      description: "Dasbor interaktif untuk memvisualisasikan data transaksi guna mengidentifikasi tren penjualan, distribusi geografis, dan peluang pertumbuhan.",
      tags: ["Power BI", "SQL", "Pemodelan Data"],
      openModal: () => setSelectedDashboardModal(true)
    },
    {
      id: 2,
      title: "Prediksi Churn Pelanggan",
      category: "analitik",
      description: "Pipeline machine learning yang membersihkan kumpulan data mentah dan melatih model untuk memprediksi kemungkinan pelanggan membatalkan langganan mereka.",
      tags: ["Python", "Scikit-Learn", "Pandas"],
      openModal: () => setSelectedMLModal(true)
    },
    {
      id: 3,
      title: "Sistem Inventaris Laboratorium",
      category: "web",
      description: "Aplikasi CRUD fungsional untuk mengelola peralatan lab sekolah. Menunjukkan normalisasi database dan arsitektur web yang praktis.",
      tags: ["PHP", "MySQL", "Tailwind CSS"],
      openModal: () => setSelectedInventoryModal(true)
    }
  ];

  const filteredProjects = projectFilter === 'semua' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900 overflow-x-hidden relative">
      
      {/* Background Animated Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, 60, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl"
        />
      </div>

      {/* 1. FLOATING NAVBAR */}
      <motion.nav 
        initial={{ y: 80, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.3 }}
        className="fixed bottom-6 left-1/2 z-50"
      >
        <div className="flex items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.25)]">
          {['Beranda', 'Tentang Saya', 'Keahlian', 'Project', 'Kontak'].map((item, idx) => {
            const targets = ['#home', '#about', '#skills', '#projects', '#contact'];
            return (
              <motion.a 
                key={item}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={targets[idx]} 
                className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-colors whitespace-nowrap"
              >
                {item}
              </motion.a>
            )
          })}
        </div>
      </motion.nav>

      {/* TOP BAR / HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full z-40 border-b border-slate-100 bg-[#fafafa]/80 backdrop-blur-sm sticky top-0"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="font-semibold text-slate-800 text-base md:text-lg tracking-tight">
              Aziza Ony Badu
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-[9px] md:text-xs font-semibold uppercase tracking-wider text-slate-400">
              Data Analyst & Web Developer
            </span>
          </div>
        </div>
      </motion.div>
      {/* Floating Toasts */}
      <AnimatePresence>
        {cvStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-green-200 px-5 py-4 rounded-xl shadow-xl"
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 0.5 }}
              className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-500"
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-sm text-slate-800">CV Diunduh</h4>
              <p className="text-xs text-slate-500 mt-0.5">Aziza_Resume.pdf sudah siap.</p>
            </div>
          </motion.div>
        )}

        {formStatus === 'success' && (
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-sky-200 px-5 py-4 rounded-xl shadow-xl"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500"
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-sm text-slate-800">Pesan Terkirim!</h4>
              <p className="text-xs text-slate-500 mt-0.5">Terima kasih! Saya akan segera membalasnya.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 md:pt-16 pb-24 md:pb-32 space-y-32 md:space-y-40 relative z-10">
        
        {/* 2. HERO SECTION */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[70vh]">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-8"
          >
            <motion.div 
              variants={fadeUpVariant} 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold tracking-wide font-sans cursor-default"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              >
                <Sparkles className="h-3.5 w-3.5" />
              </motion.div>
              Analis Data & Web Developer
            </motion.div>

            <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium font-display leading-[1.15] text-slate-900 tracking-tight">
              Menghubungkan <span className="text-sky-500 font-semibold">data</span> dengan <span className="text-blue-500 italic font-display">desain.</span>
            </motion.h1>

            <motion.p variants={fadeUpVariant} className="text-slate-600 text-base md:text-lg max-w-lg leading-relaxed font-light">
              Halo, saya <strong>Aziza Ony Badu</strong>. Lulusan MAKN Ende, menggabungkan pemikiran analitis dengan rekayasa perangkat lunak yang bersih untuk menciptakan solusi yang intuitif dan berbasis data.
            </motion.p>

            <motion.div variants={fadeUpVariant} className="flex flex-wrap items-center gap-4">
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(14, 165, 233, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-sky-500 text-white shadow-md shadow-sky-500/20 transition-all"
              >
                Lihat Karya Saya
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </motion.a>
              
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all"
              >
                Mari Berdiskusi
              </motion.a>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadCV}
                disabled={cvStatus === 'loading'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-all"
              >
                {cvStatus === 'loading' ? (
                  <><RefreshCw className="h-4 w-4 animate-spin text-sky-500" /> Menyiapkan...</>
                ) : cvStatus === 'success' ? (
                  <><CheckCircle2 className="h-4 w-4 text-green-500" /> Selesai</>
                ) : (
                  <><Download className="h-4 w-4 text-sky-500 animate-bounce" /> Unduh CV</>
                )}
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end mt-10 lg:mt-0"
          >
            <div className="absolute inset-0 bg-sky-100 rounded-full blur-3xl opacity-60 -z-10 w-3/4 mx-auto" />
            <div className="relative group">
              
              {/* Photo Frame with Interactive Scale */}
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl relative z-10 bg-sky-50 cursor-pointer"
              >
                <img 
                  src="https://ui-avatars.com/api/?name=Aziza+Badu&size=512&background=e0f2fe&color=0284c7&font-size=0.33" 
                  alt="Aziza Ony Badu" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              
              {/* Floating Badge 1 (Analitik) */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="absolute -bottom-4 -left-4 md:-left-8 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20 cursor-pointer"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0"
                >
                  <TrendingUp className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Analitik</h3>
                  <p className="text-[10px] text-slate-500">Berbasis Data</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 (Developer) */}
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="absolute top-4 -right-4 md:top-8 md:-right-8 bg-white p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20 cursor-pointer"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: -15 }}
                  className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 shrink-0"
                >
                  <Code className="h-5 w-5" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Developer</h3>
                  <p className="text-[10px] text-slate-500">Kode Bersih</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 3. ABOUT ME */}
        <section id="about" className="space-y-10 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto space-y-4"
          >
            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Tentang Saya</h2>
            <h3 className="text-3xl md:text-4xl font-medium font-display italic text-slate-900">Latar Belakang Saya</h3>
            <p className="text-slate-500 font-light">Perpaduan antara pemrograman terstruktur dan rasa ingin tahu analitis.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard className="md:col-span-2" delay={0.1}>
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0"
                >
                  <MapPin className="h-6 w-6" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Dari Alor ke Dunia Tech</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Berasal dari Alor, Nusa Tenggara Timur. Tumbuh di lingkungan kepulauan yang indah mengajarkan saya untuk menghargai sistem yang saling terhubung. Perspektif ini terbawa dalam cara saya mendekati kumpulan data yang kompleks dan arsitektur perangkat lunak saat ini.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.2}>
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"
                >
                  <GraduationCap className="h-6 w-6" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Pendidikan</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Lulusan MAKN Ende, jurusan Pengembangan Perangkat Lunak dan Gim (PPLG). Membangun fondasi yang kuat dalam logika pemrograman dan basis data.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard delay={0.3}>
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0"
                >
                  <BarChart3 className="h-6 w-6" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Fokus Karir</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Beralih ke Analisis Data. Saya senang mengubah data mentah dan spreadsheet menjadi cerita visual yang jelas untuk membantu pengambilan keputusan yang nyata.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="md:col-span-2" delay={0.4}>
              <div className="flex items-start gap-4">
                <motion.div 
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.6 }}
                  className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0"
                >
                  <Cpu className="h-6 w-6" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Kelebihan Saya</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Berbeda dengan analis biasa, latar belakang rekayasa perangkat lunak (PPLG) memungkinkan saya untuk mengatur relasi basis data yang tepat, menerapkan skrip pelacakan, dan membangun dasbor web kustom dari awal saat alat siap pakai tidak lagi cukup.
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* 4. SKILLS */}
        <section id="skills" className="space-y-10 scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl space-y-4"
          >
            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Keahlian</h2>
            <h3 className="text-3xl font-medium font-display italic text-slate-900">Alat & Teknologi</h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-3"
            >
              {[
                { id: 'analytics', label: 'Analisis Data', icon: Database },
                { id: 'viz', label: 'Visualisasi Data', icon: BarChart3 },
                { id: 'engineering', label: 'Rekayasa Web', icon: Code }
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 6, backgroundColor: "rgba(241, 245, 249, 0.7)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors duration-300 ${activeTab === tab.id ? 'bg-white shadow-md border border-slate-200 text-slate-800' : 'bg-transparent border border-transparent text-slate-500'}`}
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-sky-500' : 'text-slate-400'}`} />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm min-h-[320px]"
            >
              <AnimatePresence mode="wait">
                {activeTab === 'analytics' && (
                  <motion.div 
                    key="analytics"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-800">Analisis Data</h3>
                      <p className="text-sm text-slate-400">Menemukan wawasan berharga dari kumpulan data.</p>
                    </div>
                    <div className="space-y-5">
                      {[
                        { name: 'Python (Pandas, NumPy)', w: '85%' },
                        { name: 'SQL (PostgreSQL, MySQL)', w: '90%' },
                        { name: 'Excel Tingkat Lanjut', w: '80%' }
                      ].map(s => (
                        <div key={s.name}>
                          <div className="flex justify-between text-sm mb-1.5"><span className="font-medium text-slate-700">{s.name}</span></div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: s.w }} 
                              transition={{ duration: 1.2, ease: "easeOut" }} 
                              className="h-full bg-sky-400 rounded-full" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'viz' && (
                  <motion.div 
                    key="viz"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-800">Visualisasi Data</h3>
                      <p className="text-sm text-slate-400">Membuat dasbor yang jelas dan mudah dipahami.</p>
                    </div>
                    <div className="space-y-5">
                      {[
                        { name: 'Power BI', w: '90%' },
                        { name: 'Tableau', w: '75%' }
                      ].map(s => (
                        <div key={s.name}>
                          <div className="flex justify-between text-sm mb-1.5"><span className="font-medium text-slate-700">{s.name}</span></div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: s.w }} 
                              transition={{ duration: 1.2, ease: "easeOut" }} 
                              className="h-full bg-sky-400 rounded-full" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'engineering' && (
                  <motion.div 
                    key="engineering"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-800">Rekayasa Web</h3>
                      <p className="text-sm text-slate-400">Membangun struktur dan antarmuka web interaktif.</p>
                    </div>
                    <div className="space-y-5">
                      {[
                        { name: 'Desain Database & Skema', w: '85%' },
                        { name: 'JavaScript, PHP, HTML/CSS', w: '80%' },
                        { name: 'Git & Version Control', w: '85%' }
                      ].map(s => (
                        <div key={s.name}>
                          <div className="flex justify-between text-sm mb-1.5"><span className="font-medium text-slate-700">{s.name}</span></div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: s.w }} 
                              transition={{ duration: 1.2, ease: "easeOut" }} 
                              className="h-full bg-sky-400 rounded-full" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* 5. PROJECTS */}
        <section id="projects" className="space-y-10 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl space-y-4"
            >
              <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Portofolio</h2>
              <h3 className="text-3xl font-medium font-display italic text-slate-900">Proyek Unggulan</h3>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              {['semua', 'analitik', 'web'].map(filter => (
                <motion.button 
                  key={filter}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setProjectFilter(filter)} 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${projectFilter === filter ? 'bg-sky-50 text-sky-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {filter}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                variants={fadeUpVariant}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 25px 45px -15px rgba(56,189,248,0.18)", 
                  borderColor: "rgba(56,189,248,0.3)" 
                }}
                key={project.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-sky-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col h-full">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    className="h-10 w-10 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center mb-5 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300"
                  >
                    {project.category === 'analitik' ? <TrendingUp className="h-5 w-5" /> : <Code className="h-5 w-5" />}
                  </motion.div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow font-light">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <motion.button 
                      whileHover={{ scale: 1.05, x: 3 }}
                      onClick={project.openModal}
                      className="text-sm font-medium text-sky-500 hover:text-sky-600 flex items-center gap-1.5 transition-all"
                    >
                      Lihat Detail
                      <ExternalLink className="h-4 w-4 animate-pulse" />
                    </motion.button>
                    <motion.a 
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      href="#" 
                      className="text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      <FolderGit2 className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start scroll-mt-24 pb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Kontak</h2>
              <h3 className="text-3xl font-medium font-display italic text-slate-900">Mari terhubung.</h3>
              <p className="text-slate-600 text-base leading-relaxed max-w-md font-light">
                Saya saat ini terbuka untuk peluang kerja sebagai analis data dan web developer. Jika Anda memiliki pertanyaan atau sekadar ingin menyapa, saya akan berusaha merespon secepat mungkin!
              </p>
            </div>

            <div className="space-y-5">
              {[
                { label: 'Email', value: 'hello@aziza.dev', href: 'mailto:hello@aziza.dev', icon: Mail },
                { label: 'LinkedIn', value: 'linkedin.com/in/aziza', href: '#', icon: BriefcaseBusiness }
              ].map(c => (
                <motion.a 
                  key={c.label}
                  whileHover={{ x: 8 }}
                  href={c.href} 
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 group-hover:text-sky-500 transition-colors"
                  >
                    <c.icon className="h-5 w-5" />
                  </motion.div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">{c.label}</p>
                    <p className="text-slate-800 font-medium group-hover:text-sky-500 transition-colors text-sm">{c.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama</label>
                  <input id="name" type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                  <input id="email" type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Pesan</label>
                <textarea id="message" required rows="4" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-none" />
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(14, 165, 233, 0.15)" }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={formStatus === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-sky-500 text-white shadow-md shadow-sky-500/20 disabled:opacity-50 transition-all cursor-pointer"
              >
                {formStatus === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
              </motion.button>
            </form>
          </motion.div>
        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white py-10 mt-12 text-center mb-16 md:mb-0 relative z-10">
        <p className="text-sm text-slate-500">&copy; 2026 Aziza Ony Badu. Dibuat di Alor, Indonesia.</p>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {selectedDashboardModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800">Ringkasan Dasbor Penjualan</h3>
                <motion.button 
                  whileHover={{ rotate: 90, backgroundColor: "#f1f5f9" }}
                  onClick={() => setSelectedDashboardModal(false)} 
                  className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="p-6 bg-slate-50/50">
                <div className="mb-6 flex flex-wrap gap-2">
                  {['semua', 'ntt', 'jabar', 'jakarta'].map(region => (
                    <motion.button 
                      key={region} 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setDbRegion(region)} 
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${dbRegion === region ? 'bg-sky-100 text-sky-700' : 'bg-white border border-slate-200 text-slate-600'}`}
                    >
                      {region === 'semua' ? 'Semua Wilayah' : region}
                    </motion.button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {['Pendapatan', 'Pesanan', 'Rata-Rata Nilai'].map((title, i) => {
                    const vals = [dbData[dbRegion].revenue, dbData[dbRegion].orders, dbData[dbRegion].avgVal];
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={title} 
                        className="bg-white p-4 rounded-xl border border-slate-200"
                      >
                        <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">{title}</p>
                        <p className="text-xl font-bold text-slate-800 mt-1">{vals[i]}</p>
                      </motion.div>
                    )
                  })}
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white p-5 rounded-xl border border-slate-200"
                >
                  <p className="text-sm font-semibold text-slate-700 mb-2">Produk Terlaris</p>
                  <p className="text-sky-600 font-medium">{dbData[dbRegion].product}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedMLModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800">Demo Prediksi Churn</h3>
                <motion.button 
                  whileHover={{ rotate: 90, backgroundColor: "#f1f5f9" }}
                  onClick={() => setSelectedMLModal(false)} 
                  className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="p-6 bg-slate-50/50 flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">Durasi Kontrak (Bulan)</span><span className="font-semibold text-sky-600">{mlContract}</span></div>
                    <input type="range" min="1" max="24" value={mlContract} onChange={(e) => setMlContract(parseInt(e.target.value))} className="w-full accent-sky-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">Tagihan Bulanan</span><span className="font-semibold text-sky-600">${mlCharges}</span></div>
                    <input type="range" min="10" max="150" value={mlCharges} onChange={(e) => setMlCharges(parseInt(e.target.value))} className="w-full accent-sky-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2"><span className="text-slate-600">Panggilan Dukungan</span><span className="font-semibold text-sky-600">{mlSupportCalls}</span></div>
                    <input type="range" min="0" max="10" value={mlSupportCalls} onChange={(e) => setMlSupportCalls(parseInt(e.target.value))} className="w-full accent-sky-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-w-[200px] shadow-sm">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Risiko Churn</p>
                  <motion.div 
                    key={churnProb}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold text-slate-800 mb-2"
                  >
                    {churnProb}%
                  </motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${churnProb > 60 ? 'bg-red-50 text-red-600' : churnProb > 30 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}
                  >
                    {churnProb > 60 ? 'Risiko Tinggi' : churnProb > 30 ? 'Risiko Sedang' : 'Risiko Rendah'}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedInventoryModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-800">Sistem Inventaris CRUD</h3>
                <motion.button 
                  whileHover={{ rotate: 90, backgroundColor: "#f1f5f9" }}
                  onClick={() => setSelectedInventoryModal(false)} 
                  className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="p-6 bg-slate-50/50 space-y-6">
                <form onSubmit={handleAddInventory} className="flex gap-3">
                  <input type="text" placeholder="Nama barang" value={newItemName} onChange={e => setNewItemName(e.target.value)} required className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-500 bg-white" />
                  <select value={newItemCat} onChange={e => setNewItemCat(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-500 bg-white"><option>Komputer</option><option>Periferal</option><option>Elektronik</option></select>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors"
                  >
                    Tambah
                  </motion.button>
                </form>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600"><tr><th className="p-3">Nama</th><th className="p-3">Kategori</th><th className="p-3 text-center">Jml</th><th className="p-3 text-center">Aksi</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      <AnimatePresence initial={false}>
                        {inventoryList.map(item => (
                          <motion.tr 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            key={item.id}
                          >
                            <td className="p-3 font-medium text-slate-800">{item.name}</td>
                            <td className="p-3 text-slate-500">{item.category}</td>
                            <td className="p-3 text-center text-slate-500">{item.quantity}</td>
                            <td className="p-3 text-center">
                              <motion.button 
                                whileHover={{ scale: 1.1, color: "#ef4444" }}
                                onClick={() => handleDeleteInventory(item.id)} 
                                className="text-red-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

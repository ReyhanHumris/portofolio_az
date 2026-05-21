import React, { useState, useEffect } from 'react';
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
  Menu, 
  X, 
  Cpu, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  Sliders,
  AlertCircle
} from 'lucide-react';

const BentoCard = ({ children, className = '' }) => {
  return (
    <div
      className={`soft-card relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 md:p-8 transition-all ${className}`}
    >
      {children}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('analytics');
  
  // Projects State
  const [projectFilter, setProjectFilter] = useState('semua');
  const [selectedDashboardModal, setSelectedDashboardModal] = useState(false);
  const [selectedMLModal, setSelectedMLModal] = useState(false);
  const [selectedInventoryModal, setSelectedInventoryModal] = useState(false);

  // CV Download simulation state
  const [cvStatus, setCvStatus] = useState('idle'); // idle, loading, success

  // Contact Form state
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success

  // ----------------------------------------------------
  // Interactive Sandbox States
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // Global Handlers
  // ----------------------------------------------------
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      
      {/* 1. FLOATING NAVBAR */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideIn">
        <div className="flex items-center gap-1 md:gap-2 px-2 py-2 md:px-4 md:py-3 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-[0_10px_40px_-10px_rgba(56,189,248,0.3)]">
          <a href="#home" className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all">Beranda</a>
          <a href="#about" className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all whitespace-nowrap">Tentang Saya</a>
          <a href="#skills" className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all">Keahlian</a>
          <a href="#projects" className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all">Project</a>
          <a href="#contact" className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] sm:text-xs md:text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all">Kontak</a>
        </div>
      </nav>

      {/* TOP BAR FOR LOGO */}
      <div className="absolute top-0 w-full z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold font-display transition-colors">
              ab
            </div>
            <span className="font-display font-semibold text-xl tracking-tight text-slate-800">
              aziza<span className="text-sky-500">badu</span>
            </span>
          </a>
        </div>
      </div>

      {/* Floating Toasts */}
      {cvStatus === 'success' && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-green-200 px-5 py-4 rounded-xl shadow-lg animate-slideIn">
          <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-800">CV Diunduh</h4>
            <p className="text-xs text-slate-500 mt-0.5">Aziza_Resume.pdf sudah siap.</p>
          </div>
        </div>
      )}

      {formStatus === 'success' && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-sky-200 px-5 py-4 rounded-xl shadow-lg animate-slideIn">
          <div className="h-8 w-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-800">Pesan Terkirim!</h4>
            <p className="text-xs text-slate-500 mt-0.5">Terima kasih! Saya akan segera membalasnya.</p>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 md:py-32 space-y-28 md:space-y-40">
        
        {/* 2. HERO SECTION */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold tracking-wide font-display">
              <Sparkles className="h-3.5 w-3.5" />
              Analis Data & Web Developer
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.15] text-slate-900 tracking-tight">
              Menghubungkan <span className="text-sky-500">data</span> dengan <span className="text-blue-500">desain.</span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg max-w-lg leading-relaxed">
              Halo, saya <strong>Aziza Ony Badu</strong>. Lulusan MAKN Ende, menggabungkan pemikiran analitis dengan rekayasa perangkat lunak yang bersih untuk menciptakan solusi yang intuitif dan berbasis data.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-sm active:scale-95"
              >
                Lihat Karya Saya
                <ChevronRight className="h-4 w-4" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-colors active:scale-95"
              >
                Mari Berdiskusi
              </a>
              <button 
                onClick={handleDownloadCV}
                disabled={cvStatus === 'loading'}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-colors active:scale-95 disabled:opacity-50"
              >
                {cvStatus === 'loading' ? (
                  <><RefreshCw className="h-4 w-4 animate-spin text-sky-500" /> Menyiapkan...</>
                ) : cvStatus === 'success' ? (
                  <><CheckCircle2 className="h-4 w-4 text-green-500" /> Selesai</>
                ) : (
                  <><Download className="h-4 w-4 text-sky-500" /> Unduh CV</>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-10 lg:mt-0">
            <div className="absolute inset-0 bg-sky-100 rounded-full blur-3xl opacity-60 -z-10 w-3/4 mx-auto" />
            <div className="relative">
              {/* Photo container */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10 bg-sky-50">
                {/* Fallback image if no actual photo is provided */}
                <img 
                  src="https://ui-avatars.com/api/?name=Aziza+Badu&size=512&background=e0f2fe&color=0284c7&font-size=0.33" 
                  alt="Aziza Ony Badu" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Small floating badge 1 */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white p-3 md:p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 z-20 animate-slideIn" style={{animationDelay: '0.2s'}}>
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Analitik</h3>
                  <p className="text-[10px] text-slate-500">Berbasis Data</p>
                </div>
              </div>

              {/* Small floating badge 2 */}
              <div className="absolute top-4 -right-4 md:top-8 md:-right-8 bg-white p-3 md:p-4 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3 z-20 animate-slideIn" style={{animationDelay: '0.4s'}}>
                <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 shrink-0">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Developer</h3>
                  <p className="text-[10px] text-slate-500">Kode Bersih</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. ABOUT ME */}
        <section id="about" className="space-y-10 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-sky-500 uppercase">Tentang Saya</h2>
            <h3 className="text-3xl font-bold font-display text-slate-900">Latar Belakang Saya</h3>
            <p className="text-slate-600">Perpaduan antara pemrograman terstruktur dan rasa ingin tahu analitis.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BentoCard className="md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Dari Alor ke Dunia Tech</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Berasal dari Alor, Nusa Tenggara Timur. Tumbuh di lingkungan kepulauan yang indah mengajarkan saya untuk menghargai sistem yang saling terhubung. Perspektif ini terbawa dalam cara saya mendekati kumpulan data yang kompleks dan arsitektur perangkat lunak saat ini.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Pendidikan</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Lulusan MAKN Ende, jurusan Pengembangan Perangkat Lunak dan Gim (PPLG). Membangun fondasi yang kuat dalam logika pemrograman dan basis data.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Fokus Karir</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Beralih ke Analisis Data. Saya senang mengubah data mentah dan spreadsheet menjadi cerita visual yang jelas untuk membantu pengambilan keputusan yang nyata.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                  <Cpu className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-800">Kelebihan Saya</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Berbeda dengan analis biasa, latar belakang rekayasa perangkat lunak (PPLG) memungkinkan saya untuk mengatur relasi basis data yang tepat, menerapkan skrip pelacakan, dan membangun dasbor web kustom dari awal saat *tools* siap pakai tidak lagi cukup.
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>
        </section>

        {/* 4. SKILLS */}
        <section id="skills" className="space-y-10 scroll-mt-24">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-sky-500 uppercase">Keahlian</h2>
            <h3 className="text-3xl font-bold font-display text-slate-900">Alat & Teknologi</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-3">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-300 ${activeTab === 'analytics' ? 'bg-white shadow-sm border border-slate-200 text-slate-800' : 'bg-transparent border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                <div className="flex items-center gap-3">
                  <Database className={`h-5 w-5 ${activeTab === 'analytics' ? 'text-sky-500' : 'text-slate-400'}`} />
                  <span className="font-medium">Analisis Data</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('viz')}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-300 ${activeTab === 'viz' ? 'bg-white shadow-sm border border-slate-200 text-slate-800' : 'bg-transparent border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className={`h-5 w-5 ${activeTab === 'viz' ? 'text-sky-500' : 'text-slate-400'}`} />
                  <span className="font-medium">Visualisasi Data</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>

              <button
                onClick={() => setActiveTab('engineering')}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-all duration-300 ${activeTab === 'engineering' ? 'bg-white shadow-sm border border-slate-200 text-slate-800' : 'bg-transparent border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
              >
                <div className="flex items-center gap-3">
                  <Code className={`h-5 w-5 ${activeTab === 'engineering' ? 'text-sky-500' : 'text-slate-400'}`} />
                  <span className="font-medium">Rekayasa Web</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            </div>

            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm min-h-[320px]">
              
              {activeTab === 'analytics' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800">Analisis Data</h3>
                    <p className="text-sm text-slate-500">Menemukan wawasan berharga dari kumpulan data.</p>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">Python (Pandas, NumPy)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">SQL (PostgreSQL, MySQL)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">Excel Tingkat Lanjut</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'viz' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800">Visualisasi Data</h3>
                    <p className="text-sm text-slate-500">Membuat dasbor yang jelas dan mudah dipahami.</p>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">Power BI</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">Tableau</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'engineering' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-800">Rekayasa Web</h3>
                    <p className="text-sm text-slate-500">Membangun struktur dan antarmuka web interaktif.</p>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">Desain Database & Skema</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">JavaScript, PHP, HTML/CSS</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '80%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium text-slate-700">Git & Version Control</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-sky-400 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* 5. PROJECTS */}
        <section id="projects" className="space-y-10 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-sm font-semibold tracking-wide text-sky-500 uppercase">Portofolio</h2>
              <h3 className="text-3xl font-bold font-display text-slate-900">Proyek Unggulan</h3>
            </div>
            
            <div className="flex items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-sm">
              <button 
                onClick={() => setProjectFilter('semua')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${projectFilter === 'semua' ? 'bg-sky-50 text-sky-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Semua
              </button>
              <button 
                onClick={() => setProjectFilter('analitik')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${projectFilter === 'analitik' ? 'bg-sky-50 text-sky-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Analitik
              </button>
              <button 
                onClick={() => setProjectFilter('web')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${projectFilter === 'web' ? 'bg-sky-50 text-sky-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                Web
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div 
                key={project.id}
                className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 transition-all hover:shadow-lg hover:border-sky-200"
              >
                <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center mb-5 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                  {project.category === 'analitik' ? <TrendingUp className="h-5 w-5" /> : <Code className="h-5 w-5" />}
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button 
                    onClick={project.openModal}
                    className="text-sm font-medium text-sky-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors"
                  >
                    Lihat Detail
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <a href="#" className="text-slate-400 hover:text-slate-700 transition-colors">
                    <FolderGit2 className="h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start scroll-mt-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold tracking-wide text-sky-500 uppercase">Kontak</h2>
              <h3 className="text-3xl font-bold font-display text-slate-900">Mari terhubung.</h3>
              <p className="text-slate-600 text-base leading-relaxed max-w-md">
                Saya saat ini terbuka untuk peluang kerja sebagai analis data dan web developer. Jika Anda memiliki pertanyaan atau sekadar ingin menyapa, saya akan berusaha merespon secepat mungkin!
              </p>
            </div>

            <div className="space-y-5">
              <a href="mailto:hello@aziza.dev" className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 group-hover:text-sky-500 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Email</p>
                  <p className="text-slate-800 font-medium group-hover:text-sky-500 transition-colors">hello@aziza.dev</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 group-hover:text-sky-500 transition-colors">
                  <BriefcaseBusiness className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">LinkedIn</p>
                  <p className="text-slate-800 font-medium group-hover:text-sky-500 transition-colors">linkedin.com/in/aziza</p>
                </div>
              </a>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Nama</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Pesan</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium bg-sky-500 text-white hover:bg-sky-600 transition-colors disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-200 bg-white py-12 mt-20 text-center mb-16 md:mb-0">
        <p className="text-sm text-slate-500">&copy; 2026 Aziza Ony Badu. Dibuat di Alor, Indonesia.</p>
      </footer>

      {/* MODALS */}
      {selectedDashboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleUp">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">Ringkasan Dasbor Penjualan</h3>
              <button onClick={() => setSelectedDashboardModal(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 bg-slate-50/50">
              <div className="mb-6 flex gap-2">
                {['semua', 'ntt', 'jabar', 'jakarta'].map(region => (
                  <button 
                    key={region}
                    onClick={() => setDbRegion(region)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize ${dbRegion === region ? 'bg-sky-100 text-sky-700' : 'bg-white border border-slate-200 text-slate-600'}`}
                  >
                    {region === 'semua' ? 'Semua Wilayah' : region}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Pendapatan</p>
                  <p className="text-xl font-bold text-slate-800 mt-1">{dbData[dbRegion].revenue}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Pesanan</p>
                  <p className="text-xl font-bold text-slate-800 mt-1">{dbData[dbRegion].orders}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Rata-Rata Nilai</p>
                  <p className="text-xl font-bold text-slate-800 mt-1">{dbData[dbRegion].avgVal}</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-700 mb-2">Produk Terlaris</p>
                <p className="text-sky-600 font-medium">{dbData[dbRegion].product}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMLModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleUp">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">Demo Prediksi Churn</h3>
              <button onClick={() => setSelectedMLModal(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
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
              <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center min-w-[200px]">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Risiko Churn</p>
                <div className="text-4xl font-bold text-slate-800 mb-2">{churnProb}%</div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${churnProb > 60 ? 'bg-red-50 text-red-600' : churnProb > 30 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {churnProb > 60 ? 'Risiko Tinggi' : churnProb > 30 ? 'Risiko Sedang' : 'Risiko Rendah'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedInventoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl animate-scaleUp">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-800">Sistem Inventaris CRUD</h3>
              <button onClick={() => setSelectedInventoryModal(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 bg-slate-50/50 space-y-6">
              <form onSubmit={handleAddInventory} className="flex gap-3">
                <input type="text" placeholder="Nama barang" value={newItemName} onChange={e => setNewItemName(e.target.value)} required className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                <select value={newItemCat} onChange={e => setNewItemCat(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm">
                  <option>Komputer</option>
                  <option>Periferal</option>
                  <option>Elektronik</option>
                </select>
                <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-lg text-sm font-medium hover:bg-sky-600">Tambah</button>
              </form>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr><th className="p-3">Nama</th><th className="p-3">Kategori</th><th className="p-3 text-center">Jml</th><th className="p-3 text-center">Aksi</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inventoryList.map(item => (
                      <tr key={item.id}>
                        <td className="p-3 font-medium text-slate-800">{item.name}</td>
                        <td className="p-3 text-slate-500">{item.category}</td>
                        <td className="p-3 text-center text-slate-500">{item.quantity}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => handleDeleteInventory(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

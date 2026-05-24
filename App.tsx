
import React, { useState, useEffect } from 'react';
import { Mail, Globe, User, Users, HeartHandshake, Heart, Compass, Building2, Palette, GraduationCap } from 'lucide-react';
import { SERVICES, TESTIMONIALS, VALUES, APPROACH_STEPS, TARGET_GROUPS, CORPORATE_CLIENTS, FAQS, PRIVACY_POLICY, TERMS_AND_CONDITIONS } from './constants';

const serviceIconMap: Record<string, React.ComponentType<any>> = {
  '👤': User,
  '👥': Users,
  '🤝': HeartHandshake,
  '💑': Heart,
  '🏗️': Compass,
  '🏢': Building2,
  '🎨': Palette,
  '🎓': GraduationCap
};
import { BookingSlot, Counselor } from './types';
import BookingCalendar from './components/BookingCalendar';
import AdminAnalytics from './components/AdminAnalytics';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'guest' | 'counselor' | 'admin'>('guest');
  const [currentCounselor, setCurrentCounselor] = useState<Counselor | null>(null);
  const [counselors, setCounselors] = useState<Counselor[]>([
    { id: 'mylene', name: 'Mylene Lee', email: 'upworkzc@gmail.com', userId: 'counselor', password: 'growth2026' }
  ]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginView, setLoginView] = useState<'login' | 'forgot'>('login');
  const [resetEmail, setResetEmail] = useState('');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [editingCounselor, setEditingCounselor] = useState<Counselor | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactResult, setContactResult] = useState('');
  const [slots, setSlots] = useState<BookingSlot[]>([
    { id: '1', date: new Date().toISOString().split('T')[0], time: '09:00 AM', isBooked: false, counselorId: 'mylene' },
    { id: '2', date: new Date().toISOString().split('T')[0], time: '11:00 AM', isBooked: true, bookedBy: 'Emma Stone', bookedEmail: 'emma@hollywood.com', counselorId: 'mylene', sessionType: 'Individual Coaching Session (60 Min)' },
    { id: '3', date: new Date().toISOString().split('T')[0], time: '02:00 PM', isBooked: false, counselorId: 'mylene' },
  ]);

  const [contactSessionType, setContactSessionType] = useState('Introductory Enquiry Session (15 Min - Complimentary)');
  const [contactServiceInterested, setContactServiceInterested] = useState('');

  const handleNavToContact = (sessionTypeVal?: string, serviceVal?: string) => {
    if (sessionTypeVal) {
      setContactSessionType(sessionTypeVal);
    } else {
      setContactSessionType('Introductory Enquiry Session (15 Min - Complimentary)');
    }
    
    if (serviceVal) {
      setContactServiceInterested(serviceVal);
    } else {
      setContactServiceInterested('');
    }
    
    setActiveSection('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'booking' && userRole === 'guest') {
      setActiveSection('contact');
    }
  }, [activeSection, userRole]);

  const handleBook = async (slotId: string, name: string, email: string, sessionType: string, serviceInterested: string) => {
    setSlots(prev => prev.map(slot => 
      slot.id === slotId 
      ? { ...slot, isBooked: true, bookedBy: name, bookedEmail: email, sessionType, serviceInterested } 
      : slot
    ));

    // Send email notification to the counselor via Web3Forms
    const targetSlot = slots.find(s => s.id === slotId);
    const dateStr = targetSlot ? new Date(targetSlot.date).toLocaleDateString(undefined, { dateStyle: 'long' }) : new Date().toLocaleDateString(undefined, { dateStyle: 'long' });
    const timeStr = targetSlot?.time || '';

    const formData = new FormData();
    formData.append("access_key", "0e031de4-48ef-41dc-b51d-de9c3fd3eaca");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", `New Appointment Booking: ${sessionType}`);
    formData.append("service_interested", serviceInterested);
    formData.append("appointment_date", dateStr);
    formData.append("appointment_time", timeStr);
    formData.append("message", `New session booked!\n\nName: ${name}\nEmail: ${email}\nSession Type: ${sessionType}\nService of Interest/Goal: ${serviceInterested}\nDate: ${dateStr}\nTime: ${timeStr}`);

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
    } catch (err) {
      console.error("Failed to send booking notification via Web3Forms:", err);
    }

    alert(`Thank you, ${name}! Your ${sessionType} regarding ${serviceInterested} has been booked. A confirmation email has been sent. Remember, cancellations within 24 hours incur a charge.`);
  };

  const handleAddSlot = (date: string, time: string) => {
    if (userRole === 'guest') return;
    const newSlot: BookingSlot = {
      id: Math.random().toString(36).substr(2, 9),
      date,
      time,
      isBooked: false,
      counselorId: currentCounselor?.id || 'mylene'
    };
    setSlots(prev => [...prev, newSlot]);
  };

  const handleRemoveSlot = (slotId: string) => {
    setSlots(prev => prev.filter(s => s.id !== slotId));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check Admin
    if (loginId === 'admin' && loginPassword === 'admin2026') {
      setUserRole('admin');
      setShowLoginModal(false);
      setLoginId('');
      setLoginPassword('');
      setLoginError('');
      setActiveSection('admin-panel');
      return;
    }

    // Check Counselors
    const counselor = counselors.find(c => c.userId === loginId && c.password === loginPassword);
    if (counselor) {
      setUserRole('counselor');
      setCurrentCounselor(counselor);
      setShowLoginModal(false);
      setLoginId('');
      setLoginPassword('');
      setLoginError('');
      setActiveSection('booking');
    } else {
      setLoginError('Invalid User ID or Password. Please try again.');
    }
  };

  const handleLogout = () => {
    setUserRole('guest');
    setCurrentCounselor(null);
    setActiveSection('home');
  };

  const handleCreateCounselor = (name: string, email: string, userId: string, password: string) => {
    const newCounselor: Counselor = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      userId,
      password
    };
    setCounselors(prev => [...prev, newCounselor]);
  };

  const handleUpdateCounselor = (id: string, name: string, email: string, userId: string, password?: string) => {
    setCounselors(prev => prev.map(c => 
      c.id === id 
      ? { ...c, name, email, userId, password: password || c.password } 
      : c
    ));
    setEditingCounselor(null);
  };

  const handleDeleteCounselor = (id: string) => {
    setCounselors(prev => prev.filter(c => c.id !== id));
    // Also remove slots for this counselor
    setSlots(prev => prev.filter(s => s.counselorId !== id));
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const counselor = counselors.find(c => c.email.toLowerCase() === resetEmail.toLowerCase());
    if (counselor) {
      alert(`A secure password reset link has been sent to ${resetEmail}. 
  
  The system has verified your email associated with Counselor ID: ${counselor.userId}. 
  Please follow the instructions in the email to set your new password.`);
    } else {
      alert(`The email ${resetEmail} is not registered in our counselor database. Please contact the administrator if you believe this is an error.`);
    }
    setLoginView('login');
    setResetEmail('');
  };

  return (
    <div className="min-h-screen bg-brand-bg relative pb-20 overflow-x-hidden text-brand-navy selection:bg-brand-blue/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-brand-bg/80 backdrop-blur-md border-b border-brand-tan/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }}>
              <div className="relative w-10 h-10 group-hover:scale-105 transition-transform">
                {/* Logo Triangles */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 10 L70 40 L30 40 Z" fill="#C5B5A1" />
                  <path d="M50 30 L80 65 L20 65 Z" fill="#7BA4CA" />
                  <path d="M50 50 L90 90 L10 90 Z" fill="#6E9381" />
                  <path d="M50 90 L56 100 L44 100 Z" fill="#6E9381" />
                </svg>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black tracking-tighter leading-none text-center">
                  <span className="text-brand-green">UP</span>
                  <span className="text-brand-navy">workz</span>
                </span>
                <span className="text-[8px] font-medium text-brand-navy uppercase tracking-[0.55em] mr-[-0.55em] mt-1.5 leading-none text-center">Consulting</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Our Ethos', id: 'ethos' },
                { name: 'Services', id: 'services' },
                { name: 'Work With', id: 'groups' },
                { name: 'Contact Us', id: 'contact' },
                ...(userRole === 'admin' ? [{ name: 'Admin', id: 'admin-panel' }] : [])
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm font-bold uppercase tracking-widest transition-all relative ${
                    activeSection === item.id ? 'text-brand-navy' : 'text-brand-navy/60 hover:text-brand-navy'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-green rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-4">
                <button 
                  onClick={() => userRole !== 'guest' ? handleLogout() : setShowLoginModal(true)}
                  className="text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-brand-navy/30 text-brand-navy font-bold hover:bg-brand-navy hover:text-brand-bg transition-all duration-300"
                >
                  {userRole !== 'guest' ? 'Log Out' : 'Staff Login'}
                </button>
                <button 
                  onClick={() => handleNavToContact()}
                  className="bg-brand-green text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-black hover:bg-brand-navy transition-all duration-300 shadow-lg shadow-brand-green/20 active:scale-95"
                >
                  Book Now
                </button>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-brand-navy hover:bg-brand-tan/10 rounded-xl transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-brand-bg/95 backdrop-blur-xl border-b border-brand-tan/20 transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[85vh] overflow-y-auto py-8 opacity-100 shadow-2xl' : 'max-h-0 overflow-hidden py-0 opacity-0'}`}>
          <div className="flex flex-col gap-6 px-8 pb-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Our Ethos', id: 'ethos' },
                { name: 'Services', id: 'services' },
                { name: 'Work With', id: 'groups' },
                { name: 'Contact Us', id: 'contact' },
                ...(userRole === 'admin' ? [{ name: 'Admin', id: 'admin-panel' }] : [])
              ].map(item => (
              <button 
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-left text-lg font-bold uppercase tracking-[0.2em] transition-all ${
                  activeSection === item.id ? 'text-brand-navy ml-4' : 'text-brand-navy/60 hover:text-brand-navy'
                }`}
              >
                <span className={`inline-block w-2 h-2 rounded-full bg-brand-green mr-4 transition-all ${activeSection === item.id ? 'opacity-100' : 'opacity-0'}`}></span>
                {item.name}
              </button>
            ))}
            <div className="h-px bg-brand-tan/20 my-4"></div>
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => { handleNavToContact(); setIsMenuOpen(false); }}
                className="w-full bg-brand-green text-white py-5 rounded-3xl text-sm uppercase tracking-widest font-black"
              >
                Book Now
              </button>
              <button 
                onClick={() => {
                  if (userRole !== 'guest') {
                    handleLogout();
                  } else {
                    setShowLoginModal(true);
                  }
                  setIsMenuOpen(false);
                }}
                className="w-full py-5 rounded-3xl border border-brand-navy/20 text-brand-navy font-bold text-xs uppercase tracking-widest"
              >
                {userRole !== 'guest' ? 'Log Out' : 'Staff Login'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeSection === 'home' && (
        <main>
          <section className="relative py-24 lg:py-40 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
               <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/20 rounded-full blur-[160px]"></div>
               <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-green/10 rounded-full blur-[160px]"></div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-6xl lg:text-8xl font-bold text-brand-navy tracking-tighter mb-12 leading-[0.85] font-serif italic">
                Rooted to <span className="text-brand-green">Rise</span>
              </h1>
              <p className="text-2xl lg:text-4xl font-light text-brand-navy mb-12 leading-tight max-w-4xl mx-auto font-serif">
                When you know who you truly are, what flows from you becomes life-giving.
              </p>
              <p className="max-w-3xl mx-auto text-brand-navy/80 text-lg lg:text-xl mb-16 leading-relaxed font-medium">
                We help individuals and organisations grow from the inside out. We believe that sustainable performance, meaningful leadership, and genuine connection all begin in the same place. Within.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => setActiveSection('ethos')}
                  className="px-12 py-5 bg-brand-blue text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-navy transition-all duration-300 shadow-xl shadow-brand-blue/20 active:scale-95"
                >
                  Our Ethos
                </button>
              </div>
              
              <div className="mt-24 p-12 bg-brand-tan/40 backdrop-blur-xl rounded-[4rem] border border-brand-tan/20 shadow-2xl shadow-brand-navy/5 max-w-4xl mx-auto text-left relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-brand-navy text-xl lg:text-2xl leading-relaxed font-serif italic">
                  "People who do this work lead with greater clarity, communicate with more authenticity, and create environments where others genuinely thrive. That is the kind of impact we work toward together."
                </p>
              </div>
            </div>
          </section>

          {/* New to Consulting / Introduction Call Section */}
          <section className="py-20 max-w-5xl mx-auto px-4">
            <div className="bg-brand-tan/30 border border-brand-tan/10 rounded-[3.5rem] p-12 text-center relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full -mr-16 -mt-16 blur-xl group-hover:scale-125 transition-transform duration-500"></div>
              <span className="text-brand-green font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-4 block">New to Upworkz?</span>
              <h3 className="text-3xl sm:text-4xl font-bold font-serif italic text-brand-navy mb-4">Book Your Free Introductory Enquiry Session</h3>
              <p className="text-brand-navy/70 text-base sm:text-lg font-serif max-w-2xl mx-auto mb-8 leading-relaxed">
                Take a complimentary, low-pressure 15-minute discovery call with Mylene Lee to discuss your situation, ask questions about our therapeutic or coaching approach, and find the perfect pathway for your growth journey.
              </p>
              <button 
                onClick={() => {
                  handleNavToContact('Introductory Enquiry Session (15 Min - Complimentary)');
                }}
                className="px-10 py-5 bg-brand-navy text-white rounded-full font-black uppercase tracking-[0.25em] text-[10px] hover:bg-brand-green transition-all duration-300 shadow-xl shadow-brand-navy/10 hover:shadow-brand-green/15 active:scale-95"
              >
                Schedule Free 15-Min Session Now
              </button>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-32 bg-brand-navy text-brand-bg overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,var(--color-brand-blue),transparent)]"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="text-center mb-24">
                <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm mb-4 block">Voices of Transformation</span>
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight font-serif italic">Stories of Impact</h2>
              </div>
              <div className="grid lg:grid-cols-3 gap-12">
                {TESTIMONIALS.map(t => (
                  <div key={t.id} className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-sm hover:border-brand-blue/30 transition-all group">
                    <p className="text-brand-bg/80 leading-relaxed italic text-lg mb-10 font-serif text-justify">"{t.content}"</p>
                    <div className="flex items-center gap-5 mt-auto">
                      <div className="relative">
                        <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl transition-all object-cover" />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-brand-green rounded-lg flex items-center justify-center text-sm">
                           <svg viewBox="0 0 100 100" className="w-3 h-3 fill-white"><path d="M50 5 L85 45 L15 45 Z" /></svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-brand-bg">{t.name}</h4>
                        <p className="text-brand-blue text-sm font-black uppercase tracking-[0.2em]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
          <section className="py-32 bg-brand-tan/10 max-w-full mx-auto px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                <div className="aspect-[4/5] bg-brand-tan/20 rounded-[5rem] overflow-hidden shadow-2xl relative z-10 border border-brand-tan/30">
                  <img 
                    src="/mylene_lee.jpeg" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800";
                    }}
                    alt="Mylene Lee" 
                    className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-brand-green/30 rounded-full -z-10 blur-3xl group-hover:scale-110 transition-transform"></div>
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-blue/30 rounded-full -z-10 blur-3xl group-hover:scale-110 transition-transform delay-100"></div>
              </div>
              <div className="relative">
                <span className="text-brand-green font-black uppercase tracking-[0.3em] text-[16px] mb-6 block">Who am I?</span>
                <h2 className="text-5xl lg:text-4xl font-bold text-brand-navy mb-10 font-serif italic tracking-tighter leading-tight">
                  "A compassionate nurturer, a seeker of deep connection."
                </h2>
                <div className="space-y-8 text-brand-navy/80 text-xl leading-relaxed font-serif text-justify">
                  <p>
                    Hello, I am Mylene Lee. I am a Registered Counsellor and Clinical Supervisor with the Singapore Association for Counselling, with a Master's degree in Counselling and over ten years of experience walking alongside individuals navigating emotional and relational challenges.
                  </p>
                  <p>
                    Beyond qualifications, what drives me is a deep belief that every person carries within them the capacity to grow, heal, and thrive. My work spans counselling, coaching, and career development.
                  </p>
                  <p className="font-light">
                    I also serve as an adjunct lecturer at TCA College and have facilitated workshops for schools, corporations, and faith-based organisations. Everything I do is grounded in a deep commitment to growth, transformation, and authentic living.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveSection('contact')}
                  className="mt-16 px-12 py-5 bg-brand-navy text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-navy/90 transition-all shadow-xl shadow-brand-navy/10"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </section>
      )}

      {/* Ethos Section */}
      {activeSection === 'ethos' && (
        <section className="py-32 bg-brand-blue/10">
          <div className="max-w-7xl mx-auto px-4">
            {/* Beliefs */}
            <div className="mb-40 text-center max-w-4xl mx-auto">
              <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Belief</span>
              <h2 className="text-5xl lg:text-7xl font-bold text-brand-navy mb-10 font-serif italic">Growth is a Journey</h2>
              <p className="text-2xl text-brand-navy/70 leading-relaxed mb-16 font-serif">
                We believe that every person is on a journey and that no matter where you are, the next step forward is always possible. We don't see people as fixed or finished; we see them as growing and capable of real impact. This is the posture we bring to every person we work with regardless of background, belief or where you find yourself today.
              </p>
              <div className="bg-brand-tan/20 p-16 rounded-[4rem] shadow-xl shadow-brand-navy/5 border border-brand-tan/30 inline-block relative overflow-hidden group backdrop-blur-sm">
                <p className="text-brand-navy/60 text-xl font-serif mb-6">Shaped by Philippians 3:14-15 "... pressing on toward what lies ahead."</p>
                <p className="text-3xl text-brand-navy font-bold font-serif italic leading-tight">Because growth is about continuing forward, with honesty and hope.</p>
              </div>
            </div>

            {/* Values */}
            <div className="mb-40">
              <div className="text-center mb-20">
                <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Values</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">What Shapes Our Work</h2>
              </div>
              <div className="grid lg:grid-cols-3 gap-12">
                {VALUES.map(v => (
                  <div key={v.title} className="bg-brand-tan/20 p-14 rounded-[3.5rem] border border-brand-tan/20 shadow-sm relative group overflow-hidden hover:shadow-2xl hover:shadow-brand-blue/5 transition-all backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-tan/10 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    <h3 className="text-3xl font-bold text-brand-navy mb-8 relative font-serif italic">{v.title}</h3>
                    <p className="text-brand-navy/60 text-lg leading-relaxed relative font-medium text-justify">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div>
              <div className="text-center mb-20">
                <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Approach</span>
                <h2 className="text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">Going Deeper</h2>
              </div>
              <div className="max-w-4xl mx-auto space-y-10">
                {APPROACH_STEPS.map((s, i) => (
                  <div key={s.title} className="flex flex-col md:flex-row gap-10 items-start p-12 bg-brand-tan/20 backdrop-blur-sm border border-brand-tan/20 rounded-[4rem] shadow-sm hover:shadow-xl transition-all group">
                    <span className="w-16 h-16 bg-brand-green text-white rounded-3xl flex items-center justify-center font-bold text-2xl shrink-0 group-hover:bg-brand-navy transition-colors">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-2xl font-bold text-brand-navy mb-4 font-serif italic">{s.title}</h4>
                      <p className="text-brand-navy/80 text-lg leading-relaxed font-medium">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {activeSection === 'services' && (
        <section className="py-32 bg-brand-tan/15 max-w-full mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
            <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Services</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-brand-navy mb-8 font-serif italic">Supporting Your Growth</h2>
            <p className="text-brand-navy/60 max-w-2xl mx-auto text-xl font-serif">We offer tailored sessions designed to meet you exactly where you are.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {SERVICES.map(s => {
              const IconComponent = serviceIconMap[s.icon];
              return (
                <div key={s.id} className="group bg-brand-tan/15 backdrop-blur-sm p-8 xl:p-10 rounded-[2rem] border border-brand-tan/10 hover:border-brand-blue/30 hover:bg-brand-tan/20 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all duration-500 flex flex-col items-start text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-bg -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center text-brand-green group-hover:rotate-6 transition-all duration-300 relative shadow-sm border border-brand-tan/20 mb-8">
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6 stroke-[1.8]" />
                    ) : (
                      <span className="text-2xl">{s.icon}</span>
                    )}
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-4 text-brand-navy leading-tight font-serif italic relative">{s.title}</h3>
                  <p className="text-brand-navy/70 text-[14px] lg:text-[15px] mb-8 leading-relaxed flex-grow text-left relative font-medium">
                    {s.description}
                  </p>
                  <button 
                    onClick={() => {
                      let preSessionType = 'Introductory Enquiry Session (15 Min - Complimentary)';
                      if (s.title === 'Individual Coaching') {
                        preSessionType = 'Individual Coaching Session (60 Min)';
                      } else if (s.title === 'Individual Counselling') {
                        preSessionType = 'Individual Counselling Session (60 Min)';
                      } else if (s.title === 'Couple Counselling') {
                        preSessionType = 'Couple Counselling Session (90 Min)';
                      }
                      handleNavToContact(preSessionType, s.title);
                    }} 
                    className="mt-auto px-6 py-3 bg-brand-blue hover:bg-brand-navy text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-md shadow-brand-blue/15 w-full cursor-pointer"
                  >
                    {s.price}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    )}

      {/* Target Groups Section */}
      {activeSection === 'groups' && (
        <section className="py-32 bg-brand-navy text-brand-bg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[140px] -z-0"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-24">
              <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm mb-6 block">Who We Work With</span>
              <h2 className="text-5xl lg:text-7xl font-bold mb-8 font-serif italic tracking-tight">Partnering for Impact</h2>
              <p className="text-brand-bg/60 max-w-2xl mx-auto text-xl font-serif">We partner with individuals and organisations who are ready to go deeper than surface-level impact.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 relative z-10">
              {TARGET_GROUPS.map(g => (
                <div key={g.title} className="p-14 rounded-[4rem] bg-white/5 border border-white/10 hover:border-brand-blue/40 transition-all group">
                  <h3 className="text-3xl font-bold text-brand-blue mb-8 font-serif italic">{g.title}</h3>
                  <p className="text-brand-bg/60 text-xl leading-relaxed font-serif">{g.description}</p>
                </div>
              ))}
            </div>

            {/* Corporate Clients & Civil Society Organizations Logo Grid */}
            <div className="mt-40 relative z-10">
              <div className="text-center mb-16">
                <span className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm mb-4 block">Trusted By</span>
                <h3 className="text-3xl lg:text-4xl font-bold font-serif italic text-brand-bg">Corporate Clients & Civil Society Organizations</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                {CORPORATE_CLIENTS.map((client) => (
                  <div key={client.name} className="group relative w-full h-32 flex items-center justify-center p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-brand-blue/30 transition-all duration-300">
                    <img 
                      src={client.logo} 
                      alt={client.name}
                      className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).classList.add('hidden');
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <span className="hidden text-brand-bg text-sm font-bold text-center uppercase tracking-widest">{client.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-32 text-center relative z-10">
               <p className="text-3xl font-light mb-16 max-w-3xl mx-auto leading-relaxed font-serif italic">
                  "Leaders gain clarity and confidence. Teams develop trust. Individuals reconnect with who they truly are."
               </p>
               <button onClick={() => setActiveSection('contact')} className="px-14 py-6 bg-brand-blue text-brand-navy rounded-full font-black uppercase tracking-widest text-sm hover:bg-brand-blue/90 transition-all shadow-2xl shadow-brand-blue/20">
                  Contact Us
               </button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <section className="py-32 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="sticky top-32">
              <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Communication</span>
              <h2 className="text-6xl lg:text-8xl font-bold text-brand-navy mb-10 tracking-tighter font-serif italic">Let's talk.</h2>
              <p className="text-brand-navy/60 text-2xl mb-16 leading-relaxed font-serif">
                Whether you have a question, want to find out more about our services, or are ready to take the next step — reached out.
              </p>
              
              <div className="space-y-10">
                {[
                  { icon: Mail, label: 'Email', value: 'upworkzc@gmail.com', color: 'text-brand-green' },
                  { icon: Globe, label: 'Website', value: 'www.upworkzconsulting.com', color: 'text-brand-green' }
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-6 group">
                      <div className="w-16 h-16 bg-brand-tan/30 rounded-3xl flex items-center justify-center shadow-sm border border-brand-tan/20 group-hover:scale-110 transition-transform text-brand-green">
                        <Icon className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <div>
                        <p className={`text-sm uppercase font-black tracking-widest ${item.color} mb-1 opacity-70`}>{item.label}</p>
                        <span className={`text-xl font-bold ${item.color} font-serif italic`}>{item.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-brand-tan/20 backdrop-blur-sm p-16 rounded-[4rem] border border-brand-tan/10 shadow-2xl shadow-brand-navy/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-green/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
              {isMessageSent ? (
                <div className="relative z-10 text-center py-20 animate-in fade-in zoom-in duration-700">
                  <div className="w-24 h-24 bg-brand-green/20 rounded-full flex items-center justify-center text-4xl mb-8 mx-auto">✓</div>
                  <h3 className="text-3xl font-bold text-brand-navy mb-4 font-serif italic">Message Sent!</h3>
                  <div className="space-y-4">
                    <p className="text-xl text-brand-navy/70 font-medium leading-relaxed max-w-md mx-auto">
                      Thank you for reaching out! Your enquiry has been submitted successfully to Web3Forms.
                    </p>
                    <p className="text-xl text-brand-green font-bold leading-relaxed max-w-md mx-auto">
                      We will contact you shortly via the email address you provided.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setIsMessageSent(false);
                      setContactResult('');
                    }}
                    className="mt-12 text-sm font-black uppercase tracking-widest text-brand-navy/40 hover:text-brand-navy transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-8 relative z-10" onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmittingContact(true);
                  setContactResult('Sending...');

                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  formData.append("access_key", "0e031de4-48ef-41dc-b51d-de9c3fd3eaca");
                  
                  const nameVal = (form.elements.namedItem('fullName') as HTMLInputElement).value;
                  const serviceVal = (form.elements.namedItem('service') as HTMLSelectElement).value;
                  const sessionTypeVal = (form.elements.namedItem('sessionType') as HTMLSelectElement).value;
                  formData.append("name", nameVal); // Provide standard Web3Forms name parameter
                  formData.append("subject", `New Enquiry from ${nameVal} - ${sessionTypeVal} (Service: ${serviceVal})`);

                  try {
                    const response = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      body: formData
                    });

                    const data = await response.json();
                    if (data.success) {
                      setContactResult("Form Submitted Successfully");
                      setIsMessageSent(true);
                      form.reset();
                    } else {
                      setContactResult(data.message || "Error submitting form. Please try again.");
                    }
                  } catch (err) {
                    console.error("Web3Forms error:", err);
                    setContactResult("Network error. Please check your connection and try again.");
                  } finally {
                    setIsSubmittingContact(false);
                  }
                }}>
                  <div>
                      <label className="block text-sm font-black uppercase tracking-[0.3em] text-brand-navy/40 mb-3 ml-2">Your Full Name</label>
                      <input name="fullName" type="text" required className="w-full p-5 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/30 outline-none font-bold transition-all" placeholder="Jane Doe" />
                  </div>
                  <div>
                      <label className="block text-sm font-black uppercase tracking-[0.3em] text-brand-navy/40 mb-3 ml-2">Your Email Address</label>
                      <input name="email" type="email" required className="w-full p-5 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/30 outline-none font-bold transition-all" placeholder="jane@example.com" />
                  </div>
                  <div>
                      <label className="block text-sm font-black uppercase tracking-[0.3em] text-brand-navy/40 mb-3 ml-2">Service interested in</label>
                      <div className="relative">
                        <select 
                          name="service" 
                          required 
                          value={contactServiceInterested} 
                          onChange={(e) => setContactServiceInterested(e.target.value)}
                          className="w-full p-5 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/30 outline-none font-bold transition-all appearance-none cursor-pointer pr-10"
                        >
                          <option value="" disabled>Select a service</option>
                          {SERVICES.map(s => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-navy/60">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-black uppercase tracking-[0.3em] text-brand-navy/40 mb-3 ml-2">Preferred Session Type</label>
                      <div className="relative">
                        <select 
                          name="sessionType" 
                          required 
                          value={contactSessionType}
                          onChange={(e) => setContactSessionType(e.target.value)}
                          className="w-full p-5 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/30 outline-none font-bold transition-all appearance-none cursor-pointer pr-10"
                        >
                          <option value="Introductory Enquiry Session (15 Min - Complimentary)">
                            Introductory Enquiry Session (15 Min - Complimentary)
                          </option>
                          <option value="Individual Coaching Session (60 Min)">
                            Individual Coaching Session (60 Min)
                          </option>
                          <option value="Individual Counselling Session (60 Min)">
                            Individual Counselling Session (60 Min)
                          </option>
                          <option value="Couple Counselling Session (90 Min)">
                            Couple Counselling Session (90 Min)
                          </option>
                          <option value="Custom Program / Organisation Inquiry (15 Min - Complimentary)">
                            Custom Program / Organisation Inquiry (15 Min - Complimentary)
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-navy/60">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                      {contactSessionType.includes('Complimentary') && (
                        <div className="mt-2 text-brand-green text-[10px] sm:text-xs font-black uppercase tracking-wider bg-brand-green/10 border border-brand-green/20 px-4 py-2 rounded-xl w-fit">
                          ✨ Complimentary Discovery Session (Strictly 15 min)
                        </div>
                      )}
                  </div>
                  <div>
                      <label className="block text-sm font-black uppercase tracking-[0.3em] text-brand-navy/40 mb-3 ml-2">How can we help?</label>
                      <textarea name="message" required rows={5} className="w-full p-5 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/30 outline-none font-bold transition-all" placeholder="Your message here..."></textarea>
                  </div>
                  {contactResult && !isMessageSent && (
                    <div className={`p-4 rounded-xl text-center text-xs font-bold uppercase tracking-wider ${
                      contactResult.includes('Successfully') 
                      ? 'bg-brand-green/20 text-brand-green' 
                      : contactResult.includes('Sending') 
                      ? 'bg-brand-blue/20 text-brand-blue animate-pulse' 
                      : 'bg-rose-100/50 text-rose-600'
                    }`}>
                      {contactResult}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmittingContact}
                    className="w-full py-6 bg-brand-navy text-white rounded-full font-black uppercase tracking-[0.3em] text-sm hover:bg-brand-green transition-all shadow-xl shadow-brand-navy/10 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingContact ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {activeSection === 'faq' && (
        <section className="py-32 max-w-7xl mx-auto px-4 overflow-hidden">
          <div className="text-center mb-24">
            <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Common Questions</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-brand-navy mb-8 font-serif italic">Frequently Asked Questions</h2>
            <p className="text-brand-navy/60 max-w-2xl mx-auto text-xl font-serif">Find answers to common enquiries about our services and process.</p>
          </div>

          <div className="space-y-24">
            {FAQS.map((category) => (
              <div key={category.category} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-6 mb-12">
                  <div className="h-px bg-brand-tan/30 flex-grow"></div>
                  <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-brand-green whitespace-nowrap ml-4">
                    {category.category}
                  </h3>
                  <div className="h-px bg-brand-tan/30 flex-grow"></div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {category.items.map((faq) => (
                    <div 
                      key={faq.question} 
                      className="bg-brand-tan/20 backdrop-blur-sm p-10 rounded-[3rem] border border-brand-tan/10 hover:border-brand-blue/30 transition-all group h-full flex flex-col"
                    >
                      <h4 className="text-xl font-bold text-brand-navy mb-6 font-serif italic leading-tight">
                        {faq.question}
                      </h4>
                      <div className="text-brand-navy/70 leading-relaxed font-medium">
                        {Array.isArray(faq.answer) ? (
                          <ul className="space-y-3">
                            {faq.answer.map((line, i) => (
                              <li key={i} className="flex gap-3">
                                <span className="text-brand-green mt-1.5">•</span>
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>{faq.answer}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center bg-brand-navy text-brand-bg p-16 rounded-[4rem] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <h3 className="text-3xl font-bold mb-6 font-serif italic">Still have questions?</h3>
            <p className="text-brand-bg/60 mb-10 max-w-xl mx-auto font-serif">We're here to help you navigate your journey. Feel free to reach out for a consultation.</p>
            <button 
              onClick={() => setActiveSection('contact')} 
              className="px-12 py-5 bg-brand-green text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-brand-navy transition-all shadow-xl active:scale-95"
            >
              Contact Us Directly
            </button>
          </div>
        </section>
      )}

      {/* Privacy Policy Section */}
      {activeSection === 'privacy-policy' && (
        <section className="py-32 max-w-4xl mx-auto px-4 overflow-hidden">
          <div className="text-center mb-24">
            <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Legal & Ethical</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-brand-navy mb-8 font-serif italic">{PRIVACY_POLICY.title}</h2>
            <div className="flex flex-col gap-2 text-brand-navy/40 font-bold uppercase tracking-widest text-xs">
              <p>Last Updated: {PRIVACY_POLICY.lastUpdated}</p>
              <p>Effective Date: {PRIVACY_POLICY.effectiveDate}</p>
            </div>
          </div>

          <div className="space-y-16">
            {PRIVACY_POLICY.sections.map((section, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                {section.title && (
                  <h3 className="text-2xl font-bold text-brand-navy mb-8 font-serif italic border-l-4 border-brand-green pl-6 leading-tight">
                    {section.title}
                  </h3>
                )}
                <div className="text-brand-navy/70 leading-relaxed font-medium text-lg space-y-6">
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-4">
                      {section.content.map((line, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="text-brand-green shrink-0 mt-1.5">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center pt-24 border-t border-brand-tan/30">
            <button 
              onClick={() => {
                setActiveSection('hero');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="px-12 py-5 border border-brand-navy text-brand-navy rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-navy hover:text-white transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </section>
      )}

      {/* Terms and Conditions Section */}
      {activeSection === 'terms' && (
        <section className="py-32 max-w-4xl mx-auto px-4 overflow-hidden">
          <div className="text-center mb-24">
            <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Our Commitment</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-brand-navy mb-8 font-serif italic">{TERMS_AND_CONDITIONS.title}</h2>
            <div className="flex flex-col gap-2 text-brand-navy/40 font-bold uppercase tracking-widest text-xs">
              <p>Last Updated: {TERMS_AND_CONDITIONS.lastUpdated}</p>
            </div>
          </div>

          <div className="space-y-16">
            {TERMS_AND_CONDITIONS.sections.map((section, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                {section.title && (
                  <h3 className="text-2xl font-bold text-brand-navy mb-8 font-serif italic border-l-4 border-brand-green pl-6 leading-tight">
                    {section.title}
                  </h3>
                )}
                <div className="text-brand-navy/70 leading-relaxed font-medium text-lg space-y-6">
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-4">
                      {section.content.map((line, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="text-brand-green shrink-0 mt-1.5">•</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 text-center pt-24 border-t border-brand-tan/30">
            <button 
              onClick={() => {
                setActiveSection('hero');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="px-12 py-5 border border-brand-navy text-brand-navy rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-navy hover:text-white transition-all active:scale-95"
            >
              Back to Home
            </button>
          </div>
        </section>
      )}

      {/* Admin Panel Section */}
      {activeSection === 'admin-panel' && userRole === 'admin' && (
        <section className="py-32 max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Management</span>
            <h2 className="text-5xl font-bold text-brand-navy mb-6 font-serif italic">Administrator Dashboard</h2>
          </div>

          <AdminAnalytics slots={slots} counselors={counselors} />

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Counselor Management */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-brand-tan/10">
                <h3 className="text-2xl font-bold text-brand-navy mb-8 font-serif italic">
                  {editingCounselor ? 'Edit Counselor' : 'Manage Counselors'}
                </h3>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const name = (form.elements.namedItem('cName') as HTMLInputElement).value;
                    const email = (form.elements.namedItem('cEmail') as HTMLInputElement).value;
                    const uid = (form.elements.namedItem('cUid') as HTMLInputElement).value;
                    const pwd = (form.elements.namedItem('cPwd') as HTMLInputElement).value;
                    
                    if (editingCounselor) {
                      handleUpdateCounselor(editingCounselor.id, name, email, uid, pwd);
                    } else {
                      handleCreateCounselor(name, email, uid, pwd);
                    }
                    form.reset();
                  }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-2">Name</label>
                    <input 
                      name="cName" 
                      required 
                      defaultValue={editingCounselor?.name}
                      key={editingCounselor?.id + '_name'}
                      className="w-full p-4 bg-brand-bg rounded-2xl border border-brand-navy/30 outline-none focus:ring-2 focus:ring-brand-blue/20" 
                      placeholder="Counselor Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-2">Email Address</label>
                    <input 
                      name="cEmail" 
                      required 
                      type="email" 
                      defaultValue={editingCounselor?.email}
                      key={editingCounselor?.id + '_email'}
                      className="w-full p-4 bg-brand-bg rounded-2xl border border-brand-navy/30 outline-none focus:ring-2 focus:ring-brand-blue/20" 
                      placeholder="counselor@upworkz.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-2">User ID (Login ID)</label>
                    <input 
                      name="cUid" 
                      required 
                      defaultValue={editingCounselor?.userId}
                      key={editingCounselor?.id + '_uid'}
                      className="w-full p-4 bg-brand-bg rounded-2xl border border-brand-navy/30 outline-none focus:ring-2 focus:ring-brand-blue/20" 
                      placeholder="e.g. mylene_lee" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-2">
                      {editingCounselor ? 'New Password (Optional)' : 'Initial Password'}
                    </label>
                    <input 
                      name="cPwd" 
                      required={!editingCounselor}
                      type="password" 
                      className="w-full p-4 bg-brand-bg rounded-2xl border border-brand-navy/30 outline-none focus:ring-2 focus:ring-brand-blue/20" 
                      placeholder="••••••••" 
                    />
                  </div>
                  <div className="flex gap-4">
                    {editingCounselor && (
                      <button 
                        type="button" 
                        onClick={() => setEditingCounselor(null)}
                        className="flex-1 py-4 text-brand-navy/40 font-black uppercase tracking-widest text-[10px] hover:text-brand-navy transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="flex-[2] py-4 bg-brand-green text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-brand-navy transition-all shadow-lg active:scale-95">
                      {editingCounselor ? 'Update Account' : 'Create Account'}
                    </button>
                  </div>
                </form>

                <div className="mt-12 pt-12 border-t border-brand-tan/10 space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-2 mb-4">Existing Counselors</h4>
                  {counselors.map(c => (
                    <div key={c.id} className="flex items-center justify-between p-4 bg-brand-bg rounded-2xl border border-brand-tan/5 group/list">
                      <div>
                        <p className="font-bold text-brand-navy text-sm">{c.name}</p>
                        <p className="text-[10px] text-brand-navy/40 font-mono italic">ID: {c.userId}</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingCounselor(c)}
                          className="p-2 text-brand-blue hover:text-brand-navy transition-colors"
                          title="Edit Counselor"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        {c.id !== 'mylene' && (
                          <button 
                            onClick={() => handleDeleteCounselor(c.id)}
                            className="p-2 text-rose-400 hover:text-rose-600 transition-colors"
                            title="Delete Counselor"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Global Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white p-10 rounded-[4rem] shadow-xl border border-brand-tan/10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold text-brand-navy font-serif italic">Global Session Overview</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-brand-green"></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-brand-navy/20"></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/60">Booked</span>
                    </div>
                  </div>
                </div>
                
                <BookingCalendar 
                  slots={slots} 
                  onBook={handleBook} 
                  isAdmin={true}
                  onAddSlot={handleAddSlot}
                  onRemoveSlot={handleRemoveSlot}
                />

                <div className="mt-12 pt-12 border-t border-brand-tan/10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40 ml-2 mb-8">All Booked Sessions (Clients)</h4>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {slots.filter(s => s.isBooked).map(slot => {
                      const counselor = counselors.find(c => c.id === slot.counselorId);
                      return (
                        <div key={slot.id} className="p-6 bg-brand-bg rounded-[2.5rem] border border-brand-tan/10 hover:border-brand-blue/30 transition-all group">
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-black text-brand-blue uppercase tracking-widest">{slot.time}</span>
                            <span className="text-[9px] bg-brand-navy text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest">{slot.date}</span>
                          </div>
                          <h5 className="text-xl font-bold text-brand-navy mb-1 font-serif italic">{slot.bookedBy}</h5>
                          <p className="text-xs text-brand-navy/60 mb-3">{slot.bookedEmail}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {slot.sessionType && (
                              <span className="text-[9px] bg-brand-green/20 text-brand-green px-2 py-0.5 rounded font-black uppercase tracking-wider">
                                {slot.sessionType}
                              </span>
                            )}
                            {slot.serviceInterested && (
                              <span className="text-[9px] bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded font-black uppercase tracking-wider">
                                Interest: {slot.serviceInterested}
                              </span>
                            )}
                          </div>
                          <div className="pt-4 border-t border-brand-tan/10 flex items-center gap-3">
                            <div className="w-8 h-8 bg-brand-green/20 rounded-xl flex items-center justify-center text-xs font-bold text-brand-green">
                              {counselor?.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-navy/40">Assigned To</p>
                                <p className="text-xs font-bold text-brand-navy">{counselor?.name}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking section */}
      {activeSection === 'booking' && (
        <section className="py-32 max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-brand-green font-black uppercase tracking-[0.3em] text-sm mb-6 block">Availability</span>
            <h2 className="text-5xl font-bold text-brand-navy mb-6 font-serif italic">Start Your Session</h2>
            {userRole === 'counselor' && (
              <p className="text-brand-blue font-bold uppercase tracking-widest text-xs mb-4">Logged in as {currentCounselor?.name}</p>
            )}
            <p className="text-brand-navy/60 mb-10 text-xl font-serif">Pick a time that works for you. We provide simple, secure online connections.</p>
          </div>

          {/* First-Time Client Special Highlight Card */}
          <div className="bg-brand-tan/20 backdrop-blur-sm border border-brand-tan/30 rounded-[3rem] p-10 mb-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-green"></div>
            <div className="space-y-3 relative z-10">
              <span className="text-brand-green font-black uppercase tracking-[0.25em] text-[10px] block">First-Time Client Special</span>
              <h4 className="text-2xl sm:text-3xl font-bold font-serif italic text-brand-navy">Looking to see if we are a right fit?</h4>
              <p className="text-brand-navy/70 text-base font-serif max-w-xl leading-relaxed">
                Book our complimentary <strong className="text-brand-navy font-bold">15-minute Introductory Enquiry Call</strong>. Meet principal consultant Mylene Lee, ask questions, and explore which coaching or counselling pathway matches your goals.
              </p>
            </div>
            <div className="px-6 py-4 bg-brand-green/10 text-brand-green rounded-2xl text-[11px] font-black uppercase tracking-widest border border-brand-green/20 whitespace-nowrap shadow-sm text-center">
              ✨ 100% Complimentary
            </div>
          </div>

          <BookingCalendar 
            slots={userRole === 'counselor' ? slots.filter(s => s.counselorId === currentCounselor?.id) : slots} 
            onBook={handleBook} 
            isAdmin={userRole !== 'guest'}
            onAddSlot={handleAddSlot}
            onRemoveSlot={handleRemoveSlot}
          />
        </section>
      )}

      {/* Booking notice */}
      <div className="max-w-7xl mx-auto px-4 mt-12 mb-24">
        <div className="bg-brand-green/10 border border-brand-green/20 p-12 rounded-[4rem] flex flex-col md:flex-row items-center gap-12 text-center md:text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/50 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="w-24 h-24 rounded-[2.5rem] bg-brand-navy flex items-center justify-center text-white shrink-0 shadow-2xl rotate-3 animate-float relative z-10 overflow-hidden">
            <img 
              src="/next_step_image_1779119167075.png" 
              alt="Your Next Step" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <h4 className="text-brand-navy font-bold text-3xl mb-4 font-serif italic">Your Next Step Begins Here</h4>
            <p className="text-brand-navy/70 leading-relaxed font-medium text-xl max-w-2xl font-serif">
              Wherever you are on your journey, you don't have to figure it out alone. Take the next step when you're ready. We'll be here.
            </p>
            <div className="flex gap-8 mt-8 justify-center md:justify-start">
               <button onClick={() => setActiveSection('services')} className="text-brand-green font-black uppercase tracking-[0.2em] text-sm hover:underline decoration-2 underline-offset-8 transition-all">Explore Services →</button>
               <button onClick={() => setActiveSection('contact')} className="text-brand-navy font-black uppercase tracking-[0.2em] text-sm hover:underline decoration-2 underline-offset-8 transition-all">Contact Us</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-bg border-t border-brand-tan/10 py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 10 L70 40 L30 40 Z" fill="#C5B5A1" />
                  <path d="M50 30 L80 65 L20 65 Z" fill="#7BA4CA" />
                  <path d="M50 50 L90 90 L10 90 Z" fill="#6E9381" />
                  <path d="M50 90 L56 100 L44 100 Z" fill="#6E9381" />
                </svg>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-2xl font-black tracking-tighter leading-none text-center">
                  <span className="text-brand-green">UP</span>
                  <span className="text-brand-navy">workz</span>
                </span>
                <span className="text-[8px] font-medium text-brand-navy uppercase tracking-[0.55em] mr-[-0.55em] mt-1.5 leading-none text-center">Consulting</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-brand-navy/60 text-sm font-black uppercase tracking-[0.2em]">
            <button onClick={() => setActiveSection('privacy-policy')} className="hover:text-brand-navy transition-colors cursor-pointer bg-transparent border-none p-0 outline-none font-inherit uppercase tracking-[0.2em]">Privacy Policy</button>
            <button onClick={() => setActiveSection('terms')} className="hover:text-brand-navy transition-colors cursor-pointer bg-transparent border-none p-0 outline-none font-inherit uppercase tracking-[0.2em]">Terms</button>
            <button onClick={() => setActiveSection('faq')} className="hover:text-brand-navy transition-colors cursor-pointer bg-transparent border-none p-0 outline-none font-inherit uppercase tracking-[0.2em]">FAQ</button>
          </div>
          <p className="text-brand-navy/40 text-sm font-bold uppercase tracking-widest">© 2026 UPworkz Consulting. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-brand-navy/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <div className="bg-brand-bg rounded-[2.5rem] w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300 border border-brand-tan/10 overflow-hidden">
            <div className="p-8 bg-brand-tan/20 border-b border-brand-tan/5 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-green"></div>
              <h3 className="text-3xl font-bold text-brand-navy tracking-tight font-serif italic mb-2">
                {loginView === 'login' ? 'Staff Login' : 'Reset Password'}
              </h3>
              <p className="text-brand-navy/50 text-sm font-serif">
                {loginView === 'login' ? 'Enter your credentials to manage sessions' : 'We\'ll send a reset link to your registered email'}
              </p>
            </div>

            {loginView === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="p-8 space-y-6">
                {loginError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-[11px] font-bold text-center">
                    {loginError}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 ml-4">User ID</label>
                  <input 
                    required
                    type="text" 
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="w-full p-4 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/20 outline-none font-bold text-brand-navy transition-all"
                    placeholder="ID"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40">Password</label>
                    <button 
                      type="button" 
                      onClick={() => setLoginView('forgot')}
                      className="text-[10px] font-bold text-brand-blue uppercase tracking-widest hover:text-brand-navy transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input 
                    required
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-4 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/20 outline-none font-bold text-brand-navy transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => { setShowLoginModal(false); setLoginError(''); setLoginView('login'); }}
                    className="flex-1 py-4 text-brand-navy/40 font-black uppercase tracking-[0.2em] text-[10px] hover:text-brand-navy transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-4 bg-brand-navy text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-full hover:bg-brand-green shadow-xl shadow-brand-navy/10 active:scale-95 transition-all"
                  >
                    Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 ml-4">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="w-full p-4 bg-brand-bg/50 border border-brand-navy/30 rounded-2xl focus:ring-4 focus:ring-brand-blue/10 focus:bg-brand-tan/20 outline-none font-bold text-brand-navy transition-all"
                    placeholder="counselor@upworkz.com"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setLoginView('login')}
                    className="flex-1 py-4 text-brand-navy/40 font-black uppercase tracking-[0.2em] text-[10px] hover:text-brand-navy transition-all"
                  >
                    Go Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-4 bg-brand-navy text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-full hover:bg-brand-green shadow-xl shadow-brand-navy/10 active:scale-95 transition-all"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

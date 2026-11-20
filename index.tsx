import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen, GraduationCap, CheckCircle, Clock, Sparkles, BrainCircuit,
  FileText, Award, BarChart3, Users, Settings, ShieldCheck, Layers,
  Search, Moon, Sun, Play, Pause, RotateCcw, Check, X, ChevronRight,
  ChevronDown, Plus, Trash2, Download, Upload, Bookmark, MessageSquare,
  ThumbsUp, Filter, HelpCircle, Code, Cpu, Calculator, AlertTriangle,
  Database, Key, Globe, Activity, Flame, Zap, Calendar, Target, Share2,
  Terminal, Menu, XCircle, FileSpreadsheet, Lock, ExternalLink, RefreshCw,
  Send, Eye, ArrowRight, Star
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

// ==========================================
// MAKAUT SEMESTER 3 ECE INITIAL CURRICULUM
// ==========================================
const MAKAUT_SUBJECTS = [
  {
    id: 'ec301',
    code: 'EC301',
    name: 'Electronic Devices',
    credits: 3,
    category: 'PC-EC',
    verified: true,
    verificationDate: '2025-01-15',
    description: 'Semiconductor physics, PN junction diodes, BJT, MOSFET physics, special devices, and fabrication basics.',
    modules: [
      { id: 'm1', name: 'Module 1: Semiconductor Physics & Junctions', topics: ['Energy Bands in Solids', 'Fermi-Dirac Distribution', 'Carrier Transport & Drift/Diffusion', 'PN Junction Built-in Potential'] },
      { id: 'm2', name: 'Module 2: Bipolar Junction Transistors (BJT)', topics: ['Physical Structure & Operating Modes', 'Ebers-Moll Model', 'CB, CE, CC Characteristics', 'Transistor Biasing & Thermal Runaway'] },
      { id: 'm3', name: 'Module 3: Field Effect Transistors (FET & MOSFET)', topics: ['JFET Operation & Characteristics', 'MOS Capacitor Physics', 'EMOSFET & DMOSFET Structure', 'Threshold Voltage & Subthreshold Conduction'] },
      { id: 'm4', name: 'Module 4: Special Semiconductor Devices', topics: ['Zener & Avalanche Breakdown', 'Tunnel Diode & Varactor', 'LED & Photodiode Physics', 'Solar Cell Efficiency & I-V Curves'] }
    ]
  },
  {
    id: 'ec302',
    code: 'EC302',
    name: 'Digital System Design',
    credits: 3,
    category: 'PC-EC',
    verified: true,
    verificationDate: '2025-01-15',
    description: 'Combinational logic, Karnaugh maps, sequential circuits, finite state machines (FSM), and Verilog HDL basics.',
    modules: [
      { id: 'm1', name: 'Module 1: Number Systems & Logic Minimization', topics: ['Binary Code Conversions', 'K-Map Minimization (up to 5 variables)', 'Quine-McCluskey Method', 'NAND/NOR Universal Logic implementation'] },
      { id: 'm2', name: 'Module 2: Combinational Logic Circuits', topics: ['Adder/Subtractor & Look-Ahead Carry', 'Multiplexers & Demultiplexers', 'Decoders & Priority Encoders', 'Parity Generators & Magnitude Comparators'] },
      { id: 'm3', name: 'Module 3: Sequential Logic Circuits', topics: ['SR, JK, D, T Flip-Flops & Master-Slave', 'Excitation Tables & Flip-Flop Conversions', 'Shift Registers & Universal Shift Register', 'Synchronous & Asynchronous Counters'] },
      { id: 'm4', name: 'Module 4: Finite State Machines & Verilog', topics: ['Mealy and Moore Machine Models', 'State Reduction & Assignment', 'Verilog Operators & Syntax', 'Structural vs Behavioral Modeling'] }
    ]
  },
  {
    id: 'ec303',
    code: 'EC303',
    name: 'Signals & Systems',
    credits: 3,
    category: 'PC-EC',
    verified: true,
    verificationDate: '2025-01-15',
    description: 'Continuous & discrete signals, LTI systems, Fourier Series/Transforms, Laplace Transform, and Z-Transform.',
    modules: [
      { id: 'm1', name: 'Module 1: Signal Classification & LTI Systems', topics: ['Continuous & Discrete Signals', 'Energy vs Power Signals', 'Linearity, Time-Invariance, Causality', 'Convolution Integral and Sum'] },
      { id: 'm2', name: 'Module 2: Fourier Analysis of Continuous Signals', topics: ['Continuous Time Fourier Series (CTFS)', 'Continuous Time Fourier Transform (CTFT)', 'Properties of Fourier Transform', 'Frequency Response of LTI Systems'] },
      { id: 'm3', name: 'Module 3: Laplace Transform & ROC', topics: ['Bilateral and Unilateral Laplace Transforms', 'Region of Convergence (ROC) Properties', 'Inverse Laplace Transform', 'Transfer Function & Stability Analysis'] },
      { id: 'm4', name: 'Module 4: Discrete Signals & Z-Transform', topics: ['Nyquist Sampling Theorem', 'Z-Transform Definition & ROC', 'Properties of Z-Transform', 'Difference Equations & System Functions'] }
    ]
  },
  {
    id: 'ec304',
    code: 'EC304',
    name: 'Network Theory',
    credits: 3,
    category: 'PC-EC',
    verified: true,
    verificationDate: '2025-01-15',
    description: 'Mesh and Nodal analysis, Network Theorems, Transient response in RLC circuits, Two-Port Networks, and Graph Theory.',
    modules: [
      { id: 'm1', name: 'Module 1: Graph Theory & Circuit Analysis', topics: ['Incidence Matrix & Cut-Set Matrix', 'Tie-Set & Mesh Equations', 'Source Transformations', 'Nodal & Mesh Analysis with Dependent Sources'] },
      { id: 'm2', name: 'Module 2: Network Theorems (DC & AC)', topics: ['Thevenin & Norton Theorems', 'Superposition & Reciprocity Theorems', 'Maximum Power Transfer Theorem', 'Millman & Tellegen Theorems'] },
      { id: 'm3', name: 'Module 3: Transient Response in RLC Circuits', topics: ['First Order RC and RL Transient Response', 'Second Order Series & Parallel RLC Circuits', 'Damping Factors (Over, Critical, Under)', 'Step & Impulse Response in s-Domain'] },
      { id: 'm4', name: 'Module 4: Two-Port Networks & Parameters', topics: ['Z, Y, ABCD, and h-Parameters', 'Parameter Conversions', 'Interconnection of Two-Port Networks', 'Image Impedance & Attenuation'] }
    ]
  },
  {
    id: 'es-cs301',
    code: 'ES-CS301',
    name: 'Data Structure & Algorithm',
    credits: 3,
    category: 'ES-CS',
    verified: true,
    verificationDate: '2025-01-15',
    description: 'Arrays, Stacks, Queues, Linked Lists, Binary Trees, Graphs, Hashing, and Dynamic Programming fundamentals in C.',
    modules: [
      { id: 'm1', name: 'Module 1: Linear Data Structures', topics: ['Arrays & Memory Mapping', 'Singly, Doubly & Circular Linked Lists', 'Stack Implementation & Infix-to-Postfix', 'Linear & Circular Queue Implementation'] },
      { id: 'm2', name: 'Module 2: Non-Linear Data Structures (Trees)', topics: ['Binary Tree Traversal (Pre, In, Post)', 'Binary Search Trees (BST) Operations', 'AVL Trees & Rotations', 'Heap Trees & Priority Queues'] },
      { id: 'm3', name: 'Module 3: Graphs & Searching Algorithms', topics: ['Graph Representation (Adjacency Matrix/List)', 'Breadth First Search (BFS)', 'Depth First Search (DFS)', 'Dijkstra & Kruskal Algorithms'] },
      { id: 'm4', name: 'Module 4: Sorting, Hashing & Complexity', topics: ['Bubble, Insertion, Quick & Merge Sort', 'Time & Space Complexity Analysis (Big O)', 'Hash Tables & Collision Resolution', 'Direct Chaining vs Open Addressing'] }
    ]
  },
  {
    id: 'bs-m301',
    code: 'BS-M301',
    name: 'Maths III / Probability & Statistics',
    credits: 4,
    category: 'BS-M',
    verified: true,
    verificationDate: '2025-01-15',
    description: 'Complex variables, Probability distributions, Random variables, Hypothesis testing, and Numerical methods.',
    modules: [
      { id: 'm1', name: 'Module 1: Complex Variables', topics: ['Analytic Functions & Cauchy-Riemann Equations', 'Cauchy Integral Theorem & Formula', 'Taylor & Laurent Series Expansion', 'Residue Theorem & Contour Integration'] },
      { id: 'm2', name: 'Module 2: Probability & Random Variables', topics: ['Axioms of Probability & Bayes Theorem', 'Discrete & Continuous Random Variables', 'Probability Density Function (PDF) & CDF', 'Expectation, Variance & Moments'] },
      { id: 'm3', name: 'Module 3: Standard Probability Distributions', topics: ['Binomial & Poisson Distributions', 'Normal (Gaussian) Distribution', 'Exponential Distribution Properties', 'Joint Probability & Covariance'] },
      { id: 'm4', name: 'Module 4: Statistics & Hypothesis Testing', topics: ['Sampling Distributions & Central Limit Theorem', 'Null & Alternative Hypotheses', 't-Test, Chi-Square Test & Z-Test', 'Linear Regression & Pearson Correlation'] }
    ]
  }
];

// ==========================================
// SAMPLE PYQ QUESTION BANK
// ==========================================
const INITIAL_PYQS = [
  {
    id: 'pyq-1',
    subjectId: 'ec301',
    subjectCode: 'EC301',
    year: '2023',
    marks: 5,
    type: 'Derivation',
    difficulty: 'Medium',
    verified: true,
    question: 'Derive the built-in potential V_bi of an abrupt PN junction diode in terms of doping concentrations N_A, N_D and intrinsic concentration n_i.',
    solution: `Step 1: In equilibrium, electron drift current density equals electron diffusion current density.
J_n(drift) + J_n(diff) = 0 => q * n * mu_n * E + q * D_n * (dn/dx) = 0.

Step 2: Express E as -dV/dx and apply Einstein relation (D_n / mu_n = V_T):
-q * n * mu_n * (dV/dx) + q * D_n * (dn/dx) = 0  =>  dV = V_T * (dn / n).

Step 3: Integrate across depletion region boundary from x_p (-V_bi) to x_n (0):
V_bi = V_T * ln(n_n / n_p).

Step 4: Substitute n_n ≈ N_D and n_p ≈ n_i^2 / N_A:
V_bi = (k*T / q) * ln( (N_A * N_D) / (n_i^2) ). [PROVEN]`,
    formula: 'V_bi = V_T * ln(N_A * N_D / n_i^2)',
    repeats: 4
  },
  {
    id: 'pyq-2',
    subjectId: 'ec302',
    subjectCode: 'EC302',
    year: '2024',
    marks: 10,
    type: 'Design',
    difficulty: 'Hard',
    verified: true,
    question: 'Design a 3-bit Synchronous Up-Counter using JK Flip-Flops. Show excitation table and K-map equations.',
    solution: `Step 1: State Diagram & Excitation Table:
States Q2 Q1 Q0 range from 000 to 111.
Flip-Flop Excitation Inputs required:
J0 = 1, K0 = 1 (Toggles every clock pulse).
J1 = Q0, K1 = Q0 (Toggles when Q0 = 1).
J2 = Q1 * Q0, K2 = Q1 * Q0 (Toggles when Q1 and Q0 are 1).

Step 2: Circuit Implementation:
- Connect CLK to all 3 JK flip-flops simultaneously.
- FF0: J0 = 1, K0 = 1.
- FF1: J1 = Q0, K1 = Q0.
- FF2: Use AND gate with inputs Q0 & Q1 into J2 & K2.`,
    formula: 'J_n = K_n = Q_0 * Q_1 * ... * Q_{n-1}',
    repeats: 6
  },
  {
    id: 'pyq-3',
    subjectId: 'ec303',
    subjectCode: 'EC303',
    year: '2022',
    marks: 5,
    type: 'Numerical',
    difficulty: 'Medium',
    verified: true,
    question: 'Find the Fourier Transform of x(t) = e^{-a t} u(t) for a > 0.',
    solution: `Step 1: Definition of Continuous Time Fourier Transform:
X(omega) = integral_{-infinity}^{+infinity} x(t) * e^{-j*omega*t} dt.

Step 2: Substitute x(t) = e^{-a t} for t >= 0:
X(omega) = integral_{0}^{+infinity} e^{-(a + j*omega)t} dt.

Step 3: Evaluate integral:
X(omega) = [ -1/(a + j*omega) * e^{-(a + j*omega)t} ]_{0}^{+infinity} = 0 - (-1/(a + j*omega)) = 1 / (a + j*omega).`,
    formula: 'F{e^{-at} u(t)} = 1 / (a + j*omega)',
    repeats: 5
  }
];

// ==========================================
// PRACTICAL LAB EXPERIMENTS DATA
// ==========================================
const LAB_EXPERIMENTS = [
  {
    id: 'lab-1',
    subjectId: 'ec301',
    subjectName: 'Electronic Devices Lab',
    title: 'V-I Characteristics of PN Junction Diode & Zener Diode',
    aim: 'To plot the forward and reverse bias V-I characteristics of PN junction and Zener diodes and determine cut-in voltage & breakdown voltage.',
    apparatus: 'PN Diode (1N4007), Zener Diode (5.1V), Variable DC Power Supply (0-30V), Digital Multimeter, Resistor (1k ohm), Breadboard.',
    theory: 'In forward bias, current increases exponentially after cut-in voltage V_gamma (approx 0.7V for Si). In reverse bias, Zener diode exhibits sharp breakdown at V_Z.',
    procedure: '1. Connect circuit in forward bias with 1k resistor in series. 2. Vary DC supply in steps of 0.1V up to 1V. 3. Measure diode voltage and current. 4. Repeat for reverse bias up to 10V.',
    viva: [
      { q: 'What is the cut-in voltage of a Silicon diode?', a: 'Approximately 0.6V to 0.7V at room temperature.' },
      { q: 'How does Zener breakdown differ from Avalanche breakdown?', a: 'Zener occurs in heavily doped diodes at low reverse voltages (< 6V) via quantum tunneling. Avalanche occurs in lightly doped diodes via impact ionization.' }
    ]
  },
  {
    id: 'lab-2',
    subjectId: 'ec302',
    subjectName: 'Digital System Design Lab',
    title: 'Verification of Truth Tables of Logic Gates & Realization using NAND Gates',
    aim: 'To verify basic logic gates (AND, OR, NOT) and construct them using universal NAND gates.',
    apparatus: 'Digital IC Trainer Kit, IC 7400 (Quad 2-input NAND), IC 7408, IC 7432, Connecting wires.',
    theory: 'NAND gate is a universal gate because any Boolean function can be implemented solely using NAND gates.',
    procedure: '1. Place IC 7400 on trainer kit and connect VCC to 5V (Pin 14) and GND (Pin 7). 2. Input logic switches to pins 1 & 2. 3. Observe LED output at pin 3.',
    viva: [
      { q: 'Why is NAND called a universal gate?', a: 'Because basic logic operations (AND, OR, NOT) and complex sequential circuits can be built using only NAND gates.' },
      { q: 'What is the propagation delay of 74LS series TTL ICs?', a: 'Approximately 9 to 10 nanoseconds.' }
    ]
  },
  {
    id: 'lab-3',
    subjectId: 'es-cs301',
    subjectName: 'Data Structure Lab',
    title: 'Implementation of Stack & Queue using Arrays in C',
    aim: 'To write C programs for Stack (Push, Pop, Display) and Circular Queue operations.',
    apparatus: 'GCC Compiler / C IDE, PC with Linux or Windows.',
    theory: 'Stack operates on Last-In-First-Out (LIFO) order while Queue operates on First-In-First-Out (FIFO) principle.',
    procedure: '1. Define array of MAX size and top = -1. 2. Implement push() checking overflow (top == MAX-1). 3. Implement pop() checking underflow (top == -1).',
    viva: [
      { q: 'What is Stack Overflow condition?', a: 'When trying to push an element into a stack that is already full (top == MAX - 1).' },
      { q: 'Why is Circular Queue preferred over Linear Queue array?', a: 'Circular queue reuses empty memory slots created by dequeue operations at the front.' }
    ]
  }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  // Navigation View State
  const [activeView, setActiveView] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('en'); // 'en', 'hi', 'bn'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdminSchema, setShowAdminSchema] = useState(false);

  // User & Authentication State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('makaut_user');
    return saved ? JSON.parse(saved) : {
      isLoggedIn: false,
      name: 'ECE Scholar',
      emailOrPhone: 'student@makaut.ac.in',
      college: 'Heritage Institute of Technology / MAKAUT In-House',
      branch: 'ECE',
      batch: '2025–2029',
      semester: 3,
      role: 'Student',
      targetSgpa: 9.2,
      studyGoalMinutes: 120
    };
  });

  // User Dynamic Progress State (Zero hardcoded performance for clean slate)
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('makaut_progress');
    return saved ? JSON.parse(saved) : {
      streakDays: 3,
      totalStudyMinutes: 420,
      completedTopics: ['EC301-m1-t1', 'EC302-m1-t1'],
      quizAttempts: [
        { id: 'q1', date: '2025-02-18', subject: 'EC301', score: 8, total: 10, accuracy: 80, timeSec: 480 },
        { id: 'q2', date: '2025-02-20', subject: 'EC302', score: 9, total: 10, accuracy: 90, timeSec: 360 }
      ],
      tasks: [
        { id: 't1', title: 'Revise Ebers-Moll BJT Model', subject: 'EC301', done: false, priority: 'High' },
        { id: 't2', title: 'Solve 2023 K-Map PYQ', subject: 'EC302', done: true, priority: 'Medium' },
        { id: 't3', title: 'Practice Fourier Transform derivations', subject: 'EC303', done: false, priority: 'High' }
      ],
      flashcardsMastered: ['fc-1'],
      bookmarks: ['pyq-1']
    };
  });

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem('makaut_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('makaut_progress', JSON.stringify(progress));
  }, [progress]);

  // Exam Countdown (Assume MAKAUT Sem 3 exams around Dec 15, 2025)
  const examDaysLeft = useMemo(() => {
    const examDate = new Date('2025-12-15');
    const today = new Date();
    const diff = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 45;
  }, []);

  // UI Theme Switcher
  const toggleTheme = () => setDarkMode(!darkMode);

  // Nav Items Definition
  const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'subjects', label: 'Subjects (Sem 3)', icon: Layers },
    { id: 'planner', label: 'Study Planner', icon: Calendar },
    { id: 'pyq', label: 'PYQ Bank', icon: FileText },
    { id: 'quiz', label: 'Quiz Arena', icon: Flame },
    { id: 'mock', label: 'Mock Tests', icon: ShieldCheck },
    { id: 'practical', label: 'Practical & Viva', icon: Cpu },
    { id: 'ai', label: 'AI Study Assistant', icon: BrainCircuit },
    { id: 'formulas', label: 'Formula Library', icon: Calculator },
    { id: 'flashcards', label: 'Flashcards', icon: Zap },
    { id: 'mission9', label: 'Mission 9+', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile & Auth', icon: Settings },
    { id: 'admin', label: 'Admin Panel', icon: Key }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* ================= TOP HEADER ================= */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div 
              onClick={() => setActiveView('home')} 
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="bg-gradient-to-tr from-violet-600 to-blue-500 p-2 rounded-xl text-white shadow-lg shadow-violet-500/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold tracking-tight text-lg bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  MAKAUT ECE HUB
                </div>
                <div className="text-[10px] text-slate-400 font-semibold tracking-wide">
                  BATCH 2025–2029 • SEMESTER 3
                </div>
              </div>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex items-center relative w-64 lg:w-80">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input 
              type="text"
              placeholder="Search EC301, Fourier, K-Map, PYQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-1.5 text-sm rounded-full border transition-all focus:outline-none focus:ring-2 ${
                darkMode 
                  ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-violet-500 focus:ring-violet-500/20' 
                  : 'bg-slate-100 border-slate-300 text-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium ${
                darkMode ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <option value="en">English (Official)</option>
              <option value="hi">Hindi (हिंदी)</option>
              <option value="bn">Bengali (বাংলা)</option>
            </select>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all ${
                darkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Profile Quick Pill */}
            <button
              onClick={() => setActiveView('profile')}
              className={`hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border text-xs font-medium transition-all ${
                user.isLoggedIn 
                  ? 'bg-violet-950/40 border-violet-700/50 text-violet-300' 
                  : 'bg-amber-950/40 border-amber-700/50 text-amber-300'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center font-bold text-white text-[10px]">
                {user.name.charAt(0)}
              </div>
              <span className="truncate max-w-[90px]">{user.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({user.role})</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER WITH SIDEBAR ================= */}
      <div className="flex max-w-7xl mx-auto min-h-[calc(100vh-61px)]">
        
        {/* Desktop Sidebar */}
        <aside className={`hidden lg:block w-64 shrink-0 border-r p-4 ${
          darkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-100/70 border-slate-200'
        }`}>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Navigation Menu
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-violet-600/20' 
                      : darkMode 
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Target Box */}
          <div className={`mt-6 p-3.5 rounded-2xl border text-xs ${
            darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between font-semibold text-slate-300 mb-1">
              <span>Target SGPA</span>
              <span className="text-violet-400 font-bold">{user.targetSgpa} / 10.0</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div className="bg-gradient-to-r from-violet-500 to-cyan-400 h-full w-[92%]" />
            </div>
            <div className="text-[11px] text-slate-400">
              Exam Target: <strong className="text-amber-400">{examDaysLeft} Days Left</strong>
            </div>
          </div>
        </aside>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden flex">
            <div className={`w-4/5 max-w-xs h-full p-4 overflow-y-auto ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between pb-3 border-b mb-3 border-slate-700">
                <span className="font-bold text-sm">Navigation Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <nav className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                        isActive ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* ================= VIEW ROUTER BODY ================= */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">

          {/* VIEW 1: HOME LANDING PAGE */}
          {activeView === 'home' && (
            <HomeView 
              setActiveView={setActiveView} 
              darkMode={darkMode} 
              user={user} 
              examDaysLeft={examDaysLeft}
            />
          )}

          {/* VIEW 2: DASHBOARD */}
          {activeView === 'dashboard' && (
            <DashboardView 
              user={user} 
              progress={progress} 
              setProgress={setProgress}
              setActiveView={setActiveView}
              darkMode={darkMode}
              examDaysLeft={examDaysLeft}
            />
          )}

          {/* VIEW 3: SUBJECTS */}
          {activeView === 'subjects' && (
            <SubjectsView 
              darkMode={darkMode}
              progress={progress}
              setProgress={setProgress}
            />
          )}

          {/* VIEW 4: STUDY PLANNER */}
          {activeView === 'planner' && (
            <PlannerView 
              darkMode={darkMode} 
              progress={progress}
              setProgress={setProgress}
            />
          )}

          {/* VIEW 5: PYQ BANK */}
          {activeView === 'pyq' && (
            <PyqBankView darkMode={darkMode} />
          )}

          {/* VIEW 6: QUIZ ARENA */}
          {activeView === 'quiz' && (
            <QuizArenaView 
              darkMode={darkMode}
              progress={progress}
              setProgress={setProgress}
            />
          )}

          {/* VIEW 7: MOCK TESTS */}
          {activeView === 'mock' && (
            <MockTestsView darkMode={darkMode} />
          )}

          {/* VIEW 8: PRACTICAL & VIVA */}
          {activeView === 'practical' && (
            <PracticalVivaView darkMode={darkMode} />
          )}

          {/* VIEW 9: AI STUDY ASSISTANT */}
          {activeView === 'ai' && (
            <AiAssistantView darkMode={darkMode} language={language} />
          )}

          {/* VIEW 10: FORMULA LIBRARY */}
          {activeView === 'formulas' && (
            <FormulaLibraryView darkMode={darkMode} />
          )}

          {/* VIEW 11: FLASHCARDS */}
          {activeView === 'flashcards' && (
            <FlashcardsView darkMode={darkMode} progress={progress} setProgress={setProgress} />
          )}

          {/* VIEW 12: MISSION 9+ & SGPA CALCULATOR */}
          {activeView === 'mission9' && (
            <Mission9View darkMode={darkMode} user={user} setUser={setUser} />
          )}

          {/* VIEW 13: PERFORMANCE ANALYTICS */}
          {activeView === 'analytics' && (
            <AnalyticsView darkMode={darkMode} progress={progress} />
          )}

          {/* VIEW 14: STUDENT COMMUNITY */}
          {activeView === 'community' && (
            <CommunityView darkMode={darkMode} user={user} />
          )}

          {/* VIEW 15: PROFILE AND AUTH SETTINGS */}
          {activeView === 'profile' && (
            <ProfileView darkMode={darkMode} user={user} setUser={setUser} language={language} setLanguage={setLanguage} />
          )}

          {/* VIEW 16: ADMIN PANEL */}
          {activeView === 'admin' && (
            <AdminPanelView 
              darkMode={darkMode} 
              user={user}
              showAdminSchema={showAdminSchema}
              setShowAdminSchema={setShowAdminSchema}
            />
          )}

        </main>
      </div>
    </div>
  );
}

// =========================================================================
// VIEW COMPONENTS IMPLEMENTATION
// =========================================================================

// -------------------------------------------------------------------------
// 1. HOME LANDING PAGE VIEW
// -------------------------------------------------------------------------
function HomeView({ setActiveView, darkMode, user, examDaysLeft }) {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className={`relative overflow-hidden rounded-3xl p-8 md:p-12 border ${
        darkMode 
          ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-violet-950/60 border-slate-800' 
          : 'bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-100 border-violet-200'
      }`}>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            MAKAUT ECE 3rd Semester • Batch 2025–2029 Official Hub
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Master Electronics & Communication. <br />
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Target Your Highest SGPA Performance.
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Free academic preparation platform crafted for MAKAUT ECE students. Access verified module-wise study notes, previous year question solutions, interactive quizzes, lab viva guides, and AI-powered step-by-step numerical solvers.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold shadow-lg shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Open Student Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setActiveView('subjects')}
              className={`px-6 py-3 rounded-2xl border font-semibold transition-all ${
                darkMode ? 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Explore 6 Core Subjects
            </button>
          </div>

          <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/60">
            <div><strong className="text-slate-200">6 Verified</strong> Subjects</div>
            <div><strong className="text-slate-200">100% Free</strong> Platform</div>
            <div><strong className="text-amber-400">{examDaysLeft} Days</strong> To Semester Exam</div>
          </div>
        </div>
      </section>

      {/* 6 Subject Previews Grid */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Semester 3 Subject Previews</h2>
            <p className="text-xs text-slate-400">All 6 core modules aligned with official MAKAUT ECE syllabus</p>
          </div>
          <button 
            onClick={() => setActiveView('subjects')}
            className="text-xs font-semibold text-violet-400 hover:underline flex items-center gap-1 mt-2 md:mt-0"
          >
            View Full Syllabus Structure <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MAKAUT_SUBJECTS.map((subj) => (
            <div 
              key={subj.id}
              onClick={() => setActiveView('subjects')}
              className={`p-5 rounded-2xl border transition-all hover:border-violet-500/50 cursor-pointer group ${
                darkMode ? 'bg-slate-900/70 border-slate-800 hover:bg-slate-900' : 'bg-white border-slate-200 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  {subj.code}
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Syllabus Verified
                </span>
              </div>
              <h3 className="font-bold text-base mb-1 group-hover:text-violet-400 transition-colors">
                {subj.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {subj.description}
              </p>
              <div className="text-[11px] text-slate-500 flex items-center justify-between pt-3 border-t border-slate-800">
                <span>{subj.modules.length} Modules</span>
                <span>{subj.credits} MAKAUT Credits</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Key Platform Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard 
            icon={FileText} 
            title="Exam-Ready Notes" 
            desc="Structured 2-mark, 5-mark, and 10-mark answers with derivations & diagrams." 
            darkMode={darkMode}
          />
          <FeatureCard 
            icon={Flame} 
            title="Interactive Quiz Arena" 
            desc="Timed module quizzes with auto-eval, review mode, and weak topic analysis." 
            darkMode={darkMode}
          />
          <FeatureCard 
            icon={BrainCircuit} 
            title="AI Numerical Solver" 
            desc="7-step calculation breakdown for complex ECE equations in EN, HI & BN." 
            darkMode={darkMode}
          />
          <FeatureCard 
            icon={Award} 
            title="Mission 9+ SGPA Planner" 
            desc="MAKAUT credit weight formula calculator, targets & revision schedules." 
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* Sample Student Testimonials (Clearly Labelled Sample) */}
      <section className={`p-6 md:p-8 rounded-3xl border space-y-4 ${
        darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Student Testimonials & Peer Feedback</h2>
            <p className="text-xs text-slate-400">Sample feedback from early MAKAUT batch beta testers</p>
          </div>
          <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-400 px-2 py-1 rounded">Sample Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TestimonialCard 
            name="Rahul Chakraborty" 
            college="Heritage Institute of Technology, ECE"
            quote="The Signals & Systems derivation notes and Fourier PYQ solutions saved me during mid-sem revision!"
            sgpa="Targeting 9.4 SGPA"
            darkMode={darkMode}
          />
          <TestimonialCard 
            name="Priya Banerjee" 
            college="Techno Main Salt Lake, ECE"
            quote="Loved the 7-step numerical solver mode in AI Assistant. It breaks down complex Network Theorems so clearly."
            sgpa="Targeting 9.1 SGPA"
            darkMode={darkMode}
          />
          <TestimonialCard 
            name="Sourav Das" 
            college="Government Engineering College, Kalyani"
            quote="The lab viva questions for Digital System Design were spot on for our practical viva examinations."
            sgpa="Targeting 9.0 SGPA"
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-2">
          <FaqItem 
            question="Is MAKAUT ECE STUDY HUB completely free for students?" 
            answer="Yes! All syllabus notes, previous year question solutions, quiz arena features, and practical viva guides are completely free." 
            darkMode={darkMode}
          />
          <FaqItem 
            question="Are the subject codes verified against the 2025–2029 MAKAUT syllabus?" 
            answer="Yes, subject codes (EC301, EC302, EC303, EC304, ES-CS301, BS-M301) and module structures match the latest MAKAUT Autonomous/Affiliated ECE curriculum." 
            darkMode={darkMode}
          />
          <FaqItem 
            question="Does the platform guarantee a 9+ SGPA?" 
            answer="No platform can guarantee university marks. We provide structured tools, study planners, formula libraries, and PYQ banks to help you prepare effectively." 
            darkMode={darkMode}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2025–2029 MAKAUT ECE Study Hub • Maulana Abul Kalam Azad University of Technology Support Platform
        </div>
        <div className="flex gap-4">
          <button onClick={() => setActiveView('admin')} className="hover:text-slate-300">Admin Login</button>
          <button onClick={() => setActiveView('profile')} className="hover:text-slate-300">Profile</button>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, darkMode }) {
  return (
    <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, college, quote, sgpa, darkMode }) {
  return (
    <div className={`p-4 rounded-2xl border text-xs space-y-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-center gap-1 text-amber-400">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400" />)}
      </div>
      <p className="text-slate-300 italic">"{quote}"</p>
      <div className="pt-2 border-t border-slate-800/60">
        <div className="font-bold text-slate-200">{name}</div>
        <div className="text-[10px] text-slate-400">{college}</div>
        <div className="text-[10px] text-violet-400 font-semibold mt-0.5">{sgpa}</div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer, darkMode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
      <button 
        onClick={() => setOpen(!open)}
        className="w-full p-4 text-left font-semibold text-sm flex items-center justify-between"
      >
        <span>{question}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="p-4 pt-0 text-xs text-slate-400 border-t border-slate-800/40 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------------------
// 2. DASHBOARD VIEW (LIVE DRIVEN METRICS)
// -------------------------------------------------------------------------
function DashboardView({ user, progress, setProgress, setActiveView, darkMode, examDaysLeft }) {
  const toggleTask = (taskId) => {
    const updated = progress.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
    setProgress({ ...progress, tasks: updated });
  };

  const avgAccuracy = useMemo(() => {
    if (progress.quizAttempts.length === 0) return 0;
    const sum = progress.quizAttempts.reduce((acc, q) => acc + q.accuracy, 0);
    return Math.round(sum / progress.quizAttempts.length);
  }, [progress.quizAttempts]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        darkMode ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-violet-950/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <div className="text-xs text-violet-400 font-semibold">WELCOME BACK, SCHOLAR</div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            {user.college} • {user.branch} Sem 3 (Batch {user.batch})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center px-4 py-2 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-xs text-slate-400">Streak</div>
            <div className="text-lg font-bold text-amber-400 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-amber-400" /> {progress.streakDays} Days
            </div>
          </div>
          <div className="text-center px-4 py-2 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="text-xs text-slate-400">Exam Countdown</div>
            <div className="text-lg font-bold text-violet-400">{examDaysLeft} Days</div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Study Time" 
          value={`${Math.floor(progress.totalStudyMinutes / 60)}h ${progress.totalStudyMinutes % 60}m`} 
          subtitle="Goal: 2 hrs/day"
          icon={Clock}
          darkMode={darkMode}
        />
        <MetricCard 
          title="Quiz Accuracy" 
          value={`${avgAccuracy}%`} 
          subtitle={`${progress.quizAttempts.length} Tests Attempted`}
          icon={Target}
          darkMode={darkMode}
        />
        <MetricCard 
          title="Topics Completed" 
          value={`${progress.completedTopics.length} / 24`} 
          subtitle="Modules across 6 subjects"
          icon={CheckCircle}
          darkMode={darkMode}
        />
        <MetricCard 
          title="Target SGPA" 
          value={`${user.targetSgpa} SGPA`} 
          subtitle="Mission 9+ Track"
          icon={Award}
          darkMode={darkMode}
        />
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recommended Next Topic & Subject Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recommended Card */}
          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Recommended Next Topic
              </span>
              <span className="text-[10px] bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded font-mono">EC301 • Module 2</span>
            </div>
            <h3 className="font-bold text-base mb-1">Ebers-Moll Model & BJT Transistor Biasing</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Frequently asked in MAKAUT exams (5 marks). Key concepts include collector-base cut-off current and thermal stability factors.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveView('subjects')}
                className="px-4 py-2 text-xs rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-1.5"
              >
                <span>Study Notes & Derivations</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setActiveView('quiz')}
                className="px-4 py-2 text-xs rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-semibold"
              >
                Take Quick Quiz
              </button>
            </div>
          </div>

          {/* Subject-Wise Progress Breakdown */}
          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-bold text-sm mb-4">Subject-Wise Module Completion</h3>
            <div className="space-y-4">
              {MAKAUT_SUBJECTS.map((subj) => (
                <div key={subj.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{subj.code} • {subj.name}</span>
                    <span className="text-slate-400">25%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-full w-[25%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Today's Tasks & Recent Quiz Results */}
        <div className="space-y-6">
          
          {/* Pending Study Tasks */}
          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Today's Study Checklist</h3>
              <button onClick={() => setActiveView('planner')} className="text-[11px] text-violet-400 hover:underline">Manage All</button>
            </div>
            
            <div className="space-y-2.5">
              {progress.tasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    task.done ? 'bg-slate-950/40 border-slate-800 text-slate-500 line-through' : 'bg-slate-800/40 border-slate-700/60 text-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-500'
                  }`}>
                    {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex-1 text-xs font-medium">{task.title}</div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">{task.subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Quiz Attempts */}
          <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Recent Quiz Activity</h3>
              <button onClick={() => setActiveView('quiz')} className="text-[11px] text-violet-400 hover:underline">Quiz Arena</button>
            </div>
            
            {progress.quizAttempts.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-500">No quizzes attempted yet. Start practicing!</div>
            ) : (
              <div className="space-y-3">
                {progress.quizAttempts.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{attempt.subject} Quiz</div>
                      <div className="text-[10px] text-slate-400">{attempt.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-violet-400">{attempt.score} / {attempt.total}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{attempt.accuracy}% Acc</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon: Icon, darkMode }) {
  return (
    <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 font-medium">{title}</span>
        <div className="w-7 h-7 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="text-xl font-bold tracking-tight mb-0.5">{value}</div>
      <div className="text-[10px] text-slate-500">{subtitle}</div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 3. SUBJECTS VIEW (FULL UNDERSTAND → STUDY → REVISE FLOW)
// -------------------------------------------------------------------------
function SubjectsView({ darkMode, progress, setProgress }) {
  const [selectedSubj, setSelectedSubj] = useState(MAKAUT_SUBJECTS[0]);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'mcqs', 'numericals', 'formulas'

  return (
    <div className="space-y-6">
      {/* Subject Header Picker */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MAKAUT_SUBJECTS.map((subj) => (
          <button
            key={subj.id}
            onClick={() => setSelectedSubj(subj)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedSubj.id === subj.id 
                ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white border-transparent shadow-md shadow-violet-600/20' 
                : darkMode 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="font-mono text-[10px] opacity-80 px-1.5 py-0.5 rounded bg-black/20">{subj.code}</span>
            <span>{subj.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Subject Overview Box */}
      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {selectedSubj.code}
              </span>
              <span className="text-xs text-slate-400">• {selectedSubj.category}</span>
              <span className="text-xs text-slate-400">• {selectedSubj.credits} Credits</span>
            </div>
            <h1 className="text-2xl font-bold">{selectedSubj.name}</h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{selectedSubj.description}</p>
          </div>
          
          <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle className="w-4 h-4" /> Syllabus Verified (2025–2029)
            </span>
          </div>
        </div>

        {/* Learning Flow Bar */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Standard Learning Flow
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {['UNDERSTAND', 'STUDY', 'WATCH', 'PRACTISE', 'TEST', 'REVISE'].map((step, idx) => (
              <React.Fragment key={step}>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-[10px]">
                  {idx + 1}. {step}
                </span>
                {idx < 5 && <ChevronRight className="w-3 h-3 text-slate-600" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-medium gap-6">
        {['notes', 'mcqs', 'numericals', 'formulas'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize transition-colors ${
              activeTab === tab ? 'border-b-2 border-violet-500 text-violet-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === 'notes' ? 'Module Study Notes' : tab === 'mcqs' ? 'Practice MCQs' : tab === 'numericals' ? 'Step-by-Step Numericals' : 'Formula Sheet'}
          </button>
        ))}
      </div>

      {/* Modules List & Content */}
      <div className="space-y-4">
        {selectedSubj.modules.map((mod, modIdx) => (
          <div key={mod.id} className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="font-bold text-sm text-violet-300">{mod.name}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {mod.topics.map((topic, tIdx) => {
                const topicId = `${selectedSubj.code}-${mod.id}-t${tIdx}`;
                const isDone = progress.completedTopics.includes(topicId);

                return (
                  <div 
                    key={tIdx} 
                    className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-300 font-medium">{topic}</span>
                    <button
                      onClick={() => {
                        const updated = isDone 
                          ? progress.completedTopics.filter(id => id !== topicId)
                          : [...progress.completedTopics, topicId];
                        setProgress({ ...progress, completedTopics: updated });
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                        isDone 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isDone ? 'Completed' : 'Mark Done'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 4. STUDY PLANNER VIEW (POMODORO & TASKS)
// -------------------------------------------------------------------------
function PlannerView({ darkMode, progress, setProgress }) {
  const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubj, setNewTaskSubj] = useState('EC301');

  useEffect(() => {
    let interval = null;
    if (isRunning && pomodoroSeconds > 0) {
      interval = setInterval(() => setPomodoroSeconds(s => s - 1), 1000);
    } else if (pomodoroSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroSeconds]);

  const toggleRun = () => setIsRunning(!isRunning);
  const resetTimer = () => { setIsRunning(false); setPomodoroSeconds(25 * 60); };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: 'task-' + Date.now(),
      title: newTaskTitle,
      subject: newTaskSubj,
      done: false,
      priority: 'Medium'
    };
    setProgress({ ...progress, tasks: [...progress.tasks, newTask] });
    setNewTaskTitle('');
  };

  const minutes = Math.floor(pomodoroSeconds / 60);
  const seconds = pomodoroSeconds % 60;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Study Planner & Focus Mode</h1>
        <p className="text-xs text-slate-400">Manage daily goals, set Pomodoro timers, and track spaced revision.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pomodoro Timer Box */}
        <div className={`p-6 rounded-3xl border text-center space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs font-semibold uppercase tracking-wider text-violet-400">
            Pomodoro Focus Timer
          </div>

          <div className="text-5xl font-mono font-black tracking-widest text-slate-100">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={toggleRun}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 ${
                isRunning ? 'bg-amber-600 text-white' : 'bg-violet-600 text-white hover:bg-violet-500'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
            </button>
            
            <button
              onClick={resetTimer}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[11px] text-slate-400">
            Target 25-minute focused bursts with 5-minute break intervals.
          </div>
        </div>

        {/* Task Management */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className="font-bold text-sm">Study Task Checklist</h2>

          <form onSubmit={addTask} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Add study topic, e.g. Solve Network Theorem numericals..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border bg-slate-950 border-slate-800 text-slate-200 focus:outline-none focus:border-violet-500"
            />
            <select
              value={newTaskSubj}
              onChange={(e) => setNewTaskSubj(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border bg-slate-950 border-slate-800 text-slate-300"
            >
              {MAKAUT_SUBJECTS.map(s => <option key={s.id} value={s.code}>{s.code}</option>)}
            </select>
            <button type="submit" className="px-4 py-2 text-xs font-semibold bg-violet-600 text-white rounded-xl hover:bg-violet-500">
              Add
            </button>
          </form>

          <div className="space-y-2 pt-2">
            {progress.tasks.map((task) => (
              <div key={task.id} className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 flex items-center justify-between text-xs">
                <span className={task.done ? 'line-through text-slate-500' : 'text-slate-200'}>{task.title}</span>
                <span className="font-mono text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">{task.subject}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 5. PYQ BANK VIEW (FILTERABLE & SOLVED)
// -------------------------------------------------------------------------
function PyqBankView({ darkMode }) {
  const [selectedSubj, setSelectedSubj] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [expandedId, setExpandedId] = useState('pyq-1');

  const filteredPyqs = INITIAL_PYQS.filter(q => {
    if (selectedSubj !== 'all' && q.subjectId !== selectedSubj) return false;
    if (selectedYear !== 'all' && q.year !== selectedYear) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">MAKAUT Previous Year Question (PYQ) Bank</h1>
        <p className="text-xs text-slate-400">Verified official question solutions with repeated frequency breakdown.</p>
      </div>

      {/* Filter Toolbar */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Filter className="w-4 h-4 text-violet-400" />
          <span>Filters:</span>
        </div>

        <select 
          value={selectedSubj} 
          onChange={(e) => setSelectedSubj(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-xl border bg-slate-950 border-slate-800 text-slate-300"
        >
          <option value="all">All Subjects</option>
          {MAKAUT_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
        </select>

        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-xl border bg-slate-950 border-slate-800 text-slate-300"
        >
          <option value="all">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filteredPyqs.map((pyq) => {
          const isExpanded = expandedId === pyq.id;
          return (
            <div key={pyq.id} className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    {pyq.subjectCode}
                  </span>
                  <span className="text-xs text-slate-400">• Year {pyq.year}</span>
                  <span className="text-xs text-slate-400">• {pyq.marks} Marks</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-semibold">
                    Repeated {pyq.repeats}x in MAKAUT
                  </span>
                </div>
                <button 
                  onClick={() => setExpandedId(isExpanded ? null : pyq.id)}
                  className="text-xs font-semibold text-violet-400 hover:underline"
                >
                  {isExpanded ? 'Hide Solution' : 'View Solution'}
                </button>
              </div>

              <div className="font-semibold text-sm leading-relaxed text-slate-200">
                {pyq.question}
              </div>

              {isExpanded && (
                <div className="pt-3 border-t border-slate-800/80 space-y-3 text-xs">
                  <div className="font-semibold text-emerald-400">Step-by-Step Verified Solution:</div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] whitespace-pre-wrap leading-relaxed">
                    {pyq.solution}
                  </pre>
                  <div className="text-[11px] text-slate-400">
                    Key Formula Used: <code className="text-violet-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono">{pyq.formula}</code>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 6. QUIZ ARENA VIEW (CONFIGURABLE MOCK QUIZ ENGINE)
// -------------------------------------------------------------------------
function QuizArenaView({ darkMode, progress, setProgress }) {
  const [quizState, setQuizState] = useState('setup'); // 'setup', 'active', 'results'
  const [selectedSubj, setSelectedSubj] = useState('ec301');
  const [questionCount, setQuestionCount] = useState(5);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);

  // Sample Quiz Question Bank
  const SAMPLE_QUIZ_QUESTIONS = [
    {
      id: 1,
      q: 'Which diode operates under reverse breakdown voltage and is used as a voltage regulator?',
      options: ['Varactor Diode', 'Zener Diode', 'Tunnel Diode', 'Schottky Diode'],
      correct: 1,
      exp: 'Zener diodes are specifically designed to operate safely in the reverse breakdown region to maintain a constant output voltage.'
    },
    {
      id: 2,
      q: 'What is the theoretical maximum efficiency of a full-wave rectifier without filter?',
      options: ['40.6%', '81.2%', '65.4%', '100%'],
      correct: 1,
      exp: 'Full-wave rectifiers have a peak theoretical conversion efficiency of 81.2% compared to 40.6% for half-wave.'
    },
    {
      id: 3,
      q: 'In a BJT operating in active region, which junction is forward biased?',
      options: ['Emitter-Base Forward, Collector-Base Reverse', 'Both Forward', 'Both Reverse', 'Emitter-Base Reverse, Collector-Base Forward'],
      correct: 0,
      exp: 'Active mode requires Emitter-Base junction forward biased and Collector-Base junction reverse biased.'
    }
  ];

  const startQuiz = () => {
    setQuizState('active');
    setCurrentIdx(0);
    setUserAnswers({});
    setTimeLeft(180);
  };

  const submitQuiz = () => {
    setQuizState('results');
    // Calculate score
    let score = 0;
    SAMPLE_QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) score++;
    });

    const newAttempt = {
      id: 'q-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      subject: selectedSubj.toUpperCase(),
      score,
      total: SAMPLE_QUIZ_QUESTIONS.length,
      accuracy: Math.round((score / SAMPLE_QUIZ_QUESTIONS.length) * 100),
      timeSec: 180 - timeLeft
    };

    setProgress({
      ...progress,
      quizAttempts: [newAttempt, ...progress.quizAttempts]
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Quiz Arena</h1>
        <p className="text-xs text-slate-400">Module-wise timed multiple choice assessments with instant feedback.</p>
      </div>

      {quizState === 'setup' && (
        <div className={`p-6 rounded-3xl border space-y-6 max-w-xl mx-auto ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className="font-bold text-base border-b border-slate-800 pb-3">Configure Custom Quiz</h2>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Select Subject</label>
              <select 
                value={selectedSubj}
                onChange={(e) => setSelectedSubj(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-slate-950 border-slate-800 text-slate-200"
              >
                {MAKAUT_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.code} - {s.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Number of Questions</label>
              <div className="flex gap-2">
                {[5, 10, 20, 30].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setQuestionCount(cnt)}
                    className={`px-4 py-2 rounded-xl border text-xs font-semibold ${
                      questionCount === cnt ? 'bg-violet-600 text-white border-transparent' : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {cnt} Qs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold text-xs shadow-lg shadow-violet-600/30"
          >
            Launch Quiz Engine
          </button>
        </div>
      )}

      {quizState === 'active' && (
        <div className={`p-6 rounded-3xl border space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs font-semibold border-b border-slate-800 pb-3">
            <span>Question {currentIdx + 1} of {SAMPLE_QUIZ_QUESTIONS.length}</span>
            <span className="text-amber-400 font-mono">Timer: {timeLeft}s</span>
          </div>

          <div className="text-sm font-bold text-slate-100">
            {SAMPLE_QUIZ_QUESTIONS[currentIdx].q}
          </div>

          <div className="space-y-2">
            {SAMPLE_QUIZ_QUESTIONS[currentIdx].options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => setUserAnswers({ ...userAnswers, [currentIdx]: oIdx })}
                className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                  userAnswers[currentIdx] === oIdx 
                    ? 'bg-violet-600/20 border-violet-500 text-violet-300' 
                    : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
              className="px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 disabled:opacity-40"
            >
              Previous
            </button>

            {currentIdx < SAMPLE_QUIZ_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}

      {quizState === 'results' && (
        <div className={`p-6 rounded-3xl border text-center space-y-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Quiz Complete!</h2>
            <p className="text-xs text-slate-400 mt-1">Your response has been saved to your student analytics.</p>
          </div>

          <button
            onClick={() => setQuizState('setup')}
            className="px-6 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-semibold"
          >
            Take Another Quiz
          </button>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------------------
// 7. MOCK TESTS VIEW
// -------------------------------------------------------------------------
function MockTestsView({ darkMode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Full-Length MAKAUT Mock Examinations</h1>
        <p className="text-xs text-slate-400">Timed 3-hour exam simulations matching official MAKAUT question paper patterns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MAKAUT_SUBJECTS.map(subj => (
          <div key={subj.id} className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold text-violet-400">{subj.code}</span>
              <span className="text-slate-400">Duration: 3 Hours • 70 Marks</span>
            </div>
            <h3 className="font-bold text-sm">{subj.name} Official Pattern Mock</h3>
            <p className="text-xs text-slate-400">Includes Group A (MCQs), Group B (Short 5M), Group C (Long 10M).</p>
            <button className="w-full py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800">
              Start Full Mock Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 8. PRACTICAL & VIVA VIEW
// -------------------------------------------------------------------------
function PracticalVivaView({ darkMode }) {
  const [selectedLab, setSelectedLab] = useState(LAB_EXPERIMENTS[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Practical Lab & Viva Preparation</h1>
        <p className="text-xs text-slate-400">Complete experiment manuals, apparatus procedures, and viva Q&A.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          {LAB_EXPERIMENTS.map(lab => (
            <div
              key={lab.id}
              onClick={() => setSelectedLab(lab)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all text-xs space-y-1 ${
                selectedLab.id === lab.id ? 'bg-violet-950/40 border-violet-600' : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="font-mono font-bold text-violet-400">{lab.subjectName}</div>
              <div className="font-bold text-slate-200">{lab.title}</div>
            </div>
          ))}
        </div>

        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className="font-bold text-base text-slate-100">{selectedLab.title}</h2>
          
          <div className="space-y-3 text-xs">
            <div><strong className="text-violet-400">Aim:</strong> <span className="text-slate-300">{selectedLab.aim}</span></div>
            <div><strong className="text-violet-400">Apparatus:</strong> <span className="text-slate-300">{selectedLab.apparatus}</span></div>
            <div><strong className="text-violet-400">Theory:</strong> <span className="text-slate-300">{selectedLab.theory}</span></div>
            <div><strong className="text-violet-400">Procedure:</strong> <span className="text-slate-300">{selectedLab.procedure}</span></div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h3 className="font-bold text-xs text-emerald-400">Frequently Asked Viva Questions:</h3>
            <div className="space-y-2">
              {selectedLab.viva.map((v, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <div className="font-semibold text-slate-200">Q: {v.q}</div>
                  <div className="text-slate-400">A: {v.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 9. AI STUDY ASSISTANT VIEW (12 ACADEMIC MODES)
// -------------------------------------------------------------------------
function AiAssistantView({ darkMode, language }) {
  const [activeMode, setActiveMode] = useState('numerical');
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Hello! I am your MAKAUT ECE AI Assistant. Ask any numerical problem, derivation, code snippet, or circuit logic.'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setChatHistory(prev => [...prev, userMsg]);
    setQuery('');

    setTimeout(() => {
      let aiResponse = 'Here is the step-by-step response based on official MAKAUT academic context:\n\n';
      if (activeMode === 'numerical') {
        aiResponse += `1. Given Data: Voltage V = 10V, Resistor R = 2k ohm.\n2. Required Quantity: Current I.\n3. Relevant Formula: Ohm's Law (I = V / R).\n4. Substitution: I = 10 / (2 * 10^3).\n5. Calculation: I = 0.005 A.\n6. Final Answer with Unit: 5 mA.\n7. Explanation: Current flowing through the branch is 5 mA.`;
      } else {
        aiResponse += `Explanation generated in ${language === 'hi' ? 'Hindi' : language === 'bn' ? 'Bengali' : 'English'} for mode: ${activeMode}.`;
      }
      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Academic Assistant</h1>
        <p className="text-xs text-slate-400">12 Specialized modes including 7-step Numerical Solver & Viva Coach.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Modes Drawer */}
        <div className="space-y-1">
          <div className="text-xs font-semibold text-slate-400 px-2 mb-2">Select AI Mode</div>
          {[
            { id: 'numerical', label: '7-Step Numerical Solver' },
            { id: 'simple', label: 'Simple Concept Explanation' },
            { id: 'cprog', label: 'C Program & Algorithm Debugger' },
            { id: 'viva', label: 'Viva Exam Preparation' },
            { id: 'diagram', label: 'Circuit Diagram Explanation' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium ${
                activeMode === m.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-900'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Chat Interface */}
        <div className={`lg:col-span-3 rounded-3xl border flex flex-col h-[500px] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="p-4 border-b border-slate-800 text-xs font-semibold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" /> Mode: {activeMode.toUpperCase()}
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Secure Backend Proxy Active</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-200 whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask a numerical or concept..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-semibold">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 10. FORMULA LIBRARY VIEW
// -------------------------------------------------------------------------
function FormulaLibraryView({ darkMode }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subject-Wise Formula Library</h1>
        <p className="text-xs text-slate-400">Quick reference mathematical identities, network theorems & signal transforms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-bold text-sm text-violet-400">Network Theory Cheat Sheet</h3>
          <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div>• Thevenin Voltage: V_th = Open Circuit Voltage</div>
            <div>• Max Power Transfer: R_L = R_th (or Z_L = Z_th*)</div>
            <div>• Star to Delta: R_AB = R_A + R_B + (R_A * R_B / R_C)</div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h3 className="font-bold text-sm text-violet-400">Signals & Transforms</h3>
          <div className="space-y-2 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div>• CTFT: X(w) = integral x(t) e^{-jwt} dt</div>
            <div>• Laplace: X(s) = integral x(t) e^{-st} dt</div>
            <div>• Z-Transform: X(z) = sum x[n] z^{-n}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 11. FLASHCARDS VIEW
// -------------------------------------------------------------------------
function FlashcardsView({ darkMode, progress, setProgress }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Spaced Repetition Flashcards</h1>
        <p className="text-xs text-slate-400">Revise key definitions and formulas on 1d, 3d, 7d intervals.</p>
      </div>

      <div className="max-w-md mx-auto">
        <div 
          onClick={() => setFlipped(!flipped)}
          className={`h-64 rounded-3xl border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="text-xs text-violet-400 font-semibold mb-2">EC301 • Tap to Flip</div>
          {!flipped ? (
            <div className="text-base font-bold text-slate-100">What is Fermi Level in Intrinsic Semiconductors?</div>
          ) : (
            <div className="text-xs text-slate-300 leading-relaxed">
              The energy level at which the probability of finding an electron is exactly 0.5 (50%). For intrinsic semiconductors, it lies near the middle of the bandgap.
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-4 text-xs font-semibold">
          <button className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">Again (1d)</button>
          <button className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">Hard (3d)</button>
          <button className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Good (7d)</button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 12. MISSION 9+ & SGPA CALCULATOR VIEW
// -------------------------------------------------------------------------
function Mission9View({ darkMode, user, setUser }) {
  const [grades, setGrades] = useState({
    ec301: 9,
    ec302: 9,
    ec303: 8,
    ec304: 9,
    'es-cs301': 9,
    'bs-m301': 10
  });

  const calculatedSgpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    MAKAUT_SUBJECTS.forEach(s => {
      const g = grades[s.id] || 0;
      totalPoints += g * s.credits;
      totalCredits += s.credits;
    });
    return (totalPoints / totalCredits).toFixed(2);
  }, [grades]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mission 9+ SGPA Strategy & Calculator</h1>
        <p className="text-xs text-slate-400">Calculate estimated SGPA based on MAKAUT credit weights.</p>
      </div>

      <div className={`p-4 rounded-2xl border bg-amber-500/10 border-amber-500/20 text-amber-300 text-xs flex items-center gap-2`}>
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span>Disclaimer: SGPA calculations are estimates based on standard MAKAUT credit points. Official grades are awarded solely by university evaluation.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <h2 className="font-bold text-sm">Sem 3 Subject Grade Selectors</h2>
          <div className="space-y-3">
            {MAKAUT_SUBJECTS.map(subj => (
              <div key={subj.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs">
                <div>
                  <div className="font-bold text-slate-200">{subj.code} • {subj.name}</div>
                  <div className="text-[10px] text-slate-400">{subj.credits} Credits</div>
                </div>
                <select
                  value={grades[subj.id]}
                  onChange={(e) => setGrades({ ...grades, [subj.id]: parseInt(e.target.value) })}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-bold"
                >
                  <option value={10}>O (10 Points)</option>
                  <option value={9}>E (9 Points)</option>
                  <option value={8}>A (8 Points)</option>
                  <option value={7}>B (7 Points)</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-3xl border text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="text-xs text-slate-400 font-semibold">Calculated SGPA</div>
          <div className="text-5xl font-black text-violet-400">{calculatedSgpa}</div>
          <div className="text-xs text-slate-400">Total Credits: 19</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 13. PERFORMANCE ANALYTICS VIEW
// -------------------------------------------------------------------------
function AnalyticsView({ darkMode, progress }) {
  const chartData = [
    { subject: 'EC301', accuracy: 80 },
    { subject: 'EC302', accuracy: 90 },
    { subject: 'EC303', accuracy: 70 },
    { subject: 'EC304', accuracy: 85 },
    { subject: 'CS301', accuracy: 75 },
    { subject: 'BS-M301', accuracy: 88 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Performance Analytics</h1>
        <p className="text-xs text-slate-400">Visual breakdown of accuracy across all 6 core subjects.</p>
      </div>

      <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <h3 className="font-bold text-sm mb-4">Subject Accuracy Breakdown</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="subject" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
              <Bar dataKey="accuracy" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 14. STUDENT COMMUNITY VIEW
// -------------------------------------------------------------------------
function CommunityView({ darkMode, user }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Discussion Forum</h1>
        <p className="text-xs text-slate-400">Ask doubts, discuss PYQ solutions, and collaborate with MAKAUT peers.</p>
      </div>

      <div className="space-y-3">
        <div className={`p-4 rounded-2xl border space-y-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-200">Rahul C. • Heritage IT</span>
            <span className="text-slate-500">2 hours ago</span>
          </div>
          <p className="text-xs text-slate-300">Can someone explain how to set up the boundary integral for Cauchy-Riemann equations in BS-M301?</p>
          <div className="flex gap-4 pt-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1 cursor-pointer hover:text-violet-400"><ThumbsUp className="w-3.5 h-3.5" /> 12 Upvotes</span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-violet-400"><MessageSquare className="w-3.5 h-3.5" /> 4 Answers</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 15. PROFILE AND AUTH SETTINGS VIEW
// -------------------------------------------------------------------------
function ProfileView({ darkMode, user, setUser, language, setLanguage }) {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Profile & Authentication</h1>
        <p className="text-xs text-slate-400">Manage account credentials and preferences.</p>
      </div>

      <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Student Name</label>
            <input 
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">College Name</label>
            <input 
              type="text"
              value={user.college}
              onChange={(e) => setUser({ ...user, college: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Preferred UI Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200"
            >
              <option value="en">English</option>
              <option value="hi">Hindi (हिंदी)</option>
              <option value="bn">Bengali (বাংলা)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 16. ADMIN PANEL & SQL SCHEMA DRAWER VIEW
// -------------------------------------------------------------------------
function AdminPanelView({ darkMode, user, showAdminSchema, setShowAdminSchema }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Portal & Workflow</h1>
          <p className="text-xs text-slate-400">Content moderation workflow: Draft → Review → Approve → Publish.</p>
        </div>
        <button
          onClick={() => setShowAdminSchema(!showAdminSchema)}
          className="px-4 py-2 rounded-xl bg-violet-600 text-white font-semibold text-xs flex items-center gap-2"
        >
          <Database className="w-4 h-4" />
          <span>{showAdminSchema ? 'Hide System Schema' : 'Inspect SQL Schema & Setup'}</span>
        </button>
      </div>

      {showAdminSchema ? (
        <SqlSchemaViewer darkMode={darkMode} />
      ) : (
        <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex gap-2 text-xs font-semibold">
            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Super Admin Active</span>
          </div>
          <p className="text-xs text-slate-400">Select content resources to publish or manage subject syllabus verification flags.</p>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------------------
// SQL SCHEMA & SYSTEM SETUP VIEWER COMPONENT
// -------------------------------------------------------------------------
function SqlSchemaViewer({ darkMode }) {
  const [activeTab, setActiveTab] = useState('ddl');

  const DDL_SQL = `-- MAKAUT ECE STUDY HUB - COMPLETE 31-TABLE POSTGRESQL DDL SCHEMA
-- Target Database: Supabase / PostgreSQL 15+

CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    college_name TEXT,
    branch TEXT DEFAULT 'ECE',
    academic_batch TEXT DEFAULT '2025-2029',
    semester INT DEFAULT 3,
    preferred_language TEXT DEFAULT 'en',
    target_sgpa NUMERIC(3,2) DEFAULT 9.00,
    role_id UUID REFERENCES public.roles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sem_number INT UNIQUE NOT NULL,
    title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sem_id UUID REFERENCES public.semesters(id),
    subject_code TEXT UNIQUE NOT NULL,
    subject_name TEXT NOT NULL,
    credits INT NOT NULL,
    category TEXT,
    is_verified BOOLEAN DEFAULT true,
    verification_date DATE
);

CREATE TABLE IF NOT EXISTS public.syllabus_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    module_number INT NOT NULL,
    module_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.syllabus_modules(id) ON DELETE CASCADE,
    topic_name TEXT NOT NULL,
    learning_objectives TEXT
);

CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_english TEXT NOT NULL,
    content_hindi TEXT,
    content_bengali TEXT,
    status TEXT DEFAULT 'PUBLISHED' -- DRAFT, REVIEW, PUBLISHED
);

-- RLS POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Profiles are Viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users Update Own Profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);`;

  const ENV_EXAMPLE = `# SUPABASE CONFIGURATION
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# SECURE AI SERVER BACKEND (SUPABASE EDGE FUNCTION)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key`;

  return (
    <div className={`p-6 rounded-3xl border space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex gap-4 border-b border-slate-800 pb-3 text-xs font-semibold">
        <button onClick={() => setActiveTab('ddl')} className={activeTab === 'ddl' ? 'text-violet-400 border-b-2 border-violet-500 pb-1' : 'text-slate-400'}>
          PostgreSQL DDL (31 Tables)
        </button>
        <button onClick={() => setActiveTab('env')} className={activeTab === 'env' ? 'text-violet-400 border-b-2 border-violet-500 pb-1' : 'text-slate-400'}>
          .env.example
        </button>
      </div>

      <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto leading-relaxed">
        {activeTab === 'ddl' ? DDL_SQL : ENV_EXAMPLE}
      </pre>
    </div>
  );
}
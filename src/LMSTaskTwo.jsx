import React, { useState, useEffect } from "react";
import "./LMSTaskTwo.css";

// 9 Required Courses with Curated Imagery
const INITIAL_COURSES = [
  {
    id: "course-cybersecurity",
    title: "Cyber Security Fundamentals & Defense",
    category: "Cyber Security",
    instructor: "Virat Kohli",
    duration: "2 hrs",
    image: "https://as2.ftcdn.net/v2/jpg/05/68/02/75/1000_F_568027558_58uCIhAarH07pCbL4ofGjMcSokkjVj84.jpg",
    lessonsCount: 3,
    description: "End-to-end security foundations covering threat models, penetration testing methodologies, OWASP Top 10 vulnerabilities, and blue-team defense.",
    lessons: [
      { id: "cs-1", title: "1. Security Fundamentals & Threat Vectors", duration: "32:27 mins", videoUrl: "https://www.youtube.com/embed/mF0KfOrQWFg", content: "Understanding CIA Triad, zero-trust architectures, authentication protocols, and common threat vectors." },
      { id: "cs-2", title: "2. Penetration Testing & OWASP Top 10", duration: "1:09:17 mins", videoUrl: "https://www.youtube.com/embed/-Q3wUMOFsio", content: "Vulnerability analysis, identifying SQL injection, cross-site scripting (XSS), and privilege escalations." },
      { id: "cs-3", title: "3. Incident Response & Malware Analysis", duration: "9:10 mins", videoUrl: "https://www.youtube.com/embed/FVFkaXDj2fM", content: "Static and dynamic malware analysis basics, SIEM log monitoring, and threat triage workflows." }
    ],
    quiz: [
      { id: "q1", question: "What are the three pillars of the CIA Triad in information security?", options: ["Confidentiality, Integrity, Availability", "Control, Identity, Authentication", "Cryptography, Inspection, Access", "Cloud, Infrastructure, Automation"], answer: 0 },
      { id: "q2", question: "Which attack vector involves tricking a server into executing attacker-supplied database queries?", options: ["Cross-Site Scripting (XSS)", "SQL Injection (SQLi)", "Man-in-the-Middle (MitM)", "SYN Flood"], answer: 1 }
    ]
  },
  {
    id: "course-aiml",
    title: "Artificial Intelligence & Machine Learning (AIML)",
    category: "AI & ML",
    instructor: "Rohit Sharma",
    duration: "2 hrs",
    image: "https://www.linkit.nl/app/uploads/2024/11/156560bd-b522-4ef1-b29c-d75c1cb44956.webp",
    lessonsCount: 3,
    description: "Build intelligent systems: supervised learning, neural network architectures, model training, feature engineering, and LLM fine-tuning.",
    lessons: [
      { id: "ai-1", title: "1. ML Foundations & Data Preprocessing", duration: "22:34 mins", videoUrl: "https://www.youtube.com/embed/HmneufrBDuY", content: "Handling missing data, normalization, categorical encoding, and feature extraction with Scikit-Learn." },
      { id: "ai-2", title: "2. Supervised & Unsupervised Learning with Reinforcement", duration: "19:25 mins", videoUrl: "https://www.youtube.com/embed/xtOg44r6dsE", content: "Linear/Logistic regression, Decision Trees, Random Forests, and K-Means clustering." },
      { id: "ai-3", title: "3. Deep Neural Networks & PyTorch", duration: "1:02:49 mins", videoUrl: "https://www.youtube.com/embed/r1bquDz5GGA", content: "Backpropagation, gradient descent optimizers, activation functions, and building PyTorch pipelines." }
    ],
    quiz: [
      { id: "q1", question: "What technique prevents overfitting in deep neural networks?", options: ["Zero padding", "Dropout and Regularization", "Increasing learning rate arbitrarily", "Removing training epochs"], answer: 1 },
      { id: "q2", question: "Which algorithm is suitable for clustering unlabeled data?", options: ["Support Vector Machine", "Logistic Regression", "K-Means Clustering", "Linear Regression"], answer: 2 }
    ]
  },
  {
    id: "course-frontend",
    title: "Front End Engineering & React",
    category: "Front End",
    instructor: "Kane Williamson",
    duration: "3 hrs",
    image: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1708541275/catalog/1555997542956724224/p9wp3l8imfsvram59pry.webp",
    lessonsCount: 3,
    description: "Responsive layouts, semantic HTML5/CSS3, JavaScript ES6+, React component lifecycle, custom hooks, and Vite bundling.",
    lessons: [
      { id: "fe-1", title: "1. Advanced Modern JavaScript & DOM Mechanics", duration: "3:35 mins", videoUrl: "https://www.youtube.com/embed/o68eZs-Jf9k", content: "Closures, Event Loop, Promises, Async/Await, and modern DOM manipulations." },
      { id: "fe-2", title: "2. React State Architecture & Hooks", duration: "8:06 mins", videoUrl: "https://www.youtube.com/embed/V9i3cGD-mts", content: "Mastering useState, useEffect, useMemo, custom hooks, and unidirectional data flow." },
      { id: "fe-3", title: "3. Responsive Design & Component Systems", duration: "8:35 mins", videoUrl: "https://www.youtube.com/embed/76Kt2Iv5ur0", content: "Building clean UI design systems, responsive Flexbox/Grid layouts, and CSS variable theming." }
    ],
    quiz: [
      { id: "q1", question: "In React, what purpose does the key attribute serve when mapping lists?", options: ["Controls CSS animation timing", "Helps React identify which items have changed, added, or removed", "Stores component local state", "Encrypts item identifiers"], answer: 1 },
      { id: "q2", question: "Which CSS property enables a responsive flexible box layout?", options: ["display: flex;", "float: left;", "position: sticky;", "overflow: hidden;"], answer: 0 }
    ]
  },
  {
    id: "course-backend",
    title: "Back End Web Architecture & Microservices",
    category: "Back End",
    instructor: "Hashim Amla",
    duration: "2 hrs",
    image: "https://content-media-cdn.codefinity.com/articles/8e21f632-4741-4a88-9bba-ab79f9ae7b98/backend.png",
    lessonsCount: 3,
    description: "RESTful API creation, database design with PostgreSQL & MongoDB, authentication with JWT, caching via Redis, and Docker deployment.",
    lessons: [
      { id: "be-1", title: "1. RESTful API Design & HTTP Protocols", duration: "5:21 mins", videoUrl: "https://www.youtube.com/embed/-mN3VyJuCjM", content: "HTTP methods, status codes, request/response headers, rate limiting, and input validation." },
      { id: "be-2", title: "2. Relational Database Modeling & ORMs", duration: "8:49 mins", videoUrl: "https://www.youtube.com/embed/EwpT466EyP4", content: "Schema design, normalization, foreign keys, indexing for fast queries, and connection pools." },
      { id: "be-3", title: "3. JWT Authentication & Middleware Security", duration: "14:46 mins", videoUrl: "https://www.youtube.com/embed/CELcrLHQmZs", content: "Secure token generation, password hashing with bcrypt, and role-based access control (RBAC)." }
    ],
    quiz: [
      { id: "q1", question: "Which HTTP status code signifies that a resource was successfully created?", options: ["200 OK", "201 Created", "204 No Content", "400 Bad Request"], answer: 1 },
      { id: "q2", question: "Where should cryptographic salts be applied during authentication?", options: ["Prior to hashing the password", "Inside the HTTP cookie header", "Inside the database index", "Directly on the frontend DOM"], answer: 0 }
    ]
  },
  {
    id: "course-python",
    title: "Python Programming: Automation & Backend",
    category: "Python",
    instructor: "Josh Hazlewood",
    duration: "2 hrs",
    image: "https://tse3.mm.bing.net/th/id/OIP.ij-wZlaLqb_d-ejhCkrxlgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    lessonsCount: 3,
    description: "Comprehensive Python from core syntax, data structures, OOP paradigms, file handling, web scraping, to building backend automation scripts.",
    lessons: [
      { id: "py-1", title: "1. Python Data Structures & Core Idioms", duration: "39:58 mins", videoUrl: "https://www.youtube.com/embed/m9n2f9lhtrw", content: "Lists, tuples, sets, dictionaries, list comprehensions, and generators." },
      { id: "py-2", title: "2. Object-Oriented Python & Modularity", duration: "7:34 mins", videoUrl: "https://www.youtube.com/embed/pTB0EiLXUC8", content: "Classes, inheritance, dunder methods, exceptions, and packaging modules." },
      { id: "py-3", title: "3. Automated Scripting & Web Scraping", duration: "14:14 mins", videoUrl: "https://www.youtube.com/embed/XysysUqJryE", content: "Building automation CLI tools using Requests, BeautifulSoup, and OS system interfaces." }
    ],
    quiz: [
      { id: "q1", question: "What is an immutable data type in Python?", options: ["List", "Dictionary", "Tuple", "Set"], answer: 2 },
      { id: "q2", question: "Which keyword creates an anonymous inline function in Python?", options: ["def", "lambda", "inline", "function"], answer: 1 }
    ]
  },
  {
    id: "course-java",
    title: "Core Java & Object-Oriented System Design",
    category: "Java",
    instructor: "Jason Holder",
    duration: "4 hrs",
    image: "https://tse4.mm.bing.net/th/id/OIP.G_YzdpDITwf05CNR85AhpAHaEO?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    lessonsCount: 3,
    description: "Enterprise Java fundamentals: JVM memory mechanics, Collections framework, Multi-threading, Design patterns, and Spring Boot basics.",
    lessons: [
      { id: "jv-1", title: "1. Java Syntax, JVM & Memory Management", duration: "11:49 mins", videoUrl: "https://www.youtube.com/embed/hv0zdiEN6_s", content: "Stack vs Heap memory, garbage collection algorithms, and bytecode compilation." },
      { id: "jv-2", title: "2. Java Collections & Generics", duration: "17:34 mins", videoUrl: "https://www.youtube.com/embed/K1iu1kXkVoA", content: "ArrayList, LinkedList, HashMap collision handling, Comparable vs Comparator." },
      { id: "jv-3", title: "3. Concurrency, Threads & Executors", duration: "10:12 mins", videoUrl: "https://www.youtube.com/embed/6Oo-9Can3H8", content: "Thread life cycle, synchronized blocks, volatile keywords, and ExecutorService thread pools." }
    ],
    quiz: [
      { id: "q1", question: "Where are Java object instances allocated at runtime?", options: ["Stack memory", "Heap memory", "Register file", "Code cache"], answer: 1 },
      { id: "q2", question: "Which collection class guarantees insertion order?", options: ["HashSet", "TreeSet", "LinkedHashSet", "HashMap"], answer: 2 }
    ]
  },
  {
    id: "course-networking",
    title: "Computer Networking & Protocol Analysis",
    category: "Computer Networking",
    instructor: "David Miller",
    duration: "3 hrs",
    image: "https://tse3.mm.bing.net/th/id/OIP.LjnT-fsa4-YeEh0xBr85BwHaFP?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    lessonsCount: 3,
    description: "OSI and TCP/IP stack inspection, routing protocols, DNS resolution, subnetting CIDR, and Wireshark packet capture analysis.",
    lessons: [
      { id: "cn-1", title: "1. OSI Model & TCP/IP Protocol Suite", duration: "12:04 mins", videoUrl: "https://www.youtube.com/embed/CRdL1PcherM", content: "Layer responsibilities, framing, encapsulation, and port multiplexing." },
      { id: "cn-2", title: "2. IPv4/IPv6 Subnetting & CIDR Calculations", duration: "38:19 mins", videoUrl: "https://www.youtube.com/embed/qulRjRFavJI", content: "Bitwise masks, calculating network/broadcast addresses, and VLSM design." },
      { id: "cn-3", title: "3. TCP Handshakes & Packet Analysis", duration: "13:53 mins", videoUrl: "https://www.youtube.com/embed/HCHFX5O1IaQ", content: "Three-way handshake (SYN, SYN-ACK, ACK), window size throttling, and Wireshark filters." }
    ],
    quiz: [
      { id: "q1", question: "What layer of the OSI model does an IP router primarily function on?", options: ["Layer 2 (Data Link)", "Layer 3 (Network)", "Layer 4 (Transport)", "Layer 7 (Application)"], answer: 1 },
      { id: "q2", question: "How many usable host IP addresses are available in a /28 subnet?", options: ["16", "14", "30", "6"], answer: 1 }
    ]
  },
  {
    id: "course-aws",
    title: "AWS Cloud Solutions & DevOps Infrastructure",
    category: "AWS",
    instructor: "Trent Boult",
    duration: "4 hrs",
    image: "https://www.pngmart.com/files/23/Aws-PNG-Pic.png",
    lessonsCount: 3,
    description: "Hands-on cloud engineering with AWS: EC2 compute, S3 storage, RDS databases, VPC isolation, IAM policies, and CloudWatch metrics.",
    lessons: [
      { id: "aws-1", title: "1. IAM Security Policies & VPC Network Setup", duration: "35:41 mins", videoUrl: "https://www.youtube.com/embed/43tIX7901Gs", content: "Least-privilege roles, multi-factor authentication, subnets, NAT gateways, and security groups." },
      { id: "aws-2", title: "2. EC2 Provisioning, Auto Scaling & ALBs", duration: "26:00 mins", videoUrl: "https://www.youtube.com/embed/VfatXrwxakE", content: "Launch templates, target groups, elastic load balancers, and dynamic scaling policies." },
      { id: "aws-3", title: "3. S3 Bucket Security & Serverless Lambda", duration: "35:13 mins", videoUrl: "https://www.youtube.com/embed/7GoA4lnyCrw", content: "Object storage lifecycle rules, CloudFront CDN integration, and event-driven Lambda execution." }
    ],
    quiz: [
      { id: "q1", question: "Which AWS service is best suited for serverless, event-driven compute?", options: ["Amazon EC2", "AWS Lambda", "Amazon RDS", "AWS Elastic Beanstalk"], answer: 1 },
      { id: "q2", question: "What is used to securely delegate permissions to AWS resources without embedding static credentials?", options: ["IAM Roles", "Access Keys in code", "Public S3 Buckets", "VPC Peering"], answer: 0 }
    ]
  },
  {
    id: "course-crypto",
    title: "Cryptography & Network Security",
    category: "Cryptography & Network Security",
    instructor: "Steve Smith",
    duration: "6 hrs",
    image: "https://miro.medium.com/v2/resize:fit:1358/1*q-DV3gw6C-RWUInGreOkIA.png",
    lessonsCount: 3,
    description: "Mathematical principles of modern cryptography: symmetric/asymmetric algorithms, digital signatures, SSL/TLS handshakes, and PKI infrastructure.",
    lessons: [
      { id: "cr-1", title: "1. Symmetric & Asymmetric Encryption Mechanics", duration: "4:40 mins", videoUrl: "https://www.youtube.com/embed/AQDCe585Lnc", content: "AES block ciphers, Diffie-Hellman key exchange, and RSA public-key cryptosystems." },
      { id: "cr-2", title: "2. Hash Functions, MACs & Digital Signatures", duration: "10:25 mins", videoUrl: "https://www.youtube.com/embed/EcGmQjl6XEo", content: "SHA-256 properties, collision resistance, HMAC verification, and non-repudiation." },
      { id: "cr-3", title: "3. SSL/TLS Handshakes & PKI Architecture", duration: "6:31 mins", videoUrl: "https://www.youtube.com/embed/hExRDVZHhig", content: "Certificate Authorities, X.509 certificates, TLS 1.3 protocol flows, and session key derivation." }
    ],
    quiz: [
      { id: "q1", question: "Which key is used to create a digital signature that anyone can verify?", options: ["The sender's public key", "The sender's private key", "The recipient's public key", "A pre-shared symmetric key"], answer: 1 },
      { id: "q2", question: "What mathematical problem underpins the security of standard RSA encryption?", options: ["Discrete logarithm problem", "Prime factorization of large numbers", "Travelling salesperson problem", "Elliptic curve matrix addition"], answer: 1 }
    ]
  }
];

const CATEGORIES = [
  "All",
  "Cyber Security",
  "AI & ML",
  "Front End",
  "Back End",
  "Python",
  "Java",
  "Computer Networking",
  "AWS",
  "Cryptography & Network Security",
  "Salesforce",
  "Data Analyst"
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userRole, setUserRole] = useState("student");

  // Pure React state guarantees immediate UI updates when code changes
  const [courses, setCourses] = useState(INITIAL_COURSES);

  // User interactions stored in localStorage
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("apex_enrolled_user");
      return saved ? JSON.parse(saved) : ["course-cybersecurity", "course-frontend", "course-aws"];
    } catch {
      return ["course-cybersecurity", "course-frontend", "course-aws"];
    }
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = localStorage.getItem("apex_lessons_user");
      return saved ? JSON.parse(saved) : { "course-cybersecurity": ["cs-1"], "course-frontend": ["fe-1", "fe-2"] };
    } catch {
      return { "course-cybersecurity": ["cs-1"], "course-frontend": ["fe-1", "fe-2"] };
    }
  });

  const [quizScores, setQuizScores] = useState(() => {
    try {
      const saved = localStorage.getItem("apex_scores_user");
      return saved ? JSON.parse(saved) : { "course-frontend": 100 };
    } catch {
      return { "course-frontend": 100 };
    }
  });

  const [selectedCourseId, setSelectedCourseId] = useState("course-cybersecurity");
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newCourseForm, setNewCourseForm] = useState({
    title: "",
    category: "Salesforce",
    instructor: "Jasprit Bumrah",
    duration: "3 hrs",
    image: "https://th.bing.com/th/id/OIP.8cVvfRa7ttYLc-DaFnrO5gHaE4?w=251&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    description: ""
  });

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("apex_enrolled_user", JSON.stringify(enrolledCourses));
    } catch (err) {
      console.warn("Storage write failed", err);
    }
  }, [enrolledCourses]);

  useEffect(() => {
    try {
      localStorage.setItem("apex_lessons_user", JSON.stringify(completedLessons));
    } catch (err) {
      console.warn("Storage write failed", err);
    }
  }, [completedLessons]);

  useEffect(() => {
    try {
      localStorage.setItem("apex_scores_user", JSON.stringify(quizScores));
    } catch (err) {
      console.warn("Storage write failed", err);
    }
  }, [quizScores]);

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const calculateProgress = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || !course.lessons.length) return 0;
    const completed = completedLessons[courseId] || [];
    return Math.round((completed.length / course.lessons.length) * 100);
  };

  const handleEnroll = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
    }
    setSelectedCourseId(courseId);
    setActiveTab("details");
  };

  const toggleLessonComplete = (courseId, lessonId) => {
    const currentList = completedLessons[courseId] || [];
    const isDone = currentList.includes(lessonId);
    const updated = isDone ? currentList.filter((id) => id !== lessonId) : [...currentList, lessonId];
    setCompletedLessons({ ...completedLessons, [courseId]: updated });
  };

  const handleOpenViewer = (courseId, lessonIdx = 0) => {
    setSelectedCourseId(courseId);
    setActiveLessonIndex(lessonIdx);
    setActiveTab("viewer");
  };

  const handleQuizSubmit = () => {
    if (!currentCourse.quiz) return;
    let correctCount = 0;
    currentCourse.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / currentCourse.quiz.length) * 100);
    setQuizScores({ ...quizScores, [currentCourse.id]: finalScore });
    setQuizSubmitted(true);
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseForm.title) return;
    const created = {
      id: `course-${Date.now()}`,
      title: newCourseForm.title,
      category: newCourseForm.category,
      instructor: newCourseForm.instructor,
      duration: newCourseForm.duration,
      image: newCourseForm.image || "https://th.bing.com/th/id/OIP.dZAejiUCb4Y9vj_qsY4f1AHaEJ?w=293&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      lessonsCount: 2,
      description: newCourseForm.description || "Course details coming soon.",
      lessons: [
        { id: "l1", title: "1. Core Overview & Architecture", duration: "30 mins", videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk", content: "Introductory module covering foundational topics." },
        { id: "l2", title: "2. Practical Lab Implementation", duration: "45 mins", videoUrl: "https://www.youtube.com/embed/6ThXsUwLWvc", content: "Hands-on implementation and exercises." }
      ],
      quiz: [
        { id: "q1", question: "Did you complete all review exercises?", options: ["Yes, fully verified", "Needs more review"], answer: 0 }
      ]
    };
    setCourses([created, ...courses]);
    setIsAddCourseOpen(false);
    setNewCourseForm({ title: "", category: "Salesforce", instructor: "Sriperam Murali", duration: "2 hrs", image: "https://th.bing.com/th/id/OIP.8cVvfRa7ttYLc-DaFnrO5gHaE4?w=251&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "" });
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
    setEnrolledCourses(enrolledCourses.filter((eId) => eId !== id));
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="applicationWrapper">
      {/* ---------------- NAVIGATION ---------------- */}
      <header className="navigationBar">
        <div className="siteLogo" onClick={() => setActiveTab("dashboard")}>
          <div className="logoBadge">🎓</div>
          <span>REAL WORLD TECH LEARNING</span>
        </div>

        <nav className="menuLinks">
          <button className={`menuButton ${activeTab === "dashboard" ? "activeMenuButton" : ""}`} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
          <button className={`menuButton ${activeTab === "catalogue" ? "activeMenuButton" : ""}`} onClick={() => setActiveTab("catalogue")}>All Courses ({courses.length})</button>
          <button className={`menuButton ${activeTab === "mycourses" ? "activeMenuButton" : ""}`} onClick={() => setActiveTab("mycourses")}>My Courses ({enrolledCourses.length})</button>
          <button className={`menuButton ${activeTab === "profile" ? "activeMenuButton" : ""}`} onClick={() => setActiveTab("profile")}>Student Profile</button>
          {userRole === "admin" && (
            <button className={`menuButton ${activeTab === "admin" ? "activeMenuButton" : ""}`} onClick={() => setActiveTab("admin")}>Admin Console</button>
          )}
        </nav>

        <div className="roleSwitchContainer">
          <div className="roleToggleBox">
            <button className={`roleOptionButton ${userRole === "student" ? "activeRoleOption" : ""}`} onClick={() => setUserRole("student")}>Learner</button>
            <button className={`roleOptionButton ${userRole === "admin" ? "activeRoleOption" : ""}`} onClick={() => setUserRole("admin")}>Admin</button>
          </div>
        </div>
      </header>

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <main className="mainContainer">
        {/* MODULE 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <section>
            <div className="welcomeBanner">
              <div className="bannerText">
                <h2>Welcome Back, Devapuja YugaRaja Vamsi</h2>
                <p>Track your Real-Time Progress Across All Engineering Courses.</p>
              </div>
              <button className="actionBtn primaryActionBtn" onClick={() => setActiveTab("catalogue")}>Browse All Courses</button>
            </div>

            <div className="statisticsGrid">
              <div className="statCard">
                <span className="statCardTitle">Active Enrollments</span>
                <div className="statCardNumber">{enrolledCourses.length}</div>
                <div className="statCardNote">Out of {courses.length} courses</div>
              </div>
              <div className="statCard">
                <span className="statCardTitle">Completed Lessons</span>
                <div className="statCardNumber">
                  {Object.values(completedLessons).reduce((acc, curr) => acc + curr.length, 0)}
                </div>
                <div className="statCardNote">Live Progress Tracker</div>
              </div>
              <div className="statCard">
                <span className="statCardTitle">Verified Badges</span>
                <div className="statCardNumber">{Object.keys(quizScores).length}</div>
                <div className="statCardNote">100% Passed</div>
              </div>
            </div>

            <div className="headerSection">
              <h2 className="headerTitle">Enrolled Courses</h2>
              <p className="headerSubtitle">Resume the course where you left exactly</p>
            </div>

            <div className="courseGrid">
              {enrolledCourses.map((id) => {
                const c = courses.find((x) => x.id === id);
                if (!c) return null;
                const prog = calculateProgress(c.id);
                return (
                  <div key={c.id} className="courseCard">
                    <div className="cardImageHolder">
                      <img src={c.image} alt={c.title} className="cardCoverImage" />
                      <div className="cardImageOverlay" />
                      <span className="categoryPill">{c.category}</span>
                    </div>
                    <div className="cardDetails">
                      <span className="cardInstructorLine">{c.duration} • {c.instructor}</span>
                      <h3 className="cardCourseTitle">{c.title}</h3>
                      <div className="progressBarWrapper">
                        <div className="progressLabelGroup">
                          <span>Completion Progress</span>
                          <span>{prog}%</span>
                        </div>
                        <div className="progressTrack">
                          <div className="progressFillBar" style={{ width: `${prog}%` }}></div>
                        </div>
                      </div>
                      <button className="actionBtn primaryActionBtn fullWidthBtn" onClick={() => handleOpenViewer(c.id, 0)}>Resume Learning</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* MODULE 2: CATALOGUE */}
        {activeTab === "catalogue" && (
          <section>
            <div className="headerSection">
              <h2 className="headerTitle">Engineers All Courses Menu :</h2>
              <p className="headerSubtitle">Comprehensive visual tracks across Cyber Security, AIML, Cloud, Full Stack, and Systems</p>
            </div>

            <div className="searchToolbar">
              <input
                type="text"
                className="searchInputBox"
                placeholder="Search Cyber Security, AIML, AWS, Python, Java..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="categoryButtonGroup">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`categoryFilterBtn ${selectedCategory === cat ? "activeCategoryFilterBtn" : ""}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="courseGrid">
              {filteredCourses.map((c) => {
                const isEnrolled = enrolledCourses.includes(c.id);
                return (
                  <div key={c.id} className="courseCard">
                    <div className="cardImageHolder">
                      <img src={c.image} alt={c.title} className="cardCoverImage" />
                      <div className="cardImageOverlay" />
                      <span className="categoryPill">{c.category}</span>
                    </div>
                    <div className="cardDetails">
                      <span className="cardInstructorLine">{c.duration} • {c.lessons.length} Modules</span>
                      <h3 className="cardCourseTitle">{c.title}</h3>
                      <p className="cardDescription">{c.description}</p>
                      <div className="cardFooterMeta">
                        <span>Lead: {c.instructor}</span>
                      </div>
                      {isEnrolled ? (
                        <button className="actionBtn secondaryActionBtn fullWidthBtn" onClick={() => { setSelectedCourseId(c.id); setActiveTab("details"); }}>
                          View Curriculum
                        </button>
                      ) : (
                        <button className="actionBtn primaryActionBtn fullWidthBtn" onClick={() => handleEnroll(c.id)}>
                          Enroll in Track
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* MODULE 3: DETAILS */}
        {activeTab === "details" && currentCourse && (
          <section>
            <button className="actionBtn secondaryActionBtn" style={{ marginBottom: "20px" }} onClick={() => setActiveTab("catalogue")}>← Back to Menu</button>
            
            <div className="courseHeroBanner">
              <img src={currentCourse.image} alt={currentCourse.title} />
              <div className="heroContentOverlay">
                <span className="categoryPill" style={{ position: "static", width: "fit-content", marginBottom: "8px" }}>{currentCourse.category}</span>
                <h1 style={{ color: "#FFFFFF", fontSize: "32px", fontWeight: 800 }}>{currentCourse.title}</h1>
                <p style={{ color: "#eaeef3", fontSize: "15px" }}>Lead Instructor: {currentCourse.instructor} • Duration: {currentCourse.duration}</p>
              </div>
            </div>

            <div className="studioColumns">
              <div>
                <div className="statCard" style={{ marginBottom: "24px" }}>
                  <h3 style={{ color: "#FFFFFF", marginBottom: "12px" }}>Track Objectives & Syllabus</h3>
                  <p style={{ color: "#eaeef3", fontSize: "16px", lineHeight: "1.6" }}>{currentCourse.description}</p>
                </div>

                <div className="statCard">
                  <h3 style={{ color: "#FFFFFF", marginBottom: "16px" }}>Curriculum Modules</h3>
                  {currentCourse.lessons.map((lesson, idx) => {
                    const isDone = (completedLessons[currentCourse.id] || []).includes(lesson.id);
                    return (
                      <div key={lesson.id} className={`syllabusRowItem ${isDone ? "completedSyllabusRow" : ""}`} onClick={() => handleOpenViewer(currentCourse.id, idx)}>
                        <div>
                          <strong style={{ color: "#FFFFFF", display: "block" }}>{lesson.title}</strong>
                          <span style={{ fontSize: "13px", color: "#94A3B8" }}>{lesson.duration}</span>
                        </div>
                        <span style={{ color: isDone ? "#6EE7B7" : "#818CF8", fontWeight: 700 }}>
                          {isDone ? "✓ Completed" : "Start →"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="statCard">
                  <h3 style={{ color: "#FFFFFF", marginBottom: "16px" }}>Actions</h3>
                  <button className="actionBtn primaryActionBtn fullWidthBtn" style={{ marginBottom: "12px" }} onClick={() => handleOpenViewer(currentCourse.id, 0)}>Open Course Videos</button>
                  <button className="actionBtn secondaryActionBtn fullWidthBtn" onClick={() => { setActiveTab("quiz"); setQuizSubmitted(false); setQuizAnswers({}); }}>Take Quiz Assessment</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MODULE 4: MY COURSES */}
        {activeTab === "mycourses" && (
          <section>
            <div className="headerSection">
              <h2 className="headerTitle">My Registered Courses</h2>
              <p className="headerSubtitle">Manage enrolled programs and track your progress</p>
            </div>

            <div className="courseGrid">
              {enrolledCourses.map((id) => {
                const c = courses.find((x) => x.id === id);
                if (!c) return null;
                const prog = calculateProgress(c.id);
                return (
                  <div key={c.id} className="courseCard">
                    <div className="cardImageHolder">
                      <img src={c.image} alt={c.title} className="cardCoverImage" />
                      <div className="cardImageOverlay" />
                      <span className="categoryPill">{c.category}</span>
                    </div>
                    <div className="cardDetails">
                      <span className="cardInstructorLine">{c.category}</span>
                      <h3 className="cardCourseTitle">{c.title}</h3>
                      <div className="progressBarWrapper">
                        <div className="progressLabelGroup">
                          <span>Progress</span>
                          <span>{prog}%</span>
                        </div>
                        <div className="progressTrack">
                          <div className="progressFillBar" style={{ width: `${prog}%` }}></div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="actionBtn primaryActionBtn" style={{ flex: 1 }} onClick={() => handleOpenViewer(c.id, 0)}>Continue</button>
                        <button className="actionBtn secondaryActionBtn" onClick={() => { setSelectedCourseId(c.id); setActiveTab("quiz"); setQuizSubmitted(false); }}>Quiz</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* MODULE 5: LESSON VIEWER */}
        {activeTab === "viewer" && currentCourse && (
          <section>
            <div className="headerSection" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <button className="actionBtn secondaryActionBtn" style={{ marginBottom: "8px" }} onClick={() => setActiveTab("details")}>← Back to Course</button>
                <h2 className="headerTitle">{currentCourse.lessons[activeLessonIndex]?.title}</h2>
              </div>
              <span className="categoryPill" style={{ position: "static" }}>Module {activeLessonIndex + 1} of {currentCourse.lessons.length}</span>
            </div>

            <div className="studioColumns">
              <div className="playerCard">
                <div className="videoDisplayScreen">
                  <iframe
                    title="Lesson Player"
                    src={currentCourse.lessons[activeLessonIndex]?.videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="lessonBodyContent">
                  <h3 style={{ color: "#FFFFFF", marginBottom: "8px" }}>Technical Notes & Overview</h3>
                  <p style={{ color: "#eaeef3", fontSize: "15px" }}>{currentCourse.lessons[activeLessonIndex]?.content}</p>

                  <div className="lessonNavigationButtons">
                    <button
                      className="actionBtn secondaryActionBtn"
                      disabled={activeLessonIndex === 0}
                      onClick={() => setActiveLessonIndex(activeLessonIndex - 1)}
                    >
                      ← Previous
                    </button>

                    <button
                      className={`actionBtn ${(completedLessons[currentCourse.id] || []).includes(currentCourse.lessons[activeLessonIndex]?.id) ? "successActionBtn" : "primaryActionBtn"}`}
                      onClick={() => toggleLessonComplete(currentCourse.id, currentCourse.lessons[activeLessonIndex]?.id)}
                    >
                      {(completedLessons[currentCourse.id] || []).includes(currentCourse.lessons[activeLessonIndex]?.id) ? "✓ Completed" : "Mark as Complete"}
                    </button>

                    <button
                      className="actionBtn secondaryActionBtn"
                      disabled={activeLessonIndex === currentCourse.lessons.length - 1}
                      onClick={() => setActiveLessonIndex(activeLessonIndex + 1)}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>

              <div className="curriculumSidebar">
                <h3 style={{ color: "#FFFFFF", marginBottom: "16px" }}>{currentCourse.title}</h3>
                {currentCourse.lessons.map((lesson, idx) => {
                  const isDone = (completedLessons[currentCourse.id] || []).includes(lesson.id);
                  const isCurrent = idx === activeLessonIndex;
                  return (
                    <div
                      key={lesson.id}
                      className={`syllabusRowItem ${isCurrent ? "activeSyllabusRow" : ""} ${isDone ? "completedSyllabusRow" : ""}`}
                      onClick={() => setActiveLessonIndex(idx)}
                    >
                      <div>
                        <strong style={{ color: "#FFFFFF", fontSize: "14px" }}>{lesson.title}</strong>
                        <div style={{ fontSize: "12px", color: "#94A3B8" }}>{lesson.duration}</div>
                      </div>
                      {isDone && <span style={{ color: "#6EE7B7", fontWeight: "bold" }}>✓</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* MODULE 6: QUIZ */}
        {activeTab === "quiz" && currentCourse && (
          <section>
            <div className="assessmentCard">
              <button className="actionBtn secondaryActionBtn" style={{ marginBottom: "20px" }} onClick={() => setActiveTab("details")}>← Back to Course</button>
              <h2 style={{ color: "#FFFFFF", fontSize: "26px", marginBottom: "8px" }}>Knowledge Check: {currentCourse.title}</h2>
              <p style={{ color: "#94A3B8", marginBottom: "26px" }}>Select the correct option to calculate your validation score.</p>

              {!quizSubmitted ? (
                <div>
                  {currentCourse.quiz?.map((q, qIndex) => (
                    <div key={q.id} style={{ marginBottom: "30px" }}>
                      <h3 style={{ color: "#FFFFFF", fontSize: "17px", marginBottom: "16px" }}>{qIndex + 1}. {q.question}</h3>
                      {q.options.map((opt, optIndex) => {
                        const isSelected = quizAnswers[qIndex] === optIndex;
                        return (
                          <div
                            key={optIndex}
                            className={`quizChoiceOption ${isSelected ? "selectedQuizOption" : ""}`}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [qIndex]: optIndex })}
                          >
                            <span style={{ fontWeight: 800 }}>{String.fromCharCode(65 + optIndex)}.</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <button className="actionBtn primaryActionBtn fullWidthBtn" onClick={handleQuizSubmit}>Submit Answers & Grade</button>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "8px" }}>
                    {(quizScores[currentCourse.id] || 0) >= 70 ? "🎉" : "📖"}
                  </div>
                  <h3 style={{ color: "#FFFFFF", fontSize: "28px" }}>Grade: {quizScores[currentCourse.id]}%</h3>
                  <p style={{ color: "#eaeef3", margin: "16px 0 32px" }}>
                    {(quizScores[currentCourse.id] || 0) >= 70
                      ? "Congratulations! You have satisfied the mastery criteria for this module."
                      : "Review the module lessons and attempt the quiz again to qualify for your certificate."}
                  </p>
                  <button className="actionBtn primaryActionBtn" onClick={() => setQuizSubmitted(false)}>Retake Quiz</button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* MODULE 7: PROFILE */}
        {activeTab === "profile" && (
          <section>
            <div className="headerSection">
              <h2 className="headerTitle">Student Profile & Badges</h2>
              <p className="headerSubtitle">Manage credentials and technical certifications</p>
            </div>

            <div className="studioColumns">
              <div className="statCard">
                <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "24px" }}>
                  <div style={{ width: "70px", height: "70px", borderRadius: "50%", backgroundColor: "#4F46E5", display: "grid", placeItems: "center", fontSize: "28px", color: "#FFFFFF", fontWeight: 800, flexShrink: 0 }}>
                    DV
                  </div>
                  <div>
                    <h3 style={{ color: "#FFFFFF", fontSize: "22px" }}>Devapuja YugaRaja Vamsi</h3>
                    <p style={{ color: "#94A3B8" }}>Specialization: Cyber Security</p>
                  </div>
                </div>

                <div className="inputFieldBlock">
                  <label className="inputFieldLabel">Email ID</label>
                  <input className="textInputBox" disabled value="vamsi@gmail.com" />
                </div>
                <div className="inputFieldBlock">
                  <label className="inputFieldLabel">Primary Stack</label>
                  <input className="textInputBox" disabled value="Cyber Security, React, Python, AWS, Networking & Cryptography" />
                </div>
              </div>

              <div className="statCard">
                <h3 style={{ color: "#FFFFFF", marginBottom: "16px" }}>Verified Competency Badges</h3>
                {Object.entries(quizScores).length === 0 ? (
                  <p style={{ color: "#94A3B8" }}>Complete quizzes to earn validated course badges.</p>
                ) : (
                  Object.entries(quizScores).map(([cId, score]) => (
                    <div key={cId} style={{ backgroundColor: "#111827", padding: "14px", borderRadius: "6px", border: "1px solid #374763", marginBottom: "12px" }}>
                      <strong style={{ color: "#FFFFFF", display: "block" }}>{courses.find((x) => x.id === cId)?.title || "Course"}</strong>
                      <span style={{ color: "#6EE7B7", fontSize: "13px" }}>Passed ({score}%)</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* MODULE 8: ADMIN CONSOLE */}
        {activeTab === "admin" && userRole === "admin" && (
          <section>
            <div className="headerSection" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h2 className="headerTitle">Admin Courses Menu</h2>
                <p className="headerSubtitle">Create Learning Modules, Upload media images and manage the courses </p>
              </div>
              <button className="actionBtn primaryActionBtn" onClick={() => setIsAddCourseOpen(true)}>+ Add New Course</button>
            </div>

            <div className="tableContainer">
              <table className="managementTable">
                <thead>
                  <tr>
                    <th>LOGO</th>
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Instructor</th>
                    <th>Lessons</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c.id}>
                      <td style={{ width: "70px" }}>
                        <img src={c.image} alt={c.title} style={{ width: "50px", height: "35px", objectFit: "cover", borderRadius: "4px" }} />
                      </td>
                      <td style={{ fontWeight: 700, color: "#FFFFFF" }}>{c.title}</td>
                      <td><span className="categoryPill" style={{ position: "static" }}>{c.category}</span></td>
                      <td>{c.instructor}</td>
                      <td>{c.lessons.length} modules</td>
                      <td>
                        <button className="actionBtn dangerActionBtn" style={{ padding: "6px 12px", fontSize: "13px" }} onClick={() => handleDeleteCourse(c.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isAddCourseOpen && (
              <div className="modalBackdrop">
                <div className="modalWindow">
                  <h3 style={{ color: "#FFFFFF", fontSize: "22px", marginBottom: "16px" }}>Create New Tech Course</h3>
                  <form onSubmit={handleCreateCourse}>
                    <div className="inputFieldBlock">
                      <label className="inputFieldLabel">Course Title</label>
                      <input
                        className="textInputBox"
                        required
                        value={newCourseForm.title}
                        onChange={(e) => setNewCourseForm({ ...newCourseForm, title: e.target.value })}
                        placeholder="Ex :- Malware Engineering & Binary Theory"
                      />
                    </div>
                    <div className="inputFieldBlock">
                      <label className="inputFieldLabel">Image URL</label>
                      <input
                        className="textInputBox"
                        value={newCourseForm.image}
                        onChange={(e) => setNewCourseForm({ ...newCourseForm, image: e.target.value })}
                        placeholder="https://images.com/..."
                      />
                    </div>
                    <div className="inputFieldBlock">
                      <label className="inputFieldLabel">Category</label>
                      <select
                        className="selectDropdown"
                        value={newCourseForm.category}
                        onChange={(e) => setNewCourseForm({ ...newCourseForm, category: e.target.value })}
                      >
                        {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="inputFieldBlock">
                      <label className="inputFieldLabel">Instructor</label>
                      <input
                        className="textInputBox"
                        value={newCourseForm.instructor}
                        onChange={(e) => setNewCourseForm({ ...newCourseForm, instructor: e.target.value })}
                      />
                    </div>
                    <div className="inputFieldBlock">
                      <label className="inputFieldLabel">Description</label>
                      <textarea
                        className="textAreaBox"
                        rows="3"
                        value={newCourseForm.description}
                        onChange={(e) => setNewCourseForm({ ...newCourseForm, description: e.target.value })}
                        placeholder="Course syllabus and key objectives..."
                      />
                    </div>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end", marginTop: "24px" }}>
                      <button type="button" className="actionBtn secondaryActionBtn" onClick={() => setIsAddCourseOpen(false)}>Cancel</button>
                      <button type="submit" className="actionBtn primaryActionBtn">Save & Publish</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
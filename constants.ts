
import { Service, Testimonial, PricingPlan, ValueItem, ApproachStep, TargetGroup, CorporateClient, FAQCategory, PrivacyPolicy, TermsAndConditions } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Individual Coaching',
    description: 'A dedicated one-on-one space to discover your patterns, reconnect with your true self, and cultivate the inner resources you need to respond with greater intention in life and work. Whether you are navigating a transition or seeking greater clarity, coaching helps you move forward with purpose and confidence.',
    icon: '👤',
    price: 'Book Session'
  },
  {
    id: '2',
    title: 'Group Coaching',
    description: 'A shared space to reflect, learn from one another, and grow in self-awareness, resilience, and authentic connection. Something shifts when people commit to growth together. Perspectives widen. Blind spots surface. And the openness of the group unlocks insight that is hard to reach alone.',
    icon: '👥',
    price: 'Learn More'
  },
  {
    id: '3',
    title: 'Individual Counselling',
    description: 'A safe and confidential space to navigate emotional and relational challenges: including anxiety, stress, low self-esteem, relationship difficulties, and more. Drawing from an integrative therapeutic approach, counselling helps you understand what lies beneath the surface and move toward greater wholeness.',
    icon: '🤝',
    price: 'Book Session'
  },
  {
    id: '8',
    title: 'Couple Counselling',
    description: 'A warm and confidential space for two people to slow down and truly hear one another -  whether you are navigating conflict, disconnection, or a longing for deeper intimacy. Drawing from an integrative approach, couple counselling helps you understand the patterns shaping your relationship and move toward greater closeness and mutual understanding.',
    icon: '💑',
    price: 'Book Session'
  },
  {
    id: '4',
    title: 'Experiential Workshops',
    description: 'More than information. These are hands-on, reflective experiences designed to foster genuine self-awareness, authentic connection, and lasting impact. Participants leave not just with new insights, but changed.',
    icon: '🏗️',
    price: 'Explore'
  },
  {
    id: '5',
    title: 'Team & Organisational Programmes',
    description: 'We work with teams to strengthen communication, deepen collaboration, and cultivate healthier cultures. By helping members understand their patterns and reconnect with shared purpose, we support teams in moving toward ways of working that are more intentional and life-giving.',
    icon: '🏢',
    price: 'Contact Us'
  },
  {
    id: '6',
    title: 'Custom Programmes',
    description: 'Every group has its own story, context, and needs. Our custom programmes are tailored for organisations, faith-based communities, schools, and teams with specific goals. Each programme combines reflection, experiential learning, and practical tools to create meaningful, lasting impact.',
    icon: '🎨',
    price: 'Inquire'
  },
  {
    id: '7',
    title: 'Clinical Supervision',
    description: 'Clinical supervision is a structured and supportive space for counsellors and helping professionals to reflect on their practice. It offers guidance, challenge, and encouragement, helping you grow in competence, self-awareness, and professional identity.',
    icon: '🎓',
    price: 'Apply'
  }  
];

export const VALUES: ValueItem[] = [
  {
    title: 'Authenticity',
    description: 'Real impact begins when you show up as you truly are. Not the version shaped by expectations or roles. Clarity emerges, and growth becomes possible. We hold space for that kind of honesty.'
  },
  {
    title: 'Courage',
    description: 'Looking inward takes more bravery than most people expect. It means slowing down when the world tells you to speed up, and gently facing what is easier to avoid. Every space we create is designed to feel safe and supportive.'
  },
  {
    title: 'Transformation',
    description: 'We are not here for surface-level adjustments. We are here for change that reaches beneath behaviours and patterns, all the way to the root. It doesn\'t just alter what you do. It changes how you see yourself and the world around you.'
  }
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    title: 'Notice what\'s really going on',
    description: 'We help you slow down and see the patterns, habits, and responses that quietly run in the background - in yourself and in your team. Awareness is always the first step.'
  },
  {
    title: 'Reconnect with what matters most',
    description: 'Beneath the noise of roles, expectations, and daily pressures lies something more grounded: your true self and your inner resources. We help you find your way back to that foundation.'
  },
  {
    title: 'Move from autopilot to intention',
    description: 'When you understand what drives you, you gain the freedom to choose differently. We help you take that shift from reactive to purposeful.'
  },
  {
    title: 'Grow in ways that last',
    description: "We're not interested in quick fixes. The transformation we work toward is deep, sustainable, and meaningful, impact that stays with you long after the session ends."
  }
];

export const TARGET_GROUPS: TargetGroup[] = [
  {
    title: 'Professionals & Leaders',
    description: 'Those who want to lead with greater clarity, authenticity, and intentional influence. We create space for inner work that makes outer impact possible.'
  },
  {
    title: 'Teams & Organisations',
    description: 'Teams that want to move beyond surface-level dynamics and build something more meaningful. Stronger communication. Deeper collaboration. We create the conditions for both.'
  },
  {
    title: 'Individuals on a Growth Journey',
    description: 'Anyone ready to pause, reflect, and reconnect with who they truly are. Whether navigating a transition or working through a challenge, this is a space for you.'
  },
  {
    title: 'Counsellors & Coaches',
    description: 'Helping professionals who want to deepen their practice through clinical supervision or experiential, transformational approaches.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Jessica Leong',
    role: 'Campaign Manager at a FINTECH',
    content: 'I am truly grateful for the counselling journey I had with Mylene during a very overwhelming season of burnout at work. Through our sessions, she helped me uncover deeper issues behind my stress and exhaustion, and guided me to rediscover my true identity beyond work and performance. What I appreciated most was how patient, professional, and intentional she was throughout the process. Mylene wasn’t afraid to ask difficult questions, but they were important questions that helped me uncover the real source of my burnout and feelings of overwhelm. Those conversations gave me greater clarity and self-awareness in ways I did not expect.Beyond just listening, she journeyed with me step by step, helping me break things down into small, practical, and actionable steps that felt manageable and sustainable.Her guidance gave me clarity, encouragement, and hope during a difficult period. I’m really glad I decided to kickstart this journey with Mylene, and I would highly recommend her to anyone who feels overwhelmed, burnt out, or stuck.',
    avatar: 'https://picsum.photos/id/64/100/100'
  },
  {
    id: '2',
    name: 'Valerie Kong',
    role: 'Managing Director at an International law firm',
    content: 'It has been wonderful for me and my teenage daughter to work with Mylene. She is very approachable and dedicated. She listens carefully during the session and also follows up post-session so as to help us declutter and prioritise matters to achieve success in relationship matters, mental wellbeing and work/sports performance.',
    avatar: 'https://picsum.photos/id/65/100/100'
  },
 {
    id: 'eugenia',
    name: 'Eugenia Koh',
    role: 'Global Head of Sustainable Finance at an international bank',
    content: "We had Mylene in to conduct a session on overcoming burnout and self awareness as a start of the journey. Mylene’s personable style and authenticity alongside her deep insights on the topic really resonated with me and my fellow colleagues, and over 100 colleagues benefited from her session. She was great at engaging the audience, and also facilitating dialogue with some senior leaders on the topic. For anyone looking for an authentic and knowledgeable speaker or counsellor on the topic, I would recommend having a chat with Mylene!",
    avatar: 'https://picsum.photos/id/66/100/100'
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Starter',
    price: '$120',
    period: 'per session',
    features: ['1-on-1 Counseling', 'Email Support', 'Self-Care Resources'],
  },
  {
    id: 'standard',
    name: 'Wellness Bundle',
    price: '$440',
    period: 'for 4 sessions',
    features: ['4 Weekly Sessions', 'Priority Booking', 'Direct Message Access', 'Personalized Plan'],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Holistic Care',
    price: '$800',
    period: 'for 8 sessions',
    features: ['8 Comprehensive Sessions', '24/7 Crisis Chat', 'Family Consultation', 'Wellness Workshops'],
  }
];

export const CORPORATE_CLIENTS: CorporateClient[] = [
  { 
    name: 'Singapore Management University', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Singapore_Management_University_logo.svg/800px-Singapore_Management_University_logo.svg.png' 
  },
  { 
    name: 'Standard Chartered Bank', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Standard_Chartered_logo_2021.svg/1024px-Standard_Chartered_logo_2021.svg.png' 
  },
  { 
    name: 'Rohde & Schwarz', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Rohde_%26_Schwarz_Logo.svg/1200px-Rohde_%26_Schwarz_Logo.svg.png' 
  },
  { 
    name: 'College of Allied Educators', 
    logo: 'https://cae.edu.sg/wp-content/uploads/2018/10/cae_logo_new.png' 
  },
  { 
    name: 'TCA College', 
    logo: 'https://www.tca.edu.sg/images/TCA-logo.png' 
  },
  { 
    name: 'Bartley Christian Church', 
    logo: 'https://www.bartley.org.sg/images/logo.png' 
  },
  { 
    name: 'St Andrew’s Cathedral', 
    logo: 'https://cathedral.org.sg/images/logo.png' 
  },
  { 
    name: 'Focus on the Family Singapore', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Focus_on_the_Family_logo.svg/1024px-Focus_on_the_Family_logo.svg.png' 
  },
  { 
    name: 'Daughters of Tomorrow', 
    logo: 'https://daughtersoftomorrow.org/wp-content/uploads/2021/04/DOT-Logo-Website-Header.png' 
  },
  { 
    name: 'ISACA', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/ISACA_logo.svg/512px-ISACA_logo.svg.png' 
  }
];

export const FAQS: FAQCategory[] = [
  {
    category: "General",
    items: [
      {
        question: "What does Upworkz Consulting do?",
        answer: "Upworkz Consulting provides counselling, coaching, professional supervision, and corporate training and workshops that support individuals, teams, and organisations in becoming more grounded, self-aware, and relationally effective. Our work is human-centred, experiential, and transformational, creating space for meaningful and sustainable change."
      },
      {
        question: "Who do you work with?",
        answer: [
          "Corporates and organisations",
          "Schools and educational institutions",
          "Counsellors and helping professionals",
          "Leaders and teams",
          "Individuals seeking personal growth and development"
        ]
      },
      {
        question: "What topics do you cover?",
        answer: [
          "Burnout and emotional wellbeing",
          "Anxiety and stress management",
          "Leadership and communication",
          "Team dynamics and workplace relationships",
          "Self-awareness and congruence",
          "Emotional resilience",
          "Imposter syndrome and self-worth",
          "Parenting and family relationships",
          "Career and personal development"
        ]
      },
      {
        question: "What makes your approach different?",
        answer: "Our approach is experiential and relational rather than purely informational. We believe meaningful transformation happens not only through learning concepts, but through reflection, lived experience, and authentic human connection."
      }
    ]
  },
  {
    category: "Clinical Counselling",
    items: [
      {
        question: "What is counselling?",
        answer: "Counselling provides a safe and supportive space to explore emotional struggles and relationship challenges. The process supports greater self-understanding, healing, growth, and healthier ways of coping and relating."
      },
      {
        question: "Who is counselling suitable for?",
        answer: [
          "Feeling overwhelmed, stressed, anxious, or emotionally exhausted",
          "Navigating relationship or family challenges",
          "Struggling with self-worth or identity",
          "Experiencing burnout or emotional fatigue",
          "Seeking personal growth and deeper self-understanding"
        ]
      },
      {
        question: "Are counselling sessions confidential?",
        answer: "Yes. Confidentiality is maintained within professional and ethical guidelines. Exceptions may apply where there are safety concerns or legal obligations."
      },
      {
        question: "How long is a counselling session?",
        answer: "Individual counselling sessions are typically 60 minutes, Couple Counselling sessions are 90 mins unless otherwise arranged."
      },
      {
        question: "How many sessions will I need?",
        answer: "The number of sessions varies depending on each person's goals, needs, and circumstances. Some individuals prefer short-term support, while others may engage in longer-term therapeutic work."
      },
      {
        question: "Is counselling advice-giving?",
        answer: "Counselling is not about giving direct advice. It is a collaborative process that supports individuals in gaining insight, emotional clarity, awareness of patterns, and the capacity to make meaningful choices."
      }
    ]
  },
  {
    category: "Coaching",
    items: [
      {
        question: "What is coaching?",
        answer: "Coaching is a growth-oriented process that helps individuals gain clarity, strengthen self-awareness, navigate challenges, and move intentionally toward personal or professional goals."
      },
      {
        question: "Who is coaching suitable for?",
        answer: [
          "Leaders and managers",
          "Professionals navigating transitions",
          "Individuals seeking personal growth",
          "People wanting greater confidence, clarity, or direction",
          "Those seeking support in leadership, communication, or workplace effectiveness"
        ]
      },
      {
        question: "What is the difference between coaching and counselling?",
        answer: "Counselling often focuses on emotional healing and deeper personal patterns, while coaching focuses on growth, goals, leadership, and forward movement. Depending on individual needs, the two may sometimes overlap."
      },
      {
        question: "Are coaching sessions confidential?",
        answer: "Yes. Coaching conversations are kept confidential within professional and ethical boundaries."
      },
      {
        question: "Do you offer leadership coaching?",
        answer: "Yes. Leadership coaching supports areas such as self-awareness, grounded leadership, communication, emotional resilience, relational effectiveness, and navigating workplace pressure with authenticity."
      }
    ]
  },
  {
    category: "Clinical Supervision",
    items: [
      {
        question: "Do you provide professional supervision?",
        answer: "Yes. We provide supervision for counsellors and helping professionals seeking reflective, ethical, and professional developmental support."
      },
      {
        question: "What is supervision?",
        answer: "Supervision is a reflective process that supports professional growth, ethical practice, and the development of therapeutic presence and effectiveness."
      },
      {
        question: "What approach do you take in supervision?",
        answer: "Our supervision approach is relational, reflective, and growth-oriented. We support supervisees not only in skill development, but also in becoming more grounded, congruent, and aware in their clinical work."
      },
      {
        question: "Is supervision only for difficult cases?",
        answer: "No. Supervision is valuable for ongoing professional development, reflective practice, strengthening self-awareness, and preventing burnout or compassion fatigue."
      }
    ]
  },
  {
    category: "Corporate Training & Workshops",
    items: [
      {
        question: "What kinds of corporate workshops do you provide?",
        answer: [
          "Burnout and emotional wellbeing",
          "Stress and anxiety management",
          "Leadership and communication",
          "Team dynamics and workplace relationships",
          "Emotional resilience",
          "Self-awareness and congruence",
          "Psychological safety",
          "Workplace wellbeing and personal development"
        ]
      },
      {
        question: "Are your workshops customisable?",
        answer: "Yes. Workshops are tailored to the organisation's goals, audience, and desired outcomes."
      },
      {
        question: "What makes your training approach different?",
        answer: "Our workshops are experiential, reflective, and relational. We believe meaningful transformation happens not only through information, but through self-awareness, lived experience, and authentic engagement."
      },
      {
        question: "How long are your workshops?",
        answer: "Workshop durations vary depending on organisational needs, ranging from 1-hour talks to half-day, full-day, or multi-session programmes."
      },
      {
        question: "Are your workshops suitable for corporate environments?",
        answer: "Yes. Our sessions are designed to be professional, practical, and relevant to workplace realities, while also supporting psychological safety."
      },
      {
        question: "Do you offer virtual workshops?",
        answer: "Yes. Workshops and coaching sessions can be conducted both in-person and online."
      },
      {
        question: "What does a typical workshop look like?",
        answer: [
          "Teaching and lecturettes",
          "Reflection exercises",
          "Small group or dyad discussions",
          "Experiential activities",
          "Reflective exercises and guided processes",
          "Group discussion and application"
        ]
      },
      {
        question: "Can you support leadership teams or specific departments?",
        answer: "Yes. We design targeted interventions for leadership teams, HR departments, educators, helping professionals, and specialised groups."
      },
      {
        question: "Do you provide keynote talks or conference sessions?",
        answer: "Yes. We provide keynote talks, conference sessions, panel facilitation, and organisational learning engagements depending on event needs."
      }
    ]
  },
  {
    category: "Booking & Engagement",
    items: [
      {
        question: "How do I know which service is suitable for me?",
        answer: "You may reach out to discuss your needs, and we can explore whether counselling, coaching, supervision, or training would be most appropriate."
      },
      {
        question: "Do you offer online sessions?",
        answer: "Yes. Services may be provided in-person or online depending on the nature of the engagement."
      },
      {
        question: "How can I enquire about your services?",
        answer: "You may contact us through the website enquiry form or email us directly for more information."
      },
      {
        question: "Do you provide proposals or consultation calls?",
        answer: "Yes. We can arrange a consultation call to understand your needs and provide a customised proposal."
      },
      {
        question: "How far in advance should we book?",
        answer: "We recommend booking early to secure preferred dates, especially for larger workshops and corporate engagements."
      }
    ]
  },
  {
    category: "Privacy & Media",
    items: [
      {
        question: "Will participant information be kept private?",
        answer: "Yes. Personal information shared with us is handled responsibly in accordance with our Privacy Policy and professional ethical standards."
      },
      {
        question: "Do you take photographs during workshops?",
        answer: "At times, photographs or videos may be taken during workshops or events for documentation and promotional purposes."
      },
      {
        question: "Will my photo be used on social media or marketing materials?",
        answer: "Photos or videos may be used on our website, social media platforms, or marketing materials. We aim to do so respectfully and appropriately."
      },
      {
        question: "Can participants opt out of photography?",
        answer: "Yes. Participants who prefer not to be photographed may inform the facilitator or organiser before the session."
      }
    ]
  },
  {
    category: "Payment & Policies",
    items: [
      {
        question: "What are your payment terms?",
        answer: "Payment terms will be stated in the proposal provided for each engagement."
      },
      {
        question: "What is your cancellation or rescheduling policy?",
        answer: "Cancellation and rescheduling terms vary depending on the engagement and will be communicated during the booking process."
      },
      {
        question: "Do you travel for workshops?",
        answer: "Yes. We may travel for workshops and trainings depending on the location and scope of the engagement."
      }
    ]
  }
];

export const PRIVACY_POLICY: PrivacyPolicy = {
  title: "Privacy Policy",
  lastUpdated: "18 May 2026",
  effectiveDate: "18 May 2026",
  sections: [
    {
      content: "At Upworkz Consulting (“the Practice”, “we”, “us”, or “our”), we are committed to protecting the privacy, dignity, and confidentiality of every individual and organisation who engages our services."
    },
    {
      content: "We recognise that counselling, coaching, supervision, and workplace wellbeing services involve sensitive personal information. We therefore take our ethical, professional, and legal responsibilities seriously and handle personal data in accordance with the Singapore Personal Data Protection Act 2012 (“PDPA”) and applicable professional standards."
    },
    {
      title: "1. Who We Are",
      content: [
        "Upworkz Consulting is a Singapore-based professional practice providing:",
        "Counselling",
        "Coaching",
        "Clinical supervision",
        "Corporate training and workshops",
        "Our services are delivered by qualified practitioners operating within the ethical standards of their respective professional bodies."
      ]
    },
    {
      title: "2. The Personal Data We Collect",
      content: [
        "Information You Provide Directly: We may collect personal information that you voluntarily provide when you submit an enquiry, book a session or programme, complete intake or consent forms, attend counselling, coaching, supervision, or training sessions, or communicate with us by email or online platforms.",
        "Identification and Contact Information: Full name, Date of birth, Email address, Telephone number, Mailing address, Emergency contact information.",
        "Sensitive Personal Data: Depending on the service you engage, we may collect sensitive information including presenting concerns, mental health history, emotional wellbeing information, relationship or family information, workplace or professional concerns, personal goals and reflections, risk or safeguarding concerns, and relevant medical or psychiatric information voluntarily disclosed.",
        "Payment and Administrative Information: Billing information, Payment records, Attendance records, Session history. We do not store full credit card details directly. Payments are processed through paynow."
      ]
    },
    {
      title: "3. How We Collect Your Data",
      content: [
        "Intake and consent forms",
        "Session bookings",
        "Email communication",
        "Website enquiry forms",
        "Online booking systems",
        "During counselling, coaching, supervision, or training sessions",
        "Corporate engagement arrangements",
        "Payment transactions"
      ]
    },
    {
      title: "4. How We Use Your Personal Data",
      content: [
        "Service Delivery: Providing counselling, coaching, supervision, and training services, assessing suitability for Services, managing appointments and scheduling, communicating with you regarding Services, maintaining professional clinical records.",
        "Administrative and Operational Purposes: Processing payments and invoices, maintaining client records, responding to enquiries and complaints, improving our services and operations.",
        "Professional and Ethical Obligations: Maintaining professional clinical records, conducting professional supervision on an anonymised basis, managing safeguarding and risk concerns, complying with ethical and legal obligations.",
        "Website and Service Improvement: Monitoring website performance, improving user experience, analysing website traffic and engagement.",
        "Corporate Training Engagements: For corporate clients, we may provide attendance confirmation, programme completion records, aggregate feedback or evaluation data. We do not disclose individual participant disclosures or personal session content to employers without consent unless legally required."
      ]
    },
    {
      title: "5. Confidentiality – Our Core Commitment",
      content: [
        "Confidentiality is foundational to the therapeutic and professional relationship.",
        "All personal information shared during counselling, coaching, supervision, or related services is treated as strictly confidential and handled in accordance with professional ethical standards.",
        "We will not disclose your personal data to third parties without your consent except where:",
        "Disclosure is required by law",
        "There is a serious and imminent risk of harm to yourself or another person",
        "There are safeguarding concerns involving a child or vulnerable person",
        "Disclosure is required by a court order or lawful authority",
        "Information is discussed in professional supervision on an anonymised basis",
        "Disclosure is necessary for payment processing or operational support services bound by confidentiality obligations",
        "Where reasonably practicable, we will endeavour to inform you before disclosure."
      ]
    },
    {
      title: "6. Storage and Protection of Personal Data",
      content: [
        "We take reasonable administrative, technical, and physical measures to protect your personal data from unauthorised access, loss or misuse, disclosure, alteration or destruction.",
        "Personal data may be stored electronically on secure systems and in password-protected cloud platforms.",
        "Only authorised personnel and Practitioners have access to client information on a need-to-know basis.",
        "While we take reasonable steps to safeguard data, no electronic transmission or storage system can be guaranteed completely secure."
      ]
    },
    {
      title: "7. Online Sessions and Third-Party Platforms",
      content: [
        "Online sessions may be conducted using third-party platforms such as Zoom, Google Meet, Microsoft Teams, or other secure communication platforms.",
        "By participating in online sessions, you acknowledge that third-party platforms have their own privacy and security policies, you are responsible for ensuring privacy on your own device and environment, and internet-based communication carries some inherent security risks.",
        "We encourage Clients to use secure internet connections, attend sessions in a private space, and use headphones where appropriate."
      ]
    },
    {
      title: "8. Cookies and Website Analytics",
      content: [
        "Our website may use cookies and analytics technologies to improve website functionality, understand visitor behaviour, and enhance user experience.",
        "You may disable cookies through your browser settings, though some website functionality may be affected.",
        "We may use reputable third-party analytics services such as Google Analytics in anonymised form."
      ]
    },
    {
      title: "9. Retention of Personal Data",
      content: [
        "We retain personal information only for as long as reasonably necessary to provide Services, comply with legal obligations, meet professional and ethical standards, and resolve disputes or enforce agreements.",
        "When records are no longer required, they will be securely deleted or destroyed."
      ]
    },
    {
      title: "10. Your Rights Under the PDPA",
      content: [
        "Subject to applicable Singapore laws, you may have the right to request access to your personal data, request correction of inaccurate information, withdraw consent for certain uses of your data, and request information about how your data has been used or disclosed.",
        "Requests should be submitted in writing using the contact details below.",
        "Please note: Certain legal or professional obligations may limit our ability to delete records immediately, and withdrawal of consent may affect our ability to continue providing Services.",
        "We may charge a reasonable administrative fee for certain requests where permitted under the PDPA."
      ]
    },
    {
      title: "11. Children and Minors",
      content: [
        "We do not knowingly provide Services to individuals under 18 years old without appropriate parental or guardian consent.",
        "Where Services are provided to minors, written consent from a parent or legal guardian is required, and safeguarding obligations take precedence over confidentiality where risk concerns arise."
      ]
    },
    {
      title: "12. Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time. The latest version will always be published on our website with the updated “Last Updated” date. Continued use of our services after updates constitutes acceptance of the revised Privacy Policy."
      ]
    },
    {
      title: "13. Contact Us",
      content: [
        "If you have any questions, requests, or concerns regarding this Privacy Policy or your personal data, please contact:",
        "Upworkz Consulting",
        "Email: upworkzc@gmail.com",
        "Website: www.upworkzconsulting.com"
      ]
    }
  ]
};

export const TERMS_AND_CONDITIONS: TermsAndConditions = {
  title: "Terms & Conditions",
  lastUpdated: "18 May 2026",
  sections: [
    {
      title: "Emergency Notice",
      content: [
        "Our services are not a crisis or emergency facility. If you are in immediate danger or experiencing a mental health crisis, please contact:",
        "Emergency services: 999 (Police) / 995 (Ambulance)",
        "IMH Emergency: 6389 2000",
        "Samaritans of Singapore (SOS): 1767 (24 hours)",
        "SAMH Helpline: 1800 283 7019",
        "Do not wait for a counselling or coaching appointment."
      ]
    },
    {
      title: "Key Things to Know",
      content: [
        "Cancellation Window: Cancel at least 24 hours before your session to avoid a charge. No-shows are billed in full.",
        "Payment: Fees are due at the time of booking. Packages must be paid in full before the first session.",
        "Confidentiality: Everything shared stays confidential – except where there is risk to life, abuse, or a legal obligation to disclose.",
        "Right Service for You: Coaching is not therapy. If you're unsure which service fits your needs, contact us before booking.",
        "Corporate Training: Training is educational – not a clinical service. Separate Service Agreements apply to corporate engagements.",
        "Your Agreement: By booking or paying, you agree to these Terms in full. Please read them or contact us with questions."
      ]
    },
    {
      title: "1. Definitions and Interpretation",
      content: [
        "Practice / We / Us / Our: Upworkz Consulting, its directors, principal practitioners, staff, and affiliates.",
        "Client / You / Your: Any individual or organisation who books, attends, or accesses any Services.",
        "Session: Any scheduled counselling, coaching, or supervision appointment.",
        "Services: All counselling, coaching, supervision, training, and related services offered.",
        "Corporate Client: Any organisation that engages the Practice for its members.",
        "Practitioner: Any qualified professional delivering Services for the Practice.",
        "Agreement: These Terms and Conditions together with any other relevant practice documents.",
        "DNA: Did Not Attend a booked session without notice.",
        "Emergency: Situations involving imminent risk to life."
      ]
    },
    {
      title: "2. Our Services",
      content: [
        "Counselling: therapeutic support for emotional and relational wellbeing.",
        "Coaching: goal-oriented process for personal and professional growth.",
        "Clinical Supervision: reflective practice support for professionals.",
        "Corporate Training: workshops and programmes for organisations.",
        "If unsure which service fits your needs, please contact us before booking."
      ]
    },
    {
      title: "3. Eligibility and Access to Services",
      content: [
        "Age Requirement: Must be 18+ to book independently. Under 18 requires parental/guardian consent.",
        "Suitability: We reserve the right to decline bookings where our services are not appropriate.",
        "Not a Crisis Service: Our services cannot substitute for emergency psychiatric care.",
        "Corporate Clients: Individuals booking for organisations confirm they are authorised to accept these terms."
      ]
    },
    {
      title: "4. Important Distinctions Between Services",
      content: [
        "Counselling vs. Coaching: Counselling processes past experiences/trauma; Coaching is forward-focused for functioning individuals. Coaching is not therapy.",
        "Clinical Supervision vs. Personal Therapy: Supervision is for professional development, not personal treatment.",
        "Corporate Training vs. Clinical Services: Training is educational and does not constitute clinical intervention.",
        "No Medical Advice: None of our services constitute medical advice or psychiatric diagnosis."
      ]
    },
    {
      title: "5. Booking and Appointment Scheduling",
      content: [
        "Bookings must be through authorised channels and are confirmed upon receipt of practice confirmation.",
        "Payment is due at time of booking for individuals unless otherwise arranged.",
        "Clients are responsible for providing accurate and complete information.",
        "The Practice reserves the right to decline or cancel any booking at its discretion."
      ]
    },
    {
      title: "6. Cancellation and Rescheduling Policy",
      content: [
        "Individual Sessions: 24+ hours notice = no charge; Within 24 hours/DNA = 100% fee.",
        "Corporate Training: 14+ days notice = no charge; 7-14 days = 50% fee; Within 7 days = 100% fee.",
        "Practice-Initiated Cancellation: Rescheduled at no charge, no cancellation fee applies to client."
      ]
    },
    {
      title: "7. Fees, Payment, and Financial Terms",
      content: [
        "Fees are in SGD and agreed at time of booking.",
        "Individual payments due at booking via PayNow. Non-refundable except if practice cancels.",
        "Packages must be paid in full before first session and are non-transferable.",
        "Corporate invoices due within 30 days. Overdue invoices attract 1.5% monthly interest."
      ]
    },
    {
      title: "8. Confidentiality",
      content: [
        "Information is strictly confidential except where mandatory disclosure is required by law or safety risks arise.",
        "Mandatory Disclosure includes: risk to life, abuse of child/vulnerable adult, court orders.",
        "Corporate Client data shared is limited to attendance/completion, not personal disclosures.",
        "Supervision case material is strictly anonymised."
      ]
    },
    {
      title: "9. Personal Data Protection",
      content: [
        "Data collection and protection follows Singapore's PDPA 2012.",
        "Notes are stored securely and retained only as long as required.",
        "Clients have rights to access or correct their data as per our Privacy Policy."
      ]
    },
    {
      title: "10. Professional Standards and Ethics",
      content: [
        "Practitioners operate under codes of bodies like SAC, ICF, NCDA.",
        "Practitioners maintain professional indemnity insurance.",
        "Professional boundaries are strictly maintained; no social/personal relationships allowed.",
        "We reserve the right to terminate services due to abusive or inappropriate conduct."
      ]
    },
    {
      title: "11. Client Responsibilities",
      content: [
        "Provide truthful information and update practice on changes.",
        "Responsible for own safety between sessions.",
        "Attend sessions punctually and provide adequate notice for changes.",
        "For online sessions, client is responsible for private environment and stable connection."
      ]
    },
    {
      title: "12. Safeguarding – Minors and Vulnerable Persons",
      content: [
        "Safeguarding duty takes precedence over confidentiality.",
        "Concerns may require immediate disclosure to authorities like MSF Child Protective Service or Police."
      ]
    },
    {
      title: "13. Intellectual Property",
      content: [
        "Training materials and website content are the intellectual property of Upworkz Consulting.",
        "Materials are for personal/internal use only. Commercial reproduction is prohibited."
      ]
    },
    {
      title: "14. Limitation of Liability",
      content: [
        "No guarantee of particular outcomes. Liability excluded for indirect/consequential loss, loss of profit, or emotional distress as part of therapy.",
        "Nothing excludes liability for death/injury caused by negligence as per Singapore law."
      ]
    },
    {
      title: "15. Indemnity",
      content: "You agree to indemnify the Practice against claims arising from your breach of these Terms or misrepresentation of information."
    },
    {
      title: "16. Force Majeure",
      content: [
        "Practice not liable for delays due to circumstances beyond reasonable control (pandemics, natural disasters, etc.).",
        "Practice will endeavour to reschedule affected sessions at no additional charge."
      ]
    },
    {
      title: "17. Termination",
      content: [
        "Client may terminate at any time; outstanding fees remain payable.",
        "Practice may terminate for reasons like clinical competency scope, non-payment, or misconduct."
      ]
    },
    {
      title: "18. Complaints and Dispute Resolution",
      content: [
        "Submit complaints in writing to upworkzc@gmail.com.",
        "Parties agree to attempted resolution through negotiation or mediation at Singapore Mediation Centre before legal proceedings."
      ]
    },
    {
      title: "19. Governing Law and Jurisdiction",
      content: "Governed by laws of Singapore; subject to exclusive jurisdiction of Singapore courts."
    },
    {
      title: "20. General Provisions",
      content: "Entire Agreement, Severability, Waiver, No Partnership, Assignment, Amendments, and Survival clauses apply."
    },
    {
      title: "21. Contact Us",
      content: [
        "Upworkz Consulting",
        "Email: upworkzc@gmail.com",
        "Website: www.upworkzconsulting.com"
      ]
    }
  ]
};

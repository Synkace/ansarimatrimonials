export const MOCK_USERS = [
    {
        _id: "mock1",
        name: "Aarav Khan",
        age: 28,
        occupation: "Software Engineer",
        location: "Mumbai, India",
        bio: "Passionate about tech and deen. Looking for a partner who shares similar values.",
        image: null, // UI will show placeholder
        isVerified: true,
        moonPhase: 75,
        managedBy: "Self"
    },
    {
        _id: "mock2",
        name: "Zara Ahmed",
        age: 25,
        occupation: "Dentist",
        location: "Delhi, India",
        bio: "Love traveling and reading. Family oriented.",
        image: null,
        isVerified: true,
        moonPhase: 40,
        managedBy: "Parent"
    },
    {
        _id: "mock3",
        name: "Bilal Shaikh",
        age: 30,
        occupation: "Architect",
        location: "Bangalore, India",
        bio: "Building dreams. Seeking a pious and understanding partner.",
        image: null,
        isVerified: false,
        moonPhase: 90,
        managedBy: "Agent"
    },
    {
        _id: "mock4",
        name: "Sana Mir",
        age: 26,
        occupation: "Teacher",
        location: "Hyderabad, India",
        bio: "Educating the future generation. Simple and down to earth.",
        image: null,
        isVerified: true,
        moonPhase: 10,
        managedBy: "Self"
    }
];

export const MOCK_STORIES = [
    {
        id: 1,
        couple: "Yusuf & Maryam",
        story: "We met through Ansari Matrimonials and clicked instantly. The lunar compatibility feature was surprisingly accurate!",
        image: "/images/story1.jpg" // Placeholder path
    },
    {
        id: 2,
        couple: "Ibrahim & Fatima",
        story: "Found my soulmate within a month. The privacy features gave us the confidence to connect.",
        image: "/images/story2.jpg"
    },
    {
        id: 3,
        couple: "Ali & Zoya",
        story: "Highly recommended for those seeking a halal way to find a partner. Excellent support from the team.",
        image: "/images/story3.jpg"
    }
];

export const MOCK_FAQS = [
    {
        question: "Is my data safe?",
        answer: "Yes, we prioritize your privacy. Contact details are hidden until you unlock them or verify your profile."
    },
    {
        question: "How does the Lunar Progress work?",
        answer: "It's a unique compatibility metric based on shared values and preferences, visualized as a moon phase."
    },
    {
        question: "Is it free to join?",
        answer: "Registration is free. Some premium features may require a subscription."
    },
    {
        question: "How do I verify my profile?",
        answer: "Upload a valid government ID (like Aadhaar) in your profile settings. Our admins will verify it securely."
    }
];

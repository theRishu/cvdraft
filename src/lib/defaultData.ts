export const INITIAL_DATA = {
    title: "Software Engineer Resume",
    templateId: "ats",
    personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        title: "Senior Software Engineer",
        phone: "+1 (555) 123-4567",
        address: "123 Tech Lane, San Francisco, CA 94105",
        summary: "Senior Software Engineer with over 5 years of experience in building scalable web applications and distributed systems.\n\nExpert in React, Node.js, and TypeScript, with a strong focus on clean code, performance optimization, and user-centric design.\n\nProven track record of delivering high-quality software solutions in fast-paced startup environments."
    },
    experience: [
        {
            id: "1",
            jobTitle: "Senior Software Engineer",
            companyName: "TechFlow Systems",
            startDate: "Jan 2021",
            endDate: "Present",
            address: "San Francisco, CA",
            isCurrent: true,
            description: "• Led the frontend development of a high-traffic e-commerce platform using React and Next.js, resulting in a 30% increase in conversion rates.\n• Architected and implemented a microservices-based backend using Node.js and GraphQL, improving system scalability and maintainability.\n• Mentored junior developers and conducted code reviews to ensure high-quality standards and best practices.\n• Optimized application performance, reducing page load times by 40% through code splitting and efficient data fetching strategies."
        },
        {
            id: "2",
            jobTitle: "Software Engineer",
            companyName: "Innovate Digital",
            startDate: "Jun 2018",
            endDate: "Dec 2020",
            address: "Austin, TX",
            isCurrent: false,
            description: "• Developed and maintained multiple client-facing web applications using JavaScript, HTML5, and CSS3.\n• Collaborated with UX/UI designers to translate complex requirements into intuitive and responsive user interfaces.\n• Integrated third-party APIs and services to enhance application functionality and user experience.\n• Participated in agile development processes, including sprint planning and daily stand-ups."
        }
    ],
    education: [
        {
            id: "3",
            degree: "Bachelor of Science in Computer Science",
            schoolName: "University of California, Berkeley",
            startDate: "Aug 2014",
            endDate: "May 2018",
            isCurrent: false,
            description: "• Major GPA: 3.8/4.0\n• Coursework: Data Structures, Algorithms, Web Development, Database Systems, Computer Architecture.\n• Extracurriculars: Vice President of the Computer Science Society, Organizer of HackUCB."
        }
    ],
    skills: [
        { id: "4", name: "JavaScript", rating: 5 },
        { id: "5", name: "TypeScript", rating: 5 },
        { id: "6", name: "React", rating: 5 },
        { id: "7", name: "Next.js", rating: 4 },
        { id: "8", name: "Node.js", rating: 4 },
        { id: "9", name: "GraphQL", rating: 3 },
        { id: "10", name: "MongoDB", rating: 4 },
        { id: "11", name: "PostgreSQL", rating: 4 },
        { id: "12", name: "Docker", rating: 3 },
        { id: "13", name: "AWS", rating: 3 },
        { id: "14", name: "Git", rating: 5 }
    ],
    projects: [
        {
            id: "15",
            title: "E-commerce Dashboard",
            techStack: "React, Redux, Tailwind CSS",
            startDate: "2020",
            endDate: "2021",
            link: "https://demo-dashboard.example.com",
            description: "• Developed a comprehensive admin dashboard for managing products, orders, and users.\n• Implemented real-time data visualization using Chart.js.\n• Achieved 95% test coverage using Jest and React Testing Library."
        },
        {
            id: "16",
            title: "Task Management API",
            techStack: "Node.js, Express, MongoDB",
            startDate: "2019",
            endDate: "2020",
            link: "https://api.example.com",
            description: "• Designed and deployed a RESTful API for a task management application.\n• Implemented robust authentication and authorization using JWT.\n• Optimized database queries, reducing response times by 50%."
        }
    ],
    socialLinks: [
        { id: "17", network: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
        { id: "18", network: "GitHub", url: "https://github.com/johndoe" },
        { id: "19", network: "Portfolio", url: "https://johndoe.dev" }
    ],
    certifications: [
        {
            id: "20",
            title: "AWS Certified Developer - Associate",
            issuer: "Amazon Web Services",
            date: "Mar 2022"
        }
    ],
    languages: [
        { id: "21", name: "English", proficiency: "Native" },
        { id: "22", name: "Spanish", proficiency: "Conversational" }
    ],
    customSection: {
        id: "custom",
        title: "Awards",
        items: [
            {
                id: "23",
                title: "Employee of the Year",
                subtitle: "TechFlow Systems",
                date: "2022",
                description: "Awarded for exceptional performance and leadership in frontend development."
            }
        ]
    }
};

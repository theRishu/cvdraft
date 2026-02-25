export const INITIAL_DATA = {
    title: "Rishu Kumar Pandey Resume",
    templateId: "singlecolumn",
    personalInfo: {
        fullName: "Rishu Kumar Pandey",
        email: "rishukp2512@gmail.com",
        title: "Cybersecurity Consultant",
        phone: "+91-9838788045",
        address: "Noida, UP, India",
        summary: "Cybersecurity Consultant with 1 year of hands-on SOC experience, specializing in Security Operations, SIEM, and SOAR tools. Skilled in threat detection, log analysis, and incident response in 24x7 enterprise SOC environments. Experienced with CrowdStrike, Chronicle, XSOAR, and Microsoft 365 Defender, with a strong foundation in cloud security, EDR/XDR, and email security. Known for quick decision-making, confidentiality handling, and maintaining high security posture across enterprise systems."
    },
    experience: [
        {
            id: "1",
            jobTitle: "SOC Analyst",
            companyName: "LTIMindtree",
            startDate: "Dec 2024",
            endDate: "Present",
            address: "Hyderabad, India",
            isCurrent: true,
            description: "• Operated as a SOC Level 1 Analyst in a 24x7 monitoring environment.\n• Performed security monitoring, incident triage, and response using CrowdStrike, Chronicle, and Microsoft Defender.\n• Investigated phishing, malware, and ransomware alerts; executed incident response playbooks in XSOAR.\n• Maintained operational security by documenting incidents and reporting in ServiceNow.\n• Improved detection coverage by analyzing firewall, proxy, and endpoint logs.\n\nKey Skills Used: CrowdStrike | Chronicle | Microsoft Defender | XSOAR | ServiceNow | Threat Hunting | Incident Response | Log Analysis"
        }
    ],
    education: [
        {
            id: "2",
            degree: "B.Tech in Computer Science & Engineering (CSE)",
            schoolName: "Jai Narain College of Technology",
            startDate: "2019",
            endDate: "2023",
            address: "Bhopal",
            isCurrent: false,
            description: ""
        }
    ],
    skills: [
        { id: "s1", name: "Google Chronicle, Next-Gen SIEM", rating: 5 },
        { id: "s2", name: "CrowdStrike, Microsoft Defender", rating: 5 },
        { id: "s3", name: "Palo Alto Cortex XSOAR", rating: 4 },
        { id: "s4", name: "Microsoft O365 Security, Proofpoint (TAP/TRAP)", rating: 4 },
        { id: "s5", name: "Microsoft Azure Security Center", rating: 4 },
        { id: "s6", name: "VirusTotal, MXToolBox, AbuseIPDB, Browserling", rating: 5 },
        { id: "s7", name: "ServiceNow", rating: 4 },
        { id: "s8", name: "TCP/IP, DNS, DHCP, Firewall, Proxy, WAF", rating: 4 }
    ],
    projects: [],
    socialLinks: [],
    certifications: [
        {
            id: "c1",
            title: "Microsoft Certified: Security, Compliance & Identity Fundamentals (SC-900)",
            issuer: "Microsoft",
            date: ""
        },
        {
            id: "c2",
            title: "Cisco Networking Basics",
            issuer: "Cisco",
            date: ""
        }
    ],
    languages: [
        { id: "l1", name: "English", proficiency: "Fluent" },
        { id: "l2", name: "Hindi", proficiency: "Native" }
    ],
    customSection: {
        id: "custom",
        title: "",
        items: []
    }
};

import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/db';
import Resume from '@/models/Resume';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        // Check user subscription and limits
        let dbUser = await User.findOne({ userId });

        if (!dbUser) {
            dbUser = await User.create({
                userId,
                email: user.emailAddresses[0].emailAddress,
            });
        }

        // Limit check: Free users max 2 resumes
        const resumeCount = await Resume.countDocuments({ userId });

        // Check against Admin Email in .env.local
        const adminEmail = process.env.ADMIN_EMAIL;
        const isAdmin = adminEmail && dbUser.email === adminEmail;
        const isPro = dbUser.isPro || isAdmin;

        // Simple check for now - can be expanded with real Pro flag
        // The user says "normal user can create only 2 resume but in my protal i see 4 resume"
        // This confirms they want this limit enforced.
        if (!isPro && resumeCount >= 2) {
            return new NextResponse("Free limit reached (Max 2 resumes). Upgrade to Pro to create more.", { status: 403 });
        }

        const body = await req.json();
        const { title, templateId, importData } = body;

        let initialData = {};
        if (importData) {
            // If importing, use the imported data but override critical fields
            initialData = {
                ...importData,
                title: title || importData.title || "Imported Resume",
                templateId: templateId || importData.templateId || "modern",
                userId, // Enforce current user
                _id: undefined, // Type safety, though Mongoose ignores if not in schema usually, but explicit is good
                createdAt: undefined,
                updatedAt: undefined,
            };
        } else {
            // Default creation
            initialData = {
                userId,
                title: title || "SOC Analyst Resume",
                templateId: templateId || "ats",
                personalInfo: {
                    fullName: user.firstName + " " + user.lastName,
                    email: "john.doe@example.com",
                    jobTitle: "Cybersecurity Consultant",
                    phone: "+1 (555) 123-4567",
                    location: "Noida, UP, India",
                    summary: "Cybersecurity Consultant with 1 year of hands-on SOC experience, specializing in Security Operations, SIEM, and SOAR tools. Skilled in threat detection, log analysis, and incident response in 24x7 enterprise SOC environments. Experienced with CrowdStrike, Chronicle, XSOAR, and Microsoft 365 Defender, with a strong foundation in cloud security, EDR/XDR, and email security. Known for quick decision-making, confidentiality handling, and maintaining high security posture across enterprise systems."
                },
                experience: [
                    {
                        id: crypto.randomUUID(),
                        jobTitle: "SOC Analyst",
                        companyName: "LTIMindtree",
                        startDate: "Dec 2024",
                        endDate: "Present",
                        location: "Hyderabad, India",
                        isCurrent: true,
                        description: "• Operated as a SOC Level 1 Analyst in a 24x7 monitoring environment.\n• Performed security monitoring, incident triage, and response using CrowdStrike, Chronicle, and Microsoft Defender.\n• Investigated phishing, malware, and ransomware alerts; executed incident response playbooks in XSOAR.\n• Maintained operational security by documenting incidents and reporting in ServiceNow.\n• Improved detection coverage by analyzing firewall, proxy, and endpoint logs.\n\nKey Skills Used: CrowdStrike | Chronicle | Microsoft Defender | XSOAR | ServiceNow | Threat Hunting | Incident Response | Log Analysis"
                    }
                ],
                education: [
                    {
                        id: crypto.randomUUID(),
                        degree: "Bachelor of Technology in Computer Science",
                        schoolName: "University of Technology",
                        startDate: "Aug 2019",
                        endDate: "May 2023"
                    },
                    {
                        id: crypto.randomUUID(),
                        degree: "High School Diploma (PCM)",
                        schoolName: "Delhi Public School",
                        startDate: "Apr 2017",
                        endDate: "Mar 2019"
                    }
                ],
                skills: [
                    { id: crypto.randomUUID(), name: "SIEM: Google Chronicle, Next-Gen SIEM" },
                    { id: crypto.randomUUID(), name: "EDR/XDR: CrowdStrike, Microsoft Defender" },
                    { id: crypto.randomUUID(), name: "SOAR: Palo Alto Cortex XSOAR" },
                    { id: crypto.randomUUID(), name: "Email Security: Microsoft O365 Security, Proofpoint (TAP/TRAP)" },
                    { id: crypto.randomUUID(), name: "Cloud Security: Microsoft Azure Security Center" },
                    { id: crypto.randomUUID(), name: "Threat Intelligence Tools: VirusTotal, MXToolBox, AbuseIPDB, Browserling" },
                    { id: crypto.randomUUID(), name: "Ticketing/Case Mgmt: ServiceNow" },
                    { id: crypto.randomUUID(), name: "Networking: TCP/IP, DNS, DHCP, Firewall, Proxy, WAF" }
                ],
                certifications: [
                    { id: crypto.randomUUID(), name: "CompTIA Security+", issuer: "CompTIA", date: "Oct 2023" },
                    { id: crypto.randomUUID(), name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", date: "Jan 2024" }
                ],
                languages: [
                    { id: crypto.randomUUID(), name: "English", level: "Fluent" },
                    { id: crypto.randomUUID(), name: "Hindi", level: "Native" }
                ],
                socialLinks: [
                    { id: crypto.randomUUID(), platform: "LinkedIn", url: "linkedin.com/in/johndoe" },
                    { id: crypto.randomUUID(), platform: "GitHub", url: "github.com/johndoe" }
                ],
                projects: [
                    {
                        id: crypto.randomUUID(),
                        title: "Automated Malware Analysis Sandbox",
                        description: "Developed a Python-based sandbox environment using Cuckoo Sandbox to automatically detonate and analyze suspicious files. Integrated with VirusTotal API to generate comprehensive threat reports detailing behavior, registry changes, and network activity.",
                        link: "github.com/johndoe/sandbox",
                        startDate: "Jan 2023",
                        endDate: "Apr 2023",
                        technologies: ["Python", "Cuckoo Sandbox", "VirusTotal API", "VirtualBox"]
                    },
                    {
                        id: crypto.randomUUID(),
                        title: "Custom IDS/IPS Implementation",
                        description: "Deployed and configured Snort IDS on a local network to capture and analyze malicious packets. Wrote custom Snort rules to detect DDoS attempts, SQL injection, and unauthorized SSH brute-force attacks.",
                        startDate: "Aug 2022",
                        endDate: "Nov 2022",
                        technologies: ["Snort", "Linux", "Networking", "Bash"]
                    }
                ],
                customSection: { id: "custom", title: "Activities", items: [] }
            };
        }

        const newResume = await Resume.create(initialData);

        // Update user count
        dbUser.resumeCount = resumeCount + 1;
        await dbUser.save();

        return NextResponse.json(newResume);

    } catch (error) {
        console.error("[RESUMES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDatabase();

        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

        return NextResponse.json(resumes);
    } catch (error) {
        console.error("[RESUMES_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

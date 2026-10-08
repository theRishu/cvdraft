/**
 * Non-AI resume text -> structured JSON parser.
 *
 * Trade-off vs the old AI-based structuring: contact info (email/phone/links)
 * and section splitting (Experience/Education/Skills/...) are reliable regex
 * matches. Splitting a free-form "Experience" block into clean per-job
 * {jobTitle, companyName, startDate, endDate} entries is NOT reliable without
 * an LLM — real resumes format this wildly differently. This parser groups
 * each experience/education block by blank-line-separated paragraphs and
 * does a best-effort first-line guess at a title/date; it will be rougher
 * than what the AI path produced. Good enough for "get me a rough draft I
 * can edit", not a drop-in replacement for careful manual entry.
 */

export interface HeuristicResumeData {
    title: string;
    templateId: string;
    personalInfo: {
        fullName: string;
        title: string;
        email: string;
        phone: string;
        address: string;
        summary: string;
    };
    experience: { id: string; jobTitle: string; companyName: string; startDate: string; endDate: string; isCurrent: boolean; description: string }[];
    education: { id: string; degree: string; schoolName: string; startDate: string; endDate: string }[];
    skills: { id: string; name: string }[];
    projects: { id: string; title: string; description: string; startDate: string; endDate: string }[];
    certifications: { id: string; name: string; issuer: string; date: string }[];
    languages: { id: string; name: string; level: string }[];
    socialLinks: { id: string; platform: string; url: string }[];
}

const SECTION_HEADERS: Record<string, string[]> = {
    summary: ["summary", "objective", "profile", "about me", "about"],
    experience: ["experience", "work experience", "employment", "employment history", "professional experience", "work history"],
    education: ["education", "academic background", "academics"],
    skills: ["skills", "technical skills", "core competencies", "key skills"],
    projects: ["projects", "personal projects", "key projects"],
    certifications: ["certifications", "certificates", "licenses"],
    languages: ["languages"],
};

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/;
const URL_RE = /(https?:\/\/[^\s,;]+|www\.[^\s,;]+)/gi;
const DATE_RANGE_RE = /((?:\d{1,2}\/)?\d{4}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{0,4}\s*(?:-|–|to)\s*(present|current|(?:\d{1,2}\/)?\d{4}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec[a-z]*\.?\s*\d{0,4})/i;

function splitIntoSections(text: string): { section: string; body: string }[] {
    const lines = text.split(/\r?\n/);
    const sections: { section: string; body: string[] }[] = [{ section: "header", body: [] }];

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) { sections[sections.length - 1].body.push(""); continue; }

        const lower = line.toLowerCase().replace(/[:：]$/, "").trim();
        let matchedSection: string | null = null;
        for (const [key, headers] of Object.entries(SECTION_HEADERS)) {
            if (headers.includes(lower) || (line.length < 40 && headers.some(h => lower === h))) {
                matchedSection = key;
                break;
            }
        }

        if (matchedSection) {
            sections.push({ section: matchedSection, body: [] });
        } else {
            sections[sections.length - 1].body.push(line);
        }
    }

    return sections.map(s => ({ section: s.section, body: s.body.join("\n").trim() }));
}

function paragraphs(body: string): string[] {
    return body
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);
}

function guessName(headerText: string): string {
    const line = headerText.split(/\n/).map(l => l.trim()).find(l => l && !EMAIL_RE.test(l) && !PHONE_RE.test(l) && l.length < 60);
    return line || "";
}

function extractExperienceEntry(block: string, idx: number) {
    const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
    const firstLine = lines[0] || "";
    const dateMatch = block.match(DATE_RANGE_RE);
    const isCurrent = /present|current/i.test(dateMatch?.[2] || "");

    // Best-effort: "Job Title at Company" / "Job Title — Company" / "Job Title, Company"
    const splitMatch = firstLine.match(/^(.+?)\s*(?:@|at|—|-|,|\|)\s*(.+)$/);
    const jobTitle = splitMatch?.[1]?.trim() || firstLine;
    const companyName = splitMatch?.[2]?.replace(DATE_RANGE_RE, "").trim() || "";

    return {
        id: String(idx + 1),
        jobTitle,
        companyName,
        startDate: dateMatch?.[1] || "",
        endDate: isCurrent ? "" : (dateMatch?.[2] || ""),
        isCurrent,
        description: lines.slice(1).join("\n"),
    };
}

function extractEducationEntry(block: string, idx: number) {
    const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
    const firstLine = lines[0] || "";
    const dateMatch = block.match(DATE_RANGE_RE);
    const splitMatch = firstLine.match(/^(.+?)\s*(?:@|at|—|-|,|\|)\s*(.+)$/);

    return {
        id: String(idx + 1),
        degree: splitMatch?.[1]?.trim() || firstLine,
        schoolName: splitMatch?.[2]?.replace(DATE_RANGE_RE, "").trim() || lines[1] || "",
        startDate: dateMatch?.[1] || "",
        endDate: dateMatch?.[2] || "",
    };
}

export function parseResumeTextHeuristically(text: string): HeuristicResumeData {
    const sections = splitIntoSections(text);
    const headerBlock = sections.find(s => s.section === "header")?.body || "";

    const email = text.match(EMAIL_RE)?.[0] || "";
    const phone = text.match(PHONE_RE)?.[0]?.trim() || "";
    const urls = Array.from(new Set((text.match(URL_RE) || []).map(u => u.trim())))
        .filter(u => !u.includes("@"));

    const socialLinks = urls.map((url, i) => {
        let platform = "Website";
        if (/linkedin\.com/i.test(url)) platform = "LinkedIn";
        else if (/github\.com/i.test(url)) platform = "GitHub";
        else if (/twitter\.com|x\.com/i.test(url)) platform = "Twitter";
        return { id: String(i + 1), platform, url: url.startsWith("http") ? url : `https://${url}` };
    });

    const experienceBlock = sections.find(s => s.section === "experience")?.body || "";
    const experience = paragraphs(experienceBlock).map(extractExperienceEntry);

    const educationBlock = sections.find(s => s.section === "education")?.body || "";
    const education = paragraphs(educationBlock).map(extractEducationEntry);

    const skillsBlock = sections.find(s => s.section === "skills")?.body || "";
    // Split on lines/bullets only, NOT commas — a line like "Networking:
    // TCP/IP, DNS, DHCP" is one category with three items, and the resume
    // templates' own renderer (see parseSkill in the template components)
    // expects that whole "Category: a, b, c" string as a single skill
    // entry so it can group them under one heading. Splitting on commas
    // here would blow that grouping apart into orphaned fragments.
    // Only bare comma-separated lists with no "Category:" prefix get
    // split into individual skills.
    const skillLines = skillsBlock.split(/[\n•]/).map(s => s.trim()).filter(Boolean);
    const skills = skillLines
        .flatMap(line => (line.includes(":") ? [line] : line.split(",").map(s => s.trim())))
        .filter(s => s && s.length < 80)
        .map((name, i) => ({ id: String(i + 1), name }));

    const projectsBlock = sections.find(s => s.section === "projects")?.body || "";
    const projects = paragraphs(projectsBlock).map((block, i) => {
        const lines = block.split(/\n/).map(l => l.trim()).filter(Boolean);
        return {
            id: String(i + 1),
            title: lines[0] || "",
            description: lines.slice(1).join("\n"),
            startDate: "",
            endDate: "",
        };
    });

    const certificationsBlock = sections.find(s => s.section === "certifications")?.body || "";
    const certifications = certificationsBlock
        .split(/\n/)
        .map(l => l.trim())
        .filter(Boolean)
        .map((line, i) => {
            const splitMatch = line.match(/^(.+?)\s*(?:@|-|,|\|)\s*(.+)$/);
            return {
                id: String(i + 1),
                name: splitMatch?.[1]?.trim() || line,
                issuer: splitMatch?.[2]?.trim() || "",
                date: line.match(DATE_RANGE_RE)?.[0] || "",
            };
        });

    const languagesBlock = sections.find(s => s.section === "languages")?.body || "";
    const languages = languagesBlock
        .split(/[\n,]/)
        .map(l => l.trim())
        .filter(Boolean)
        .map((line, i) => {
            const splitMatch = line.match(/^(.+?)\s*[-–(]\s*(.+?)\)?$/);
            return { id: String(i + 1), name: splitMatch?.[1]?.trim() || line, level: splitMatch?.[2]?.trim() || "" };
        });

    const summary = sections.find(s => s.section === "summary")?.body || "";

    return {
        title: "Untitled Resume",
        templateId: "singlecolumn",
        personalInfo: {
            fullName: guessName(headerBlock),
            title: "",
            email,
            phone,
            address: "",
            summary,
        },
        experience,
        education,
        skills,
        projects,
        certifications,
        languages,
        socialLinks,
    };
}

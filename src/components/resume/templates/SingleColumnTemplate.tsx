import { RichText } from "@/lib/richText";
import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface SingleColumnTemplateProps {
    data: any;
}

export default function SingleColumnTemplate({ data }: SingleColumnTemplateProps) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, customSection, themeColor, fontSize } = data;
    const layout = data.layout || {}; const { topMargin, bottomMargin, leftMargin, rightMargin } = layout;
    const fontFamily = layout.fontFamily;
    const headerSize = layout.headerSize;
    const headingSize = layout.headingSize;
    const sectionSpacing = layout.sectionSpacing;
    const skillsDisplayStyle = layout.skillsDisplayStyle;
    const nameBold = layout.nameBold ?? data.nameBold;
    const nameUnderline = layout.nameUnderline ?? data.nameUnderline;
    const titleBold = layout.titleBold ?? data.titleBold;
    const titleItalic = layout.titleItalic ?? data.titleItalic;
    const titleSize = layout.titleSize ?? data.titleSize;

    const spacingClass = sectionSpacing === "compact" ? "space-y-4" : sectionSpacing === "spacious" ? "space-y-8" : "space-y-6";
    const itemSpacingClass = sectionSpacing === "compact" ? "space-y-3" : sectionSpacing === "spacious" ? "space-y-6" : "space-y-5";

    const getIcon = (network: string | undefined) => {
        switch (network?.toLowerCase()) {
            case "linkedin": return <Linkedin className="w-3.5 h-3.5" />;
            case "github": return <Github className="w-3.5 h-3.5" />;
            default: return <Globe className="w-3.5 h-3.5" />;
        }
    };

    const renderSkills = (skillsArray: any[]) => {
        if (!skillsArray || skillsArray.length === 0) return null;

        const parseSkill = (skillName: any) => {
            if (typeof skillName !== 'string') return { category: null, itemsStr: String(skillName || ''), isCategory: false };

            if (skillName.includes(':')) {
                const [cat, ...rest] = skillName.split(':');
                return { category: cat.trim(), itemsStr: rest.join(':').trim(), isCategory: true };
            }

            const commonCategories = [
                'language', 'languages',
                'frontend', 'front-end', 'front end',
                'backend', 'back-end', 'back end',
                'database', 'databases',
                'tools', 'tool',
                'cloud', 'devops', 'testing', 'frameworks', 'libraries'
            ];

            const lowerName = skillName.toLowerCase();
            for (const cat of commonCategories) {
                if (lowerName.startsWith(cat + ' ')) {
                    const actualCategory = skillName.substring(0, cat.length).trim();
                    const displayCategory = actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1);
                    const itemsStr = skillName.substring(cat.length).trim();
                    return { category: displayCategory, itemsStr, isCategory: true };
                }
            }

            return { category: null, itemsStr: skillName, isCategory: false };
        };

        if (skillsDisplayStyle === "block") {
            return (
                <ul className="list-disc list-inside space-y-1">
                    {skillsArray.map((s: any) => {
                        const { category, itemsStr, isCategory } = parseSkill(s.name);
                        if (isCategory) {
                            return (
                                <li key={s.id} className="text-stone-700 leading-relaxed text-[0.9em]">
                                    <span className="font-bold">{category}:</span> {itemsStr}
                                </li>
                            );
                        }
                        return (
                            <li key={s.id} className="text-stone-700 leading-relaxed text-[0.9em]">
                                {s.name}
                            </li>
                        );
                    })}
                </ul>
            );
        }

        if (skillsDisplayStyle === "comma") {
            return (
                <p className="text-stone-700 leading-relaxed text-[0.9em]">
                    {skillsArray.map((s, idx) => {
                        const { category, itemsStr, isCategory } = parseSkill(s.name);
                        const isLast = idx === skillsArray.length - 1;
                        if (isCategory) {
                            return (
                                <React.Fragment key={s.id}>
                                    <span className="font-bold">{category}:</span> {itemsStr}{!isLast && " • "}
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment key={s.id}>
                                {s.name}{!isLast && " • "}
                            </React.Fragment>
                        );
                    })}
                </p>
            );
        }

        const hasAnyCategory = skillsArray.some(s => parseSkill(s.name).isCategory);

        return (
            <div className={`flex ${hasAnyCategory ? 'flex-col gap-2' : 'flex-wrap gap-2'}`}>
                {skillsArray.map((skill: any) => {
                    const { category, itemsStr, isCategory } = parseSkill(skill.name);
                    if (isCategory) {
                        // Support comma or pipe separated items
                        const sep = itemsStr.includes('|') ? '|' : (itemsStr.includes(',') ? ',' : null);
                        const items = sep ? itemsStr.split(sep).map((i: string) => i.trim()).filter(Boolean) : [itemsStr];

                        return (
                            <div key={skill.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                <span className="font-bold text-[0.9em] text-stone-800 sm:w-1/4 shrink-0">{category}</span>
                                <div className="flex flex-wrap flex-1 gap-1.5">
                                    {items.map((item: string, idx: number) => (
                                        <span key={`${skill.id}-${idx}`} className="bg-stone-50 border border-stone-200 text-stone-700 px-2 py-0.5 rounded-md text-[0.85em] font-medium block">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <span key={skill.id} className="bg-stone-50 border border-stone-200 text-stone-700 px-2.5 py-1 rounded-md text-[0.85em] font-medium w-fit block">
                            {skill.name}
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`flex flex-col bg-white text-stone-800`} style={{ fontFamily: fontFamily || "Inter, sans-serif", fontSize: typeof fontSize === 'number' ? `${fontSize}pt` : fontSize || "10pt" }}>

            {/* Header */}
            <div className="flex flex-col items-center text-center pb-6 mb-8 border-b-2" style={{ borderColor: themeColor || "#0f172a" }}>
                <h1
                    style={{
                        color: themeColor || "#0f172a",
                        fontSize: typeof headerSize === 'number' ? `${headerSize}pt` : headerSize || "32pt",
                        fontWeight: nameBold ? 'bold' : '800',
                        textDecoration: nameUnderline ? 'underline' : 'none'
                    }}
                    className="tracking-tighter uppercase mb-2 leading-none"
                >
                    {personalInfo.fullName}
                </h1>

                {personalInfo.title && (
                    <h2
                        style={{
                            fontSize: typeof titleSize === 'number' ? `${titleSize}pt` : "14pt",
                            fontWeight: titleBold ? 'bold' : '500',
                            fontStyle: titleItalic ? 'italic' : 'normal'
                        }}
                        className="text-stone-500 tracking-[0.15em] uppercase mb-4"
                    >
                        {personalInfo.title}
                    </h2>
                )}

                {/* Contact Info */}
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.9em] text-stone-600 font-medium">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4 text-stone-400" />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-stone-400" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-stone-400" />
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {data.socialLinks?.map((link: any) => (
                        <div key={link.id} className="flex items-center gap-1.5">
                            {getIcon(link.network)}
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-stone-600">
                                {link.network}
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className={`flex flex-col w-full ${spacingClass}`}>

                {/* Summary */}
                {personalInfo.summary && (
                    <div>
                        <h3
                            style={{
                                color: themeColor || "#0f172a",
                                fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                            }}
                            className="font-bold border-b border-stone-200 pb-1.5 mb-3 uppercase tracking-wider"
                        >
                            Professional Summary
                        </h3>
                        <p className="text-stone-700 leading-relaxed text-[0.95em] whitespace-pre-line text-justify">
                            {personalInfo.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {experience?.length > 0 && (
                    <div>
                        <h3
                            style={{
                                color: themeColor || "#0f172a",
                                fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                            }}
                            className="font-bold border-b border-stone-200 pb-1.5 mb-4 uppercase tracking-wider"
                        >
                            Experience
                        </h3>
                        <div className={itemSpacingClass}>
                            {experience.map((exp: any) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-[1.1em] text-stone-900">{exp.jobTitle}</h4>
                                        <span className="text-[0.9em] font-medium text-stone-500 whitespace-nowrap ml-4">
                                            {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[0.95em] font-medium text-stone-600 mb-2">
                                        <span>{exp.companyName}</span>
                                        {exp.address && <span>{exp.address}</span>}
                                    </div>
                                    {exp.description && (
                                        <p className="text-stone-700 leading-relaxed text-[0.95em] whitespace-pre-line text-justify">
                                            <RichText text={exp.description || ""} />
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education?.length > 0 && (
                    <div>
                        <h3
                            style={{
                                color: themeColor || "#0f172a",
                                fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                            }}
                            className="font-bold border-b border-stone-200 pb-1.5 mb-4 uppercase tracking-wider"
                        >
                            Education
                        </h3>
                        <div className={itemSpacingClass}>
                            {education.map((edu: any) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-[1.05em] text-stone-900">{edu.degree}</h4>
                                        <span className="text-[0.9em] font-medium text-stone-500 whitespace-nowrap ml-4">
                                            {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[0.95em] font-medium text-stone-600">
                                        <span>{edu.schoolName}</span>
                                    </div>
                                    {edu.description && (
                                        <p className="text-stone-700 leading-relaxed text-[0.95em] whitespace-pre-line mt-1.5">
                                            <RichText text={edu.description || ""} />
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects?.length > 0 && (
                    <div>
                        <h3
                            style={{
                                color: themeColor || "#0f172a",
                                fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                            }}
                            className="font-bold border-b border-stone-200 pb-1.5 mb-4 uppercase tracking-wider"
                        >
                            Projects
                        </h3>
                        <div className={itemSpacingClass}>
                            {projects.map((proj: any) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-bold text-[1.05em] text-stone-900">{proj.title}</h4>
                                            {proj.link && <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[0.85em] font-medium hover:underline text-indigo-600">View Project Link</a>}
                                        </div>
                                        {proj.startDate && (
                                            <span className="text-[0.9em] font-medium text-stone-500 whitespace-nowrap ml-4">
                                                {proj.startDate} – {proj.endDate || "Present"}
                                            </span>
                                        )}
                                    </div>
                                    {proj.techStack && (
                                        <div className="text-[0.9em] font-medium text-stone-600 mb-2 italic">
                                            Technologies: {proj.techStack}
                                        </div>
                                    )}
                                    {proj.description && (
                                        <p className="text-stone-700 leading-relaxed text-[0.95em] whitespace-pre-line text-justify">
                                            <RichText text={proj.description || ""} />
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills?.length > 0 && (
                    <div>
                        <h3
                            style={{
                                color: themeColor || "#0f172a",
                                fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                            }}
                            className="font-bold border-b border-stone-200 pb-1.5 mb-4 uppercase tracking-wider"
                        >
                            Skills
                        </h3>
                        {renderSkills(skills)}
                    </div>
                )}

                {/* Certifications & Languages - Single Column strictly */}
                <div className="flex flex-col gap-6 w-full">
                    {certifications?.length > 0 && (
                        <div>
                            <h3
                                style={{
                                    color: themeColor || "#0f172a",
                                    fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                                }}
                                className="font-bold border-b border-stone-200 pb-1.5 mb-4 uppercase tracking-wider"
                            >
                                Certifications
                            </h3>
                            <div className="space-y-4">
                                {certifications.map((cert: any, idx: number) => (
                                    <div key={cert.id || `cert-${idx}`}>
                                        <div className="flex justify-between items-baseline mb-0.5">
                                            <h4 className="font-bold text-[0.95em] text-stone-900">{cert.title}</h4>
                                            {cert.date && <span className="text-[0.85em] text-stone-500 whitespace-nowrap ml-2">{cert.date}</span>}
                                        </div>
                                        {cert.issuer && <div className="text-[0.9em] text-stone-600">{cert.issuer}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {languages?.length > 0 && (
                        <div>
                            <h3
                                style={{
                                    color: themeColor || "#0f172a",
                                    fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                                }}
                                className="font-bold border-b border-stone-200 pb-1.5 mb-4 uppercase tracking-wider"
                            >
                                Languages
                            </h3>
                            <div className="flex flex-col gap-2">
                                {languages.map((lang: any, idx: number) => (
                                    <div key={lang.id || `lang-${idx}`} className="flex justify-between items-baseline text-[0.95em]">
                                        <span className="font-medium text-stone-900">{lang.name}</span>
                                        <span className="text-[0.9em] text-stone-500">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Custom Section */}
                {customSection?.items?.length > 0 && (
                    <div>
                        <h3
                            style={{
                                color: themeColor || "#0f172a",
                                fontSize: typeof headingSize === 'number' ? `${headingSize}pt` : headingSize || "14pt"
                            }}
                            className="font-bold border-b border-stone-200 pb-1.5 mb-4 uppercase tracking-wider"
                        >
                            {customSection.title || "Additional Information"}
                        </h3>
                        <div className={itemSpacingClass}>
                            {customSection.items.map((item: any) => (
                                <div key={item.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-bold text-[1.05em] text-stone-900">{item.title}</h4>
                                        {item.date && <span className="text-[0.9em] font-medium text-stone-500 whitespace-nowrap ml-4">{item.date}</span>}
                                    </div>
                                    {item.subtitle && <div className="text-[0.95em] font-medium text-stone-600 mb-1.5">{item.subtitle}</div>}
                                    {item.description && (
                                        <p className="text-stone-700 leading-relaxed text-[0.95em] whitespace-pre-line text-justify">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

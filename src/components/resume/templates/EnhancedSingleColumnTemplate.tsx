import { RichText } from "@/lib/richText";
import React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

/**
 * Enhanced Single Column Template Engine
 * 
 * Supports various professional variations through layout props.
 */
interface EnhancedSingleColumnProps {
    data: any;
    variant: 'executive' | 'modern' | 'minimalist' | 'academic' | 'creative' | 'classic' | 'startup' | 'tech' | 'corporate' | 'refined';
}

export default function EnhancedSingleColumnTemplate({ data, variant }: EnhancedSingleColumnProps) {
    const { personalInfo, experience, education, skills, projects, certifications, languages, customSection, themeColor, fontSize } = data;
    const layout = data.layout || {}; const { topMargin, bottomMargin, leftMargin, rightMargin } = layout;

    // Core properties overridden by variant
    const fontFamily = layout.fontFamily || (
        ['executive', 'corporate', 'classic'].includes(variant) ? 'Merriweather, serif' :
            ['modern', 'startup', 'tech'].includes(variant) ? 'Inter, sans-serif' :
                ['minimalist', 'refined'].includes(variant) ? 'Outfit, sans-serif' :
                    'Roboto, sans-serif'
    );

    // Styling variants configuration
    const config: Record<string, any> = {
        executive: { headerAlign: 'center', nameStyle: 'uppercase tracking-widest', sectionBorder: 'border-b-2', sectionTitleUpper: true, titleStyle: 'italic text-stone-600', compact: false },
        modern: { headerAlign: 'left', nameStyle: 'tracking-tight', sectionBorder: 'border-l-4 pl-3', sectionTitleUpper: false, titleStyle: 'font-bold text-stone-700', compact: true },
        minimalist: { headerAlign: 'left', nameStyle: 'font-light tracking-wide', sectionBorder: 'border-b', sectionTitleUpper: true, titleStyle: 'font-mono text-stone-500', compact: true },
        academic: { headerAlign: 'center', nameStyle: 'font-serif', sectionBorder: 'border-t border-b py-1', sectionTitleUpper: true, titleStyle: 'text-stone-600 font-medium', compact: false },
        creative: { headerAlign: 'right', nameStyle: 'font-black tracking-tighter', sectionBorder: 'border-b-4', sectionTitleUpper: true, titleStyle: 'font-bold uppercase tracking-widest text-[#0f172a]', compact: false },
        classic: { headerAlign: 'center', nameStyle: 'font-serif', sectionBorder: 'border-b border-double', sectionTitleUpper: true, titleStyle: 'font-serif text-stone-600 italic', compact: false },
        startup: { headerAlign: 'left', nameStyle: 'font-black tracking-tight', sectionBorder: 'border-b-2 border-dashed border-stone-300', sectionTitleUpper: false, titleStyle: 'font-medium tracking-tight', compact: true },
        tech: { headerAlign: 'left', nameStyle: 'font-mono tracking-tight', sectionBorder: 'border-l-2 pl-2', sectionTitleUpper: true, titleStyle: 'font-mono text-stone-400', compact: true },
        corporate: { headerAlign: 'left', nameStyle: 'font-bold uppercase', sectionBorder: 'border-b pb-1', sectionTitleUpper: true, titleStyle: 'uppercase text-stone-700 font-bold', compact: true },
        refined: { headerAlign: 'center', nameStyle: 'font-medium tracking-widest', sectionBorder: 'border-b border-opacity-50', sectionTitleUpper: true, titleStyle: 'font-light tracking-widest text-stone-500 uppercase', compact: false }
    };

    const style = config[variant];

    const getIcon = (network: string | undefined) => {
        switch (network?.toLowerCase()) {
            case "linkedin": return <Linkedin className="w-3.5 h-3.5" />;
            case "github": return <Github className="w-3.5 h-3.5" />;
            default: return <Globe className="w-3.5 h-3.5" />;
        }
    };

    const parseSkill = (skillName: any) => {
        if (typeof skillName !== 'string') return { category: null, itemsStr: String(skillName || ''), isCategory: false };
        if (skillName.includes(':')) {
            const [cat, ...rest] = skillName.split(':');
            return { category: cat.trim(), itemsStr: rest.join(':').trim(), isCategory: true };
        }
        const commonCategories = ['language', 'languages', 'frontend', 'front-end', 'front end', 'backend', 'back-end', 'back end', 'database', 'databases', 'tools', 'tool', 'cloud', 'devops', 'testing', 'frameworks', 'libraries'];
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

    const renderSkills = (skillsArray: any[]) => {
        if (!skillsArray || skillsArray.length === 0) return null;
        const hasAnyCategory = skillsArray.some(s => parseSkill(s.name).isCategory);

        return (
            <div className={`flex ${hasAnyCategory ? 'flex-col gap-1.5' : 'flex-wrap gap-2'} ${style.compact ? 'mb-4' : 'mb-6'}`}>
                {skillsArray.map((skill: any, idx: number) => {
                    const { category, itemsStr, isCategory } = parseSkill(skill.name);
                    if (isCategory) {
                        const sep = itemsStr.includes('|') ? '|' : (itemsStr.includes(',') ? ',' : null);
                        const items = sep ? itemsStr.split(sep).map((i: string) => i.trim()).filter(Boolean) : [itemsStr];
                        return (
                            <div key={`${skill.id}-${idx}`} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                <span className={`font-bold text-[0.9em] text-stone-900 sm:w-1/4 shrink-0 ${variant === 'corporate' ? 'uppercase text-[0.8em]' : ''}`}>{category}</span>
                                <div className="flex flex-wrap flex-1 gap-1">
                                    {items.map((item: string, i: number) => (
                                        <span key={i} className="text-stone-700 text-[0.9em]">
                                            {item}{i < items.length - 1 ? (['corporate', 'tech'].includes(variant) ? ' | ' : ', ') : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <span key={skill.id} className="bg-stone-50 border border-stone-200 text-stone-700 px-2 py-0.5 rounded text-[0.85em] font-medium">
                            {skill.name}
                        </span>
                    );
                })}
            </div>
        );
    };

    // Render Section Header
    const SectionHeader = ({ title }: { title: string }) => (
        <h3
            style={{ color: themeColor || "#0f172a", borderColor: themeColor || "#0f172a" }}
            className={`font-bold mb-3 ${style.sectionBorder} ${style.sectionTitleUpper ? 'uppercase tracking-wider' : 'tracking-tight'} text-[1.1em] pb-1`}
        >
            {title}
        </h3>
    );

    return (
        <div className={`flex flex-col bg-white text-stone-800 leading-relaxed`} style={{ fontFamily: fontFamily, fontSize: typeof fontSize === 'number' ? `${fontSize}pt` : fontSize || "10pt", paddingTop: `${topMargin || 15}mm`, paddingBottom: `${bottomMargin || 15}mm`, paddingLeft: `${leftMargin || 20}mm`, paddingRight: `${rightMargin || 20}mm` }}>

            {/* Header */}
            <div className={`flex flex-col ${style.headerAlign === 'center' ? 'items-center text-center' : style.headerAlign === 'right' ? 'items-end text-right' : 'items-start text-left'} pb-5 mb-6 ${variant === 'academic' ? 'border-b-4 border-double' : variant === 'minimalist' ? '' : 'border-b'} border-stone-200`}>
                <h1
                    style={{ color: themeColor || "#0f172a" }}
                    className={`text-[2.8em] font-bold leading-none mb-1.5 ${style.nameStyle}`}
                >
                    {personalInfo.fullName}
                </h1>

                {personalInfo.title && (
                    <h2 className={`${style.titleStyle} text-[1.1em] mb-4`}>
                        {personalInfo.title}
                    </h2>
                )}

                <div className={`flex flex-wrap ${style.headerAlign === 'center' ? 'justify-center' : style.headerAlign === 'right' ? 'justify-end' : 'justify-start'} gap-x-4 gap-y-1.5 text-[0.85em] ${variant === 'corporate' ? 'font-medium uppercase tracking-wider text-[0.75em]' : 'text-stone-600'}`}>
                    {[personalInfo.email, personalInfo.phone, personalInfo.address].filter(Boolean).map((info, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                            {['modern', 'startup', 'tech'].includes(variant) && i === 0 && <Mail className="w-3.5 h-3.5" />}
                            {['modern', 'startup', 'tech'].includes(variant) && i === 1 && <Phone className="w-3.5 h-3.5" />}
                            {['modern', 'startup', 'tech'].includes(variant) && i === 2 && <MapPin className="w-3.5 h-3.5" />}
                            {info}
                        </span>
                    ))}
                    {data.socialLinks?.map((link: any) => (
                        <span key={link.id} className="flex items-center gap-1.5">
                            {['modern', 'startup', 'tech'].includes(variant) && getIcon(link.network)}
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {link.network || link.url.replace(/^https?:\/\//, '')}
                            </a>
                        </span>
                    ))}
                </div>
            </div>

            <div className={`flex flex-col w-full ${style.compact ? 'space-y-4' : 'space-y-6'}`}>
                {personalInfo.summary && (
                    <section className={style.compact ? 'mb-4' : 'mb-6'}>
                        {variant !== 'minimalist' && <SectionHeader title="Professional Summary" />}
                        <p className={`text-stone-700 text-[0.95em] ${variant === 'academic' || variant === 'classic' ? 'text-justify leading-loose' : 'leading-relaxed'}`}>
                            {personalInfo.summary}
                        </p>
                    </section>
                )}

                {experience?.length > 0 && (
                    <section className={style.compact ? 'mb-4' : 'mb-6'}>
                        <SectionHeader title="Experience" />
                        <div className={style.compact ? 'space-y-3' : 'space-y-5'}>
                            {experience.map((exp: any) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className={`font-bold text-[1.05em] text-stone-900 ${variant === 'corporate' ? 'uppercase tracking-wide text-[0.9em]' : ''}`}>{exp.jobTitle}</h4>
                                        <span className={`text-[0.9em] text-stone-600 shrink-0 ml-4 ${variant === 'corporate' ? 'font-bold' : 'font-medium'}`}>
                                            {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[0.95em] text-stone-600 mb-1.5">
                                        <span className={variant === 'corporate' ? 'font-bold text-stone-800' : 'italic'}>{exp.companyName}</span>
                                        {exp.address && <span>{exp.address}</span>}
                                    </div>
                                    {exp.description && (
                                        <p className={`text-stone-700 text-[0.95em] whitespace-pre-line ${variant === 'academic' || variant === 'classic' ? 'text-justify leading-loose' : 'leading-relaxed'} ${variant === 'modern' ? 'pl-3 border-l-2 border-stone-100' : ''}`}>
                                            <RichText text={exp.description || ""} />
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education?.length > 0 && (
                    <section className={style.compact ? 'mb-4' : 'mb-6'}>
                        <SectionHeader title="Education" />
                        <div className={style.compact ? 'space-y-3' : 'space-y-4'}>
                            {education.map((edu: any) => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className={`font-bold text-[1.05em] text-stone-900 ${variant === 'corporate' ? 'uppercase tracking-wide text-[0.9em]' : ''}`}>{edu.degree}</h4>
                                        <span className={`text-[0.9em] text-stone-600 shrink-0 ml-4 ${variant === 'corporate' ? 'font-bold' : 'font-medium'}`}>
                                            {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-[0.95em] text-stone-600 mb-0.5">
                                        <span className={variant === 'corporate' ? 'font-bold text-stone-800' : 'italic'}>{edu.schoolName}</span>
                                    </div>
                                    {edu.description && (
                                        <p className="text-stone-700 text-[0.95em] mt-1"><RichText text={edu.description || ""} /></p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills?.length > 0 && (
                    <section>
                        <SectionHeader title="Skills" />
                        {renderSkills(skills)}
                    </section>
                )}

                {projects?.length > 0 && (
                    <section className={style.compact ? 'mb-4' : 'mb-6'}>
                        <SectionHeader title="Projects" />
                        <div className={style.compact ? 'space-y-4' : 'space-y-5'}>
                            {projects.map((proj: any) => (
                                <div key={proj.id}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className={`font-bold text-[1.05em] text-stone-900 flex items-center flex-wrap gap-2 ${variant === 'corporate' ? 'uppercase tracking-wide text-[0.9em]' : ''}`}>
                                            {proj.title}
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[0.8em] font-normal text-stone-500 hover:text-indigo-600 hover:underline inline-flex items-center gap-1 transition-colors">
                                                    <Globe className="w-3 h-3" />
                                                    {proj.link.replace(/^https?:\/\/(www\.)?/, '')}
                                                </a>
                                            )}
                                        </h4>
                                        {proj.startDate && (
                                            <span className={`text-[0.9em] text-stone-600 shrink-0 ml-4 ${variant === 'corporate' ? 'font-bold' : 'font-medium'}`}>
                                                {proj.startDate} – {proj.endDate || "Present"}
                                            </span>
                                        )}
                                    </div>
                                    {proj.techStack && (
                                        <div className="text-[0.85em] font-medium text-stone-500 mb-1.5">
                                            <span className="italic">Tech:</span> {proj.techStack}
                                        </div>
                                    )}
                                    {proj.description && (
                                        <p className="text-stone-700 text-[0.95em] whitespace-pre-line leading-relaxed">
                                            <RichText text={proj.description || ""} />
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className={`flex flex-col ${style.compact ? 'space-y-4' : 'space-y-6'} w-full`}>
                    {certifications?.length > 0 && (
                        <section className={style.compact ? 'mb-4' : 'mb-6'}>
                            <SectionHeader title="Certifications" />
                            <div className={style.compact ? 'space-y-2' : 'space-y-3'}>
                                {certifications.map((cert: any, certIdx: number) => (
                                    <div key={cert.id ?? certIdx}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className={`font-bold text-[0.95em] text-stone-900 ${variant === 'corporate' ? 'uppercase tracking-wide text-[0.8em]' : ''}`}>{cert.title}</h4>
                                            {cert.date && <span className={`text-[0.85em] text-stone-500 ml-2 shrink-0 ${variant === 'corporate' ? 'font-bold' : ''}`}>{cert.date}</span>}
                                        </div>
                                        {cert.issuer && <div className={`text-[0.9em] text-stone-600 ${variant === 'corporate' ? 'font-bold text-stone-800' : 'italic'}`}>{cert.issuer}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages?.length > 0 && (
                        <section>
                            <SectionHeader title="Languages" />
                            <div className="space-y-1">
                                {languages.map((lang: any, langIdx: number) => (
                                    <div key={lang.id ?? langIdx} className="flex justify-between items-baseline text-[0.95em]">
                                        <span className={`text-stone-900 ${variant === 'corporate' ? 'font-bold uppercase tracking-wide text-[0.8em]' : 'font-medium'}`}>{lang.name}</span>
                                        <span className="text-[0.9em] text-stone-500 italic">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/resume/templates/StartupTemplate.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The script completely destroyed the header. Let's fix the header.
const brokenHeaderRegex = /<h1 className={`\$\$?\{textScale\.name\} font-black text-slate-900 mb-1`}>\{personalInfo\?\.fullName\}[\s\S]*?<\/h1>/;

const correctHeader = `<h1 className={\`\${textScale.name} font-black text-slate-900 mb-1\`}>{personalInfo?.fullName}</h1>`;

content = content.replace(brokenHeaderRegex, correctHeader);

// And the map loop was meant to go in the body Grid, so let's put it there and remove the broken duplicate
// Actually, it's safer to just rip out the entire map and put it exactly where the comments were left empty.
// We can see empty holes at lines 194-212.
const mapLoop = `
                {/* Dynamically Ordered Sections */}
                {(data.sectionOrder || ['experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom']).map((sectionId: string) => {
                    switch (sectionId) {
                        case 'experience': return experience?.length > 0 && (
                            <section key="experience" className="h-full">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    ⚡ <span className="bg-indigo-50 px-2 rounded">Impact</span>
                                </h3>
                                <div className="space-y-8 border-l-4 border-indigo-100 pl-6 ml-2 h-full"> ... </div>
                            </section>
                        );
                        // ... I will use git checkout to restore the file, then apply ONLY the font fix and print:p-0 safely.
                    }
                })}
`;


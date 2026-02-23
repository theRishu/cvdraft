import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType } from "docx";

function bold(text: string) {
    return new TextRun({ text, bold: true });
}
function normal(text: string) {
    return new TextRun({ text });
}
function spacer() {
    return new Paragraph({ text: "" });
}

export async function generateDocx(data: any): Promise<Blob> {
    const p = data.personalInfo || {};
    const sections: any[] = [];

    // ── Header ──────────────────────────────────
    sections.push(
        new Paragraph({
            children: [new TextRun({ text: p.fullName || "Your Name", bold: true, size: 36, font: "Calibri" })],
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
            children: [new TextRun({ text: p.title || "", size: 22, color: "555555", font: "Calibri" })],
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
            children: [new TextRun({
                text: [p.email, p.phone, p.address].filter(Boolean).join("  •  "),
                size: 18, color: "666666", font: "Calibri"
            })],
            alignment: AlignmentType.CENTER,
        }),
        spacer(),
    );

    // ── Summary ──────────────────────────────────
    if (p.summary) {
        sections.push(
            new Paragraph({ children: [bold("SUMMARY")], heading: HeadingLevel.HEADING_2, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } } }),
            new Paragraph({ children: [normal(p.summary)], spacing: { after: 120 } }),
            spacer(),
        );
    }

    // ── Experience ───────────────────────────────
    if (data.experience?.length) {
        sections.push(
            new Paragraph({ children: [bold("EXPERIENCE")], heading: HeadingLevel.HEADING_2, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } } })
        );
        for (const exp of data.experience) {
            const dates = [exp.startDate, exp.isCurrent ? "Present" : exp.endDate].filter(Boolean).join(" – ");
            sections.push(
                new Paragraph({
                    children: [
                        bold(exp.jobTitle || ""),
                        normal(" @ " + (exp.companyName || "")),
                        new TextRun({ text: "  " + dates, size: 18, color: "888888" }),
                    ],
                    spacing: { before: 120 },
                }),
                ...(exp.description || "").split("\n").filter((l: string) => l.trim()).map((line: string) =>
                    new Paragraph({ children: [normal("• " + line.trim())], indent: { left: 360 }, spacing: { after: 40 } })
                ),
            );
        }
        sections.push(spacer());
    }

    // ── Skills ───────────────────────────────────
    if (data.skills?.length) {
        const skillNames = data.skills.map((s: any) => (typeof s === "string" ? s : s.name)).filter(Boolean).join(", ");
        sections.push(
            new Paragraph({ children: [bold("SKILLS")], heading: HeadingLevel.HEADING_2, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } } }),
            new Paragraph({ children: [normal(skillNames)], spacing: { after: 120 } }),
            spacer(),
        );
    }

    // ── Projects ─────────────────────────────────
    if (data.projects?.length) {
        sections.push(
            new Paragraph({ children: [bold("PROJECTS")], heading: HeadingLevel.HEADING_2, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } } })
        );
        for (const proj of data.projects) {
            const dates = [proj.startDate, proj.endDate].filter(Boolean).join(" – ");
            sections.push(
                new Paragraph({ children: [bold(proj.title || ""), new TextRun({ text: "  " + dates, size: 18, color: "888888" })], spacing: { before: 120 } }),
                ...(proj.description || "").split("\n").filter((l: string) => l.trim()).map((line: string) =>
                    new Paragraph({ children: [normal("• " + line.trim())], indent: { left: 360 }, spacing: { after: 40 } })
                ),
            );
        }
        sections.push(spacer());
    }

    // ── Education ────────────────────────────────
    if (data.education?.length) {
        sections.push(
            new Paragraph({ children: [bold("EDUCATION")], heading: HeadingLevel.HEADING_2, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } } })
        );
        for (const edu of data.education) {
            const dates = [edu.startDate, edu.endDate].filter(Boolean).join(" – ");
            sections.push(
                new Paragraph({
                    children: [bold(edu.degree || ""), normal(" – " + (edu.schoolName || "")), new TextRun({ text: "  " + dates, size: 18, color: "888888" })],
                    spacing: { before: 120, after: 80 },
                })
            );
        }
        sections.push(spacer());
    }

    // ── Certifications ───────────────────────────
    if (data.certifications?.length) {
        sections.push(
            new Paragraph({ children: [bold("CERTIFICATIONS")], heading: HeadingLevel.HEADING_2, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } } })
        );
        for (const cert of data.certifications) {
            sections.push(
                new Paragraph({
                    children: [bold(cert.name || ""), normal(" – " + (cert.issuer || "")), new TextRun({ text: "  " + (cert.date || ""), size: 18, color: "888888" })],
                    spacing: { before: 80, after: 80 },
                })
            );
        }
    }

    const doc = new Document({
        sections: [{ children: sections }],
        styles: {
            default: {
                document: {
                    run: { font: "Calibri", size: 20 },
                },
            },
            paragraphStyles: [
                {
                    id: "Heading2", name: "Heading 2",
                    run: { bold: true, size: 22, color: "1a1a1a", font: "Calibri" },
                    paragraph: { spacing: { before: 160, after: 80 } },
                },
            ],
        },
    });

    return await Packer.toBlob(doc);
}

import React from "react";

/**
 * Renders text with markdown-style bold (**bold**) and italic (*italic*) support.
 * Safely splits & renders as React nodes — no dangerouslySetInnerHTML.
 */
export function RichText({ text, className }: { text: string; className?: string }) {
    if (!text) return null;
    const nodes = parseInline(text);
    return <span className={className}>{nodes}</span>;
}

/**
 * Splits a string on **bold** and *italic* markers and returns React elements.
 */
function parseInline(text: string): React.ReactNode[] {
    // Order matters: try **bold** first, then *italic*
    const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    const parts: React.ReactNode[] = [];
    let last = 0;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(text)) !== null) {
        // Text before this match
        if (match.index > last) {
            parts.push(text.slice(last, match.index));
        }
        const raw = match[0];
        if (raw.startsWith("**")) {
            parts.push(<strong key={match.index}>{raw.slice(2, -2)}</strong>);
        } else {
            parts.push(<em key={match.index}>{raw.slice(1, -1)}</em>);
        }
        last = match.index + raw.length;
    }

    if (last < text.length) {
        parts.push(text.slice(last));
    }
    return parts;
}

/**
 * Renders description text, respecting newlines and bullet points (•, -, *).
 * Also supports **bold** and *italic* inline formatting.
 */
export function DescriptionText({ text, className }: { text: string; className?: string }) {
    if (!text) return null;
    const lines = text.split(/\n/);
    return (
        <div className={className}>
            {lines.map((line, i) => {
                const trimmed = line.trimStart();
                // Treat lines starting with •, -, or* as bullet points
                const isBullet = /^[•\-\*]\s/.test(trimmed);
                const content = isBullet ? trimmed.slice(2) : trimmed;
                return (
                    <p key={i} style={{ marginLeft: isBullet ? "1em" : undefined, textIndent: isBullet ? "-1em" : undefined }}>
                        {isBullet && <span>• </span>}
                        <RichText text={content} />
                    </p>
                );
            })}
        </div>
    );
}

/**
 * Analyzes a bullet point or text block for STAR method alignment
 */
export function analyzeStarMethod(text: string) {
    if (!text || text.length < 10) return { score: 0, feedback: "Keep writing to see STAR analysis..." };

    const indicators = {
        situation: /\b(at|during|while|in|when|scenario|context)\b/i,
        task: /\b(tasked|responsible|goal|objective|target|planned)\b/i,
        action: /\b(led|developed|created|orchestrated|architected|solved|implemented|managed|optimized|built)\b/i,
        result: /\b(resulting in|improved|increased|decreased|saved|delivered|achieved|growth|by|%|\$)\b/i
    };

    let score = 0;
    const missing = [];

    if (indicators.situation.test(text)) score += 25; else missing.push("Situation");
    if (indicators.task.test(text)) score += 25; else missing.push("Task");
    if (indicators.action.test(text)) score += 25; else missing.push("Action");
    if (indicators.result.test(text)) score += 25; else missing.push("Result");

    let feedback = "";
    if (score === 100) {
        feedback = "Excellent! This follows the STAR method perfectly.";
    } else if (score >= 75) {
        feedback = `Great, but consider adding more about the ${missing[0]}.`;
    } else if (score >= 50) {
        feedback = `Balanced, but try to include ${missing.join(" and ")}.`;
    } else {
        feedback = "Try to explain the Situation, Task, Action, and Result.";
    }

    return { score, feedback };
}

/**
 * Identifies weak verbs and suggests strong alternatives
 */
export const verbUpgrades: Record<string, string> = {
    "helped": "facilitated",
    "worked on": "orchestrated",
    "responsible for": "spearheaded",
    "managed": "orchestrated",
    "did": "executed",
    "made": "architected",
    "fixed": "mitigated",
    "improved": "optimized",
    "led": "pioneered",
    "changed": "transformed",
    "used": "leveraged",
    "showed": "demonstrated",
    "tried": "endeavored"
};

export function findWeakVerbs(text: string) {
    const weakVerbs = Object.keys(verbUpgrades);
    const found = [];

    for (const verb of weakVerbs) {
        const regex = new RegExp(`\\b${verb}\\b`, "gi");
        if (regex.test(text)) {
            found.push({ verb, suggestion: verbUpgrades[verb] });
        }
    }

    return found;
}

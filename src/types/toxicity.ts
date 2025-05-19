export type Toxicity = {
    message: string;
    /** Value between -1.00 and 1.00. 0 - neutral, 1 - toxic, -1 - friendly. */
    toxicity: number;
    /** Markdown string. */
    explanation: string;
}

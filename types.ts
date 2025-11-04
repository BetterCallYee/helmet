
export interface HelmetStatus {
    wearsHelmet: boolean;
    reason: string;
}

export interface RuleCompliance {
    isCompliant: boolean;
    reason: string;
}

export interface AnalysisResult {
    helmetStatus: HelmetStatus;
    ruleCompliance: RuleCompliance;
}

export type QuestionType = "text" | "choice" | "standard" | "pause";

export interface BaseQuestion {
    type: QuestionType;
    text: string;
}

export interface TextQuestion extends BaseQuestion {
    type: "text";
}

export interface PauseQuestion extends BaseQuestion {
    type: "pause";
}

export interface ChoiceQuestion extends BaseQuestion {
    type: "choice";
    options: Record<string, string>;
    skip_logic?: Record<string, (string | number)[]>;
}

export interface StandardQuestion extends BaseQuestion {
    type: "standard";
    is_multi_select?: boolean;
    fault_options: Record<string, string>;
    sub_questions?: {
        text: string;
        options: Record<string, string>;
    };
    skip_logic_if_ok?: (string | number)[];
    photo_logic?: {
        show_for?: string[];
        hide_for?: string[];
    };
    default_ok?: string;
    default_fault?: string;
}

export type Question = TextQuestion | ChoiceQuestion | StandardQuestion | PauseQuestion;
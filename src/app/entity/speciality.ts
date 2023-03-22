export enum AnswerType {
    TEXT = "text",
    RADIO = "radio",
    CHECKBOX = "checkbox",
    BOOLEAN = "boolean"
}

export interface Mission {
    name: string;
    question: string;
    answerType: AnswerType;
    answers?: Array<string>;
    answer?: string;
}

export interface Speciality {
    name: string;
    avaliableCertificate: Array<string>
    missions: Array<Mission>;
}
export enum ContractType {
    REMPLA = "Remplacement",
    CDI = "CDI",
    CDD = "CDD",
    INTERIM = "INTERIM",
    FREELANCE = "FREELANCE",
    STAGE = "STAGE",
    ALTERNANCE = "ALTERNANCE"
}

export enum PaymentMethod {
    PER_HOUR = "Taux horaire",
    PER_DAY = "Taux journalier",
    PER_MONTH = "Taux mensuel",
    PER_YEAR = "Taux annuel",
    PERCRENT = "Pourcentage chiffre d'affaire",
}

export interface Contract {
    id: string;
    type: ContractType;
    paymentMethod: Array<PaymentMethod>;
}
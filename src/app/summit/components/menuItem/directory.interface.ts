
export interface IMenuChildrens {
    label: string;
    items: IMenuItem[];
}

export interface IMenuItem {
    label: string;
    icon: string;
    routerLink?: string[] | undefined | null;
    action?: () => void;
    active?: boolean | undefined | null;
    background?: string | undefined | null;
}

export interface IMenuDirectory {
    title: string;
    color: string;
    background: string;
    childrens: IMenuChildrens[];
    icon?: string | undefined | null;
    baseLink: string;
    rotated: boolean;
    active: boolean;
}
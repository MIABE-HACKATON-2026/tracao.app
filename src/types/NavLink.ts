interface NavLinkWithDropdown {
    label: string;
    has_dropdown: true;
    dropdown: DropDownElement[];
    link?: never;
    open: boolean;
}

interface NavLinkWithoutDropdown {
    label: string;
    has_dropdown?: false;
    link: string;
    dropdown?: never;
}

interface DropDownElement {
    label: string;
    link: string;
}

export type NavLinkI = NavLinkWithDropdown | NavLinkWithoutDropdown;

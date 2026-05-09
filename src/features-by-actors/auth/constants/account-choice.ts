import type { IAccountChoice, IBuyerType } from "../types/account-choice";

export const accountChoice: IAccountChoice[] = [
    {
        id: 1,
        illustration: "/account-choice/farmers.png",
        activeIllustration: "/account-choice/farmers-active.png",
        title: "Compte Agriculteur",
        subtitle:
            "Gérez vos récoltes, suivez vos ventes et valorisez chaque étape de votre production en toute simplicité.",
        isSelected: true,
    },
    {
        id: 2,
        illustration: "/account-choice/buyers.png",
        activeIllustration: "/account-choice/buyers-active.png",
        title: "Compte Acheteur",
        subtitle:
            "Accédez à des produits traçables, trouvez des producteurs fiables et suivez vos achats en temps réel.",
        isSelected: false,
    },
    {
        id: 3,
        illustration: "/account-choice/stores.png",
        activeIllustration: "/account-choice/stores-active.png",
        title: "Compte Magasin",
        subtitle:
            "Vendez des produits issus d’une chaîne fiable et offrez à vos clients une transparence totale sur leur origine.",
        isSelected: false,
    },
];


export const buyerCategory: IBuyerType[] = [
    {
        id: 1,
        label: "Individuel",
        isSelected: true
    },
    {
        id: 2,
        label: "Compangine",
        isSelected: false
    },
    {
        id: 3,
        label: "Institution",
        isSelected: false
    }
];
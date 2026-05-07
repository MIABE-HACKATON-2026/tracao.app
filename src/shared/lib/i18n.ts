import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        product: "Product",
        solution: "The solution",
        how_it_works: "How it works",
        platform: "The platform",
        eudr: "EUDR Regulation",
        who_is_concerned: "Who is concerned",
        impact: "Impact",
        use_cases: "Use Cases",
        scan_qr: "Scan QR",
        resources: "Resources",
        about: "About"
      },
      header: {
        login: "Login",
        create_account: "Create account",
        lang_label: "English"
      },
      hero: {
        title: "Cocoa stories, brought to light.",
        subtitle: "From farm to market, Tracao captures every step. Turning each one into trusted, verifiable data.",
        get_started: "Get Started"
      },
      problem: {
        title: "A growing industry, held back",
        subtitle: "Cocoa powers livelihoods and export growth. Yet behind the scenes, the system struggles to keep up.",
        button: "Discover our system"
      },
      solution: {
        title: "Bridging local production and global compliance",
        subtitle: "Tracao digitizes the cocoa supply chain by capturing field data, tracking movements, and securing records using modern technologies.",
        button: "Join Us"
      },
      actors: {
        title: "Built for every actor in the cocoa ecosystem",
        farmers: "Farmers",
        stores: "Stores",
        buyers: "Buyers",
        transporters: "Transporters",
        processors: "Processors",
        agents: "Agents"
      },
      cta: {
        title: "Scan. Verify. Trust us.",
        subtitle: "Get a quick access to verify data of the process of a cocoa harvest travel from farm to market.",
        button: "Verify a batch"
      },
      footer: {
        tagline: "Building the future of traceable cocoa in Africa.",
        product: "Product",
        company: "Company",
        features: "Features",
        how_it_works: "How it works",
        about: "About",
        contact: "Contact",
        partners: "Partners",
        cta_text: "Start tracing your cocoa today.",
        cta_button: "Start"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        product: "Produit",
        solution: "La solution",
        how_it_works: "Comment ça marche",
        platform: "La plateforme",
        eudr: "Réglementation EUDR",
        who_is_concerned: "Qui est concerné",
        impact: "Impact",
        use_cases: "Cas d'utilisation",
        scan_qr: "Scanner QR",
        resources: "Ressources",
        about: "À propos"
      },
      header: {
        login: "Connexion",
        create_account: "Créer un compte",
        lang_label: "Français"
      },
      hero: {
        title: "L'histoire du cacao, mise en lumière.",
        subtitle: "De la ferme au marché, Tracao capture chaque étape. Transformant chacune d'elles en données fiables et vérifiables.",
        get_started: "Commencer"
      },
      problem: {
        title: "Une industrie en croissance, freinée par le système",
        subtitle: "Le cacao alimente les moyens de subsistance et la croissance des exportations. Pourtant, en coulisses, le système peine à suivre.",
        button: "Découvrez notre système"
      },
      solution: {
        title: "Concilier production locale et conformité mondiale",
        subtitle: "Tracao numérise la chaîne d'approvisionnement du cacao en capturant les données sur le terrain, en suivant les mouvements et en sécurisant les enregistrements.",
        button: "Rejoignez-nous"
      },
      actors: {
        title: "Conçu pour chaque acteur de l'écosystème du cacao",
        farmers: "Producteurs",
        stores: "Magasins",
        buyers: "Acheteurs",
        transporters: "Transporteurs",
        processors: "Transformateurs",
        agents: "Agents"
      },
      cta: {
        title: "Scannez. Vérifiez. Faites-nous confiance.",
        subtitle: "Accédez rapidement aux données de vérification du processus de récolte du cacao, de la ferme au marché.",
        button: "Vérifier un lot"
      },
      footer: {
        tagline: "Construire l'avenir du cacao traçable en Afrique.",
        product: "Produit",
        company: "Entreprise",
        features: "Fonctionnalités",
        how_it_works: "Comment ça marche",
        about: "À propos",
        contact: "Contact",
        partners: "Partenaires",
        cta_text: "Commencez à tracer votre cacao dès aujourd'hui.",
        cta_button: "Commencer"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

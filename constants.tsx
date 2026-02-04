
import { SolutionPackage, FAQItem, PortfolioItem } from './types';

export const COMPANY_INFO = {
  name: "Atlas Soluções Digitais",
  cnpj: "62.561.278/0001-95",
  address: "Rua Cruz Alta, 97, Barra de Jangada - Jaboatão dos Guararapes, PE",
  phones: ["(81) 96000-2151", "(81) 96000-0000"],
  email: "contato@atlasdigital.com.br",
  hours: "09:00 - 21:00",
  area: "Brasil"
};

export const PACKAGES: SolutionPackage[] = [
  {
    id: 1,
    title: "Presence Core",
    description: "Ideal para empresas que buscam visibilidade local e institucional sólida.",
    deliveryTime: "24H",
    features: [
      "Otimização Google Maps (GMB)",
      "Landing Page Performance-First",
      "Hospedagem Enterprise",
      "SEO Local Estruturado"
    ],
    recommendedFor: "Pequenos negócios e profissionais liberais"
  },
  {
    id: 2,
    title: "Business Flow",
    description: "Sincronize sua visibilidade com um processo de orçamento automatizado via WhatsApp.",
    deliveryTime: "24H",
    features: [
      "Tudo do pacote Presence Core",
      "Sistema de Orçamento Digital",
      "Dashboard de Leads",
      "Automação de E-mail/WhatsApp",
      "Integração CRM"
    ],
    highlight: true,
    recommendedFor: "Empresas de serviços e indústrias"
  },
  {
    id: 3,
    title: "Service Pro",
    description: "Operação completa com gestão de agendamentos e horários em tempo real.",
    deliveryTime: "48H",
    features: [
      "Tudo do pacote Presence Core",
      "Sistema de Agendamento Inteligente",
      "Gestão de Calendário Multi-Equipe",
      "Pagamento Online Integrado",
      "Lembretes SMS/Push Automatizados"
    ],
    recommendedFor: "Clínicas, Estética e Consultorias"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "A Atlas desenvolve aplicativos mobile?",
    answer: "Sim, desenvolvemos ecossistemas completos. Nossas soluções são web-first, mas entregamos PWA (Progressive Web Apps) e nativos dependendo da complexidade técnica do projeto."
  },
  {
    question: "Quanto tempo leva para implementar uma solução?",
    answer: "Projetos padrão de Landing Page + Maps levam entre 24h a 48h úteis. Sistemas customizados complexos podem variar conforme as integrações específicas."
  },
  {
    question: "As soluções da Atlas são escaláveis?",
    answer: "Absolutamente. Utilizamos infraestrutura cloud de nível enterprise (AWS/Google Cloud/Vercel) garantindo que seu sistema suporte de 10 a 100.000 usuários sem degradação."
  },
  {
    question: "Há suporte técnico após a entrega?",
    answer: "Oferecemos garantia técnica vitalícia para bugs de código e planos de manutenção mensal para atualizações de segurança e evolução de funcionalidades."
  },
  {
    question: "Os sistemas se integram com o que eu já uso?",
    answer: "Sim, nossas APIs são abertas. Integramos com RD Station, HubSpot, Salesforce, meios de pagamento (Stripe, Pagar.me) e ERPs via Webhooks."
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Landing Page - AC CLIMA", category: "Climatização", imageUrl: "/images/acclimape.webp" },
  { id: 2, title: "Landing Page - GM CLIMATIZAÇÃO E ELÉTRICA", category: "Climatização e elétrica", imageUrl: "/images/gmclimape.webp" },
  { id: 3, title: "Landing Page - Climar Soluções", category: "Climatização", imageUrl: "/images/climarrecife.webp" },
  { id: 4, title: "Landing Page - Mattos Elétrica e Automação", category: "Elétrica e automação", imageUrl: "#" },
  { id: 5, title: "Landing Page e Sistema de Orçamento - VOERAPIDO.com", category: "Agência de Turismo", imageUrl: "#" }];

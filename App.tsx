import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  MapPin,
  FileText,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Clock,
  Phone,
  Mail,
  Building2,
  Instagram
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, animate, useInView, useSpring } from 'framer-motion';
import { PACKAGES, FAQ_ITEMS, PORTFOLIO_ITEMS, COMPANY_INFO } from './constants';
import { fadeUp, staggerContainer, itemVariant, cardHover, buttonHover } from './variants';

// --- Counter Component ---
const Counter: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration: 2,
        ease: 'easeOut',
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return controls.stop;
    }
  }, [isInView, target, count]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

// --- Section Divider Component ---
const SectionDivider: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center py-24">
      
      {/* Linha esquerda */}
      <div className="flex-1 h-px bg-gradient-to-r 
                      from-transparent via-atlas-support 
                      to-atlas-primary/60 opacity-40" />

      {/* Centro com Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-8 w-20 h-20 rounded-full 
                   border border-atlas-primary/20 
                   bg-atlas-surface/80 backdrop-blur-md
                   flex items-center justify-center
                   shadow-[0_0_35px_rgba(0,166,200,0.15)]"
      >
        <img
          src="/images/logo.svg"
          alt="Atlas"
          className="w-9 h-9 opacity-95"
        />
      </motion.div>

      {/* Linha direita */}
      <div className="flex-1 h-px bg-gradient-to-l 
                      from-transparent via-atlas-support 
                      to-atlas-primary/60 opacity-40" />
    </div>
  );
};

// --- Header Component ---
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-atlas-bg/90 backdrop-blur-md border-b border-atlas-support'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3 group cursor-pointer"
          whileHover={{ x: 5 }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center">
            <img
              src="/images/logo.svg"
              alt="Atlas"
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </div>

          {/* ATLAS + subtítulo */}
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight">ATLAS</span>
            <span className="text-[11px] md:text-xs text-atlas-secondary tracking-widest uppercase">
              Soluções digitais
            </span>
          </div>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-atlas-secondary">
          {['Soluções', 'Como funciona', 'Cases'].map((item, idx) => (
            <motion.a
              key={idx}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="relative hover:text-atlas-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 166, 200, 0.1)' }}
            className="px-5 py-2 border border-atlas-support rounded-full hover:border-atlas-primary hover:text-white transition-all"
          >
            Contato
          </motion.a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-atlas-bg border-b border-atlas-support p-6"
          >
            <div className="flex flex-col gap-6 text-lg font-medium">
              <a href="#solucoes" onClick={() => setIsMobileMenuOpen(false)}>
                Soluções
              </a>
              <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)}>
                Como funciona
              </a>
              <a href="#cases" onClick={() => setIsMobileMenuOpen(false)}>
                Cases
              </a>
              <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-atlas-primary"
              >
                Falar com Consultor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// --- Selection Quiz Component ---
const ChoiceQuiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      q: 'Qual o seu objetivo principal hoje?',
      options: ['Apenas ser encontrado', 'Capturar orçamentos', 'Gerenciar agendamentos']
    },
    {
      q: 'Qual o tamanho da sua operação?',
      options: ['Autônomo / Pequena', 'Média com equipe', 'Grande escala / Enterprise']
    }
  ];

  const handleChoice = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length);
    }
  };

  const getResult = () => {
    if (answers[0] === 2) return PACKAGES[2];
    if (answers[0] === 1) return PACKAGES[1];
    return PACKAGES[0];
  };

  return (
    <motion.div
      layout
      className="bg-atlas-surface border border-atlas-support rounded-2xl p-8 max-w-2xl mx-auto overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-xs font-bold text-atlas-primary uppercase tracking-widest mb-4 block">
              Pergunta {step + 1} de {questions.length}
            </span>
            <h3 className="text-2xl font-bold mb-8">{questions[step].q}</h3>
            <div className="grid gap-4">
              {questions[step].options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleChoice(i)}
                  whileHover={{
                    scale: 1.02,
                    borderColor: '#00A6C8',
                    backgroundColor: 'rgba(11, 60, 74, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-5 rounded-xl bg-atlas-bg border border-atlas-support transition-all flex items-center justify-between group"
                >
                  <span className="font-medium text-atlas-secondary group-hover:text-white">{opt}</span>
                  <ChevronRight size={18} className="text-atlas-support group-hover:text-atlas-primary" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-atlas-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-atlas-primary" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Recomendamos: {getResult().title}</h3>
            <p className="text-atlas-secondary mb-8">
              Baseado em suas respostas, este pacote possui as ferramentas ideais para seu estágio atual.
            </p>
            <motion.a
              href="#solucoes"
              whileHover={buttonHover}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-3 bg-atlas-primary text-white rounded-lg font-semibold transition-all"
              onClick={() => {
                setStep(0);
                setAnswers([]);
              }}
            >
              Ver Detalhes do Pacote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- FAQ Accordion Component ---
const FAQItemComponent: React.FC<{ item: (typeof FAQ_ITEMS)[0] }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout className="border-b border-atlas-support last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="text-lg font-medium text-atlas-secondary group-hover:text-white transition-colors">
          {item.question}
        </span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={20} className="text-atlas-support group-hover:text-atlas-primary transition-colors" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-atlas-secondary leading-relaxed pb-6">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Presence Core (Entrega 24h)',
    message: ''
  });

  // Mouse Glow Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = COMPANY_INFO.phones[0].replace(/\D/g, '');
    const textMessage = `Olá, Atlas Digital! 👋\nGostaria de solicitar um diagnóstico técnico para minha empresa.\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n*Solução:* ${formData.interest}\n*Mensagem:* ${
      formData.message || 'Sem mensagem adicional.'
    }\n\nAguardo contato para próximos passos.`;
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(textMessage)}`, '_blank');
  };

  return (
    <div className="min-h-screen relative" onMouseMove={handleMouseMove}>
      {/* Background Mouse Glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle 400px at ${springX}px ${springY}px, rgba(0, 166, 200, 0.03), transparent 100%)`
        }}
      />

      <Header />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-44 pb-32 px-6 overflow-hidden">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 50% 50%, rgba(0,166,200,0.1) 0%, transparent 60%)',
                'radial-gradient(circle at 40% 60%, rgba(62,198,224,0.08) 0%, transparent 60%)',
                'radial-gradient(circle at 50% 50%, rgba(0,166,200,0.1) 0%, transparent 60%)'
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] blur-[120px] pointer-events-none"
          />
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-atlas-support/30 border border-atlas-support text-atlas-highlight text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Zap size={14} className="animate-pulse" />
              Sistemas Digitais Enterprise
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
            >
              A arquitetura robusta para <br />
              <span className="text-atlas-primary">sua operação digital.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-atlas-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Desenvolvimento acelerado de alto impacto. <br />
              Entregamos sua Landing Page + Google Maps em até{' '}
              <span className="text-white font-bold">24 horas</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="#contato"
                whileHover={buttonHover}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-atlas-primary text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
              >
                Solicitar em 24h <ArrowRight size={20} />
              </motion.a>
              <motion.a
                href="#cases"
                whileHover={{ backgroundColor: 'rgba(11, 60, 74, 0.2)' }}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-atlas-support text-white rounded-lg font-bold transition-all text-center"
              >
                Ver Cases de Sucesso
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          className="py-32 px-6 border-t border-atlas-support bg-atlas-surface/30"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Infraestrutura digital <br /> que gera autoridade.
                </h2>
                <p className="text-atlas-secondary text-lg mb-8">
                  Diferente de landing pages genéricas, nossas entregas são pensadas como produtos.
                  Código limpo, SEO técnico impecável e foco absoluto em conversão de alto valor.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Escalabilidade', icon: BarChart3, desc: 'Sistemas prontos para crescer.' },
                    { title: 'Segurança', icon: ShieldCheck, desc: 'Proteção de dados enterprise.' },
                    { title: 'Entrega Express', icon: Clock, desc: 'Sistemas online em até 24h.' },
                    { title: 'Foco em ROI', icon: Users, desc: 'Otimizado para resultados.' }
                  ].map((f, i) => (
                    <motion.div key={i} variants={itemVariant} className="flex flex-col gap-2">
                      <f.icon className="text-atlas-primary mb-1" size={24} />
                      <h4 className="font-bold text-white">{f.title}</h4>
                      <p className="text-sm text-atlas-secondary">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} className="bg-atlas-bg rounded-2xl border border-atlas-support p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BarChart3 size={120} />
                </div>
                <div className="space-y-6 relative z-10">
                  {[
                    { icon: MapPin, label: 'Google Maps', value: 'Otimização Profissional GMN', color: 'text-atlas-primary', bg: 'bg-atlas-primary/20' },
                    { icon: Zap, label: 'Agilidade', value: 'Implantação em até 48h', color: 'text-atlas-highlight', bg: 'bg-atlas-highlight/20' },
                    { icon: FileText, label: 'Conversão', value: 'Captura via WhatsApp Business', color: 'text-white', bg: 'bg-atlas-support/40' }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 bg-atlas-surface p-4 rounded-xl border border-atlas-support/50"
                    >
                      <div className={`w-10 h-10 rounded ${stat.bg} flex items-center justify-center ${stat.color}`}>
                        <stat.icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-atlas-secondary uppercase font-bold">{stat.label}</p>
                        <p className="font-medium">{stat.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <SectionDivider />
        {/* SOLUTIONS/PACKAGES SECTION */}
        <section id="solucoes" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Soluções modulares</h2>
              <p className="text-atlas-secondary text-lg max-w-2xl mx-auto">
                Desenvolvemos o ecossistema exato para o momento da sua jornada digital com prazos recordes de implantação.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid lg:grid-cols-3 gap-8">
              {PACKAGES.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  variants={itemVariant}
                  whileHover={cardHover}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col ${
                    pkg.highlight ? 'bg-atlas-surface border-atlas-primary/50' : 'bg-atlas-surface/50 border-atlas-support'
                  }`}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-atlas-support/40 border border-atlas-support text-atlas-highlight text-[10px] font-bold">
                    <Clock size={12} /> {pkg.deliveryTime}
                  </div>
                  {pkg.highlight && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-atlas-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest"
                    >
                      Mais Procurado
                    </motion.div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                  <p className="text-atlas-secondary text-sm mb-8 h-12 leading-relaxed">{pkg.description}</p>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 size={18} className="text-atlas-primary shrink-0 mt-0.5" />
                        <span className="text-atlas-secondary">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-atlas-support/50">
                    <p className="text-xs text-atlas-support font-bold uppercase mb-4 tracking-tighter">Indicado para:</p>
                    <p className="text-sm font-medium mb-8">{pkg.recommendedFor}</p>
                    <motion.a
                      href="#contato"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData((prev) => ({ ...prev, interest: `${pkg.title} (Entrega ${pkg.deliveryTime})` }))}
                      className={`w-full py-4 rounded-xl font-bold transition-all block text-center ${
                        pkg.highlight ? 'bg-atlas-primary text-white hover:brightness-110' : 'bg-atlas-bg border border-atlas-support text-white hover:border-atlas-primary'
                      }`}
                    >
                      Selecionar Solução
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* QUIZ SECTION */}
        <section className="py-32 px-6 bg-atlas-surface/20 border-y border-atlas-support">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ainda em dúvida?</h2>
              <p className="text-atlas-secondary">Responda 2 perguntas e deixe nosso sistema recomendar a melhor arquitetura.</p>
            </motion.div>
            <ChoiceQuiz />
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="como-funciona" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Workflow de Engenharia</h2>
              <p className="text-atlas-secondary text-lg max-w-2xl mx-auto">Nosso processo é técnico e transparente. Do diagnóstico à sustentação contínua.</p>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Arquitetura', desc: 'Mapeamento técnico de fluxos e requisitos.' },
                { step: '02', title: 'Desenvolvimento', desc: 'Codificação limpa com foco em performance.' },
                { step: '03', title: 'QA & Stress Test', desc: 'Garantia de que nada quebra sob carga.' },
                { step: '04', title: 'Launch & Escala', desc: 'Deploy contínuo e monitoramento de KPIs.' }
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariant} className="relative p-6 group">
                  {/* Blue glowing step number */}
                  <motion.div
                    animate={{
                      opacity: [0.55, 1, 0.55],
                      filter: [
                        'drop-shadow(0 0 0px rgba(0,166,200,0.0)) drop-shadow(0 0 0px rgba(62,198,224,0.0))',
                        'drop-shadow(0 0 14px rgba(0,166,200,0.55)) drop-shadow(0 0 30px rgba(62,198,224,0.25))',
                        'drop-shadow(0 0 0px rgba(0,166,200,0.0)) drop-shadow(0 0 0px rgba(62,198,224,0.0))'
                      ]
                    }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                    className="text-6xl font-black text-atlas-primary/70 mb-4 group-hover:text-atlas-primary transition-colors"
                  >
                    {item.step}
                  </motion.div>

                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-atlas-secondary text-sm leading-relaxed">{item.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-atlas-support"></div>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PORTFOLIO SECTION */}
        <section id="cases" className="py-32 px-6 bg-atlas-surface/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Portfólio Técnico</h2>
                <p className="text-atlas-secondary text-lg">Produtos digitais que hoje sustentam grandes operações.</p>
              </div>
              <motion.button whileHover={{ x: 5 }} className="flex items-center gap-2 text-atlas-primary font-bold hover:underline">
                Ver todos os cases <ChevronRight size={18} />
              </motion.button>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PORTFOLIO_ITEMS.map((item) => (
                <motion.div key={item.id} variants={itemVariant} className="group cursor-pointer">
                  <div className="aspect-[3/2] rounded-2xl overflow-hidden border border-atlas-support mb-4 bg-atlas-surface relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-atlas-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs font-bold text-atlas-primary uppercase tracking-widest mb-1">{item.category}</p>
                  <h4 className="text-xl font-bold text-white group-hover:text-atlas-highlight transition-colors">{item.title}</h4>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY IT WORKS SECTION */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-atlas-primary rounded-3xl p-12 md:p-20 overflow-hidden relative"
            >
              <motion.div
                animate={{ x: [0, 50, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/2 pointer-events-none"
              />
              <div className="grid md:grid-cols-3 gap-12 relative z-10 text-center md:text-left">
                <div>
                  <div className="text-5xl font-bold text-white mb-2">
                    <Counter target={99.9} suffix="%" />
                  </div>
                  <p className="text-white/80 font-medium">Uptime garantido por SLA em nossas soluções enterprise.</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">
                    <Counter target={250} suffix="+" />
                  </div>
                  <p className="text-white/80 font-medium">Empresas que migraram de sistemas legados para Atlas.</p>
                </div>
                <div>
                  <div className="text-5xl font-bold text-white mb-2">
                    &lt;<Counter target={2} suffix="s" />
                  </div>
                  <p className="text-white/80 font-medium">Tempo médio de carregamento de nossas interfaces.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-32 px-6 bg-atlas-bg">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Dúvidas Frequentes</h2>
              <p className="text-atlas-secondary">Transparência técnica em cada detalhe.</p>
            </motion.div>
            <motion.div layout className="space-y-2">
              {FAQ_ITEMS.map((item, idx) => (
                <FAQItemComponent key={idx} item={item} />
              ))}
            </motion.div>
          </div>
        </section>
        <SectionDivider />
        {/* FINAL CTA SECTION */}
        <section id="contato" className="py-32 px-6 border-t border-atlas-support bg-gradient-to-b from-atlas-bg to-atlas-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Vamos construir sua <br /> próxima vantagem <span className="text-atlas-primary">competitiva</span>?
                </h2>
                <p className="text-atlas-secondary text-lg mb-12">
                  Agende um diagnóstico técnico gratuito. Analisaremos sua presença atual e mapearemos as oportunidades de automação e escala.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Phone, title: 'Canais Diretos WhatsApp', detail: COMPANY_INFO.phones.join(' / ') },
                    { icon: Mail, title: 'E-mail Corporativo', detail: COMPANY_INFO.email },
                    { icon: Clock, title: 'Horário de Atendimento', detail: `${COMPANY_INFO.hours} (Segunda a Sábado)` }
                  ].map((contact, i) => (
                    <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-4 group">
                      <div className="w-12 h-12 rounded-full border border-atlas-support flex items-center justify-center text-atlas-primary group-hover:border-atlas-primary transition-colors">
                        <contact.icon size={20} />
                      </div>
                      <div>
                        <h5 className="font-bold">{contact.title}</h5>
                        <p className="text-sm text-atlas-secondary">{contact.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-atlas-surface border border-atlas-support p-8 md:p-10 rounded-3xl"
              >
                <form className="space-y-6" onSubmit={handleWhatsAppSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-atlas-secondary uppercase">Nome Completo</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-atlas-bg border border-atlas-support rounded-lg px-4 py-3 focus:outline-none focus:border-atlas-primary transition-colors text-white"
                        placeholder="Ex: João Silva"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-atlas-secondary uppercase">E-mail Corporativo</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-atlas-bg border border-atlas-support rounded-lg px-4 py-3 focus:outline-none focus:border-atlas-primary transition-colors text-white"
                        placeholder="joao@empresa.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-atlas-secondary uppercase">Solução de Interesse</label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      className="w-full bg-atlas-bg border border-atlas-support rounded-lg px-4 py-3 focus:outline-none focus:border-atlas-primary transition-colors appearance-none text-white"
                    >
                      <option value="Presence Core (Entrega 24h)">Presence Core (Entrega 24h)</option>
                      <option value="Business Flow (Entrega 24h)">Business Flow (Entrega 24h)</option>
                      <option value="Service Pro (Entrega 48h)">Service Pro (Entrega 48h)</option>
                      <option value="Solução Customizada">Solução Customizada</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-atlas-secondary uppercase">Mensagem (Opcional)</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-atlas-bg border border-atlas-support rounded-lg px-4 py-3 focus:outline-none focus:border-atlas-primary transition-colors text-white"
                      placeholder="Conte brevemente sobre seu desafio atual"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{
                      scale: 1.02,
                      background: 'linear-gradient(90deg, #00A6C8, #3EC6E0, #00A6C8)',
                      backgroundSize: '200% 100%'
                    }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-full py-4 bg-atlas-primary text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    Enviar Diagnóstico <ArrowRight size={18} />
                  </motion.button>
                  <p className="text-[10px] text-center text-atlas-support uppercase font-bold tracking-widest">
                    Ao enviar, você será redirecionado para nosso WhatsApp oficial.
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 px-6 border-t border-atlas-support/30 bg-atlas-bg relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <motion.div whileHover={{ scale: 1.03 }} className="flex items-center gap-3">
                {/* Frosted glass logo container */}
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(0,166,200,0.12)]">
                  <img src="/images/logo.svg" alt="Atlas" className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight">ATLAS</span>
              </motion.div>

              <p className="text-atlas-secondary text-sm max-w-sm leading-relaxed">
                Arquitetura de produtos digitais robustos com foco em performance e escala. Líderes em implantação express para soluções corporativas.
              </p>

              <div className="flex gap-4 text-sm text-atlas-support font-medium">
                <motion.a
                  href="#"
                  whileHover={{ color: '#00A6C8', y: -2 }}
                  className="cursor-pointer transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </motion.a>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-atlas-primary">Informações Legais</h5>
              <div className="space-y-3 text-sm text-atlas-secondary">
                <p className="flex items-start gap-2">
                  <Building2 size={16} className="shrink-0 mt-0.5" />
                  <span>CNPJ: {COMPANY_INFO.cnpj}</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Users size={16} className="shrink-0 mt-0.5" />
                  <span>Atendimento: {COMPANY_INFO.area}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase tracking-widest text-atlas-primary">Canais de Contato</h5>
              <div className="space-y-3 text-sm text-atlas-secondary">
                {COMPANY_INFO.phones.map((phone, i) => (
                  <p key={i} className="flex items-center gap-2">
                    <Phone size={16} /> {phone}
                  </p>
                ))}
                <p className="flex items-center gap-2">
                  <Mail size={16} /> {COMPANY_INFO.email}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} /> {COMPANY_INFO.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-atlas-support/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-atlas-support">© 2024 Atlas Soluções Digitais. Todos os direitos reservados.</div>
            <div className="flex gap-6 text-xs text-atlas-support">
              {['Política de Privacidade', 'Termos de Uso', 'Compliance'].map((item, i) => (
                <motion.span key={i} whileHover={{ color: '#C7CCD6' }} className="cursor-pointer transition-colors">
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
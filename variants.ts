
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.4, 0, 0.2, 1] 
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const cardHover = {
  y: -8,
  boxShadow: "0 20px 60px rgba(0, 166, 200, 0.15)",
  borderColor: "#00A6C8"
};

export const buttonHover = {
  y: -2,
  boxShadow: "0 10px 40px rgba(0, 166, 200, 0.3)"
};

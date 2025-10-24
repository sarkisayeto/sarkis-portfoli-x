import { useMemo } from "react";
import { motion } from "framer-motion";

// Simple inline WhatsApp SVG icon to avoid extra deps
const WhatsAppIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M19.11 17.21c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.09-.16.2-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.37-1.64-1.53-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.27.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.46-.16 0-.34 0-.52 0s-.48.07-.73.34c-.25.28-.96.94-.96 2.29 0 1.35.99 2.66 1.13 2.84.14.18 1.95 2.98 4.73 4.17.66.29 1.17.46 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
    <path d="M26.76 5.24A12.9 12.9 0 0 0 16 1.33C8.36 1.33 2.17 7.52 2.17 15.17c0 2.46.66 4.82 1.92 6.91L2 30.67l8.79-2.31a13.01 13.01 0 0 0 5.21 1.08c7.64 0 13.83-6.19 13.83-13.83 0-3.69-1.44-7.16-3.98-9.61zM16 27.33c-1.66 0-3.29-.32-4.82-.97l-.35-.15-5.2 1.37 1.39-5.07-.16-.35a11.3 11.3 0 1 1 9.14 5.17z" />
  </svg>
);

export default function WhatsAppButton() {
  const phoneNumberRaw = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
  const defaultMessage = import.meta.env.VITE_WHATSAPP_MESSAGE as string | undefined;

  const href = useMemo(() => {
    if (!phoneNumberRaw) return undefined;
    const digits = phoneNumberRaw.replace(/\D/g, ""); // wa.me requires digits only
    const message = defaultMessage || "Bonjour Sarkis ! Je viens de votre portfolio.";
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
  }, [phoneNumberRaw, defaultMessage]);

  // Do not render if no number configured
  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-moi sur WhatsApp"
      title="WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full text-white shadow-lg hover:shadow-2xl bg-[#25D366] transition-transform duration-300"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: [1, 1.1, 1], opacity: 1 }}
      //transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.96 }}
    >
      <WhatsAppIcon className="w-6 h-6 md:w-8 md:h-8" />
    </motion.a>
  );
}

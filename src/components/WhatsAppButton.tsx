import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "256709634182"; // Primary official church mobile number
  const message = encodeURIComponent(
    "Hello Renewal Church Buloba, I visited your website and would like to connect / request prayer. God bless you!"
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      referrerPolicy="no-referrer"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-green-400/50"
      title="Chat with us on WhatsApp"
      aria-label="Contact Church on WhatsApp"
    >
      {/* Tooltip bubble on hover */}
      <span className="absolute right-14 bg-brand-brown text-brand-cream text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-brand-gold/20 mr-2">
        Need assistance? Chat on WhatsApp
      </span>
      <MessageCircle className="w-6 h-6 fill-current" />
      
      {/* Gentle ping animation for attention */}
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-gold"></span>
      </span>
    </a>
  );
}

import React, { useState } from "react";
import { FAQS } from "../data";
import { Plus, Minus, HelpCircle, Mail, MessageSquare } from "lucide-react";

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="church-faq-section" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block">
            Answering Your Queries
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
            FREQUENTLY ASKED QUESTIONS
          </h3>
          <p className="text-xs text-brand-charcoal-light leading-relaxed font-sans">
            New to Renewal Buloba or planning a visit? Here are direct answers to common questions about our doctrine, local cell timings, kids church, and online giving options.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={item.id}
                className="bg-brand-cream/20 hover:bg-brand-cream/40 rounded-3xl border border-brand-brown/10 transition-all text-left"
                id={`faq-item-${item.id}`}
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-gold shrink-0" />
                    <span className="font-display text-xs.5 md:text-sm font-bold text-brand-brown">
                      {item.question}
                    </span>
                  </div>
                  <span className="bg-brand-brown/5 group-hover:bg-brand-brown/10 p-1.5 rounded-full text-brand-brown shrink-0 transition-colors">
                    {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Animated Body Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-xs text-brand-charcoal-light leading-relaxed border-t border-brand-brown/5 animate-fade-in font-sans">
                    <p className="text-brand-charcoal leading-relaxed font-sans">
                      {item.answer}
                    </p>
                    
                    {/* Category Label */}
                    <div className="mt-3 flex items-center justify-between text-xxs font-mono text-brand-brown-light font-bold uppercase">
                      <span>Category: {item.category}</span>
                      <span className="text-brand-gold">● Verified</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Micro Footer Suggestion */}
        <div className="bg-brand-cream p-5 rounded-3xl border border-brand-brown/5 text-center text-xs space-y-2 mt-8 font-sans max-w-xl mx-auto">
          <p className="text-brand-charcoal-light">
            Do you have any secondary questions that weren't answered above?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-bold">
            <span className="text-brand-brown font-mono text-[11px] font-bold uppercase tracking-wide flex items-center gap-1">
              📞 +256 709 634 182
            </span>
            <span className="hidden sm:inline text-brand-brown-light">|</span>
            <span className="text-brand-brown font-mono text-[11px] font-bold uppercase tracking-wide flex items-center gap-1">
              ✉ rmwawasi@afru.ac.ug
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

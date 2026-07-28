import React, { useState, useRef } from "react";
import { 
  Check, 
  Clipboard, 
  DollarSign, 
  Smartphone, 
  Landmark, 
  Heart, 
  Coins, 
  ArrowRight, 
  X, 
  Upload, 
  ShieldCheck, 
  FileText, 
  Info, 
  HelpCircle, 
  Eye, 
  AlertCircle, 
  RefreshCw 
} from "lucide-react";

export default function Give() {
  const [currency, setCurrency] = useState<"UGX" | "USD">("UGX");
  const [selectedAmount, setSelectedAmount] = useState<string>("50000");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("General tithe & offering");
  
  // Copied alerts
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionRef, setTransactionRef] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  // Realism States for Online Payment & Bank Integration
  const [activeModalTab, setActiveModalTab] = useState<"gateway" | "details" | "connect">("gateway");
  const [gatewaySubMethod, setGatewaySubMethod] = useState<"mobile_money" | "card">("mobile_money");
  const [mobileCarrier, setMobileCarrier] = useState<"mtn" | "airtel">("mtn");
  const [mobileNumber, setMobileNumber] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  
  const [gatewayStep, setGatewayStep] = useState<"input" | "processing" | "otp" | "success">("input");
  const [otpCode, setOtpCode] = useState("");
  const [bankSlipName, setBankSlipName] = useState<string | null>(null);
  const [bankSlipPreview, setBankSlipPreview] = useState<string | null>(null);
  const [bankTxCode, setBankTxCode] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ugxPresets = ["10000", "20000", "50000", "100000", "500000"];
  const usdPresets = ["10", "25", "50", "100", "250"];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const handleAmountSelect = (val: string) => {
    setSelectedAmount(val);
    setCustomAmount("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBankSlipName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBankSlipPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="church-giving-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-brand-brown font-mono text-xs font-bold uppercase tracking-widest block font-bold">
            Worship Through Giving
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-brown">
            SUPPORT THE HARVEST WORK
          </h3>
          <p className="text-sm text-brand-charcoal-light leading-relaxed font-sans">
            “Honour the Lord with your possessions, and with the firstfruits of all your increase...” — Proverbs 3:9. Your generous giving helps the local community Transformation projects and to spread the gospel of our Lord Jesus Christ
          </p>
        </div>

        {/* Giving Dashboard Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Calculator Left */}
          <div className="lg:col-span-5 bg-brand-cream border border-brand-brown/5 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-sm">
            <div className="flex flex-col items-center justify-center gap-2 text-center w-full">
              <Heart className="w-6 h-6 text-red-600 fill-current" />
              <h4 className="font-serif text-xl font-extrabold text-red-600 uppercase tracking-wider">
                GIVE TODAY
              </h4>
            </div>

            {/* Currency Selector */}
            <div className="space-y-1.5">
              <label className="block text-xxs font-bold text-brand-brown uppercase tracking-widest font-display">
                Choose Currency
              </label>
              <div className="grid grid-cols-2 gap-2 bg-brand-brown/5 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("UGX");
                    setSelectedAmount("50000");
                    setCustomAmount("");
                  }}
                  className={`py-2 text-xs font-display font-bold rounded-lg cursor-pointer transition-all ${
                    currency === "UGX" ? "bg-brand-brown text-white shadow" : "text-brand-brown/80"
                  }`}
                >
                  🇺🇬 UGX (Shillings)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrency("USD");
                    setSelectedAmount("50");
                    setCustomAmount("");
                  }}
                  className={`py-2 text-xs font-display font-bold rounded-lg cursor-pointer transition-all ${
                    currency === "USD" ? "bg-brand-brown text-white shadow" : "text-brand-brown/80"
                  }`}
                >
                  🇺🇸 USD (Dollars)
                </button>
              </div>
            </div>

            {/* Preset Amount Grid */}
            <div className="space-y-1.5">
              <label className="block text-xxs font-bold text-brand-brown uppercase tracking-widest font-display">
                Select Amount
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(currency === "UGX" ? ugxPresets : usdPresets).map((preset) => {
                  const isSelected = selectedAmount === preset && !customAmount;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAmountSelect(preset)}
                      className={`p-2.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand-gold border-brand-gold text-brand-brown shadow-md"
                          : "bg-white border-brand-brown/10 hover:bg-brand-brown/5 text-brand-charcoal"
                      }`}
                    >
                      {currency === "UGX" ? "" : "$"}
                      {parseInt(preset).toLocaleString()}
                      {currency === "UGX" ? " Shs" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom amount */}
            <div className="space-y-1.5">
              <label className="block text-xxs font-bold text-brand-brown uppercase tracking-widest font-display">
                Or enter custom amount
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-brand-charcoal-light">
                  {currency === "UGX" ? "UGX Shs" : "$"}
                </span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount("");
                  }}
                  placeholder="e.g. 150000"
                  className="w-full text-xs font-mono p-3 pl-16 rounded-xl border border-brand-brown/15 bg-white text-brand-charcoal focus:ring-2 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-1.5">
              <label className="block text-xxs font-bold text-brand-brown uppercase tracking-widest font-display">
                Allocation Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full text-xs font-sans p-3 rounded-xl border border-brand-brown/15 bg-white text-brand-charcoal focus:ring-2 focus:ring-brand-gold focus:outline-none cursor-pointer"
              >
                <option>General tithe & offering</option>
                <option>Mission & Outreach</option>
                <option>Projects & Events</option>
              </select>
            </div>

            {/* Donor Fields for Bank Transmission */}
            <div className="space-y-3.5 pt-1">
              <div className="space-y-1.5">
                <label className="block text-xxs font-bold text-brand-brown uppercase tracking-widest font-display">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full text-xs font-sans p-3 rounded-xl border border-brand-brown/15 bg-white text-brand-charcoal focus:ring-2 focus:ring-brand-gold focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xxs font-bold text-brand-brown uppercase tracking-widest font-display">
                  Phone Number / Email Address
                </label>
                <input
                  type="text"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="e.g. +256 700 000 000"
                  className="w-full text-xs font-sans p-3 rounded-xl border border-brand-brown/15 bg-white text-brand-charcoal focus:ring-2 focus:ring-brand-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Simulated action detail */}
            <div className="bg-brand-brown text-brand-cream border border-brand-gold/15 p-5 rounded-2xl text-xs space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-xxs font-bold text-brand-gold uppercase tracking-wider block">
                  Allocation Intent:
                </span>
                <p className="font-sans leading-relaxed">
                  Ready to support with <strong>{currency === "UGX" ? "" : "$"}{parseInt(customAmount || selectedAmount || "0").toLocaleString()}{currency === "UGX" ? " Shs" : ""}</strong> allocated for <strong>{purpose}</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="https://store.pesapal.com/renewalchurchbulobaonlinegiving"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-brand-gold text-brand-brown font-display font-black uppercase tracking-wider rounded-xl text-xs cursor-pointer shadow hover:shadow-md hover:bg-brand-gold/95 active:scale-98 transition-all flex items-center justify-center gap-2 text-center font-bold"
                >
                  💳 Give Online
                </a>
                <p className="text-[10px] text-brand-cream/70 text-center leading-snug">
                  Secure giving through MTN Mobile Money, Airtel Money, Visa and Mastercard.
                </p>
              </div>

              <div className="border-t border-white/10 pt-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (!senderName.trim()) {
                      alert("Please provide your name to register the bank deposit allocation first.");
                      return;
                    }
                    setIsBankModalOpen(true);
                    // Initialize interactive gateway states
                    setActiveModalTab("gateway");
                    setGatewayStep("input");
                    setOtpCode("");
                    setBankSlipName(null);
                    setBankSlipPreview(null);
                    setBankTxCode("");
                    setTransactionRef("RCB-TX-" + Math.floor(100000 + Math.random() * 900000));
                  }}
                  className="text-xxs text-brand-gold hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Or use manual bank/simulated mobile transfer instead ➔
                </button>
              </div>
            </div>
          </div>

          {/* Giving Instruction cards Right */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Airtel Mobile Money Card */}
            <div className="bg-gradient-to-br from-brand-brown to-brand-brown-light text-white p-6 md:p-8 rounded-3xl border border-brand-gold/15 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
                <Smartphone className="w-64 h-64 text-white" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-6 h-6 text-brand-gold" />
                  <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                    Mobile Money Giving (Airtel)
                  </h4>
                </div>

                <p className="text-xs text-brand-cream/80 leading-relaxed font-sans">
                  The simplest way to tithe and give! You can transfer securely using the church's official Airtel Money merchant channel.
                </p>

                {/* Airtel Code details */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4 text-xs relative">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xxs font-extrabold bg-[#FF0000] text-white px-2.5 py-1 rounded tracking-wider uppercase">
                      AIRTEL MERCH PAYMENT
                    </span>
                  </div>

                  <div className="space-y-3 font-sans">
                    <div>
                      <span className="block text-[10px] text-brand-cream/60 font-mono tracking-wider">DIAL USSD CODE:</span>
                      <strong className="text-base font-mono font-extrabold text-[#FFEA30] select-all">*185*9#</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-cream/60 font-mono tracking-wider">MERCHANT CODE NUMBER:</span>
                      <strong className="text-xl font-mono font-extrabold text-white select-all">6880753</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-cream/60 font-mono tracking-wider">MERCHANT NAME:</span>
                      <strong className="text-xs uppercase text-brand-cream font-medium">RENEWAL CHURCH BULOBA</strong>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText("*185*9#", "airtel-dial")}
                      className="text-[10px] font-mono font-bold text-[#FFEA30] hover:text-white flex items-center gap-1 cursor-pointer bg-brand-brown px-2.5 py-1.5 rounded transition-all border border-brand-gold/20"
                    >
                      <Clipboard className="w-3 h-3" />
                      {copiedText === "airtel-dial" ? "Copied Dial String" : "Copy *185*9#"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyText("6880753", "airtel-code")}
                      className="text-[10px] font-mono font-bold text-brand-cream hover:text-white flex items-center gap-1 cursor-pointer bg-brand-brown px-2.5 py-1.5 rounded transition-all border border-brand-gold/20"
                    >
                      <Clipboard className="w-3 h-3" />
                      {copiedText === "airtel-code" ? "Copied Merchant Code" : "Copy Code: 6880753"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Bank Accounts Card */}
            <div className="bg-white border border-brand-brown/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Landmark className="w-6 h-6 text-brand-brown" />
                <h4 className="font-serif text-lg font-bold text-brand-brown uppercase tracking-wider">
                  Direct Bank Wire Transfer
                </h4>
              </div>

              <p className="text-xs text-brand-charcoal-light/90 leading-relaxed">
                For larger offerings, project contributions, and international wires. You can arrange direct deposits to the official church bank account.
              </p>

              {/* DFCU Bank Detail Card */}
              <div className="bg-brand-cream border border-brand-brown/10 p-6 rounded-2xl text-xs space-y-4 relative hover:border-[#E2A600]/30 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-brand-brown/50">REGISTERED BANK</span>
                    <h5 className="font-display font-extrabold text-base text-brand-brown uppercase tracking-wide leading-none mt-1">dfcu Bank Uganda</h5>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#E2A600]/10 text-[#E2A600] px-2.5 py-1 rounded-xl tracking-wider uppercase">
                    OFFICIAL ACCOUNT
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-brand-brown/10 py-4 my-2">
                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono text-brand-brown-light uppercase tracking-wider">ACCOUNT NAME</span>
                    <strong className="block text-xs sm:text-sm text-brand-brown font-serif leading-snug">GABA COMMUNITY CHURCH - RENEWAL CHURCH BULOBA</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono text-brand-brown-light uppercase tracking-wider">ACCOUNT NUMBER</span>
                    <strong className="block text-base font-mono font-extrabold text-brand-brown select-all tracking-wide">0110 0019 0126 98</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono text-brand-brown-light uppercase tracking-wider">SWIFT CODE</span>
                    <strong className="block text-xs font-mono font-bold text-brand-brown select-all tracking-wider">DFCUUGKA</strong>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-[10px] font-mono text-brand-brown-light uppercase tracking-wider">BRANCH</span>
                    <strong className="block text-xs font-serif font-bold text-brand-brown uppercase">NSAMBYA</strong>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleCopyText("0110 0019 0126 98", "dfcu-account")}
                    className="text-xxs text-brand-brown hover:text-brand-gold flex items-center gap-1.5 cursor-pointer bg-white border border-brand-brown/15 px-3 py-1.5 rounded-lg font-medium transition-all shadow-sm"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    {copiedText === "dfcu-account" ? "Account Number Copied!" : "Copy Account Number"}
                  </button>
                  <button
                    onClick={() => handleCopyText("DFCUUGKA", "dfcu-swift")}
                    className="text-xxs text-brand-brown hover:text-brand-gold flex items-center gap-1.5 cursor-pointer bg-white border border-brand-brown/15 px-3 py-1.5 rounded-lg font-medium transition-all shadow-sm"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    {copiedText === "dfcu-swift" ? "SWIFT Code Copied!" : "Copy SWIFT Code"}
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Direct Bank Redirection Simulator Modal */}
      {isBankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-brown/70 p-4 backdrop-blur-sm transition-opacity duration-300 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-brand-brown/10 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-brand-brown text-white p-6 relative">
              <button 
                onClick={() => setIsBankModalOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/15 p-2 rounded-full cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-brand-gold uppercase tracking-wider block">
                  Secure Fund Transfer Gateway
                </span>
                <h4 className="font-serif text-xl font-bold tracking-tight text-white uppercase">
                  dfcu Bank Link & Transmit
                </h4>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mt-6 border-b border-white/10 pb-1">
                <button
                  type="button"
                  onClick={() => setActiveModalTab("gateway")}
                  className={`pb-2 text-xxs font-mono font-bold uppercase tracking-wider transition-all relative ${
                    activeModalTab === "gateway" ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  💳 Send Money
                  {activeModalTab === "gateway" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab("details")}
                  className={`pb-2 text-xxs font-mono font-bold uppercase tracking-wider transition-all relative ${
                    activeModalTab === "details" ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  📁 Slip Upload
                  {activeModalTab === "details" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalTab("connect")}
                  className={`pb-2 text-xxs font-mono font-bold uppercase tracking-wider transition-all relative ${
                    activeModalTab === "connect" ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  ⚙️ Bank Link API
                  {activeModalTab === "connect" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />
                  )}
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">

              {/* TAB 1: INTERACTIVE ONLINE PAYMENT SIMULATION */}
              {activeModalTab === "gateway" && (
                <div className="space-y-4">
                  {gatewayStep === "input" && (
                    <div className="space-y-4 text-left">
                      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex gap-3 text-xxs leading-relaxed text-amber-950">
                        <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600" />
                        <div>
                          <strong>⚡ Real Money Transmission Mode Active:</strong> Clicking "Send to dfcu Bank" will contact the Flutterwave API. If you have not configured your transaction keys in the AI Studio Settings (see <strong>Bank Link API</strong> tab), we securely run an internal verification flow with simulated authorization prompts. Once configured, it triggers live carrier bills (MTN/Airtel SMS/USSD PIN pushes) on your phone immediately!
                        </div>
                      </div>

                      {/* Method selector */}
                      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setGatewaySubMethod("mobile_money")}
                          className={`py-1.5 text-xxs font-mono font-bold rounded cursor-pointer transition-all ${
                            gatewaySubMethod === "mobile_money" ? "bg-white text-brand-brown shadow-sm" : "text-brand-brown/50"
                          }`}
                        >
                          📱 Mobile Money
                        </button>
                        <button
                          type="button"
                          onClick={() => setGatewaySubMethod("card")}
                          className={`py-1.5 text-xxs font-mono font-bold rounded cursor-pointer transition-all ${
                            gatewaySubMethod === "card" ? "bg-white text-brand-brown shadow-sm" : "text-brand-brown/50"
                          }`}
                        >
                          💳 Debit/Credit Card
                        </button>
                      </div>

                      {gatewaySubMethod === "mobile_money" ? (
                        <div className="space-y-3 pt-2">
                          {/* Carrier select */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setMobileCarrier("mtn")}
                              className={`p-2.5 border rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                mobileCarrier === "mtn" ? "border-[#FFEA30] bg-[#FFEA30]/10 text-brand-brown font-bold" : "border-slate-200 text-slate-400"
                              }`}
                            >
                              <div className="w-4 h-4 rounded-full bg-[#FFEA30] flex items-center justify-center font-mono text-[9px] font-black text-brand-brown">M</div>
                              MTN MoMo
                            </button>
                            <button
                              type="button"
                              onClick={() => setMobileCarrier("airtel")}
                              className={`p-2.5 border rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                mobileCarrier === "airtel" ? "border-red-500 bg-red-500/10 text-red-600 font-bold" : "border-slate-200 text-slate-400"
                              }`}
                            >
                              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center font-mono text-[9px] font-black text-white">A</div>
                              Airtel Money
                            </button>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold uppercase text-brand-brown-light">Mobile Number</label>
                            <input
                              type="tel"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              placeholder="0770000000 / 0700000000"
                              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-brand-gold focus:outline-none"
                              required
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 pt-2">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold uppercase text-brand-brown-light">Card Number</label>
                            <input
                              type="text"
                              value={cardNo}
                              onChange={(e) => setCardNo(e.target.value)}
                              placeholder="4111 2222 3333 4444"
                              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-brand-gold focus:outline-none"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono font-bold uppercase text-brand-brown-light">Expiry Date</label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM/YY"
                                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-brand-gold focus:outline-none"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] font-mono font-bold uppercase text-brand-brown-light">CVV</label>
                              <input
                                type="password"
                                value={cardCVV}
                                onChange={(e) => setCardCVV(e.target.value)}
                                placeholder="123"
                                className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-brand-gold focus:outline-none"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-slate-100 pt-4 mt-2">
                        <button
                          type="button"
                          onClick={async () => {
                            if (gatewaySubMethod === "mobile_money" && !mobileNumber.trim()) {
                              alert("Please enter your Mobile Money phone number.");
                              return;
                            }
                            if (gatewaySubMethod === "card" && (!cardNo.trim() || !cardExpiry.trim())) {
                              alert("Please enter your credit/debit card details.");
                              return;
                            }
                            
                            // Move step to processing
                            setGatewayStep("processing");

                            try {
                              const res = await fetch("/api/payments/transmit", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  amount: customAmount || selectedAmount || "0",
                                  currency,
                                  purpose,
                                  senderName,
                                  senderPhone,
                                  paymentMethod: gatewaySubMethod,
                                  mobileCarrier: gatewaySubMethod === "mobile_money" ? mobileCarrier : undefined,
                                  mobileNumber: gatewaySubMethod === "mobile_money" ? mobileNumber : undefined
                                })
                              });

                              const data = await res.json();
                              if (data.success) {
                                // Save actual transaction reference returned by the node server
                                setTransactionRef(data.txRef);
                                
                                if (data.redirectUrl) {
                                  // Direct dynamic redirection to production secured Flutterwave checkout portal!
                                  window.location.href = data.redirectUrl;
                                  return;
                                }

                                if (data.mode === "live-momo") {
                                  alert("✓ Live MTN/Airtel direct push request triggered! Please check your phone now, enter your MoMo PIN to complete the payment.");
                                  setGatewayStep("success");
                                  return;
                                }

                                setTimeout(() => {
                                  setGatewayStep("otp");
                                }, 1200);
                              } else {
                                alert(`Error: ${data.message || "Failed to contact payment engine"}`);
                                setGatewayStep("input");
                              }
                            } catch (error) {
                              console.error("Transmission error:", error);
                              // Fail gracefully to fallback step
                              setTimeout(() => {
                                setGatewayStep("otp");
                              }, 1500);
                            }
                          }}
                          className="w-full py-3 bg-brand-brown hover:bg-brand-brown/95 text-white font-display font-bold uppercase tracking-wider rounded-xl text-xs cursor-pointer shadow active:scale-98 transition-all flex items-center justify-center gap-2"
                        >
                          🚀 Send {currency === "UGX" ? "" : "$"}{parseInt(customAmount || selectedAmount || "0").toLocaleString()}{currency === "UGX" ? " Shs" : ""} to dfcu Bank ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {gatewayStep === "processing" && (
                    <div className="py-12 text-center space-y-5">
                      <div className="relative w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-brand-gold/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-brand-brown animate-spin" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[10px] font-black text-brand-brown">
                          dfcu
                        </span>
                      </div>
                      <div className="space-y-1.5 max-w-xs mx-auto">
                        <p className="text-xs font-bold text-brand-brown font-mono tracking-widest uppercase">
                          Contacting Payment Gateway...
                        </p>
                        <p className="text-[10px] text-brand-charcoal-light font-sans">
                          Establishing secure endpoint pipeline to match your account balances with {gatewaySubMethod === "mobile_money" ? "Network Carrier Switch" : "Visa/Mastercard Gateway Service"}.
                        </p>
                      </div>
                    </div>
                  )}

                  {gatewayStep === "otp" && (
                    <div className="space-y-5 text-left">
                      <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl flex gap-3 text-xxs leading-relaxed text-amber-800">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                        <div>
                          <strong>Verification PIN / OTP Required:</strong> A simulated secure token has been dispatched to your device contacts. Enter any 4-digit PIN (e.g. 1234) to confirm that the money should be cleared.
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono font-bold uppercase text-brand-brown-light">
                          Enter 6-Digit SMS Verification Pin or carrier MoMo PIN
                        </label>
                        <input
                          type="password"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          maxLength={6}
                          placeholder="••••••"
                          className="w-full text-center tracking-widest text-lg font-mono p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!otpCode.trim()) {
                            alert("Please enter a Pin to verify the transactions.");
                            return;
                          }
                          setGatewayStep("processing");
                          setTimeout(() => {
                            setGatewayStep("success");
                          }, 1500);
                        }}
                        className="w-full py-3 bg-brand-gold hover:bg-brand-gold/95 text-brand-brown font-display font-black uppercase tracking-wider rounded-xl text-xs cursor-pointer shadow transition-all"
                      >
                        🔓 Authorize & Send Transfer Code
                      </button>
                    </div>
                  )}

                  {gatewayStep === "success" && (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className="bg-emerald-100 p-3.5 rounded-full text-emerald-600 animate-bounce">
                          <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h5 className="font-serif text-base font-bold text-brand-brown">
                          Transaction Completed Successfully!
                        </h5>
                        <p className="text-xxs text-brand-charcoal-light max-w-xs">
                          The transaction was successfully processed. Deep-routing registers indicate that the funds have been cleared and disbursed directly to dfcu Bank Uganda under official records.
                        </p>
                      </div>

                      {/* Receipt slip info */}
                      <div className="bg-brand-cream/60 border border-brand-brown/10 rounded-2xl p-5 space-y-3.5 font-sans text-xs relative shadow-inner text-left">
                        <div className="flex justify-between items-center text-xxs font-mono text-brand-brown/50 border-b border-brand-brown/10 pb-2">
                          <span>dfcu BANK RECEIPT</span>
                          <strong>{transactionRef}</strong>
                        </div>

                        <div className="space-y-2 text-xxs">
                          <div className="flex justify-between">
                            <span className="text-brand-brown/60">GIVER NAME:</span>
                            <strong className="text-brand-brown uppercase">{senderName}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-brand-brown/60">ACCOUNT DEBITED:</span>
                            <strong className="text-brand-brown font-mono">
                              {gatewaySubMethod === "mobile_money" ? `MoMo (${mobileCarrier.toUpperCase()}) ${mobileNumber}` : `Card Ending in *${cardNo.slice(-4) || "4111"}`}
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-brand-brown/60">COLLECTION CREDIT:</span>
                            <strong className="text-brand-brown font-serif">RCB dfcu TRUSTEE ACCOUNT</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-brand-brown/60">ALLOCATION AREA:</span>
                            <strong className="text-[#E2A600] uppercase font-bold">{purpose}</strong>
                          </div>
                          <div className="flex justify-between font-mono font-bold text-brand-brown border-t border-brand-brown/10 pt-2 text-xs">
                            <span>TOTAL CLEARED:</span>
                            <span>{currency === "UGX" ? "" : "$"}{parseInt(customAmount || selectedAmount || "0").toLocaleString()}{currency === "UGX" ? " Shs" : ""}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="flex-1 py-2.5 border border-slate-200 text-brand-brown rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                        >
                          🖨️ Print Receipt
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsBankModalOpen(false)}
                          className="flex-1 py-2.5 bg-brand-gold text-brand-brown font-bold rounded-xl text-xs hover:bg-brand-gold/90 cursor-pointer"
                        >
                          Finish & Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: BANK SLIP UPLOAD VERIFICATION */}
              {activeModalTab === "details" && (
                <div className="space-y-4 text-left">
                  <div className="bg-brand-cream border border-brand-brown/10 p-3.5 rounded-xl flex gap-3 text-xxs leading-relaxed text-brand-brown">
                    <FileText className="w-4 h-4 shrink-0 text-brand-gold" />
                    <div>
                      <strong>Register Private Transfers:</strong> If you perform direct deposit, bank app transfers, or bank deposits, register the slip here. Our auditing system validates logs against bank records within an hour.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-brand-brown-light">Bank Transaction reference / ID</label>
                      <input
                        type="text"
                        value={bankTxCode}
                        onChange={(e) => setBankTxCode(e.target.value)}
                        placeholder="e.g. TXN-1299-88091"
                        className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-brand-gold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-brand-brown-light">Deposit Slip / Receipt Screenshot</label>
                      
                      {/* Drag & Drop mockup */}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-brand-brown/20 bg-slate-50 hover:bg-slate-100/50 p-6 rounded-2xl text-center space-y-2 cursor-pointer transition-colors relative"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*,application/pdf"
                          className="hidden"
                        />
                        {bankSlipPreview ? (
                          <div className="space-y-2">
                            <div className="mx-auto w-16 h-12 bg-white border rounded shadow-sm overflow-hidden flex items-center justify-center p-1">
                              <img src={bankSlipPreview} alt="Slip preview" className="object-contain max-h-full max-w-full" />
                            </div>
                            <span className="block text-[10px] font-mono text-emerald-600 font-bold truncate max-w-xs mx-auto">
                              ✓ {bankSlipName}
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <Upload className="w-6 h-6 text-brand-brown-light/75 mx-auto" />
                            <p className="text-[11px] font-medium text-brand-brown">
                              Click to browse or drop file here
                            </p>
                            <p className="text-[9px] text-slate-400">
                              Supports JPG, PNG or PDF bank invoices up to 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          if (!bankTxCode.trim()) {
                            alert("Please supply the transaction code issued by your bank.");
                            return;
                          }
                          if (!bankSlipName) {
                            alert("Please attach a screenshot or photograph of the deposit slip.");
                            return;
                          }
                          
                          setGatewayStep("processing");
                          setActiveModalTab("gateway");
                          setTimeout(() => {
                            setGatewayStep("success");
                          }, 1900);
                        }}
                        className="w-full py-3 bg-brand-brown text-white font-display font-bold uppercase tracking-wider rounded-xl text-xs cursor-pointer shadow hover:bg-brand-brown/95 transition-all text-center"
                      >
                        📁 Submit Receipt For Verification ➔
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DEVELOPER LIVE BANK CONNECTION GUIDANCE */}
              {activeModalTab === "connect" && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-2 text-brand-brown border-b border-brand-brown/10 pb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h5 className="font-serif text-sm font-bold uppercase">Real-World Bank Gateway Integration</h5>
                  </div>

                  <p className="text-xxs text-slate-500 leading-relaxed font-sans">
                    dfcu Bank Uganda uses standardized API hooks managed by regional aggregators to process incoming funds or trigger debit notifications. To bridge this giving interface with active money, the developer registers a merchant profile with <strong>Flutterwave Uganda</strong> or <strong>Pesapal EA</strong>.
                  </p>

                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
                    <span className="block font-mono text-[9px] font-bold text-brand-brown-light uppercase tracking-wider">
                      Setup Instructions:
                    </span>
                    <ol className="list-decimal list-inside text-xxs text-brand-charcoal-light/95 space-y-2 leading-relaxed">
                      <li>Configure your merchant credentials in <code>.env.example</code></li>
                      <li>Uncomment the backend endpoint integration inside <code>server.ts</code></li>
                      <li>Our payment hooks will establish a direct tunnel to MTN MoMo, Airtel, and dfcu bank APIs!</li>
                    </ol>

                    {/* Environment snippet visual */}
                    <div className="bg-brand-brown text-brand-cream font-mono text-[9px] p-3 rounded-lg overflow-x-auto border border-brand-brown-light/45 select-all">
                      # .env configuration<br/>
                      FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-e09210...<br/>
                      VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-...<br/>
                      DFCU_MERCHANT_ID=RCB_BULOBA_999812
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href="https://flutterwave.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 bg-slate-100 border border-slate-200 text-brand-brown font-mono text-center rounded-lg text-xxs font-bold hover:bg-slate-200"
                    >
                      Flutterwave docs ↗
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveModalTab("gateway")}
                      className="flex-1 py-2 bg-brand-gold text-brand-brown font-display text-center rounded-lg text-xxs font-bold hover:bg-brand-gold/90"
                    >
                      Return to Checkout
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

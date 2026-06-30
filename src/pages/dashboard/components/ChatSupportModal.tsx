import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: number;
  sender: 'support' | 'user';
  text: string;
  timestamp: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: 0,
    sender: 'support',
    text: 'Welcome to TaxGraph AI Support! I\'m your virtual assistant. How can I help you today?',
    timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  },
];

const quickReplies = [
  'How do I reset my password?',
  'Report a system bug',
  'Data source connection issue',
  'Request a new feature',
  'Dashboard metrics explanation',
  'Export audit report help',
];

const autoResponses: Record<string, string> = {
  'password': 'To reset your password, go to Settings &gt; Security &gt; Change Password. If you&apos;ve forgotten your current password, contact your department&apos;s system administrator who can initiate a reset through the FBR admin portal. The reset link is valid for 24 hours.',
  'bug': 'Thank you for reporting this. Our engineering team actively monitors system health. Please provide the following details so we can investigate: (1) Which module were you using? (2) What action triggered the issue? (3) Any error messages displayed? Your report has been logged — ticket #TGA-2026-{random} has been created.',
  'connection': 'Data source connection issues are typically caused by one of three things: (1) Expired API authentication tokens — refresh them in Settings &gt; Data Sources, (2) Rate limiting from the source endpoint — wait 15 minutes and retry, or (3) Schema changes in the source database — check the Data Sources page for sync status. If the issue persists, our engineering team can run a manual sync for you.',
  'feature': 'We appreciate feature requests! Our product team reviews all submissions monthly. Please describe the feature you&apos;d like, the problem it solves, and how you envision it working in your workflow. Your request will be assigned tracking ID FR-{random}. You can check request status in the Knowledge Base under &quot;Product Roadmap&quot;.',
  'dashboard': 'The dashboard displays real-time intelligence across 7 key metrics: Total Flagged Cases, Risk Score Distribution, Entity Resolution matches, Data Source sync status, Compliance Rate, Revenue Recovery projections, and Geographic Risk Heatmap. Each metric card is clickable for a detailed drill-down view. The charts auto-refresh every 5 minutes — you can adjust this in Settings.',
  'export': 'To export an audit report, navigate to Audit Reports, select the case, and click the &quot;Export&quot; button in the top-right toolbar. Available formats: PDF (court-ready), CSV (raw data), and JSON (API integration). For bulk exports across multiple cases, use the Analytics module&apos;s batch export feature under the Reports tab.',
  'default': 'Thank you for reaching out. I&apos;ve noted your query and a support specialist will follow up with you within 2 business hours during operational hours (Mon-Fri, 9AM-5PM PKT). For urgent matters, please contact the FBR IT helpdesk at extension 2847.',
};

function getAutoResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  const keywords = Object.keys(autoResponses).filter((k) => k !== 'default');
  for (const kw of keywords) {
    if (lower.includes(kw)) return autoResponses[kw];
  }
  return autoResponses['default'];
}

interface ChatSupportModalProps {
  onClose: () => void;
}

export default function ChatSupportModal({ onClose }: ChatSupportModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedQuickReply, setSelectedQuickReply] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addMessage = (text: string, sender: 'support' | 'user') => {
    const newMsg: ChatMessage = {
      id: Date.now(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSend = (text?: string) => {
    const msgToSend = (text || inputValue).trim();
    if (!msgToSend) return;

    addMessage(msgToSend, 'user');
    setInputValue('');
    setSelectedQuickReply(null);
    setIsTyping(true);

    setTimeout(() => {
      const response = getAutoResponse(msgToSend);
      addMessage(response, 'support');
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleQuickReply = (reply: string) => {
    setSelectedQuickReply(reply);
    handleSend(reply);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md h-[85vh] sm:h-[600px] flex flex-col shadow-2xl animate-fade-in-up overflow-hidden">
        <div className="flex-shrink-0 bg-primary-500 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center relative">
              <i className="ri-chat-3-line text-white text-base"></i>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent-400 border-2 border-primary-500"></span>
            </div>
            <div>
              <p className="text-sm font-heading font-bold text-white">TaxGraph AI Support</p>
              <p className="text-[11px] text-white/70 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 inline-block"></span>
                Online now
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/25 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-sm"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 bg-background-50 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'support' && (
                <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <i className="ri-robot-2-line text-primary-600 text-xs"></i>
                </div>
              )}
              <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary-500 text-white rounded-br-md'
                      : 'bg-white border border-background-200/70 text-foreground-800 rounded-bl-md'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }}
                ></div>
                <p
                  className={`text-[10px] text-foreground-400 mt-1 ${msg.sender === 'user' ? 'text-right mr-1' : 'ml-1'}`}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <i className="ri-robot-2-line text-primary-600 text-xs"></i>
              </div>
              <div className="bg-white border border-background-200/70 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-foreground-300 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-foreground-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-foreground-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {messages.length <= 1 && !isTyping && (
          <div className="flex-shrink-0 px-4 py-3 border-t border-background-200/70 bg-white">
            <p className="text-[10px] text-foreground-400 uppercase tracking-wider mb-2">Quick replies</p>
            <div className="flex flex-wrap gap-1.5">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  disabled={selectedQuickReply !== null}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedQuickReply === reply
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-foreground-600 border-background-200/70 hover:border-primary-300 hover:text-primary-600'
                  }`}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-shrink-0 px-4 py-3 border-t border-background-200/70 bg-white flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-background-200/70 bg-background-50 text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-300 transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
          >
            <i className="ri-send-plane-fill text-white text-sm"></i>
          </button>
        </div>

        <div className="flex-shrink-0 px-4 py-2 bg-background-50 border-t border-background-100 text-center">
          <p className="text-[10px] text-foreground-400">
            Available Mon-Fri, 9AM-5PM PKT · Avg. response time: &lt; 5 min
          </p>
        </div>
      </div>
    </div>
  );
}
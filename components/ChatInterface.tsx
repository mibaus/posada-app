import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, ExternalLink } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Soy SierrasIA, tu conserje virtual experto. 🏔️\n\nPuedo ayudarte con:\n- 🍽️ Recomendaciones gastronómicas\n- 🗺️ Paseos y excursiones\n- 🏠 Info de la cabaña y WiFi\n\n¿Qué te gustaría hacer hoy?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call Gemini Service
    const responseText = await sendChatMessage(messages, input);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  // Helper to render text with Markdown-style links: [Title](URL)
  const renderMessageText = (text: string) => {
    // Regex matches [Link Title](url)
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    
    return parts.map((part, i) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      
      if (linkMatch) {
        return (
          <a 
            key={i} 
            href={linkMatch[2]} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-nono-700 underline underline-offset-2 font-semibold hover:text-nono-900 inline-flex items-center gap-1 mx-1"
          >
            {linkMatch[1]}
            <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      
      // Handle bold text **bold**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((subPart, j) => {
         const boldMatch = subPart.match(/^\*\*([^*]+)\*\*$/);
         if (boldMatch) {
             return <strong key={`${i}-${j}`} className="font-bold text-gray-900">{boldMatch[1]}</strong>;
         }
         return subPart;
      });
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-nono-600 p-4 flex items-center shadow-sm">
        <div className="p-2 bg-white/20 rounded-full mr-3 border border-white/20">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg">Conserje Virtual</h3>
          <p className="text-nono-100 text-xs flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
            En línea • Powered by Gemini
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f9fafb]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
               <div className="w-8 h-8 rounded-full bg-nono-100 flex items-center justify-center mr-2 border border-nono-200 self-end mb-1 flex-shrink-0">
                  <Bot className="w-5 h-5 text-nono-700" />
               </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-nono-600 text-white rounded-br-none'
                  : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
              }`}
            >
              {msg.role === 'user' ? msg.text : renderMessageText(msg.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="w-8 h-8 rounded-full bg-nono-100 flex items-center justify-center mr-2 border border-nono-200 self-end mb-1">
                 <Bot className="w-5 h-5 text-nono-700" />
             </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-4 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-nono-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-nono-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-nono-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 px-2 py-2 focus-within:ring-2 focus-within:ring-nono-100 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent px-4 py-1 focus:outline-none text-sm text-gray-700 placeholder-gray-400"
            placeholder="Pregunta sobre comida, paseos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2.5 rounded-full transition-all duration-200 ${
              input.trim() 
                ? 'bg-nono-600 text-white shadow-md hover:bg-nono-700 transform hover:scale-105' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
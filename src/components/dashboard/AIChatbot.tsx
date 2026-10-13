"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Mic, MicOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm BuildWatch AI Assistant powered by Gemini. Ask me about project progress, safety, cameras, weather, or reports." },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages, // Send chat history for context
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting to the AI service. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Voice commands require a supported browser (Chrome/Edge)." },
      ]);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    type SpeechRec = new () => {
      continuous: boolean;
      interimResults: boolean;
      onstart: (() => void) | null;
      onend: (() => void) | null;
      onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } } } }) => void) | null;
      start: () => void;
    };
    const win = window as Window & { SpeechRecognition?: SpeechRec; webkitSpeechRecognition?: SpeechRec };
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };

    recognition.start();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[480px] glass-card !p-0 z-50 flex flex-col overflow-hidden shadow-glow-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-brand-600/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">BuildWatch AI</p>
                  <p className="text-[10px] text-brand-400">Gemini · Voice enabled</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="btn-ghost !p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] px-3 py-2 rounded-xl text-sm",
                    msg.role === "user"
                      ? "ml-auto bg-brand-600/30 text-white"
                      : "bg-white/5 text-gray-300"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="max-w-[85%] px-3 py-2 rounded-xl text-sm bg-white/5 text-gray-400 flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <button
                onClick={toggleVoice}
                className={cn(
                  "btn-ghost !p-2 shrink-0",
                  isListening && "text-status-danger animate-pulse"
                )}
                title="Voice command"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask anything..."
                className="input-field !py-2 !text-sm flex-1"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                className="btn-primary !px-3 !py-2"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-600 flex items-center justify-center shadow-glow-lg z-50 hover:bg-brand-500 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  );
}

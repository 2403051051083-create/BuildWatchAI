"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chatResponses } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm BuildWatch AI Assistant. Ask me about project progress, safety, cameras, weather, or reports." },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);

  const getResponse = (query: string): string => {
    const lower = query.toLowerCase();
    for (const [key, response] of Object.entries(chatResponses)) {
      if (key !== "default" && lower.includes(key)) return response;
    }
    if (lower.includes("camera")) {
      const match = lower.match(/camera\s*(\d)/);
      if (match) return `Opening Camera ${match[1]}. Live feed is now displayed.`;
    }
    if (lower.includes("floor")) {
      const match = lower.match(/floor\s*(\d+)/);
      if (match) return `Showing Floor ${match[1]} details. Completion and safety data loaded.`;
    }
    return chatResponses.default;
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: getResponse(text) },
    ]);
    setInput("");
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

  useEffect(() => {
    if (isOpen) {
      const el = document.getElementById("chat-messages");
      if (el) el.scrollTop = el.scrollHeight;
    }
  }, [messages, isOpen]);

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
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-brand-600/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">BuildWatch AI</p>
                  <p className="text-[10px] text-brand-400">Online · Voice enabled</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="btn-ghost !p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

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
            </div>

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
              />
              <button onClick={() => sendMessage(input)} className="btn-primary !px-3 !py-2">
                <Send className="w-4 h-4" />
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

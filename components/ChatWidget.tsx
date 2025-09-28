import React, { useState, useEffect, useRef } from 'react';
import * as FM from 'framer-motion';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import CloseIcon from './icons/CloseIcon';
import { db } from '../data/firebase';
import { collection, addDoc, query, onSnapshot, orderBy, serverTimestamp, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useChat } from '../ChatContext';

// NOTE: UUID is a simple library for unique IDs. In a real project, you might need to add it to your dependencies.
// For this environment, we'll assume it's available.

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'admin';
    createdAt: Timestamp;
}

// Simple hook to detect mobile screen sizes
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const ChatWidget: React.FC = () => {
    const { isChatOpen, toggleChat, closeChat } = useChat();
    const [chatId, setChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        let id = localStorage.getItem('chatId');
        if (!id) {
            id = uuidv4();
            localStorage.setItem('chatId', id);
        }
        setChatId(id);
    }, []);

    useEffect(() => {
        if (isChatOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isChatOpen, isMobile]);


    useEffect(() => {
        if (!chatId) return;

        const chatDocRef = doc(db, 'chats', chatId);
        const ensureChatDoc = async () => {
            try {
                const docSnap = await getDoc(chatDocRef);
                if (!docSnap.exists()) {
                    await setDoc(chatDocRef, { 
                        createdAt: serverTimestamp(),
                        lastMessage: 'Chat initiated.',
                        isReadByAdmin: false,
                    });
                }
            } catch (err) {
                console.error("Error ensuring chat document:", err);
                setError("Could not initialize chat. You may be offline.");
            }
        };
        ensureChatDoc();

        const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesCollectionRef, orderBy('createdAt'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
            setMessages(msgs);
            setError(null);
        }, (err) => {
            console.error("Error fetching chat messages:", err);
            setError("Connection lost. Please check your network.");
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !chatId) return;

        const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messagesCollectionRef, {
            text: newMessage,
            sender: 'user',
            createdAt: serverTimestamp(),
        });
        
        // Update the parent chat doc for the admin view
        const chatDocRef = doc(db, 'chats', chatId);
        await setDoc(chatDocRef, { 
            lastMessage: newMessage,
            lastMessageAt: serverTimestamp(),
            isReadByAdmin: false
        }, { merge: true });

        setNewMessage('');
    };

    const mobileVariants = {
      initial: { y: "100%" },
      animate: { y: 0 },
      exit: { y: "100%" },
    };

    const desktopVariants = {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 20, scale: 0.95 },
    };

    const currentVariants = isMobile ? mobileVariants : desktopVariants;


    return (
        <>
            <FM.AnimatePresence>
                {isChatOpen && (
                    <FM.motion.div
                        variants={currentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 md:inset-auto md:bottom-6 md:left-6 w-full md:max-w-sm h-full md:h-[70vh] md:max-h-[600px] bg-white dark:bg-brand-card shadow-2xl md:rounded-lg z-50 flex flex-col border dark:border-brand-border"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b dark:border-brand-border flex-shrink-0">
                            <h3 className="font-bold text-gray-800 dark:text-white">Live Chat</h3>
                            <button onClick={closeChat} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        {/* Messages */}
                        <div className="flex-grow p-4 overflow-y-auto">
                            {error ? (
                                <div className="flex items-center justify-center h-full text-center text-red-500 dark:text-red-400 text-sm">
                                    <p>{error}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.sender === 'user' ? 'bg-brand-blue text-white' : 'bg-gray-200 dark:bg-brand-border text-gray-800 dark:text-gray-200'}`}>
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>
                        {/* Input */}
                        <div className="p-4 border-t dark:border-brand-border flex-shrink-0 bg-white dark:bg-brand-card">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder={error ? "Cannot send messages" : "Type a message..."}
                                    className="flex-grow bg-gray-100 dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue disabled:opacity-50"
                                    disabled={!!error}
                                />
                                <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-4 py-2 rounded-lg transition text-sm disabled:opacity-50" disabled={!!error}>Send</button>
                            </form>
                        </div>
                    </FM.motion.div>
                )}
            </FM.AnimatePresence>
            
            <button
                onClick={toggleChat}
                className="hidden md:flex fixed bottom-6 left-6 bg-brand-blue text-white rounded-full shadow-lg z-50 items-center justify-center w-16 h-16"
                aria-label="Open live chat"
            >
                <FM.AnimatePresence mode="wait">
                    <FM.motion.div
                        key={isChatOpen ? 'close' : 'chat'}
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isChatOpen ? <CloseIcon className="w-7 h-7" /> : <ChatBubbleIcon className="w-8 h-8" />}
                    </FM.motion.div>
                </FM.AnimatePresence>
            </button>
        </>
    );
};

export default ChatWidget;
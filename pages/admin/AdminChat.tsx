import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../data/firebase';
import { collection, query, onSnapshot, orderBy, doc, setDoc, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface ChatSession {
    id: string;
    lastMessage?: string;
    lastMessageAt?: Timestamp;
    isReadByAdmin: boolean;
}

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'admin';
    createdAt: Timestamp;
}

const ChatConversation: React.FC<{ chatId: string }> = ({ chatId }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setError(null);
        const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesCollectionRef, orderBy('createdAt'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
            setMessages(msgs);
        }, (err) => {
            console.error(`Error fetching messages for chat ${chatId}:`, err);
            setError("Could not load messages for this conversation.");
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messagesCollectionRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messagesCollectionRef, {
            text: newMessage,
            sender: 'admin',
            createdAt: serverTimestamp(),
        });

        const chatDocRef = doc(db, 'chats', chatId);
        await setDoc(chatDocRef, { 
            lastMessage: `Admin: ${newMessage}`,
            lastMessageAt: serverTimestamp(),
        }, { merge: true });

        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-brand-dark rounded-t-lg">
                {error ? (
                    <div className="flex items-center justify-center h-full text-red-500">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.sender === 'admin' ? 'bg-brand-blue text-white' : 'bg-white dark:bg-brand-border text-gray-800 dark:text-gray-200 shadow-sm'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>
            <div className="p-4 border-t dark:border-brand-border bg-gray-50 dark:bg-brand-dark rounded-b-lg">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply..."
                        className="flex-grow bg-white dark:bg-brand-card border border-gray-300 dark:border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                    <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-4 py-2 rounded-lg transition text-sm">Send</button>
                </form>
            </div>
        </div>
    );
};


const AdminChat: React.FC = () => {
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const chatsCollectionRef = collection(db, 'chats');
        const q = query(chatsCollectionRef, orderBy('lastMessageAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chatSessions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            } as ChatSession));
            setSessions(chatSessions);
            setError(null);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching chat sessions:", err);
            setError("Failed to load chat sessions. The app might be offline.");
            setIsLoading(false);
        });
        
        return () => unsubscribe();
    }, []);
    
    const handleSelectChat = async (chatId: string) => {
        setSelectedChatId(chatId);
        const chatDocRef = doc(db, 'chats', chatId);
        await setDoc(chatDocRef, { isReadByAdmin: true }, { merge: true });
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 flex-shrink-0">Live Chat</h1>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
                {/* Chat Sessions List */}
                <div className="lg:col-span-1 xl:col-span-1 bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg flex flex-col overflow-hidden">
                    <h2 className="text-lg font-bold p-4 border-b dark:border-brand-border flex-shrink-0 text-gray-800 dark:text-white">Conversations</h2>
                    <div className="overflow-y-auto">
                        {isLoading ? (
                            <p className="p-4 text-gray-500">Loading chats...</p>
                        ) : error ? (
                            <p className="p-4 text-red-500">{error}</p>
                        ) : sessions.length === 0 ? (
                            <p className="p-4 text-gray-500">No active chats.</p>
                        ) : (
                            sessions.map(session => (
                                <button
                                    key={session.id}
                                    onClick={() => handleSelectChat(session.id)}
                                    className={`w-full text-left p-4 border-b dark:border-brand-border hover:bg-gray-50 dark:hover:bg-brand-border/30 transition-colors ${selectedChatId === session.id ? 'bg-brand-blue/10 dark:bg-brand-blue/20' : ''}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-grow overflow-hidden">
                                            <p className="font-semibold text-sm truncate text-gray-800 dark:text-gray-100" title={session.id}>
                                                User <span className="text-xs text-gray-400">...{session.id.slice(-6)}</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.lastMessage || '...'}</p>
                                        </div>
                                        {!session.isReadByAdmin && (
                                            <span className="w-2.5 h-2.5 bg-brand-blue rounded-full flex-shrink-0 ml-2 mt-1"></span>
                                        )}
                                    </div>
                                    <p className="text-xs text-right text-gray-400 mt-1">
                                        {session.lastMessageAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Conversation View */}
                <div className="lg:col-span-2 xl:col-span-3 bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg overflow-hidden h-full flex flex-col">
                    {selectedChatId ? (
                        <ChatConversation chatId={selectedChatId} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            <p>Select a conversation to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
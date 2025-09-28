import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import WrenchIcon from './icons/WrenchIcon';
import CalculatorIcon from './icons/CalculatorIcon';
import CalendarIcon from './icons/CalendarIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import { useChat } from '../ChatContext';

// FIX: Updated the 'icon' prop type to be more specific, allowing 'className' to be passed during cloning.
const NavItem: React.FC<{ to: string; icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; label: string }> = ({ to, icon, label }) => {
    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
            isActive
                ? 'text-brand-blue'
                : 'text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white'
        }`;

    return (
        <NavLink to={to} className={navLinkClasses} end={to === '/'}>
            {React.cloneElement(icon, { className: 'w-6 h-6 mb-1' })}
            <span className="text-xs font-medium">{label}</span>
        </NavLink>
    );
};

const ActionItem: React.FC<{ onClick: () => void; isActive: boolean; icon: React.ReactElement<React.SVGProps<SVGSVGElement>>; label: string }> = ({ onClick, isActive, icon, label }) => {
    const itemClasses = `flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
            isActive
                ? 'text-brand-blue'
                : 'text-gray-500 dark:text-gray-400 hover:text-brand-blue dark:hover:text-white'
        }`;

    return (
        <button onClick={onClick} className={itemClasses}>
            {React.cloneElement(icon, { className: 'w-6 h-6 mb-1' })}
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
};


const MobileBottomNav: React.FC = () => {
    const { isChatOpen, toggleChat } = useChat();
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-brand-card border-t border-gray-200 dark:border-brand-border z-40 flex justify-around items-stretch">
            <NavItem to="/" icon={<HomeIcon />} label="Home" />
            <NavItem to="/services" icon={<WrenchIcon />} label="Services" />
            <ActionItem onClick={toggleChat} isActive={isChatOpen} icon={<ChatBubbleIcon />} label="Chat" />
            <NavItem to="/tools" icon={<CalculatorIcon />} label="Tools" />
            <NavItem to="/booking" icon={<CalendarIcon />} label="Book Now" />
        </nav>
    );
};

export default MobileBottomNav;
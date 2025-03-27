import React from 'react';
import { Calendar, Clock, MapPin, Hotel, Car, Utensils, Music } from 'lucide-react';
import AnimatedSection from '@/components/shared/AnimatedSection';

interface DetailItem {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface WeddingDetailsCardProps {
    title: string;
    icon: React.ReactNode;
    description?: string;
    items: DetailItem[];
    animation?: string;
    delay?: number;
}

const WeddingDetailsCard: React.FC<WeddingDetailsCardProps> = ({
                                                                   title,
                                                                   icon,
                                                                   description,
                                                                   items,
                                                                   animation = "slide-up",
                                                                   delay = 200
                                                               }) => {
    return (
        <AnimatedSection delay={delay}>
            <div className="bg-wedding-secondary/20 rounded-lg p-8 shadow-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-wedding-primary/10 rounded-bl-lg flex items-center justify-center">
                    {icon}
                </div>
                <h3 className="font-serif text-2xl text-wedding-dark mb-4">{title}</h3>
                {description && <p className="text-wedding-muted mb-6">{description}</p>}
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start">
                            <div className="text-wedding-primary h-5 w-5 mt-1 mr-3 flex-shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-wedding-muted text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default WeddingDetailsCard;
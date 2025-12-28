import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    imageUrl: string;
    title: string;
    icon?: string;
    description: string;
    features?: string[];
    href: string;
    themeColor: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
    ({ className, imageUrl, title, icon, description, features, href, themeColor, ...props }, ref) => {
        return (
            <div
                ref={ref}
                style={{
                    // @ts-ignore - CSS custom properties are valid
                    "--theme-color": themeColor,
                } as React.CSSProperties}
                className={cn("group w-full h-full", className)}
                {...props}
            >
                <a
                    href={href}
                    className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out 
                     group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
                    aria-label={`Learn more about ${title}`}
                    style={{
                        boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`
                    }}
                >
                    {/* Background Image with Parallax Zoom */}
                    <div
                        className="absolute inset-0 bg-cover bg-center 
                       transition-transform duration-500 ease-in-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />

                    {/* Themed Gradient Overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95), hsl(var(--theme-color) / 0.7) 40%, transparent 70%)`,
                        }}
                    />

                    {/* Content */}
                    <div className="relative flex flex-col justify-end h-full p-6 text-white">
                        <h3 className="text-2xl font-bold tracking-tight">
                            {title} {icon && <span className="text-xl ml-1">{icon}</span>}
                        </h3>
                        <p className="text-sm text-white/80 mt-1 font-medium">{description}</p>

                        {/* Features List - 2x2 Grid */}
                        {features && features.length > 0 && (
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-xs text-white/90 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Get A Quote Button */}
                        <div className="mt-6 flex items-center justify-between bg-[hsl(var(--theme-color)/0.2)] backdrop-blur-md border border-[hsl(var(--theme-color)/0.3)] 
                           rounded-lg px-4 py-3 
                           transition-all duration-300 
                           group-hover:bg-[hsl(var(--theme-color)/0.4)] group-hover:border-[hsl(var(--theme-color)/0.5)]">
                            <span className="text-sm font-semibold tracking-wide">Get A Quote</span>
                            <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </a>
            </div>
        );
    }
);
ServiceCard.displayName = "ServiceCard";

export { ServiceCard };

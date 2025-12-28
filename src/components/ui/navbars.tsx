"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Building2, PaintBucket, Fan } from "lucide-react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
    {
        id: "civil",
        label: "Civil Construction",
        title: "Civil Construction",
        subtitle: "Foundation & Structure",
        icon: Building2,
        description: "Delivering integrated, technology-driven construction services to meet evolving project requirements. We specialize in foundation engineering, structural development, and comprehensive building solutions.",
        backgroundImage: "/civil-construction-bg.png",
    },
    {
        id: "renovation",
        label: "Renovation",
        title: "Renovation",
        subtitle: "Revive & Redefine Spaces",
        icon: PaintBucket,
        description: "We specialize in transforming existing structures with modern design, durable materials, and innovative techniques — bringing new life, function, and style to every space.",
        backgroundImage: "/renovation-bg.png",
    },
    {
        id: "interior",
        label: "Interior",
        title: "Interior",
        subtitle: "HVAC & Infrastructure",
        icon: Fan,
        description: "Advanced mechanical systems installation and maintenance for optimal building performance. Complete HVAC solutions and mechanical infrastructure.",
        backgroundImage: "/interior-hvac-bg.png",
    },
];

export default function Navbardemo() {
    const [open, setOpen] = useState(false);
    const [activeTabId, setActiveTabId] = useState("civil");

    return (
        <div className="flex w-full">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="fixed left-4 top-20 z-50 lg:hidden bg-white/80 backdrop-blur"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                    <VerticalNav activeTabId={activeTabId} setActiveTabId={(id) => { setActiveTabId(id); setOpen(false); }} />
                </SheetContent>
            </Sheet>

            <div className="hidden lg:block">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="min-h-[600px] w-full rounded-lg border shadow-xl bg-white/95"
                >
                    <ResizablePanel defaultSize={20} minSize={20} maxSize={25}>
                        <div className="flex h-full flex-col p-4 bg-gray-50/50">
                            <VerticalNav activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={80}>
                        <div className="flex h-full relative overflow-hidden">
                            <ContentArea activeTabId={activeTabId} />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>

            {/* Mobile View (without ResizablePanelGroup) */}
            <div className="lg:hidden w-full h-[600px] relative rounded-lg border shadow-xl overflow-hidden mt-12 md:mt-0">
                <ContentArea activeTabId={activeTabId} />
            </div>

        </div>
    );
}

function VerticalNav({ activeTabId, setActiveTabId }: { activeTabId: string, setActiveTabId: (id: string) => void }) {
    return (
        <ScrollArea className="h-full py-6">
            <div className="px-3 py-2">
                <h2 className="mb-4 px-4 text-2xl font-bold tracking-tight text-[#082E6D] italic">What We Offer</h2>
                <div className="space-y-2">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <Button
                                key={tab.id}
                                variant={activeTabId === tab.id ? "secondary" : "ghost"}
                                className={`w-full justify-start text-base font-medium py-6 mb-1 ${activeTabId === tab.id ? "bg-[#082E6D]/10 text-[#082E6D]" : "text-gray-600 hover:text-[#082E6D] hover:bg-gray-100"}`}
                                onClick={() => setActiveTabId(tab.id)}
                            >
                                <Icon className={`mr-3 h-5 w-5 ${activeTabId === tab.id ? "text-[#C11336]" : "text-gray-400"}`} />
                                {tab.label}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </ScrollArea>
    );
}

function ContentArea({ activeTabId }: { activeTabId: string }) {
    const activeContent = TABS.find((tab) => tab.id === activeTabId);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTabId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-cover bg-center flex items-center justify-center p-8 md:p-16"
                style={{ backgroundImage: `url(${activeContent?.backgroundImage})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#082E6D]/80" /> {/* Dark Blue Overlay */}

                <div className="relative z-10 max-w-2xl text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        <h3 className="text-4xl md:text-6xl font-bold mb-4">{activeContent?.title}</h3>
                        <p className="text-xl md:text-2xl font-semibold text-white/90 mb-8 tracking-wide uppercase">{activeContent?.subtitle}</p>
                        <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mx-auto">{activeContent?.description}</p>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

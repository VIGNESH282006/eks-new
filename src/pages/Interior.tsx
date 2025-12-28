
import { InteriorHero } from "@/components/ui/interior-hero";
import { InteriorSplitSticky } from "@/components/ui/interior-split-sticky";
import { InteriorFlyingMask } from "@/components/ui/interior-flying-mask";
import { InteriorStackingCards } from "@/components/ui/interior-stacking-cards";

const Interior = () => {
    return (
        <div className="min-h-screen bg-zinc-900">
            {/* New Design Layout */}
            <InteriorHero />
            <InteriorSplitSticky />
            <InteriorFlyingMask />
            <InteriorStackingCards />
        </div>
    );
};

export default Interior;

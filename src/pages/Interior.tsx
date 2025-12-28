

import { InteriorWhyChooseUs } from "@/components/ui/interior-why-choose-us";

const Interior = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Add padding-top to account for fixed navbar if needed, or manage in layout */}
            <div className="pt-24">
                <InteriorWhyChooseUs />
            </div>
        </div>
    );
};

export default Interior;

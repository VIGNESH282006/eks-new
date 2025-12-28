import { Pricing } from "@/components/ui/pricing";

const constructionPlans = [
    {
        name: "BASIC PACKAGE",
        price: "2099",
        yearlyPrice: "2099",
        period: "sqft",
        features: [
            {
                name: "Design",
                details: [
                    "2D Floor Plan",
                    "3D Elevation Design",
                    "Structural Designing",
                ]
            },
            {
                name: "Project Management",
                details: [
                    "Daily Progress Updates",
                    "Standard Quality Monitoring",
                    "Proper Timeline Management",
                    "Site Suprevision",
                ]
            },
            {
                name: "Structure",
                details: [
                    "Basement Height: Upto 3 feet",
                    "Steel: ARUN ,SURYADEV",
                    "Aggregate: 20mm & 40mm",
                    "Bricks: Standard Red Bricks (Senggal)",
                    "Cement: ZUARI ,DALIMA",
                    "M Sand: Brick work",
                    "P Sand: Plastering",
                    "RCC Design Mix: M20",
                    "Ceiling Height: 10 Feet",
                ]
            },
            {
                name: "Bathroom & Plumbing",
                details: [
                    "Supreme, Star Toilet Fittings",
                    "Bathroom Door: PVC Door & Frame",
                    "Plumbing Materials: Ashirvad & Finolex",
                    "KAG & SPARROW Tiles",
                ]
            },
            {
                name: "Flooring",
                details: [
                    "Tiles: KAG or SPARROW",
                    "Tile Size: 2x2",
                    "Professional Tile Installation",
                ]
            },
            {
                name: "What's Not Included",
                details: [
                    "Comound Wall and Gate",
                    "Sump and Septic Tank",
                    "Lift, Lift Pit & Shaft",
                ]
            },
        ],
        description: "Essential construction services for your dream home.",
        buttonText: "For Detailed specifications",
        href: "/contact",
        isPopular: false,
    },
    {
        name: "STANDARD PACKAGE",
        price: "2399",
        yearlyPrice: "2399",
        period: "sqft",
        features: [
            {
                name: "Design",
                details: [
                    "2D Floor Plan",
                    "3D Elevation Design",
                    "Structural Designing",
                ]
            },
            {
                name: "Project Management",
                details: [
                    "Daily Progress Updates",
                    "Standard Quality Monitoring",
                    "Proper Timeline Management",
                    "Site Suprevision",
                ]
            },
            {
                name: "Structure",
                details: [
                    "Basement Height: Upto 3 feet",
                    "Steel: GBR, ARS",
                    "Aggregate: 20mm & 40mm",
                    "Bricks: Red Bricks \"Wirecut\" (Senggal)",
                    "Cement: COREMENTAL, ULTRATECH",
                    "M Sand: Brick work",
                    "P Sand: Plastering",
                    "RCC Design Mix: M20",
                    "Ceiling Height: 10 Feet",
                ]
            },
            {
                name: "Bathroom & Plumbing",
                details: [
                    "Parryware Toilet Fittings",
                    "Bathroom Door: WPC Door & Frame",
                    "Plumbing Materials: Ashirvad & Finolex",
                    "KAJARIA, SOMANY, KAG Tiles",
                ]
            },
            {
                name: "Flooring",
                details: [
                    "Tiles: KAJARIA, SOMANY, KAG",
                    "Tile Size: 2x2",
                    "Professional Tile Installation",
                ]
            },
            {
                name: "What's Not Included",
                details: [
                    "Comound Wall and Gate",
                    "Sump and Septic Tank",
                    "Lift, Lift Pit & Shaft",
                ]
            },
        ],
        description: "Most popular choice with balanced features.",
        buttonText: "For Detailed specifications",
        href: "/contact",
        isPopular: true,
    },
    {
        name: "PREMIUM PACKAGE",
        price: "2599",
        yearlyPrice: "2599",
        period: "sqft",
        features: [
            {
                name: "Design",
                details: [
                    "2D Floor Plan",
                    "3D Elevation Design",
                    "Structural Designing",
                ]
            },
            {
                name: "Project Management",
                details: [
                    "Daily Progress Updates",
                    "Standard Quality Monitoring",
                    "Proper Timeline Management",
                    "Site Suprevision",
                ]
            },
            {
                name: "Structure",
                details: [
                    "Basement Height: Upto 3 feet",
                    "Steel: TATA, JSW, I-STEEL",
                    "Aggregate: 20mm & 40mm",
                    "Bricks: Red Bricks \"Wirecut\" (Senggal)",
                    "Cement: COREMENTAL, ULTRATECH",
                    "M Sand: Brick work",
                    "P Sand: Plastering",
                    "RCC Design Mix: M20",
                    "Ceiling Height: 10 Feet",
                ]
            },
            {
                name: "Bathroom & Plumbing",
                details: [
                    "Parryware, Jaguar, Kohler Toilet Fittings",
                    "Bathroom Door: WPC Door & Frame",
                    "Plumbing Materials: Ashirvad & Finolex",
                    "KAJARIA, SOMANY, KAG, ORIENBELL Tiles",
                ]
            },
            {
                name: "Flooring",
                details: [
                    "Tiles: KAJARIA, SOMANY, KAG, ORIENBELL",
                    "Tile Size: 4x2",
                    "Professional Tile Installation",
                ]
            },
            {
                name: "What's Not Included",
                details: [
                    "Comound Wall and Gate",
                    "Sump and Septic Tank",
                    "Lift, Lift Pit & Shaft",
                ]
            },
        ],
        description: "Premium finishes and extensive coverage.",
        buttonText: "For Detailed specifications",
        href: "/contact",
        isPopular: false,
    },
];

export default function Packages() {
    return (
        <div className="min-h-screen bg-background pt-24">
            <Pricing
                plans={constructionPlans}
                title="Construction Packages"
                description="Choose the package that fits your needs and budget. All packages include our commitment to quality and transparency."
            />
        </div>
    );
}

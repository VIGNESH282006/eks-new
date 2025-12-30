
import { FeatureSteps } from "../components/ui/feature-section";
import { Carousel } from "../components/ui/carousel";
import { CareerApplicationForm } from "../components/ui/career-form";

const features = [
    {
        step: 'Innovation',
        title: 'Innovation',
        content: 'We offer a range of exciting opportunities for professionals at all stages of their careers.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop'
    },
    {
        step: 'Support',
        title: 'Support',
        content: 'We pride ourselves on creating an innovative and supportive work environment.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop'
    },
    {
        step: 'Excellence',
        title: 'Excellence',
        content: 'Our commitment to excellence drives us to seek dedicated and skilled individuals.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
    },
];

const slideData = [
    {
        title: "Architecture & Design",
        button: "Explore Roles",
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2540&auto=format&fit=crop",
        roles: [
            {
                title: "Architects",
                locations: ["Chennai", "Bangalore", "Hyderabad"],
                description: "Creative and experienced architects to join our teams."
            },
            {
                title: "3D Visualizer",
                locations: ["Chennai"],
                description: "Specialize in 3D architectural visualization."
            }
        ]
    },
    {
        title: "Engineering",
        button: "Explore Roles",
        src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2570&auto=format&fit=crop",
        roles: [
            {
                title: "Civil Engineer",
                locations: ["Chennai"],
                description: "Excellent opportunities for civil engineers."
            },
            {
                title: "Site Engineer",
                locations: ["Chennai"],
                description: "Manage construction, ensure safety, and coordinate for project success."
            },
            {
                title: "Project Manager",
                locations: ["Chennai"],
                description: "Lead construction projects and manage teams."
            }
        ]
    },
    {
        title: "Sales & Marketing",
        button: "Explore Roles",
        src: "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?q=80&w=2570&auto=format&fit=crop",
        roles: [
            {
                title: "CRM Executive",
                locations: ["Chennai"],
                description: "Maintain strong relationships with our clients."
            },
            {
                title: "Digital Marketing",
                locations: ["Chennai"],
                description: "Skilled digital marketers for SEO and SEM."
            },
            {
                title: "Marketing Professional",
                locations: ["Chennai"],
                description: "Promote our services and reach new clients."
            }
        ]
    },
    {
        title: "Administration",
        button: "Explore Roles",
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2520&auto=format&fit=crop",
        roles: [
            {
                title: "Front Office",
                locations: ["Chennai"],
                description: "Be the face of eks Construction."
            },
            {
                title: "Accountant",
                locations: ["Chennai"],
                description: "Manage financial records and support business growth."
            }
        ]
    },
];

const Careers = () => {
    return (
        <div className="pt-32 px-4 md:px-8 min-h-screen bg-white text-center font-sans">
            <div className="max-w-4xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Why Choose <span className="text-[#082E6D]">e</span><span className="text-[#C11336]">k</span><span className="text-[#082E6D]">s construction</span>?
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Are you passionate about architecture and construction? eks Construction, a leading Turnkey Home construction service provider, is expanding its team...
                </p>
            </div>

            <FeatureSteps
                features={features}
                title="Our Values"
                autoPlayInterval={4000}
                imageHeight="h-[400px]"
                className="bg-transparent"
            />

            <div className="relative overflow-hidden w-full h-full py-20 bg-gray-50 mt-20 rounded-[3rem]">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">Explore Departments</h2>
                <Carousel slides={slideData} />
            </div>

            <CareerApplicationForm />

            <div className="max-w-4xl mx-auto mt-20 mb-20">
            </div>
        </div>
    );
};

export default Careers;

import { MarqueeLogoScroller, Logo } from './marquee-logo-scroller';

const RetailPartnersSection = () => {
    const partners: Logo[] = [
        {
            src: '/brands/ARS.jpg',
            alt: 'ARS',
            gradient: { from: '#E63946', via: '#F1FAEE', to: '#A8DADC' },
        },
        {
            src: '/brands/ashirvad-pipes.jpg',
            alt: 'Ashirvad Pipes',
            gradient: { from: '#457B9D', via: '#A8DADC', to: '#1D3557' },
        },
        {
            src: '/brands/asian-paints.jpg',
            alt: 'Asian Paints',
            gradient: { from: '#F4A261', via: '#E76F51', to: '#264653' },
        },
        {
            src: '/brands/coromandel.jpg',
            alt: 'Coromandel',
            gradient: { from: '#2A9D8F', via: '#E9C46A', to: '#F4A261' },
        },
        {
            src: '/brands/finolex-pipes.jpg',
            alt: 'Finolex Pipes',
            gradient: { from: '#023E8A', via: '#0077B6', to: '#0096C7' },
        },
        {
            src: '/brands/gbr-tmt.jpg',
            alt: 'GBR TMT',
            gradient: { from: '#D62828', via: '#F77F00', to: '#FCBF49' },
        },
        {
            src: '/brands/jaquar.jpg',
            alt: 'Jaquar',
            gradient: { from: '#333533', via: '#D6D6D6', to: '#FFEE32' },
        },
        {
            src: '/brands/johnson-tiles.jpg',
            alt: 'Johnson Tiles',
            gradient: { from: '#FFD100', via: '#FFEE32', to: '#D6D6D6' },
        },
        {
            src: '/brands/jsw-steel.jpg',
            alt: 'JSW Steel',
            gradient: { from: '#003049', via: '#D62828', to: '#F77F00' },
        },
        {
            src: '/brands/kag-tiles.jpg',
            alt: 'KAG Tiles',
            gradient: { from: '#6A994E', via: '#A7C957', to: '#F2E8CF' },
        },
        {
            src: '/brands/kajaria-tiles.jpg',
            alt: 'Kajaria Tiles',
            gradient: { from: '#BC4749', via: '#F2E8CF', to: '#386641' },
        },
        {
            src: '/brands/kamachi-tmt-bars.jpg',
            alt: 'Kamachi TMT Bars',
            gradient: { from: '#5F0F40', via: '#Fb8B24', to: '#E36414' },
        },
        {
            src: '/brands/orbit-cables.jpg',
            alt: 'Orbit Cables',
            gradient: { from: '#9A031E', via: '#CB793A', to: '#F1D302' },
        },
        {
            src: '/brands/orientbell-tiles.jpg',
            alt: 'Orientbell Tiles',
            gradient: { from: '#0F4C5C', via: '#5F0F40', to: '#FB8B24' },
        },
        {
            src: '/brands/ramco-cement.jpg',
            alt: 'Ramco Cement',
            gradient: { from: '#283618', via: '#606C38', to: '#FEFAE0' },
        },
        {
            src: '/brands/tirumala-steel.jpg',
            alt: 'Tirumala Steel',
            gradient: { from: '#6D6875', via: '#B5838D', to: '#E5989B' },
        },
        {
            src: '/brands/ultratech.jpg',
            alt: 'UltraTech',
            gradient: { from: '#FFB703', via: '#FB8500', to: '#219EBC' },
        },
        {
            src: '/brands/zuari-cement-logo.jpg',
            alt: 'Zuari Cement',
            gradient: { from: '#8D99AE', via: '#EDF2F4', to: '#2B2D42' },
        }
    ];

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <MarqueeLogoScroller
                    title="Our Retail Partners"
                    description="Trusted brands we collaborate with to deliver quality."
                    logos={partners}
                    speed="slow"
                    className="bg-gray-50 border-gray-100" // Light theme adjustment
                />
            </div>
        </div>
    );
};

export default RetailPartnersSection;

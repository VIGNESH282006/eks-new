
import { useState, useEffect } from "react";

export interface GalleryItem {
    id: string | number;
    heading: string;
    images: { url: string }[] | string; // Handle both parsed object or string
    created_at: string;
}

export function useGallery() {
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch("/api/get_gallery.php");
                if (!response.ok) {
                    throw new Error(`Failed to fetch gallery: ${response.statusText}`);
                }
                const data = await response.json();

                // Ensure data.gallery exists and parse images if they are strings
                const parsedGallery = (data.gallery || []).map((item: any) => ({
                    ...item,
                    images: typeof item.images === 'string' ? JSON.parse(item.images) : item.images
                }));

                setGallery(parsedGallery);
            } catch (err) {
                console.error("Error fetching gallery:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return { gallery, loading, error };
}

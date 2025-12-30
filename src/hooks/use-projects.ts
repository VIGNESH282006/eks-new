
import { useState, useEffect } from "react";
import { ProjectData } from "@/components/ui/project-card";

export function useProjects() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/get_projects.php");
                if (!response.ok) {
                    throw new Error(`Failed to fetch projects: ${response.statusText}`);
                }
                // API returns { success: true, projects: [...] }
                const data = await response.json();
                setProjects(data.projects || []);
            } catch (err) {
                console.error("Error fetching projects:", err);
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return { projects, loading, error };
}

export interface Course {
    id: number;
    documentId: string;
    title: string;
    description: string;
    cover?: {
        url: string;
        // add other media fields if needed
    };
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
    lessons?: Lesson[];
}

export interface Tag {
    id: number;
    documentId: string;
    label: string;
    createdAt: string;
    updatedAt: string;
}

export interface Lesson {
    id: number;
    documentId: string;
    title: string;
    content: string;
    videoUrl?: string; // Added this to support video saving
    createdAt?: string;
    updatedAt?: string;
}

export interface Meta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}
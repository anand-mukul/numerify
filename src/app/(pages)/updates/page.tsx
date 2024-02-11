import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Updates() {
    const client = createClient();
    const update = await client.getSingle("updates");

    return (
        <div className="min-h-screen bg-gradient-to-b from-neutral-50 via-orange-200 to-orange-400">
            <div className="m-4 flex items-center justify-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight bg-gradient-to-b from-neutral-50 via-orange-200 to-orange-400 bg-clip-text text-transparent">
                    Release Updates
                </h1>
            </div>
            <SliceZone slices={update.data.slices} components={components} />;
        </div>
    )
}

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const update = await client.getSingle("updates");

    return {
        title: update.data.meta_title,
        description: update.data.meta_description,
    };
}

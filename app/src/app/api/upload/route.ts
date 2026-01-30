import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique name
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure dir exists
        await mkdir(uploadDir, { recursive: true });

        // Write file
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return URL
        const imageUrl = `/uploads/${filename}`;
        return NextResponse.json({ url: imageUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

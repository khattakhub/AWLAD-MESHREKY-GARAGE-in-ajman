import React, { useEffect, useRef, useLayoutEffect } from 'react';

// Quill is loaded from CDN, so we need to declare it for TypeScript
declare var Quill: any;

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillInstanceRef = useRef<any>(null); // To hold the Quill instance
    const contentRef = useRef(value); // To hold the latest content without causing re-renders

    // Update contentRef whenever value prop changes
    useLayoutEffect(() => {
        contentRef.current = value;
    }, [value]);

    useEffect(() => {
        if (!editorRef.current || quillInstanceRef.current) {
            return;
        }

        const quill = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, 4, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    ['link'],
                    ['clean']
                ]
            },
            placeholder: 'Write your amazing blog post here...',
        });

        // Set initial content
        quill.root.innerHTML = contentRef.current;

        const handleChange = () => {
             // Only call onChange if the content has actually changed.
             // This prevents infinite loops.
            if (quill.root.innerHTML !== contentRef.current) {
                onChange(quill.root.innerHTML);
            }
        };

        quill.on('text-change', handleChange);
        quillInstanceRef.current = quill;

        return () => {
            quill.off('text-change', handleChange);
            quillInstanceRef.current = null; // Clean up instance on unmount
        };
    }, []); // Run only once on mount

     // Sync external changes to the editor
    useEffect(() => {
        const quill = quillInstanceRef.current;
        if (quill && quill.root.innerHTML !== value) {
            // Use clipboard.dangerouslyPasteHTML to avoid moving cursor to the start
            const delta = quill.clipboard.convert(value);
            quill.setContents(delta, 'silent');
        }
    }, [value]);

    return (
        <div className="bg-white dark:bg-brand-dark rounded-md overflow-hidden">
            <div ref={editorRef} style={{ minHeight: '250px' }}></div>
        </div>
    );
};

export default RichTextEditor;

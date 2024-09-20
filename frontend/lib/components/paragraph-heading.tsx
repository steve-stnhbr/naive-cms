

export default function ParagraphHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="scroll-m-20 mt-4 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {children}
        </h2>
    )
}
export function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`mb-4 p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300 bg-white ${className}`}>
            {children}
        </div>
    );
}

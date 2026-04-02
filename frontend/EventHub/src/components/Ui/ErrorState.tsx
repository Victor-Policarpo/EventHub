type PropsError = {
    message: string;
    detail?: string;
    onRetry?: () => void;
};

function ErrorState({ message, detail, onRetry }: PropsError) {
    return (
        <div className="text-center p-4">
            <p className="font-semibold">{message}</p>

            {detail && (
                <p className="text-sm text-gray-500">{detail}</p>
            )}

            {onRetry && (
                <button onClick={onRetry}>
                    Tentar novamente
                </button>
            )}
        </div>
    );
}
export default ErrorState;
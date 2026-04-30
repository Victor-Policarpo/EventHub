import { Button } from "./Button";

type PropsError = {
    message: string;
    detail?: string;
    onRetry?: () => void;
};

export function ErrorState({ message, detail, onRetry }: PropsError) {
    return (
        <div className="text-center p-4">
            <p className="font-semibold">{message}</p>

            {detail && (
                <p className="text-sm text-gray-500">{detail}</p>
            )}

            {onRetry && (
                <Button onClick={onRetry}>
                    Tentar novamente
                </Button>
            )}
        </div>
    );
}
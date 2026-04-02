import type { ComponentProps } from "react";

interface labelProps extends ComponentProps<"label"> {
    required?: boolean;
}
function Label(props: labelProps){
    return (
        <div>
            <label {...props}>
            </label>
        </div>
    );
}
export default Label;
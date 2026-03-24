import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginUser(){
    const {register, handleSubmit, formState: { errors }} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur"
    });

    function onSubmit(data: LoginFormData){
        console.log(data);
    }


    return (
        <main className="h-full w-full flex items-center mt-12 flex-col">
            <h1 className="text-3xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username:</label>
                <input type="text" className="w-full mt-4 p-2 border border-gray-300 rounded" placeholder="Username.." id="username" {...register("username")} />
                {errors.username && <span className="text-red-500">{errors.username.message}</span>}

                <input type="password" className={`w-full mt-4 p-2 border rounded transition-all duration-300 outline-none ${ errors.password? "border-red-400 ring-1 ring-red-400" : "border-gray-300 focus:border-blue-500" }`} placeholder="Password.." id="password" {...register("password")} />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white rounded">Enviar</button>
            </form>
        </main>

    );
}

export default LoginUser;
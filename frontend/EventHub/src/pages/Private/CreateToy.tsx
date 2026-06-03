import { PackagePlus } from "lucide-react";
import { CreateToyForm } from "../../components"; 

export function CreateToy() { 
    return ( 
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 flex justify-center">
            <div className="w-full max-w-2xl flex flex-col gap-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Novo Brinquedo
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Adicione um novo brinquedo ao acervo de locação.
                    </p>
                </div>

                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
                    <div className="mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <PackagePlus size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                            Dados do Brinquedo
                        </h2>
                    </div>
                    <CreateToyForm />
                </section>

            </div>
        </div> 
    ); 
}
import FormEmployeeEdit from "../Forms/FormEmployeeEdit";

export default function Employee() {
    return (
        <div>
        <FormEmployeeEdit />
        <button className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-bold shadow-md active:scale-95 transition-all">Delete</button>
        </div>
    );
}
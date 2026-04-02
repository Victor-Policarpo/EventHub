import ProfileForm from "../../components/Forms/ProfileForm";
import Logout from "../../components/Logout";
import SecurityModal from "../../components/SecurityModal";
function Profile() {
    return (
        <div className="max-w-4xl px-8 py-12 flex flex-col gap-10">

            <section>
                <h2 className="text-xl font-bold text-slate-800 mb-6">Meu Perfil</h2>
                <ProfileForm />
            </section>

            <hr className="border-slate-100 w-full max-w-md" />

            <section className="flex flex-col gap-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    Configurações de Conta
                </h3>
                
                <div className="flex flex-col items-start gap-4">
                    <SecurityModal />

                    <Logout />
                </div>
            </section>

            <div className="h-20" />
        </div>
    );
}
export default Profile;
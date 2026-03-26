import { useAuth } from "../hooks/useAuth";

export function Logout() {

    const {logout}  = useAuth();
    const handleLogout = async () => {
        await logout();
    };
    return (
        <button 
          onClick={handleLogout}
          style={{ cursor: 'pointer', background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>
          Sair
        </button>
    );
}
export default Logout;
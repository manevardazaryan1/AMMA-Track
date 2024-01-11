import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Account() {
    const user = useSelector(state=>state.auth.loggedUser)

    if (!user) {
        return <Navigate to="/" />;
    }
    
    return (
        user && <div className="account-section">{user.email}</div>
    )
}
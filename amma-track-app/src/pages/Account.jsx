import { Navigate } from "react-router-dom";

export default function Account() {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"));

    if (!user) {
        return <Navigate to="/" />;
    }
    
    return (
        user && <div className="account-section">{user.email}</div>
    )
}
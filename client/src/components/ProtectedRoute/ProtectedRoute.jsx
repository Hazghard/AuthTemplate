import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({children}) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/signin"/>;
}

export default ProtectedRoute;
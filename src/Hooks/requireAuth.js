import { useContext, useEffect } from "react";
import AuthConext from "../context/authProvider.js";
import { useLocation, Outlet, Navigate } from "react-router";

export default function RequireAuth() {
	const { accessToken } = useContext(AuthConext);
	const location = useLocation();
	useEffect(() => {
		console.log("from requireAuth", accessToken, location);
	}, []);

	return (
		<>
			{accessToken != null ? (
				<Outlet />
			) : (
				<Navigate to="/login" state={{ from: location }} replace />
			)}
		</>
	);
}

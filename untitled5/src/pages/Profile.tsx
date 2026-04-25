import { useEffect, useState } from 'react';
import { getProfile } from '../api/auth';
import type {User} from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data);
            } catch (err) {
                logout();
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [logout, navigate]);

    if (loading) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Student Personal Cabinet</div>
                        <div className="card-body">
                            <h5>Welcome, {user?.email}</h5>
                            <button className="btn btn-danger" onClick={logout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
import React, {useState} from 'react';
import AuthForm from "../../components/Auth/AuthForm.tsx";

const LoginPage: React.FC = () => {
    const [isLogged, setIsLogged] = useState(false);

    const handleLoginSuccess = () => {
        setIsLogged(true);
        //   redirect to the dashboard

    };

    return (
        <div>
            <AuthForm
                isLogin={true}
                thirdParty={false}
                toggleForm={() => {
                }}
                isLogged={isLogged}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
};

export default LoginPage;

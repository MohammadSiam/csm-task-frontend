import { Outlet } from 'react-router-dom';

const AuthenticationLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;

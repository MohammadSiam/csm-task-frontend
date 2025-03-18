import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

const HomeLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;

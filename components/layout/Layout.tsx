import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import { NextPage } from 'next';

const Layout: NextPage = (props) => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;

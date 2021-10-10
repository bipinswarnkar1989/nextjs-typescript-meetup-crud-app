import type { NextPage } from 'next';
import classes from './Card.module.css';

export const Card: NextPage = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;

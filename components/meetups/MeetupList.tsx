import { NextPage } from 'next';
import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';
import { MeetupType } from './types';

type Props = {
  meetups: MeetupType[];
};

const MeetupList: NextPage<Props> = (props) => {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description=''
        />
      ))}
    </ul>
  );
};

export default MeetupList;

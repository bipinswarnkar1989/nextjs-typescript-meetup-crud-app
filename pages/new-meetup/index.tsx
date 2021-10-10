// our-domain.com/new-meetup
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { MeetupType } from '../../components/meetups/types';

const NewMeetupPage: NextPage = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData: Omit<MeetupType, 'id'>) {
    const resp = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await resp.json();
    console.log(json);

    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Add Meetup</title>
        <meta name='description' content='Add your own meetups' />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;

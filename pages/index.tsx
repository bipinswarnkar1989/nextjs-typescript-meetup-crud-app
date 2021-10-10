import { MongoClient } from 'mongodb';
import { GetStaticProps, NextPage } from 'next';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';
import { MeetupType } from '../components/meetups/types';

type Props = {
  meetups: MeetupType[];
};

const HomePage: NextPage<Props> = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Browse a huge list of highly active meetups'
        />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // fetch data from API
  const client = await MongoClient.connect(
    'mongodb://localhost:27017/nextjs-basics'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.title,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;

import { MongoClient, ObjectId } from 'mongodb';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MeetupType } from '../../components/meetups/types';

type Props = {
  meetupData: MeetupType;
};
const MeetupDetails: NextPage<Props> = ({ meetupData }) => {
  if (!meetupData) {
    return null;
  }
  const { image, title, address, description } = meetupData;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </Fragment>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb://localhost:27017/nextjs-basics'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find({}).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const meetupId = context.params?.meetupId;

  const client = await MongoClient.connect(
    'mongodb://localhost:27017/nextjs-basics'
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId as string),
  });

  client.close();

  console.log(meetup);
  return {
    props: {
      meetupData: {
        id: meetup?._id.toString(),
        title: meetup?.title,
        address: meetup?.address,
        image: meetup?.image,
        description: meetup?.description,
      },
    },
  };
};

export default MeetupDetails;

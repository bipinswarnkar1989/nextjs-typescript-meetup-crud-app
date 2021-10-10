import { Fragment } from 'react';
import Link from 'next/link';

const NewsPage = () => {
  return (
    <Fragment>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href='/news/about-reactjs'>About React</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default NewsPage;

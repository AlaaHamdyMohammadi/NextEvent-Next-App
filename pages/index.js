import Head from 'next/head';
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";
import ErrorAlert from '../components/ui/ErrorAlert';
import NewsletterRegistration from "../components/input/newsletter-registration";


function HomePage(props){
    const {featuredEvents} = props;
    if (!featuredEvents || featuredEvents.length === 0){
      return <ErrorAlert/>
    }

      return (
        <div>
          <Head>
            <title>NextJS Event | Home Page</title>
            <meta
              name="description"
              content="Find a lot of great events that allow you to evolve..."
            />
          </Head>
          <NewsletterRegistration />
          <EventList items={featuredEvents} />
        </div>
      );
}

export default HomePage;

export async function getStaticProps(context){
  const featuredEvents = await getFeaturedEvents();
  return {
    props: { featuredEvents },
    revalidate: 5,
  };
}
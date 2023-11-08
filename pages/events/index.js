import Head from "next/head";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import EventsSearch from "../../components/events/EventsSearch";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function handleFindEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <div>
      <Head>
        <title>NextJS Events | All Events Page</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <EventsSearch onSearch={handleFindEvents} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(context) {
  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 5,
  };
}

export default AllEventsPage;

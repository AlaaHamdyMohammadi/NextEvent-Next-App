import { useRouter } from "next/router";
import useSWR from "swr";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { useEffect, useState } from "react";
import Head from "next/head";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();
  // console.log(router.query.slug);
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    `https://nextjs-course-a4784-default-rtdb.firebaseio.com/events.json`,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!filterData || !loadedEvents)
    return <h1 className="center">Loading..</h1>; //Like Spinner

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <div className="center">
        <ErrorAlert>Invalid Data</ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>No Event Yet</ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);
  return (
    <div>
      <Head>
        <title>{`NextJS Events | ${filteredMonth}/${filteredYear}`}</title>
        <meta
          name="description"
          content={`All events for ${filteredMonth}/${filteredYear}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;

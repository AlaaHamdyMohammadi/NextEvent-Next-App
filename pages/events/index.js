import {getAllEvents} from '../../dummy-data';
import EventList from "../../components/events/EventList";
import EventsSearch from '../../components/events/EventsSearch';
import { useRouter } from 'next/router';

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function handleFindEvents(year, month){
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <div>
      <EventsSearch onSearch={handleFindEvents}/>
      <EventList items={events} />
    </div>
  );
}

export default AllEventsPage;

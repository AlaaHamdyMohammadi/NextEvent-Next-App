import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
function FilteredEventsPage() {
  const router = useRouter();
  // console.log(router.query.slug)
  const filterData = router.query.slug;
  if (!filterData) return <h1 className="center">Loading..</h1>; //Like Spinner
  
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth < 1 || filteredMonth > 12 ){
    return <>
    <h1>Invalid Data</h1>
    <Button  link={'/events'}>Show All Events</Button>
    </>
  }
  
  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });
  
  if(!filteredEvents || filteredEvents.length === 0){
    return <>
      <h1>No Events Yet</h1>
      <Button link={'/events'}>Show All Events</Button>
    </>
  }
  
  const date = new Date(filteredYear, filteredMonth - 1)
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;

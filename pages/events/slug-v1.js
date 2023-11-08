import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";


function FilteredEventsPage(props) {
  const {hasError, events, date: dateFromServer} = props;

  if (hasError) {
    return (
      <div className="center">
        <ErrorAlert>Invalid Data</ErrorAlert>
        <Button link={"/events"}>Show All Events</Button>
      </div>
    );
  }
  
  const filteredEvents = events;
  
  if(!filteredEvents || filteredEvents.length === 0){
   return (
     <div className="center">
       <ErrorAlert>No Event Yet</ErrorAlert>
       <Button link={"/events"}>Show All Events</Button>
     </div>
   );
  }
  
  const date = new Date(dateFromServer.year, dateFromServer.month - 1)
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context){
  const {params} = context;
  const filterData = params.slug;
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredMonth > 12){
    return {
      props:{hasError: true},
      // notFound: true,
      // redirect: {
      //   destination: '/404' // We not handle Error Page
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });


  return {
    props: {
      events: filteredEvents,
      date: {
        year: filteredYear,
        month: filteredMonth,
      },
    },
  };
}

export default FilteredEventsPage;

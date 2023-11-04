import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";

function FilteredEventsPage() {
  const router = useRouter();
  // console.log(router.query.slug)
  const filterData = router.query.slug;
  if (!filterData) return <h1 className="center">Loading..</h1>; //Like Spinner
  
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if(isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth < 1 || filteredMonth > 12 ){
    return <h1>Invalid Data</h1>
  }
  
  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });
  
  if(!filteredEvents || filteredEvents.length === 0){
    return <h1>No Events Yet</h1>
  }
  
  return (
    <div>
      <h1>🎉🎉 Filtered Events Page 🎉🎉 </h1>
    </div>
  );
}

export default FilteredEventsPage;

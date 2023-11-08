import { useState } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helpers/api-util";
import ErrorAlert from '../components/ui/ErrorAlert';
function HomePage(props){
    const {featuredEvents} = props;
    if (!featuredEvents || featuredEvents.length === 0){
      return <ErrorAlert/>
    }

      return (
        <div>
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
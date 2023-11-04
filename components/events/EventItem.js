import Link from "next/link";

function EventItem({item}) {
  const { id, title, description, location, date, image, isFeatured } = item;
  const humanDate = new Date(date).toLocaleDateString('en-US', {
    day: "numeric",
    month: "long",
    year: "numeric",

  });

  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img style={{width: "250px"}} src={"/" + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}

export default EventItem;

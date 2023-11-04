function EventList({items}) {
    return (
        <ul>
            {items.map((item) => <li key={item.id}>{}</li>)}
        </ul>
    )
}

export default EventList

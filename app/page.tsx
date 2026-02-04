import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'

const events = [
  {
    title: 'Event 1',
    image: '/images/event1.png'
  },
  {
    title: 'Event 2',
    image: '/images/event2.png'
  },
  
]

const page = () => {
  return (
    <section>
      <h1 className='text-center'> The Hub for Every Event
        <br />
        You Cannot miss
      </h1>
      <p className='text-center mt-5'> Hackathons, Meetups, and Confrences all in one place</p>
      <ExploreBtn />
      <div className='mt-20 space-y-7'>
        <h3>Featured Events</h3>
        <ul className='events'>
          {events.map((event) => (
            <li key={event.title} >
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page
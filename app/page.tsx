import ExploreBtn from '@/components/ExploreBtn'
import React from 'react'

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
          {[1,2,3,4,5,6].map((event) => (
          <ul key={event}>Event {event}</ul>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page
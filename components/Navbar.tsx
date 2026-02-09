import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header>
            <nav>
                <Link href="/" className='logo'>
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
                    <p>DevEvents</p>
                </Link>
                <ul>
                    <ul><Link href="/">Home</Link></ul>
                    <ul><Link href="/events">Events</Link></ul>
                    <ul><Link href="/about">Create Event</Link></ul>
                </ul>
            </nav>

        </header>
    )
}

export default Navbar
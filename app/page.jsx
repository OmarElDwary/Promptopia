import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover&nbsp;
        <span className='orange_gradient'>& Share AI prompts</span>
      </h1>

      <p className='desc text-center'>
        A place to share and discover AI generated prompts for writing, art, and more.
      </p>

      <Feed />
    </section>
  )
}

export default Home

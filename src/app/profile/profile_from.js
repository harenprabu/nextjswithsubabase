'use client'
import { useState, useEffect } from 'react'

import supabase from '/utils/supabase';

export default function Account({session}) {
  const [loading, setLoading] = useState(true)
  const [fristname, setFristname] = useState(null)
  const[phone ,setPhonenumber] = useState(null)
  
 
  useEffect(() => {
    async function getProfile() {
      setLoading(true)
    //   const { user } = session

      let { data, error } = await supabase
      .from('profiles')
      .select('first_name,phone')
      .eq('id', session.id)
      .single()
        console.log(data)
console.log(data)
      if (error) {
        console.warn(error)
      } else if (data) {
        setFristname(data.first_name)
        setPhonenumber(data.phone)
        console.log(data)
        // setWebsite(data.website)
        // setAvatarUrl(data.avatar_url)
      }

      setLoading(false)
    }

    getProfile()
  }, [session])

  async function updateProfile(event) {
    event.preventDefault()

    setLoading(true)
    
    let {data, error } = await supabase .from('profiles').update({first_name:fristname,phone:phone}).eq('id', session.id)

    if (error) {
      alert(error.message)
    } 
    if (data){
        console.log(data)
        setLoading(false)
    }
    
  }

  return (
    <form onSubmit={updateProfile} class="w-full max-w-sm">
       <div class="md:flex md:items-center mb-6">
       <div class="md:w-1/3">
        <label htmlFor="email" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">Username</label>
        </div>
        <div class="md:w-2/3">
        <input id="email" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" value={session.email} disabled />
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label htmlFor="fristname"class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">Name</label>
        </div>
        <div class="md:w-2/3">
        <input
          id="fristname"
          type="text"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          required
          value={fristname || ''}
          onChange={(e) => setFristname(e.target.value)}
        />
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3">
        <label htmlFor="fristname"class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">Phone</label>
        </div>
        <div class="md:w-2/3">
        <input
          id="fristname"
          type="text"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          required
          value={phone || ''}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        </div>
      </div>
      {/* <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div> */}

      <div class="md:flex md:items-center">
      <div class="md:w-2/3">
        <button class="button block primary " type="submit" >
           'Update'
        </button>
        </div>
      </div>

      <div>
        {/* <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button> */}
      </div>
    </form>
  )
}
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';
import Navbar from 'src/components/navbar';
import {Button} from '@nextui-org/button'
import React from 'react';
import { profile } from 'console';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }
  const { data: profiles} = await supabase.from("profiles").select('first_name,last_name,phone_number').eq('id',user.id)


 
 
  return (
    <div>
      
    <Navbar/>

    <div className="card">
    {profiles?.map((country) => (
          <h1 key={country.id}>{country.first_name}</h1>
          ))}

      <code className="highlight">{user.role}</code>
      <Link className="button" href="/profile">
        Go to Profile
      </Link>
      <Button>click</Button>
      <SignOut />
   

    <form class="w-full max-w-sm">
    <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        UserName
        </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={user.email}/>
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
 
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
        Full Name
      </label>
    </div>
      
    {profiles?.map((country) => (
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={country.first_name}/>
    </div>
     ))}
  </div>

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
      phone 
      </label>
    </div>
    {profiles?.map((country) => (
    <div class="md:w-2/3">
  
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={country.phone_number} />
    </div>
    ))}
  </div>
   <div class="md:flex md:items-center"hidden>
    
    <div class="md:w-2/3">
      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
update      </button>
    </div>
  </div>
  
  
</form>
    
  </div>

  </div>
  
  );
}

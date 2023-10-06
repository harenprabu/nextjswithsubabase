import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

import SignOut from 'src/components/SignOut';
import Navbar from 'src/components/navbar';
// import TEST from 'src/components/testhome';
import PROFILE from './profile_from';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  // let { data:profile } = await supabase
  // .from('profiles')
  // .select('first_name,last_name,phone_number')
  // .eq('id', user.id)
  // .single()


  return (
   <div>
    <Navbar/>
    
    <div className="card">
  <h2>User profile</h2>
      
 <PROFILE session={user} />
 </div>
 
 </div>

  );
 }
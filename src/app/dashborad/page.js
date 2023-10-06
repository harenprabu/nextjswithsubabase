import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// import Link from 'next/link';
import { redirect } from 'next/navigation';


 import CARDS from 'src/components/dashcards';
import Navbar from 'src/components/navbar';
//  import TEST from 'src/components/testhome';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }
  //query 
  const { data: profiles} = await supabase.from("profiles").select('first_name,last_name,Active_orders,Vistors').eq('id',user.id)
  return (
    <div>
     {/* <TEST/> */}
      
   
      <div>
      {
       profiles?.map((country) => {
        return(
      <div>
         <Navbar username = {country.first_name}last_name={country.last_name}/>
       <CARDS key = {country.id} activeorder= {country.Active_orders}  vist = {country.Vistors}/>
      
       </div>
      
        )
       })
      }
      </div>
    </div>
  );
}
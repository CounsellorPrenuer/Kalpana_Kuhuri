import groq from 'groq'
import { client } from '@/lib/sanity'
import HomeClient from '@/components/HomeClient'

const query = groq`*[_type == "siteContent" && _id == "site-content"][0]`

export default async function Home() {
  const data: any = await client.fetch(query)
  return <HomeClient data={data} />
}

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { getJobRecords } from '../lib/getJobs'
import Link from 'next/link'

export default function Home({ jobRecords }) {

  return (
    <div className='min-h-screen'>
      <Head>
        <title>Capture Page</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='max-w-6xl mx-auto py-12 px-4 text-gray-900'>
        <h1 className='leading-loose font-extrabold text-4xl text-center'>
          Awesome Company Inc.
        </h1>
        <div className='py-12 max-w-xl mx-auto space-y-8'>
          {jobRecords.map((item) => (
            <div key={item.recordId} className='flex justify-between'>
              <Link href={`/jobs/${item.recordId}`} passHref>
                <a className='text-2xl font-bold underline'>{item.title}</a>
              </Link>
              <div className='text-lg text-gray-500'>{item.location}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      jobRecords: await getJobRecords(),
    },
  }
}

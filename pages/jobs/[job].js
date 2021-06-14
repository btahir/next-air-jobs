import { useState, useEffect } from 'react'
import { getRecordIds, getJob } from '../../lib/getJobs'

function JobContent({ job }) {
  useEffect(() => {

  })
  console.log('job', job)
  return (
    <div className='max-w-4xl mx-auto py-24 px-4 text-gray-900'>
      <h1 className='text-4xl font-extrabold'>{job.title}</h1>
      <div className='text-lg text-gray-500 mt-4'>{job.location}</div>
      <p className='text-lg mt-6'>{job.description}</p>
      <div className='text-xl font-bold mt-6 mb-4'>Skills Needed</div>
      <ul>
        {job.skills.split(';').map((skill, index) => (
          <li key={index} className='list-disc list-inside'>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function getStaticPaths() {
  const allIds = await getRecordIds()

  const paths = allIds.map((item) => {
    return {
      params: { job: String(item.recordId) },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const job = await getJob(params.job)

  return {
    props: {
      job,
    },
  }
}

export default JobContent

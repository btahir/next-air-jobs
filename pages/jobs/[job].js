import { useState, useEffect } from 'react'
import { getRecordIds, getJob } from '../../lib/getJobs'
import { UploadIcon } from '@heroicons/react/solid'

function JobContent({ job }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [message, setMessage] = useState('')
  const [resume, setResume] = useState('')
  const [resumeStatus, setResumeStatus] = useState('Upload Resume')
  const [jobId, setJobId] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [applied, setApplied] = useState(false)

  useEffect(() => {
    setJobId(String(job.recordId))
    setJobTitle(job.title)
  })

  async function handleSubmit(event) {
    event.preventDefault()
    // if (resumeStatus != 'Resume Uploaded!') {
    //   alert('Upload Resume!')
    // } else {
    await fetch('/api/application', {
      method: 'POST',
      body: JSON.stringify({
        email,
        message,
        name,
        linkedin,
        github,
        resume,
        jobId,
        jobTitle,
      }),
    })
    setApplied(true)
    // }
  }

  function handleUpload(e) {
    setResume(URL.createObjectURL(e.target.files[0]))
    setResumeStatus('Resume Uploaded!')
  }

  return (
    <div className='max-w-4xl mx-auto py-24 px-4 text-gray-900'>
      <h1 className='text-4xl font-extrabold text-blue-500'>{job.title}</h1>
      <div className='text-lg text-gray-500 mt-4'>{job.location}</div>
      <p className='text-lg text-gray-700 mt-6'>{job.description}</p>
      <h2 className='text-xl font-bold mt-6 mb-4'>Skills Needed</h2>
      <ul>
        {job.skills.split(';').map((skill, index) => (
          <li key={index} className='list-disc list-inside text-gray-700'>
            {skill}
          </li>
        ))}
      </ul>
      {applied ? (
        <div className='text-4xl text-blue-500 font-bold mt-12 sm:mt-16 text-center'>Thank you for your application!</div>
      ) : (
        <div>
          <h2 className='text-2xl font-bold mt-12 mb-4'>Apply For Position</h2>
          <form className='w-full py-6 max-w-2xl' onSubmit={handleSubmit}>
            <label
              className='block mb-2 text-xs font-bold uppercase text-gray-900'
              htmlFor='contact-name'
            >
              Name
            </label>

            <input
              className='w-full mb-6 form-input border border-gray-200 rounded p-2'
              id='contact-name'
              type='text'
              name='contact-name'
              required
              placeholder='John Doe'
              type='text'
              onChange={(e) => setName(e.target.value)}
            />

            <label
              className='block mb-2 text-xs font-bold uppercase text-gray-900'
              htmlFor='contact-email'
            >
              Email
            </label>

            <input
              className='w-full mb-6 form-input border border-gray-200 rounded p-2'
              id='contact-email'
              name='contact-email'
              type='email'
              placeholder='johndoe@email.com'
              autoComplete='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label
              className='block mb-2 text-xs font-bold uppercase text-gray-900'
              htmlFor='linkedin'
            >
              Linkedin Profile
            </label>

            <input
              className='w-full mb-6 form-input border border-gray-200 rounded p-2'
              id='linkedin'
              name='linkedin'
              type='text'
              placeholder='https://www.linkedin.com/in/...'
              required
              onChange={(e) => setLinkedin(e.target.value)}
            />

            <label
              className='block mb-2 text-xs font-bold uppercase text-gray-900'
              htmlFor='github'
            >
              Github or Portfolio Website (Optional)
            </label>

            <input
              className='w-full mb-6 form-input border border-gray-200 rounded p-2'
              id='github'
              name='github'
              type='text'
              placeholder='https://www.github.com/...'
              onChange={(e) => setGithub(e.target.value)}
            />

            <label
              className='block mb-2 text-xs font-bold uppercase text-gray-900'
              htmlFor='message'
            >
              Message to Hiring Manager (Optional)
            </label>

            <textarea
              className='w-full mb-6 form-textarea border border-gray-200 rounded p-2'
              id='message'
              placeholder='Say something...'
              rows='4'
              onChange={(e) => setMessage(e.target.value)}
            />

            <label
              className='bg-blue-50 hover:bg-blue-100 text-blue-500 border border-blue-500 text-sm cursor-pointer flex items-center space-x-2 list-inside
          w-48 font-medium px-3 py-2 rounded focus-visible:outline-none'
            >
              <UploadIcon className='h-5 w-5' />
              <span>{resumeStatus}</span>
              <input
                className='hidden'
                type='file'
                accept='.doc,.docx,.pdf'
                multiple={false}
                onChange={handleUpload}
              />
            </label>

            <button
              type='submit'
              className='mt-12 px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none'
            >
              Apply
            </button>
          </form>
        </div>
      )}
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

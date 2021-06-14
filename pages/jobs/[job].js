import { getRecordIds, getJob } from '../../lib/getJobs'

function JobContent({ job }) {
  console.log('job', job)
  return <div>Hello</div>
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

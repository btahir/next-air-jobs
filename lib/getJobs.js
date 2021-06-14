const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
)

export default function getJobRecords() {
  const totalRecords = []

  return new Promise((resolve, reject) => {
    base('Jobs')
      .select({
        filterByFormula: '{Status} = "Open"',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            // const id = record.getId()
            const recordId = record.get('Record')
            const title = record.get('Title')
            const description = record.get('Description')
            const skills = record.get('Skills')
            const category = record.get('Category')
            const location = record.get('Location')

            if (!recordId) return

            totalRecords.push({
              recordId,
              title,
              description,
              skills,
              category,
              location,
            })
          })

          fetchNextPage()
        },
        function done(err) {
          if (err) return reject(err)

          return resolve(totalRecords)
        }
      )
  })
}

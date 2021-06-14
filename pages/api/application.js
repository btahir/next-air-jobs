const Airtable = require('airtable')

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
)

export default function applicationAPI(req, res) {
  const data = JSON.parse(req.body)

  base('Applications').create(
    [
      {
        fields: {
          Name: data.name,
          Email: data.email,
          Job_Id: data.jobId,
          Job_Title: data.jobTitle,
          Linkedin: data.linkedin,
          Github: data.github,
          Message: data.message,
          // Resume: [
          //   {
          //     url: data.resume,
          //   },
          // ],
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err)
        return
      }
      records.forEach(function (record) {
        console.log(record.getId())
      })
    }
  )

  res.status(200).json({ status: 'Success!' })
}

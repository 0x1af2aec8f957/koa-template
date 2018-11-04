// blog schema example

module.exports = {
  name: 'blog',
  schema: {
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
      votes: Number,
      favs: Number,
    },
  },
}
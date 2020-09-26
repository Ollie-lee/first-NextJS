// posts/1/comments
import axios from 'axios'
const Post = ({ data, id }) => (
  <>
    <div>id:{id}</div>
    {data.map(d =>
      <Comment
        {...d}
        key={d.id}
      />)}
  </>
)

const Comment = ({ email, body }) => (
  <div>
    <h5>{email}</h5>
    <div>{body}</div>
  </div>
)

Post.getInitialProps = async ({ query }) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${query.id}`)
  return { ...query, data }
}

export default Post
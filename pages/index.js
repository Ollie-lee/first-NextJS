import Link from 'next/link'
import Navbar from '../components/Navbar'
import axios from 'axios'

export default function Index({ posts, }) {
  // const { posts } = props
  console.log(posts);
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

Index.getInitialProps = async (ctx) => {
  // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  // const json = await res.json()

  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')

  //return an object which can be grabbed from props
  return { posts: data, happy: 'yes' }
}

import { useRouter } from 'next/router';
import Layout from '../../components/Layout.js';

const Post = ({id}) => {
  const router = useRouter();
  console.log('router', router);
  console.log('router.query', router.query);

  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  );
}

Post.getInitialProps = async ({ query }) => {
  return { name: query.name }
}

export default Post

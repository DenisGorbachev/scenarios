import { useRouter } from 'next/router';
import Layout from '../components/Layout.js';

export default function Project() {
  const router = useRouter();

  return (
    <Layout>
      <h1>Project name</h1>
      <p>This is the blog post content.</p>
    </Layout>
  );
}

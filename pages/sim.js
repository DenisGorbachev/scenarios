import dynamic from 'next/dynamic';
import Layout from '../components/Layout.js';

const Chart = dynamic(() => import('../components/Chart'), { ssr: false });

export default function Sim() {
  return (
    <Layout>
      <h1>Simulator</h1>
      <Chart data={{ table: [] }} signalListeners={{}} />
    </Layout>
  );
}

import React from 'react';
import Layout from "../components/Layout";
import { Box, Grid } from '@material-ui/core';
import VideoCard from '../components/VideoCard';
import getVideos from '../database/getVideos';

function Home({data}) {
  return (
    <Layout title="Youtube">
      <Box p={2}>
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
              <VideoCard item={item} />
            </Grid>
          ))}
        </Grid> 
      </Box>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getVideos();

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    }, // will be passed to the page component as props
  };
}

export default Home;
import { useEffect } from 'react';

import { getMainWidth, handleTitle } from '../../utils';

import Breadcrumb from '../../components/Breadcrumb';
import Navbar from '../../layouts/Head/Navbar';
import ImgComingSoon from '../../assets/img/Pando_NFT_Banner_comingsoon.png';

const GamesContainer = () => {
  useEffect(() => {
    // handleTitle('Games');
    handleTitle('DODOGO-NFT | P2P NFT Marketplace');
    getMainWidth();
  }, []);

  return (
    <main className="main-content mt-1 border-radius-lg">
      <Navbar />

      <div className="container-fluid">
        <div className="page-header breadcrumb-header min-height-300 border-radius-xl mt-4 mb-30 ExploreIMG">
          <Breadcrumb text1="Games" text2="" />
        </div>
      </div>

      <div className="container-fluid">
        <div className="col-12">
          <img src={ImgComingSoon} className="img-thumbnail" alt="" />
        </div>
      </div>
    </main>
  );
};

export default GamesContainer;

import ArtworkItem from './ArtworkItem';
import ArtworkRankItem from './ArtworkRankItem';
import React from 'react';
import { IAuction } from '../../types/index';
import axios from 'axios';
import addresses from '../../constants/addresses';
import walletAccountAtom from '../../atoms/walletAccount';
import { useRecoilValue, useRecoilState } from 'recoil';
import auctionCategoryAtom from '../../atoms/auctionCategory';
import { useHistory } from 'react-router-dom';

function SecLiveAuctions() {
  const [auctions, setAuctions] = React.useState<IAuction[]>([]);
  const [rankAuctions, setRankAuctions] = React.useState<IAuction[]>([]);
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(20);
  const [auctionCategory, setAuctionCategory] = useRecoilState(auctionCategoryAtom);
  const history = useHistory();


  const walletAccount = useRecoilValue(walletAccountAtom);

  const getAuctions = async () => {
  
    //json  형태  
    var data = JSON.stringify({
      "orderby" : 0,
      "category" : 2,
      "offset" : offset,
      "limit" : limit,
      'address' : walletAccount

    });

    var config = {
      method: 'post',
      url: addresses.targetIp+'/nft/auctionList',
      headers: { 
      'Accept': 'application/json', 
      'Content-Type': 'application/json'
      },
      data : data
    };

    var jsonData
    axios(config).then(function (response) {

      jsonData = JSON.parse(JSON.stringify(response.data));
      
      if(jsonData.result.code === 200){

        const openAuctions = jsonData.result.auctionList;
        //const openRankAuctions = jsonData.result.rankList;

        setAuctions(openAuctions);
        //setRankAuctions(openRankAuctions);

      }else{
        console.log('조회오류');
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const goAuction = async (category) => {
    
		await setAuctionCategory(Number(category));
    
    setOffset(0);
    setLimit(8);
		history.push("/auction");
		
	};

  React.useEffect(() => {
    getAuctions().catch((e) => {
      console.log(e.message);
    });
  }, []);

  return (
    
    <div className="secCont3">
    <p className="subtit">Artwork Explore<a href="#"  onClick={()=> {goAuction(2);window.scrollTo(0, 0);}} >See all</a></p>
    <div className="cont2Bg">
      <img src={auctions.length>0 ? auctions[0].img:''} alt=""/>
      <div className="blurbox"></div>
      <div className="contInner">
        <div className="top3cont">
          <div className="subTit">
            <p>TOP 3</p>
          </div>
          {auctions.map((item, i) => (
            i < 3 && <ArtworkItem key={i} {...item} />
          ))}
        </div>
      </div>
    </div>
    <div className="contRank">
      <p className="subtit">Artwork Ranking</p>
      <ul>
          {auctions.map((item, i) => (
            <ArtworkRankItem key={i} {...item} />
          ))}
      </ul>
    </div>
    </div>



  );
}

export default SecLiveAuctions;

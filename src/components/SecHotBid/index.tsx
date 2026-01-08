import HotAuctionsItem from './HotAuctionsItem';
import React from 'react';
import { IAuction } from '../../types/index';
import $ from 'jquery';
import axios from 'axios';
import addresses from '../../constants/addresses';
import walletAccountAtom from '../../atoms/walletAccount';
import { useRecoilValue } from 'recoil';

function SecLiveAuctions() {
  const [auctions, setAuctions] = React.useState<IAuction[]>([]);
  const [offset, setOffset] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(6);
  const walletAccount = useRecoilValue(walletAccountAtom);

    const getAuctions = async (leadMore) => {

      var jsonLimit = limit;
    
      if(leadMore === ''){
        setOffset(0);
        setLimit(6);
        jsonLimit = 6;
      }else{
        jsonLimit = jsonLimit+160;
        setLimit(limit+6);
        
      }
      
        //json  형태  
      var data = JSON.stringify({
        "orderby" : 1,//HotBid
        "offset" : offset,
        "limit" : jsonLimit,
        "address" : walletAccount

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

          if(jsonData.result.nextPage !== 'Y'){
            $(".btnAreaHot").hide();
          }else{
            $(".btnAreaHot").show();
          }

          const openAuctions = jsonData.result.auctionList;

          setAuctions(openAuctions);


        }else{
          alert('조회실패!');
        }

      })
      .catch(function (error) {
        console.log(error);
      });
    };

  React.useEffect(() => {
    getAuctions('').catch((e) => {
      console.log(e.message);
    });
  }, [walletAccount]);

  return (

    <div className="secCont5">
        <div className="contInner">
          <p className="subtit">Hot Bids</p>
          <div className="contlis">
            <ul>
              {auctions.map((item, i) => (
                <HotAuctionsItem key={i} {...item} />
              ))}
            </ul>
          </div>
          <div className="btnArea">
            {auctions &&  (
              <a href="#none" onClick={() => getAuctions('Y')} className="btnAreaHot" ><p>LOAD MORE</p></a>
            )}
          </div>
        </div>
      </div>
  );
}

export default SecLiveAuctions;

import * as React from 'react';
import { useHistory} from 'react-router-dom';
import { IAuction } from '../../types';
import { useRecoilValue } from 'recoil';
import BigNumber from 'bignumber.js';
import likeOn from '../../assets/img/likeOn.png';
import likeOff from '../../assets/img/likeOff.png';
import myPointAtom from '../../atoms/myPoint';
import addresses from '../../constants/addresses';
import axios from 'axios'; // 액시오스
import walletAccountAtom from '../../atoms/walletAccount';
import $ from 'jquery';

interface IMyAuctionItemProps extends IAuction {}


const MyFavoriteItem: React.FunctionComponent<IMyAuctionItemProps> = (props) => {

  const history = useHistory();
  const walletAccount = useRecoilValue(walletAccountAtom);
  const clickFavorite = async (auctionId) => {

    try {
        
      
          var data = JSON.stringify({
            "auctionId": auctionId,
            "address" : walletAccount
          });
        
  
          var config = {
            method: 'post', 
            url: addresses.targetIp+'/nft/chgFavorite',
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
              console.log(jsonData.result.favoriteYn)
              if(jsonData.result.favoriteYn === 'Y'){
                //$(".heart").addClass('on');
                $('.'+auctionId).attr('src',likeOn);
              }else if(jsonData.result.favoriteYn === 'N'){
                //$(".heart").addClass('off');
                $('.'+auctionId).attr('src',likeOff);
                $('.'+auctionId).attr('style','display:none');
              }
            }else{
              alert('조회실패!');
            }
      
      
          })
          .catch(function (error) {
            console.log(error);
          });
          
  
      } catch (e) {
        console.log(e);
      }
      
  }

  return (

    <li className={props.auctionId}>
      <div className="nftCont">
        <div className="ContFrame">
        <span className="frame" style={{ cursor: 'pointer' }} onClick={() => {history.push(`/itemdetails/${props.auctionId}/Y`);window.scrollTo(0, 0);}}>
          <img src={props.img} alt=""/>
        </span>
        <div className="textArea">
          <p className="nftName">{props.auctionTitle}
          <span className="likeArea on" onClick={() => clickFavorite(props.auctionId)}>
            <em className="frame" ><img className={props.auctionId} style={{ cursor: 'pointer' }} src={likeOn} alt=""/></em>
            {/* <em className="num">+52</em> */}
          </span>
          </p>
          <p><span>Buy now</span><span>Current Price</span></p>
          <p><span><em>{props.buyNowPrice}</em>DDP</span><span><em>{props.currentPrice}</em>DDP</span></p>
        </div>
        </div>
      </div>
    </li>
  );
};

export default MyFavoriteItem;

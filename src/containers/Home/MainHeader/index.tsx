import leftArrow from '../../../assets/img/direction_left_arrow_icon.png';
import rightArrow from '../../../assets/img/direction_right_arrow_icon.png';
import TVsicon from '../../../assets/img/TVsicon.png';


import $ from 'jquery';
import 'jquery.touchslider';
import 'swiper';
import React from 'react';
import { IAuction } from '../../../types/index';
import SwipeHotAuctionItem from './SwipeHotAuctionItem';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import addresses from '../../../constants/addresses';


const MainHeader = () => {
  const [auctions, setAuctions] = React.useState<IAuction[]>([]);
  const history = useHistory();

  
  const getAuctions = async () => {

      //json  형태  
      var data = JSON.stringify({
        "orderby" : '1',//HotBid
        "offset" : 0,
        "limit" : 3
  
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
  
        const openAuctions = jsonData.result.auctionList;

        if(jsonData.result.code === 200){
  
          setAuctions(openAuctions);

          $('#touchSlider0').touchSlider({
            speed: 300,
            gap: 50,
            useMouse: false
          });
      
          var mainimgSrc = $(".sliderCont>.swiper>ul>li:first-child>.nftCont>.ContFrame>.frame>img").attr("src");
          $(".mainPage>.slidermainBG>.frame>img").attr("src",mainimgSrc);

          var $prevBtn = $(".sliderCont>.ts-controls>.ts-prev");
          var $nextBtn = $(".sliderCont>.ts-controls>.ts-next");
    
          
          $prevBtn.text('');
          $nextBtn.text('');
          
    
          $prevBtn.append("<img src='"+leftArrow+"' alt=''/>");
          $nextBtn.append("<img src='"+rightArrow+"' alt=''/>");
    
          $nextBtn.on("click",function(){
            $(".sliderCont>.swiper>ul>li").each(function(index, item){
              var $chkSlide = $(item).attr("aria-hidden");
              if ($chkSlide === 'false') {
                var nowImg = $(item).children().find("img").attr("src");
                var auctionTitle = $(item).children().find(".auctionTitle").val();
                var description = $(item).children().find(".description").val();
                var buyNowPrice = $(item).children().find(".buyNowPrice").val();
                var currentPrice = $(item).children().find(".currentPrice").val();

                $(".slidermainBG>.frame>img").attr("src",nowImg);
                $("#sliderBuyNowPrice").text(buyNowPrice);
                $("#sliderCurrentPrice").text(currentPrice);
                $("#sliderDescription").text(description);
                $("#sliderAuctionTitle").text(auctionTitle);
                
                


              }
            });
          });
    
          $prevBtn.on("click",function(){
            $(".sliderCont>.swiper>ul>li").each(function(index, item){
              var $chkSlide = $(item).attr("aria-hidden");
              if ($chkSlide === 'false') {
                var nowImg = $(item).children().find("img").attr("src");
                var auctionTitle = $(item).children().find(".auctionTitle").val();
                var description = $(item).children().find(".description").val();
                var buyNowPrice = $(item).children().find(".buyNowPrice").val();
                var currentPrice = $(item).children().find(".currentPrice").val();

                $(".slidermainBG>.frame>img").attr("src",nowImg);
                $("#sliderBuyNowPrice").text(buyNowPrice);
                $("#sliderCurrentPrice").text(currentPrice);
                $("#sliderDescription").text(description);
                $("#sliderAuctionTitle").text(auctionTitle);

              }
            });
          });

  
        }else{
          alert('조회실패!');
        }
  
      })
      .catch(function (error) {
        console.log(error);
      });
    
  };

  


  const goDetailItem  = () =>{
    $(".swiper>ul>li").each(function(index, item){
      var $chkSlide = $(item).attr("aria-hidden");
      if ($chkSlide == 'false') {
        history.push('/itemdetails/'+$(item).attr("id")+'/Y');
      }
    });
    
  }

  React.useEffect(() => {

    getAuctions().then(
      $("#sliderDescription").text(auctions && auctions.length > 0 ? auctions[0].description : '')
    ).catch((e) => {
      console.log(e.message);
    });
    
  }, []);

  return (
    <>
      <div className="slidermainBG">
        <span className="frame"><img src='' alt=""/></span>
        <span className="frameBG"></span>
      </div>
  
      <div className="sliderCont">
        <div id="touchSlider0" className="swiper">
          <ul>
            {auctions.map((item, i) => (
              <SwipeHotAuctionItem key={i} {...item} />
            ))}
            
          </ul>
        </div>
        <div className="infoBox">
          <div className="blurbox"></div>
          <div className="txtbox">
            <p className="tit" id='sliderAuctionTitle'>{auctions && auctions.length > 0 && auctions[0].auctionTitle}</p>
            <div className="infoPrice">
              <div className="contBox">
                <p>Buy Now</p>
                <p><span className="frame"><img src={TVsicon} alt=""/></span><em id='sliderBuyNowPrice'>{auctions && auctions.length > 0 && auctions[0].buyNowPrice}</em><span>DDP</span></p>
              </div>
              <div className="contBox">
                <p>Current Price</p>
                <p><span className="frame"><img src={TVsicon} alt=""/></span><em id='sliderCurrentPrice'>{auctions && auctions.length > 0 && auctions[0].currentPrice}</em><span>DDP</span></p>
              </div>
            </div>
            <div className="textbox">
              <textarea name="sliderDescription" id="sliderDescription" maxLength={100} readOnly></textarea>
            </div>
            <div className="btns">
              <a href="#none" onClick={()=>goDetailItem()}>Buy Now</a>
              <a href="#none" onClick={()=>goDetailItem()}>Place a Bid</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;

import { useEffect } from 'react';
import { getMainWidth, getTokenInfo, handleTitle } from '../../utils';
import { useWeb3React } from '@web3-react/core';
import SectionCardDown from './SectionCardDown';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import React , {useRef} from 'react';
import { IAuction, IItem } from '../../types';
import contracts from '../../constants/contracts';
import { useInterval } from 'usehooks-ts';
import isAuctionFinishAtom from '../../atoms/isAuctionFinish';
import BigNumber from 'bignumber.js';
import btn_close from '../../assets/img/btn_close.png';
import auction_icon from '../../assets/img/auction_icon.png';
import likeOn from '../../assets/img/likeOn.png';
import sample1 from '../../assets/img/sample1.png';
import clse from '../../assets/img/clse.png';
import DateTimePicker from 'react-datetime-picker';

import TVsOn from '../../assets/img/TVsOn.png';
import addresses from '../../constants/addresses';
import isApprovedAtom from '../../atoms/isApproved';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import 'jquery-datetimepicker';
import './ItemDetails.css';
import { injectedConnector } from '../../connector';
import axios from 'axios';
import myPointAtom from '../../atoms/myPoint';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { create } from 'ipfs-http-client';
import walletAccountAtom from '../../atoms/walletAccount';
import { bottom } from '@popperjs/core';
import copyImg from '../../assets/img/copy.png';

const projectId = "2CbYnEYWoOds2HuAb5zLYVleq1h"
const projectSecret = "4f6d5265255b875fd9f70f1a4b5c6635"
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
		authorization: auth,
	}
});

const ItemDetailsContainer = () => {
  const { id }: { id?: string } = useParams();
  const { regFlag }: { regFlag?: string } = useParams();
  const history = useHistory();

  //const {id, category} = useParams();

  
  const [auction, setAuction] = React.useState<IAuction>();
  const [bidPrice, setBidPrice] = React.useState<number>(0);
  const [myTokenInfo, SetMyTokenInfo] = React.useState<IItem>();
  
  // const { account } = useWeb3React();
  const [isAuctionFinish, setIsAuctionFinish] = useRecoilState(isAuctionFinishAtom);
  const [expiryDate, setExpiryDate] = React.useState<string>('');
  const inputRef = useRef(null);
  const [countDownDate, setCountDownDate] = React.useState<string>('');
  const [countDownStart, setCountDownStart] = React.useState<boolean>(false);

  const { chainId, account, activate, deactivate, active } = useWeb3React();

  //const myTvsPoint = useRecoilValue(myPointAtom);
  const [myTvsPoint, setMyTvsPoint] = useRecoilState(myPointAtom);

  const walletAccount = useRecoilValue(walletAccountAtom);
	
  const getAuction = async () => {
	

		var data = JSON.stringify({
        	"auctionId": id
        });
      

        var config = {
			method: 'post',
			url: addresses.targetIp+'/nft/auctionDetail',
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

				jsonData.auctionDetail[0].biddingList = jsonData.result.biddingList;

				setAuction(jsonData.auctionDetail[0]);

				//const tokenInfo = await getTokenInfo(result.tokenId);
	  
				const curDate = new Date().getTime();
				let realExpireDate = jsonData.auctionDetail[0].expiryDate - curDate/1000;
				let realDays = "";
				let realHours = "";
				let realMin = "";
				let realSec = "";

				setCountDownDate(jsonData.auctionDetail[0].expiryDate);

				if(realExpireDate > 0){
					if(Math.floor(realExpireDate/86400) > 0){
						realDays = String(Math.floor(realExpireDate/86400)).padStart(2, '0');
						realExpireDate = realExpireDate - (Number(realDays)*86400);
					}else{
						realDays = "00";
					}

					if(Math.floor(realExpireDate/3600) > 0){
						realHours = String(Math.floor(realExpireDate/3600)).padStart(2, '0');
						realExpireDate = realExpireDate - (Number(realHours)*3600);
					}else{
						realHours = "00";
					}

					if(Math.floor(realExpireDate/60) > 0){
						realMin = String(Math.floor(realExpireDate/60)).padStart(2, '0');
						realExpireDate = realExpireDate - (Number(realMin)*60);
					}else{
						realMin = "00";
					}

					if(Math.floor(realExpireDate) > 0){
						realSec = String(Math.floor(realExpireDate)).padStart(2, '0');
					}else{
						realSec = "00";
					}

					
					setExpiryDate(realDays+realHours+realMin+realSec);
				}else{
					setExpiryDate("00000000");
				}

				setCountDownStart(true);
			
			}else{
				alert('조회실패!');
			}

		})
		.catch(function (error) {
			console.log(error);
		});

      
  };


  const auctionEndCountDwon = () => {

	const curDate = new Date().getTime();
	let realExpireDate = Number(countDownDate) - curDate/1000;
	let realDays = "";
	let realHours = "";
	let realMin = "";
	let realSec = "";


	if(realExpireDate > 0){
		if(Math.floor(realExpireDate/86400) > 0){
			realDays = String(Math.floor(realExpireDate/86400)).padStart(2, '0');
			realExpireDate = realExpireDate - (Number(realDays)*86400);
		}else{
			realDays = "00";
		}

		if(Math.floor(realExpireDate/3600) > 0){
			realHours = String(Math.floor(realExpireDate/3600)).padStart(2, '0');
			realExpireDate = realExpireDate - (Number(realHours)*3600);
		}else{
			realHours = "00";
		}

		if(Math.floor(realExpireDate/60) > 0){
			realMin = String(Math.floor(realExpireDate/60)).padStart(2, '0');
			realExpireDate = realExpireDate - (Number(realMin)*60);
		}else{
			realMin = "00";
		}

		if(Math.floor(realExpireDate) > 0){
			realSec = String(Math.floor(realExpireDate)).padStart(2, '0');
		}else{
			realSec = "00";
		}
		
		setExpiryDate(realDays+realHours+realMin+realSec);

	}
  }


  useInterval(
    () => {
      getAuction();
      setIsAuctionFinish(false);
    },
    isAuctionFinish ? 1000 : null
  );

    
  useInterval(
	() => {
		if(countDownStart){
			auctionEndCountDwon();		
		}
	},
	isAuctionFinish ? null : 1000
  );


  //입찰버튼
  const onPlaceBid = async () => {

	const currentPrice = Number(auction.currentPrice);
	const startPrice = Number(auction.startPrice);
	const highestBidder = auction.highestBidder;
	const buyNowAmount = Number(auction.buyNowPrice);
	
	if(startPrice > bidPrice){
		alert('It should be higher than the start price');
		return;
	}

	if (currentPrice >= bidPrice && highestBidder !== null) {
		alert('It should be higher than the current bid amount');
		return;
	}

	if(bidPrice > Number(myTvsPoint)){
		alert('Not enough points.');
		return;
	}

	if(bidPrice >= buyNowAmount){
		alert('You cannot bid higher than the direct purchase price.');
		return;
	}

	
	var data = JSON.stringify({
		"auctionId": auction.auctionId,
		"address":account,
		"biddingPrice": bidPrice
	});

	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/bid',
		headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json'
		},
		data : data
	};

	axios(config).then(function (response) {

		let jsonData = JSON.parse(JSON.stringify(response.data));
			
		if(jsonData.result.code === 200){
			clsePop();
			window.location.reload();
			setMyTvsPoint(jsonData.result.userInfo.tvp_amount); //jsonData.result.userInfo.tvp_amount
			
		}

	})
	.catch(function (error) {
		console.log(error);
	});
		

}

  function buynowPop(){
	if(account){
    	$(".buynowPop").show();
	}else {
      activate(injectedConnector,(error)=>{
        if(error.toString().indexOf('No Ethereum provider was found on window.ethereum') > 0 ){
          window.open('https://metamask.io/download.html');
        }
      });

      window.localStorage.setItem('wallet', 'metamask');
    }
  }

  function placebidPop(){		
		if(account)
    	$(".placeabidPop").show();
		else {
      activate(injectedConnector,(error)=>{
        if(error.toString().indexOf('No Ethereum provider was found on window.ethereum') > 0 ){
          window.open('https://metamask.io/download.html');
        }
      });

      window.localStorage.setItem('wallet', 'metamask');
    }
  }

  function settlePop(){
	//if(auction?.highestBidder !=='' && expiryDate !== '00000000'){
	if(auction?.highestBidder !=='' && auction?.highestBidder !== '0x0000000000000000000000000000000000000000'){
		$("#settlePop").show();
		$("#settleNotPop").hide();
	}else if(auction?.highestBidder ==='' || auction?.highestBidder === '0x0000000000000000000000000000000000000000'){
		$("#settleNotPop").show();
		$("#settlePop").hide();
	}
  }
  
  function clsePop(){
	$(".clsePop").hide();
  }

  

  
  const biddingChk = () => {

	inputRef.current.value = inputRef.current.value.replace(/[^0-9^.]/g, "");
	//inputRef.current.value = inputRef.current.value.replace(/(^0+)/, "");

	let bidnumlen = inputRef.current.value;
	let maxbid = Number(auction?.currentPrice);
	let highestBidder = auction?.highestBidder;

	setBidPrice(Number(bidnumlen));

	if (bidnumlen > maxbid) {
		$(".placeabidPop>.contArea>.txtbox>span.err").hide();
		$(".placeabidPop>.contArea>.btnArea>a").addClass("on");
	}else if (bidnumlen >= maxbid && highestBidder === null) {
		$(".placeabidPop>.contArea>.txtbox>span.err").hide();
		$(".placeabidPop>.contArea>.btnArea>a").addClass("on");
	} else if (bidnumlen !== '' && bidnumlen <= maxbid && highestBidder !== '') {
		$(".placeabidPop>.contArea>.txtbox>span.err").show();
		$(".placeabidPop>.contArea>.btnArea>a").removeClass("on");
	} else {
		$(".placeabidPop>.contArea>.txtbox>span.err").hide();
		$(".placeabidPop>.contArea>.btnArea>a").removeClass("on");
	}
  };

  


  /** 등록전 데이터 조회 시작 */

  const getTotalSupply = async () => {

	 var data = JSON.stringify({
		"nftId": id
	});
  
	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/nftDetail',
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
			SetMyTokenInfo(jsonData.nftDetail[0]);
		}else{
			alert('조회실패!');
		}

	})
	.catch(function (error) {
		console.log(error);
	});

  };
 
  /** 등록전 데이터 조회 종료 */

  

 /** 경매등록 시작 */

  const [isApproved, setIsApproved] = useRecoilState(isApprovedAtom);
  const [isCreateOpen, setIsCreateOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [startingPrice, setStartingPrice] = React.useState<number>();
  const [buyNowPrice, setBuyNowPrice] = React.useState<number>();
  const [selectDate, onChangeDate] = React.useState(new Date());

 const onClickCreateAuction = async () => {

    if (!isCreateOpen) {
      setIsCreateOpen(true);
    }

	if (!buyNowPrice) {
		$('.createauctionPop>.contArea>.step2>span').text('Buy now price is required!');
		$('.createauctionPop>.contArea>.step2>span').show();
	}else if (startingPrice >= buyNowPrice) {
		$('.createauctionPop>.contArea>.step2>span').text('Please enter an amount higher than the starting price');
		$('.createauctionPop>.contArea>.step2>span').show();
	}else{
		$('.createauctionPop>.contArea>.step2>span').hide();
	} 
	
	if(!startingPrice){
		$('.createauctionPop>.contArea>.step1>span').text('Starting price is required!');
		$('.createauctionPop>.contArea>.step1>span').show();
	}else if (startingPrice < 1) {
		$('.createauctionPop>.contArea>.step1>span').text('Please enter an amount higher than 1');
		$('.createauctionPop>.contArea>.step1>span').show();
	}else{
		$('.createauctionPop>.contArea>.step1>span').hide();
	}


	!selectDate || $(".step3").hasClass('err') ? $('.createauctionPop>.contArea>.step3>span').show() : $('.createauctionPop>.contArea>.step3>span').hide();


    if (!startingPrice || !buyNowPrice || (startingPrice >= buyNowPrice) || (startingPrice < 1) || !selectDate) {
      return;
    }

	if(!$("#createAuctionId").hasClass("on")){
		return;
	}

	
	var data = JSON.stringify({
		"nftId": id,
		"seller":account,
		"buyNowPrice": Number(buyNowPrice),
		"startPrice": Number(startingPrice),
		"expireDate": new Date(selectDate).getTime()/1000

	});

	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/sell',
		headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json'
		},
		data : data
	};

	var jsonData
      axios(config).then(function (response) {

		$("#createAuctionId").text("Registering for auction...");
		$("#createAuctionId").removeClass("on");


		jsonData = JSON.parse(JSON.stringify(response.data));
		
		console.log(jsonData.result.code)
		
		if(jsonData.result.code === 200){

			
			$(".auctionsuccessPop").show();
		}else{
			$("#createAuctionId").text("CREATE AUCTION");
			$("#createAuctionId").addClass("on");
			clsePop();
		}

      })
      .catch(function (error) {
        $("#createAuctionId").text("CREATE AUCTION");
		$("#createAuctionId").addClass("on");
		clsePop();
      });

  };


  const numberChk = (e) =>{
	$('#'+e.target.id).val(document.getElementById(e.target.id).value.replace(/[^0-9]/g,''));
  }

  const chkCreateAuc1 = () =>{
	if(Number($("#startPrice").val().trim()) < 0){
		setStartingPrice(0);
		$("#startPrice").val(0);
	}else{
		setStartingPrice(Number($("#startPrice").val().trim()));
	}

	if($("#startPrice").val().trim() === '' && !$(".step1").hasClass('err')){
		$(".step1").addClass('err');
		$('.step1>span').show();
	}else{
		$(".step1").removeClass('err');
		$('.step1>span').hide();
	}
	
	 let startPriceVal = Number($("#startPrice").val());
	 let buyNowPriceVal = Number($("#buyNowPrice").val());
	 
	if (startPriceVal === '' || buyNowPriceVal ==='' || (startPriceVal >= buyNowPriceVal) || (startPriceVal < 1) || !selectDate || $(".step3").hasClass('err')) {
		$(".createauctionPop>.btnArea>a").removeClass('on');
	}else{
		$(".createauctionPop>.btnArea>a").addClass('on');
	}

  }


  const chkCreateAuc2 = () =>{

	if(Number($("#buyNowPrice").val().trim()) < 0){
		setBuyNowPrice(0);
		$("#buyNowPrice").val(0);
	}else{
		setBuyNowPrice(Number($("#buyNowPrice").val().trim()));
	}

	if($("#buyNowPrice").val().trim() === '' && !$(".step2").hasClass('err')){
		$(".step2").addClass('err');
		$('.step2>span').show();
	}else{
		$(".step2").removeClass('err');
		$('.step2>span').hide();
	}
	
	 let startPriceVal = Number($("#startPrice").val().trim());
	 let buyNowPriceVal = Number($("#buyNowPrice").val().trim());
	 

	if (startPriceVal > 0 || buyNowPriceVal > 0 || (startPriceVal >= buyNowPriceVal) || (startPriceVal < 1) || !selectDate || $(".step3").hasClass('err')) {
		$(".createauctionPop>.btnArea>a").removeClass('on');
	}else{
		$(".createauctionPop>.btnArea>a").addClass('on');
	}
  }

 /** 경매등록 종료 */



 
 /** 경매취소 시작 */
 const onClickCancelAuction = async () => {
	try{

		if (window.confirm("Do you want to Unlisted?")) {

			var data = JSON.stringify({
				"auctionId": id
			});
		
			var config = {
				method: 'post',
				url: addresses.targetIp+'/nft/cancel',
				headers: { 
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
				},
				data : data
			};
		
			var jsonData;
			axios(config).then(function (response) {
		
				jsonData = JSON.parse(JSON.stringify(response.data));
				
				console.log(jsonData);

				if(jsonData.code === 200){
					setIsAuctionFinish(true);
					$(".endauction").remove();
					$(".buynow").hide();
					$(".bidnow").hide();
				}else{
					alert(jsonData.message);
				}
		
			})
			.catch(function (error) {
				console.log(error)
			});
		
		}
	}catch(e){
		console.log(e);
	}
  };
/** 경매취소 종료 */

/**  작품삭제 시작 */
const onClickDeleteNft = async () => {
	try{

		if (window.confirm("Do you want to delete?")) {

			var data = JSON.stringify({
				"nftId": id
			});
		
			var config = {
				method: 'post',
				url: addresses.targetIp+'/nft/delete',
				headers: { 
				'Accept': 'application/json', 
				'Content-Type': 'application/json'
				},
				data : data
			};
		
			var jsonData;
			axios(config).then(function (response) {
		
				jsonData = JSON.parse(JSON.stringify(response.data));

				if(jsonData.code === 200){
					alert(jsonData.message);
					$(".buynow").hide();
				}else{
					alert(jsonData.message);
				}
		
			})
			.catch(function (error) {
				console.log(error)
			});
		
		}
	}catch(e){
		console.log(e);
	}
  };
/**  작품삭제 종료 */

/** 경매낙찰 시작 */
const onClickSettleAuction = async () => {
	try{


		/*
		const cancelAuction = await contracts.nftMarketContract.methods
		.settleAuction(id)
		.send({ from: account });
		*/

		var data = JSON.stringify({
			"auctionId": id,
			'owner' :auction?.seller,
			'currentPrice' : auction?.currentPrice
		});
	
		var config = {
			method: 'post',
			url: addresses.targetIp+'/nft/settle',
			headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json'
			},
			data : data
		};
	
		var jsonData
		  axios(config).then(function (response) {
	
			jsonData = JSON.parse(JSON.stringify(response.data));

			if(response.data.code === 200){
				setIsAuctionFinish(true);
				clsePop();
				$(".btnArea2").hide();
				$(".endauction").hide();
				// mint();
			}else{
				alert(jsonData.message);
			}
	
		  })
		  .catch(function (error) {
			  console.log(error)
		  });

	}catch(e){
		console.log(e);
	}
};
/** 경매낙찰 종료 */


const mint = async () =>{
	
	
	try{
		// const ipfs = create({
		// 	host: 'ipfs.infura.io',
		// 	port: 5001,
		// 	protocol: 'https',
		//   });

		const fileAdded = await ipfs.add(auction?.img);

		const metadata = {
			title: 'Asset Metadata',
			type: 'object',
			properties: {
			  name: {
				type: 'string',
				description: auction?.auctionTitle,
			  },
			  description: {
				type: 'string',
				description: auction?.description,
			  },
			  image: {
				type: 'string',
				description: fileAdded.path,
			  },
			  category: {
				type: 'number',
				description: auction?.category,
			  },
			},
		  };

		  const metadataAdded = await ipfs.add(JSON.stringify(metadata));
		  if (!metadataAdded) {
			console.error('Something went wrong when updloading the file');
			return;
		  }


		await contracts.nft_testnet.methods
		.mintNFTFor(metadataAdded.path,auction?.highestBidder) //내주소 강제 세팅
		.send({ from: '0xe0b6b5268ad6b1be8b4c6028189c1b98d7694d2d' });

	  }catch(e){
		console.log(e);
	  }


}



/** 바로구매 시작 */
const onBuyNow = async () => {
    const buyNowPrice = Number(auction.buyNowPrice);


	if(!$("#buyNowId").hasClass("on")){
		return;
	}

	if(buyNowPrice > Number(myTvsPoint)){
		alert('Not enough points.');
		return;
	}

	var data = JSON.stringify({
		"auctionId": auction.auctionId,
		"address":account,
		"biddingPrice": buyNowPrice,
		'owner' :auction?.seller
	});

	var config = {
		method: 'post',
		url: addresses.targetIp+'/nft/buynow',
		headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json'
		},
		data : data
	};

	var jsonData
	axios(config).then(function (response) {

		if(response.data.code === 200){
			alert('구매요청이 전송되었으니 구매확정을 기다려 주세요.');
			clsePop();
			setIsAuctionFinish(true);
			$(".btnArea2").hide();
			$(".endauction").hide();
		}else{
			$("#buyNowId").text("CONFIRM");
			$("#buyNowId").addClass("on");
			clsePop();
		}

	})
	.catch(function (error) {
		$("#buyNowId").text("CONFIRM");
		$("#buyNowId").addClass("on");
		clsePop();
	});
  };
  /** 바로구매 종료 */

  
  const readMore = (readMoreId) =>{

	if($("#"+readMoreId).text() === 'Read More'){
		$("#"+readMoreId).prev().attr("style","-webkit-box-orient:inherit");
		$("#"+readMoreId).text('Show Less');
	}else{
		$("#"+readMoreId).prev().attr("style","-webkit-box-orient:vertical");
		$("#"+readMoreId).text('Read More');
	}

  }

  const listView = () =>{
	if($("#listViewStatus").val() === 'off'){
		$("#listViewStatus").val('on');
		$(".nftDetailsPage>.contents>.nftinfoArea>.bidslistArea>.contlist").show();
	}else{
		$("#listViewStatus").val('off');
		$(".nftDetailsPage>.contents>.nftinfoArea>.bidslistArea>.contlist").hide();
	}

  }

  
	useEffect(() => {

		handleTitle('DODOGO-NFT');
		getMainWidth();
		// const now = new Date();
	   
		// try{

		// 	console.log('datetimepicker',$('#datetimepicker'))
		// 	$('#datetimepicker').datetimepicker({
		// 		format : 'm/d/Y H:i',
		// 		minDate: new Date()
		// 	}).on('change',function(){
		// 		var selectDate = $('#datetimepicker').val();
		// 		var selectDateTime = new Date(selectDate).getTime();

		// 		if(selectDateTime < now.getTime()){
		// 			$('.step3').addClass('err');
		// 			$('.step3>span').text('You must select a value greater than the current time');
		// 			$('.step3>span').show();
		// 			if($(".step1").hasClass('err') || $(".step2").hasClass('err') || $(".step3").hasClass('err')){
		// 				$(".btnArea>a").removeClass('on');
		// 			}else{
		// 				$(".btnArea>a").addClass('on');
		// 			}
		// 		}else{
		// 			$('.step3').removeClass('err');
		// 			$('.step3>span').hide();
		// 			if($(".step1").hasClass('err') || $(".step2").hasClass('err') || $(".step3").hasClass('err')){
		// 				$(".btnArea>a").removeClass('on');
		// 			}else{
		// 				$(".btnArea>a").addClass('on');
		// 			}
		// 			}
				

		// 		setExpiryDate(selectDate);
		// 	})
		
		// }catch(e){
		// 	console.log(e)
		// }

		if(regFlag === "Y"){
			getAuction();
			

			
		}else if(regFlag === "N"){
			getTotalSupply();
			$(".nftDetailsPage").hide();
			$(".nftaddprevPage").show();
		}
    
  	}, []);

	useEffect(() => {
		if(isAuctionFinish){
			setExpiryDate('00000000');
		}
  	}, [isAuctionFinish]);

	useEffect(() => {
		var selectDateTime = new Date(selectDate).getTime();
		const now = new Date();
		if(regFlag === 'N'){
			if(selectDateTime < now.getTime()){
				$('.step3').addClass('err');
				$('.step3>span').text('You must select a value greater than the current time');
				$('.step3>span').show();
				if($(".step1").hasClass('err') || $(".step2").hasClass('err') || $(".step3").hasClass('err')){
					$(".btnArea>a").removeClass('on');
				}else{
					$(".btnArea>a").addClass('on');
				}
			}else{
				$('.step3').removeClass('err');
				$('.step3>span').hide();
				if($(".step1").hasClass('err') || $(".step2").hasClass('err') || $(".step3").hasClass('err')){
					$(".btnArea>a").removeClass('on');
				}else{
					$(".btnArea>a").addClass('on');
				}
			}
		}
		
  	}, [selectDate]);
	


	

  return (

	<>
		{/** 메인화면 */}
		<div className="nftDetailsPage" > 
			<div className="contents">
				<div className="nftimgArea">
				<div className="imgArea">
					<div className="topCont">
					<span className="frame"><img src={TVsOn} alt=""/></span>
					<div className="likeArea">
						<span className="frame likeOn"><img style={{display:'none'}} src={likeOn} alt=""/></span>
					</div>
					</div>
					<span className="frame"><img src={auction?.img} alt=""/></span>
				</div>
				</div>
				<div className="nftinfoArea">
					<div className="txtbox">
						<p className="artiNum">#{auction?.auctionId}</p>
						<p className="tit">{auction?.auctionTitle}</p>
					</div>
					<div className="priceInfo">
						<div className="contbox">
						<p>Current Price</p>
						<p><span className="frame"><img src={TVsOn} alt=""/></span><span><em>{auction?.currentPrice}</em>DDP</span></p>
						</div>
						<div className="contbox">
						<p>Buy Now</p>
						<p><span className="frame"><img src={TVsOn} alt=""/></span><span><em>{auction?.buyNowPrice}</em>DDP</span></p>
						</div>
					</div>

					<div className="descripArea" >
						<p className="omit">{auction?.description}</p>
						<a href="#none" id="readmore" className="off" onClick={()=>readMore('readmore')}>Read More</a>
					</div>
					
					<div className="ownerInfo">
						<p className="tit">Owner</p>
						<div className="contbox">
						<span className="frame"><img src={auction?.profilePath !== null ? auction?.profilePath : sample1} alt=""/></span>
						<p className="userName">{/** 판매자 닉네임 */}</p>
						<ul>
							<li>by</li>
							<li>
								<p className="accAddr" style={{ cursor: 'pointer' }} onClick={()=>{window.open('https://etherscan.io/address/'+auction?.seller)}}>
									{auction && auction?.seller.substr(0, 7)}...
									{auction && auction?.seller.substr(auction?.seller.length - 7)}
								</p>
								<input id="clip_target" className="blind" type="text" value=""/>
							</li>
							<li style={{display:'none'}}><a href="#" className="copyBtn"><img src={copyImg} alt=""/></a></li>
						</ul>
						</div>
					</div>
					

					<div className="bidslistArea">
						<p>Latest Bids<a href="#none" className="listView" onClick={()=>listView()}>View</a></p>
						<div className="contlist">
							<input type='hidden' id='listViewStatus' ></input>
							{auction && <SectionCardDown {...auction} />}
						</div>
						
					</div>

					<div className="linkArea">
						<p>Link</p>
						<p><a href={auction?.nftLink} target='_blank'>{auction?.nftLink}</a></p>
					</div>

					<div className="endauction">
						<p>Auction Ends In</p>
						<ul className="clearfix">
							<li>
								<p>Days</p>
								<p>{expiryDate.length>8? expiryDate.substring(0,3) : expiryDate.substring(0,2)}</p>
							</li>
							<li className="clearfix">
								<p>Hours</p>
								<p>{expiryDate.length>8? expiryDate.substring(3,5):expiryDate.substring(2,4)}</p>
							</li>
							<li className="clearfix">
								<p>Minutes</p>
								<p>{expiryDate.length>8?expiryDate.substring(5,7):expiryDate.substring(4,6)}</p>
							</li>
							<li className="clearfix">
								<p>Seconds</p>
								<p>{expiryDate.length>8?expiryDate.substring(7,9):expiryDate.substring(6,8)}</p>
							</li>
						</ul>
					</div>

				
					{auction && auction?.seller !== account && regFlag === 'Y' && (
						<div className="btnArea2">
							<a href="#none" className="buynow" onClick={buynowPop}>BUY NOW</a> <a href="#none" className="bidnow" onClick={placebidPop}>PLACE A BID</a>
						</div>
					)}
					{account && auction && auction?.seller === account && regFlag === 'Y' && (auction.status === '1' || auction.status === '2' || auction.status === '3') &&(
						<div className="btnArea2">
							<a href="#none" onClick={settlePop}>SETTLE</a><a href="#none" onClick={onClickCancelAuction}>Unlisted</a>
						</div>
					)}
				</div>
			</div>
		</div>
		{/** 메인화면 */}
		{/** 경매등록 화면 */}
		<div className="nftaddprevPage" style={{display:'none'}}> 
			<div className="contents">
				<div className="nftimgArea">
					<div className="imgArea">
						<div className="topCont">
							<span className="frame"><img src={TVsOn} alt=""/></span>
							<div className="likeArea">
								<span className="frame likeOn"></span>
							</div>
						</div>
						<span className="frame"><img src={myTokenInfo?.img} alt=""/></span>
					</div>
				</div>
				<div className="nftinfoArea">

					<div className="txtbox">
						<p className="artiNum">#{myTokenInfo?.id}</p>
						<p className="tit">{myTokenInfo?.title}</p>
					</div>
					<div className="priceInfo"></div>

					<div className="descripArea" >
						<p className="omit">{myTokenInfo?.description}</p>
						<a href="#none" id="nftuserPageMore" className="off" onClick={()=>readMore('nftuserPageMore')}>Read More</a>
					</div>
					
					<div className="ownerInfo">
						<p className="tit">Owner</p>
						<div className="contbox">
						<span className="frame"><img src={myTokenInfo?.profilePath !== null ? myTokenInfo?.profilePath : sample1} alt=""/>{auction?.profilePath}</span>
						<p className="userName">{/** 판매자 닉네임 */}</p>
						<ul>
							<li>by</li>
							<li>
								<p className="accAddr" style={{ cursor: 'pointer' }} onClick={()=>{window.open('https://etherscan.io/address/'+myTokenInfo?.owner)}}>
									{myTokenInfo && myTokenInfo?.owner.substr(0, 7)}...
									{myTokenInfo && myTokenInfo?.owner.substr(myTokenInfo?.owner.length - 7)}
								</p>
								<input id="clip_target" className="blind" type="text" value=""/>
							</li>
							<li style={{display:'none'}}><a href="#" className="copyBtn"><img src={copyImg} alt=""/></a></li>
						</ul>
						</div>
					</div>
					<div className="linkArea">
						<p>Link</p>
						<p><a href={myTokenInfo?.nftLink} target='_blank'>{myTokenInfo?.nftLink}</a></p>
					</div>

					<div className="endauction"></div>
					<div className="btnArea2" style={{marginTop:'200'}} >
						<a href="#none" className="buynow" onClick={() => $(".createauctionPop").show()}>SELL</a><a href="#none" className="buynow" onClick={onClickDeleteNft}>DELETE</a>
					</div>	
				</div>
			</div>
		</div>
		{/** 경매등록 화면 */}
		{/**바로구매 팝업*/}
		<div className="buynowPop clsePop" style={{display:'none'}}>
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<a href="#" className="clse"><img src={clse} onClick={clsePop} alt="닫기"/></a>
				<p className="tit">Buy Now</p>
				<div className="contbox">
				<span className="frame"><img src={auction?.img} alt=""/></span>
				<div className="txtbox">
					<p>Your are about to purchase</p>
					<p>#<em>{auction?.auctionId}</em> <span>{auction?.auctionTitle}</span></p>
					<p>from <span className="omit">
								{auction && auction?.seller.substr(0, 7)}...
								{auction && auction?.seller.substr(auction?.seller.length - 7)}
							</span>
					</p>
					<div className="inputArea on">
					<span>Buy Now Price</span>
					<input type="text" value={auction?.buyNowPrice} readOnly />
					
					<span>DDP</span>
					</div>
				</div>
				</div>
				<div className="btnArea">
				<a href="#none" className='on' id="buyNowId" onClick={onBuyNow}>CONFIRM</a>
				</div>
			</div>
		</div>
		{/**바로구매 팝업*/}

		{/**입찰 팝업*/}
		<div className="placeabidPop clsePop" style={{display:'none'}}>
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<a href="#" className="clse"><img src={clse} onClick={clsePop} alt="닫기"/></a>
				<p className="tit">Place a Bid</p>
				<div className="contbox">
					<span className="frame"><img src={auction?.img} alt=""/></span>
					<div className="txtbox">
						<p>Your are about to purchase</p>
						<p>#<em>{auction?.auctionId}</em> <span>{auction?.auctionTitle}</span></p>
						<p>from <span className="omit">
									{auction && auction?.seller.substr(0, 7)}...
									{auction && auction?.seller.substr(auction?.seller.length - 7)}
								</span>
						</p>
						<div className="inputArea on">
						<span>You are Bid</span>
						<input type="text" name="bidinput" id="bidinput" ref={inputRef} onKeyUp={biddingChk} onInput={numberChk}/>
						<span>DDP</span>
						</div>
						<span className="err" style={{display:'none'}}>Must be higher than the highest bid</span>
					</div>
				</div>
				<div className="btnArea">
					<a href="#none" className="placeBid" onClick={onPlaceBid} >PLACE A BID</a>
				</div>
			</div>
		</div>
		{/**입찰 팝업 */}

		{/* 경매 생성하기 팝업 */}
		<div className="createauctionPop clsePop" style={{display:'none'}}> 
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<a href="#" className="clse"><img src={clse} onClick={clsePop} alt="닫기"/></a>
				<p className="tit">SELL</p>

				<div className="inputbox step1">
					<p>Starting price<span>*</span></p>
					<div className="inputArea">
						<input type="text" id="startPrice" placeholder="Enter DDP Quantity" onKeyUp={chkCreateAuc1} onInput={numberChk}/>
						<span>DDP</span>
					</div>
					<span className="err type1" style={{display:'none'}}>Please enter a starting price</span>
				</div>
				
				<div className="inputbox step2">
					<p>Buy now price<span>*</span></p>
					<div className="inputArea">
						<input type="text" id="buyNowPrice" placeholder="Enter a buy now price" onKeyUp={chkCreateAuc2} onInput={numberChk}/>
						<span>DDP</span>
					</div>
					<span className="err" style={{display:'none'}}>Please enter a buy now price</span>
				</div>
				
				<div className="inputbox step3">
					<p>Auction Date<span>*</span></p>
					<div className="calendarSec">
						<DateTimePicker onChange={onChangeDate} value={selectDate}  />
						{/* <input type="text" id="datetimepicker"
								placeholder="MM/DD/YYYY HH:MM AM" readOnly/>  */}
								{/* <span className="frame"><img src={auction_icon} alt=""/></span> */}
					</div>
					<span className="err" style={{display:'none'}}>Please enter a date</span>
				</div>

				<div className="btnArea">
					<a href="#none" className="" id="createAuctionId" onClick={onClickCreateAuction}>CREATE AUCTION</a>
				</div>
			</div>
		</div>  
		{/*경매 생성하기 팝업 END */}

		{/* 경매 생성 완료 팝업 */}
		<div className="auctionsuccessPop clsePop" style={{display:'none'}}>
			<div className="shadow"></div>
			<div className="contArea">
				<p className="tit">SELL</p>
				<div className="contbox">
				<div className="txtbox1">
					<p>You created an auction for</p>
					<p>"<span>{myTokenInfo?.title}</span>"</p>
				</div>
				<span className="frame"><img src={myTokenInfo?.img} alt=""/></span>
				<div className="txtbox2">
					<p>Your auction has been</p>
					<p>successfully processed!</p>
				</div>
				</div>
				<div className="btnArea">
					<a href="#" onClick={()=>{clsePop();history.push(`/mycollection`);}}>CONFIRM</a>
				</div>
			</div>
		</div>
		{/* 경매 생성 완료 팝업 END */}


		{/** 경매정산 팝업 START*/}
		<div className="settlePop clsePop" id='settlePop' style={{display:'none'}}>
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<a href="#" className="clse"><img src={clse} onClick={clsePop} alt="닫기"/></a>
				<p className="tit">SETTLE</p>
				<div className="contbox">
					<span className="frame"><img src={auction?.img} alt=""/></span>
					<div className="txtbox">
						<p>You are about to sell</p>
						<p>#<em>{auction?.auctionId}</em> <span>{auction?.auctionTitle}</span></p>
						<p>to <span className="omit">
								{auction && auction?.highestBidder && auction?.highestBidder.substr(0, 7)}...
								{auction && auction?.highestBidder && auction?.highestBidder.substr(auction?.highestBidder.length - 7)}
								</span>
						</p>
						<p>You will receive <span><em>{Number((auction?.currentPrice*0.975).toFixed(0))}</em>DDP</span></p>
					</div>
				</div>
				<div className="btnArea">
					<a href="#none" onClick={onClickSettleAuction}>CONFIRM</a>
				</div>
			</div>
		</div>
		{/** 경매정산 팝업 END*/}

		{/** 경매정산 예외 팝업 START*/}
		<div className="settlePop clsePop" id='settleNotPop'>
			<div className="shadow" onClick={clsePop}></div>
			<div className="contArea">
				<p className="tit">
					Settle <a href="#" className="clse"><img
						src={btn_close} alt="닫기" onClick={clsePop}/></a>
				</p>
				<div className="imgArea">
					<span className="frame"><img
						src={auction?.img} alt=""/></span>
					<div className="txtbox">
						<p>You are about to settle for</p>
						<p>
							<span>#{auction?.auctionId}</span>&nbsp;<em>{auction?.auctionTitle}</em>
						</p>
					</div>
				</div>
				<div className="infoArea">
					<span>
						<p style={{ color: '#EF4B4B', fontSize:'10' , fontWeight : 'normal', textAlign:'center'}} >There is no bidding history, so settlement is not possible.</p>
					</span>
				</div>
				<div className="btnArea">
					<a href="#" onClick={clsePop}>CONFIRM</a>
				</div>
			</div>
		</div>
		{/** 경매정산 예외 팝업 END*/}


	</>	
  );
};

export default ItemDetailsContainer;

import React,{ useRef } from 'react';
import { useHistory } from 'react-router-dom';
import MyItem from '../../components/MyItem';
import contracts from '../../constants/contracts';
import { useWeb3React } from '@web3-react/core';
import myItemsAtom from '../../atoms/myItems';
import myAuctionsAtom from '../../atoms/myAuctions';
import myFavoriteAuctionsAtom from '../../atoms/myFavoriteAuctions';
import MyAuctionItem from '../../components/MyAuctionItem';
import MyFavoriteItem from '../../components/MyFavoriteItem';
import addresses from '../../constants/addresses';
import { useMoralisWeb3Api } from 'react-moralis';
import { useInterval } from 'usehooks-ts';
import isAuctionFinishAtom from '../../atoms/isAuctionFinish';
import { useRecoilValue, useRecoilState} from 'recoil';
import walletAccountAtom from '../../atoms/walletAccount';
import { useParams } from 'react-router';
import $ from 'jquery';
import axios from 'axios';

import nodataImg from '../../assets/img/nodataImg.png';
import userOn from '../../assets/img/userOn.png';
import TVsOn from '../../assets/img/TVsOn.png';
import logoutOn from '../../assets/img/logoutOn.png';
import userOff from '../../assets/img/userOff.png';
import TVsOff from '../../assets/img/TVsOff.png'; 
import logoutOff from '../../assets/img/logoutOff.png';
import copyImg from '../../assets/img/copy.png';
import edit1 from '../../assets/img/edit1.png';
import edit2 from '../../assets/img/edit2.png';
import clse from '../../assets/img/clse.png';
import exchg from '../../assets/img/exchg.png';
import { swapHistory } from '../../types';
import BigNumber from 'bignumber.js';
import web3 from '../../connection/web3';



function clsePop(){
	$('#fromTokenAmt').val('0');
	$('#toTokenAmt').val('0');
	$(".clsePop").hide();
  }

  

const ProfileContainer = () => { 


	const { account: mAccount } = useMoralisWeb3Api();
	const history = useHistory();
	const { account ,deactivate } = useWeb3React();
	const { regFlag }: { regFlag?: string } = useParams();
	const { tvpFlag }: { tvpFlag?: string } = useParams();
	const [capturedFileBuffer, setCapturedFileBuffer] = React.useState<Buffer | null>(null);

	//const { chainId, account, activate, deactivate, active } = useWeb3React();
	const walletAccount = useRecoilValue(walletAccountAtom);
	const [myAuctions, setMyAuctions] = useRecoilState(myAuctionsAtom);
	const [myItems, setMyItems] = useRecoilState(myItemsAtom);
	const [myFavoriteItems, setMyFavoriteItems] = useRecoilState(myFavoriteAuctionsAtom);
	const [isAuctionFinish, setIsAuctionFinish] = useRecoilState(isAuctionFinishAtom);
	const [nickName, setNickName] = React.useState<String>('unnamed');
	const [fromToken, setFromToken] = React.useState<String>('TVS');
	const [tvsAmount, setTvsAmount] = React.useState<String>('0');
	const [ethAmount, setEthAmount] = React.useState<String>('0');
	const [tvpAmount, setTvpAmount] = React.useState<String>('0');
	const [polygonAmount, setPolygonAmount] = React.useState<String>('0');
	const [myProfileImg, setMyProfileImg] = React.useState<String>('');
	const [uploadFile,setUploadFile] = React.useState(null);
	const [mySwapHistory, setMySwapHistory] = React.useState<swapHistory>();
	const [dollorPrice, setDollorPrice] = React.useState<String>('0');
	const [ethPrice, setEthPrice] = React.useState<String>('0');
	const [polygonPrice, setPolygonPrice] = React.useState<String>('0');
	

	const textInput = useRef();
	
	const getAuctions = async () => {
	  console.log(account);
	  try {

		//json  형태
      
      	var data = JSON.stringify({
        	"address": account,
			"marketYn" : "Y"
        });
      

        var config = {
			method: 'post', 
			url: addresses.targetIp+'/nft/myAuctionList',
			headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json'
			},
			data : data
		};

		var jsonData
		axios(config).then(function (response) {

			console.log(response.data)

			jsonData = JSON.parse(JSON.stringify(response.data));

			
			if(jsonData.result.code === 200){
				console.log(jsonData.myAucList)
				setMyAuctions(jsonData.myAucList);
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
	};
  
	const getTotalSupply = async () => {
	
		var data = JSON.stringify({
			"address": account,
			"marketYn" : "N"
		});
	

		var config = {
			method: 'post',
			url: addresses.targetIp+'/nft/myNFTList',
			headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json'
			},
			data : data
		};

			var jsonData
			axios(config).then(function (response) {

			console.log(response.data)

			jsonData = JSON.parse(JSON.stringify(response.data));

			
			if(jsonData.result.code === 200){
				setMyItems(jsonData.myAucList);
			}else{
				alert('조회실패!');
			}


		})
		.catch(function (error) {
			console.log(error);
		});

	  
	};


	const getFavoriteList = async () => {

		try {
  		
			var data = JSON.stringify({
				"address": account
			});
  
			var config = {
				method: 'post', 
				url: addresses.targetIp+'/nft/myFavoriteList',
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
					console.log(jsonData.myFavoriteList)
					setMyFavoriteItems(jsonData.myFavoriteList);
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
	};


	  const getMyInfo = async () => {

		try {
		
			var data = JSON.stringify({
			  "address": account
		  });
		
  
		  var config = {
			  method: 'post', 
			  url: addresses.targetIp+'/users/myUserInfo',
			  headers: { 
			  'Accept': 'application/json', 
			  'Content-Type': 'application/json'
			  },
			  data : data
		  };
  
		  var jsonData
		  axios(config).then(function (response) {
  
			  console.log(response.data)
  
			  jsonData = JSON.parse(JSON.stringify(response.data));
  
			  
			  if(jsonData.result.code === 200){	
				const myUserInfo = jsonData.userInfo;
				
				if(myUserInfo){
					setNickName(myUserInfo[0].nick_name);
					//setMyProfileImg(imageUrlToBase64(myUserInfo[0].file_path));
					setMyProfileImg(myUserInfo[0].file_path);
					setTvsAmount(myUserInfo[0].tvs_amount === null ? '0' :myUserInfo[0].tvs_amount);
					setTvpAmount(myUserInfo[0].tvp_amount === null ? '0' :myUserInfo[0].tvp_amount);
					setEthAmount(myUserInfo[0].eth_amount === null ? '0' :myUserInfo[0].eth_amount);
					setPolygonAmount(myUserInfo[0].polygon_amount === null ? '0' :myUserInfo[0].polygon_amount);
					
					$("#nickName").val(myUserInfo[0].nick_name === null?'Unnamed':myUserInfo[0].nick_name);
				}

			  }else{
				console.log('프로필정보 조회 오류');
			  }
  
  
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
	
		  
  
  
		} catch (e) {
		  console.log(e);
		}
	  };

	  const imageUrlToBase64 = async (url) => {
		console.log(url)
		const data = await fetch(url)
		const blob = await data.blob();
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = () => {
			const base64data = reader.result;
			return base64data
		}
	}


	  const chgMyNickName = async () => {
	
		
		var data = JSON.stringify({
			"address":account,
			"nickName": $("#nickName").val()
		});
	
		var config = {
			method: 'post',
			url: addresses.targetIp+'/users/chgMyNickName',
			headers: { 
			'Accept': 'application/json', 
			'Content-Type': 'application/json'
			},
			data : data
		};
	
		axios(config).then(function (response) {
	
			let jsonData = JSON.parse(JSON.stringify(response.data));
				
			if(jsonData.result.code === 200){
				
				alert("닉네임 변경 성공");
				
			}
	
		})
		.catch(function (error) {
			console.log(error);
		});
			
	
	}

	async function chgMyProfileImg() {
		try {
	
		  var formData = new FormData();
		  formData.append('file',uploadFile);
		  formData.append('address',walletAccount);
		  
	
		  var config = {
			method: 'post',
			url: addresses.targetIp+'/users/chgMyImg',
			headers: { 
			  'Accept': 'multipart/form-data', 
			  'Content-Type': 'multipart/form-data'
			},
			data : formData
		  };

		  
		  axios(config).then(function (response) {
	
			var jsonData = JSON.parse(JSON.stringify(response.data));
			console.log(jsonData)
			if(jsonData.code === 'OK'){
			  alert('이미지 변경 성공')
				//$(".nftcreateconfPop").show();
			}else{
			  alert('이미지 변경 실패!');
			}
	
	
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	
		  //응답 성공 
		  //console.log(response);
		} catch (error) {
		  //응답 실패
		  console.error(error);
		}
	  }

	  const copyAddress = () => {
		
		
		if (navigator.clipboard) {
			// (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
			navigator.clipboard
			  .writeText(walletAccount)
			  .then(() => {
				alert("클립보드에 복사되었습니다.");
			  })
			  .catch(() => {
				alert("복사를 다시 시도해주세요.");
			  });
		  } else {
			// 흐름 2.
			if (!document.queryCommandSupported("copy")) {
			  return alert("복사하기가 지원되지 않는 브라우저입니다.");
			}

			document.execCommand("copy");
			alert("클립보드에 복사되었습니다.");
	  	}
	  
	}

	useInterval(
	  () => {
		if (account) {
		  getTotalSupply();
		  getAuctions();
		  getFavoriteList();
		  setIsAuctionFinish(false);
		}
	  },
	  isAuctionFinish ? 1000 : null
	);

	$(".myprofilePage>.secontinner>.sidemnuArea>ul>li>a").on("click",function(evt){
		var nowIdx = $(this).parent().index();
		$(this).parent().addClass('on').siblings().removeClass('on');
	
		if (nowIdx == 0) {
		  $(".myprofilePage>.secontinner>.contArea>ul>li").eq(0).show().siblings().hide();
		} else if (nowIdx == 1) {
		  $(".myprofilePage>.secontinner>.contArea>ul>li").eq(1).show().siblings().hide();
		} 
		evt.preventDefault();
	  });
	
	
	  $(".myprofilePage>.secontinner>.contArea>ul>li>.contprof>.contlistArea>.tapMnuArea>ul>li>a").on("click",function(evt){
		var nowIdx = $(this).parent().index();
		$(this).parent().addClass('on').siblings().removeClass('on');
	
		if (nowIdx == 0) {
		  $(".myprofilePage>.secontinner>.contArea>ul>li>.contprof>.contlistArea>ul>li").eq(0).show().siblings().hide();
		} else if (nowIdx == 1) {
		  $(".myprofilePage>.secontinner>.contArea>ul>li>.contprof>.contlistArea>ul>li").eq(1).show().siblings().hide();
		} else if (nowIdx == 2) {
		  $(".myprofilePage>.secontinner>.contArea>ul>li>.contprof>.contlistArea>ul>li").eq(2).show().siblings().hide();
		}
	
		evt.preventDefault();
	  });
	
	  $(".myprofilePage>.secontinner>.contArea>ul>li>.contswap>.tapMnuArea>ul>li>a").on("click",function(evt){
		var nowIdx = $(this).parent().index();
		$(this).parent().addClass('on').siblings().removeClass('on');
	
		if (nowIdx == 0) {
		  $(".myprofilePage>.secontinner>.contArea>ul>li>.contswap>.swapCont>ul>li").eq(0).show().siblings().hide();
		} else if (nowIdx == 1) {
		  $(".myprofilePage>.secontinner>.contArea>ul>li>.contswap>.swapCont>ul>li").eq(1).show().siblings().hide();
		} 
	
		evt.preventDefault();
	  });


	$("#MynftsPage>.content>.sortArea>ul>li>a").on("click",function(evt){
		var nowIdx = $(this).parent().index();
		$(this).parent().addClass('on').siblings().removeClass('on');

		if (nowIdx === 0) {
			$("#MynftsPage>.content>.listArea.sort1").show();
			$("#MynftsPage>.content>.listArea.sort2").hide();      
			if(myAuctions.length > 8){
				$(".content>.btnArea").show();
			}else{
				$(".content>.btnArea").hide();
			}
		} else if (nowIdx === 1) {
			$("#MynftsPage>.content>.listArea.sort1").hide();
			$("#MynftsPage>.content>.listArea.sort2").show();
			if(myItems.length > 8){
				$(".content>.btnArea").show();
			}else{
				$(".content>.btnArea").hide();
			}
		}
		evt.preventDefault();
	});

	const setInitData = () =>{

		if(regFlag === 'Y'){
			$('#auctionList').removeClass('on');
			$('#Unlisted').addClass('on');
			$("#MynftsPage>.content>.listArea.sort1").hide();
			$("#MynftsPage>.content>.listArea.sort2").show();
			if(myItems.length > 8){
				$(".content>.btnArea").show();
			}else{
				$(".content>.btnArea").hide();
			}
		}else{
			$('#auctionList').addClass('on');
			$('#Unlisted').removeClass('on');
			$("#MynftsPage>.content>.listArea.sort1").show();
			$("#MynftsPage>.content>.listArea.sort2").hide();      
			if(myAuctions.length > 8){
				$(".content>.btnArea").show();
			}else{
				$(".content>.btnArea").hide();
			}
		}


		if ($("#auctionList").hasClass("on")) {   
			if(myAuctions.length > 8){
				$(".content>.btnArea").show();
			}else{
				$(".content>.btnArea").hide();
			}
		} else if ($("#Unlisted").hasClass("on")) {
			if(myItems.length > 8){
				$(".content>.btnArea").show();
			}else{
				$(".content>.btnArea").hide();
			}
		}
	}

	const imgresetFn = async () => {
		return;
		$('#u_file').val('');
		$('#imgArea').attr('src', '');
		$('#imgViewArea').css({
		  'display' : 'none'
		});
		$('.fileBtn').css({
		  'display' : 'block'
		});
		
	
		if ($(":input[name='u_file']").val() == '') {
		  $('#imgArea').attr('src', '');
		  $(".cont1").addClass("error");
		}else{
		  $(".cont1").removeClass("error");
		}
	
		setCapturedFileBuffer(null);
	  }
	
	  const captureFile: React.ChangeEventHandler<HTMLInputElement> = (
		event: any
	  ) => {
		event.preventDefault();
	
		const file = event.target.files[0];
	
		setBuffer(file);
		setUploadFile(file);
	  };
	
	  const setBuffer = (file: any) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => {
		  // @ts-ignore
	
		  if (file) {
	
			var maxSize = 100 * 1024 * 1024;
			var fileSize = file.size;
	
			if (fileSize > maxSize) {
			  alert("Attachments can be registered within 100 MB.");
			  setCapturedFileBuffer(null);
			  return false;
			}
		  }
	
		  if ($(":input[name='u_file']").val() == '') {
			$('#imgArea').attr('src', '');
			$(".cont1").addClass("error");
		  }else{
			$(".cont1").removeClass("error");
		  }
		  $('#imgViewArea').css({
			'display' : 'block'
		  });      
		  $('.fileBtn').css({
			'display' : 'none'
		  });
	
		  setCapturedFileBuffer(Buffer(reader.result));
		};
	  };
	
	  // 이미지 에러 시 미리보기영역 미노출
	  const imgAreaError = async () =>  {
		$('#imgViewArea').css({
		  'display' : 'none'
		});
		$('.fileBtn').css({
		  'display' : 'block'
		});
	
		if ($(":input[name='u_file']").val() == '') {
		  $('#imgArea').attr('src', '');
		  $(".cont1").addClass("error");
		}else{
		  $(".cont1").removeClass("error");
		}
	
	  }


	  const getSwapHistory = async () => {
		console.log(account);
		try {
  
		  //json  형태
		
			var data = JSON.stringify({
			  "address": walletAccount
		  });
		
  
		  var config = {
			  method: 'post', 
			  url: addresses.targetIp+'/nft/mySwapHistory',
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
				  console.log(jsonData.swapHistory);
  
				  setMySwapHistory(jsonData.swapHistory);
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
	  };



	  const transFromTVP = async () => { 
		try {
			
			let fromTokenAmt = new BigNumber($('#fromTokenAmt').val());
			let availToken = new BigNumber($('#availToken>span>span>em').text());

			if(Number(fromTokenAmt) > Number(availToken)){
				alert('You do not have enough DDP in your possession.')
				return;
			}

			var data = JSON.stringify({
				"address": walletAccount,
				'tvpToken' : $('#fromTokenAmt').val(),
				'tvsToken' : $('#toTokenAmt').val(),
				'tokenName' : 'DDS',
				'amount' : web3.utils.toWei($('#fromTokenAmt').val(),	'ether')
			});
	
			var config = {
				method: 'post',
				url: addresses.targetIp+'/nft/transferToken',
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
					setMySwapHistory(jsonData.swapHistory);
					clsePop();
					$('.exchgcompPop').show();
				}else{
					alert('스왑실패!');
				}
	
			})
			.catch(function (error) {
				console.log(error);
			});
	
		  } catch (e) {
			console.log(e);
		}
	}

	const transFromTVS = async () => {

		let chkNetworkId = await web3.eth.getChainId();
		if(chkNetworkId !== 1){
			alert('이더리움 네트워크로 변경 후 스왑가능합니다.');
			return;
		}

		let fromTokenAmt = new BigNumber($('#fromTokenAmt').val());
		let availToken = new BigNumber($('#availToken>span>span>em').text());

		 if(Number(fromTokenAmt) > Number(availToken)){
		 	alert('You do not have enough DDS in your possession.')
		 	return;
		 }
		var transferToken = web3.utils.toWei($('#fromTokenAmt').val(),	'ether');
		
		try{

		//var txdata = contracts.erc20_testnet.methods.transfer('0xFcBe931F2D2Ab2B96220dB0ccae2F21e41541031','1000000000000000000').encodeABI();
		var txdata = contracts.tvsContract.methods.transfer('0x1A240a62aFB15D6f6B427e13Fad106C9E73962A7',transferToken).encodeABI();
		//let gas = await web3.eth.getBlock('latest');
		let gasPrice = await web3.eth.getGasPrice();

		//let rawTx = {from: walletAccount, to: '0xdb34D66dE1F5Ee546dAD6F9075169fE04e1fb772', gasPrice: gasPrice, data: txdata};
		//let gas = await web3.eth.estimateGas(rawTx);


		//0x1A240a62aFB15D6f6B427e13Fad106C9E73962A7 // ETH 집금주소 
		//0xdb34D66dE1F5Ee546dAD6F9075169fE04e1fb772 // 컨트랙트
		var params = [
			{
			  from: walletAccount,
			  //to: '0x7C0263da81e22c4C5235268cd07887B4b23cf3DD', //컨트주소
			  to: '0xdb34D66dE1F5Ee546dAD6F9075169fE04e1fb772',
			  gas: '80000', // 3
			  //gasPrice: gasPrice, // 10000000000000
			  //gas: web3.utils.toHex(gas), // 3
			  gasPrice: web3.utils.toHex(await getGasPrice()), // 10000000000000
			  gasLimit: web3.utils.toHex(await getGasLimit()),
			  data: txdata
			  //   value: '0x'+ new BigNumber(web3.utils.toWei($("#fromTokenAmt").val(), 'ether')).toString(16) // 2441406250
			  
			},
		  ];

		  var method = 'eth_sendTransaction';
	
		  await web3.currentProvider.sendAsync(
		  {
			method,
			params
		  },
		  function (err, result) {
			
			if(JSON.stringify(result.result) === undefined){
				alert('스왑취소')
			}else{
				console.log(JSON.stringify(result.result));
				alert("토큰 스왑 신청이 완료되었습니다.")
				clsePop();
				$('.exchgcompPop').show();
			}
	
		  });

		}catch(error){
			console.log(error)
		}
	};
	
	const transFromETH = async () => {

		let chkNetworkId = await web3.eth.getChainId();
		if(chkNetworkId !== 1){
			alert('이더리움 네트워크로 변경 후 스왑가능합니다.');
			return;
		}

		let fromTokenAmt = new BigNumber($('#fromTokenAmt').val());
		let availToken = new BigNumber($('#availToken>span>span>em').text());

		 if(fromTokenAmt > availToken){
		 	alert('You do not have enough ETH in your possession.')
		 	return;
		 }
		var transferToken = web3.utils.toWei($('#fromTokenAmt').val(),	'ether');
		
		try{

			var params = [
				{
				  from: walletAccount,
				  to: '0x1A240a62aFB15D6f6B427e13Fad106C9E73962A7', //마더지갑 고정
				  gas: '80000', // 3
				  gasPrice: web3.utils.toHex(await getGasPrice()), // 10000000000000
			  	  gasLimit: web3.utils.toHex(await getGasLimit()),
				  value: '0x'+ new BigNumber(transferToken).toString(16), // 2441406250
				},
			  ];
			  var method = 'eth_sendTransaction';
		
			  await web3.currentProvider.sendAsync(
			  {
				method,
				params
			  },
			  function (err, result) {
				
				if(JSON.stringify(result.result) === undefined){
					alert('DDP 스왑 오류')
				}else{
					console.log(JSON.stringify(result.result));
					alert("DDP 스왑 신청이 완료되었습니다.")
				}
		
			  });

		}catch(error){
			console.log(error)
		}
	};
	
	const getGasLimit = async () => {
		let returnVal = await web3.eth.getBlock('latest');
		returnVal = returnVal.gasLimit;
		if(returnVal >  43000) return 42000;
		return returnVal;
	}
	const getGasPrice = async () => {
		let returnVal = await web3.eth.getGasPrice();
		if(returnVal >  10000000000) return 10000000000;
	
		return returnVal;
	}
	

	const transFromMATIC = async () => {

		let chkNetworkId = await web3.eth.getChainId();
		if(chkNetworkId !== 137){
			alert('폴리콘 네트워크로 변경 후 스왑가능합니다.');
			return;
		}

		let fromTokenAmt = new BigNumber($('#fromTokenAmt').val());
		let availToken = new BigNumber($('#availToken>span>span>em').text());

		 if(Number(fromTokenAmt) > Number(availToken)){
		 	alert('You do not have enough MATIC in your possession.')
		 	return;
		 }
		var transferToken = web3.utils.toWei($('#fromTokenAmt').val(),	'ether');
		
		try{

			var params = [
				{
				  from: walletAccount,
				  to: '0x1A240a62aFB15D6f6B427e13Fad106C9E73962A7', //마더지갑 고정
				  gas: '800000', // 3
				  gasPrice: web3.utils.toHex(await getGasPrice()*5), // 10000000000000
			  	  gasLimit: web3.utils.toHex(await getGasLimit()*5),
				  value: '0x'+ new BigNumber(transferToken).toString(16), // 2441406250
				},
			  ];
			  var method = 'eth_sendTransaction';
		
			  await web3.currentProvider.sendAsync(
			  {
				method,
				params
			  },
			  function (err, result) {
				
				if(JSON.stringify(result.result) === undefined){
					alert('DDP 스왑 오류')
				}else{
					console.log(JSON.stringify(result.result));
					alert("DDP 스왑 신청이 완료되었습니다.")
				}
		
			  });

		}catch(error){
			console.log(error)
		}
	};
	
	const chgSwapToken = () =>{

		if($('#availToken>span').eq(1).text().indexOf('DDP') >= 0 ){//DDS -> DDP
			$('#availToken>span').eq(1).html($('#availToken>span').eq(1).html().replace('DDP','DDS'));
			$('#availToken>span>span>em').text(tvsAmount);
			$('#fromToken').text('DDS');
			$('#toToken').text('DDP');
			$('#toTokenQnt').text('DDP Quantity');
			$('#toTokenAmt').val(0);
			$('#fromTokenAmt').val(0);
			$('.exchgPop>.exchgCont>.inputSec>ul>li>p.subTit>span').css('font-size','13px');
			$('#fromTokenAmt').css('width','84%');
			setFromToken('DDS');
			
		}else if($('#availToken>span').eq(1).text().indexOf('DDS') >= 0){//ETH -> TVP
			$('#availToken>span').eq(1).html($('#availToken>span').eq(1).html().replace('DDS','ETH'));
			$('#availToken>span>span>em').text(ethAmount);
			$('#fromToken').text('ETH');
			$('#toToken').text('DDP');
			$('#toTokenQnt').text('DDP Quantity');
			$('#toTokenAmt').val(0);
			$('#fromTokenAmt').val(0);
			$('.exchgPop>.exchgCont>.inputSec>ul>li>p.subTit>span').css('font-size','13px');
			$('#fromTokenAmt').css('width','84%');
			setFromToken('ETH');
		}else if($('#availToken>span').eq(1).text().indexOf('ETH') >= 0){//MATIC -> TVP
			$('#availToken>span').eq(1).html($('#availToken>span').eq(1).html().replace('ETH','MATIC'));
			$('#availToken>span>span>em').text(polygonAmount);
			$('#fromToken').text('MATIC');
			$('#toToken').text('DDP');
			$('#toTokenQnt').text('DDP Quantity');
			$('#toTokenAmt').val(0);
			$('#fromTokenAmt').val(0);
			$('.exchgPop>.exchgCont>.inputSec>ul>li>p.subTit>span').css('font-size','8px');
			$('#fromTokenAmt').css('width','80%');
			setFromToken('MATIC');
		}else if($('#availToken>span').eq(1).text().indexOf('MATIC') >= 0){//DDP -> DDS
			$('#availToken>span').eq(1).html($('#availToken>span').eq(1).html().replace('MATIC','DDP'));
			$('#availToken>span>span>em').text(tvpAmount);
			$('#fromToken').text('DDP');
			$('#toToken').text('DDS');
			$('#toTokenQnt').text('DDS Quantity');
			$('#toTokenAmt').val(0);
			$('#fromTokenAmt').val(0);
			$('.exchgPop>.exchgCont>.inputSec>ul>li>p.subTit>span').css('font-size','13px');
			$('#fromTokenAmt').css('width','84%');
			setFromToken('DDS');
		}

	}

	const tokenSwapCall = () =>{
		if($('#availToken>span').eq(1).text().indexOf('DDP') >= 0 ){
			// 메타마스크 연동 없이 컨트롤 가능한 회사지갑에서 바로 송금
			transFromTVP();
		}else if($('#availToken>span').eq(1).text().indexOf('DDS') >= 0 ){
			// 메타마스크 통해 토큰스왑(DDS) 신청
			transFromTVS();
		}else if($('#availToken>span').eq(1).text().indexOf('ETH') >= 0 ){
			// 메타마스크 통해 토큰스왑(ETH) 신청
			transFromETH();
		}else if($('#availToken>span').eq(1).text().indexOf('MATIC') >= 0 ){
			// 메타마스크 통해 토큰스왑(MATIC) 신청
			transFromMATIC();
		}
		
	}


	const getExchange = async () => {
		return new Promise(async (resolve, reject) => {
			try{
			 let result = await axios.get("https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD");  
			   var jsonData = JSON.parse(JSON.stringify(result.data));  
			   setDollorPrice(jsonData[0].basePrice);
			
			 let ethResult = await axios.get("https://api.upbit.com/v1/ticker?markets=KRW-ETH");  
				let ethJson = JSON.parse(JSON.stringify(ethResult.data));
			    setEthPrice(ethJson[0].trade_price);

			let polygonResult = await axios.get("https://api.upbit.com/v1/ticker?markets=KRW-MATIC");  
				let polygonJson = JSON.parse(JSON.stringify(polygonResult.data));
				setPolygonPrice(polygonJson[0].trade_price);

				

			}catch(error){
			  reject(error);
			}
		});
	}
	  
	const calToeknval = () =>{
		
		const myPattern1 = /^(\d.\d)/;
		const myPattern2 = /^(\d*)/;
		if($('#fromTokenAmt').val() === '.'){
			$('#toTokenAmt').val(0);
			return;
		}
		if(!myPattern1.test($('#fromTokenAmt').val()) && !myPattern2.test($('#fromTokenAmt').val())) return;

		var fromTokenAmt = $('#fromTokenAmt').val() !== '' ? $('#fromTokenAmt').val():0;

		if($('#availToken>span').eq(1).text().indexOf('DDP') >= 0 ){
			$('#toTokenAmt').val(fromTokenAmt);
		}else if($('#availToken>span').eq(1).text().indexOf('DDS') >= 0){
			$('#toTokenAmt').val(fromTokenAmt);
		}else if($('#availToken>span').eq(1).text().indexOf('ETH') >= 0){
			$('#toTokenAmt').val(((ethPrice*fromTokenAmt)/dollorPrice).toFixed(0));
		}else if($('#availToken>span').eq(1).text().indexOf('MATIC') >= 0){
			$('#toTokenAmt').val(((polygonPrice*fromTokenAmt)/dollorPrice).toFixed(0));
		}

	}
	  
	const numberChk = () =>{
		$('#fromTokenAmt').val(document.getElementById("fromTokenAmt").value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'));
	}
	
	  

	//if (window.confirm("Do you want to cancel?")) {
		
	React.useEffect(() => {
	  if (account) {
		getMyInfo();
		getTotalSupply();
		getAuctions();
		getFavoriteList();
		setInitData();
		getSwapHistory();
	  } else {
		setMyAuctions([]);
		setMyItems([]);
		setMyFavoriteItems([]);
		setMySwapHistory([]);
		history.replace('/');
	  }
	}, [account]);

	React.useEffect(() => {
		if(tvpFlag === 'Y'){
			$('.myprofilePage>.secontinner>.sidemnuArea>ul>li').eq(1).addClass('on').siblings().removeClass('on');
			$('.myprofilePage>.secontinner>.contArea>ul>li').eq(1).show().siblings().hide();
		}

		getExchange().then((exchanges) => {
			// console.log("exchanges = ", exchanges);
			// console.log(exchanges['USD'], exchanges['EUR']);
		  });

		
	  }, []);

  return (

	<>
	<div className="myprofilePage">
		<div className="secontinner">
			<div className="sidemnuArea">
				<p className="subTit">My Profile</p>
				<ul>
					<li className="on">
						<a href="#"><span className="frame type1"><img src={userOn} alt=""/></span><span className="frame type2"><img src={userOff} alt=""/></span>Profile</a>
					</li>
					<li>
						<a href="#"><span className="frame type1"><img src={TVsOn} alt=""/></span><span className="frame type2"><img src={TVsOff} alt=""/></span>DDP Swap</a>
					</li>
					<li>
						<a href="#" onClick={event => {deactivate(); window.localStorage.removeItem('wallet');history.replace('/');}}><span className="frame type1"><img src={logoutOn} alt=""/></span><span className="frame type2"><img src={logoutOff} alt=""/></span>Disconnect</a>
					</li>
				</ul>
			</div>

			<div className="contArea">
				<ul>
				<li>
					<div className="contprof cont1">
					<div className="myproArea">
						<div className="imgArea">
						<span className="frame" onClick={imgresetFn}>
							{capturedFileBuffer ? (
								<img id="imgArea" onError={imgAreaError}
									src={`data:image/png;base64,${capturedFileBuffer.toString(
									'base64'
									)}`}
									style={{ maxWidth: '100%' }}
								/>
							) : (
								<img id="imgArea" src={myProfileImg === null || myProfileImg === ''?nodataImg:myProfileImg} alt=""/>
							)}
						</span>
						<a href="#" className="saveNick" onClick={chgMyProfileImg}>Save</a>
						<label className="imgChange" htmlFor="u_file"><img src={edit1} alt=""/></label>
						<input type="file" id="u_file" name="u_file" accept=".JPG, .PNG, .GIF" onChange={captureFile} hidden/>
						</div>
						<div className="nickArea">
						<input type="text" id="nickName" placeholder='nickName' />
						<a href="#" className="saveNick" onClick={chgMyNickName}>Save</a>
						<a href="#" className="chgNick"><img src={edit2} style={{display:'none'}} alt=""/></a>
						</div>
						<div className="transAddr">
						<p className="omit" style={{textAlign:'center'}}>{walletAccount}</p>
						<a href="#" className="copy" onClick={copyAddress} ><img src={copyImg} alt=""/></a>
						</div>
					</div>

					<div className="contlistArea">
						<div className="tapMnuArea">
							<ul>
								<li className="on"><a href="#">Auctions</a></li>
								<li><a href="#">Unlisted</a></li>
								<li><a href="#">Favorite</a></li>
							</ul>
							</div>
							<ul>
							<li>
								<div className="auctionsSec tapSec">
									<ol>
										{myAuctions.length > 0 ?  myAuctions.map((item, i) => (
											<MyAuctionItem key={i} {...item} />
										)) : 
										<li className="nodata"><p className="nodata">Nothing here yet.</p></li>
										}
									</ol>
								</div>
							</li>
							<li>
								<div className="unlistedSec tapSec">
									<ol>
										{myItems.length > 0 ? myItems.map((item, i) => (
											<MyItem key={i} {...item} />
										)) :
											<li className="nodata"><p className="nodata">Nothing here yet.</p></li>
										}	
									</ol>
								</div>
							</li>
							<li>
								<div className="favoriteSec tapSec">
									<ol>
										{myFavoriteItems.length > 0 ?  myFavoriteItems.map((item, i) => (
											<MyFavoriteItem key={i} {...item}  />
										)) : 
										<li className="nodata"><p className="nodata">Nothing here yet.</p></li>
										}
									</ol>
								</div>
							</li>
							</ul>
						</div>
					</div>
				</li>
				<li>
				<div className="contswap cont2">
					<div className="tapMnuArea">
						<ul>
						<li className="on"><a href="#">My Balance</a></li>
						<li><a href="#">Swap History</a></li>
						</ul>
					</div>
					<div className="swapCont">
						<ul>
						<li>
							<div className="balanceCont">
							<ol>
								<li>
									<p>Account <span><em className="omit">{account}</em><a href="#" onClick={copyAddress}><img src={copyImg} alt=""/></a></span></p>
								</li>
								<li>
									<p>ETH Quantity <span><em>{ethAmount}</em>ETH</span></p>
								</li>
								<li>
									<p>DDS Quantity <span><em>{tvsAmount}</em>DDS</span></p>
								</li>
								<li>
									<p>MATIC Quantity <span><em>{polygonAmount}</em>MATIC</span></p>
								</li>
								<li>
									<p>DDP Quantity <span><em>{tvpAmount}</em>DDP</span></p>
								</li>
								<li>
									<div className="btnArea">
										<a href="#" onClick={()=>{$('.exchgPop').show()}}>EXCHANGE</a>
									</div>
								</li>
							</ol>
							</div>
						</li>
						<li>
							<div className="swaphiscont">
							<div className="tableArea">
								<div className="fiexdtable">
								<ul>
									<li>Date</li>
									<li>From</li>
									<li>Balance</li>
									<li>To</li>
									<li>Balance</li>
									<li>TXID</li>
								</ul>
								</div>
								<div className="tableCont">
								{mySwapHistory && mySwapHistory.length > 0 ? mySwapHistory.map((swapHist) => (
									<ul>
										<li>{swapHist.swapDate}</li>
										<li>{swapHist.swap_from}</li>
										<li>{swapHist.from_amount}</li>
										<li>{swapHist.swap_to}</li>
										<li>{swapHist.to_amount}</li>
										<li><p className="omit">{swapHist.txid}</p></li>
									</ul>
								)) :
								<p className="nodata">There is no history.</p>
								}  
								</div>
							</div>
							</div>
						</li>
						</ul>
					</div>
					</div>
				</li>
				</ul>
			</div>
		</div>
	</div>


	{/* 환전 팝업 */}
	<div className="exchgPop clsePop">
		<div className="shadow"></div>
		<div className="exchgCont">
		<a href="#" onClick={clsePop}><img src={clse} alt=""/></a>
		<p className="popTIt">EXCHANGE</p>
		<div className="inputSec">
			<ul>
			<li>
				<p className="subTit" id='availToken'>Available Quantity <span><span><em>{tvpAmount}</em></span></span><span style={{marginRight:10}}>DDP</span></p>
			</li>
			<li>
				<p className="subTit">Token Quantity</p>
				<div className="inputArea">
				<input id='fromTokenAmt' type="text" placeholder="Enter Quantity" onChange={calToeknval} onInput={numberChk}/>
				<span id='fromToken'>DDP</span>
				</div>
			</li>
			<li>
				<span className="frame" style={{ cursor: 'pointer' }} onClick={chgSwapToken}><img src={exchg} alt=""/></span>
			</li>
			<li>
				<p className="subTit" id='toTokenQnt'>DDP Quantity</p>
				<div className="inputArea">
					<input id='toTokenAmt' type="text" readOnly/>
				<span id='toToken'>DDP</span>
				</div>
			</li>
			</ul>
		</div>
		<div className="btnArea">
			<a href="#" onClick={clsePop}>Cancel</a>
			<a href="#" onClick={tokenSwapCall}>Swap</a>
		</div>
		</div>
	</div>

	{/* 환전 완료 팝업 */}
	<div className="exchgcompPop clsePop">
		<div className="shadow"></div>
		<div className="exchgcompCont">
		<a href="#" onClick={clsePop}><img src={clse} alt=""/></a>
		<p className="popTIt">EXCHANGE</p>
		<div className="txtbox">
			<p>The swap you requested has been</p>
			<p>successfully applied.</p>
		</div>
		<div className="btnArea">
			<a href="#" onClick={clsePop}>OK</a>
		</div>
		</div>
	</div>

	</>
  );
};

export default ProfileContainer;

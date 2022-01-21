import { FunctionComponent } from 'react';

import { useState, useEffect } from 'react';
import Web3 from "web3";
// import contractAbi from '../../contract/abi.json';
// import { contractAddress } from '../../contract/address.js';
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import moment from "moment";

const Mint: FunctionComponent = (
    // difference,
    // account,
    // totalSupply,
    // displayPrice = 0,
    // mint,
    // maxSupply,
    // chainId,
    // loadWeb3,
) => {
  
    const [chainId, setChainId] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [totalSupply, setTotalSupply] = useState(0);
    const [maxSupply, setMaxSupply] = useState(0);
    const [price, setPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);
    const [lessMintAmountAlert, setLessMintAmountAlert] = useState(false);
    const [accessAccountDenied, setAccessAccountDenied] = useState(false);
    const [installEthereum, setInstallEthereum] = useState(false);
    const [nftMinted, setNftMinted] = useState(false);
    const [nftMinting, setNftMinting] = useState(false);
    const [transactionRejected, setTransactionRejected] = useState(false);
    const [transactionFailed, setTransactionFailed] = useState(false);
    const [switchToMainnet, setswitchToMainnet] = useState(false);
    const [ethereumCompatibleBrowser, setEthereumCompatibleBrowser] =
      useState(false);
    const [mintingInProgress, setMintingInProgress] = useState(false);
    const [confirmTransaction, setConfirmTransaction] = useState(false);
    const [preSaleEligibility, setPreSaleEligibility] = useState(false);
    const [saleLive, setSaleLive] = useState(false);
    const [preSale, setPreSale] = useState(false);
  
    async function loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
        //   loadBlockchainData();
        //   getCurrentAddressConnected();
        //   addAccountsAndChainListener();
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          localStorage.setItem("account", "metamask");
        } catch (error) {
          if (error.code === 4001) {
            // swal("Request to access account denied!", "", "error");
            setAccessAccountDenied(true);
          } else console.error(error);
        }
      } else {
        // swal(
        //   "",
        //   "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
        //   "error"
        // );
        setInstallEthereum(true);
      }
    }
    
    // const loadBlockchainData = async () => {
    //   const contract = new window.web3.eth.Contract(contractAbi, contractAddress);
    //   setContract(contract);
    //   const chainId = await window.web3.eth.getChainId();
    //   setChainId(chainId);
    //   //success when chainId = 4 else failure
    //   // you are connected to main net
    //   // Please connect to main net
  
    //   if (chainId === 1) {
    //     toast(`You are connected to main net`, {
    //       type: "success",
    //       position: toast.POSITION.BOTTOM_CENTER,
    //     });
    //     const totalSupply = await contract.methods.totalSupply().call();
    //     setTotalSupply(totalSupply);
  
    //     const price = await contract.methods.price().call();
    //     setPrice(price);
    //     const displayPrice = window.web3.utils.fromWei(price, "ether");
    //     setDisplayPrice(displayPrice);
    //     const MAX_SUPPlY = await contract.methods.MAX_SUPPlY().call();
    //     // console.log("MAX_SUPPLY:", MAX_SUPPlY);
    //     setMaxSupply(MAX_SUPPlY);
    //     //event will be fired by the smart contract when a new NFT is minted
    //     contract.events
    //       .NFTMinted()
    //       .on("data", async function (result) {
    //         setTotalSupply(result.returnValues[0]);
    //       })
    //       .on("error", console.error);
    //   } else {
    //     toast("Please connect to main net", {
    //       type: "error",
    //       position: toast.POSITION.BOTTOM_CENTER,
    //     });
    //   }
    // };
  
    // const getCurrentAddressConnected = async () => {
    //   try {
    //     const accounts = await window.ethereum.request({
    //       method: "eth_accounts",
    //     });
    //     if (accounts.length > 0) {
    //       setAccount(accounts[0]);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
  
    // const addAccountsAndChainListener = async () => {
    //   //this event will be emitted when the currently connected chain changes.
    //   window.ethereum.on("chainChanged", (_chainId) => {
    //     window.location.reload();
    //   });
  
    //   // this event will be emitted whenever the user's exposed account address changes.
    //   window.ethereum.on("accountsChanged", (accounts) => {
    //     window.location.reload();
    //   });
    // };
  
    // async function mint(mintCount) {
    //   if (contract) {
    //     if (chainId === 1) {
    //       const presaleOpen = await contract.methods.presaleOpen().call();
    //       const saleOpen = await contract.methods.saleOpen().call();
    //       const eligibility = await contract.methods
    //         .checkPresaleEligiblity(account)
    //         .call();
    //       // console.log("saleopen:", saleOpen);
    //       if (presaleOpen === false && saleOpen === false) {
    //         setPreSale(true);
    //       } else if (presaleOpen === true && saleOpen === false) {
    //         if (eligibility) {
    //           if (mintCount === 0) {
    //             setLessMintAmountAlert(true);
    //           } else {
    //             setConfirmTransaction(true);
    //             const finalPrice = Number(price) * mintCount;
  
              
  
    //             contract.methods
    //               .mintNFT(mintCount)
    //               .send({ from: account, 
    //                 value: finalPrice,
  
    //                })
    //               .on("transactionHash", function () {
    //                 // swal({
    //                 //   title: "Minting NFT!",
    //                 //   icon: "info",
    //                 // });
    //                 setConfirmTransaction(false);
    //                 setMintingInProgress(true);
    //               })
    //               .on("confirmation", function () {
    //                 const el = document.createElement("div");
    //                 el.innerHTML =
    //                   "View minted NFT on OpenSea : <a href='https://testnets.opensea.io/account '>View Now</a>";
  
    //                 // swal({
    //                 //   title: "NFT Minted!",
    //                 //   content: el,
    //                 //   icon: "success",
    //                 // });
    //                 setNftMinted(true);
    //                 setConfirmTransaction(false);
    //                 setMintingInProgress(false);
    //                 setTimeout(() => {
    //                   window.location.reload(false);
    //                 }, 5000);
    //               })
    //               .on("error", function (error, receipt) {
    //                 if (error.code === 4001) {
    //                   // swal("Transaction Rejected!", "", "error");
    //                   setTransactionRejected(true);
    //                   setConfirmTransaction(false);
    //                   setMintingInProgress(false);
    //                 } else {
    //                   // swal("Transaction Failed!", "", "error");
    //                   setTransactionFailed(true);
    //                   setConfirmTransaction(false);
    //                   setMintingInProgress(false);
    //                 }
    //               });
    //           }
    //         } else {
    //           setPreSaleEligibility(true);
    //         }
    //       } else {
    //         if (mintCount === 0) {
    //           setLessMintAmountAlert(true);
    //         } else {
    //           setConfirmTransaction(true);
    //           const finalPrice = Number(price) * mintCount;
    //           let gasPrice = await window.web3.eth.getGasPrice()
    //           let gas;
  
    //           try{
    //             gas =    await contract.methods
    //             .mintNFT(mintCount)
    //             .estimateGas({ from: account, value: finalPrice,gasPrice})
    //           }catch(err){
  
    //               if(err.code === -32000){
    //                 toast(`Insufficient Fund`, {
    //                   type: "error",
    //                   position: toast.POSITION.BOTTOM_CENTER,
    //                 });
    //                 setConfirmTransaction(false);
  
    //                 return 
    //               }
    //           }
  
  
    //           // gasPrice = window.web3.utils.fromWei(gasPrice, 'ether').toStr
    //           // // console.log("gas",gas,"gasPrice",gasPrice)
  
    //           contract.methods
    //             .mintNFT(mintCount)
    //             .send({ from: account, value: finalPrice,gasPrice ,
    //               gas})
    //             .on("transactionHash", function () {
    //               // swal({
    //               //   title: "Minting NFT!",
    //               //   icon: "info",
    //               // });
    //               setConfirmTransaction(false);
    //               setMintingInProgress(true);
    //             })
    //             .on("confirmation", function () {
    //               const el = document.createElement("div");
    //               el.innerHTML =
    //                 "View minted NFT on OpenSea : <a href='https://testnets.opensea.io/account '>View Now</a>";
    //               // swal({
    //               //   title: "NFT Minted!",
    //               //   content: el,
    //               //   icon: "success",
    //               // });
    //               setNftMinted(true);
    //               setConfirmTransaction(false);
    //               setMintingInProgress(false);
    //               setTimeout(() => {
    //                 window.location.reload(false);
    //               }, 5000);
    //             })
    //             .on("error", function (error, receipt) {
    //               if (error.code === 4001) {
    //                 // swal("Transaction Rejected!", "", "error");
    //                 setTransactionRejected(true);
    //                 setConfirmTransaction(false);
    //                 setMintingInProgress(false);
    //               } else {
    //                 // swal("Transaction Failed!", "", "error");
    //                 setTransactionFailed(true);
    //                 setConfirmTransaction(false);
    //                 setMintingInProgress(false);
    //               }
    //             });
    //         }
    //       }
    //     } else {
    //       setswitchToMainnet(true);
    //     }
    //   } else {
    //     // swal(
    //     //   "",
    //     //   "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
    //     //   "error"
    //     // );
    //     setEthereumCompatibleBrowser(true);
    //   }
    // }
  
    //for mint count
    const [value, setValue] = useState(0);
    
    const changeHandler = (e) => {
        const reg = /^[0-9\b]+$/;
        if (e.target.value === "" || reg.test(e.target.value)) {
        if (e.target.value === "" || e.target.value <= 7) {
            setValue(e.target.value);
        }
        }
    };
    
    const mintHandler = () => {
        // mint(value);
        alert('mintHandler');
    };


    // const difference =
    // +new moment(Date.UTC("2021", "09", "20", "13", "00", "00")).utc() -
    // +new Date();
     
    // const [days, setDays] = useState(0);
    // const [hours, setHours] = useState(0);
    // const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(0);

    // const Timer = () => (
    //     <div className="border border-dark p-3 timer-main">
    //       <h2>
    //         The Cheetah Gang is <span className="text-warning">Coming</span>
    //       </h2>
    //       <p>
    //         OCTOBER 20TH 1:00 PM UTC
    //         <br />
    //         PRE-SALE STARTS IN
    //       </p>
    //       <div id="flipdown" className="flipdown"></div>
    //     </div>
    //   );
      
    // const MintBox = ({ msg = "Connect", connect, loadWeb3 }) => (
    //     <div className="mint-now-box">
    //       <div className="mint-header">
    //         <div className="mint-header-text">
    //           <h3 className="mint-box-title">Join The Cheetah Gang</h3>
    //           <p className="mb-0 mint-box-para">
    //             Enter the amount of cheetah you would like to purchase.
    //           </p>
    //         </div>
    //         <div className="mint-box-logo">
    //           <img src={''} alt="mintbox" />
    //         </div>
    //       </div>
    //       <div className="mint-box-body text-center py-0">
    //         {connect ? (
    //           <button
    //             className="btn btn-outline-light btn-lg my-5 rounded-pill mint-btn py-3 px-5"
    //             onClick={loadWeb3}
    //           >
    //             {msg}
    //           </button>
    //         ) : (
    //           <button className="btn btn-outline-light btn-lg my-5 rounded-pill mint-btn py-3 px-5">
    //             {msg}
    //           </button>
    //         )}
    //       </div>
    //     </div>
    // );
      
    const MintNowBox = ({
        // displayPrice,
        // totalSupply,
        // value,
        // changeHandler,
        // maxSupply,
        // mintHandler,
      }) => (
        <div className="mint-now-box">
          <div className="mint-header">
            <div className="mint-header-text">
              <h3 className="mint-box-title">Join The Cheetah Gang</h3>
              <p className="mb-0 mint-box-para">
                Enter the amount of cheetah you would like to purchase.
              </p>
            </div>
            <div className="mint-box-logo">
              <img src={''} alt="" />
            </div>
          </div>
          <div className="mint-box-body text-center">
            <div className="row no-gutters">
              <div className="col-md-7">
                <div className="price-box">
                  <img src={''} alt="mint-cheetha" />
                  <div className="price-text-box text-right">
                    <h5 className="price-text">Price per Cheetah</h5>
                    <h4 className="price-tag">
                      <span className="text-danger">{displayPrice}</span> ETH Each
                    </h4>
                    <h5 className="price-text mb-0">
                      {maxSupply-totalSupply} remaining
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-md-5 pl-0 pl-md-3 mt-3 mt-md-0">
                <div className="input-group">
                  <input
                    className="form-control"
                    type="number"
                    max={7}
                    value={value}
                    onChange={changeHandler}
                  />
                  <div className="input-group-append">
                    <button className="btn" type="button">
                      7 max
                    </button>
                  </div>
                </div>
                <span className="total-box">
                  Total <strong>{(displayPrice * value).toFixed(3)} ETH</strong>
                </span>
              </div>
            </div>
            <button
              className="btn btn-outline-light mt-3 rounded-pill mint-btn"
              type="button"
              onClick={mintHandler}
            >
              Mint Now
            </button>
          </div>
        </div>
      );
      
      const Soldout = () => (
        <div className="sold-box text-center bg-danger p-4">
          <h1 className="display-3 text-white">
            Sold out!
            <br />
          </h1>
          <p className="text-white" style={{ fontSize: "24px" }}>
            Our entire collection is sold out! Visit OpenSea to check our collection.
            <br />
          </p>
          <button className="btn btn-outline-light rounded-pill mint-btn mb-3">
            NFT Collection
            <br />
          </button>
        </div>
      );

    useEffect(() => {
        // const id = setTimeout(() => {
        //     if (difference > 0) {
        //       setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        //       setHours(Math.floor((difference / (1000 * 60 * 60)) % 24));
        //       setMinutes(Math.floor((difference / 1000 / 60) % 60));
        //       setSeconds(Math.floor((difference / 1000) % 60));
        //     }
        //   }, 1000);
      
        //   return () => {
        //     clearTimeout(id);
        //   };

        const localAccount = localStorage.getItem("account");
        if (localAccount === "metamask") {
          loadWeb3();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (

        <section id="mint" className="mint-part py-6 jumptarget">
            <div className="container">
                <div className="row align-items-center">
                <div className="col-xl-6 text-center mb-xl-0 mb-3" data-aos="fade-up">
                    {/* {difference > 0 ? (
                    <Timer />
                    ) : account ? (
                    chainId === 1 ? (
                        totalSupply !== 0 && totalSupply === maxSupply ? (
                        <Soldout />
                        ) : ( */}
                        <MintNowBox
                            // displayPrice={displayPrice}
                            // // mint={mint}
                            // mintHandler={mintHandler}
                            // totalSupply={totalSupply}
                            // value={value}
                            // changeHandler={changeHandler}
                            // maxSupply={maxSupply}
                        />
                        {/* )
                    ) : (
                        <MintBox msg={"Please Connect To Mainnet"} />
                    )
                    ) : (
                    <MintBox connect={true} loadWeb3={loadWeb3} />
                    )} */}
                </div>
                <div className="col-xl-6" data-aos="fade-up">
                    <div className="numbers-main">
                    <h2>The Numbers</h2>
                    <ul className="list-unstyled number-list mb-0">
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        Mint Cost :{" "}
                        <strong>
                        0.04 ETH + GAS
                        </strong>
                        </li>
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        Max Supply : <strong>10,000</strong>
                        </li>
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        Max Mint Per Order : <strong>7 NFT</strong>
                        </li>
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        Presale Supply : <strong>9950</strong>
                        </li>
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        Giveaway Supply : <strong>50 (reserved for contest)</strong>
                        </li>
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        Royalty Fees : <strong>3%</strong>
                        </li>
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        Token Type : <strong>ERC-721</strong>
                        </li>
                        <li>
                        <img className="mr-2" src={''} alt="cheak" />
                        File Hosting : <strong>IPFS</strong>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>      
        </section>
    )
}

export default Mint



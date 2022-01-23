import { FunctionComponent, useMemo } from 'react'
import styles from './MintContainer.module.scss'

import Container from '~/components/elements/Container';
import ContainerHeading from '~/components/elements/Container/Heading';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from 'react';
import Web3 from "web3";


import { contractAbi, contractAddress } from "../../../contract/config";

declare var window: any

const MintContainer: FunctionComponent<MintContainerProps> = ({id, title}) => {
    const [chainId, setChainId] = useState(null);
    const [account, setAccount] = useState(null);
    
    const [contract, setContract] = useState(null);

    const [totalSupply, setTotalSupply] = useState(0);
    const [price, setPrice] = useState(0);
    const [displayPrice, setDisplayPrice] = useState(0);
    const [mintCount, setMintCount] = useState(0);


    const [accessAccountDenied, setAccessAccountDenied] = useState(false);
    const [installEthereum, setInstallEthereum] = useState(false);

    const [nftMinted, setNftMinted] = useState(false);
    const [nftMinting, setNftMinting] = useState(false);
    const [transactionRejected, setTransactionRejected] = useState(false);
    const [transactionFailed, setTransactionFailed] = useState(false);
    const [switchToMainnet, setswitchToMainnet] = useState(false);
    
    const [mintingInProgress, setMintingInProgress] = useState(false);
    const [confirmTransaction, setConfirmTransaction] = useState(false);
    const [preSaleEligibility, setPreSaleEligibility] = useState(false);
    const [saleLive, setSaleLive] = useState(false);
    const [preSale, setPreSale] = useState(false);
  
    
    async function loadWeb3() {
      
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          
          loadBlockchainData();
          getCurrentAddressConnected();
          // addAccountsAndChainListener();
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);
          localStorage.setItem("account", "metamask");
        } catch (error:any) {
          if (error.code === 4001) {
            setAccessAccountDenied(true);
          } else console.error(error);
        }
      } else {
        setInstallEthereum(true);
      }
    }

    const loadBlockchainData = async () => {
      
      const contract = new window.web3.eth.Contract(contractAbi, contractAddress);
      setContract(contract);
      const chainId = await window.web3.eth.getChainId();

      setChainId(chainId);
      
      //success when chainId = 4 else failure
      // you are connected to main net
      // Please connect to main net
      
      if (chainId === 4) {
        
        toast(`You are connected to main net`, {
          type: "success",
          position: toast.POSITION.BOTTOM_CENTER,
        });
        
      
        const totalSupply = await contract.methods.getTotalSupply().call();
        setTotalSupply(totalSupply);
        

        const price = await contract.methods.getMintFee().call();
        setPrice(price);

        const displayPrice = window.web3.utils.fromWei(price, "ether");
        setDisplayPrice(displayPrice);

        // const MAX_SUPPlY = await contract.methods.MAX_SUPPlY().call();
        // setMaxSupply(MAX_SUPPlY);

        // event will be fired by the smart contract when a new NFT is minted
        // contract.events
        //   .NFTMinted()
        //   .on("data", async function (result) {
        //     setTotalSupply(result.returnValues[0]);
        //   })
        //   .on("error", console.error);

      } else {
        toast("Please connect to Rinkeby Testnet", {
          type: "error",
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    };

    const getCurrentAddressConnected = async () => {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // const addAccountsAndChainListener = async () => {
    //   //this event will be emitted when the currently connected chain changes.
    //   window.ethereum.on("chainChanged", (chainId) => {
    //     window.location.reload();
    //   });
  
    //   // this event will be emitted whenever the user's exposed account address changes.
    //   window.ethereum.on("accountsChanged", (accounts) => {
    //     window.location.reload();
    //   });
    // };

    const mintHandler = () => {
      mint(contract, mintCount);
      // alert('mintHandler');
    };

    async function mint(contract:any ,mintCount: any) {
      
      if(mintCount > 0 && contract ) {

        if (chainId === 4) {
          contract.methods.mintToken(mintCount).send({
            from: account,
            value: Number(price) * mintCount
          })
          .then((res:any) => {
            console.log(res);
            toast.success(`${mintCount} NFTs are minted successfully!`);
            toast.info('Please check NFTs on https://testnets.opensea.io/ ');
          })
          .catch((err:any) => {
            console.log(err);
            toast.error("Minting Failed!, please check Network state");
          });
        }
      }
    }

    const changeHandler = (e:any) => {
        const reg = /^[0-9\b]+$/;
        if (e.target.value === "" || reg.test(e.target.value)) {
          if (e.target.value === "" || e.target.value <= 10) {
              setMintCount(e.target.value);
          }
        }
    };
    
    
    useEffect(() => {
        const localAccount = localStorage.getItem("account");
        if (localAccount === "metamask") {
          loadWeb3();
        }
      }, []);

return(
    <div className={styles.container}>
      <Container id={id} padding>
        <ContainerHeading>{title}</ContainerHeading>
        <div>
          
          <div className={styles.mint_now_box}>
            
            <div className="mint-header">
              <div className="mint-header-text">
                <h2 className="mint-box-title">Mint CryptosDragon </h2>
                <p className="mint-box-para">
                  Enter the amount of CryptosDragon you would like to purchase.
                </p>
              </div>
            </div>

            <div className="mint-box-body text-center">
              <div className="row no-gutters">
                <div className="col-md-7">
                  <div className="price-box">
                    <div className="price-text-box text-right">
                      <h5 className="price-text">Price per CryptosDragon</h5>
                      <h4 className="price-tag">
                        <span className="text-danger">{displayPrice}</span> ETH Each
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="col-md-5 pl-0 pl-md-3 mt-3 mt-md-0">
                  <div className="input-group">
                    <input
                      className={styles.input}
                      type="number"
                      max={10}
                      value={mintCount}
                      onChange={changeHandler}
                    />
                    {/* <div className={styles.maxcontainer}>
                      <button className={styles.button} type="button">
                        10 max
                      </button>
                    </div> */}
                  </div>
                  <span className={styles.totalbox}>
                    Total <strong>{(displayPrice * mintCount).toFixed(3)} ETH</strong>
                  </span>
                </div>
              </div>
              {
                account ? 
                (<button
                  className={styles.button}
                  type="button"
                  onClick={mintHandler}
                >
                  Mint Now
                </button>) 
                :
                (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={loadWeb3}
                  >
                    Wallet Connect
                  </button>
                )
              }
              
            </div>
          </div>

          <div className={styles.mint_detail} >
            <div className="numbers-main">
              <h2>The Numbers</h2>
              <ul className="list-unstyled number-list mb-0">
                <li>
                  Presale Mint Cost :<strong>0.05 ETH + GAS</strong>
                </li>
                <li>
                  Max Supply : <strong>10,000</strong>
                </li>
                <li>
                  Max Mint Per Order : <strong>10 NFT</strong>
                </li>
                <li>
                  Presale : <strong>50</strong>
                </li>
                <li>
                  Giveaway : <strong>50 (reserved for contest)</strong>
                </li>
                <li>
                  Token Type : <strong>ERC-721</strong>
                </li>
                <li>
                  File Hosting : <strong>IPFS</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
    )
}

interface MintContainerProps {
    id?: string,
    title: string | React.ReactNode
}
  
export default MintContainer

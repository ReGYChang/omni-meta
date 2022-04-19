import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/0.png";

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #7b1fa2;
  padding: 10px;
  font-weight: bold;
  color: #ffffff;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Maybe it's your lucky day.");
  const [claimingNft, setClaimingNft] = useState(false);

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your Omni Meta...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        gasLimit: "300000",
        to: "0xeBd24AdF9162E4117B8E5bBE644a0dAb8B74A9a9",//"0x827acb09a2dc20e39c9aad7f7190d9bc53534192",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((0).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a Omni Meta. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "#1e3a8a" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          Welcome to Omniverse!
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.SpacerMedium />
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "", padding: 24 }}
          >
            {Number(data.totalSupply) == 1000 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  You can still find Omni Meta on{" "}
                  <a
                    target={"_blank"}
                    href={"https://opensea.io/collection/nerdy-coder-clones"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                {/* <s.TextTitle style={{ textAlign: "center" }}>
                  Just connect to the rinkeby network
                </s.TextTitle> */}
                <s.SpacerXSmall />
                <s.Container flex={1} jc={"center"} ai={"center"}>
                  <StyledImg alt={"example"} src={i1} />
                  <s.SpacerMedium />
                </s.Container>
                <s.TextDescription style={{ textAlign: "center" }}>
                  Free mint just one click.
                </s.TextDescription>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center", fontSize: 25 }}>
                      Connect to the Rinkeby network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    <s.Container flex={1} jc={"center"} ai={"center"}>
                      <s.SpacerMedium />
                      <s.TextTitle
                        style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}
                      >
                        {data.totalSupply}/1000
                      </s.TextTitle>
                    </s.Container>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "WAITING OwO" : "MINT"}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          {/* <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            Please make sure you are connected to the right network (Rinkeby
            network) and the correct address. Please note: Once you make the
            purchase, you cannot undo this action.
          </s.TextDescription> */}
          {/* <s.SpacerSmall /> */}
          {/* <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            We have set the gas limit to 285000 for the contract to successfully
            mint your NFT. We recommend that you don't change the gas limit.
          </s.TextDescription> */}
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;

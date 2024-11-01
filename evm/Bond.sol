// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.8.20;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "https://github.com/wormhole-foundation/wormhole-solidity-sdk/src/interfaces/IWormholeReceiver.sol";
import "https://github.com/wormhole-foundation/wormhole-solidity-sdk/src/interfaces/IWormholeRelayer.sol";
import "https://github.com/wormhole-foundation/wormhole-solidity-sdk/src/interfaces/ITokenBridge.sol";
import "https://github.com/wormhole-foundation/wormhole-solidity-sdk/src/Utils.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract Bond is TokenSender, TokenReceiver {
    ISwapRouter public immutable swapRouter;
    address public erc20ContractAddress;
    AggregatorV3Interface internal dataFeed;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    constructor(
        address _erc20ContractAddress,
        ISwapRouter _swapRouter,
        address aggregatorV3Address,
        address _wormholeRelayer,
        address _tokenBridge,
        address _wormhole
    ) TokenBase(_wormholeRelayer, _tokenBridge, _wormhole) {
        erc20ContractAddress = _erc20ContractAddress;
        swapRouter = _swapRouter;
        dataFeed = AggregatorV3Interface(aggregatorV3Address);
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int256) {
        (
            ,
            /* uint80 roundID */
            int256 answer, /*uint startedAt*/ /*uint timeStamp*/
            ,
            ,

        ) = /*uint80 answeredInRound*/
            dataFeed.latestRoundData();
        return answer;
    }

    function receivePayloadAndTokens(
        bytes memory payload,
        TokenReceived[] memory receivedTokens,
        bytes32, // sourceAddress
        uint16,
        bytes32 // deliveryHash
    ) internal override onlyWormholeRelayer {
        require(receivedTokens.length == 1, "Expected a token transfers");
        uint256 usdcAmount = swapRouter(receivedTokens[0].amount);
    }

    function sendCrossChainDeposit(
        uint16 targetChain,
        address targetHelloTokens,
        address recipient,
        uint256 amountA,
        address tokenA,
        uint256 amountB,
        address tokenB
    ) public payable {

        // add transfers to additionalVaas list so they will be delivered along with the payload
        VaaKey[] memory vaaKeys = new VaaKey[](2);
        vaaKeys[0] = transferTokens(
            tokenA,
            amountA,
            targetChain,
            targetHelloTokens
        );

        uint256 cost = quoteCrossChainDeposit(targetChain);
        require(
            msg.value == cost,
            "msg.value must be quoteCrossChainDeposit(targetChain)"
        );

        wormholeRelayer.sendVaasToEvm{value: cost - 2 * wormhole.messageFee()}(
            targetChain,
            targetHelloTokens,
            payload,
            0, // no receiver value needed since we're just passing a message + wrapped tokens
            GAS_LIMIT,
            vaaKeys
        );
    }

    function swapExactInputSingle(uint256 amountIn)
        external
        returns (uint256 amountOut)
    {
        uint256 priceOfToken = getChainlinkDataFeedLatestAnswer();
        uint256 conversionRate = priceOfToken * amountIn;

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: DAI,
                tokenOut: WETH9,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: conversionRate,
                sqrtPriceLimitX96: 10
            });

        amountOut = swapRouter.exactInputSingle(params);
    }
}

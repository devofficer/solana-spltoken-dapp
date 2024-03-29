import React, { useCallback, useEffect, useRef, useState } from "react";

import { TbChevronDown } from "react-icons/tb";

import { Border, Image, Row } from "components";
import { useTokenInfo } from "contexts";
import { floatNumRegex, formatBalanceToString, SelectedTokenType, type ExchangeProps, type PairProps } from "utils";
import mainActionStore from "store/mainActionStore";
import { debounce } from "lodash";
// if direction is 0, input token. direction is 1, output token
const Exchange = ({ direction }: ExchangeProps) => {
  const { setSelectedTokenType, inputTokenData, outputTokenData, setInputAmount, balance, outputAmount } = useTokenInfo();
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);
  const [tokenData, setTokenData] = useState<PairProps | undefined>();
  const inputAmountHandler = (event: any) => {
    setInputAmount(event.target.value);
  };
  const debouncedSetInputAmount = useCallback(debounce(inputAmountHandler, 600), []);
  useEffect(() => {
    if (direction === 0) {
      setTokenData(inputTokenData);
    } else {
      setTokenData(outputTokenData);
    }
  }, [direction, inputTokenData, outputTokenData]);

  const handleShowTokenModal = () => {
    if (direction === 0) {
      setSelectedTokenType(SelectedTokenType.Input);
    } else {
      setSelectedTokenType(SelectedTokenType.Output);
    }
    mainActionStore.setShowModal("token_modal");
  };

  const handleMaxValue = (tokenData: PairProps | undefined) => {
    if (tokenData && inputRef.current) {
      inputRef.current.value = balance[tokenData.name].toString();
      setInputAmount(balance[tokenData.name]);
    }
  };

  return (
    <div className="space-y-[10px] font-medium text-[16px] leading-[31px] bg-card_normal rounded-[20px] p-[20px] mobile:px-[15px]">
      <Row className="justify-between">
        <p className="text-gray-400">{direction === 0 ? "From" : "To (estimate)"}</p>
        <Row className="items-center space-x-4 last:space-x-2">
          {direction === 0 && (
            <>
              <div role="button" className="bg-primary_gradient bg-clip-text text-transparent" onClick={() => handleMaxValue(tokenData)}>
                Max
              </div>
              <Border vertical={true} className="h-4 bg-white" />
            </>
          )}
          <p className="text-gray-400 last:text-[14px]">Balance: {tokenData ? formatBalanceToString(balance[tokenData.name]) : 0}</p>
        </Row>
      </Row>
      <Row className="justify-between space-x-2">
        <div className="relative cursor-pointer select-none">
          <Row action={handleShowTokenModal} className="items-center space-x-1 w-[150px]">
            {tokenData ? (
              <>
                <Image src={tokenData.icon} alt={tokenData.alt} width={25} height={25} />
                <p>{tokenData.name}</p>
              </>
            ) : (
              <p className="uppercase whitespace-nowrap">Choose Token</p>
            )}
            <TbChevronDown size={25} color="white" />
          </Row>
        </div>
        <input
          ref={direction === 0 ? inputRef : outputRef}
          type="number"
          min={0}
          pattern={`${floatNumRegex}`}
          placeholder={direction === 0 ? "0.00" : `${formatBalanceToString(outputAmount)}`}
          readOnly={direction === 1}
          step="any"
          onChange={debouncedSetInputAmount}
          className={`${direction === 1 && "cursor-default"} w-full bg-transparent outline-none text-right text-[18px] font-bold`}
        />
      </Row>
    </div>
  );
};

export default Exchange;

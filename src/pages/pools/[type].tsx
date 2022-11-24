import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IoChevronBackCircleOutline } from "react-icons/io5";

import { Col, Container, Image, Page, Row } from "components";
import { PoolDeposit, PoolWithdraw } from "views";
import { PairProps } from "utils";
import poolStore from "store/poolStore";
import mainActionStore from "store/mainActionStore";
import { observer } from "mobx-react-lite";
// pool details page
const Liquidity = () => {
  const [poolName, setPoolName] = useState<string>("");
  const [poolDetail, setPoolDetail] = useState<PairProps[] | undefined>();
  const [detailPublicKey, setDetailPublickey] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const { type } = router.query;
    poolStore.setDetailPoolIndex(type as string);
    mainActionStore.setIsActionLoading(false);
    setPoolDetail(poolStore.pools[poolStore.detailPoolIndex].pairs);
    setPoolName(poolStore.pools[poolStore.detailPoolIndex].name);
    setDetailPublickey(poolStore.pools[poolStore.detailPoolIndex].public_key);
  }, []);

  const [ctaType, setCtaType] = useState("deposit");
  return (
    <Page name="pools">
      <Container className="py-10">
        {poolDetail && (
          <Col className="max-w-[560px] w-full mx-auto space-y-8">
            <Row action={() => router.back()} className="relative animate-border w-fit items-center space-x-2 cursor-pointer">
              <IoChevronBackCircleOutline fontSize={35} />
              <p className="uppercase text-[24px]">Back </p>
            </Row>
            <Col className="space-y-1">
              <p className="text-[36px] tablet:text-[24px] font-bold">{poolName} Pool</p>
              <Row className="-space-x-2">
                {poolDetail.map((pair, index) => (
                  <Image key={`pair_logo_${index}`} className="rounded-full" src={pair.icon} alt={pair.alt} width={40} height={40} />
                ))}
              </Row>
            </Col>
            <div className="mt-10 px-[28px] normal:px-[16px] py-[20px] normal:py-[12px] bg-card_normal rounded-[20px] divide-y">
              <Row className="items-center space-x-4 pb-6">
                <div
                  role="button"
                  onClick={() => setCtaType("deposit")}
                  className={`${ctaType !== "deposit" ? "text-gray-500" : "bg-[#33313180]"} p-2 rounded-lg text-[20px] font-medium`}
                >
                  Deposit
                </div>
                <div
                  role="button"
                  onClick={() => setCtaType("withdraw")}
                  className={`${ctaType !== "withdraw" ? "text-gray-500" : "bg-[#33313180]"} p-2 rounded-lg text-[20px] font-medium`}
                >
                  Withdraw
                </div>
              </Row>
              <div className="pt-4">
                {ctaType === "deposit" ? (
                  <PoolDeposit poolDetail={poolDetail} pool_public_key={detailPublicKey} />
                ) : (
                  <PoolWithdraw poolDetail={poolDetail} pool_public_key={detailPublicKey} />
                )}
              </div>
            </div>
          </Col>
        )}
      </Container>
    </Page>
  );
};

export default observer(Liquidity);

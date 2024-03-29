import React, { useState, useEffect } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { Col, Row, Container, LaunchApp, Page } from "components";
import { PoolMobile, PoolGridListButton } from "views";
import { useRouter } from "next/router";

// pools page
const Pools = () => {
  const wallet = useWallet();
  const [searchValue, setSearchValue] = useState<string>("");
  const [gridStatus, setGridStatus] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const { view } = router.query;
    if (view === "list") {
      setGridStatus(false);
    } else {
      setGridStatus(true);
    }
  }, [router]);
  const handleGrid = () => {
    if (gridStatus) {
      router.push("/pools?view=list");
    } else {
      router.push("/pools?view=grid");
    }
    // setGridStatus(!gridStatus);
  };
  return (
    <Page name="pools">
      <Container>
        <Col className="relative min-w-full items-center justify-center">
          <LaunchApp title="pools" />
          <Col className="z-50 pb-10 laptop:pb-6 max-w-[560px] w-full space-y-4">
            {/* <div className="grid grid-cols-3 mobile:grid-cols-1 gap-2">
              {wallet.connected && (
                <div className="bg-card_gradient3 hover:opacity-80 p-2 rounded-md cursor-pointer text-center">My Pools</div>
              )}
              <div className="bg-card_gradient3 hover:opacity-80 p-2 rounded-md cursor-pointer text-center">Weighted Pools</div>
              <div className="bg-card_gradient3 hover:opacity-80 p-2 rounded-md cursor-pointer text-center">Stable Pools</div>
            </div> */}
            <Row>
              <input
                type="search"
                autoFocus
                placeholder="Filter by symbol"
                onChange={(e: any) => setSearchValue(e.target.value)}
                className="rounded-md h-12 w-full bg-transparent border border-white p-2  mr-2 outline-none"
              />
              <PoolGridListButton action={handleGrid} gridStatus={gridStatus}></PoolGridListButton>
            </Row>
          </Col>
          <PoolMobile searchValue={searchValue} gridStatus={gridStatus} />
        </Col>
      </Container>
    </Page>
  );
};

export default Pools;

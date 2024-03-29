import React from "react";
import { observer } from "mobx-react-lite";
import mainActionStore from "store/mainActionStore";

const Loading = () => {
  return mainActionStore.isActionLoading ? (
    <div className="fixed inset-0 w-full h-screen z-[9999] overflow-hidden bg-black bg-opacity-50">
      <div className="relative flex justify-center items-center h-screen">
        <span className="moonloader">
          <span className="moonloader-in"></span>
          <span className="moonloader-out"></span>
        </span>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default observer(Loading);

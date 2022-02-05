import { useState } from 'react';

const useModal = () => {
  const [isWalletModalShowing, setIsWalletModalShowing] = useState(false)
  const [isApprovalModalShowing, setIsApprovalModalShowing] = useState(false)

  function toggle(type) {
 
    if(type === 'wallet-modal'){
      setIsWalletModalShowing(!isWalletModalShowing)
    }else if(type === 'approval-modal'){
      setIsApprovalModalShowing(!isApprovalModalShowing)
    }
  
  }

  return {
    isWalletModalShowing,
    isApprovalModalShowing,
    toggle,
  }
};

export default useModal;
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

const useConfirmUser = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // 사용자가 로그인된 경우
        setUser(authUser.uid);
      } else {
        // 사용자가 로그아웃된 경우
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return [user, setUser];
};

export default useConfirmUser;

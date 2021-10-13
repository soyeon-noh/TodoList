import { useUserContext } from "../context";
import { useHistory } from "react-router-dom";
import { useEffect, useCallback } from "react";

const AuthRoute = ({ children }) => {
  const { user, setUser } = useUserContext();
  const history = useHistory();

  const fetchCallback = useCallback(async () => {
    // 초기화코드
    await window.gapi.auth2.init({
      client_id:
        "819100873334-r3gjkehge2tsd5ka36ps16d20dflgfkc.apps.googleusercontent.com",
      scope: "profile email",
    });

    if (!window.gapi) {
      alert("google API Not Found!!!");
      history.replace("/login");
    }

    // gapi(google API)로부터 auth2 객체를 조회하기
    const auth2 = await window?.gapi?.auth2.getAuthInstance();
    if (!auth2) {
      history.replace("/login");
    }

    // 로그인되어있는 사용자 정보 getter하기
    const googleUser = await auth2.currentUser.get();
    const profile = await googleUser.getBasicProfile();

    // 로그인이 안 된경우 profile없음
    if (!profile) {
      history.replace("/login");
    }

    const user = {
      userid: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
      image: profile.getImageUrl(),
      Token: googleUser.getAuthResponse().id_token,
    };
    setUser(user);
  }, [history, setUser]);

  useEffect(fetchCallback, [fetchCallback]);

  return <>{children}</>;
};

export default AuthRoute;

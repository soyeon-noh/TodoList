import React, { useRef, useState } from "react";
import "../css/LoginForm.css";
import { useUserContext } from "../context";
import { useHistory } from "react-router";
import { fetchLogin } from "../modules/fetchModules";
import { CompButton } from "./index";
import { GoogleButton } from ".";

const LoginForm = () => {
  const { setUser } = useUserContext();

  const [account, setAccount] = useState({
    userid: "",
    password: "",
  });

  const idID = useRef();
  const pwID = useRef();

  const history = useHistory();

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onLogin = async () => {
    const { userid, password } = account;
    const resultUser = await fetchLogin(userid, password);
    await setUser(resultUser);
    history.replace("/");
  };

  return (
    <div className="login_form">
      <input
        name="userid"
        ref={idID}
        placeholder="아이디를 입력해주세요"
        onChange={onChange}
      />
      <input
        name="password"
        ref={pwID}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={onChange}
      />
      <CompButton backgroundColor="#03c75a" onClick={onLogin}>
        로그인
      </CompButton>
      <GoogleButton />
    </div>
  );
};

export default LoginForm;

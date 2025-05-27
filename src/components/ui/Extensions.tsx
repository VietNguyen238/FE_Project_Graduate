import { useState } from "react";
import Button from "./Button";
import { assetsSvg } from "../../constants/assets";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import axios from "axios";

export default function Extensions() {
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );
      const { given_name, email_verified, family_name, ...data } = res.data;
      setUserInfo(data);
      navigate("/");
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  console.log(userInfo);

  return (
    <div>
      <div className="px-4 bg-white flex w-full justify-center items-center mt-4">
        <hr className="border border-zinc-200 w-full"></hr>
        <div className="px-3">Hoặc</div>
        <hr className="border border-zinc-200 w-full"></hr>
      </div>
      <div className="flex justify-between items-center mt-4 gap-4">
        <Button
          isBorder={true}
          icon={assetsSvg.ic_facebook}
          title="Facebook"
          bg_color="bg-white"
          text_color="text-zinc-700"
        />
        <Button
          isBorder={true}
          icon={assetsSvg.ic_google}
          title="Google"
          bg_color="bg-white"
          text_color="text-zinc-700"
          onClick={login}
        />
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span`
  font-size: 22px;
`;
const Input = styled.input``

const EditUserNameButton = styled.button`
  width: 100px;
  line-height: 30px;
  border-radius: 2px;
  background-color: #03c75a;
  border: 0;
  color: #fff;
  cursor: pointer;
`

const MyTweetsWrapper = styled.div`
  margin-bottom: 20px;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [username, setUsername] = useState(user?.displayName);
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [editUsername, setEditUsername] =useState(user?.displayName);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if(!user) return;
    if(files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatar/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const uploadUrl = await getDownloadURL(result.ref);
      setAvatar(uploadUrl);
      await updateProfile(user, {
        photoURL : uploadUrl
      });
    }else {
      return;
    }
  }

  const fetchMyTweets = async () => {
    const tweetsQuery = query(collection(db, "tweets"), where("userId","==",user?.uid), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return { tweet, createdAt, userId, username, photo, id: doc.id}
    });
    setTweets(tweets);
  }

  const onClickEditUserName = async () => {
    setIsEdit(!isEdit);
    if(!user) return;
    if(isEdit) {
      setIsLoading(true);
      await updateProfile(user, {
        displayName : editUsername
      })
      setUsername(editUsername);
      setIsLoading(false);
    }
    //save 누를때 user이름 업데이트
  }

  const onChangeEditInput = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    setEditUsername(e.target.value);
  }

  useEffect(()=>{
    fetchMyTweets();
  },[]);

  return (
    <>
      <Wrapper>
        <AvatarUpload htmlFor="avatar">
          {avatar ? (
            <AvatarImg src={avatar} />
          ) : 
          <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
        </svg>
          }
        </AvatarUpload>
        <AvatarInput
          type="file"
          accept="image/*"
          id="avatar"
          onChange={onAvatarChange}
        />
        {!isEdit && <Name>{isLoading ? "Loading..." : username}</Name> }
        {isEdit && <Input type="text" onChange={onChangeEditInput} value={editUsername ?? ""} />}
        <EditUserNameButton onClick={onClickEditUserName} type="button" >{isEdit? "save" : "edit"}</EditUserNameButton>
      </Wrapper>
      <MyTweetsWrapper>
        {tweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
      </MyTweetsWrapper>
    </>
  )
}
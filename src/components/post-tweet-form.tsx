import { addDoc, collection, deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ConnectedProps, connect } from "react-redux";
import { useEffect } from "react";
import { ISelectThing } from "../actions/actions";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 20px;
  border: 2px solid white;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const Warning = styled.div`
  color: red;
`

interface IState {
  editObj: ISelectThing
}

function PostTweetForm({ state }:PropsFromRedux) {
  const [loading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isFileBig, setIsFileBig] = useState("");
  console.log(state);
  const editObj = {
    photo: "https://firebasestorage.googleapis.com/v0/b/nwitter-reloaded-5a315.appspot.com/o/tweets%2F82Tcg6IytGcI2EVqld0dNmfsuDt2%2FwqXUEWPdcp4SOPSU3lDw%7D?alt=media&token=bccf9b67-b38c-48bd-b762-7e7c7af71658",
    tweet: "ㅁㅇ",
    userId: "82Tcg6IytGcI2EVqld0dNmfsuDt2",
    username: "Anonymous",
    id: "wqXUEWPdcp4SOPSU3lDw"
  }

  useEffect (()=> {
      
      const { tweet } = editObj;
      setTweet(tweet);
  }, []);

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }

  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if( files && files.length === 1) {
      if(files[0].size >=20000) {
        setIsFileBig("❗️파일 크기는 2MB 초과할 수 없습니다");
        console.log(isFileBig);
        return;
      }

      setFile(files[0]);
      setIsFileBig("");
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user || loading || tweet === "" || tweet.length > 180 ) return; 
    try {
      setLoading(true);
      
      const uploadFile = async (id:string) => {
        const locationRef = ref(storage, `tweets/${user.uid}/${id}}`);
        if(file) {
          const result = await uploadBytes(locationRef, file);
          const url = await getDownloadURL(result.ref);
          console.log(url);
          return url;
        }
      }

      const {id} = editObj;
        const docRef = doc(db, "tweets", id);
        await updateDoc(docRef, {
          tweet
        });
        if(file) {
          await updateDoc(docRef, {
            photo: await uploadFile(id)
          });
        } else {
          await updateDoc(docRef, {
            photo: deleteField()
          });
        }
        setTweet("");
        setFile(null);
      /*else {
        const doc = await addDoc(collection(db, "tweets"), {
          tweet,
          createdAt: Date.now(),
          username: user.displayName || "Anonymous",
          userId: user.uid
        })
        if(file) {
          await updateDoc(doc, {
            photo: uploadFile(doc.id),
          });
        }
        setTweet("");
        setFile(null);
      }*/

    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

   return (
    <Form onSubmit={onSubmit}>
      <TextArea rows={5} maxLength={150} onChange={onChange} value={tweet} placeholder="what is happening" required />
      <AttachFileButton htmlFor="file" >{file ? "Photo added ✅" : "파일을 첨부해주세요❗️"}</AttachFileButton>
      <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
      <Warning>{isFileBig}</Warning>
      <SubmitBtn type="submit" value={loading ? "포스팅중.." : "포스트 올리기"} />
    </Form>
  )
}

function MapStateToProps(state: IState) {
  console.log(state);
  return { state }
}

const connector = connect(MapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PostTweetForm);
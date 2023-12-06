import { deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ITweet } from "./timeline";
import styled from "styled-components";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;


const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  flex-shrink: 0;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`

export default function Tweet({username, photo, tweet, userId, id}:ITweet) {
  const user = auth.currentUser;
  const onDelete = async() => {
    if(user?.uid !==userId) return;
    const ok = confirm("Are you sure you want to delete this tweet?");
    if(!ok) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if(photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}}`);
        await deleteObject(photoRef);
      }
    } catch(e) {
      console.log(e);
    } finally {
      //
    }
  }

  return <Wrapper>
      <div style={{flex: 1}}>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid ===  userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton>: null }
      </div>
      {photo? <Photo src={photo} /> : null}
  </Wrapper>
}
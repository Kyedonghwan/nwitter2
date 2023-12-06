import { ITweet } from "./timeline";
import styled from "styled-components";

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

export default function Tweet({username, photo, tweet}:ITweet) {
  return <Wrapper>
      <div style={{flex: 1}}>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
      </div>
      {photo? <Photo src={photo} /> : null}
  </Wrapper>
}
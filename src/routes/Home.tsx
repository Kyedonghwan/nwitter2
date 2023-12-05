import { auth } from '../firebase';

export default function Home() {

  const onClick = () => {
    auth.signOut();
  }

  return <>
    <div>Home</div>
    <button type="button" onClick={onClick}>LogOut</button>
  </>
}
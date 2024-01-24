import './App.css';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

function App() {
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  );
}

export default App;

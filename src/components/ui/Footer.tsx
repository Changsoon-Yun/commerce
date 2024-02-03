import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <div className={'flex justify-between items-center'}>
        <img src="/img/logo.jpg" alt="logo" />
        <div className={'flex gap-4'}>
          <FaFacebookF className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
          <FaInstagram className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
          <FaTwitter className={'text-zinc-400 hover:text-zinc-600 transition cursor-pointer'} />
        </div>
      </div>
    </>
  );
}

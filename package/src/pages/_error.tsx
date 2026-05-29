import NextErrorComponent from 'next/error';

export default function Error() {
  return <NextErrorComponent statusCode={404} />;
}

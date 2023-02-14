import dynamic from 'next/dynamic';

const DrawCenter = () => {
  const DynamicDrawKonva = dynamic(() => import('../components/DrawKonva'), {
    ssr: false,
  });

  return (
    <>
      <DynamicDrawKonva />
    </>
  );
};

export default DrawCenter;

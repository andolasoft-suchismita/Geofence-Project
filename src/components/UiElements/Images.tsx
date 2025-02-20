import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ImagesOne from '../Images/ImagesOne';
import ImagesTwo from '../Images/ImagesTwo';
import from '../..//';

const Images: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Images" />

      <div className="flex flex-col gap-7.5">
        <ImagesOne />
        <ImagesTwo />
      </div>
    </>
  );
};

export default Images;

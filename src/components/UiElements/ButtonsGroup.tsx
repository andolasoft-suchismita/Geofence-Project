import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ButtonsGroupOne from '../../components/ButtonsGroups/ButtonsGroupOne';
import ButtonsGroupTwo from '../../components/ButtonsGroups/ButtonsGroupTwo';
import from '../..//';

const ButtonsGroup: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Buttons Group" />

      <div className="flex flex-col gap-7.5">
        <ButtonsGroupOne />
        <ButtonsGroupTwo />
      </div>
    </>
  );
};

export default ButtonsGroup;

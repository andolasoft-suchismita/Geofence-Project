import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import TabOne from '../Tabs/TabOne';
import TabThree from '../../components/Tabs/TabThree';
import TabTwo from '../../components/Tabs/TabTwo';
import from '../..//';

const Tabs: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Tabs" />

      <div className="flex flex-col gap-9">
        <TabOne />
        <TabTwo />
        <TabThree />
      </div>
    </>
  );
};

export default Tabs;

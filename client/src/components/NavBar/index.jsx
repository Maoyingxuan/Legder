import  { useState } from 'react';
import { TabBar } from 'zarm';
import { useNavigate } from 'react-router-dom';
import s from './style.module.less';

const NavBar = () => {
    const [activeKey, setActiveKey] = useState('/');
    const navigateTo = useNavigate()
    // 导航栏切换功能
    const changeTab = (path) => {
        setActiveKey(path)
        navigateTo(path)
      }
      return(
        <TabBar visible='true' className={s.tab} activeKey={activeKey} onChange={changeTab}>
        <TabBar.Item
          itemKey="/"
          title="账单"
        />
        <TabBar.Item
          itemKey="/data"
          title="统计"
        />
        <TabBar.Item
          itemKey="/user"
          title="我的"
        />
      </TabBar> 
      )   
};

export default NavBar;
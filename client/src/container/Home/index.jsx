// About/index.jsx
// import React from 'react'
import {Icon} from 'zarm'
import { useState } from 'react';
import s from './style.module.less'
import BillItem from '@/components/BillItem'
// import Test from '@/components/Test';
const MyIcon = Icon.createFromIconfont('//lf1-cdn-tos.bytegoofy.com/obj/iconpark/svg_20337_14.627ee457cf7594fbbce6d5e14b8c29ef.js'); // generated by iconfont.cn
const Home = () => {
  const [list, setList] = useState([
    {
      bills: [
        {
          amount: "25.00",
          date: "1623390740000",
          id: 911,
          pay_type: 1,
          remark: "",
          type_id: 1,
          type_name: "餐饮"
        }
      ],
      date: '2021-06-11'
    }
  ]); // 账单列表
  return (

   <div className={s.home}>
    <div className={s.header}>
      <div className={s.dataWrap}>
        <span className={s.expense}>总支出：<b>¥ 200</b></span>
        <span className={s.income}>总收入：<b>¥ 500</b></span>
      </div>
      <div className={s.typeWrap}>
        <div className={s.left}>
          <span className={s.title}>类型 <MyIcon className={s.arrow} type="home" /></span>
        </div>
        <div className={s.right}>
          <span className={s.time}>2022-06<MyIcon className={s.arrow} type="home" /></span>
        </div>
      </div>
    </div>
    <div className={s.contentWrap}>
      {
        list.map((item, index) => <BillItem
        bill={item}
        key={index}
      />)
      }
      {/* <NavBar></NavBar>
      <Test></Test> */}
    </div>
  </div>
  )
}

export default Home
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Modal, Input, Button, Toast } from 'zarm';
import { get, post, imgUrlTrans } from '@/utils';
import s from './style.module.less';
const User = () => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState({});
  const [signature, setSignature] = useState('');
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await get('/user/get_userinfo');
    setUser(data);
    setAvatar(imgUrlTrans(data.avatar))
    setSignature(data.signature)
  };

  // 个性签名弹窗确认
  const confirmSig = async () => {
    const { data } = await post('/user/edit_signature', {
      signature: signature
    });
    setUser(data);
    setShow(false);
    Toast.show('修改成功');
  } ;

  // 退出登录
  const logout = async () => {
    localStorage.removeItem('token');
    navigateTo('/login');
  };

  return <div className={s.user}>
    <div className={s.head}>
      <div className={s.info}>
        <span>昵称：{ user.username }</span>
        <span>
          <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
          <b>{ user.signature || '暂无内容' }</b>
        </span>
      </div>
      <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={avatar} alt="" />
   </div>
   <div className={s.content}>
     <List>
     <List.Item
      title="用户信息修改"
      onClick={() => navigateTo('/userinfo')}
    />
    <List.Item
      title="重制密码"
      onClick={() => navigateTo('/account')}
    />
    <List.Item
      title="关于我们"
      onClick={() => navigateTo('/about')}
    />
     </List>  
   </div>
   <Button className={s.logout} block theme="danger" onClick={logout}>退出登录</Button>
   <Modal
      visible={show}
      title="标题"
      closable
      onCancel={() => setShow(false)}
      footer={
        <Button block theme="primary" onClick={confirmSig}>
          确认
        </Button>
      }
    >
    <Input
        autoHeight
        showLength
        maxLength={50}
        type="text"
        rows={3}
        value={signature}
        placeholder="请输入备注信息"
        onChange={(val) => setSignature(val)}
        />
    </Modal>
  </div>
};

export default User;
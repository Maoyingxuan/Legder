import s from './style.module.less'
import { useState,useCallback } from 'react'; 
import { List, Input, Checkbox,Button,Toast} from 'zarm'
import { post } from '@/utils'
import Captcha from "react-captcha-code"
import { useNavigate } from 'react-router-dom';
import cx from 'classnames'
const Login = () => {
    const navigateTo = useNavigate()
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [verify, setVerify] = useState(''); // 验证码
    const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
    const [type,setType] = useState('login') //类型切换（注册or登录）
  //  验证码变化，回调方法
    const handleChange = useCallback((captcha) => {
    console.log('captcha', captcha)
    setCaptcha(captcha)
   }, []);
    const onSubmit = async () => {
        // console.log(username)
        if (!username) {
          Toast.show('请输入账号')
          return
        }
        if (!password) {
          Toast.show('请输入密码')
          return
        }
        try {
          // 判断是否是登录状态
          if (type == 'login') {
            // 执行登录接口，获取 token
            const { data } = await post('/user/login', {
              username,
              password
            });
            // 将 token 写入 localStorage
            console.log("success")
            localStorage.setItem('token', data.token);
            navigateTo('/')
          } else {
            if (!verify) {
              Toast.show('请输入验证码')
              return
            }
            if (verify != captcha) {
              Toast.show('验证码错误')
              return
            }
           await post('/user/register', {
              username,
              password
            });
            Toast.show('注册成功');
            // 注册成功，自动将 tab 切换到 login 状态
            setType('login');
          }
        } catch (error) {
          Toast.show('系统错误');
        }
      };
    return <div className={s.auth}>
    <div className={s.head}></div>
    <div className={s.tab}>
    <span className={cx({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
    <List>
        <List.Item title='账号'><Input clearable typr='text' onChange={(value) => setUsername(value.target.value)} placeholder="请输入" /></List.Item>
        <List.Item title='密码'><Input clearable typr='text' onChange={(value) => setPassword(value.target.value)} placeholder="请输入" /></List.Item>
        <List.Item title='验证码'><Input clearable typr='text' onChange={(value) => setVerify(value.target.value)} placeholder="请输入" /><Captcha charNum={4} onChange={handleChange} /></List.Item>
    </List>
    </div>
    <div className={s.operation}>
      <div className={s.agree}>
        <Checkbox />
        <label className="text-light">阅读并同意<a>《毛毛条款》</a></label>
      </div>
      <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
}

export default Login
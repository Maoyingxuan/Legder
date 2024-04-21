import s from './style.module.less'
import { useState,useCallback } from 'react'; 
import { List, Input, Checkbox,Button,Toast} from 'zarm'
import { post } from '@/utils'
import Captcha from "react-captcha-code"
const Login = () => {
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [verify, setVerify] = useState(''); // 验证码
    const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
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
        if (!verify) {
          Toast.show('请输入验证码')
          return
        }
        if (verify != captcha) {
          Toast.show('验证码错误')
          return
        }
        try {
          const { data } = await post('/user/register', {
            username,
            password
          });
          Toast.show('注册成功');
        } catch (error) {
          Toast.show('系统错误');
        }
      };
    return <div className={s.auth}>
    <div className={s.head}></div>
    <div className={s.tab}>
        <span>注册</span>
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
      <Button onClick={onSubmit} block theme="primary">注册</Button>
    </div>
  </div>
}

export default Login
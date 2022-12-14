import { Router } from 'express';
import { UserService } from '../../services/user.js';
const route = Router();
const userServiceInstance = new UserService();

export default app => {
  app.use('/users', route);

  //유저 추가
  route.post('/:userId', async (req, res) => {
    let [user, created] = await userServiceInstance.register(req.body);
    return res.json(user);
  });

  //유저 정보 확인
  route.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await userServiceInstance.getUserById(userId);
    return res.json(user);
  });

  //유저 정보 수정
  route.patch('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const userInfo = req.body;
    //const before = await userServiceInstance.getUserById(userId);
    await userServiceInstance.updateUser(userId, userInfo);
    //const after = await userServiceInstance.getUserById(userId);
    //return res.json(['수정 전', before, '수정 후', after]);
    return res.json(userInfo);
  });

  //유저 삭제
  route.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    await userServiceInstance.deleteUser(userId);
    return res.sendStatus(204);
  });
};

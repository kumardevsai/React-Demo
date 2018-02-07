import BaseComponent from '../../prototype/BaseComponent';

class Admin extends BaseComponent {
  constructor() {
    super();
  }

  signin(req, res) {
    res.send({
      status: 1,
      message: 'lala'
    })
  }

  signup(req, res) {
    res.send({
      status: 1,
      data: {
        username: 'qingzhan',
        password: 'lalala',
      }
    });
    // res.send({
    //   status: 0,
    //   message: '哈哈哈哈或'
    // })
  }

  signout(req, res) {

  }

  getInfo(req, res) {
    res.send({
      status: 1,
      data: {
        username: 'qingzhan',
        password: 'a123456',
        status: 'info'
      }
    })
  }
}

export default new Admin();
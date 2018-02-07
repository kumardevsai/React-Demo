export default {
  port: 3002,
  mongodb: 'mongodb://localhost/qz-demo',
  session: {
    key: 'qz',
    secret: 'qz-demo',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2592000000,
    }
  },
  sms: {
    accessKeyId: '',
    secretAccessKey: '',
    signName: '',
    TemplateCode: '' 
  }
}
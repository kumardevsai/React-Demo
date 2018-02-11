export default {
  port: 3002,
  mongodb: 'mongodb://localhost/react-demo',
  session: {
    key: 'react',
    secret: 'react-demo',
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
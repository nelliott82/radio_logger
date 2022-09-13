class signIn extends Users {
this.verify('user.signin', 'body')
this.body = this.service.user.signIn()
}
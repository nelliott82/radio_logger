export default {
	name: "resetPassword",
	data () {
		return {
			password: "",
			password_confirmation: "",
			error: "",
			notice: ""
		}
	},
	created () {
		this.checkPasswordToken()
	},
	methods: {
		reset () {
			this.$http.plain.patch('/password_resets/${this.$route.params.token}', { password: this.password,password_confirmation: this.password_confirmation })
			  .then(response => this.resetSuccessful(response))
			  .catch(error => this.resetFailed(error))
		},
		resetSuccessful (response) {
		  this.error = ''
		  this.password = ''
		  this.password_confirmation= ``
		},
		resetFailed (error) {
			this.error = (error.response && error.response.data.error) || 'Something went wrong'
			this.notice = ''
		},
		checkPasswordToken() {
		  this.$http.plain.get('/password_resets/${this.$route.params.token}')
		    .catch(error => {
			  this.resetFailed(error)
			  this.$router.replace('/')
			})
		}
	}
}
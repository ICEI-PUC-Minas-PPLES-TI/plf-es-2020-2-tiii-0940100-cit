<template>
    <div>
        <div class="auth-background">
            <div class="auth-container d-block">
                <a class="btn btn-outline-success position-absolute" href="/">
                    <i class="fas fa-arrow-left"></i>
                </a>
                <p class="text-center font-roboto ml-4">
                    Login de Organização
                </p>
                <img src="@/assets/img/citlogo.svg" width="150px" alt="CIT Logo" class="d-block m-auto">
                <h3 class="auth-container-title text-center">CIT</h3>
                <br>
                <!-- Login Usuário de Organização -->
                <form>
                    <div class="form-group">
                        <label for="txtEmail">ID de Organização</label>
                        <input v-model="formData.organizacao_id" type="email" class="form-control" id="txtEmail">
                    </div>
                    <div class="form-group">
                        <label for="txtEmail">E-Mail</label>
                        <input v-model="formData.email" type="email" class="form-control" id="txtEmail">
                    </div>
                    <div class="form-group">
                        <label for="txtSenha">Senha</label>
                        <div class="input-group">
                            <input v-model="formData.senha" :type="instPasswordShow ? 'text' : 'password'" class="form-control" id="txtSenha">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="instPasswordShow = !instPasswordShow">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary float-right" @click="login">
                        Entrar
                    </button>
                    <br><br>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            formData: {
                organizacao_id: null,
                senha: null,
                email: null
            },
            instPasswordShow: false
        }
    },
    methods: {
        login(){
            if(!this.formData.organizacao_id || !this.formData.email || !this.formData.senha) {
                alert('Todos os campos são obrigatórios')
            } else {
                this.$axios.post('/api/organizacaousuario',this.formData).then(res => {
                    alert('Usuario de organização logada')
                    this.formData = {
                        organizacao_id: null,
                        senha: null,
                        email: null
                    }
                }).catch(error => {
                    alert('Usuário ou senha incorretos')
                })
            }
        }
    }
}
</script>

<style scoped>
    .auth-background{
        background: #38AE90;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
    }
    .auth-container{
        width: 600px;
        padding: 20px;
        background: white;
        margin: 40px auto 40px auto;
        border-radius: 5px;
    }
    @media only screen and (max-width: 600px) {
        .auth-container{
            width: 98%;
            margin: 1%;
        }
    }
    .auth-container-title{
        font-family: 'Tillana', cursive;
        color: #38AE90;
    }
    .auth-container-textarea{
        resize: none;
    }
    .nav-item{
        cursor: pointer;
    }
</style>
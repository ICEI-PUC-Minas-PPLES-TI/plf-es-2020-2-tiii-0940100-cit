<template>
    <div>
        <div class="auth-background">
            <div class="auth-container d-block">
                <a href="/"><img src="@/assets/img/citlogo.svg" width="150px" alt="CIT Logo" class="d-block m-auto">
                <h3 class="auth-container-title text-center">CIT</h3></a>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link" :class="tab == 'F' ? 'active': ''" @click="tab = 'F'">
                            Sou Pessoa Física
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="tab == 'I' ? 'active': ''" @click="tab = 'I'">
                            Sou uma instituição
                        </a>
                    </li>
                </ul>
                <br>
                <!-- Pessoa Física -->
                <div v-if="tab == 'F'">
                        <form id="formCidadao">
                            <div class="form-group">
                                <label for="txtNomeCidadao">Nome completo</label>
                                <input v-model="formDataCidadao.cidadao_nome" type="text" class="form-control" id="txtNomeCidadao">
                            </div>
                            <div class="form-group">
                                <label for="txtEmailCidadao">E-Mail</label>
                                <input v-model="formDataCidadao.cidadao_email" type="email" class="form-control" id="txtEmailCidadao">
                            </div>
                            <div class="form-group">
                                <label for="txtCPF">CPF</label>
                                <input v-model="formDataCidadao.cidadao_cpf" v-mask="['###.###.###-##']" type="text" required class="form-control" id="txtCPF">
                            </div>
                            <div class="form-group">
                                <label for="txtSenhaCidadao">Senha</label>
                                <div class="input-group">
                                    <input v-model="formDataCidadao.cidadao_senha" :type="instPasswordShow ? 'text' : 'password'" class="form-control" id="txtSenhaCidadao">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" @click="instPasswordShow = !instPasswordShow">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary float-right" @click="checkFormCidadao">
                                Cadastrar
                            </button>
                        </form>
                </div>
                <!-- Usuário de Organização -->
                <div v-else-if="tab == 'I'">
                    <div v-if="stepInstituicao == 0">
                        <form id="formInstiStep0" @submit="checkForm">
                            <div class="form-group">
                                <label for="txtIdentificacao">Identificação</label>
                                <input v-model="formData.nome" type="text" class="form-control" required id="txtIdentificacao">
                            </div>
                            <div class="form-group">
                                <label for="txtCNPJ">CNPJ</label>
                                <input v-model="formData.cnpj" v-mask="['##.###.###/####-##']" type="text" required class="form-control" id="txtCNPJ">
                            </div>
                            <div class="row">
                                <div class="col-12 col-md-5">
                                    <div class="form-group">
                                        <label>Estado</label>
                                        <select v-model="formData.uf" class="form-control" required>
                                            <option value="AC">Acre</option>
                                            <option value="AL">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BA">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="ES">Espírito Santo</option>
                                            <option value="GO">Goiás</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MT">Mato Grosso</option>
                                            <option value="MS">Mato Grosso do Sul</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PR">Paraná</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piauí</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RO">Rondônia</option>
                                            <option value="RR">Roraima</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 col-md-7">
                                    <div class="form-group">
                                        <label for="txtCidade">Cidade</label>
                                        <input v-model="formData.cidade" type="text" required class="form-control" id="txtCidade">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtDescricao">Descrição</label>
                                <textarea v-model="formData.descricao" class="form-control auth-container-textarea" id="txtDescricao" />
                            </div>
                            <button type="button" class="btn btn-primary float-right" @click="stepInstituicao = 1">
                                Próximo Passo
                            </button>
                            <br><br>
                        </form>    
                    </div>
                    <div v-else-if="stepInstituicao == 1">
                        <form>
                            <div class="form-group">
                                <label for="txtNome">Nome</label>
                                <input v-model="formData.usuario_nome" type="text" class="form-control" id="txtNome">
                            </div>
                            <div class="form-group">
                                <label for="txtEmail">E-Mail</label>
                                <input v-model="formData.usuario_email" type="email" class="form-control" id="txtEmail">
                            </div>
                            <div class="form-group">
                                <label for="txtSenha">Senha</label>
                                <div class="input-group">
                                    <input v-model="formData.usuario_senha" :type="instPasswordShow ? 'text' : 'password'" class="form-control" id="txtSenha">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" @click="instPasswordShow = !instPasswordShow">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-secondary" @click="stepInstituicao = 0">
                                Voltar
                            </button>
                            <button type="button" class="btn btn-primary float-right" @click="checkForm">
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mask} from 'vue-the-mask'
export default {
    directives: {mask},
    data(){
        return {
            tab: 'F',
            stepInstituicao: 0,
            formData: {
                nome: null,
                descricao: null,
                cnpj: null,
                uf: null,
                cidade: null,
                usuario_nome: null,
                usuario_senha: null,
                usuario_email: null
            },
            formDataCidadao: {
                cidadao_nome: null,
                cidadao_email: null,
                cidadao_senha: null,
                cidadao_cpf: null
            },
            instPasswordShow: false
        }
    },
    methods: {
        checkForm(){
            if(!this.formData.nome || !this.formData.descricao || !this.formData.cnpj || !this.formData.uf || !this.formData.cidade || !this.formData.usuario_nome || !this.formData.usuario_email || !this.formData.usuario_senha) {
                alert('Todos os campos são obrigatórios')
            } else {
                const res = this.$http.post('/api/organizacao', this.formData)
                alert('Organização cadastrada')
            }
        },
        checkFormCidadao(){
            if(!this.formDataCidadao.cidadao_nome) {
                alert('Campo nome obrigatório!')
            } else if (!this.formDataCidadao.cidadao_email){
                alert('Campo email obrigatório!')
            } else if (!this.formDataCidadao.cidadao_senha){
                alert('Campo senha obrigatório!')
            } else {
                const res = this.$http.post('/api/cidadao', this.formDataCidadao)
                alert('Cidadão cadastrado com sucesso!')
            }
        }
    }
}
</script>

<style scoped>

    #formCidadao{
        height: 400px;
    }

    a{
        text-decoration: none;
    }

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
        margin: 100px auto 100px auto;
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
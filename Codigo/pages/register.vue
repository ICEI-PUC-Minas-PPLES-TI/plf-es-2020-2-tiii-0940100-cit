<template>
    <div>
        <div class="auth-background">
            <div class="auth-container d-block">
                <img src="@/assets/img/citlogo.svg" width="150px" alt="CIT Logo" class="d-block m-auto">
                <h3 class="auth-container-title text-center">CIT</h3>
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
                    pessoa
                </div>
                <!-- Usuário de Organização -->
                <div v-else-if="tab == 'I'">
                    <div v-if="stepInstituicao == 0">
                        <form>
                            <div class="form-group">
                                <label for="txtIdentificacao">Identificação</label>
                                <input type="text" class="form-control" id="txtIdentificacao">
                            </div>
                            <div class="form-group">
                                <label for="txtCNPJ">CNPJ</label>
                                <input type="text" class="form-control" id="txtCNPJ">
                            </div>
                            <div class="row">
                                <div class="col-5">
                                    <div class="form-group">
                                        <label>Estado</label>
                                        <select class="form-control">
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
                                <div class="col-7">
                                    <div class="form-group">
                                        <label for="txtCidade">Cidade</label>
                                        <input type="text" class="form-control" id="txtCidade">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="txtDescricao">Descrição</label>
                                <textarea class="form-control auth-container-textarea" id="txtDescricao" />
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
                                <input type="text" class="form-control" id="txtNome">
                            </div>
                            <div class="form-group">
                                <label for="txtEmail">E-Mail</label>
                                <input type="email" class="form-control" id="txtEmail">
                            </div>
                            <div class="form-group">
                                <label for="txtSenha">Senha</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="txtSenha">
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="btn btn-outline-secondary" @click="stepInstituicao = 0">
                                Voltar
                            </button>
                            <button type="button" class="btn btn-primary float-right" @click="stepInstituicao = 0">
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
export default {
    data(){
        return {
            tab: 'F',
            stepInstituicao: 0
        }
    },
    methods: {}
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
        margin: 100px auto 100px auto;
        border-radius: 5px;
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
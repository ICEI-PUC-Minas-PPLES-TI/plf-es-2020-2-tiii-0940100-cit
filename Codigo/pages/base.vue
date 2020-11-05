<template>
   
    <div class="container-fluid">
        
        <div class="row">

            <div class="col-12">

                <div class="row">
                    <div class="col-12">
                        <p id="auth" ><span>Login</span> | <span>Registro</span></p>
                    </div>
                </div>

                <div class="row">

                    <div class="col-6">
                        
                        <div class="row">
                            <div class="col-12">
                                <div id="logo-text">
                                    <img class="d-inline" src="@/assets/img/citlogo.svg" width="128px" height="128px" alt="">
                                    <h1 class="d-inline">CIT</h1>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <p id="slogan">Todos juntos<br> por cidades<br> melhores!</p>
                            </div>
                        </div>

                    </div>

                    <div class="col-6">
                            <img id="home-image" src="@/assets/img/home-image.png" width="100%" height="450px" alt="home image">
                    </div>

                </div>

                <br>
                <br>
                <br>

                <div class="row">

                    <div class="col-6">
                        <p class="d-block text-center">
                            <button class="btn denunciar">Denunciar</button>
                            <button class="btn verDenuncias">Ver denúncias</button>
                        </p>
                    </div>

                    <div class="col-6">
                        <p class="text-center">Total de 200 denúncias já efetuadas!</p>
                    </div>

                </div>

            </div>

        </div>

    </div>
   
</template>

<script>
export default {
    methods: {}
}
</script>

<style scoped>

    * {
        margin: 0;
        padding: 0;
        background-color: #264445;
    }

    .container-fluid{
        color: #ffffff;
        height: 100vh;
        width: 100vw;
    }

    #auth{
        font-family: 'Roboto', sans-serif;
        padding-top: 1.5vh;
        padding-right: 2.5vw;
        text-align: right;
    }

    #home-image{
        margin-top: 6vh;
        padding-right: 5vw;
        padding-left: 2vw;
    }

    #logo-text{
        font-family: 'Tillana', cursive;
        margin-top: 6vh;
        padding-left: 10vw;
        padding-right: 2vw;
    }

    #slogan{
        margin-left: 10vw;
        font-size: 3.25rem;
        font-family: 'Rum Raisin', sans-serif;
    }

    .denunciar, .verDenuncias{
        font-family: 'Roboto', sans-serif;
        color: white;
        padding: 30px 50px;
    }

    .denunciar {
        margin-right: 80px;
        background: #38AE90;
    }

    .verDenuncias {
        margin-left: 80px;
        background: #7EE34D;
    }




</style>
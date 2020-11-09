<template>
    <div id="home_container">

        <span id="auth" class="text-right d-block">
            <div class="dropdown">
                <span>Login</span>
                <div class="dropdown-content">
                    <ul>
                        <router-link tag="li" to="/login/cidadao">
                            <i class="fas fa-user"></i>
                            Pessoa Física
                        </router-link>
                        <router-link tag="li" to="/login/organizacao">
                            <i class="fas fa-users"></i>
                            Organização
                        </router-link>
                    </ul>
                </div>
            </div> |
            <a href="/register">Cadastrar</a>
        </span>
                
        

        <div class="logo-slogan-imagem">

            <div class="logo-slogan">

                <div id="logo-text">
                    <img src="@/assets/img/citlogo.svg" width="128px" height="128px" alt="">
                    <h1 >CIT</h1>
                </div>

                <p id="slogan"> <a> Todos juntos por cidades melhores! </a> </p>

            </div>

           
            <img id="home-image" src="@/assets/img/home-image.png" alt="home image">
            
        
        </div>

        <div>

            <div class="footer">

                <div class="buttons">
                        <button class="btn denunciar"><i class="fas fa-exclamation-triangle"></i> Denunciar</button>
                        <button class="btn verDenuncias"> <i class="far fa-eye"></i> Ver denúncias</button>
                </div>

                
                <p id="totalDenuncias" class="d-block text-center"> Total de {{ totalDenuncias.qtd }} denúncias já efetuadas!</p>

            </div>
        </div>


    </div>
   
</template>

<script>
export default {
    async asyncData ({ $axios  }) {
        const totalDenuncias = await $axios.$get('/api/totalDenuncias')
        return {
            totalDenuncias
        }
    },
    methods:{}
}
</script>

<style scoped>

    * {
        margin: 0;
        padding: 0;
    }

    #home_container{
        color: #ffffff;
        height: 100vh;
        width: 100vw;
        padding: 10vh 10vw;
        display: flex;
        justify-content: space-around;
        text-align: center;
        flex-direction: column;
        margin: 0 auto;
        background-color: #264445;
    }

    /* Menu de Login/Cadastro */

    #auth{
        position: absolute;
        right: 5px;
        top: 0;
        font-family: 'Roboto', sans-serif;
        z-index: 999;
    }

    #auth a{
        text-decoration: none;
        color: white;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown span:hover {
        text-decoration: underline;
        cursor: pointer;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        right: 0;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 4px;
        z-index: 1;
    }

    .dropdown-content ul{
        list-style: none;
        padding: 0;
    }

    .dropdown-content li{
        padding: 5px 10px;
        text-align: left;
        background: #264445;
    }
    .dropdown-content li:hover{
        background: white;
        color: #333;
        cursor: pointer;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    /* Botões */

    .buttons{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    
    .denunciar, .verDenuncias{
        font-size: 1.4rem;
        font-family: 'Roboto', sans-serif;
        color: white;
        width: 200px;
        height: 80px;
        border-radius: 10px;
    }

    .denunciar {
        background: #38AE90;
    }

    .verDenuncias {
        margin-left: 20px;
        background: #7EE34D;
    }

    .denunciar {
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    .denunciar:hover:before {
        transform: scale(1.2);
        box-shadow: 0 0 15px #ffffff54;
        filter: blur(3px);
    }

    .denunciar:hover{
        background: #2bc9a1;
        box-shadow: 0 0 15px #ffffff54;
    } 

    .verDenuncias {
        transition: .5s;
    }

    .verDenuncias:hover:before {
        transform: scale(1.2);
        box-shadow: 0 0 15px #ffffff54;
        filter: blur(3px);
    }

    .verDenuncias:hover{
        background: #5fd823;
        box-shadow: 0 0 15px #ffffff54;
    } 

    /* Demais estilizações */

    #logo-text{
        font-family: 'Tillana', cursive;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    #slogan{
        margin-left: 30px;
        font-size: 3.25rem;
        font-family: 'Rum Raisin', sans-serif;
        text-align: left;
        max-width: 250px;
    }

    .logo-slogan{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    #home-image{
        max-height: 500px;
        max-width: 650px;
    }

    .logo-slogan-imagem{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    

    #totalDenuncias{
        font-size: 0.8rem;
        margin-right: 25px;
        color: #D4C2FF;
    }

    .footer{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    /* Responsividade */

    @media screen and (max-height: 600px){
        #home-image{
            max-height: 220px;
            max-width: 380px;
        }
        #slogan{
            font-size: 2rem;
        }
        .buttons button{
            height: 50px;
            width: 140px;
            font-size: 1rem;
        }
        .verDenuncias{
            margin-left: 5px;
        }
        #totalDenuncias{
            margin-right: 0;
        }
        #logo-text img{
            width: 78px;
            height: 78px;
        }
    }

    @media screen and (max-width: 970px){
        #home-image{
            max-height: 320px;
            max-width: 420px;
        }
        #totalDenuncias{
            margin-right: 0;
        }
    }

    @media screen and (max-width: 760px){
        #home-image{
            max-height: 220px;
            max-width: 380px;
        }
    }

    @media screen and (max-width: 620px){
        #home-image{
            max-height: 180px;
            max-width: 300px;
        }
    }

    @media screen and (max-width: 550px){
        #home_container{
            justify-content: space-evenly;
        }
        #home-image{
            max-height: 100%;
            max-width: 100%;
        }
        #logo-text{
            justify-content: center;
        }
        #slogan{
            font-size: 2rem;
            text-align: center;
            margin-left: 0;
        }
        .logo-slogan{
            justify-content: center;
            align-items: center;
        }
        .logo-slogan-imagem{
            flex-direction: column;
        }
        .buttons{
            justify-content: space-around;
            width: 100%;
        }
        .buttons button{
            height: 50px;
            width: 150px;
            font-size: 1.2rem;
        }
        .verDenuncias, .denunciar{
            margin-left: 0;
            margin-top: 5px;
        }
        #totalDenuncias{
            margin-right: 0;
        }
        .footer{
            justify-content: center;
        }
    }


</style>
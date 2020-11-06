<template>
    <div id="home_container">

        <p id="auth" class="text-right" ><a href="/login">Login</a> | <a href="/register">Registro</a></p>
                
        

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
    async asyncData ({ $http }) {
        const totalDenuncias = await $http.$get('/api/totalDenuncias')
        return {
            totalDenuncias
        }
    },
    methods: {}
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
        display: flex;
        justify-content: space-around;
        text-align: center;
        flex-direction: column;
        margin: 0 auto;
        background-color: #264445;
    }

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
        max-height: 450px;
        max-width: 550px;
    }

    .logo-slogan-imagem{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .buttons{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    
    .denunciar, .verDenuncias{
        font-size: 1.2rem;
        font-family: 'Roboto', sans-serif;
        color: white;
        width: 180px;
        height: 70px;
    }

    .denunciar {
        background: #38AE90;
    }

    .verDenuncias {
        margin-left: 20px;
        background: #7EE34D;
    }

    .footer{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }

    @media screen and (max-height: 560px){
        #home-image{
            max-height: 220px;
            max-width: 380px;
        }
        #slogan{
            font-size: 2rem;
        }
        .buttons button{
            height: 50px;
        }
        .verDenuncias{
            margin-left: 5px;
        }
    }

    @media screen and (max-width: 760px){
        #home-image{
            max-height: 220px;
            max-width: 380px;
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
        }
        .verDenuncias, .denunciar{
            margin-left: 0;
            margin-top: 5px;
        }
    }


</style>
<template>
   
    <div class="container-fluid">
        
        <div class="row">

            <div class="col-12">

                <div class="row">
                    <div class="col-12">
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
                            <a href="/register">Registro</a>
                        </span>
                    </div>
                </div>

                <div class="row">

                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        
                        <div class="row">
                            <div class="col-sm-0 col-md-0 col-lg-2 col-xl-2"></div>
                            <div class="col-sm-12 col-md-12 col-lg-10 col-xl-10">
                                <div id="logo-text">
                                    <img class="d-inline" src="@/assets/img/citlogo.svg" width="128px" height="128px" alt="">
                                    <h1 class="d-inline">CIT</h1>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-0 col-md-0 col-lg-3 col-xl-3"></div>
                            <div class="col-sm-12 col-md-12 col-lg-9 col-xl-9">
                                <p id="slogan"> <a> Todos juntos<br> por cidades<br> melhores! </a> </p>
                            </div>
                        </div>

                    </div>

                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                            <img id="home-image" src="@/assets/img/home-image.png" width="100%" height="450px" alt="home image">
                    </div>

                </div>

                <div class="row">

                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <p class="d-block text-center">
                            <button class="btn denunciar"><i class="fas fa-exclamation-triangle"></i> Denunciar</button>
                            <button class="btn verDenuncias"> <i class="far fa-eye"></i> Ver denúncias</button>
                        </p>
                    </div>

                    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                        <p id="totalDenuncias" class="d-block text-center"> Total de {{ totalDenuncias.qtd }} denúncias já efetuadas!</p>
                    </div>

                </div>

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
        display: flex;
        justify-content: center;
        text-align: center;
    }

    .row {
        width: 100%;
    }

    i{
        background: none;
    }

    #auth{
        font-family: 'Roboto', sans-serif;
        margin: 16px;
        text-decoration: none;
        color: white;
    }

    #auth a{
        text-decoration: none;
        color: white;
    }

    #logo-text{
        margin-right: 300px;
        font-family: 'Tillana', cursive;
        margin-top: 40px;
        text-align: left;
    }

    #slogan{
        margin-right: 200px;
        font-size: 3.25rem;
        font-family: 'Rum Raisin', sans-serif;
        text-align: left;
    }

    #home-image{
        padding-right: 80px;
        padding-top: 40px;
    }

    .denunciar, .verDenuncias{
        margin-top: 50px;
        font-size: 1.5rem;
        font-family: 'Roboto', sans-serif;
        color: white;
        width: 240px;
        height: 80px;
    }

    .denunciar {
        margin-left: 40px;
        background: #38AE90;
        -webkit-border-radius: 3px;
        border-radius: 3px;
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
        margin-left: 60px;
        background: #7EE34D;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        transition: .5s;
        z-index: -1;
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

    #totalDenuncias {
        margin-top: 75px;
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
    }
    .dropdown-content li:hover{
        background: white;
        color: #333;
        cursor: pointer;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }


    /* Surface Duo */
    @media (min--moz-device-pixel-ratio: 1.5),
       (-o-min-device-pixel-ratio: 3/2),
       (-webkit-min-device-pixel-ratio: 1.5),
       (min-device-pixel-ratio: 1.5),
       (min-resolution: 144dpi),
       (min-resolution: 1.5dppx) {

        #logo-text{
            margin-right: 0;
            margin-top: 0;
            text-align: center;
        }

        #slogan{
            margin-right: 0;
            font-size: 2rem;
            text-align: center;
        }

        #home-image{
            padding-right: 0;
            padding-top: 0;
        }

        .denunciar, .verDenuncias{
            margin-top: 30px;
            font-size: 1.5rem;
            width: 240px;
            height: 80px;
        }

        .denunciar {
            margin-left: 40px;
            background: #38AE90;
        }

        .verDenuncias {
            margin-left: 60px;
            background: #7EE34D;
        }

        #totalDenuncias {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }

    /* Pixel XL Landscape */
    @media
    only screen and (-webkit-min-device-pixel-ratio: 2.625),
    only screen and (   min--moz-device-pixel-ratio: 2.625),
    only screen and (     -o-min-device-pixel-ratio: 2.625/1),
    only screen and (        min-device-pixel-ratio: 2.625),
    only screen and (                min-resolution: 441dpi),
    only screen and (                min-resolution: 2.625dppx) { 

        #logo-text{
            margin-right: 0;
            margin-top: 0;
            text-align: center;
        }

        #slogan{
            margin-right: 0;
            font-size: 2rem;
            text-align: center;
        }

        #home-image{
            padding-right: 0;
            padding-top: 0;
        }

        .denunciar, .verDenuncias{
            margin-top: 30px;
            font-size: 1.5rem;
            width: 240px;
            height: 80px;
        }

        .denunciar {
            margin-left: 40px;
            background: #38AE90;
        }

        .verDenuncias {
            margin-left: 60px;
            background: #7EE34D;
        }

        #totalDenuncias {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }

    /* iPhone X Portrait */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3)
    and (orientation: portrait) { 

        #logo-text{
            margin-right: 0;
            margin-top: 0;
            text-align: center;
        }

        #slogan{
            margin-right: 0;
            font-size: 3rem;
            text-align: center;
        }

        #home-image{
            padding-right: 0;
            padding-top: 0;
            height: 400px;
        }

        .denunciar, .verDenuncias{
            margin-top: 0;
            font-size: 1.5rem;
            font-family: 'Roboto', sans-serif;
            color: white;
            width: 240px;
            height: 80px;
        }

        .denunciar {
            margin-top: 30px;
            margin-left: 0;
            margin-bottom: 10px;
            background: #38AE90;
        }

        .verDenuncias {
            margin-left: 0;
            background: #7EE34D;
        }

        #totalDenuncias {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }

    /* iPhone X Landscape */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 812px) 
    and (-webkit-min-device-pixel-ratio: 3)
    and (orientation: landscape) { 

        #logo-text{
            margin-right: 0;
            margin-top: 0;
            text-align: center;
        }

        #slogan{
            margin-right: 0;
            font-size: 2rem;
            text-align: center;
        }

        #home-image{
            padding-right: 0;
            padding-top: 0;
        }

        .denunciar, .verDenuncias{
            margin-top: 30px;
            font-size: 1.5rem;
            width: 240px;
            height: 80px;
        }

        .denunciar {
            margin-left: 40px;
            background: #38AE90;
        }

        .verDenuncias {
            margin-left: 60px;
            background: #7EE34D;
        }

        #totalDenuncias {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }

   /* iPhone 5 Portrait */
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 568px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: portrait) {

        #logo-text{
            margin-right: 0;
            margin-top: 0;
            text-align: center;
        }

        #slogan{
            margin-right: 0;
            font-size: 3rem;
            text-align: center;
        }

        #home-image{
            padding-right: 0;
            padding-top: 0;
            height: 400px;
        }

        .denunciar, .verDenuncias{
            margin-top: 0;
            font-size: 1.5rem;
            font-family: 'Roboto', sans-serif;
            color: white;
            width: 240px;
            height: 80px;
        }

        .denunciar {
            margin-top: 10px;
            margin-left: 0;
            margin-bottom: 10px;
            background: #38AE90;
        }

        .verDenuncias {
            margin-left: 0;
            background: #7EE34D;
        }

        #totalDenuncias {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }

    /* iPhone 6 Landscape */
    @media only screen 
    and (min-device-width: 375px) 
    and (max-device-width: 667px) 
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: landscape) { 

        #logo-text{
            margin-right: 0;
            margin-top: 0;
            text-align: center;
        }

        #slogan{
            margin-right: 0;
            font-size: 2rem;
            text-align: center;
        }

        #home-image{
            padding-right: 0;
            padding-top: 0;
        }

        .denunciar, .verDenuncias{
            margin-top: 30px;
            font-size: 1.5rem;
            width: 240px;
            height: 80px;
        }

        .denunciar {
            margin-left: 40px;
            background: #38AE90;
        }

        .verDenuncias {
            margin-left: 60px;
            background: #7EE34D;
        }

        #totalDenuncias {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }

        /* iPhone 5 Landscape */
    @media only screen 
    and (min-device-width: 320px) 
    and (max-device-width: 568px)
    and (-webkit-min-device-pixel-ratio: 2)
    and (orientation: landscape) {

        #logo-text{
            margin-right: 0;
            margin-top: 0;
            text-align: center;
        }

        #slogan{
            margin-right: 0;
            font-size: 2rem;
            text-align: center;
        }

        #home-image{
            padding-right: 0;
            padding-top: 0;
        }

        .denunciar, .verDenuncias{
            margin-top: 30px;
            font-size: 1.5rem;
            width: 240px;
            height: 80px;
        }

        .denunciar {
            margin-left: 0px;
            background: #38AE90;
        }

        .verDenuncias {
            margin-left: 0px;
            background: #7EE34D;
        }

        #totalDenuncias {
            margin-top: 30px;
            margin-bottom: 30px;
        }

    }


</style>
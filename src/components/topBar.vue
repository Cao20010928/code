<template>
    <nav class="tabbar">
        <ul>
            <li class="active">
                <a @click="changeTab(true)">
                    <div>
                    <span>
                        <svg>
                            <use xlink:href="#dashboardIcon"></use>
                        </svg>
                    </span>
                        <span>
                        <svg>
                            <use xlink:href="#dashboardIconFilled"></use>
                        </svg>
                    </span>
                    </div>
                    <strong>未读消息</strong>
                </a>
            </li>
<!--            <li>-->
<!--                <a>-->
<!--                    <div>-->
<!--                    <span>-->
<!--                        <svg>-->
<!--                            <use xlink:href="#cameraIcon"></use>-->
<!--                        </svg>-->
<!--                    </span>-->
<!--                        <span>-->
<!--                        <svg>-->
<!--                            <use xlink:href="#cameraIconFilled"></use>-->
<!--                        </svg>-->
<!--                    </span>-->
<!--                    </div>-->
<!--                    <strong>Camera</strong>-->
<!--                </a>-->
<!--            </li>-->
            <li>
                <a @click="changeTab(false)">
                    <div>
                    <span>
                        <svg>
                            <use xlink:href="#filesIcon"></use>
                        </svg>
                    </span>
                        <span>
                        <svg>
                            <use xlink:href="#filesIconFilled"></use>
                        </svg>
                    </span>
                    </div>
                    <strong>所有消息</strong>
                </a>
            </li>
<!--            <li>-->
<!--                <a>-->
<!--                    <div>-->
<!--                    <span>-->
<!--                        <svg>-->
<!--                            <use xlink:href="#userIcon"></use>-->
<!--                        </svg>-->
<!--                    </span>-->
<!--                        <span>-->
<!--                        <svg>-->
<!--                            <use xlink:href="#userIconFilled"></use>-->
<!--                        </svg>-->
<!--                    </span>-->
<!--                    </div>-->
<!--                    <strong>Profile</strong>-->
<!--                </a>-->
<!--            </li>-->
        </ul>
    </nav>

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="dashboardIcon">
            <g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2">
                <path fill="none" stroke-miterlimit="10" d="M6.3,10C6.1,10.6,6,11.3,6,12" stroke-linecap="butt"></path>
                <path fill="none" stroke-miterlimit="10" d="M18,12c0-3.3-2.7-6-6-6 c-0.7,0-1.4,0.1-2,0.3" stroke-linecap="butt"></path>
                <line fill="none" stroke-miterlimit="10" x1="10.6" y1="10.6" x2="7" y2="7"></line>
                <circle fill="none" stroke-miterlimit="10" cx="12" cy="12" r="2"></circle>
                <circle fill="none" stroke-miterlimit="10" cx="12" cy="12" r="11"></circle>
            </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="dashboardIconFilled">
            <path stroke="none" d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,
            0,12,0z M5,12c0,0.552-0.447,1-1,1 s-1-0.448-1-1c0-1.387,0.325-2.696,0.887-3.871l1.526,
            1.526C5.15,10.389,5,11.177,5,12z M12,15c-1.654,0-3-1.346-3-3 c0-0.462,0.113-0.894,
            0.3-1.285L5.086,6.5L6.5,5.086l4.214,4.215C11.106,9.114,11.538,9,12,9c1.654,0,3,
            1.346,3,3S13.654,15,12,15z M20,13c-0.553,0-1-0.448-1-1c0-3.86-3.141-7-7-7c-0.823,
            0-1.61,0.15-2.345,0.413L8.13,3.887C9.304,3.324,10.613,3,12,3 c4.963,0,9,4.038,9,9C21,12.552,20.553,13,20,13z"></path>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="cameraIcon">
            <g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2">
                <rect x="1" y="5" transform="matrix(-1 -4.489621e-11 4.489621e-11 -1 24 27)" fill="none"
                      stroke-miterlimit="10" width="22" height="17"></rect>
                <line fill="none" stroke-miterlimit="10" x1="4" y1="2" x2="8" y2="2"></line>
                <circle fill="none" stroke-miterlimit="10" cx="15" cy="14" r="4"></circle>
                <circle cx="6" cy="10" r="1" stroke-linejoin="miter" stroke-linecap="square" stroke="none"></circle>
            </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="cameraIconFilled">
            <g stroke="none">
                <rect x="3" y="1" width="6" height="2"></rect>
                <path d="M23,4H1C0.447,4,0,4.448,0,5v17c0,0.552,0.447,1,1,1h22c0.553,0,
                1-0.448,1-1V5C24,4.448,23.553,4,23,4z M6,11c-0.552,0-1-0.448-1-1c0-0.552,
                0.448-1,1-1s1,0.448,1,1C7,10.552,6.552,11,6,11z M15,19c-2.761,
                0-5-2.239-5-5s2.239-5,5-5 s5,2.239,5,5S17.761,19,15,19z"></path>
            </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="filesIcon">
            <g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" transform="translate(1,0)">
                <line x1="7" y1="7" x2="8" y2="7" fill="none" stroke-miterlimit="10"></line>
                <line x1="12" y1="7" x2="17" y2="7" fill="none" stroke-miterlimit="10"></line>
                <line x1="7" y1="12" x2="8" y2="12" fill="none" stroke-miterlimit="10"></line>
                <line x1="12" y1="12" x2="17" y2="12" fill="none" stroke-miterlimit="10"></line>
                <line x1="7" y1="17" x2="12" y2="17" fill="none" stroke-miterlimit="10"></line>
                <polygon points="16 23 16 17 22 17 16 23" stroke="none" stroke-linecap="butt"></polygon>
                <polyline points="16 23 16 17 22 17" fill="none" stroke-miterlimit="10" stroke-linecap="butt"></polyline>
                <polygon points="16 23 2 23 2 1 22 1 22 17 16 23" fill="none" stroke-miterlimit="10"></polygon>
            </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="filesIconFilled">
            <g transform="translate(1,0)">
                <polygon points="22.414 18 17 18 17 23.414 22.414 18" stroke="none"></polygon>
                <path d="M22,0H2A1,1,0,0,0,1,1V23a1,1,0,0,0,1,1H15V17a1,1,0,0,1,1-1h7V1A1,1,0,0,0,22,
                0ZM6,6H9V8H6Zm0,5H9v2H6Zm5,7H6V16h5Zm7-5H11V11h7Zm0-5H11V6h7Z" stroke="none"></path>
            </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="userIcon">
            <g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2">
                <path fill="none" stroke-miterlimit="10" d="M12,12L12,12 c-2.761,0-5-2.239-5-5V6c0-2.761,
                2.239-5,5-5h0c2.761,0,5,2.239,5,5v1C17,9.761,14.761,12,12,12z"></path>
                <path fill="none" stroke-miterlimit="10" d="M22,20.908 c0-1.8-1.197-3.383-2.934-3.856C17.172,
                16.535,14.586,16,12,16s-5.172,0.535-7.066,1.052C3.197,17.525,2,19.108,2,20.908V23h20 V20.908z"></path>
            </g>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="userIconFilled">
            <g stroke="none">
                <path d="M12,13c3.309,0,6-2.691,6-6V6c0-3.309-2.691-6-6-6S6,2.691,6,6v1C6,10.309,8.691,13,12,13z"></path>
                <path d="M19.322,15.981c-4.704-1.303-9.939-1.303-14.644,0C2.513,16.581,1,18.564,1,
                20.805V24h22 v-3.195C23,18.564,21.487,16.581,19.322,15.981z"></path>
            </g>
        </symbol>
    </svg>

    <!-- dribbble -->
    <a class="dribbble" href="https://dribbble.com/shots/5487895-Tab-bar-active-animation" target="_blank">
        <img src="https://cdn.dribbble.com/assets
        /dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg"
             alt=""></a>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "topBar",
        methods:{
            changeTab(is){
                if(is)
                    this.$emit('child-event', true)
                else
                    this.$emit('child-event', false)
            }
        },
        mounted(){
            $('.tabbar').each(function() {
                var self = $(this);
                $('<em />').appendTo(self).css('--offset', self.find('.active').position().left + self.find('.active').width() / 2);
            });

            $('.tabbar ul li a').on('click touch', function(e) {

                e.preventDefault();

                var self = $(this);

                if(!self.parent().hasClass('active')) {
                    self.parent().parent().children('li').removeClass('active');
                    self.parent().addClass('active');
                    self.parent().parent().parent().children('em').css('--offset', self.parent().position().left + self.parent().width() / 2);
                }

            });

        }
    }
</script>

<style scoped lang="scss">
    $width: 270px;
    $height: 60px;
    $active: #5628EE;
    $activeDot: #23C4F8;
    $inactive: #99A3BA;
    $hover: #6C7486;
    $textColor: #99A3BA;
    $background: #fff;

    .tabbar {
        border-radius: 6px;
        width: $width;
        height: fit-content;
        background: $background;
        padding: 0 4px;
        /*<!--box-shadow: 0 4px 12px -1px rgba(#121621, .08);-->*/
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
        position: relative;
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        position: relative;
        z-index: 1;
    li {
        position: relative;
        flex-grow: 1;
    a {
        cursor: pointer;
        display: table;
        position: relative;
        display: flex;
        z-index: 1;
        justify-content: center;
        align-items: center;
        height: $height;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    div,
    span,
    svg {
        width: 20px;
        height: 20px;
        display: block;
        -webkit-backface-visibility: hidden;
    }
    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -84%);
    span {
        width: 20px;
        bottom: 0;
        left: 0;
        transform-origin: 50% 50%;
        position: absolute;
        overflow: hidden;
        z-index: 1;
        background: $background;
        transform: scale(.94);
        transform-origin: 0 100%;
        animation: down .3s linear forwards;
    svg {
        position: absolute;
        left: 0;
        bottom: 0;
    }
    &:first-child {
         height: 20px;
    svg {
        transition: fill .3s ease, stroke .3s ease;
        fill: $inactive;
        stroke: $inactive;
    }
    }
    &:last-child {
         height: 0;
         z-index: 5;
         transition: height .25s ease;
    svg {
        fill: $active;
        stroke: $active;
    }
    }
    }
    }
    strong {
        font-size: 10px;
        font-weight: 600;
        margin-top: 28px;
        color: $textColor;
        transition: all .3s ease;
    }
    &:hover {
    div {
    span {
    &:first-child {
    svg {
        fill: $hover;
        stroke: $hover;
    }
    }
    }
    }
    }
    }
    &.active {
    a {
        z-index: 5;
    div {
    span {
        animation: high .35s linear forwards .05s;
    &:last-child {
         height: 20px;
         transition: height .3s ease .25s;
     }
    }
    }
    strong {
        opacity: 0;
        transform: scale(.6);
    }
    }
    }
    }
    }
    em {
        --offset: 0;
        border-radius: 50%;
        display: block;
        width: 6px;
        height: 6px;
        position: absolute;
        bottom: 13px;
        left: 4px;
        margin: 0 0 0 -3px;
        z-index: 4;
        transition: transform .4s ease;
        background: $activeDot;
        transform: translateX(var(--offset));
    }
    }

    @keyframes high {
        0% {
            transform: rotate(0deg) scale(.94);
        }
        33% {
            transform: rotate(8deg);
        }
        66% {
            transform: rotate(8deg) translateY(-1px);
        }
        100% {
            transform: rotate(0deg) scale(1) translateY(-1px);
        }
    }
    @keyframes down {
        0% {
            transform: rotate(0deg) scale(1) translateY(-1px);
        }
        33% {
            transform: rotate(8deg);
        }
        66% {
            transform: rotate(8deg) translateY(0);
        }
        100% {
            transform: rotate(0deg) scale(.94) translateY(0);
        }
    }

    html {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
    }

    * {
        box-sizing: inherit;
    &:before,
    &:after {
         box-sizing: inherit;
     }
    }

    // Center & dribbble
       body {
           min-height: 100vh;
           font-family: Roboto, Arial;
           color: #ADAFB6;
           display: flex;
           justify-content: center;
           align-items: center;
           background: #F5F9FF;
    .dribbble {
        position: fixed;
        display: block;
        right: 20px;
        bottom: 20px;
    img {
        display: block;
        height: 28px;
    }
    }
    }
</style>
<template>
    <div style="width: fit-content; height: fit-content">
        <label class="toggleButton">
            <input type="checkbox" :checked="IsRead">
            <div>
                <svg viewBox="0 0 44 44">
                    <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,
                4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,
                19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
                </svg>
            </div>
        </label>

        <!-- dribbble -->
        <a class="dribbble" href="https://dribbble.com/shots/5283141-Toggle-check-button" target="_blank">
            <img src="https://dribbble.com/assets/logo-small-2x-9fe74d2ad7b25fba0f50168523c15fda4c35534f9ea0b1011179275383035439.png" alt="">
        </a>
    </div>

</template>

<script>
    export default {
        name: "checkBox",
        props: ['isRead'],
        data(){
            return{
                IsRead: false
            }
        },
        methods: {
            setCheck(is){
                var toggle = document.querySelector('.toggleButton input')
                toggle.checked = is
            }
        },
        mounted(){
            this.IsRead = this.isRead
            // var toggle = document.querySelector('.toggleButton input')
            // toggle.checked = this.isRead
            // toggle.id = this.id + 'input'
            // console.log('this is component')
            // console.log(toggle.id + '+' + toggle.checked)
            // var animate = setInterval(() => {
            //     toggle.checked = !toggle.checked
            // }, 3000)
            //
            // document.querySelector('body').addEventListener('click', () => {
            //     clearInterval(animate);
            // })
        }
    }
</script>

<style scoped lang="scss">
    $color: #000;

    .toggleButton {
        cursor: pointer;
        display: block;
        transform-origin: 50% 50%;
        transform-style: preserve-3d;
        transition: transform .14s ease;
    &:active {
         transform: rotateX(30deg);
     }
    input {
        display: none;
    & + div {
          border: 3px solid rgba($color, .2);
          border-radius: 50%;
          position: relative;
          width: 30px;
          height: 30px;
    svg {
        fill: none;
        stroke-width: 3.6;
        stroke: $color;
        stroke-linecap: round;
        stroke-linejoin: round;
        width: 35px;
        height: 35px;
        display: block;
        position: absolute;
        left: -3px;
        top: -3px;
        right: -3px;
        bottom: -3px;
        z-index: 1;
        stroke-dashoffset: 162.6 - 38;
        stroke-dasharray: 0 162.6 133 (162.6 - 133);
        transition: all .4s ease 0s;
    }
    &:before,
    &:after {
         content: '';
         width: 3px;
         height: 16px;
         background: $color;
         position: absolute;
         left: 50%;
         top: 50%;
         border-radius: 5px;
     }
    &:before {
         opacity: 0;
         transform: scale(.3) translate(-50%, -50%) rotate(45deg);
         animation: bounceInBefore .3s linear forwards .3s;
     }
    &:after {
         opacity: 0;
         transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
         animation: bounceInAfter .3s linear forwards .3s;
     }
    }
    &:checked + div {
    svg {
        stroke-dashoffset: 162.6;
        stroke-dasharray: 0 162.6 28 (162.6 - 28);
        transition: all .4s ease .2s;
    }
    &:before {
         opacity: 0;
         transform: scale(.3) translate(-50%, -50%) rotate(45deg);
         animation: bounceInBeforeDont .3s linear forwards 0s;
     }
    &:after {
         opacity: 0;
         transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
         animation: bounceInAfterDont .3s linear forwards 0s;
     }
    }
    }
    }

    @keyframes bounceInBefore {
        0% {
            opacity: 0;
            transform: scale(.3) translate(-50%, -50%) rotate(45deg);
        }
        50%{
            opacity: 0.9;
            transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
        }
        80%{
            opacity: 1;
            transform: scale(.89) translate(-50%, -50%) rotate(45deg);
        }
        100%{
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(45deg);
        }
    }

    @keyframes bounceInAfter {
        0% {
            opacity: 0;
            transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
        }
        50%{
            opacity: 0.9;
            transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
        }
        80%{
            opacity: 1;
            transform: scale(.89) translate(-50%, -50%) rotate(-45deg);
        }
        100%{
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(-45deg);
        }
    }

    @keyframes bounceInBeforeDont {
        0% {
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(45deg);
        }
        100%{
            opacity: 0;
            transform: scale(.3) translate(-50%, -50%) rotate(45deg);
        }
    }

    @keyframes bounceInAfterDont {
        0% {
            opacity: 1;
            transform: scale(1) translate(-50%, -50%) rotate(-45deg);
        }
        100%{
            opacity: 0;
            transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
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
           background: #5628EE;
           display: flex;
           justify-content: center;
           align-items: center;
    .dribbble {
        position: fixed;
        display: block;
        right: 24px;
        bottom: 24px;
    img {
        display: block;
        width: 76px;
    }
    }
    }
</style>
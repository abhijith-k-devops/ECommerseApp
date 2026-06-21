import { AppRegistry } from 'react-native';
import App from './App';
import appJson from './app.json';
import PoppinsRegular from './assets/fonts/Poppins-Regular.ttf';
import PoppinsMedium from './assets/fonts/Poppins-Medium.ttf';
import PoppinsSemiBold from './assets/fonts/Poppins-SemiBold.ttf';
import PoppinsBold from './assets/fonts/Poppins-Bold.ttf';
import PoppinsLight from './assets/fonts/Poppins-Light.ttf';

const appName = appJson.name;

function registerWebFonts() {
        if (typeof document === 'undefined') {
                return;
        }

        const style = document.createElement('style');
        style.setAttribute('data-fonts', 'poppins');
        style.textContent = `
            @font-face {
                font-family: 'Poppins-Regular';
                src: url('${PoppinsRegular}') format('truetype');
                font-weight: 400;
                font-style: normal;
                font-display: swap;
            }
            @font-face {
                font-family: 'Poppins-Medium';
                src: url('${PoppinsMedium}') format('truetype');
                font-weight: 500;
                font-style: normal;
                font-display: swap;
            }
            @font-face {
                font-family: 'Poppins-SemiBold';
                src: url('${PoppinsSemiBold}') format('truetype');
                font-weight: 600;
                font-style: normal;
                font-display: swap;
            }
            @font-face {
                font-family: 'Poppins-Bold';
                src: url('${PoppinsBold}') format('truetype');
                font-weight: 700;
                font-style: normal;
                font-display: swap;
            }
            @font-face {
                font-family: 'Poppins-Light';
                src: url('${PoppinsLight}') format('truetype');
                font-weight: 300;
                font-style: normal;
                font-display: swap;
            }
        `;
        document.head.appendChild(style);
}

registerWebFonts();

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
});

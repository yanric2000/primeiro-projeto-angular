import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GameServices } from './service/game.service';
import { PlatformsService } from '../platforms/services/platforms.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.styl']
})
export class GamesComponent implements OnInit {

    constructor(
        private gameServices: GameServices,
        private sanitizer: DomSanitizer,
        private platformsService: PlatformsService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    game = {
        id: Number,
        name: String,
        studio: String,
        platformEnable: [],
        dateCreated: String,
    };

    allPlatforms = [];

    gameName: string;

    callbackClass: string = 'callback';
    callbackMessageClass: string = 'response-button'
    loadingClass: string = 'loading';
    deleteModalClass: string = 'delete-modal';

    callbackResponse = 'Jogo salvo com sucesso!';

    safeHtml: SafeHtml;
    // Fiz pra deixar o formulário mais bonito
    platformsLogo = [
        {
            svg: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#107b10"><path d="M86,6.88c-14.76104,0 -28.83214,4.13069 -40.50063,11.35469c-0.75336,0.25112 -2.05508,1.24189 -3.23844,2.29109c10.4748,-8.32136 34.69783,8.34592 41.77047,13.30984c1.19024,0.83592 2.75367,0.83592 3.94391,0c7.07264,-4.96392 31.29567,-21.63464 41.77047,-13.30984c-1.18336,-1.0492 -2.48852,-2.03997 -3.23844,-2.29109c-11.67192,-7.224 -25.74631,-11.35469 -40.50735,-11.35469zM37.84,27.52c-5.49368,0 -9.50703,4.47469 -9.50703,4.47469c-13.04448,14.104 -21.27828,33.02131 -21.27828,54.00531c0,43.688 35.35363,79.12 78.94531,79.12c22.9964,0 43.93531,-9.976 58.35235,-25.8c0,0 -1.71586,-10.32135 -12.35578,-25.45735c-11.89896,-17.94648 -36.00299,-40.54964 -43.71891,-47.48812c-1.31752,-1.18336 -3.2817,-1.17697 -4.5889,0.02015c-5.8136,5.32168 -20.81447,20.21688 -24.12031,24.08c-7.8948,8.256 -29.86291,34.39597 -31.23547,49.18797c0,0 -4.80804,-11.69331 5.83187,-38.52531c6.622,-16.11984 27.18885,-40.08428 37.16141,-50.53844c1.3244,-1.38632 1.29258,-3.57717 -0.1075,-4.89125c-3.3024,-3.09256 -11.00058,-8.51228 -17.93906,-12.685c-4.80224,-3.096 -10.29001,-5.15866 -15.43969,-5.50266zM133.09172,27.52c-2.24632,0 -16.84009,4.61933 -32.19625,18.22797c-1.45168,1.28656 -1.50973,3.53165 -0.16125,4.92485c5.56248,5.74824 20.77572,20.47117 29.89172,34.98453c11.32792,18.576 18.19018,33.36665 14.06906,53.66265c12.70048,-14.104 20.59969,-32.68 20.59969,-53.32c-0.344,-20.64 -8.24052,-39.55865 -21.285,-53.66266c-0.344,-0.344 -0.68741,-0.69069 -1.02797,-1.03469c-2.74512,-3.096 -6.80088,-3.78266 -9.89,-3.78266z"></path></g></g></svg>',
            safeSvg: this.safeHtml
        },
        {
            svg: '<?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.997 511.997" style="enable-background:new 0 0 511.997 511.997;" xml:space="preserve"> <path style="fill:#F2D422;" d="M40.983,402.547c-43.062-12.143-50.232-37.39-30.625-51.943 c20.522-15.2,40.632-20.577,176.535-68.893l5.497,49.67l-97.232,34.818c-16.256,5.853-18.727,14.077-5.545,18.369 c13.188,4.306,37.054,3.11,53.301-2.714l51.313-18.732l-7.334,48.975c-2.799,0.51-5.896,0.988-8.786,1.492 C134.095,420.753,87.212,417.779,40.983,402.547"/> <g> <path style="fill:#F4BD25;" d="M142.914,381.853c-13.339,4.781-31.812,6.441-45.297,4.498 c-5.155,11.755,34.238,16.231,61.333,6.519l32.605-11.902l2.672-17.847L142.914,381.853z"/> <path style="fill:#F4BD25;" d="M26.393,361.621c18.179-13.464,49.052-23.571,49.052-23.571l113.227-40.254l-1.78-16.086 C51.273,329.925,30.925,335.37,10.358,350.603c-16.616,12.333-13.991,32.343,13.401,45.552 C12.313,384.39,13.952,370.855,26.393,361.621z"/> </g> <path style="fill:#4A94CC;" d="M262.563,418.736l156.453-55.774c16.257-5.816,18.716-14.074,5.542-18.368 c-13.184-4.343-37.04-3.062-53.266,2.737L263.218,385.42l12.72-57.963l5.545-1.864c0,0,27.527-9.721,66.222-14.015 c38.737-4.257,86.164,0.599,123.431,14.706c41.932,13.266,46.662,32.784,36.002,46.235c-10.679,13.454-36.784,23.056-36.784,23.056 l-194.417,69.844L262.563,418.736z"/> <g> <path style="fill:#2884BC;" d="M432.809,350.549c1.295,4.027-3.453,8.713-13.793,12.412l-156.453,55.774l4.46,15.564 l174.991-62.936C464.303,363.39,459.072,351.964,432.809,350.549z"/> <path style="fill:#2884BC;" d="M304.484,333.994c0,0,27.527-9.721,66.222-14.015c35.76-3.931,78.906-0.075,114.647,11.636 c-38.014-16.969-91.357-25.126-137.645-20.038c-38.696,4.293-66.222,14.015-66.222,14.015l-5.545,1.864l-4.356,19.846 L304.484,333.994z"/> </g> <path style="fill:#EA473B;" d="M309.429,77.661c-26.253-8.868-72.527-22.9-109.047-30.853c-1.8-0.347-13.49-2.027-13.49,13.148 v377.232l88.961,28.233V135.684c0-15.405,6.876-25.761,18.01-22.192c14.507,4.035,17.343,18.273,17.343,33.705v123.848 c0,7.326,5.263,10.161,5.992,10.519c52.577,22.058,93.08-5.282,93.08-73.368C410.28,135.661,384.759,103.455,309.429,77.661z"/> <g> <path style="fill:#D82B27;" d="M338.945,281.562c-0.729-0.358-5.992-3.193-5.992-10.519V147.196 c0-15.431-2.837-29.669-17.343-33.705c-5.725-1.835-10.322,0.019-13.439,4.341c7.356,6.361,9.037,17.507,9.037,29.363v123.848 c0,7.326,5.263,10.161,5.992,10.519c16.174,6.786,31.204,8.89,44.265,6.577C354.285,287.013,346.749,284.836,338.945,281.562z"/> <path style="fill:#D82B27;" d="M208.638,437.186c0-403.227-1.437-382.852,3.354-387.727c-3.95-0.94-7.834-1.83-11.609-2.652 c-1.8-0.347-13.49-2.027-13.49,13.148v377.232l21.745,6.901V437.186z"/> </g> <polygon style="fill:#29A53D;" points="186.892,381.557 186.892,365.857 163.841,374.242 "/> <polygon style="fill:#2884BC;" points="186.892,297.451 186.892,281.71 163.498,290.027 "/> <polygon style="fill:#F2D422;" points="288.669,409.385 275.94,413.919 275.94,465.419 364.726,433.522 "/> <polygon style="fill:#F4BD25;" points="275.94,431.093 313.971,417.414 288.733,409.405 275.94,413.967 "/> <path style="fill:#3BBC56;" d="M284.713,324.529c-2.096,0.664-3.228,1.062-3.228,1.062l-5.545,1.864v53.477l88.371-31.142 L284.713,324.529z"/> <path style="fill:#29A53D;" d="M304.484,333.994c0,0,1.75-0.618,4.982-1.61l-24.753-7.856c-0.013,0.004-0.029,0.009-0.043,0.013 c-1.285,0.407-2.205,0.713-2.715,0.887h-0.001c-0.201,0.068-0.336,0.115-0.407,0.14c-0.031,0.011-0.061,0.022-0.061,0.022 l-5.545,1.864v18.085L304.484,333.994z"/> <path style="fill:#3BBC56;" d="M412.794,365.177L282.03,411.75l76.086,24.147c120.34-43.232,116.173-41.222,127.906-47.479 L412.794,365.177z"/> <polygon style="fill:#29A53D;" points="282.098,411.771 307.366,419.79 437.455,373.003 412.797,365.178 "/> <path style="fill:#3BBC56;" d="M169.391,287.932c-124.948,44.421-119.15,42.129-129.987,46.819l76.127,24.159l71.362-25.524v-39.899 L169.391,287.932z"/> <path style="fill:#29A53D;" d="M39.404,334.751l24.15,7.665c7.011-2.767,11.89-4.365,11.89-4.365l111.448-39.621v-4.944 l-17.502-5.554C36.689,335.11,52.459,329.217,39.404,334.751z"/> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>',
            safeSvg: this.safeHtml,
        },
        {
            svg: '<?xml version="1.0" encoding="iso-8859-1"?> <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --> <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path style="fill:#D5011D;" d="M397,0H281v512h116c63.411,0,115-51.589,115-115V115C512,51.589,460.411,0,397,0z M396.5,332 c-33.359,0-60.5-27.141-60.5-60.5s27.141-60.5,60.5-60.5s60.5,27.141,60.5,60.5S429.859,332,396.5,332z"/> <g> <path style="fill:#FF0021;" d="M251,512H115C51.589,512,0,460.411,0,397V115C0,51.589,51.589,0,115,0h136V512z M115,30 c-46.869,0-85,38.131-85,85v282c0,46.869,38.131,85,85,85h106V30H115z"/> <path style="fill:#FF0021;" d="M125.5,211C92.141,211,65,183.859,65,150.5S92.141,90,125.5,90s60.5,27.141,60.5,60.5 S158.859,211,125.5,211z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>',
            safeSvg: this.safeHtml,
        },
    ]

    async ngOnInit() {
        await this.platformsService.getAllPlatforms().subscribe(
            data => {
                this.allPlatforms = [data];
                this.allPlatforms = this.allPlatforms[0];
            }
        );

        this.route.params.subscribe(params => {
            this.gameName = params.name;
        });

        this.gameServices.getGameByName(this.gameName).subscribe(
            data => {
                this.game = data[0];
                this.allPlatforms.map((platform) => {
                    platform.available =
                        this.game.platformEnable.find(el => el.id == platform.id) ?
                            true : false;
                });
            }
        );

        this.platformsLogo.map((platform) => {
            platform.safeSvg = this.sanitizer.bypassSecurityTrustHtml(platform.svg);
        });
    }

    saveGame(event) {
        event.preventDefault();
        
        this.openCallbackModal();
        this.showLoading();

        this.gameServices.saveGame(this.game).subscribe(data => {
            this.callbackResponse = 'Jogo salvo com sucesso!';
            this.hiddeLoading();
            this.showCallbackMessage();
        });

        return false;
    }

    deleteGame() {
        this.hiddeDeleteModal();
        this.showLoading();
        this.gameServices.deleteGame(`${this.game.id}`).subscribe(data => {
            this.callbackResponse = 'Jogo excluído com sucesso.';
            this.hiddeLoading();
            this.showCallbackMessage();
        });

        return false;
    }

    onCheckboxChange(options, event) {
        const eventId = event.target.id - 0;

        // Cria um array de objetos com a propriedade available(boolean)
        if (options.find(option => option.id == eventId) !== undefined) {
            for (let index = 0; index < options.length; index++) {
                if (options[index].id === eventId) {
                    const bool = options[index].available;
                    options[index].available = !bool;
                }
            }
        }

        // Permite apenas os itens marcados como available ==== true
        const newOptions = options.filter(option => option.available === true);
        this.game.platformEnable = newOptions;
    }

    onInputChange(event) {
        const { value, name } = event.target;
        this.game[name] = value;
    }

    closeCallbackModal() {
        this.callbackClass = 'callback';
        this.hiddeCallbackMessage();
        this.hiddeLoading()
        this.hiddeDeleteModal();
    }

    openCallbackModal() {
        this.callbackClass = 'callback show';
    }

    showLoading() {
        this.loadingClass = 'loading show';
    }

    hiddeLoading() {
        this.loadingClass = 'loading';
    }

    showCallbackMessage() {
        this.callbackMessageClass = 'response-button show'
    }

    hiddeCallbackMessage() {
        this.callbackMessageClass = 'response-button'
    }

    showDeleteModal() {
        this.deleteModalClass = 'delete-modal show';
    }

    hiddeDeleteModal() {
        this.deleteModalClass = 'delete-modal';
    }

    openDeleteModal() {
        this.openCallbackModal();
        this.showDeleteModal();
    }

    goHome() {
        this.router.navigate(['/']);
    }

}

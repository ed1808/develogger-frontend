export class AppWindow extends HTMLElement {
    private shadow: ShadowRoot;
    private isDragging: boolean = false;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private posX: number = 100;
    private posY: number = 100;
    private pendingX: number = 100;
    private pendingY: number = 100;
    private animationFrame: number | null = null;
    private windowTitle: string | null = null;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const header = this.shadow.querySelector('.toolsbar') as HTMLElement;

        if (header) {
            header.addEventListener('mousedown', this.startDrag.bind(this));
        }

        window.addEventListener('mouseup', this.stopDrag.bind(this));
        window.addEventListener('mousemove', this.handleMovement.bind(this));

        this.updatePosition();
    }

    init(title: string) {
        this.windowTitle = title;
        this.render();
    }

    startDrag(e: MouseEvent) {
        this.offsetX = e.clientX - this.posX;
        this.offsetY = e.clientY - this.posY;

        this.shadow.querySelector('.toolsbar')!.classList.add('grabbing');

        this.isDragging = true;
    }

    stopDrag() {
        this.isDragging = false;
        this.shadow.querySelector('.toolsbar')!.classList.remove('grabbing');
    }

    handleMovement(e: MouseEvent) {
        if (!this.isDragging) return;

        this.pendingX = e.clientX - this.offsetX;
        this.pendingY = e.clientY - this.offsetY;

        if (this.animationFrame === null) {
            this.animationFrame = requestAnimationFrame(this.updatePosition.bind(this));
        }
    }

    updatePosition() {
        this.animationFrame = null;

        if (this.posX !== this.pendingX || this.posY !== this.pendingY) {
            this.posX = this.pendingX;
            this.posY = this.pendingY;

            this.style.transform = `translate(${this.posX}px, ${this.posY}px)`;
        }
    }

    render(): void {
        this.shadow.innerHTML = `
            <style>
                :root {
                    /* Night */
                    --color-night-100: #d0d0d0;
                    --color-night-200: #a1a1a1;
                    --color-night-300: #727272;
                    --color-night-400: #434343;
                    --color-night-500: #151515;
                    --color-night-600: #101010;
                    --color-night-700: #0c0c0c;
                    --color-night-800: #080808;
                    --color-night-900: #040404;

                    /* Raisin Black */
                    --color-raisin-black-100: #d2cbd9;
                    --color-raisin-black-200: #a597b4;
                    --color-raisin-black-300: #78658c;
                    --color-raisin-black-400: #4b3f58;
                    --color-raisin-black-500: #1f1a24;
                    --color-raisin-black-600: #18151c;
                    --color-raisin-black-700: #120f15;
                    --color-raisin-black-800: #0c0a0e;
                    --color-raisin-black-900: #060507;

                    /* Platinum */
                    --color-platinum-100: #fbfbfb;
                    --color-platinum-200: #f7f7f7;
                    --color-platinum-300: #f3f3f3;
                    --color-platinum-400: #efefef;
                    --color-platinum-500: #eaeaea;
                    --color-platinum-600: #bcbcbc;
                    --color-platinum-700: #8d8d8d;
                    --color-platinum-800: #5e5e5e;
                    --color-platinum-900: #2f2f2f;

                    /* Silver */
                    --color-silver-900: #232323;
                    --color-silver-800: #464646;
                    --color-silver-700: #6a6a6a;
                    --color-silver-600: #8d8d8d;
                    --color-silver-500: #b0b0b0;
                    --color-silver-400: #c0c0c0;
                    --color-silver-300: #d0d0d0;
                    --color-silver-200: #dfdfdf;
                    --color-silver-100: #efefef;

                    /* Verdigris */
                    --color-verdigris-900: #002224;
                    --color-verdigris-800: #004447;
                    --color-verdigris-700: #00666b;
                    --color-verdigris-600: #00888f;
                    --color-verdigris-500: #00adb5;
                    --color-verdigris-400: #00e9f5;
                    --color-verdigris-300: #38f5ff;
                    --color-verdigris-200: #7af8ff;
                    --color-verdigris-100: #bdfcff;

                    /* Pigment Green */
                    --color-pigment-green-900: #0f2310;
                    --color-pigment-green-800: #1e4520;
                    --color-pigment-green-700: #2e6830;
                    --color-pigment-green-600: #3d8b40;
                    --color-pigment-green-500: #4caf50;
                    --color-pigment-green-400: #6ec071;
                    --color-pigment-green-300: #93cf95;
                    --color-pigment-green-200: #b7dfb8;
                    --color-pigment-green-100: #dbefdc;

                    /* Amaranth */
                    --color-amaranth-900: #36060e;
                    --color-amaranth-800: #6c0d1c;
                    --color-amaranth-700: #a2132b;
                    --color-amaranth-600: #d71939;
                    --color-amaranth-500: #e94560;
                    --color-amaranth-400: #ed697f;
                    --color-amaranth-300: #f28f9f;
                    --color-amaranth-200: #f6b4bf;
                    --color-amaranth-100: #fbdadf;

                    /* Naples Yellow */
                    --color-naples-yellow-900: #423502;
                    --color-naples-yellow-800: #856b04;
                    --color-naples-yellow-700: #c7a006;
                    --color-naples-yellow-600: #f8cb19;
                    --color-naples-yellow-500: #fada5e;
                    --color-naples-yellow-400: #fbe27c;
                    --color-naples-yellow-300: #fce99d;
                    --color-naples-yellow-200: #fdf0be;
                    --color-naples-yellow-100: #fef8de;
                }

                .window-app {
                    width: 400px;
                    height: 400px;
                    border: 1px solid var(--color-platinum-500);
                    background-color: var(--color-night-600);
                    resize: both;
                }

                .window-app .toolsbar {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid var(--color-platinum-500);
                    background-color: var(--color-raisin-black-500);
                    cursor: grab;
                }

                .window-app .toolsbar.grabbing {
                    cursor: grabbing;
                }

                .window-app .toolsbar .window-title {
                    padding-left: 8px;
                    user-select: none;
                    -webkit-user-select: none;
                    font-weight: bold;
                }

                .window-app .toolsbar .buttons {
                    display: flex;
                }

                .window-app .toolsbar .buttons button {
                    padding: 12px;
                    border: none;
                    border-left: 1px solid var(--color-platinum-500);
                    background-color: transparent;
                    transition: all 200ms ease;
                }

                .window-app .toolsbar .buttons button:hover {
                    background-color: var(--color-raisin-black-400);
                }

                .window-app .toolsbar .buttons button:last-child:hover {
                    background-color: var(--color-amaranth-600);
                }
            </style>
            <div class="window-app">
                <div class="toolsbar">
                    <div class="window-title">
                        <span>${this.windowTitle ?? 'Window'}</span>
                    </div>
                    <div class="buttons">
                        <button class="maximize" title="Maximize">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize2-icon lucide-maximize-2"><path d="M15 3h6v6"/>
                                <path d="m21 3-7 7"/>
                                <path d="m3 21 7-7"/>
                                <path d="M9 21H3v-6"/>
                            </svg>
                        </button>
                        <button class="minimize" title="Minimize">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize2-icon lucide-minimize-2">
                                <path d="m14 10 7-7"/>
                                <path d="M20 10h-6V4"/>
                                <path d="m3 21 7-7"/>
                                <path d="M4 14h6v6"/>
                            </svg>
                        </button>
                        <button class="close" title="Close window">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x">
                                <path d="M18 6 6 18"/>
                                <path d="m6 6 12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('app-window', AppWindow);